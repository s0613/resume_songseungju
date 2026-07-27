// 댓글 API(`/api/blog/comments/[slug]`) 응답 항목 — password_hash는 응답에 포함되지 않는다.
export interface BlogComment {
    id: string
    name: string
    body: string
    created_at: string
}

// "2026. 7. 27. 09:51" 형태로 표시한다(로케일 의존 없이 고정 포맷).
export function formatCommentDate(iso: string): string {
    const date = new Date(iso)
    if (Number.isNaN(date.getTime())) return ""
    const pad = (n: number) => String(n).padStart(2, "0")
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}. ${pad(
        date.getHours()
    )}:${pad(date.getMinutes())}`
}
