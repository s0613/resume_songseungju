#!/usr/bin/env node
/**
 * 옵시디언 지식 폴더 → public/knowledge 동기화.
 *
 *   node scripts/sync-knowledge.mjs          실제 반영
 *   node scripts/sync-knowledge.mjs --dry    무엇이 빠지는지만 확인
 *
 * 공개 대상은 볼트의 `10_지식`뿐이다. 개인·고객사 자료는 `95_비공개`로 옮겨 두면
 * 애초에 스캔 대상에도 들어오지 않는다. 그래도 남아 있을 수 있는 유출을 막기 위해
 * 파일 내용을 한 번 더 훑어, 아래 패턴에 걸리는 문서는 공개본에서 제외한다.
 * 제외 사유는 항상 출력한다 — 조용히 빠지는 일은 없어야 한다.
 */

import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"

const VAULT =
    process.env.OBSIDIAN_VAULT_DIR ??
    path.join(os.homedir(), "obsidian-vaults", "AI 에이전트")
const SRC = path.join(VAULT, "10_지식")
const DST = path.join(process.cwd(), "public", "knowledge")
const ZIP_DIR = path.join(DST, "zip")
const FULL_ZIP = path.join(process.cwd(), "public", "songseungju-knowledge.zip")
const DRY = process.argv.includes("--dry")

const MAX_MARKDOWN_BYTES = 1024 * 1024

/** 이 중 하나라도 파일 경로나 본문에 걸리면 공개하지 않는다. */
const BLOCKERS = [
    { name: "고객사·타사명", re: /인천항만|POSCO|포스코|samchungdang|삼청당|채널톡/i },
    { name: "로컬 절대경로", re: /(?:\/Users\/|\/home\/[a-z]|[A-Z]:\\Users\\)/i },
    { name: "내부 프로젝트 경로", re: /upflow_|totaro/i },
    { name: "이메일", re: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|kr|io|dev)/ },
    { name: "전화번호", re: /01[016-9]-[0-9]{3,4}-[0-9]{4}|0[2-6][0-9]?-[0-9]{3,4}-[0-9]{4}/ },
    { name: "학교·생년", re: /대학교|대학원|학번|고등학교|19[89][0-9]년생|20[0-9]{2}년생/ },
    {
        name: "API 키·토큰",
        re: /(?:sk-[A-Za-z0-9_-]{15,}|npm_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{30,}|(?:AKIA|ASIA)[0-9A-Z]{16}|gh[pousr]_[A-Za-z0-9_]{20,}|github_pat_[A-Za-z0-9_]{20,}|xox[baprs]-[A-Za-z0-9-]{10,}|(?:vcp|vercel)_[A-Za-z0-9_-]{20,}|sb_(?:secret|publishable)_[A-Za-z0-9_-]{20,}|sbp_[A-Za-z0-9_-]{20,})/,
    },
    {
        name: "JWT",
        re: /\beyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\b/,
    },
    {
        name: "DB 접속 자격증명",
        re: /\b(?:postgres(?:ql)?|mysql|mariadb|mongodb(?:\+srv)?|redis|rediss):\/\/[^/\s:@]+:[^@\s/]+@/i,
    },
    {
        name: "자격증명 할당",
        re: /\b(?:api[_-]?key|secret|token|password|passwd|aws_secret_access_key|service[_-]?role[_-]?key)\s*[:=]\s*["']?[A-Za-z0-9_./+=-]{8,}/i,
    },
    {
        name: "개인 키",
        re: /-----BEGIN(?: [A-Z0-9]+)* PRIVATE KEY-----/,
    },
]

const readme = (rows) => `# 승주의 지식 볼트 (공개판)

AI 에이전트와 함께 일하면서 쌓은 실무 지식 노트입니다.
옵시디언(Obsidian) 볼트에서 쓰던 마크다운 파일을 그대로 담았습니다.

## 쓰는 법

1. 압축을 풉니다.
2. 옵시디언에서 폴더를 볼트로 열거나, 기존 볼트에 통째로 복사합니다.
3. 문서끼리 \`[[위키링크]]\`로 연결돼 있어 옵시디언에서 열어야 그래프·백링크가 살아납니다.

에디터 없이 그냥 읽어도 됩니다. 전부 평범한 마크다운입니다.

## 폴더

| 폴더 | 문서 수 |
|------|--------|
${rows}

## 안내

- 고객사 프로젝트 문서와 특정 회사 분석 노트는 빼고 공개했습니다.
- 제 경험에 기반한 정리라 틀린 내용이 있을 수 있습니다. 참고용으로 봐주세요.
- 자유롭게 쓰셔도 되고, 출처를 남겨주시면 고맙겠습니다.

songseungju.dev
`

function walk(dir, base = dir) {
    return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) return walk(full, base)
        return [path.relative(base, full)]
    })
}

if (!fs.existsSync(SRC)) {
    console.error(`지식 폴더를 찾지 못했습니다: ${SRC}`)
    process.exit(1)
}

const all = walk(SRC).sort()
const publish = []
const blocked = []

for (const rel of all) {
    const full = path.join(SRC, rel)
    const pathHit = BLOCKERS.find((blocker) => blocker.re.test(rel))
    if (pathHit) {
        blocked.push({ rel: "<민감한 파일명 숨김>", reason: `${pathHit.name} 포함 파일명` })
        continue
    }
    const stat = fs.lstatSync(full)
    if (!stat.isFile()) {
        blocked.push({ rel, reason: "심볼릭 링크·특수 파일" })
        continue
    }
    if (path.extname(rel).toLowerCase() !== ".md") {
        blocked.push({ rel, reason: "Markdown 외 파일" })
        continue
    }
    if (stat.size > MAX_MARKDOWN_BYTES) {
        blocked.push({ rel, reason: "비정상적으로 큰 문서" })
        continue
    }
    const text = fs.readFileSync(full, "utf8")
    const hit = BLOCKERS.find((blocker) => blocker.re.test(text))
    if (hit) blocked.push({ rel, reason: hit.name })
    else publish.push(rel)
}

console.log(`대상 ${all.length}개 · 공개 ${publish.length}개 · 제외 ${blocked.length}개`)
if (blocked.length) {
    console.log("\n제외 항목 (파일 경로·형식·본문 검사에 걸려 공개하지 않음):")
    for (const { rel, reason } of blocked) {
        if (reason !== "Markdown 외 파일") console.log(`  [${reason}] ${rel}`)
    }
    const nonMarkdownCount = blocked.filter(({ reason }) => reason === "Markdown 외 파일").length
    if (nonMarkdownCount) {
        console.log(`  [Markdown 외 파일] ${nonMarkdownCount}개 (허용 목록 밖이라 경로 생략)`)
    }
}

if (DRY) {
    console.log("\n--dry 모드라 파일은 건드리지 않았습니다.")
} else {
    fs.rmSync(DST, { recursive: true, force: true })
    for (const rel of publish) {
        const to = path.join(DST, rel)
        fs.mkdirSync(path.dirname(to), { recursive: true })
        fs.copyFileSync(path.join(SRC, rel), to)
    }

    // 폴더 표는 실제 폴더에서 만든다 — 손으로 적으면 갱신할 때마다 어긋난다.
    const counts = new Map()
    for (const rel of publish) {
        const top = rel.split(path.sep)[0]
        counts.set(top, (counts.get(top) ?? 0) + 1)
    }
    fs.writeFileSync(
        path.join(DST, "README.md"),
        readme(
            [...counts.entries()]
                .sort(([a], [b]) => a.localeCompare(b, "ko"))
                .map(([name, n]) => `| ${name} | ${n} |`)
                .join("\n")
        )
    )

    // 대분류별 압축 + 전체 압축. zip은 갱신이 아니라 새로 만든다 (지운 문서가 남지 않도록).
    fs.mkdirSync(ZIP_DIR, { recursive: true })
    const sections = fs
        .readdirSync(DST, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name !== "zip")
        .map((entry) => entry.name)
        .sort()

    for (const section of sections) {
        execFileSync("zip", ["-qr9", "-X", path.join(ZIP_DIR, `${section}.zip`), section], {
            cwd: DST,
        })
    }

    fs.rmSync(FULL_ZIP, { force: true })
    const staging = fs.mkdtempSync(path.join(os.tmpdir(), "knowledge-"))
    const bundle = path.join(staging, "songseungju-knowledge")
    fs.cpSync(DST, bundle, { recursive: true })
    fs.rmSync(path.join(bundle, "zip"), { recursive: true, force: true })
    execFileSync("zip", ["-qr9", "-X", FULL_ZIP, "songseungju-knowledge"], { cwd: staging })
    fs.rmSync(staging, { recursive: true, force: true })

    const kb = (file) => `${Math.round(fs.statSync(file).size / 1024)}KB`
    console.log(`\n동기화 완료 — ${publish.length}개 문서`)
    for (const section of sections) {
        console.log(
            `  ${section.padEnd(18)} ${String(counts.get(section) ?? 0).padStart(3)}개 · ` +
                kb(path.join(ZIP_DIR, `${section}.zip`))
        )
    }
    console.log(`  ${"전체".padEnd(18)} ${publish.length}개 · ${kb(FULL_ZIP)}`)
    console.log(
        "\n다음:\n" +
            "  1. src/data/blog.ts 의 downloadList 개수·용량이 위 값과 다르면 맞추세요.\n" +
            "  2. npm run build (열람 페이지 목록은 빌드 시 자동 갱신됩니다)"
    )
}
