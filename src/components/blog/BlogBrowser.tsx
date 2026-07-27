"use client"

import { useSearchParams } from "next/navigation"
import BlogBody from "./BlogBody"

/** `?category=` 쿼리로 카테고리를 필터링한다. 페이지 자체는 정적 프리렌더를 유지한다. */
export default function BlogBrowser() {
    const category = useSearchParams().get("category") ?? "all"
    return <BlogBody activeCategory={category} />
}
