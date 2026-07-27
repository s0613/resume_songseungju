"use client"

import { useEffect, useState } from "react"
import { getViewCounts } from "@/components/blog/postCounts"
import s from "@/app/blog/blog.module.css"

/** 블로그 목록 카드의 조회수. API 미설정·오류 시 아무것도 렌더하지 않는다. */
export default function PostViewCount({ slug }: { slug: string }) {
    const [count, setCount] = useState<number | null>(null)

    useEffect(() => {
        let mounted = true
        getViewCounts().then((counts) => {
            if (mounted && counts) setCount(counts[slug] ?? 0)
        })
        return () => {
            mounted = false
        }
    }, [slug])

    if (count === null) return null

    return (
        <>
            <span className={s.dot} />
            <span>조회 {count.toLocaleString("ko-KR")}</span>
        </>
    )
}
