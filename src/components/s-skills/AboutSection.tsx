"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

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
      const current = Math.round(eased * to);
      if (ref.current) ref.current.textContent = String(current);
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }, [inView, to]);

  return <span ref={ref}>0</span>;
}

const ROUTING_TABLE = [
  { input: "/sj-company 로그인 기능 만들어줘", output: "PM → Tech Lead → 서브에이전트 병렬 → QA" },
  { input: "/sj-company 옵시디언에 정리해줘", output: "Obsidian Writer" },
  { input: "/sj-company UI 자동화 만들어줘", output: "sj-ui-auto (Playwright · PyAutoGUI)" },
  { input: "/sj-company 매일 파일 정리 자동화", output: "sj-automation (launchd · shell)" },
  { input: "/sj-company 인스타 포스팅 만들어줘", output: "sj-marketing (카피 · 브랜드 검수)" },
  { input: "/sj-company 구글 색인 등록해줘", output: "sj-seo (Search Console 직접 제어)" },
  { input: "/sj-company 에이전트 설계 도와줘", output: "sj-agent-dev (10축 아키텍처)" },
  { input: "/sj-company 에이전트 구조 점검해줘", output: "sj-agent-review (7축 심사 → PASS/WARN/FAIL)" },
];

const TASK_SIZES = [
  { size: "Tiny", label: "즉시 구현", color: "#059669", bg: "#D1FAE5", border: "#6EE7B7" },
  { size: "Small", label: "2파일 이내", color: "#1D4ED8", bg: "#DBEAFE", border: "#93C5FD" },
  { size: "Medium", label: "PM → TL 병렬", color: "#7C3AED", bg: "#EDE9FE", border: "#C4B5FD" },
  { size: "Large", label: "다단계 계획", color: "#B45309", bg: "#FEF3C7", border: "#FCD34D" },
  { size: "xLarge", label: "Ultracode", color: "#DC2626", bg: "#FEE2E2", border: "#FCA5A5" },
];

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#FAFAF7" }}>
      <div className="max-w-5xl mx-auto">

        {/* Label */}
        <FadeIn>
          <p
            className="text-[10px] tracking-[4px] uppercase font-semibold mb-8"
            style={{ color: "#6366F1" }}
          >
            What is S-Skills
          </p>
        </FadeIn>

        {/* Giant headline — dark on light */}
        <FadeIn delay={0.08}>
          <h2
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "2rem",
            }}
          >
            <span style={{ color: "#0F0F1A" }}>태스크를 말하면,</span>
            <br />
            <span style={{ color: "rgba(15,15,26,0.4)" }}>알맞은 전문가가</span>
            <br />
            <span style={{ color: "rgba(15,15,26,0.2)" }}>알아서 간다.</span>
          </h2>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.14}>
          <p
            className="text-base leading-relaxed mb-20 max-w-lg"
            style={{ color: "rgba(15,15,26,0.5)", lineHeight: 1.7 }}
          >
            <code
              style={{
                color: "#4338CA",
                fontFamily: "monospace",
                fontSize: "0.85em",
                background: "#EEF2FF",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              /sj-company
            </code>{" "}
            하나로 태스크 규모를 자동 판단하고 PM · 개발 · QA · 자동화 · 마케팅까지
            최적의 스킬로 라우팅합니다.
          </p>
        </FadeIn>

        {/* CountUp stats row */}
        <FadeIn delay={0.2}>
          <div
            className="flex flex-wrap gap-x-14 gap-y-8 pb-20"
            style={{ borderBottom: "1px solid rgba(15,15,26,0.08)" }}
          >
            {[
              { to: 19, label: "전문 스킬" },
              { to: 10, label: "서브에이전트" },
              { to: 7, label: "심사 축" },
              { to: 1, label: "명령어" },
            ].map(({ to, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    fontWeight: 800,
                    lineHeight: 1,
                    color: "#0F0F1A",
                    letterSpacing: "-0.04em",
                  }}
                >
                  <CountUp to={to} />
                </div>
                <div
                  className="text-[10px] mt-2 tracking-[3px] uppercase"
                  style={{ color: "rgba(15,15,26,0.3)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Routing table */}
        <FadeIn delay={0.26}>
          <p
            className="text-[10px] tracking-[4px] uppercase font-semibold mt-16 mb-5"
            style={{ color: "rgba(15,15,26,0.25)" }}
          >
            자동 라우팅 예시
          </p>
          <div style={{ borderTop: "1px solid rgba(15,15,26,0.07)" }}>
            {ROUTING_TABLE.map(({ input, output }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.04 * i }}
                className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 py-4"
                style={{ borderBottom: "1px solid rgba(15,15,26,0.06)" }}
              >
                <code
                  className="shrink-0 text-xs font-mono px-2 py-1 rounded-md"
                  style={{ color: "#3730A3", background: "#EEF2FF" }}
                >
                  {input}
                </code>
                <span
                  className="hidden sm:block shrink-0 text-xs font-mono"
                  style={{ color: "rgba(15,15,26,0.2)" }}
                >
                  →
                </span>
                <span className="text-sm" style={{ color: "rgba(15,15,26,0.55)" }}>
                  {output}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Task size badges */}
        <FadeIn delay={0.32}>
          <div className="mt-12 flex flex-wrap gap-2.5">
            {TASK_SIZES.map(({ size, label, color, bg, border }) => (
              <div
                key={size}
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <span className="text-xs font-semibold" style={{ color }}>
                  {size}
                </span>
                <span className="text-xs" style={{ color: "rgba(15,15,26,0.45)" }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
