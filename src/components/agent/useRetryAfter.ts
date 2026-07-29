"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const MAX_RETRY_AFTER_SECONDS = 24 * 60 * 60
const DEFAULT_RETRY_AFTER_SECONDS = 10
const SHORT_WEEKDAY = "(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)"
const LONG_WEEKDAY =
    "(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)"
const MONTH = "(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)"
const HTTP_DATE_PATTERN = new RegExp(
    `^(?:${SHORT_WEEKDAY}, \\d{2} ${MONTH} \\d{4} \\d{2}:\\d{2}:\\d{2} GMT|` +
        `${LONG_WEEKDAY}, \\d{2}-${MONTH}-\\d{2} \\d{2}:\\d{2}:\\d{2} GMT|` +
        `${SHORT_WEEKDAY} ${MONTH} {1,2}\\d{1,2} \\d{2}:\\d{2}:\\d{2} \\d{4})$`,
    "u"
)

function clampSeconds(value: number, maximum: number): number {
    return Math.min(maximum, Math.max(1, Math.ceil(value)))
}

/**
 * Retry-After의 초 단위 값과 HTTP-date 형식을 모두 처리한다.
 * 프록시가 헤더 없이 429를 반환하면 짧은 기본 대기 시간을 사용한다.
 */
export function parseRetryAfterSeconds(
    value: string | null,
    fallbackSeconds = DEFAULT_RETRY_AFTER_SECONDS,
    now = Date.now(),
    maximumSeconds = MAX_RETRY_AFTER_SECONDS
): number {
    const maximum =
        Number.isSafeInteger(maximumSeconds) && maximumSeconds > 0
            ? Math.min(MAX_RETRY_AFTER_SECONDS, maximumSeconds)
            : MAX_RETRY_AFTER_SECONDS
    const fallback = clampSeconds(
        Number.isFinite(fallbackSeconds) && fallbackSeconds > 0
            ? fallbackSeconds
            : DEFAULT_RETRY_AFTER_SECONDS,
        maximum
    )
    const normalized = value?.trim()
    if (!normalized) return fallback

    if (/^\d+$/u.test(normalized)) {
        const seconds = Number(normalized)
        if (!Number.isFinite(seconds) || seconds >= maximum) {
            return maximum
        }
        return clampSeconds(seconds, maximum)
    }

    if (!HTTP_DATE_PATTERN.test(normalized)) return fallback
    const retryAt = Date.parse(normalized)
    if (!Number.isFinite(retryAt)) return fallback
    return clampSeconds((retryAt - now) / 1000, maximum)
}

export function formatRetryAfter(seconds: number): string {
    const remaining = Math.max(0, Math.ceil(seconds))
    if (remaining < 60) return `${remaining}초`

    const hours = Math.floor(remaining / 3600)
    const minutes = Math.floor((remaining % 3600) / 60)
    const restSeconds = remaining % 60
    if (hours > 0) {
        return minutes > 0 ? `${hours}시간 ${minutes}분` : `${hours}시간`
    }
    return `${minutes}분 ${restSeconds}초`
}

export function useRetryAfter() {
    const deadlineRef = useRef(0)
    const [deadline, setDeadline] = useState<number | null>(null)
    const [remainingSeconds, setRemainingSeconds] = useState(0)

    useEffect(() => {
        if (deadline === null) return

        const updateRemaining = () => {
            // 이전 interval이 더 긴 새 deadline을 지우지 못하게 한다.
            if (deadlineRef.current !== deadline) return
            const next = Math.max(
                0,
                Math.ceil((deadline - Date.now()) / 1000)
            )
            setRemainingSeconds((current) =>
                current === next ? current : next
            )
            if (next === 0) {
                deadlineRef.current = 0
                setDeadline(null)
            }
        }

        const interval = window.setInterval(updateRemaining, 1000)
        return () => window.clearInterval(interval)
    }, [deadline])

    const startForSeconds = useCallback(
        (
            seconds: number,
            maximumSeconds = MAX_RETRY_AFTER_SECONDS
        ) => {
            const maximum =
                Number.isSafeInteger(maximumSeconds) && maximumSeconds > 0
                    ? Math.min(
                          MAX_RETRY_AFTER_SECONDS,
                          maximumSeconds
                      )
                    : MAX_RETRY_AFTER_SECONDS
            const duration = clampSeconds(
                Number.isFinite(seconds) && seconds > 0
                    ? seconds
                    : DEFAULT_RETRY_AFTER_SECONDS,
                maximum
            )
            const now = Date.now()
            const candidateDeadline = now + duration * 1000
            const nextDeadline = Math.max(
                deadlineRef.current,
                candidateDeadline
            )
            deadlineRef.current = nextDeadline
            const remaining = Math.max(
                1,
                Math.ceil((nextDeadline - now) / 1000)
            )
            setRemainingSeconds(remaining)
            setDeadline(nextDeadline)
            return remaining
        },
        []
    )

    const start = useCallback(
        (
            response: Response,
            fallbackSeconds = DEFAULT_RETRY_AFTER_SECONDS,
            maximumSeconds = MAX_RETRY_AFTER_SECONDS
        ) => {
            const seconds = parseRetryAfterSeconds(
                response.headers.get("retry-after"),
                fallbackSeconds,
                Date.now(),
                maximumSeconds
            )
            return startForSeconds(seconds, maximumSeconds)
        },
        [startForSeconds]
    )

    const isActiveNow = useCallback(
        () => deadlineRef.current > Date.now(),
        []
    )

    const clear = useCallback(() => {
        deadlineRef.current = 0
        setDeadline(null)
        setRemainingSeconds(0)
    }, [])

    return {
        active: remainingSeconds > 0,
        remainingSeconds,
        start,
        startForSeconds,
        isActiveNow,
        clear,
    }
}

export type RetryAfterController = ReturnType<typeof useRetryAfter>
