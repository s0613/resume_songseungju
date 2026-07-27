"use client"

import { useCallback, useEffect, useState } from "react"
import s from "@/app/blog/blog.module.css"
import CommentForm from "./CommentForm"
import CommentItem from "./CommentItem"
import type { BlogComment } from "./types"

interface CommentsProps {
    slug: string
}

type Status = "loading" | "ready" | "hidden"

const FIELD_MESSAGES: Record<string, string> = {
    name: "이름은 1~40자로 입력해주세요.",
    password: "비밀번호는 4자 이상 입력해주세요.",
    body: "댓글은 1~2000자로 입력해주세요.",
}

const GENERIC_ERROR = "댓글을 등록하지 못했어요. 잠시 후 다시 시도해주세요."

async function readError(res: Response): Promise<{ error?: string; reason?: string }> {
    try {
        return (await res.json()) as { error?: string; reason?: string }
    } catch {
        return {}
    }
}

/** 블로그 상세 하단 댓글 영역. API 미설정(503)·오류 시 영역 전체를 렌더하지 않는다. */
export default function Comments({ slug }: CommentsProps) {
    const [status, setStatus] = useState<Status>("loading")
    const [comments, setComments] = useState<BlogComment[]>([])
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        let alive = true
        fetch(`/api/blog/comments/${slug}`)
            .then(async (res) => {
                if (!alive) return
                if (!res.ok) {
                    setStatus("hidden")
                    return
                }
                const data = (await res.json()) as { comments?: BlogComment[] }
                if (!alive) return
                setComments(data.comments ?? [])
                setStatus("ready")
            })
            .catch(() => {
                if (alive) setStatus("hidden")
            })
        return () => {
            alive = false
        }
    }, [slug])

    const handleSubmit = useCallback(
        async (input: { name: string; password: string; body: string; website: string }) => {
            setSubmitting(true)
            setSubmitError(null)
            try {
                const res = await fetch(`/api/blog/comments/${slug}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(input),
                })

                // 204: honeypot에 값이 있는 경우. 사용자에게는 성공처럼 보이게 둔다.
                if (res.status === 204) return true

                if (res.status === 201) {
                    const data = (await res.json()) as { comment: BlogComment }
                    setComments((prev) => [...prev, data.comment])
                    return true
                }

                const { error, reason } = await readError(res)
                if (error === "invalid_body" && reason && FIELD_MESSAGES[reason]) {
                    setSubmitError(FIELD_MESSAGES[reason])
                } else {
                    setSubmitError(GENERIC_ERROR)
                }
                return false
            } catch {
                setSubmitError(GENERIC_ERROR)
                return false
            } finally {
                setSubmitting(false)
            }
        },
        [slug]
    )

    // 성공 시 null, 실패 시 표시할 메시지를 반환한다.
    const handleDelete = useCallback(
        async (id: string, password: string) => {
            try {
                const res = await fetch(`/api/blog/comments/${slug}/${id}`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ password }),
                })

                if (res.ok) {
                    setComments((prev) => prev.filter((c) => c.id !== id))
                    return null
                }

                const { error } = await readError(res)
                if (error === "wrong_password") return "비밀번호가 일치하지 않습니다"
                if (error === "not_found") return "이미 삭제된 댓글이에요."
                if (error === "invalid_body") return "비밀번호를 입력해주세요."
                return "삭제하지 못했어요. 잠시 후 다시 시도해주세요."
            } catch {
                return "삭제하지 못했어요. 잠시 후 다시 시도해주세요."
            }
        },
        [slug]
    )

    if (status !== "ready") return null

    return (
        <section className={s.commentSection} aria-labelledby="comments-heading">
            <h2 className={s.commentTitle} id="comments-heading">
                댓글 <span className={s.commentCount}>{comments.length}</span>
            </h2>

            {comments.length > 0 && (
                <ul className={s.commentList}>
                    {comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            onDelete={handleDelete}
                        />
                    ))}
                </ul>
            )}

            <CommentForm
                onSubmit={handleSubmit}
                error={submitError}
                submitting={submitting}
            />
        </section>
    )
}
