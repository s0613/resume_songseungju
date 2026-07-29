#!/usr/bin/env node

/**
 * public/ 아래의 바이너리 확장자가 실제 파일 형식과 일치하는지 검사한다.
 * 다운로드 실패 HTML을 이미지 이름으로 저장해 그대로 공개하는 사고를 막기 위해
 * production build 전에 실행한다.
 */

import fs from "node:fs"
import path from "node:path"
import { inflateRawSync } from "node:zlib"

const PUBLIC_DIR = path.join(process.cwd(), "public")
const failures = []
const MAX_ZIP_ENTRIES = 2_000
const MAX_ZIP_ENTRY_BYTES = 2 * 1024 * 1024
const MAX_ZIP_TOTAL_BYTES = 100 * 1024 * 1024
const TEXT_EXTENSIONS = new Set([
    ".css",
    ".html",
    ".js",
    ".json",
    ".md",
    ".mjs",
    ".svg",
    ".txt",
    ".webmanifest",
    ".xml",
])
const SENSITIVE_PATTERNS = [
    {
        name: "로컬 절대경로",
        re: /(?:\/Users\/|\/home\/[a-z]|[A-Z]:\\Users\\)/iu,
    },
    {
        name: "이메일 주소",
        re: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/u,
    },
    {
        name: "전화번호",
        re: /01[016-9]-[0-9]{3,4}-[0-9]{4}|0[2-6][0-9]?-[0-9]{3,4}-[0-9]{4}/u,
    },
    {
        name: "API 키·토큰",
        re: /(?:sk-[A-Za-z0-9_-]{15,}|npm_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{30,}|(?:AKIA|ASIA)[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|(?:vcp|vercel)_[A-Za-z0-9_-]{20,}|sb_(?:secret|publishable)_[A-Za-z0-9_-]{20,}|sbp_[A-Za-z0-9_-]{20,})/u,
    },
    {
        name: "JWT",
        re: /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/u,
    },
    {
        name: "DB 접속 자격증명",
        re: /\b(?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?|redis|rediss):\/\/[^/\s:@]+:[^@\s/]+@/iu,
    },
    {
        name: "자격증명 할당",
        re: /\b(?:api[_-]?key|secret|token|password|passwd|aws_secret_access_key|service[_-]?role[_-]?key)\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{8,}/iu,
    },
    {
        name: "개인 키",
        re: /-----BEGIN(?: [A-Z0-9]+)* PRIVATE KEY-----/u,
    },
]

function walk(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            walk(full)
            continue
        }
        if (entry.isSymbolicLink()) {
            failures.push(`${path.relative(PUBLIC_DIR, full)}: 심볼릭 링크는 허용하지 않음`)
            continue
        }
        if (entry.isFile()) checkFile(full)
    }
}

function startsWithBytes(buffer, bytes, offset = 0) {
    return bytes.every((byte, index) => buffer[offset + index] === byte)
}

function startsWithText(buffer, text, offset = 0) {
    return buffer.subarray(offset, offset + text.length).toString("ascii") === text
}

function containsIpv4(text) {
    const candidates = text.match(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/gu) ?? []
    return candidates.some((candidate) =>
        candidate.split(".").every((octet) => Number(octet) <= 255)
    )
}

function scanSensitiveText(text, label) {
    for (const pattern of SENSITIVE_PATTERNS) {
        if (pattern.re.test(text)) {
            failures.push(`${label}: ${pattern.name} 포함`)
        }
    }
    if (containsIpv4(text)) failures.push(`${label}: IPv4 주소 포함`)
}

function containsSensitiveValue(text) {
    return SENSITIVE_PATTERNS.some((pattern) => pattern.re.test(text)) || containsIpv4(text)
}

function findEndOfCentralDirectory(buffer) {
    const minimumOffset = Math.max(0, buffer.length - 65_557)
    for (let offset = buffer.length - 22; offset >= minimumOffset; offset -= 1) {
        if (buffer.readUInt32LE(offset) === 0x06054b50) return offset
    }
    return -1
}

function safeZipEntryName(name) {
    const normalized = name.replaceAll("\\", "/")
    return (
        normalized.length > 0 &&
        !normalized.includes("\0") &&
        !normalized.startsWith("/") &&
        !/^[A-Za-z]:\//u.test(normalized) &&
        !normalized.split("/").includes("..")
    )
}

function scanZip(buffer, relative) {
    try {
        const eocdOffset = findEndOfCentralDirectory(buffer)
        if (eocdOffset < 0) throw new Error("central directory 없음")

        const entryCount = buffer.readUInt16LE(eocdOffset + 10)
        const centralSize = buffer.readUInt32LE(eocdOffset + 12)
        const centralOffset = buffer.readUInt32LE(eocdOffset + 16)
        if (
            entryCount > MAX_ZIP_ENTRIES ||
            centralOffset + centralSize > buffer.length ||
            entryCount === 0xffff ||
            centralOffset === 0xffffffff ||
            centralSize === 0xffffffff
        ) {
            throw new Error("비정상 크기 또는 지원하지 않는 ZIP64")
        }

        let offset = centralOffset
        let totalBytes = 0
        for (let index = 0; index < entryCount; index += 1) {
            if (
                offset + 46 > buffer.length ||
                buffer.readUInt32LE(offset) !== 0x02014b50
            ) {
                throw new Error("central directory 손상")
            }

            const flags = buffer.readUInt16LE(offset + 8)
            const method = buffer.readUInt16LE(offset + 10)
            const compressedSize = buffer.readUInt32LE(offset + 20)
            const uncompressedSize = buffer.readUInt32LE(offset + 24)
            const nameLength = buffer.readUInt16LE(offset + 28)
            const extraLength = buffer.readUInt16LE(offset + 30)
            const commentLength = buffer.readUInt16LE(offset + 32)
            const externalAttributes = buffer.readUInt32LE(offset + 38)
            const localOffset = buffer.readUInt32LE(offset + 42)
            const nextOffset =
                offset + 46 + nameLength + extraLength + commentLength
            if (nextOffset > buffer.length) throw new Error("entry metadata 손상")

            const name = buffer
                .subarray(offset + 46, offset + 46 + nameLength)
                .toString("utf8")
            const entryLabel = containsSensitiveValue(name)
                ? `${relative}:<민감한 entry 이름>`
                : `${relative}:${name}`
            if (entryLabel.endsWith(":<민감한 entry 이름>")) {
                failures.push(`${relative}: ZIP entry 파일명에 민감정보 포함`)
            }
            if (!safeZipEntryName(name)) {
                failures.push(`${entryLabel}: 위험한 ZIP 경로`)
            }
            const unixMode = (externalAttributes >>> 16) & 0xffff
            if ((unixMode & 0xf000) === 0xa000) {
                failures.push(`${entryLabel}: ZIP 심볼릭 링크는 허용하지 않음`)
            }
            if ((flags & 0x1) !== 0) throw new Error("암호화 entry는 검사할 수 없음")
            if (
                compressedSize === 0xffffffff ||
                uncompressedSize === 0xffffffff ||
                uncompressedSize > MAX_ZIP_ENTRY_BYTES ||
                totalBytes + uncompressedSize > MAX_ZIP_TOTAL_BYTES
            ) {
                throw new Error("entry 압축 해제 크기 제한 초과")
            }
            totalBytes += uncompressedSize

            if (!name.endsWith("/") && TEXT_EXTENSIONS.has(path.extname(name).toLowerCase())) {
                if (
                    localOffset + 30 > buffer.length ||
                    buffer.readUInt32LE(localOffset) !== 0x04034b50
                ) {
                    throw new Error("local entry header 손상")
                }
                const localNameLength = buffer.readUInt16LE(localOffset + 26)
                const localExtraLength = buffer.readUInt16LE(localOffset + 28)
                const dataOffset =
                    localOffset + 30 + localNameLength + localExtraLength
                const dataEnd = dataOffset + compressedSize
                if (dataEnd > buffer.length) throw new Error("entry data 손상")

                const compressed = buffer.subarray(dataOffset, dataEnd)
                const contents =
                    method === 0
                        ? compressed
                        : method === 8
                          ? inflateRawSync(compressed, {
                                maxOutputLength: MAX_ZIP_ENTRY_BYTES,
                            })
                          : null
                if (!contents) throw new Error(`지원하지 않는 압축 방식 ${method}`)
                if (contents.length !== uncompressedSize) {
                    throw new Error("entry 압축 해제 크기 불일치")
                }
                scanSensitiveText(contents.toString("utf8"), entryLabel)
            }

            offset = nextOffset
        }
        if (offset !== centralOffset + centralSize) {
            throw new Error("central directory 크기 불일치")
        }
    } catch (error) {
        const reason = error instanceof Error ? error.message : "알 수 없는 오류"
        failures.push(`${relative}: ZIP 검사 실패 (${reason})`)
    }
}

function checkFile(file) {
    const extension = path.extname(file).toLowerCase()
    const relative = path.relative(PUBLIC_DIR, file)
    const safeRelative = containsSensitiveValue(relative)
        ? "<민감한 공개 파일명>"
        : relative
    const buffer = fs.readFileSync(file)
    const rawText = buffer.toString("utf8")
    let valid = true

    if (safeRelative !== relative) failures.push("공개 파일명에 민감정보 포함")
    // 이미지 EXIF·문서 metadata·파일 뒤에 덧붙은 평문도 공개되므로, 확장자와
    // 관계없이 원본 바이트에서 읽히는 민감 문자열을 함께 검사한다.
    scanSensitiveText(rawText, safeRelative)

    switch (extension) {
        case ".jpg":
        case ".jpeg":
            valid = startsWithBytes(buffer, [0xff, 0xd8, 0xff])
            break
        case ".png":
            valid = startsWithBytes(buffer, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
            break
        case ".ico":
            valid = startsWithBytes(buffer, [0x00, 0x00, 0x01, 0x00])
            break
        case ".webp":
            valid = startsWithText(buffer, "RIFF") && startsWithText(buffer, "WEBP", 8)
            break
        case ".gif":
            valid = startsWithText(buffer, "GIF87a") || startsWithText(buffer, "GIF89a")
            break
        case ".woff2":
            valid = startsWithText(buffer, "wOF2")
            break
        case ".glb":
            valid = startsWithText(buffer, "glTF")
            break
        case ".mp4":
            valid = startsWithText(buffer, "ftyp", 4)
            break
        case ".avif":
            valid =
                startsWithText(buffer, "ftyp", 4) &&
                (startsWithText(buffer, "avif", 8) || startsWithText(buffer, "avis", 8))
            break
        case ".pdf":
            valid = startsWithText(buffer, "%PDF-")
            break
        case ".zip":
            valid =
                startsWithBytes(buffer, [0x50, 0x4b, 0x03, 0x04]) ||
                startsWithBytes(buffer, [0x50, 0x4b, 0x05, 0x06]) ||
                startsWithBytes(buffer, [0x50, 0x4b, 0x07, 0x08])
            if (valid) scanZip(buffer, safeRelative)
            break
        case ".svg": {
            const text = rawText
            valid =
                /^\s*(?:<\?xml[^>]*>\s*)?(?:<!doctype\s+svg[^>]*>\s*)?<svg[\s>]/iu.test(text) &&
                !/<script[\s>]|<!entity\s|javascript:|\son[a-z]+\s*=/iu.test(text)
            break
        }
        default:
            if (!TEXT_EXTENSIONS.has(extension)) {
                failures.push(`${safeRelative}: 허용 목록에 없는 공개 파일 형식`)
            }
            return
    }

    if (!valid) failures.push(`${safeRelative}: 확장자와 실제 파일 형식이 다름`)
}

walk(PUBLIC_DIR)

if (failures.length > 0) {
    console.error("공개 asset 무결성 검사 실패:")
    for (const failure of failures) console.error(`  - ${failure}`)
    process.exitCode = 1
} else {
    console.log("공개 asset 무결성 검사 통과")
}
