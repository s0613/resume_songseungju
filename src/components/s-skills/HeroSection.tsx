"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { name: "소개", href: "#about" },
  { name: "스킬", href: "#features" },
  { name: "설치", href: "#install" },
  { name: "GitHub", href: "https://github.com/s0613/S-skills" },
];

const STEPS = [
  { delay: 300,  text: "/sj-company 로그인 기능 만들어줘",  color: "#111111",                cursor: true  },
  { delay: 900,  text: "태스크 크기 감지: Medium",          color: "rgba(10,10,10,0.35)",    cursor: false },
  { delay: 1600, text: "[ PM ]  요구사항 분석 중...",       color: "#4F46E5",                cursor: false },
  { delay: 2600, text: "✓  PM Brief 완료",                  color: "#059669",                cursor: false },
  { delay: 3200, text: "[ Tech Lead ]  서브에이전트 디스패치", color: "#1D4ED8",             cursor: false },
  { delay: 3700, text: "  ├─ sj-dev-backend    running",    color: "#1D4ED8",                cursor: false },
  { delay: 4000, text: "  ├─ sj-dev-frontend   running",    color: "#1D4ED8",                cursor: false },
  { delay: 4300, text: "  └─ sj-dev-security   running",    color: "#1D4ED8",                cursor: false },
  { delay: 6200, text: "✓  구현 완료 — 3개 에이전트",       color: "#059669",                cursor: false },
  { delay: 6800, text: "[ QA ]  검증 중...",                color: "#B45309",                cursor: false },
  { delay: 7900, text: "✓  PASS — 모든 검증 통과",          color: "#059669",                cursor: false },
];

function TerminalWindow() {
  const [phase, setPhase] = useState<"typing" | "lines">("typing");
  const [charCount, setCharCount] = useState(0);
  const [visible, setVisible] = useState<number[]>([]);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (ref.current) clearInterval(ref.current);
  };

  const run = () => {
    clear();
    setCharCount(0);
    setVisible([]);
    setPhase("typing");

    let c = 0;
    const inputText = STEPS[0].text;
    ref.current = setInterval(() => {
      c++;
      setCharCount(c);
      if (c >= inputText.length) {
        if (ref.current) clearInterval(ref.current);
        setPhase("lines");
      }
    }, 36);

    STEPS.slice(1).forEach((s, i) => {
      const t = setTimeout(() => setVisible((p) => [...p, i + 1]), s.delay);
      timers.current.push(t);
    });

    timers.current.push(setTimeout(run, 10500));
  };

  useEffect(() => { run(); return clear; }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="w-full h-full rounded-xl flex flex-col"
      style={{
        background: "#FAFAF8",
        border: "1px solid rgba(10,10,10,0.1)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(10,10,10,0.07)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] ml-2 font-mono" style={{ color: "rgba(10,10,10,0.3)" }}>
          claude-code — s-skills
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 md:p-5 font-mono text-[11px] md:text-xs space-y-2 overflow-hidden">
        <div className="flex items-center gap-1.5">
          <span style={{ color: "#4F46E5" }}>❯</span>
          <span style={{ color: "#111111" }}>
            {STEPS[0].text.slice(0, charCount)}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-[5px] h-[13px] align-middle rounded-sm"
            style={{ background: "#4F46E5" }}
          />
        </div>
        {STEPS.slice(1).map((s, i) =>
          visible.includes(i + 1) ? (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
            >
              <span style={{ color: s.color, whiteSpace: "pre" }}>{s.text}</span>
            </motion.div>
          ) : null
        )}
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="h-screen p-4 md:p-5" style={{ background: "#FAFAF8" }}>
      <div
        className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden"
        style={{ background: "#FFFFFF", border: "1px solid rgba(10,10,10,0.07)" }}
      >
        {/* Subtle dot grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(rgba(10,10,10,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(255,255,255,0.95) 0%, transparent 100%)" }}
        />

        {/* ── Nav ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <nav className="rounded-b-2xl md:rounded-b-3xl px-5 md:px-8 py-2.5 flex items-center gap-4 sm:gap-8"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(16px)",
              borderBottom: "1px solid rgba(10,10,10,0.07)",
              borderLeft: "1px solid rgba(10,10,10,0.07)",
              borderRight: "1px solid rgba(10,10,10,0.07)",
            }}>
            {navItems.map((item) => (
              <a key={item.name} href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[10px] sm:text-xs transition-colors duration-200"
                style={{ color: "rgba(10,10,10,0.45)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A0A")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(10,10,10,0.45)")}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Version badge ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-6 left-7 z-20 hidden lg:flex items-center gap-2"
        >
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-mono px-3 py-1 rounded-full"
            style={{
              background: "rgba(79,70,229,0.07)",
              border: "1px solid rgba(79,70,229,0.15)",
              color: "#4F46E5",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
            v2.9.0
          </span>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-10 hidden lg:flex items-center gap-8"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {[
            { val: "19+", label: "Skills" },
            { val: "7축", label: "Agent Validation" },
            { val: "1 cmd", label: "Full Pipeline" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="text-lg font-semibold" style={{ color: "#0A0A0A" }}>{val}</div>
              <div className="text-[9px] tracking-widest uppercase" style={{ color: "rgba(10,10,10,0.3)" }}>{label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Terminal (right side) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-10"
          style={{
            top: "10%",
            right: "4%",
            bottom: "18%",
            width: "clamp(280px, 44%, 580px)",
          }}
        >
          <TerminalWindow />
        </motion.div>

        {/* ── Left content ── */}
        <div className="absolute z-10 left-6 md:left-10 right-6 md:right-[50%] bottom-7 md:bottom-10">
          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-black tracking-[-0.06em] leading-[0.85] whitespace-nowrap"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 8.5rem)",
                color: "#0A0A0A",
              }}
            >
              S‑SKILLS
            </motion.h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xs sm:text-sm max-w-[240px]"
              style={{ color: "rgba(10,10,10,0.5)", lineHeight: 1.6 }}
            >
              Claude Code용 역할 기반 오케스트레이터.
              태스크를 설명하면 전체 파이프라인이 자동 라우팅된다.
            </motion.p>

            <motion.a
              href="https://github.com/s0613/S-skills"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58 }}
              className="group inline-flex items-center gap-2 rounded-full pl-5 pr-1.5 py-1.5 text-sm font-medium shrink-0 transition-all duration-300"
              style={{ background: "#0A0A0A", color: "#FFFFFF" }}
            >
              Install Now
              <span
                className="rounded-full w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                style={{ background: "#4F46E5" }}
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
