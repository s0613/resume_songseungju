"use client"

import { useState } from "react"
import { ActionButton } from "seed-design/ui/action-button"
import { TextField, TextFieldInput } from "seed-design/ui/text-field"
import s from "@/app/blog/blog.module.css"
import { formatCommentDate, type BlogComment } from "./types"

interface CommentItemProps {
    comment: BlogComment
    onDelete: (id: string, password: string) => Promise<string | null>
}

/** 댓글 1건. 삭제는 인라인 비밀번호 입력으로 확인한다. */
export default function CommentItem({ comment, onDelete }: CommentItemProps) {
    const [confirming, setConfirming] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [busy, setBusy] = useState(false)

    const close = () => {
        setConfirming(false)
        setPassword("")
        setError(null)
    }

    const handleDelete = async () => {
        if (busy) return
        setBusy(true)
        const message = await onDelete(comment.id, password)
        setBusy(false)
        if (message) {
            setError(message)
            return
        }
        close()
    }

    return (
        <li className={s.commentItem}>
            <div className={s.commentHead}>
                <span className={s.commentName}>{comment.name}</span>
                <time className={s.commentTime} dateTime={comment.created_at}>
                    {formatCommentDate(comment.created_at)}
                </time>
                <div className={s.commentDelete}>
                    <ActionButton
                        type="button"
                        variant="ghost"
                        size="xsmall"
                        onClick={() => (confirming ? close() : setConfirming(true))}
                        aria-expanded={confirming}
                    >
                        {confirming ? "취소" : "삭제"}
                    </ActionButton>
                </div>
            </div>

            <p className={s.commentBody}>{comment.body}</p>

            {confirming && (
                <div className={s.commentDeleteRow}>
                    <TextField className={s.commentDeleteField} size="medium">
                        <TextFieldInput
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호"
                            autoComplete="off"
                            aria-label={`${comment.name}님의 댓글 삭제 비밀번호`}
                        />
                    </TextField>
                    <ActionButton
                        type="button"
                        variant="neutralOutline"
                        size="small"
                        onClick={handleDelete}
                        loading={busy}
                    >
                        {busy ? "확인 중…" : "확인"}
                    </ActionButton>
                    {error && (
                        <span className={s.commentError} role="alert">
                            {error}
                        </span>
                    )}
                </div>
            )}
        </li>
    )
}
