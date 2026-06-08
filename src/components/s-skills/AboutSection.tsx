"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || !ref.current) return;
    started.current = true;
    const startTime = performance.now();
    const duration = 1300;
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      if (ref.current) ref.current.textContent = String(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [inView, to]);

  return <span ref={ref}>0</span>;
}

const PIPELINE = [
  {
    label: "/sj-company 로그인 만들어줘",
    sub: "자연어 태스크 입력 — 라우팅 시작",
    color: "#6366F1",
    bg: "#EEF2FF",
    textColor: "#4338CA",
    dot: "#6366F1",
  },
  {
    label: "Size Detection: MEDIUM",
    sub: "Tiny · Small · Medium · Large · xLarge 자동 분류",
    color: "#8B5CF6",
    bg: "#EDE9FE",
    textColor: "#6D28D9",
    dot: "#8B5CF6",
  },
  {
    label: "PM Analysis",
    sub: "요구사항 · 엣지케이스 · 리스크 도출",
    color: "#3B82F6",
    bg: "#DBEAFE",
    textColor: "#1D4ED8",
    dot: "#3B82F6",
  },
  {
    label: "Tech Lead → 3 Agents Dispatched",
    sub: "Frontend + Backend + Security 병렬 실행",
    color: "#0EA5E9",
    bg: "#E0F2FE",
    textColor: "#0369A1",
    dot: "#0EA5E9",
    highlight: true,
  },
  {
    label: "QA Verification",
    sub: "Playwright 루프 · 7축 심사 · 최종 판정",
    color: "#F59E0B",
    bg: "#FEF3C7",
    textColor: "#B45309",
    dot: "#F59E0B",
  },
  {
    label: "✓ PASS — 완료",
    sub: "PROJECT.md 자동 갱신 · 다음 태스크 대기",
    color: "#10B981",
    bg: "#D1FAE5",
    textColor: "#047857",
    dot: "#10B981",
    done: true,
  },
];

const STATS = [
  { val: 19, label: "전문 스킬", accent: "#6366F1" },
  { val: 10, label: "서브에이전트", accent: "#8B5CF6" },
  { val: 7, label: "심사 축", accent: "#F59E0B" },
  { val: 1, label: "명령어", accent: "#10B981" },
];

const vp = { once: true, margin: "-40px" } as const;

function PipelineDot({ active }: { active: boolean }) {
  return (
    <motion.div
      animate={{ scale: active ? [1, 1.4, 1] : 1, opacity: active ? 1 : 0.4 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      className="w-2 h-2 rounded-full"
      style={{ background: active ? "#6366F1" : "rgba(99,102,241,0.3)" }}
    />
  );
}

export function AboutSection() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((p) => (p + 1) % PIPELINE.length);
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#FAFAF7" }}>
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[4px] uppercase font-semibold mb-12"
          style={{ color: "#6366F1" }}
        >
          어떻게 동작하는가
        </motion.p>

        <div className="grid md:grid-cols-[1fr_1.3fr] gap-16 md:gap-24 items-start">

          {/* ── Left: Headline + Stats ── */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.75, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                marginBottom: "1.5rem",
              }}
            >
              <span style={{ color: "#0F0F1A" }}>한 줄 명령어가</span>
              <br />
              <span style={{ color: "#6366F1" }}>팀 전체를</span>
              <br />
              <span style={{ color: "rgba(15,15,26,0.2)" }}>움직인다.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-sm mb-14 max-w-[280px]"
              style={{ color: "rgba(15,15,26,0.45)", lineHeight: 1.8 }}
            >
              태스크를 설명하면 S-Skills가 크기를 판단하고
              PM · TechLead · 전문 에이전트를 자동 배치한다.
            </motion.p>

            {/* Stats 2×2 grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8">
              {STATS.map(({ val, label, accent }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.5, delay: 0.22 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    style={{
                      fontSize: "clamp(2.4rem, 5vw, 4rem)",
                      fontWeight: 800,
                      letterSpacing: "-0.04em",
                      lineHeight: 1,
                      color: accent,
                    }}
                  >
                    <CountUp to={val} />
                  </div>
                  <div
                    className="text-[10px] mt-1.5 tracking-[2px] uppercase font-medium"
                    style={{ color: "rgba(15,15,26,0.35)" }}
                  >
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── Right: Pipeline visualization ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.75, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Vertical rail */}
            <div
              className="absolute"
              style={{
                left: "17px",
                top: "17px",
                bottom: "17px",
                width: "2px",
                background: "linear-gradient(to bottom, #6366F1, #8B5CF6, #3B82F6, #0EA5E9, #F59E0B, #10B981)",
                opacity: 0.25,
                borderRadius: "2px",
              }}
            />

            <div className="space-y-2">
              {PIPELINE.map((stage, i) => (
                <motion.div
                  key={stage.label}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{
                    duration: 0.45,
                    delay: 0.18 + i * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex items-center gap-4"
                >
                  {/* Dot on rail */}
                  <div
                    className="shrink-0 w-[34px] h-[34px] rounded-full flex items-center justify-center"
                    style={{
                      background: activeStep === i ? stage.bg : "#FFFFFF",
                      border: `2px solid ${activeStep === i ? stage.color : "rgba(15,15,26,0.1)"}`,
                      position: "relative",
                      zIndex: 1,
                      transition: "border-color 0.4s ease, background 0.4s ease",
                    }}
                  >
                    <PipelineDot active={activeStep === i} />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 rounded-2xl px-5 py-3.5 transition-all duration-500"
                    style={{
                      background: activeStep === i ? stage.bg : "#FFFFFF",
                      border: `1px solid ${activeStep === i ? `${stage.color}40` : "rgba(15,15,26,0.07)"}`,
                      boxShadow: activeStep === i ? `0 4px 20px ${stage.color}18` : "none",
                      transform: activeStep === i ? "translateX(4px)" : "translateX(0)",
                    }}
                  >
                    <div
                      className="text-sm font-semibold"
                      style={{
                        color: activeStep === i ? stage.textColor : "#0F0F1A",
                        fontFamily: stage.label.startsWith("/") ? "monospace" : "inherit",
                        fontSize: stage.label.startsWith("/") ? "0.8rem" : "0.875rem",
                        transition: "color 0.4s",
                      }}
                    >
                      {stage.label}
                    </div>
                    <div
                      className="text-xs mt-0.5 leading-snug"
                      style={{
                        color: activeStep === i ? `${stage.textColor}99` : "rgba(15,15,26,0.3)",
                        transition: "color 0.4s",
                      }}
                    >
                      {stage.sub}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-1.5 mt-6 pl-12">
              {PIPELINE.map((_, i) => (
                <div
                  key={i}
                  className="rounded-full transition-all duration-400"
                  style={{
                    width: activeStep === i ? "16px" : "4px",
                    height: "4px",
                    background: activeStep === i ? PIPELINE[i].color : "rgba(15,15,26,0.1)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
