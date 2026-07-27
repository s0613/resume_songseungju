import Link from "next/link"
import Image from "next/image"
import { posts, categories, blogProfile } from "@/data/blog"
import s from "@/app/blog/blog.module.css"

interface BlogBodyProps {
    /** 카테고리 slug. "all"이거나 알 수 없는 값이면 전체 글을 보여준다. */
    activeCategory: string
}

/**
 * 블로그 목록 화면 본문(사이드바 + 글 목록).
 * 서버(정적 프리렌더)와 클라이언트(쿼리 필터) 양쪽에서 그대로 재사용한다.
 */
export default function BlogBody({ activeCategory }: BlogBodyProps) {
    const active = categories.find((cat) => cat.slug === activeCategory)
    const visiblePosts =
        !active || active.slug === "all"
            ? posts
            : posts.filter((post) => post.category === active.name)

    return (
        <div className={s.layout}>
            {/* 사이드바 */}
            <aside className={s.sidebar}>
                <div className={s.profileCard}>
                    <div className={s.profilePhoto}>
                        <Image
                            src="/kkachi-horangi.webp"
                            alt="까치호랑이 민화"
                            width={760}
                            height={915}
                            className={s.profilePhotoImg}
                            priority
                        />
                    </div>
                    <div className={s.profileBody}>
                        <div className={s.profileNick}>{blogProfile.nickname}</div>
                        <div className={s.profileHandle}>@{blogProfile.handle}</div>
                        <p className={s.profileIntro}>{blogProfile.intro}</p>
                    </div>
                </div>

                <nav className={s.catCard} aria-label="카테고리">
                    <div className={s.catTitle}>카테고리</div>
                    <ul className={s.catList}>
                        {categories.map((cat) => {
                            const isActive = active
                                ? cat.slug === active.slug
                                : cat.slug === "all"
                            return (
                                <li key={cat.slug}>
                                    <Link
                                        href={
                                            cat.slug === "all"
                                                ? "/blog"
                                                : `/blog?category=${cat.slug}`
                                        }
                                        className={`${s.catItem} ${
                                            isActive ? s.catActive : ""
                                        }`}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        <span>{cat.name}</span>
                                        <span className={s.catCount}>{cat.count}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </aside>

            {/* 메인 */}
            <main className={s.main}>
                <div className={s.blogHead}>
                    <h1 className={s.blogTitle}>승주의 AI 블로그</h1>
                    <p className={s.blogDesc}>
                        AI와 AI 에이전트에 대한 <strong>인사이트 · 경험 · 학습</strong>을
                        친근하게 나누는 공간이에요. 에이전트랑 일하며 삽질하고 배운 것들을
                        솔직하게 기록합니다. 편하게 둘러보세요.
                    </p>
                </div>

                <div className={s.sectionLabel}>
                    <strong>{active && active.slug !== "all" ? active.name : "최근 글"}</strong>
                    <span>{visiblePosts.length}개의 글</span>
                </div>

                {visiblePosts.length === 0 ? (
                    <div className={s.empty}>
                        <div className={s.emptyTitle}>아직 발행한 글이 없어요</div>
                        <p className={s.emptyDesc}>
                            곧 AI와 에이전트에 대한 인사이트로 찾아올게요. 조금만 기다려
                            주세요.
                        </p>
                    </div>
                ) : (
                    <div className={s.postList}>
                        {visiblePosts.map((post) => (
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
    )
}
