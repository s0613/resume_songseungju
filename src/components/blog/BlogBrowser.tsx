"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { normalizeCategorySlug } from "@/data/blog"
import BlogBody from "./BlogBody"

/** `?category=`·`?sort=` 쿼리로 필터·정렬한다. 페이지 자체는 정적 프리렌더를 유지한다. */
export default function BlogBrowser() {
    const router = useRouter()
    const params = useSearchParams()
    const rawCategory = params.get("category") ?? "all"
    const category = normalizeCategorySlug(rawCategory)
    const sort = params.get("sort") === "latest" ? "latest" : "views"
    const query = params.toString()

    useEffect(() => {
        if (category === rawCategory) return
        const canonicalParams = new URLSearchParams(query)
        canonicalParams.set("category", category)
        router.replace(`/blog?${canonicalParams}`, { scroll: false })
    }, [category, query, rawCategory, router])

    return <BlogBody activeCategory={category} activeSort={sort} />
}
