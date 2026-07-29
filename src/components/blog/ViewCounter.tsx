"use client"

import { useEffect, useRef, useState } from "react"
import s from "@/app/blog/blog.module.css"

interface ViewCounterProps {
    slug: string
}

/**
 * 블로그 상세 진입 시 조회수를 1회 증가시키고 표시한다.
 * 조회수 API가 미설정(503)이거나 오류일 때는 아무것도 렌더하지 않는다(graceful degrade).
 */
export default function ViewCounter({ slug }: ViewCounterProps) {
    const [count, setCount] = useState<number | null>(null)
    // StrictMode의 이중 마운트에서도 POST가 두 번 나가지 않도록 하는 가드.
    const requested = useRef(false)

    useEffect(() => {
        if (requested.current) return
        requested.current = true

        // 요청을 abort하지 않는다 — StrictMode의 즉시 언마운트로 증가 요청이 취소되면
        // 조회수가 누락되기 때문. 완료 후의 setState는 React 19에서 안전하다.
        fetch(`/api/blog/views/${slug}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "{}",
        })
            .then(async (res) => {
                // 같은 NAT의 다른 방문자나 재방문은 증가 제한(429)에 걸릴 수 있다.
                // 그 경우에도 현재 조회수는 별도 GET으로 표시한다.
                const countResponse =
                    res.status === 429
                        ? await fetch(`/api/blog/views/${slug}`)
                        : res
                if (!countResponse.ok) return
                const data: unknown = await countResponse.json()
                if (
                    typeof data === "object" &&
                    data !== null &&
                    typeof (data as { count?: unknown }).count === "number"
                ) {
                    setCount((data as { count: number }).count)
                }
            })
            .catch(() => {
                // 네트워크 오류: 조회수는 부가 정보이므로 조용히 미표시한다.
            })
    }, [slug])

    if (count === null) return null

    return (
        <>
            <span className={s.dot} />
            <span className={s.viewCount}>조회 {count.toLocaleString("ko-KR")}</span>
        </>
    )
}
