"use client";

import { motion } from "framer-motion";

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
  { size: "Tiny", label: "즉시 구현", color: "#34D399" },
  { size: "Small", label: "2파일 이내", color: "#60A5FA" },
  { size: "Medium", label: "PM → TL 병렬", color: "#A78BFA" },
  { size: "Large", label: "다단계 계획", color: "#FBBF24" },
  { size: "xLarge", label: "Ultracode", color: "#F87171" },
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
    <section id="about" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#05050D" }}>
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

        {/* Giant headline */}
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
            <span style={{ color: "#EDE9DF" }}>태스크를 말하면,</span>
            <br />
            <span style={{ color: "rgba(237,233,223,0.38)" }}>알맞은 전문가가</span>
            <br />
            <span style={{ color: "rgba(237,233,223,0.22)" }}>알아서 간다.</span>
          </h2>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.14}>
          <p
            className="text-base leading-relaxed mb-20 max-w-lg"
            style={{ color: "rgba(237,233,223,0.45)", lineHeight: 1.7 }}
          >
            <code style={{ color: "#A5B4FC", fontFamily: "monospace", fontSize: "0.85em" }}>
              /sj-company
            </code>{" "}
            하나로 태스크 규모를 자동 판단하고 PM · 개발 · QA · 자동화 · 마케팅까지
            최적의 스킬로 라우팅합니다.
          </p>
        </FadeIn>

        {/* Stats row — oversized numbers, no cards */}
        <FadeIn delay={0.2}>
          <div
            className="flex flex-wrap gap-x-14 gap-y-8 pb-20"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            {[
              { val: "19", label: "전문 스킬" },
              { val: "10", label: "서브에이전트" },
              { val: "7", label: "심사 축" },
              { val: "1", label: "명령어" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontSize: "clamp(3rem, 5vw, 4.5rem)",
                    fontWeight: 800,
                    lineHeight: 1,
                    color: "#EDE9DF",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {val}
                </div>
                <div
                  className="text-[10px] mt-2 tracking-[3px] uppercase"
                  style={{ color: "rgba(237,233,223,0.3)" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Routing table — terminal log style */}
        <FadeIn delay={0.26}>
          <p
            className="text-[10px] tracking-[4px] uppercase font-semibold mt-16 mb-5"
            style={{ color: "rgba(237,233,223,0.25)" }}
          >
            자동 라우팅 예시
          </p>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {ROUTING_TABLE.map(({ input, output }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.04 * i }}
                className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-6 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <code
                  className="shrink-0 text-xs font-mono"
                  style={{ color: "#818CF8" }}
                >
                  {input}
                </code>
                <span
                  className="hidden sm:block shrink-0 text-xs font-mono"
                  style={{ color: "rgba(255,255,255,0.18)" }}
                >
                  →
                </span>
                <span className="text-sm" style={{ color: "rgba(237,233,223,0.5)" }}>
                  {output}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Task size badges */}
        <FadeIn delay={0.32}>
          <div className="mt-12 flex flex-wrap gap-2.5">
            {TASK_SIZES.map(({ size, label, color }) => (
              <div
                key={size}
                className="flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
                />
                <span className="text-xs font-semibold" style={{ color }}>
                  {size}
                </span>
                <span className="text-xs" style={{ color: "rgba(237,233,223,0.3)" }}>
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
