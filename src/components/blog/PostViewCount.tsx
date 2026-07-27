"use client"

import { useEffect, useState } from "react"
import s from "@/app/blog/blog.module.css"

// 목록의 모든 카드가 공유하는 1회성 배치 요청 — 카드 수만큼 fetch하지 않는다.
let countsPromise: Promise<Record<string, number> | null> | null = null

function getCounts() {
    if (!countsPromise) {
        countsPromise = fetch("/api/blog/views")
            .then(async (res) => {
                if (!res.ok) return null
                const data: unknown = await res.json()
                if (
                    typeof data === "object" &&
                    data !== null &&
                    typeof (data as { counts?: unknown }).counts === "object"
                ) {
                    return (data as { counts: Record<string, number> }).counts
                }
                return null
            })
            .catch(() => null)
    }
    return countsPromise
}

/** 블로그 목록 카드의 조회수. API 미설정·오류 시 아무것도 렌더하지 않는다. */
export default function PostViewCount({ slug }: { slug: string }) {
    const [count, setCount] = useState<number | null>(null)

    useEffect(() => {
        let mounted = true
        getCounts().then((counts) => {
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
