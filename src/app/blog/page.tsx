import { Suspense } from "react"
import Link from "next/link"
import BlogBody from "@/components/blog/BlogBody"
import BlogBrowser from "@/components/blog/BlogBrowser"
import s from "./blog.module.css"

// metadata는 blog/layout.tsx에서 단일 소스로 관리 (title 중복 접미사 방지)

export default function BlogHome() {
    return (
        <div className={s.root}>
            {/* 상단 바 */}
            <header className={s.topbar}>
                <div className={s.topbarInner}>
                    {/* 목록 화면에서 눌렀을 때 필터가 풀리도록 category를 명시한다.
                        href가 현재 pathname과 같으면 Link가 이동을 건너뛴다. */}
                    <Link href="/blog?category=all" className={s.brand}>
                        <span>
                            승주의 <span className={s.brandSub}>AI</span> 블로그
                        </span>
                    </Link>
                    <nav className={s.topNav}>
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

            {/* 쿼리 파라미터는 클라이언트에서 읽고, 프리렌더에는 전체 목록을 그대로 담는다. */}
            <Suspense fallback={<BlogBody activeCategory="all" />}>
                <BlogBrowser />
            </Suspense>
        </div>
    )
}
