"use client"

import {
    useEffect,
    useRef,
    useState,
    type FormEvent,
} from "react"
import type {
    InquiryCategory,
    InquiryDraft,
    InquiryMessage,
} from "@/lib/inquiry/schema"
import s from "./agent.module.css"

interface InquiryChatProps {
    open: boolean
    initialText?: string
    onClose: () => void
    onBack: () => void
}

interface ConversationMessage extends InquiryMessage {
    isError?: boolean
}

interface CollectResponse {
    draft: InquiryDraft
    assistantMessage: string
    quickReplies: string[]
    readyForReview: boolean
    reviewToken: string | null
}

const RECIPIENT = "totaro@totaro.co.kr"
const INPUT_LIMIT = 2000
const MESSAGE_LIMIT = 24

const CATEGORY_LABELS: Record<InquiryCategory, string> = {
    project: "프로젝트 의뢰",
    collaboration: "협업 제안",
    hiring: "채용 제안",
    advisory: "자문 요청",
    other: "기타 문의",
}

const EMPTY_DRAFT: InquiryDraft = {
    category: null,
    senderName: null,
    replyEmail: null,
    organization: null,
    request: null,
    background: null,
    desiredOutcome: null,
    timeline: null,
    budget: null,
    constraints: null,
}

const INITIAL_MESSAGE: ConversationMessage = {
    role: "assistant",
    content:
        "문의 목적을 정확히 정리해 드릴게요. 이미 말씀하신 내용은 다시 묻지 않고, 꼭 필요한 정보만 한 가지씩 확인한 뒤 보내기 전에 요약을 보여드립니다.\n\n입력 내용은 문의 정리를 위해 Google Gemini로 처리됩니다. 아래 동의 후 문의 종류를 선택하거나 편하게 설명해 주세요.",
}

const INITIAL_REPLIES = Object.values(CATEGORY_LABELS)

const DRAFT_TEXT_FIELDS = [
    "senderName",
    "replyEmail",
    "organization",
    "request",
    "background",
    "desiredOutcome",
    "timeline",
    "budget",
    "constraints",
] as const

function isInquiryDraft(value: unknown): value is InquiryDraft {
    if (value === null || typeof value !== "object") return false
    const draft = value as Record<string, unknown>
    const category = draft.category
    if (
        category !== null &&
        !["project", "collaboration", "hiring", "advisory", "other"].includes(
            String(category)
        )
    ) {
        return false
    }
    return DRAFT_TEXT_FIELDS.every(
        (field) => draft[field] === null || typeof draft[field] === "string"
    )
}

function parseCollectResponse(value: unknown): CollectResponse | null {
    if (value === null || typeof value !== "object") return null
    const data = value as Record<string, unknown>
    if (
        !isInquiryDraft(data.draft) ||
        typeof data.assistantMessage !== "string" ||
        typeof data.readyForReview !== "boolean" ||
        (data.reviewToken !== null && typeof data.reviewToken !== "string") ||
        !Array.isArray(data.quickReplies) ||
        !data.quickReplies.every((reply) => typeof reply === "string")
    ) {
        return null
    }
    return {
        draft: data.draft,
        assistantMessage: data.assistantMessage,
        quickReplies: data.quickReplies.slice(0, 5),
        readyForReview: data.readyForReview,
        reviewToken: data.reviewToken,
    }
}

function conversationForApi(
    messages: ConversationMessage[]
): InquiryMessage[] {
    return messages
        .filter((message) => !message.isError)
        .slice(-MESSAGE_LIMIT)
        .map(({ role, content }) => ({ role, content }))
}

function displayValue(value: string | null): string {
    return value?.trim() || "미입력"
}

function createRequestId(): string {
    if (typeof window.crypto.randomUUID === "function") {
        return window.crypto.randomUUID()
    }
    const bytes = new Uint8Array(16)
    window.crypto.getRandomValues(bytes)
    bytes[6] = (bytes[6] & 0x0f) | 0x40
    bytes[8] = (bytes[8] & 0x3f) | 0x80
    const hex = Array.from(bytes, (byte) =>
        byte.toString(16).padStart(2, "0")
    ).join("")
    return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(
        12,
        16
    )}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

function collectErrorText(status: number): string {
    if (status === 429) {
        return "문의 정리 요청이 너무 잦아요. 잠시 후 다시 시도해 주세요."
    }
    if (status === 503) {
        return "지금은 문의 내용을 정리하지 못했어요. 입력 내용은 남아 있으니 잠시 후 다시 시도해 주세요."
    }
    return "문의 내용을 정리하지 못했어요. 잠시 후 다시 시도해 주세요."
}

function sendErrorText(status: number, code?: string): string {
    if (status === 429) {
        return "문의 전송 횟수 제한에 도달했어요. 잠시 후 다시 시도해 주세요."
    }
    if (status === 409 && code === "request_in_progress") {
        return "같은 문의를 전송하고 있어요. 잠시 후 다시 확인해 주세요."
    }
    if (status === 503 || status === 502) {
        return "메일을 보내지 못했어요. 내용은 그대로 보관되어 있으니 잠시 후 다시 시도해 주세요."
    }
    return "메일을 보내지 못했어요. 내용을 확인한 뒤 다시 시도해 주세요."
}

export default function InquiryChat({
    open,
    initialText = "",
    onClose,
    onBack,
}: InquiryChatProps) {
    const [draft, setDraft] = useState<InquiryDraft>(EMPTY_DRAFT)
    const [messages, setMessages] = useState<ConversationMessage[]>([
        INITIAL_MESSAGE,
    ])
    const [input, setInput] = useState(initialText)
    const [quickReplies, setQuickReplies] =
        useState<string[]>(INITIAL_REPLIES)
    const [readyForReview, setReadyForReview] = useState(false)
    const [reviewToken, setReviewToken] = useState<string | null>(null)
    const [reviewMessages, setReviewMessages] = useState<InquiryMessage[]>([])
    const [aiConsent, setAiConsent] = useState(false)
    const [collecting, setCollecting] = useState(false)
    const [consent, setConsent] = useState(false)
    const [website, setWebsite] = useState("")
    const [sendState, setSendState] = useState<
        "idle" | "sending" | "sent" | "error"
    >("idle")
    const [sendError, setSendError] = useState("")
    const requestIdRef = useRef<string | null>(null)
    const scrollRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const aiConsentRef = useRef<HTMLInputElement>(null)
    const reviewRef = useRef<HTMLElement>(null)
    const successRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const element = scrollRef.current
        if (element) element.scrollTop = element.scrollHeight
    }, [messages, collecting, readyForReview, sendState])

    useEffect(() => {
        if (!open) return
        if (sendState === "sent") {
            successRef.current?.focus()
        } else if (!aiConsent) {
            aiConsentRef.current?.focus()
        } else if (readyForReview) {
            reviewRef.current?.focus()
        } else if (!collecting) {
            inputRef.current?.focus()
        }
    }, [open, sendState, aiConsent, readyForReview, collecting])

    function resetInquiry() {
        setDraft(EMPTY_DRAFT)
        setMessages([INITIAL_MESSAGE])
        setInput("")
        setQuickReplies(INITIAL_REPLIES)
        setReadyForReview(false)
        setReviewToken(null)
        setReviewMessages([])
        setAiConsent(false)
        setCollecting(false)
        setConsent(false)
        setWebsite("")
        setSendState("idle")
        setSendError("")
        requestIdRef.current = null
    }

    async function collect(answer?: string) {
        const text = (answer ?? input).trim()
        if (!text || !aiConsent || collecting || sendState === "sending") {
            return
        }

        const userMessage: ConversationMessage = {
            role: "user",
            content: text,
        }
        const nextMessages = [...messages, userMessage].slice(-MESSAGE_LIMIT)

        setInput("")
        setMessages(nextMessages)
        setQuickReplies([])
        setCollecting(true)
        setReadyForReview(false)
        setReviewToken(null)
        setReviewMessages([])
        setConsent(false)
        setSendState("idle")
        setSendError("")
        requestIdRef.current = null

        try {
            const response = await fetch("/api/agent/inquiry/collect", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: conversationForApi(nextMessages),
                }),
            })
            const raw: unknown = await response.json().catch(() => null)
            if (!response.ok) {
                throw Object.assign(new Error("collect_failed"), {
                    status: response.status,
                })
            }

            const result = parseCollectResponse(raw)
            if (!result) throw new Error("invalid_collect_response")

            const assistantMessage: ConversationMessage = {
                role: "assistant",
                content: result.assistantMessage,
            }
            setDraft(result.draft)
            setMessages(
                [...nextMessages, assistantMessage].slice(-MESSAGE_LIMIT)
            )
            setQuickReplies(result.quickReplies)
            setReviewToken(result.reviewToken)
            setReviewMessages(
                result.readyForReview && result.reviewToken
                    ? conversationForApi(nextMessages)
                    : []
            )
            setReadyForReview(
                result.readyForReview && result.reviewToken !== null
            )
        } catch (error) {
            const status =
                error &&
                typeof error === "object" &&
                "status" in error &&
                typeof error.status === "number"
                    ? error.status
                    : 0
            setMessages((current) => [
                ...current.slice(0, MESSAGE_LIMIT - 1),
                {
                    role: "assistant",
                    content: collectErrorText(status),
                    isError: true,
                },
            ])
            setInput(text)
        } finally {
            setCollecting(false)
        }
    }

    async function submitInquiry() {
        if (
            !readyForReview ||
            !reviewToken ||
            reviewMessages.length === 0 ||
            !consent ||
            sendState === "sending" ||
            sendState === "sent"
        ) {
            return
        }

        setSendState("sending")
        setSendError("")

        try {
            const requestId = requestIdRef.current ?? createRequestId()
            requestIdRef.current = requestId
            const response = await fetch("/api/agent/inquiry/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    requestId,
                    confirmed: true,
                    privacyConsent: true,
                    reviewToken,
                    website,
                    draft,
                    messages: reviewMessages,
                    pageUrl: window.location.href,
                }),
            })
            const raw: unknown = await response.json().catch(() => null)
            const code =
                raw &&
                typeof raw === "object" &&
                "error" in raw &&
                typeof raw.error === "string"
                    ? raw.error
                    : undefined
            const ok =
                response.ok &&
                raw !== null &&
                typeof raw === "object" &&
                "ok" in raw &&
                raw.ok === true

            if (!ok) {
                if (code === "idempotency_conflict") {
                    requestIdRef.current = null
                }
                if (code === "invalid_review_token") {
                    setReviewToken(null)
                    setReviewMessages([])
                    setReadyForReview(false)
                    setConsent(false)
                    setSendState("idle")
                    setInput("내용은 그대로예요. 다시 최종 확인해 주세요.")
                    setMessages((current) => [
                        ...current.slice(0, MESSAGE_LIMIT - 1),
                        {
                            role: "assistant",
                            content:
                                "검토 유효 시간이 지났어요. 아래 문장을 전송해 새 요약을 한 번 더 확인해 주세요.",
                            isError: true,
                        },
                    ])
                    return
                }
                setSendState("error")
                setSendError(sendErrorText(response.status, code))
                return
            }

            setSendState("sent")
            setSendError("")
            setMessages((current) => [
                ...current,
                {
                    role: "assistant",
                    content:
                        "문의 메일이 정상적으로 접수됐어요. 남겨주신 이메일로 회신할 수 있도록 함께 전달했습니다.",
                },
            ])
        } catch {
            setSendState("error")
            setSendError(
                "네트워크 문제로 전송 결과를 확인하지 못했어요. 같은 문의가 중복되지 않도록 잠시 후 다시 시도해 주세요."
            )
        }
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        void collect()
    }

    function handleBack() {
        if (collecting || sendState === "sending") return
        const hasProgress =
            sendState !== "sent" &&
            (input.trim().length > 0 ||
                messages.some((message) => message.role === "user"))
        if (
            hasProgress &&
            !window.confirm("작성 중인 문의가 사라집니다. 돌아갈까요?")
        ) {
            return
        }
        onBack()
    }

    return (
        <div
            className={s.panel}
            role="dialog"
            aria-label="송승주에게 문의 남기기"
        >
            <div className={s.panelHead}>
                <button
                    type="button"
                    className={s.panelBack}
                    onClick={handleBack}
                    disabled={collecting || sendState === "sending"}
                    aria-label="에이전트 질문으로 돌아가기"
                >
                    ←
                </button>
                <div>
                    <div className={s.panelTitle}>문의 남기기</div>
                    <div className={s.panelSub}>
                        내용을 함께 정리한 뒤 이메일로 전달해요
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
                className={`${s.messages} ${s.inquiryMessages}`}
                ref={scrollRef}
                aria-live="polite"
                aria-label="문의 대화와 최종 확인 내용"
                tabIndex={0}
            >
                {messages.map((message, index) =>
                    message.role === "user" ? (
                        <div
                            key={index}
                            className={`${s.msg} ${s.msgUser}`}
                        >
                            {message.content}
                        </div>
                    ) : (
                        <div
                            key={index}
                            className={`${s.msgBody} ${
                                message.isError ? s.inquiryMessageError : ""
                            }`}
                        >
                            {message.content}
                        </div>
                    )
                )}

                {collecting && (
                    <div className={s.typing}>문의 내용을 정리하는 중…</div>
                )}

                {!collecting &&
                    sendState !== "sent" &&
                    input.trim().length === 0 &&
                    quickReplies.length > 0 && (
                        <div className={s.sugRow}>
                            {quickReplies.map((reply) => (
                                <button
                                    key={reply}
                                    type="button"
                                    className={s.sug}
                                    disabled={!aiConsent}
                                    onClick={() => void collect(reply)}
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                {readyForReview && sendState !== "sent" && (
                    <section
                        ref={reviewRef}
                        className={s.inquiryReview}
                        aria-label="문의 최종 확인"
                        tabIndex={-1}
                    >
                        <div className={s.inquiryReviewHead}>
                            <span>전송 전 최종 확인</span>
                            <small>AI가 정리한 내용이에요</small>
                        </div>
                        <dl className={s.inquiryReviewList}>
                            <div>
                                <dt>받는 곳</dt>
                                <dd>{RECIPIENT}</dd>
                            </div>
                            <div>
                                <dt>문의 유형</dt>
                                <dd>
                                    {draft.category
                                        ? CATEGORY_LABELS[draft.category]
                                        : "미입력"}
                                </dd>
                            </div>
                            <div>
                                <dt>보내는 분</dt>
                                <dd>
                                    {displayValue(draft.senderName)}
                                    {draft.organization
                                        ? ` · ${draft.organization}`
                                        : ""}
                                </dd>
                            </div>
                            <div>
                                <dt>회신 이메일</dt>
                                <dd>{displayValue(draft.replyEmail)}</dd>
                            </div>
                            <div>
                                <dt>핵심 요청</dt>
                                <dd>{displayValue(draft.request)}</dd>
                            </div>
                            <div>
                                <dt>요청 배경</dt>
                                <dd>{displayValue(draft.background)}</dd>
                            </div>
                            <div>
                                <dt>원하는 결과</dt>
                                <dd>{displayValue(draft.desiredOutcome)}</dd>
                            </div>
                            <div>
                                <dt>희망 일정</dt>
                                <dd>{displayValue(draft.timeline)}</dd>
                            </div>
                            <div>
                                <dt>예산·제약</dt>
                                <dd>
                                    {[
                                        draft.budget,
                                        draft.constraints,
                                    ]
                                        .filter(Boolean)
                                        .join(" · ") || "미입력"}
                                </dd>
                            </div>
                            <div>
                                <dt>함께 전달</dt>
                                <dd>
                                    이 문의 대화에서 작성한 사용자 원문과 현재
                                    페이지 주소
                                </dd>
                            </div>
                        </dl>

                        <p className={s.inquiryReviewHint}>
                            수정할 내용은 아래 입력창에 자연스럽게 말씀해
                            주세요. 비밀번호·주민번호·결제정보는 입력하지
                            마세요.
                        </p>

                        <label className={s.inquiryConsent}>
                            <input
                                type="checkbox"
                                checked={consent}
                                disabled={sendState === "sending"}
                                onChange={(event) =>
                                    setConsent(event.target.checked)
                                }
                            />
                            <span>
                                문의 처리와 회신을 위해 위 요약·사용자
                                원문·현재 페이지 주소를 이메일로 전송하는 데
                                동의합니다.
                            </span>
                        </label>

                        {sendError && (
                            <p className={s.inquirySendError} role="alert">
                                {sendError}
                            </p>
                        )}
                        {input.trim().length > 0 && (
                            <p className={s.inquiryReviewHint}>
                                작성 중인 수정 내용을 먼저 반영해 주세요.
                            </p>
                        )}

                        <button
                            type="button"
                            className={s.inquirySubmit}
                            disabled={
                                !consent ||
                                input.trim().length > 0 ||
                                sendState === "sending"
                            }
                            onClick={() => void submitInquiry()}
                        >
                            {sendState === "sending"
                                ? "메일을 보내는 중…"
                                : "동의하고 메일 보내기"}
                        </button>
                    </section>
                )}

                {sendState === "sent" && (
                    <section
                        ref={successRef}
                        className={s.inquirySuccess}
                        aria-label="문의 전송 완료"
                        tabIndex={-1}
                    >
                        <div className={s.inquirySuccessMark}>✓</div>
                        <strong>문의가 전송됐습니다</strong>
                        <p>
                            {RECIPIENT}에서 확인할 수 있도록 전달했어요.
                            회신은 입력하신 이메일로 받을 수 있습니다.
                        </p>
                        <div className={s.inquirySuccessActions}>
                            <button type="button" onClick={onBack}>
                                에이전트에게 질문하기
                            </button>
                            <button type="button" onClick={resetInquiry}>
                                새 문의 작성
                            </button>
                        </div>
                    </section>
                )}
            </div>

            {sendState !== "sent" && (
                <form className={s.inquiryInputArea} onSubmit={handleSubmit}>
                    <label className={s.inquiryHoneypot} aria-hidden="true">
                        웹사이트
                        <input
                            tabIndex={-1}
                            autoComplete="off"
                            value={website}
                            onChange={(event) =>
                                setWebsite(event.target.value)
                            }
                        />
                    </label>
                    <label
                        className={`${s.inquiryConsent} ${s.inquiryAiConsent}`}
                    >
                        <input
                            ref={aiConsentRef}
                            type="checkbox"
                            checked={aiConsent}
                            disabled={
                                collecting || sendState === "sending"
                            }
                            onChange={(event) =>
                                setAiConsent(event.target.checked)
                            }
                        />
                        <span>
                            문의 초안을 정리하기 위해 입력 내용이 Google
                            Gemini로 처리되는 데 동의합니다.
                        </span>
                    </label>
                    <textarea
                        ref={inputRef}
                        className={s.inquiryTextarea}
                        value={input}
                        onChange={(event) => setInput(event.target.value)}
                        readOnly={
                            collecting || sendState === "sending"
                        }
                        maxLength={INPUT_LIMIT}
                        rows={2}
                        placeholder={
                            readyForReview
                                ? "예: 일정은 9월 말로 수정해 주세요"
                                : "문의 내용을 편하게 적어주세요"
                        }
                        aria-label={
                            readyForReview
                                ? "수정할 문의 내용"
                                : "문의 내용 입력"
                        }
                    />
                    <div className={s.inquiryInputMeta}>
                        <span>민감한 개인정보는 적지 마세요</span>
                        <button
                            type="submit"
                            className={s.send}
                            disabled={
                                collecting ||
                                !aiConsent ||
                                sendState === "sending" ||
                                input.trim().length === 0
                            }
                        >
                            {readyForReview ? "수정 반영" : "전송"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}
