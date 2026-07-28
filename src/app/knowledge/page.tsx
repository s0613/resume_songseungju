import fs from "node:fs"
import path from "node:path"
import Link from "next/link"
import type { Metadata } from "next"
import s from "./knowledge.module.css"

const TITLE = "승주의 지식 볼트"
const DESCRIPTION =
    "AI 에이전트와 일하며 쌓은 실무 노트를 마크다운 그대로 공개합니다. AI 에이전트·기획·설계·프론트엔드·백엔드·데이터·인프라·QA·보안·마케팅까지 폴더째 열람하거나 한 번에 내려받을 수 있습니다."

export const metadata: Metadata = {
    // 블로그와 마찬가지로 루트의 "%s | 송승주" 템플릿은 쓰지 않는다.
    title: { absolute: TITLE },
    description: DESCRIPTION,
    alternates: { canonical: "/knowledge" },
    openGraph: {
        title: TITLE,
        description: DESCRIPTION,
        url: "/knowledge",
        type: "website",
    },
}

const ROOT = path.join(process.cwd(), "public", "knowledge")
/** 폴더별 압축본을 모아둔 곳 — 문서 목록에는 섞이면 안 된다. */
const ZIP_DIR = "zip"

interface KnowledgeFile {
    name: string
    href: string
}

interface KnowledgeGroup {
    /** 대분류 안의 하위 폴더 이름. 대분류 바로 밑 파일은 빈 문자열. */
    name: string
    files: KnowledgeFile[]
}

interface KnowledgeSection {
    name: string
    groups: KnowledgeGroup[]
    count: number
    zipHref: string
    zipSize: string
}

const byName = (a: string, b: string) => a.localeCompare(b, "ko")

/** 폴더를 훑어 `하위 폴더 → 파일` 목록으로 만든다. 빌드 시점에 한 번만 돈다. */
function collect(dir: string, relative: string, groups: Map<string, KnowledgeFile[]>) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true }).sort((a, b) => byName(a.name, b.name))) {
        const full = path.join(dir, entry.name)
        if (entry.isDirectory()) {
            collect(full, relative ? `${relative}/${entry.name}` : entry.name, groups)
            continue
        }
        if (!entry.name.endsWith(".md")) continue
        const files = groups.get(relative) ?? []
        files.push({
            name: entry.name.replace(/\.md$/, ""),
            // 세그먼트마다 인코딩한다 — encodeURI는 '+'를 남겨서 정적 파일 서버가
            // 공백으로 해석해 404가 난다 (예: "Foundry+AIP 플랫폼 설계.md").
            href: `/knowledge/${path
                .relative(ROOT, full)
                .split(path.sep)
                .map(encodeURIComponent)
                .join("/")}`,
        })
        groups.set(relative, files)
    }
}

function readSections(): KnowledgeSection[] {
    return fs
        .readdirSync(ROOT, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && entry.name !== ZIP_DIR)
        .sort((a, b) => byName(a.name, b.name))
        .map((entry) => {
            const groups = new Map<string, KnowledgeFile[]>()
            collect(path.join(ROOT, entry.name), "", groups)
            const ordered = [...groups.entries()]
                .sort(([a], [b]) => byName(a, b))
                .map(([name, files]) => ({ name, files }))
            const zip = path.join(ROOT, ZIP_DIR, `${entry.name}.zip`)
            return {
                name: entry.name,
                groups: ordered,
                count: ordered.reduce((sum, group) => sum + group.files.length, 0),
                zipHref: `/knowledge/${ZIP_DIR}/${encodeURIComponent(entry.name)}.zip`,
                zipSize: `${Math.round(fs.statSync(zip).size / 1024)}KB`,
            }
        })
}

export default function KnowledgePage() {
    const sections = readSections()
    const total = sections.reduce((sum, section) => sum + section.count, 0)
    // 용량은 파일에서 읽는다 — 볼트를 갱신할 때마다 손으로 고치지 않도록.
    const fullZipSize = `${Math.round(
        fs.statSync(path.join(process.cwd(), "public", "songseungju-knowledge.zip"))
            .size / 1024
    )}KB`

    return (
        <div className={s.root}>
            <header className={s.topbar}>
                <div className={s.topbarInner}>
                    <Link href="/blog?category=all" className={s.brand}>
                        승주의 <span className={s.brandSub}>AI</span> 블로그
                    </Link>
                    <nav className={s.topNav}>
                        <Link href="/blog?category=all">블로그</Link>
                        <Link href="/">이력서</Link>
                    </nav>
                </div>
            </header>

            <main className={s.main}>
                <h1 className={s.title}>{TITLE}</h1>
                <p className={s.lead}>
                    에이전트와 일하며 쌓은 실무 노트 {total}개입니다. 아무 문서나 눌러
                    바로 열어보셔도 되고, 전체를 한 번에 받아 옵시디언에서 여셔도
                    됩니다. 고객사 프로젝트 문서와 특정 회사 분석 노트는 빼고
                    공개했습니다.
                </p>

                <div className={s.actions}>
                    <a
                        className={s.download}
                        href="/songseungju-knowledge.zip"
                        download
                    >
                        <span className={s.downloadIcon} aria-hidden="true">
                            ↓
                        </span>
                        <span>
                            <strong>전체 내려받기</strong>
                            <small>
                                문서 {total}개 · ZIP {fullZipSize} · 옵시디언 볼트로
                                바로 열립니다
                            </small>
                        </span>
                    </a>
                    <Link
                        className={s.postLink}
                        href="/blog/obsidian-knowledge-vault-download"
                    >
                        왜 공개하는지 읽어보기 →
                    </Link>
                </div>

                {sections.map((section) => (
                    <section key={section.name} className={s.section}>
                        <h2 className={s.sectionTitle}>
                            {section.name}
                            <span className={s.sectionCount}>{section.count}</span>
                            <a
                                className={s.sectionZip}
                                href={section.zipHref}
                                download
                            >
                                폴더 받기 ↓ <small>{section.zipSize}</small>
                            </a>
                        </h2>
                        {section.groups.map((group) => (
                            <div key={group.name || "_"} className={s.group}>
                                {group.name && (
                                    <div className={s.groupTitle}>{group.name}</div>
                                )}
                                <ul className={s.fileList}>
                                    {group.files.map((file) => (
                                        <li key={file.href}>
                                            <a
                                                className={s.file}
                                                href={file.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {file.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                ))}

                <footer className={s.footer}>
                    © 2026 승주의 AI 블로그 · 송승주 ·{" "}
                    <Link href="/blog?category=all">블로그로 돌아가기 →</Link>
                </footer>
            </main>
        </div>
    )
}
