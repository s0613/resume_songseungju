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

const STATS = [
  { value: "19+", label: "전문 스킬" },
  { value: "10", label: "서브에이전트" },
  { value: "7축", label: "에이전트 심사" },
  { value: "4단계", label: "태스크 라우팅" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-36 px-4" style={{ background: "#F8F5EE" }}>
      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <FadeIn>
          <div className="flex items-center gap-3 mb-14">
            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
            <span className="text-[10px] tracking-[4px] uppercase text-indigo-500 font-semibold">What is S-Skills</span>
          </div>
        </FadeIn>

        {/* Headline */}
        <FadeIn delay={0.1}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-medium leading-[1.1] tracking-tight mb-4"
            style={{ color: "#0A0A1A" }}>
            태스크를 말하면,<br />
            <span className="italic" style={{ fontFamily: "'Instrument Serif', serif" }}>알맞은 전문가가 알아서 간다.</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.18}>
          <p className="text-base md:text-lg max-w-2xl leading-relaxed mb-16" style={{ color: "#52525B" }}>
            S-skills는 Claude Code용 역할 기반 개발 오케스트레이터입니다.
            단일 명령어 <code className="text-xs px-2 py-0.5 rounded-md font-mono" style={{ background: "#E8E5DC", color: "#3730A3" }}>/sj-company</code>가
            태스크 규모를 자동 판단하고 PM · 디자인 · 개발 · QA · 자동화 · 마케팅 · 에이전트 설계까지 최적의 스킬로 라우팅합니다.
          </p>
        </FadeIn>

        {/* Stats */}
        <FadeIn delay={0.22}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
            {STATS.map(({ value, label }) => (
              <div key={label} className="rounded-2xl px-6 py-5" style={{ background: "#EFECEA", border: "1px solid #E0DDD6" }}>
                <div className="text-3xl font-semibold mb-1" style={{ color: "#0A0A1A" }}>{value}</div>
                <div className="text-xs tracking-wider uppercase" style={{ color: "#78716C" }}>{label}</div>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Routing table */}
        <FadeIn delay={0.28}>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E0DDD6" }}>
            <div className="px-5 py-4 flex items-center gap-2" style={{ background: "#EFECEA", borderBottom: "1px solid #E0DDD6" }}>
              <div className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#52525B" }}>자동 라우팅 예시</span>
            </div>
            <div style={{ background: "#FDFCFA" }}>
              {ROUTING_TABLE.map(({ input, output }, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-3.5"
                  style={{ borderBottom: i < ROUTING_TABLE.length - 1 ? "1px solid #F0EDE8" : "none" }}
                >
                  <code className="text-xs font-mono shrink-0 px-2.5 py-1.5 rounded-lg" style={{ background: "#EEE9FF", color: "#4338CA", whiteSpace: "nowrap" }}>
                    {input}
                  </code>
                  <svg className="hidden sm:block w-4 h-4 shrink-0" style={{ color: "#A8A29E" }} viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-sm" style={{ color: "#374151" }}>{output}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Task size routing */}
        <FadeIn delay={0.35}>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { size: "Tiny / Small", color: "#10B981", bg: "#D1FAE5", border: "#A7F3D0", desc: "즉시 구현", detail: "컨텍스트 파악 후 바로 작성" },
              { size: "Medium", color: "#6366F1", bg: "#EEF2FF", border: "#C7D2FE", desc: "PM → Tech Lead → pw-loop", detail: "요구사항 분석 → 병렬 구현 → 자동 검증" },
              { size: "Large", color: "#F59E0B", bg: "#FEF3C7", border: "#FDE68A", desc: "PM → 단계 계획 → TL → QA", detail: "다단계 계획 후 순차 실행" },
              { size: "xLarge", color: "#8B5CF6", bg: "#F5F3FF", border: "#DDD6FE", desc: "ultracode 멀티에이전트", detail: "병렬 에이전트 워크플로우" },
            ].map(({ size, color, bg, border, desc, detail }) => (
              <div key={size} className="rounded-xl p-4" style={{ background: bg, border: `1px solid ${border}` }}>
                <div className="text-xs font-bold mb-1" style={{ color }}>{size}</div>
                <div className="text-sm font-medium mb-1" style={{ color: "#1F2937" }}>{desc}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>{detail}</div>
              </div>
            ))}
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
