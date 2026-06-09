import { notFound } from "next/navigation"
import Image from "next/image"
import { articles, getArticle, type Block } from "@/data/insights"
import s from "../insights.module.css"

export function generateStaticParams() {
    return articles.map((a) => ({ slug: a.slug }))
}

function renderBlock(block: Block, i: number) {
    if (block.type === "paragraph") {
        const parts = block.content.split(/__(.*?)__/)
        return (
            <p key={i} className={s.bodyParagraph}>
                {parts.map((part, j) =>
                    j % 2 === 1
                        ? <strong key={j} style={{ color: "rgb(255,172,2)" }}>{part}</strong>
                        : part
                )}
            </p>
        )
    }

    if (block.type === "heading") {
        return <h3 key={i} className={s.bodyHeading}>{block.content}</h3>
    }

    if (block.type === "cardNews") {
        return (
            <div key={i} className={s.cardNews}>
                {block.cards.map((card, j) => (
                    <div key={j} className={s.card}>
                        <div className={s.cardNum}>{card.num}</div>
                        <div className={s.cardTitle}>{card.title}</div>
                        <div className={s.cardBody}>{card.body}</div>
                        <code className={s.cardTag}>{card.tag}</code>
                    </div>
                ))}
            </div>
        )
    }

    if (block.type === "harnessRefs") {
        return (
            <div key={i} className={s.harnessRefs}>
                {block.refs.map((ref, j) => (
                    <div key={j} className={s.harnessRef}>
                        <div className={s.harnessRefName}>{ref.name}</div>
                        <div className={s.harnessRefDesc}>{ref.desc}</div>
                        <span className={s.harnessRefTag}>{ref.tag}</span>
                    </div>
                ))}
            </div>
        )
    }

    if (block.type === "cta") {
        const parts = block.text.split(/__(.*?)__/)
        return (
            <div key={i} className={s.ctaBlock}>
                <p className={s.ctaText}>
                    {parts.map((part, j) =>
                        j % 2 === 1
                            ? <strong key={j}>{part}</strong>
                            : part
                    )}
                </p>
                <a href={block.btnHref} className={s.ctaBtn}>{block.btnText}</a>
            </div>
        )
    }

    return null
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const article = getArticle(slug)
    if (!article) notFound()

    return (
        <div className={s.root}>
            <div className={s.bgImg}>
                <Image src="/adam-creation.webp" alt="" fill style={{ objectFit: "cover", objectPosition: "25% 30%", opacity: 0.22 }} priority />
            </div>
            <div className={s.bgOverlay} />

            <nav className={s.nav}>
                <a href="/s-skills" className={s.navLogo}>S-SKILLS</a>
                <ul className={s.navLinks}>
                    <li><a href="https://github.com/s0613/S-skills">Docs</a></li>
                    <li><a href="/s-skills/insights" className={s.active}>인사이트</a></li>
                    <li><a href="/s-skills#outsource">외주</a></li>
                    <li><a href="/">이력서 →</a></li>
                </ul>
                <a href="https://github.com/s0613/S-skills" className={s.navGh}>GH</a>
            </nav>

            <main className={s.main}>
                <div className={s.pageHeader}>
                    <p className={s.pageLabel}>
                        <a href="/s-skills/insights" className={s.backLink}>← 인사이트</a>
                    </p>
                    <div className={s.articleMeta}>
                        <span className={s.articleNum}>{article.num}</span>
                        <span className={s.articleDate}>{article.date}</span>
                        <span className={s.articleTag}>{article.tag}</span>
                    </div>
                    <h1 className={s.articleTitle}>
                        {article.title}
                        {article.titleBreak && <><br />{article.titleBreak}</>}
                    </h1>
                    <p className={s.articleLead}>{article.lead}</p>
                </div>

                <div className={s.articleBody}>
                    {article.blocks.map((block, i) => renderBlock(block, i))}
                </div>
            </main>

            <footer className={s.footer}>
                <span className={s.footerBrand}>S-SKILLS</span>
                <div className={s.footerMeta}>
                    <a href="https://github.com/s0613/S-skills">SONG SEUNGJU</a>
                    <span>NOUS RESEARCH 영감</span>
                    <span>MIT LICENSE · 2026</span>
                </div>
            </footer>
        </div>
    )
}
