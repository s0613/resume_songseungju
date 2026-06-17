import type { Metadata } from "next"
import Link from "next/link"
import { posts, categories, blogProfile } from "@/data/blog"
import s from "./blog.module.css"

export const metadata: Metadata = {
    title: "승주의 AI 블로그 | 송승주",
    description:
        "AI와 AI 에이전트에 대한 인사이트·경험·학습을 친근하게 나누는 블로그입니다.",
}

export default function BlogHome() {
    return (
        <div className={s.root}>
            {/* 상단 바 */}
            <header className={s.topbar}>
                <div className={s.topbarInner}>
                    <Link href="/blog" className={s.brand}>
                        <span>
                            승주의 <span className={s.brandSub}>AI</span> 블로그
                        </span>
                    </Link>
                    <nav className={s.topNav}>
                        <Link href="/">이력서</Link>
                        <Link href="/s-skills">S-Skills</Link>
                        <a
                            href="https://github.com/s0613"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            GitHub
                        </a>
                    </nav>
                </div>
            </header>

            <div className={s.layout}>
                {/* 사이드바 */}
                <aside className={s.sidebar}>
                    <div className={s.profileCard}>
                        <div className={s.profileCover} />
                        <div className={s.profileBody}>
                            <div className={s.profileNick}>{blogProfile.nickname}</div>
                            <div className={s.profileHandle}>@{blogProfile.handle}</div>
                            <p className={s.profileIntro}>{blogProfile.intro}</p>
                        </div>
                    </div>

                    <div className={s.catCard}>
                        <div className={s.catTitle}>카테고리</div>
                        <ul className={s.catList}>
                            {categories.map((cat, i) => (
                                <li
                                    key={cat.slug}
                                    className={`${s.catItem} ${i === 0 ? s.catActive : ""}`}
                                >
                                    <span>{cat.name}</span>
                                    <span className={s.catCount}>{cat.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                {/* 메인 */}
                <main className={s.main}>
                    <div className={s.blogHead}>
                        <h1 className={s.blogTitle}>승주의 AI 블로그</h1>
                        <p className={s.blogDesc}>
                            AI와 AI 에이전트에 대한 <strong>인사이트 · 경험 · 학습</strong>을
                            친근하게 나누는 공간이에요. 에이전트랑 일하며 삽질하고 배운
                            것들을 솔직하게 기록합니다. 편하게 둘러보세요.
                        </p>
                    </div>

                    <div className={s.sectionLabel}>
                        <strong>최근 글</strong>
                        <span>{posts.length}개의 글</span>
                    </div>

                    {posts.length === 0 ? (
                        <div className={s.empty}>
                            <div className={s.emptyTitle}>아직 발행한 글이 없어요</div>
                            <p className={s.emptyDesc}>
                                곧 AI와 에이전트에 대한 인사이트로 찾아올게요. 조금만
                                기다려 주세요.
                            </p>
                        </div>
                    ) : (
                        <div className={s.postList}>
                            {posts.map((post) => (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className={s.postCard}
                                >
                                    <div className={s.postMain}>
                                        <span className={s.postCat}>{post.category}</span>
                                        <h2 className={s.postTitle}>{post.title}</h2>
                                        <p className={s.postExcerpt}>{post.excerpt}</p>
                                        <div className={s.postMeta}>
                                            <span>{post.date}</span>
                                            <span className={s.dot} />
                                            <span>{post.readTime} 읽기</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}

                    <footer className={s.footer}>
                        <div>
                            © 2026 승주의 AI 블로그 · 송승주 ·{" "}
                            <Link href="/">이력서로 돌아가기 →</Link>
                        </div>
                    </footer>
                </main>
            </div>
        </div>
    )
}
