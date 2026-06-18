import type { Metadata } from "next"
import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { posts, getPost, blogProfile, type BlogBlock } from "@/data/blog"
import s from "../blog.module.css"

export function generateStaticParams() {
    return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params
    const post = getPost(slug)
    if (!post) return {}

    const url = `/blog/${slug}`
    return {
        title: `${post.title} | 승주의 AI 블로그`,
        description: post.excerpt,
        keywords: post.tags,
        alternates: { canonical: url },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url,
            type: "article",
        },
    }
}

function renderInline(text: string, keyPrefix: string) {
    // __굵게__ 와 [텍스트](url) 링크를 함께 처리
    const nodes: ReactNode[] = []
    const regex = /\[([^\]]+)\]\(([^)]+)\)|__(.+?)__/g
    let last = 0
    let j = 0
    let m: RegExpExecArray | null
    while ((m = regex.exec(text)) !== null) {
        if (m.index > last) nodes.push(text.slice(last, m.index))
        if (m[1] !== undefined) {
            nodes.push(
                <a
                    key={`${keyPrefix}-${j}`}
                    href={m[2]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.inlineLink}
                >
                    {m[1]}
                </a>
            )
        } else {
            nodes.push(<strong key={`${keyPrefix}-${j}`}>{m[3]}</strong>)
        }
        last = m.index + m[0].length
        j++
    }
    if (last < text.length) nodes.push(text.slice(last))
    return nodes
}

function renderBlock(block: BlogBlock, i: number) {
    switch (block.type) {
        case "paragraph":
            return (
                <p key={i} className={s.para}>
                    {renderInline(block.content, `p${i}`)}
                </p>
            )
        case "heading":
            return (
                <h2 key={i} className={s.heading}>
                    {block.content}
                </h2>
            )
        case "quote":
            return (
                <blockquote key={i} className={s.quote}>
                    <div className={s.quoteMark}>&ldquo;</div>
                    <p className={s.quoteText}>{block.content}</p>
                    {block.author && <div className={s.quoteAuthor}>{block.author}</div>}
                </blockquote>
            )
        case "list":
            return (
                <ul key={i} className={s.list}>
                    {block.items.map((item, j) => (
                        <li key={j}>{renderInline(item, `l${i}-${j}`)}</li>
                    ))}
                </ul>
            )
        case "tip":
            return (
                <div key={i} className={s.tipBox}>
                    <div className={s.tipTitle}>{block.title}</div>
                    <div className={s.tipText}>{block.content}</div>
                </div>
            )
        case "figure":
            return (
                <figure key={i} className={s.figure}>
                    <div className={s.figureBox}>{block.emoji}</div>
                    {block.caption && (
                        <figcaption className={s.figureCaption}>{block.caption}</figcaption>
                    )}
                </figure>
            )
        case "image":
            return (
                <figure key={i} className={s.figure}>
                    <Image
                        src={block.src}
                        alt={block.alt}
                        width={block.width}
                        height={block.height}
                        className={s.figureImg}
                        sizes="(max-width: 820px) 90vw, 720px"
                    />
                    {block.caption && (
                        <figcaption className={s.figureCaption}>{block.caption}</figcaption>
                    )}
                </figure>
            )
        case "code":
            return (
                <figure key={i} className={s.codeFigure}>
                    {block.lang && <div className={s.codeLang}>{block.lang}</div>}
                    <pre className={s.codeBlock}>
                        <code>{block.code}</code>
                    </pre>
                    {block.caption && (
                        <figcaption className={s.figureCaption}>{block.caption}</figcaption>
                    )}
                </figure>
            )
        default:
            return null
    }
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    const post = getPost(slug)
    if (!post) notFound()

    const idx = posts.findIndex((p) => p.slug === slug)
    // posts는 최신순(0번이 최신). 시간 기준으로 '이전 글'은 더 오래된 글, '다음 글'은 더 최신 글.
    const olderPost = idx < posts.length - 1 ? posts[idx + 1] : null
    const newerPost = idx > 0 ? posts[idx - 1] : null

    return (
        <div className={s.root}>
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
                <aside className={s.sidebar}>
                    <div className={s.profileCard}>
                        <div className={s.profilePhoto}>
                            <Image
                                src="/kkachi-horangi.webp"
                                alt="까치호랑이 민화"
                                width={760}
                                height={915}
                                className={s.profilePhotoImg}
                            />
                        </div>
                        <div className={s.profileBody}>
                            <div className={s.profileNick}>{blogProfile.nickname}</div>
                            <div className={s.profileHandle}>@{blogProfile.handle}</div>
                            <p className={s.profileIntro}>{blogProfile.intro}</p>
                        </div>
                    </div>
                </aside>

                <main className={s.main}>
                    <article className={s.article}>
                        <Link href="/blog" className={s.backLink}>
                            ← 목록으로
                        </Link>

                        <span className={s.articleCat}>{post.category}</span>
                        <h1 className={s.articleTitle}>{post.title}</h1>
                        <div className={s.articleMeta}>
                            <span className={s.articleAuthor}>{blogProfile.nickname}</span>
                            <span className={s.dot} />
                            <span>{post.date}</span>
                            <span className={s.dot} />
                            <span>{post.readTime} 읽기</span>
                        </div>

                        <div className={s.body}>
                            {post.blocks.map((block, i) => renderBlock(block, i))}
                        </div>

                        <div className={s.tagRow}>
                            {post.tags.map((tag) => (
                                <span key={tag} className={s.tag}>
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        <div className={s.authorCard}>
                            <div>
                                <div className={s.authorCardName}>{blogProfile.nickname}</div>
                                <p className={s.authorCardIntro}>{blogProfile.intro}</p>
                            </div>
                        </div>
                    </article>

                    <div className={s.adjacent}>
                        {olderPost ? (
                            <Link href={`/blog/${olderPost.slug}`} className={s.adjItem}>
                                <div className={s.adjLabel}>← 이전 글</div>
                                <div className={s.adjTitle}>{olderPost.title}</div>
                            </Link>
                        ) : (
                            <span />
                        )}
                        {newerPost ? (
                            <Link
                                href={`/blog/${newerPost.slug}`}
                                className={`${s.adjItem} ${s.adjNext}`}
                            >
                                <div className={s.adjLabel}>다음 글 →</div>
                                <div className={s.adjTitle}>{newerPost.title}</div>
                            </Link>
                        ) : (
                            <span />
                        )}
                    </div>

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
