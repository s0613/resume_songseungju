"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const vp = { once: true, margin: "-40px" } as const;

/* ── Mini terminal for the featured card ── */
const TERMINAL_LINES = [
  { text: "$ /sj-company 결제 모듈 만들어줘", color: "#a5b4fc", delay: 0 },
  { text: "", color: "", delay: 0.4 },
  { text: "[Medium] 태스크 크기 감지 완료", color: "rgba(165,180,252,0.45)", delay: 0.7 },
  { text: "◈ PM 분석 중...", color: "#a78bfa", delay: 1.3 },
  { text: "✓  PM Brief — 완료", color: "#34d399", delay: 2.1 },
  { text: "", color: "", delay: 2.5 },
  { text: "◆ Tech Lead → 3 agents dispatched", color: "#60a5fa", delay: 2.8 },
  { text: "  ├─ sj-dev-backend     running", color: "#60a5fa", delay: 3.2 },
  { text: "  ├─ sj-dev-frontend    running", color: "#60a5fa", delay: 3.5 },
  { text: "  └─ sj-dev-security    running", color: "#60a5fa", delay: 3.8 },
  { text: "", color: "", delay: 5.0 },
  { text: "✓  구현 완료 — 3 에이전트", color: "#34d399", delay: 5.3 },
  { text: "◇ QA 검증 중...", color: "#fbbf24", delay: 5.8 },
  { text: "✓  PASS — 모든 검증 통과", color: "#34d399", delay: 7.0 },
];

function MiniTerminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [visible, setVisible] = useState<number[]>([]);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!inView) return;
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
    setVisible([]);

    TERMINAL_LINES.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisible((p) => [...p, i]);
      }, line.delay * 1000);
      timerRefs.current.push(t);
    });

    return () => timerRefs.current.forEach(clearTimeout);
  }, [inView]);

  return (
    <div
      ref={ref}
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(6,6,14,0.95)",
        border: "1px solid rgba(99,102,241,0.2)",
        fontFamily: "monospace",
        fontSize: "11px",
      }}
    >
      {/* titlebar */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5"
        style={{ borderBottom: "1px solid rgba(99,102,241,0.1)" }}
      >
        <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
        <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
        <div className="w-2 h-2 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-[9px] font-mono" style={{ color: "rgba(165,180,252,0.3)" }}>
          claude-code — s-skills demo
        </span>
      </div>
      {/* body */}
      <div className="p-4 space-y-1 min-h-[200px]">
        {TERMINAL_LINES.map((line, i) =>
          visible.includes(i) ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
            >
              {line.text ? (
                <span style={{ color: line.color, whiteSpace: "pre" }}>{line.text}</span>
              ) : (
                <div className="h-2" />
              )}
            </motion.div>
          ) : null
        )}
        {visible.length > 0 && visible.length < TERMINAL_LINES.length && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-1.5 h-3 align-middle"
            style={{ background: "#6366f1" }}
          />
        )}
      </div>
    </div>
  );
}

/* ── QA Score visual ── */
const AXES = [
  { label: "Runtime Loop", score: 9, color: "#A78BFA" },
  { label: "Orchestration", score: 10, color: "#818CF8" },
  { label: "Role Separation", score: 9, color: "#C4B5FD" },
  { label: "Tool Hierarchy", score: 8, color: "#A78BFA" },
  { label: "State & Context", score: 10, color: "#818CF8" },
  { label: "Guardrails", score: 9, color: "#C4B5FD" },
  { label: "Observability", score: 8, color: "#A78BFA" },
];

function QAScoreCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2.5">
      {AXES.map(({ label, score, color }, i) => (
        <div key={label} className="flex items-center gap-3">
          <span
            className="text-[9px] font-medium w-20 shrink-0"
            style={{ color: "rgba(237,233,223,0.45)" }}
          >
            {label}
          </span>
          <div className="flex-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.07)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{ background: color }}
              initial={{ width: 0 }}
              animate={inView ? { width: `${(score / 10) * 100}%` } : { width: 0 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <span
            className="text-[9px] font-mono tabular-nums w-4 text-right shrink-0"
            style={{ color }}
          >
            {score}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Routing showcase ── */
const ROUTES = [
  { cmd: "/sj-company 로그인 만들어줘", badge: "Medium", agents: "PM → TL → FE + BE + Sec", color: "#6366F1", bg: "#EEF2FF" },
  { cmd: "/sj-company 매일 파일 정리", badge: "Tiny", agents: "sj-automation", color: "#059669", bg: "#D1FAE5" },
  { cmd: "/sj-company 인스타 포스팅 써줘", badge: "Small", agents: "sj-marketing", color: "#D97706", bg: "#FEF3C7" },
  { cmd: "/sj-company 에이전트 구조 점검", badge: "Small", agents: "sj-agent-review (7-axis)", color: "#7C3AED", bg: "#EDE9FE" },
];

export function SkillsSection() {
  return (
    <section id="features" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-[10px] tracking-[4px] uppercase font-semibold mb-5" style={{ color: "#6366F1" }}>
            전체 기능
          </p>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "#0F0F1A" }}>19개 스킬.</span>
            <br />
            <span style={{ color: "rgba(15,15,26,0.2)" }}>하나의 진입점.</span>
          </h2>
        </motion.div>

        {/* ─── Bento grid ─── */}
        <div className="grid md:grid-cols-2 gap-4">

          {/* ① Big dark card — terminal demo (rows 1+2 on left) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, delay: 0, ease: [0.16, 1, 0.3, 1] }}
            className="md:row-span-2 rounded-3xl p-7 flex flex-col gap-6"
            style={{
              background: "#0A0A14",
              border: "1px solid rgba(99,102,241,0.12)",
              boxShadow: "0 0 60px rgba(99,102,241,0.08)",
            }}
          >
            <div>
              <p
                className="text-[10px] tracking-[3px] uppercase font-semibold mb-3"
                style={{ color: "#818CF8" }}
              >
                Live Demo
              </p>
              <div
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  color: "#EDE9DF",
                }}
              >
                1 CMD
              </div>
              <div
                style={{
                  fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  color: "rgba(237,233,223,0.2)",
                }}
              >
                Full Pipeline
              </div>
            </div>
            <MiniTerminal />
          </motion.div>

          {/* ② QA Score card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-7"
            style={{
              background: "#1A0E3B",
              border: "1px solid rgba(139,92,246,0.15)",
            }}
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <p
                  className="text-[10px] tracking-[3px] uppercase font-semibold mb-1"
                  style={{ color: "#A78BFA" }}
                >
                  Agent Review
                </p>
                <div
                  className="flex items-baseline gap-1"
                >
                  <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#C4B5FD", lineHeight: 1, letterSpacing: "-0.04em" }}>63</span>
                  <span className="text-sm font-mono" style={{ color: "rgba(196,181,253,0.4)" }}>/70</span>
                </div>
              </div>
              <span
                className="text-xs font-bold tracking-wider px-3 py-1.5 rounded-full"
                style={{
                  background: "rgba(52,211,153,0.12)",
                  color: "#34D399",
                  border: "1px solid rgba(52,211,153,0.25)",
                }}
              >
                PASS
              </span>
            </div>
            <QAScoreCard />
          </motion.div>

          {/* ③ Stats card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl p-7 flex gap-6"
            style={{
              background: "#F0F4FF",
              border: "1px solid rgba(99,102,241,0.12)",
            }}
          >
            {[
              { val: "19", label: "전문 스킬", color: "#4338CA" },
              { val: "6", label: "카테고리", color: "#6366F1" },
              { val: "10+", label: "서브에이전트", color: "#818CF8" },
            ].map(({ val, label, color }) => (
              <div key={label} className="flex-1">
                <div style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 800, color, letterSpacing: "-0.04em", lineHeight: 1 }}>
                  {val}
                </div>
                <div className="text-[10px] mt-1.5 tracking-wide uppercase font-medium" style={{ color: "rgba(67,56,202,0.5)" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>

        </div>

        {/* ─── Routing showcase ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 rounded-3xl p-7 md:p-10"
          style={{
            background: "#F9F8F5",
            border: "1px solid rgba(15,15,26,0.06)",
          }}
        >
          <p
            className="text-[10px] tracking-[3px] uppercase font-semibold mb-7"
            style={{ color: "rgba(15,15,26,0.3)" }}
          >
            스마트 라우팅 — 입력 → 최적 에이전트
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {ROUTES.map(({ cmd, badge, agents, color, bg }, i) => (
              <motion.div
                key={cmd}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.45, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl p-5"
                style={{ background: "#FFFFFF", border: "1px solid rgba(15,15,26,0.07)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                    style={{ color, background: bg }}
                  >
                    {badge}
                  </span>
                </div>
                <code className="text-xs font-mono block mb-2.5" style={{ color: "#3730A3" }}>
                  {cmd}
                </code>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px]" style={{ color: "rgba(15,15,26,0.2)" }}>→</span>
                  <span className="text-xs font-medium" style={{ color: "rgba(15,15,26,0.5)" }}>
                    {agents}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ─── Auto-Learn banner ─── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 rounded-3xl p-7 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-8"
          style={{
            background: "linear-gradient(135deg, #022C22 0%, #064E3B 100%)",
            border: "1px solid rgba(52,211,153,0.15)",
          }}
        >
          <div className="flex-1">
            <p className="text-[10px] tracking-[3px] uppercase font-semibold mb-2" style={{ color: "#34D399" }}>
              Auto-Learn
            </p>
            <p style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700, color: "#ECFDF5", lineHeight: 1.2, letterSpacing: "-0.03em" }}>
              세션이 끝날 때마다<br />패턴이 자동 학습된다.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {["Stop", "→ asyncRewake", "→ Claude 재기동", "→ 패턴 추출", "→ skills/ 저장"].map((s, i) => (
              <div key={s} className="text-center">
                <div
                  className="text-[9px] whitespace-nowrap font-mono"
                  style={{ color: i === 0 ? "rgba(52,211,153,0.5)" : i === 4 ? "#34D399" : "rgba(52,211,153,0.35)" }}
                >
                  {s}
                </div>
                {i < 4 && <div style={{ display: "none" }} />}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
