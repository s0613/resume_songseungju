"use client"

import { useEffect, useRef, useState } from "react"
import AgentChat from "./AgentChat"
import s from "./agent.module.css"

// requestIdleCallback 미지원 브라우저용 폴백 지연(ms)
const IDLE_IMPORT_FALLBACK_MS = 1500

type IdleWindow = Window & {
    requestIdleCallback?: (callback: () => void) => number
    cancelIdleCallback?: (handle: number) => void
}

/**
 * 사이트 전역 플로팅 위젯 — 3D 아이콘(ai-chat-1c.glb) 버튼을 누르면
 * 송승주 에이전트 채팅 패널이 열린다. model-viewer 모듈은 idle 시점까지
 * 지연 로드하고, 실제 모델이 load 이벤트를 낼 때까지는 글리프를 유지한다.
 */
export default function AgentWidget() {
    const [open, setOpen] = useState(false)
    // 한 번 열리면 패널을 유지해 대화 내용을 보존한다.
    const [everOpened, setEverOpened] = useState(false)
    const [modelReady, setModelReady] = useState(false) // 모듈 import 성공
    const [modelLoaded, setModelLoaded] = useState(false) // <model-viewer> 'load' 이벤트
    const [modelErrored, setModelErrored] = useState(false) // 'error' 이벤트 — 영구 폴백
    const [autoRotate, setAutoRotate] = useState(true)
    const fabRef = useRef<HTMLButtonElement>(null)
    const modelElRef = useRef<HTMLElement>(null)

    useEffect(() => {
        setAutoRotate(
            !window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
        let mounted = true
        let idleHandle: number | undefined
        let timeoutHandle: ReturnType<typeof setTimeout> | undefined

        function loadModelViewer() {
            import("@google/model-viewer")
                .then(() => {
                    if (mounted) setModelReady(true)
                })
                .catch(() => {
                    // 로드 실패 시 글리프 아이콘으로 폴백
                })
        }

        const idleWindow = window as IdleWindow
        if (typeof idleWindow.requestIdleCallback === "function") {
            idleHandle = idleWindow.requestIdleCallback(loadModelViewer)
        } else {
            timeoutHandle = setTimeout(loadModelViewer, IDLE_IMPORT_FALLBACK_MS)
        }

        return () => {
            mounted = false
            if (idleHandle !== undefined && typeof idleWindow.cancelIdleCallback === "function") {
                idleWindow.cancelIdleCallback(idleHandle)
            }
            if (timeoutHandle) clearTimeout(timeoutHandle)
        }
    }, [])

    // model-viewer는 커스텀 엘리먼트라 load/error 이벤트를 ref로 직접 구독한다.
    useEffect(() => {
        if (!modelReady || modelErrored) return
        const el = modelElRef.current
        if (!el) return
        function handleLoad() {
            setModelLoaded(true)
        }
        function handleError() {
            setModelErrored(true)
        }
        el.addEventListener("load", handleLoad)
        el.addEventListener("error", handleError)
        return () => {
            el.removeEventListener("load", handleLoad)
            el.removeEventListener("error", handleError)
        }
    }, [modelReady, modelErrored])

    function openPanel() {
        setOpen(true)
        setEverOpened(true)
    }

    function closePanel() {
        setOpen(false)
        fabRef.current?.focus()
    }

    function toggle() {
        if (open) closePanel()
        else openPanel()
    }

    const showModel = modelReady && !modelErrored

    return (
        <div className={s.widget}>
            {everOpened && (
                <div className={open ? undefined : s.panelHidden}>
                    <AgentChat open={open} onClose={closePanel} />
                </div>
            )}
            <button
                ref={fabRef}
                type="button"
                className={s.fab}
                onClick={toggle}
                aria-label={
                    open ? "송승주 에이전트 닫기" : "송승주 에이전트 열기"
                }
                aria-expanded={open}
            >
                <span
                    className={`${s.fabGlyph} ${modelLoaded ? s.fabGlyphHidden : ""}`}
                    aria-hidden="true"
                >
                    ✦
                </span>
                {showModel && (
                    <model-viewer
                        ref={modelElRef}
                        className={`${s.fabModel} ${modelLoaded ? s.fabModelLoaded : ""}`}
                        src="/ai-chat-1c.glb"
                        alt=""
                        auto-rotate={autoRotate || undefined}
                        rotation-per-second="24deg"
                        disable-zoom
                        disable-pan
                        disable-tap
                        interaction-prompt="none"
                        shadow-intensity="0"
                        loading="lazy"
                    />
                )}
            </button>
        </div>
    )
}
