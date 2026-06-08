"use client";

import { motion } from "framer-motion";

const REFERENCES = [
  {
    source: "karpathy/nanoGPT · LLM.c",
    label: "Simplicity First",
    principle: "최소 구현이 최강이다",
    desc: "추상화는 이해를 가리면 독이 된다. Tiny·Small 태스크는 PM 없이 직행. 200줄이면 될 걸 800줄로 만들지 않는다.",
    color: "#60A5FA",
  },
  {
    source: "Hermes / Memory System",
    label: "Archive Only",
    principle: "컨텍스트는 절대 삭제하지 않는다",
    desc: "PROJECT.md와 *-context.md는 영속 보존. 오래된 인사이트도 archive하지 삭제하지 않는다. 컨텍스트는 복구 가능해야 한다.",
    color: "#A78BFA",
  },
  {
    source: "g-stack / Composable Skills",
    label: "Skill Composition",
    principle: "작은 전문가의 조합이 범용 AI를 이긴다",
    desc: "6개 카테고리 × 19개 독립 스킬. 하나의 범용 모델보다 각자의 영역에서 정확하고 예측 가능하다.",
    color: "#34D399",
  },
  {
    source: "Microsoft / AutoGen",
    label: "Role Separation",
    principle: "역할이 명확해야 책임이 명확하다",
    desc: "PM이 요구사항을 정의하면 Tech Lead가 실행을 기획하고, QA가 검증을 전담한다. 어떤 에이전트도 자기 영역 밖을 건드리지 않는다.",
    color: "#FBBF24",
  },
  {
    source: "LangGraph / State Machines",
    label: "State as Truth",
    principle: "암묵적 상태는 버그의 온상이다",
    desc: "Work Card Protocol로 에이전트 간 상태 명시화. 중간 산출물은 모두 .state/에 파일로 남긴다. 재현 가능성이 신뢰의 기반이다.",
    color: "#F87171",
  },
  {
    source: "S-Skills / Internal",
    label: "Quality Gate",
    principle: "배포 전 7축 심사를 통과해야 한다",
    desc: "Runtime Loop · Orchestration · Role Separation · Tool Hierarchy · State & Context · Guardrails · Observability. 0–70점 채점, PASS/WARN/FAIL 판정.",
    color: "#C4B5FD",
  },
];

export function PhilosophySection() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#0D0D18" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p
            className="text-[10px] tracking-[4px] uppercase font-semibold mb-6"
            style={{ color: "#818CF8" }}
          >
            Standing on Giants
          </p>
          <h2
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "#EDE9DF" }}>검증된 원칙 위에</span>
            <br />
            <span style={{ color: "rgba(237,233,223,0.28)" }}>세워진 하네스.</span>
          </h2>
          <p
            className="mt-8 text-base max-w-xl"
            style={{ color: "rgba(237,233,223,0.45)", lineHeight: 1.7 }}
          >
            s-skills는 수백만 건의 AI 에이전트 실험에서 증명된 설계 원칙들을
            Claude Code 워크플로우에 이식합니다.
          </p>
        </motion.div>

        {/* Reference cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REFERENCES.map(({ source, label, principle, desc, color }, i) => (
            <motion.div
              key={source}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl p-6 group transition-colors duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              whileHover={{ background: "rgba(255,255,255,0.07)" }}
            >
              {/* Card top */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <span
                  className="text-[9px] font-mono leading-relaxed"
                  style={{ color: "rgba(237,233,223,0.3)" }}
                >
                  {source}
                </span>
                <span
                  className="shrink-0 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    color,
                    background: `${color}18`,
                    border: `1px solid ${color}35`,
                  }}
                >
                  {label}
                </span>
              </div>

              {/* Principle */}
              <p
                className="text-sm font-semibold mb-3 leading-snug"
                style={{ color: "#EDE9DF" }}
              >
                {principle}
              </p>

              {/* Description */}
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(237,233,223,0.38)" }}
              >
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
