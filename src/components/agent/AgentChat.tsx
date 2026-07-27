"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import s from "./agent.module.css"

interface ChatMessage {
    role: "user" | "assistant"
    content: string
    isError?: boolean
}

const GREETING: ChatMessage = {
    role: "assistant",
    content:
        "안녕하세요, 송승주 에이전트예요. 승주가 어떤 개발자인지, 블로그에 쓴 글들에 대해 궁금한 걸 물어보세요!",
}

const ERROR_TEXT =
    "지금은 답변을 가져오지 못했어요. 잠시 후 다시 시도해 주세요."
const RATE_LIMIT_TEXT =
    "질문이 너무 잦아요. 잠시 후 다시 시도해 주세요."

// 요청에 실어 보내는 대화 기록 상한 (서버 검증과 동일 계약)
const HISTORY_LIMIT = 12
const INPUT_LIMIT = 1000
// 자동 스크롤을 유지할 하단 근접 임계값(px)
const AUTO_SCROLL_THRESHOLD = 80

interface AgentChatProps {
    open: boolean
    onClose: () => void
}

/** 내부 경로(`/`)만 안전한 내부 링크로 취급한다.
 * `//`(프로토콜 상대)와 백슬래시·공백류(브라우저가 `/`로 정규화해 `/\evil.com` → 외부로 리졸브)는 거부한다. */
function isInternalHref(href: string): boolean {
    return href.startsWith("/") && !href.startsWith("//") && !/[\\\s]/.test(href)
}

function isSafeHref(href: string): boolean {
    return isInternalHref(href) || /^https?:\/\//.test(href)
}

/**
 * 최소 인라인 마크다운 파서 — `**굵게**`, `[텍스트](url)`만 React 엘리먼트로 렌더한다.
 * dangerouslySetInnerHTML을 쓰지 않고 문자열을 토큰화해 React 노드 배열을 만든다.
 * 스트리밍 중 잘린 토큰(예: `**굵`)은 매칭되지 않아 그대로 플레인 텍스트로 보인다.
 */
function renderInlineTokens(text: string, keyBase: string): ReactNode[] {
    const nodes: ReactNode[] = []
    const tokenRe = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
    let lastIndex = 0
    let match: RegExpExecArray | null
    let tokenIndex = 0

    while ((match = tokenRe.exec(text)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(text.slice(lastIndex, match.index))
        }
        const key = `${keyBase}-${tokenIndex}`
        if (match[1] !== undefined) {
            nodes.push(<strong key={key}>{match[1]}</strong>)
        } else {
            const label = match[2] ?? ""
            const href = match[3] ?? ""
            if (isInternalHref(href)) {
                nodes.push(
                    <Link key={key} href={href} className={s.msgLink}>
                        {label}
                    </Link>
                )
            } else if (isSafeHref(href)) {
                nodes.push(
                    <a
                        key={key}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={s.msgLink}
                    >
                        {label}
                    </a>
                )
            } else {
                // 허용되지 않은 href — 링크로 만들지 않고 라벨만 플레인 텍스트로 표시
                nodes.push(label)
            }
        }
        tokenIndex += 1
        lastIndex = tokenRe.lastIndex
    }
    if (lastIndex < text.length) {
        nodes.push(text.slice(lastIndex))
    }
    return nodes
}

/** 송승주 에이전트 채팅 패널 — /api/agent/chat 텍스트 스트림을 그대로 렌더한다. */
export default function AgentChat({ open, onClose }: AgentChatProps) {
    const [messages, setMessages] = useState<ChatMessage[]>([GREETING])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    // 사용자가 메시지 목록 하단 근처에 있을 때만 자동 스크롤한다.
    const nearBottomRef = useRef(true)

    useEffect(() => {
        const el = scrollRef.current
        if (el && nearBottomRef.current) el.scrollTop = el.scrollHeight
    }, [messages, loading])

    // 재오픈을 포함해 패널이 열릴 때마다 입력창에 포커스한다.
    useEffect(() => {
        if (open) inputRef.current?.focus()
    }, [open])

    // 패널이 열려 있을 때만 Esc로 닫는다.
    useEffect(() => {
        if (!open) return
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") {
                onClose()
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [open, onClose])

    function handleMessagesScroll() {
        const el = scrollRef.current
        if (!el) return
        const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
        nearBottomRef.current = distanceFromBottom < AUTO_SCROLL_THRESHOLD
    }

    async function send() {
        const text = input.trim()
        if (!text || loading) return
        setInput("")
        setLoading(true)

        const nextMessages: ChatMessage[] = [
            ...messages,
            { role: "user", content: text },
        ]
        setMessages(nextMessages)

        try {
            // 인사말(로컬 고정 문구)과 에러 안내 메시지는 빼고 최근 대화만 보낸다.
            const history = nextMessages
                .filter((m) => !m.isError)
                .slice(1)
                .slice(-HISTORY_LIMIT)
                .map(({ role, content }) => ({ role, content }))
            const res = await fetch("/api/agent/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: history }),
            })
            if (!res.ok || !res.body) {
                const errorText = res.status === 429 ? RATE_LIMIT_TEXT : ERROR_TEXT
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: errorText, isError: true },
                ])
                return
            }

            setMessages((prev) => [...prev, { role: "assistant", content: "" }])
            const reader = res.body.getReader()
            const decoder = new TextDecoder()
            let received = ""
            for (;;) {
                const { done, value } = await reader.read()
                if (done) break
                received += decoder.decode(value, { stream: true })
                const answer = received
                setMessages((prev) => [
                    ...prev.slice(0, -1),
                    { role: "assistant", content: answer },
                ])
            }
            if (received.trim().length === 0) {
                setMessages((prev) => [
                    ...prev.slice(0, -1),
                    { role: "assistant", content: ERROR_TEXT, isError: true },
                ])
            }
        } catch {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: ERROR_TEXT, isError: true },
            ])
        } finally {
            setLoading(false)
            inputRef.current?.focus()
        }
    }

    const lastMessage = messages[messages.length - 1]
    // 전송 직후(마지막 메시지가 아직 사용자 발화)부터 스트리밍 시작 전까지도 인디케이터를 보인다.
    const showTyping =
        loading && (lastMessage?.role !== "assistant" || lastMessage.content === "")

    return (
        <div
            className={s.panel}
            role="dialog"
            aria-label="송승주 에이전트 채팅"
        >
            <div className={s.panelHead}>
                <div>
                    <div className={s.panelTitle}>송승주 에이전트</div>
                    <div className={s.panelSub}>
                        승주와 블로그 글에 대해 무엇이든 물어보세요
                    </div>
                </div>
                <button
                    type="button"
                    className={s.panelClose}
                    onClick={onClose}
                    aria-label="채팅 닫기"
                >
                    ✕
                </button>
            </div>

            <div
                className={s.messages}
                ref={scrollRef}
                onScroll={handleMessagesScroll}
                aria-live="polite"
                tabIndex={0}
            >
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`${s.msg} ${
                            msg.role === "user" ? s.msgUser : s.msgAssistant
                        }`}
                    >
                        {renderInlineTokens(msg.content, `m${i}`)}
                    </div>
                ))}
                {showTyping && <div className={s.typing}>답변을 쓰는 중…</div>}
            </div>

            <form
                className={s.inputRow}
                onSubmit={(e) => {
                    e.preventDefault()
                    void send()
                }}
            >
                <input
                    ref={inputRef}
                    className={s.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    maxLength={INPUT_LIMIT}
                    placeholder="예: S-Skills가 뭐예요?"
                    aria-label="질문 입력"
                />
                <button
                    type="submit"
                    className={s.send}
                    disabled={loading || input.trim().length === 0}
                >
                    전송
                </button>
            </form>
        </div>
    )
}
