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
  { delay: 300,  text: "/sj-company 로그인 기능 만들어줘",  color: "#E1E0CC",                   cursor: true  },
  { delay: 900,  text: "태스크 크기 감지: Medium",          color: "rgba(222,219,200,0.45)",    cursor: false },
  { delay: 1600, text: "[ PM ]  요구사항 분석 중...",       color: "#a78bfa",                   cursor: false },
  { delay: 2600, text: "✓  PM Brief 완료",                  color: "#34d399",                   cursor: false },
  { delay: 3200, text: "[ Tech Lead ]  서브에이전트 디스패치", color: "#60a5fa",                cursor: false },
  { delay: 3700, text: "  ├─ sj-dev-backend    running",    color: "#60a5fa",                   cursor: false },
  { delay: 4000, text: "  ├─ sj-dev-frontend   running",    color: "#60a5fa",                   cursor: false },
  { delay: 4300, text: "  └─ sj-dev-security   running",    color: "#60a5fa",                   cursor: false },
  { delay: 6200, text: "✓  구현 완료 — 3개 에이전트",       color: "#34d399",                   cursor: false },
  { delay: 6800, text: "[ QA ]  검증 중...",                color: "#fbbf24",                   cursor: false },
  { delay: 7900, text: "✓  PASS — 모든 검증 통과",          color: "#34d399",                   cursor: false },
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
        background: "rgba(6,6,14,0.96)",
        border: "1px solid rgba(99,102,241,0.3)",
        boxShadow: "0 0 80px rgba(99,102,241,0.18), 0 0 30px rgba(99,102,241,0.1), 0 0 0 1px rgba(255,255,255,0.03)",
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{ borderBottom: "1px solid rgba(99,102,241,0.12)" }}>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] text-gray-600 ml-2 font-mono">claude-code — s-skills</span>
      </div>

      {/* Body */}
      <div className="flex-1 p-4 md:p-5 font-mono text-[11px] md:text-xs space-y-2 overflow-hidden">
        {/* Input line */}
        <div className="flex items-center gap-1.5">
          <span style={{ color: "#6366f1" }}>❯</span>
          <span style={{ color: "#E1E0CC" }}>
            {STEPS[0].text.slice(0, charCount)}
          </span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-[5px] h-[13px] align-middle rounded-sm"
            style={{ background: "#6366f1" }}
          />
        </div>
        {/* Response lines */}
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
    <section className="h-screen p-4 md:p-5 bg-black">
      <div
        className="relative h-full rounded-2xl md:rounded-[2rem] overflow-hidden"
        style={{ background: "#04040a" }}
      >
        {/* ── Background layers ── */}

        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        {/* Top-right strong indigo spotlight */}
        <div className="absolute pointer-events-none"
          style={{
            right: "-8%", top: "-15%", width: "75%", height: "100%",
            background: "radial-gradient(ellipse 50% 55% at 65% 22%, rgba(99,102,241,0.55) 0%, rgba(139,92,246,0.25) 40%, transparent 70%)",
          }}
        />
        {/* Left warm violet glow */}
        <div className="absolute pointer-events-none"
          style={{
            left: "-5%", bottom: "0", width: "55%", height: "65%",
            background: "radial-gradient(ellipse 55% 50% at 30% 85%, rgba(168,85,247,0.28) 0%, transparent 65%)",
          }}
        />
        {/* Center accent */}
        <div className="absolute pointer-events-none"
          style={{
            left: "35%", top: "20%", width: "30%", height: "40%",
            background: "radial-gradient(ellipse at center, rgba(129,140,248,0.12) 0%, transparent 70%)",
          }}
        />
        {/* Noise */}
        <div className="noise-overlay absolute inset-0 opacity-35 mix-blend-overlay pointer-events-none" />
        {/* Bottom gradient to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, rgba(4,4,10,0.9) 0%, transparent 100%)" }}
        />
        {/* Right vignette */}
        <div className="absolute top-0 bottom-0 right-0 w-16 pointer-events-none"
          style={{ background: "linear-gradient(to left, #04040a 0%, transparent 100%)" }}
        />

        {/* ── Pill nav ── */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
          <nav className="rounded-b-2xl md:rounded-b-3xl px-5 md:px-8 py-2.5 flex items-center gap-4 sm:gap-8"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)" }}>
            {navItems.map((item) => (
              <a key={item.name} href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="text-[10px] sm:text-xs md:text-sm transition-colors duration-200"
                style={{ color: "rgba(225,224,204,0.6)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#E1E0CC")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(225,224,204,0.6)")}
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* ── Version badge (top-left) ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="absolute top-6 left-7 z-20 hidden lg:flex items-center gap-2"
        >
          <span
            className="inline-flex items-center gap-1.5 text-[10px] font-mono px-3 py-1 rounded-full"
            style={{
              background: "rgba(99,102,241,0.1)",
              border: "1px solid rgba(99,102,241,0.22)",
              color: "#a5b4fc",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#6366f1] animate-pulse" />
            v2.9.0
          </span>
        </motion.div>

        {/* ── Pipeline flow visualization (center-left fill) ── */}
        <div className="absolute hidden lg:flex flex-col justify-center z-10 pointer-events-none"
          style={{ left: "22%", top: "10%", bottom: "28%", width: "clamp(160px, 18%, 220px)" }}
        >
          {/* Vertical connecting line */}
          <div className="absolute left-[11px] top-8 bottom-8 w-px"
            style={{ background: "linear-gradient(to bottom, rgba(167,139,250,0.5), rgba(96,165,250,0.5), rgba(52,211,153,0.5), rgba(251,191,36,0.5))" }}
          />

          {[
            { role: "PM", sub: "요구사항 분석", color: "#a78bfa", delay: 1.0 },
            { role: "Design", sub: "UI/UX 명세", color: "#60a5fa", delay: 1.3 },
            { role: "Tech Lead", sub: "서브에이전트 디스패치", color: "#34d399", delay: 1.6 },
            { role: "QA", sub: "검증 + 판정", color: "#fbbf24", delay: 1.9 },
          ].map(({ role, sub, color, delay }) => (
            <motion.div
              key={role}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center gap-3 mb-5 last:mb-0"
            >
              {/* Node circle */}
              <div className="relative shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
                style={{ background: `${color}18`, border: `1px solid ${color}55`, boxShadow: `0 0 10px ${color}35` }}
              >
                <div className="w-2 h-2 rounded-full" style={{ background: color, boxShadow: `0 0 5px ${color}` }} />
              </div>

              {/* Card */}
              <div className="rounded-xl px-3 py-2"
                style={{ background: "rgba(8,8,16,0.82)", border: `1px solid ${color}22`, backdropFilter: "blur(8px)" }}
              >
                <div className="text-xs font-semibold leading-tight" style={{ color }}>{role}</div>
                <div className="text-[9px] leading-tight mt-0.5" style={{ color: "rgba(160,160,160,0.7)" }}>{sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Stats row (bottom-center fill) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="absolute bottom-10 hidden lg:flex items-center gap-8"
          style={{ left: "50%", transform: "translateX(-50%)" }}
        >
          {[
            { val: "13+", label: "Skills" },
            { val: "7축", label: "Agent Validation" },
            { val: "1 cmd", label: "Full Pipeline" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div className="text-lg font-semibold" style={{ color: "#E1E0CC" }}>{val}</div>
              <div className="text-[9px] text-gray-600 tracking-widest uppercase">{label}</div>
            </div>
          ))}
        </motion.div>

        {/* ── Terminal (right side, absolutely positioned) ── */}
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
            filter: "drop-shadow(0 0 40px rgba(99,102,241,0.2))",
          }}
        >
          <TerminalWindow />
        </motion.div>

        {/* ── Left content (absolute bottom-left) ── */}
        <div className="absolute z-10 left-6 md:left-10 right-6 md:right-[50%] bottom-7 md:bottom-10">
          {/* Title */}
          <div className="overflow-hidden mb-5">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="font-medium tracking-[-0.06em] leading-[0.85] whitespace-nowrap"
              style={{
                fontSize: "clamp(3.5rem, 8vw, 8.5rem)",
                background: "linear-gradient(95deg, #E1E0CC 0%, #E1E0CC 55%, #a5b4fc 85%, #818cf8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              S‑SKILLS
            </motion.h1>
          </div>

          {/* Description + CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-7">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs sm:text-sm max-w-[230px] sm:max-w-[260px]"
              style={{ color: "rgba(222,219,200,0.52)", lineHeight: 1.55 }}
            >
              Claude Code용 역할 기반 개발 오케스트레이터. 태스크를 설명하면
              전체 파이프라인이 자동 라우팅된다.
            </motion.p>

            <motion.a
              href="https://github.com/s0613/S-skills"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="group inline-flex items-center gap-2 bg-[#DEDBC8] rounded-full pl-5 pr-1.5 py-1.5 text-sm font-medium text-black shrink-0 hover:gap-3 transition-all duration-300"
            >
              Install Now
              <span className="bg-black rounded-full w-9 h-9 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="w-4 h-4 text-[#DEDBC8]" />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
