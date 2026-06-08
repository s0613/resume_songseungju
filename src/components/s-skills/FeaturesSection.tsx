"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowRight } from "lucide-react";
import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";

interface FeatureCard {
  type: "pipeline" | "skill";
  number?: string;
  title?: string;
  items?: string[];
}

const cards: FeatureCard[] = [
  { type: "pipeline" },
  {
    type: "skill",
    number: "01",
    title: "SJ Company.",
    items: [
      "태스크 크기 자동 감지 (Tiny → Large)",
      "PM · Design · Tech Lead 순차 라우팅",
      "QA PASS / CONDITIONAL / FAIL 판정",
      "Work Card Protocol 에이전트 핸드오프",
    ],
  },
  {
    type: "skill",
    number: "02",
    title: "Agent Dev.",
    items: [
      "7축 설계 검증 (Runtime Loop · Guardrails)",
      "Specialist 역할 분리 + 권한 경계 설정",
      "Observability — run_id · structured log",
    ],
  },
  {
    type: "skill",
    number: "03",
    title: "Docs Organize.",
    items: [
      "코드 분석 → docs/ 자동 생성",
      "0–100 건강 점수 (4개 차원 평가)",
      "문서·구현율·품질·인프라 종합 리포트",
    ],
  },
];

function PipelineCard({ delay }: { delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    { label: "PM", color: "#7c3aed", desc: "요구사항 분석" },
    { label: "Design", color: "#2563eb", desc: "UI/UX 명세" },
    { label: "Dev", color: "#059669", desc: "병렬 구현" },
    { label: "QA", color: "#d97706", desc: "검증 + 판정" },
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl overflow-hidden lg:h-[480px] flex flex-col justify-end"
      style={{ background: "linear-gradient(160deg, #0a0514 0%, #0d0a1e 50%, #050510 100%)" }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(99,102,241,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.06) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Pipeline steps */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + 0.2 + i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="w-full flex items-center gap-3"
          >
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: step.color, boxShadow: `0 0 8px ${step.color}` }}
            />
            <div className="flex-1 bg-white/[0.04] rounded-lg px-4 py-2 flex items-center justify-between">
              <span
                className="text-xs font-bold tracking-widest uppercase"
                style={{ color: step.color }}
              >
                {step.label}
              </span>
              <span className="text-xs text-gray-500">{step.desc}</span>
            </div>
          </motion.div>
        ))}

        {/* Connector line */}
        <motion.div
          className="absolute left-[calc(1.5rem+4px)] top-[calc(50%-60px)] w-0.5"
          style={{ background: "rgba(99,102,241,0.2)", height: "120px" }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Bottom label */}
      <div className="relative z-10 p-5">
        <p
          className="text-base font-semibold"
          style={{ color: "#E1E0CC" }}
        >
          Your creative canvas.
        </p>
      </div>
    </motion.div>
  );
}

function SkillCard({
  card,
  delay,
}: {
  card: FeatureCard;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="rounded-2xl p-6 flex flex-col justify-between lg:h-[480px]"
      style={{ background: "#212121" }}
    >
      {/* Top */}
      <div>
        {/* Number + title */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[10px] text-gray-500 tracking-[3px] uppercase mb-2">
              {card.number}
            </p>
            <h3
              className="text-xl sm:text-2xl font-semibold leading-tight"
              style={{ color: "#E1E0CC" }}
            >
              {card.title}
            </h3>
          </div>
        </div>

        {/* Checklist */}
        <ul className="space-y-3 mt-4">
          {card.items?.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <Check
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: "#DEDBC8" }}
              />
              <span className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Learn more */}
      <div className="mt-6 pt-5 border-t border-white/[0.06]">
        <a
          href="https://github.com/s0613/S-skills"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-[#DEDBC8] transition-colors duration-200 group"
        >
          Learn more
          <ArrowRight
            className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200"
          />
        </a>
      </div>
    </motion.div>
  );
}

export function FeaturesSection() {
  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="features"
      className="min-h-screen bg-black py-24 md:py-32 px-4 relative"
    >
      {/* Noise bg */}
      <div className="bg-noise absolute inset-0 opacity-[0.12] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-14">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: "스튜디오급 워크플로우, 비저너리 크리에이터를 위한.",
                className: "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal",
              },
            ]}
            containerClassName="mb-3"
            delay={0}
          />
          <WordsPullUpMultiStyle
            segments={[
              {
                text: "순수한 비전을 위해 설계됐다. 기술로 구동된다.",
                className:
                  "text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-gray-500",
              },
            ]}
            delay={0.1}
          />
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-2">
          {cards.map((card, i) =>
            card.type === "pipeline" ? (
              <PipelineCard key="pipeline" delay={i * 0.15} />
            ) : (
              <SkillCard key={card.number} card={card} delay={i * 0.15} />
            )
          )}
        </div>
      </div>
    </section>
  );
}
