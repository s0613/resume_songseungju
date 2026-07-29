"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Badge } from "@seed-design/react"
import { Chip } from "seed-design/ui/chip"
import {
    categories,
    postsInCategory,
    blogProfile,
    getPostThumbnail,
    normalizeCategorySlug,
    type BlogPost,
} from "@/data/blog"
import { getViewCounts } from "@/components/blog/postCounts"
import PostViewCount from "@/components/blog/PostViewCount"
import s from "@/app/blog/blog.module.css"

export type BlogSort = "views" | "latest"

/** 상단 뉴스 영역에 올릴 최대 글 수. */
const FEATURED_COUNT = 3

const SORT_TABS: { value: BlogSort; label: string }[] = [
    { value: "views", label: "인기순" },
    { value: "latest", label: "최신순" },
]

interface BlogBodyProps {
    /** 카테고리 slug. "all"이거나 알 수 없는 값이면 전체 글을 보여준다. */
    activeCategory: string
    /** 정렬. 기본은 조회수 높은 순("views"). */
    activeSort?: BlogSort
}

/** "2026. 7. 15." 형태의 날짜 문자열을 비교 가능한 timestamp로 변환한다. */
function parsePostDate(date: string): number {
    const [y, m, d] = date
        .split(".")
        .map((part) => Number(part.trim()))
        .filter((n) => !Number.isNaN(n))
    return new Date(y, (m ?? 1) - 1, d ?? 1).getTime()
}

/**
 * 카테고리·정렬 조합의 목록 URL.
 * category는 "all"이어도 항상 명시한다 — href가 현재 pathname("/blog")과 같아지면
 * Next의 Link가 쿼리 차이를 무시하고 이동 자체를 건너뛰어, 필터가 안 풀린다.
 */
function blogHref(category: string, sort: BlogSort): string {
    const params = new URLSearchParams({ category })
    if (sort !== "views") params.set("sort", sort)
    return `/blog?${params}`
}

function sortPosts(
    list: BlogPost[],
    sort: BlogSort,
    counts: Record<string, number> | null
): BlogPost[] {
    const byLatest = (a: BlogPost, b: BlogPost) =>
        parsePostDate(b.date) - parsePostDate(a.date)
    if (sort === "latest" || !counts) return [...list].sort(byLatest)
    return [...list].sort(
        (a, b) =>
            (counts[b.slug] ?? 0) - (counts[a.slug] ?? 0) || byLatest(a, b)
    )
}

/**
 * 블로그 목록 화면 본문(사이드바 + 글 목록).
 * 조회수 정렬은 배치 API 응답이 도착한 뒤 클라이언트에서 적용되고,
 * 그 전(및 프리렌더)에는 최신순으로 보여준다.
 */
export default function BlogBody({
    activeCategory,
    activeSort = "views",
}: BlogBodyProps) {
    const normalizedCategory = normalizeCategorySlug(activeCategory)
    const active = categories.find((cat) => cat.slug === normalizedCategory)
    const activeCatSlug = active?.slug ?? "all"

    const [counts, setCounts] = useState<Record<string, number> | null>(null)
    useEffect(() => {
        let mounted = true
        getViewCounts().then((result) => {
            if (mounted && result) setCounts(result)
        })
        return () => {
            mounted = false
        }
    }, [])

    const filtered = postsInCategory(activeCatSlug)
    const visiblePosts = sortPosts(filtered, activeSort, counts)

    // 전체보기에서만 상단을 뉴스형(이미지+제목) 카드로 분리한다.
    // 본문에 이미지가 있는 글만 올린다 — 대체 썸네일은 쓰지 않는다.
    const withThumb = visiblePosts.filter((post) => getPostThumbnail(post))
    const featuredPosts =
        activeCatSlug === "all" && withThumb.length < visiblePosts.length
            ? withThumb.slice(0, FEATURED_COUNT)
            : []
    const featuredSlugs = new Set(featuredPosts.map((post) => post.slug))
    const listPosts = visiblePosts.filter((post) => !featuredSlugs.has(post.slug))

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
                        <div className={s.profileHandle}>{blogProfile.contact}</div>
                        <p className={s.profileIntro}>{blogProfile.intro}</p>
                    </div>
                </div>

                <nav className={s.catCard} aria-label="카테고리">
                    <div className={s.catTitle}>카테고리</div>
                    <ul className={s.catList}>
                        {categories.map((cat) => {
                            const isActive = cat.slug === activeCatSlug
                            return (
                                <li key={cat.slug}>
                                    <Link
                                        href={blogHref(cat.slug, activeSort)}
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
                    <strong>
                        {active && active.slug !== "all" ? active.name : "전체 글"}
                    </strong>
                    <span>{visiblePosts.length}개의 글</span>
                    <nav className={s.sortTabs} aria-label="글 정렬">
                        {SORT_TABS.map((tab) => {
                            const isActive = activeSort === tab.value
                            return (
                                <Chip.Button
                                    key={tab.value}
                                    asChild
                                    size="small"
                                    variant={isActive ? "solid" : "outlineWeak"}
                                >
                                    <Link
                                        href={blogHref(activeCatSlug, tab.value)}
                                        aria-current={isActive ? "true" : undefined}
                                    >
                                        <Chip.Label>{tab.label}</Chip.Label>
                                    </Link>
                                </Chip.Button>
                            )
                        })}
                    </nav>
                </div>

                {featuredPosts.length > 0 && (
                    <div className={s.featuredGrid}>
                        {featuredPosts.map((post) => {
                            const thumb = getPostThumbnail(post)
                            if (!thumb) return null
                            return (
                                <Link
                                    key={post.slug}
                                    href={`/blog/${post.slug}`}
                                    className={s.featuredCard}
                                >
                                    <div className={s.featuredMedia}>
                                        <Image
                                            src={thumb.src}
                                            alt={thumb.alt}
                                            width={thumb.width}
                                            height={thumb.height}
                                            className={s.featuredImg}
                                        />
                                    </div>
                                    <h2 className={s.featuredTitle}>{post.title}</h2>
                                </Link>
                            )
                        })}
                    </div>
                )}

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
                        {listPosts.map((post) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className={s.postCard}
                            >
                                <div className={s.postMain}>
                                    <Badge variant="weak" tone="brand">
                                        {post.category}
                                    </Badge>
                                    <h2 className={s.postTitle}>{post.title}</h2>
                                    <p className={s.postExcerpt}>{post.excerpt}</p>
                                    <div className={s.postMeta}>
                                        <span>{post.date}</span>
                                        <PostViewCount slug={post.slug} />
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
