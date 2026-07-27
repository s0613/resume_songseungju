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

// 빈 상태(첫 질문 전)에 보여줄 추천 질문
const STARTER_QUESTIONS = [
    "S-Skills가 뭐예요?",
    "승주는 어떤 개발자예요?",
    "읽어볼 만한 글 추천해줘",
]

const ERROR_TEXT =
    "지금은 답변을 가져오지 못했어요. 잠시 후 다시 시도해 주세요."
const RATE_LIMIT_TEXT =
    "질문이 너무 잦아요. 잠시 후 다시 시도해 주세요."

// 요청에 실어 보내는 대화 기록 상한 (서버 검증과 동일 계약)
const HISTORY_LIMIT = 12
const INPUT_LIMIT = 1000
// 자동 스크롤을 유지할 하단 근접 임계값(px)
const AUTO_SCROLL_THRESHOLD = 80

// 답변 본문과 후속 질문 칩을 나누는 마커 (프롬프트가 이 형식을 강제)
const FOLLOWUP_MARKER = "###FOLLOWUPS###"

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

/** 스트리밍 중 답변 끝에 마커 접두사(`###FOL…`)가 걸쳐 있으면 잘라낸다.
 * 마커는 항상 `###`로 시작하므로 3자 미만 접두사는 보지 않는다 — `#` 1~2개로 끝나는 답변은 안 잘린다. */
function stripPartialMarker(text: string): string {
    for (let len = FOLLOWUP_MARKER.length - 1; len >= 3; len--) {
        if (text.endsWith(FOLLOWUP_MARKER.slice(0, len))) {
            return text.slice(0, text.length - len)
        }
    }
    return text
}

/** 답변 원문을 본문과 후속 질문(최대 3개)으로 분리한다. */
function splitAnswer(content: string): { body: string; followups: string[] } {
    const idx = content.indexOf(FOLLOWUP_MARKER)
    if (idx === -1) {
        return { body: stripPartialMarker(content).trimEnd(), followups: [] }
    }
    const body = content.slice(0, idx).trimEnd()
    const followups = content
        .slice(idx + FOLLOWUP_MARKER.length)
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
        .slice(0, 3)
    return { body, followups }
}

/**
 * 최소 인라인 마크다운 파서 — `**굵게**`, `[텍스트](url)`만 React 엘리먼트로 렌더한다.
 * dangerouslySetInnerHTML을 쓰지 않고 문자열을 토큰화해 React 노드 배열을 만든다.
 * 스트리밍 중 잘린 토큰(예: `**굵`)은 매칭되지 않아 그대로 플레인 텍스트로 보인다.
 */
function renderInlineTokens(normalized: string, keyBase: string): ReactNode[] {
    const nodes: ReactNode[] = []
    const tokenRe = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)]+)\)/g
    let lastIndex = 0
    let match: RegExpExecArray | null
    let tokenIndex = 0

    while ((match = tokenRe.exec(normalized)) !== null) {
        if (match.index > lastIndex) {
            nodes.push(normalized.slice(lastIndex, match.index))
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
    if (lastIndex < normalized.length) {
        nodes.push(normalized.slice(lastIndex))
    }
    return nodes
}

/**
 * 답변 본문을 줄 단위로 렌더한다. 목록 줄(`1.`·`•`)은 마커/내용을 분리해
 * 줄바꿈 시 이어지는 줄이 내용 시작 위치에 정렬되게 한다(행잉 인덴트).
 * 원문의 번호를 그대로 쓴다 — CSS 카운터를 신뢰하지 않는다.
 */
function renderBody(text: string, keyBase: string): ReactNode[] {
    return text.split("\n").map((rawLine, li) => {
        // `* 불릿`/`- 불릿` 줄머리는 별표 원문 노출 대신 불릿 문자로 (텍스트 치환이라 XSS 무관)
        const line = rawLine.replace(/^(\s*)[*-]\s+/, "$1• ")
        const key = `${keyBase}-l${li}`
        if (line.trim().length === 0) {
            return <div key={key} className={s.msgGap} />
        }
        const list = line.match(/^\s*(\d{1,3}\.|•)\s+(.*)$/)
        if (list) {
            return (
                <div key={key} className={s.msgListLine}>
                    <span className={s.msgListMarker}>{list[1]}</span>
                    <span className={s.msgListText}>
                        {renderInlineTokens(list[2], key)}
                    </span>
                </div>
            )
        }
        return <div key={key}>{renderInlineTokens(line, key)}</div>
    })
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

    async function send(question?: string) {
        const text = (question ?? input).trim()
        if (!text || loading) return
        setInput("")
        setLoading(true)
        nearBottomRef.current = true

        const nextMessages: ChatMessage[] = [
            ...messages,
            { role: "user", content: text },
        ]
        setMessages(nextMessages)

        try {
            // 인사말(로컬 고정 문구)과 에러 안내는 제외하고, 답변은 후속 질문 마커를 뗀 본문만 보낸다.
            const history = nextMessages
                .filter((m) => !m.isError)
                .slice(1)
                .slice(-HISTORY_LIMIT)
                .map(({ role, content }) => ({
                    role,
                    content:
                        role === "assistant" ? splitAnswer(content).body : content,
                }))
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

    // 칩은 마지막 답변 뒤에만 — 지나간 턴의 칩은 남기지 않고, 스트리밍 중엔 숨긴다.
    const lastFollowups =
        !loading && lastMessage?.role === "assistant" && !lastMessage.isError
            ? splitAnswer(lastMessage.content).followups
            : []
    const showStarters = messages.length === 1 && !loading

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
                {messages.map((msg, i) => {
                    if (msg.role === "user") {
                        return (
                            <div key={i} className={`${s.msg} ${s.msgUser}`}>
                                {msg.content}
                            </div>
                        )
                    }
                    // AI 턴은 말풍선이 아니라 본문 조판 — 답변은 여러 문단·목록이라 말풍선에 넣으면 읽기 어렵다.
                    const { body } = splitAnswer(msg.content)
                    return (
                        <div key={i} className={s.msgBody}>
                            {renderBody(body, `msg-${i}`)}
                        </div>
                    )
                })}
                {showTyping && <div className={s.typing}>답변을 쓰는 중…</div>}
                {(showStarters || lastFollowups.length > 0) && (
                    <div className={s.sugRow}>
                        {(showStarters ? STARTER_QUESTIONS : lastFollowups).map(
                            (q) => (
                                <button
                                    key={q}
                                    type="button"
                                    className={s.sug}
                                    onClick={() => void send(q)}
                                >
                                    {q}
                                </button>
                            )
                        )}
                    </div>
                )}
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
