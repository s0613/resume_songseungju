"use client"

import { formatRetryAfter } from "./useRetryAfter"
import s from "./agent.module.css"

interface RateLimitNoticeProps {
    id: string
    remainingSeconds: number
    action: string
}

/** 초마다 바뀌는 카운트다운은 live region으로 만들지 않아 과도한 낭독을 막는다. */
export default function RateLimitNotice({
    id,
    remainingSeconds,
    action,
}: RateLimitNoticeProps) {
    return (
        <div
            id={id}
            className={s.rateLimitNotice}
            role="timer"
            aria-live="off"
            aria-label={`요청 제한. ${formatRetryAfter(
                remainingSeconds
            )} 후 ${action}`}
        >
            <span className={s.rateLimitIcon} aria-hidden="true">
                ⏳
            </span>
            <span>
                <strong>{formatRetryAfter(remainingSeconds)}</strong> 후{" "}
                {action}
            </span>
        </div>
    )
}
