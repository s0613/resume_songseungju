"use client"

import { useState, type FormEvent } from "react"
import s from "@/app/blog/blog.module.css"

interface CommentFormProps {
    onSubmit: (input: {
        name: string
        password: string
        body: string
        website: string
    }) => Promise<boolean>
    error: string | null
    submitting: boolean
}

/** 이름·비밀번호 2열 + 대형 textarea 구성의 댓글 작성 폼. */
export default function CommentForm({ onSubmit, error, submitting }: CommentFormProps) {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [body, setBody] = useState("")
    // 스팸봇 유인용 honeypot — 사람에게는 보이지 않는다.
    const [website, setWebsite] = useState("")

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (submitting) return
        const ok = await onSubmit({ name, password, body, website })
        if (ok) {
            setName("")
            setPassword("")
            setBody("")
        }
    }

    return (
        <form className={s.commentForm} onSubmit={handleSubmit}>
            <div className={s.commentFields}>
                <label className={s.commentField}>
                    <span className={s.commentLabel}>이름</span>
                    <input
                        className={s.commentInput}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름"
                        maxLength={40}
                        autoComplete="nickname"
                        required
                    />
                </label>
                <label className={s.commentField}>
                    <span className={s.commentLabel}>비밀번호</span>
                    <input
                        className={s.commentInput}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="비밀번호 (4자 이상)"
                        minLength={4}
                        autoComplete="new-password"
                        required
                    />
                </label>
            </div>

            <label className={s.honeypot} aria-hidden="true">
                <span>이 항목은 비워 두세요</span>
                <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </label>

            <label className={s.commentField}>
                <span className={s.srOnly}>댓글 내용</span>
                <textarea
                    className={s.commentTextarea}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder="댓글을 입력해주세요."
                    maxLength={2000}
                    rows={6}
                    required
                />
            </label>

            {error && (
                <p className={s.commentError} role="alert">
                    {error}
                </p>
            )}

            <div className={s.commentFormFoot}>
                <button className={s.commentSubmit} type="submit" disabled={submitting}>
                    {submitting ? "등록 중…" : "댓글 남기기"}
                </button>
            </div>
        </form>
    )
}
