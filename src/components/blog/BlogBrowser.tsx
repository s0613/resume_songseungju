"use client"

import { useSearchParams } from "next/navigation"
import BlogBody from "./BlogBody"

/** `?category=`·`?sort=` 쿼리로 필터·정렬한다. 페이지 자체는 정적 프리렌더를 유지한다. */
export default function BlogBrowser() {
    const params = useSearchParams()
    const category = params.get("category") ?? "all"
    const sort = params.get("sort") === "latest" ? "latest" : "views"
    return <BlogBody activeCategory={category} activeSort={sort} />
}
