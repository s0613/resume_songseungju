import Image from "next/image"
import Link from "next/link"
import { articles } from "@/data/insights"
import s from "./insights.module.css"

export default function InsightsIndexPage() {
    const sortedArticles = [...articles].sort((a, b) => Number(b.num) - Number(a.num))
    return (
        <div className={s.root}>
            <div className={s.bgImg}>
                <Image src="/adam-creation.webp" alt="" fill style={{ objectFit: "cover", objectPosition: "25% 30%", opacity: 0.04 }} priority />
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
                    <p className={s.pageLabel}>Insights</p>
                    <h1 className={s.pageTitle}>인사이트</h1>
                </div>

                <div className={s.articleList}>
                    {sortedArticles.map((article) => (
                        <Link key={article.slug} href={`/s-skills/insights/${article.slug}`} className={s.articleCard}>
                            <div className={s.articleCardMeta}>
                                <span className={s.articleNum}>{article.num}</span>
                                <span className={s.articleDate}>{article.date}</span>
                                <span className={s.articleTag}>{article.tag}</span>
                            </div>
                            <h2 className={s.articleCardTitle}>
                                {article.title}
                                {article.titleBreak && <><br />{article.titleBreak}</>}
                            </h2>
                            <p className={s.articleCardLead}>{article.lead}</p>
                            <span className={s.articleCardMore}>읽기 →</span>
                        </Link>
                    ))}
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
