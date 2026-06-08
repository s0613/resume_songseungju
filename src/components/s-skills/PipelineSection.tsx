"use client";

import { motion } from "framer-motion";

const SUBAGENTS = [
  { name: "sj-dev-frontend", model: "Sonnet", domain: "UI · 컴포넌트 · a11y · 반응형", color: "#60A5FA" },
  { name: "sj-dev-backend", model: "Sonnet", domain: "API · 서버 · 도메인 로직", color: "#60A5FA" },
  { name: "sj-dev-database", model: "Sonnet", domain: "스키마 · 마이그레이션 · 쿼리", color: "#60A5FA" },
  { name: "sj-dev-devops", model: "Haiku", domain: "CI/CD · 배포 · 인프라", color: "#34D399" },
  { name: "sj-dev-security", model: "Opus", domain: "보안 구현 + cross-cutting 리뷰", color: "#F87171" },
  { name: "sj-dev-data", model: "Sonnet", domain: "데이터 파이프라인 · ML", color: "#60A5FA" },
];

const AXES_7 = [
  { n: "01", name: "Runtime Loop", desc: "max_turns · 실패 조건 · human handoff" },
  { n: "02", name: "Orchestration", desc: "Manager는 조율만, 실행하지 않는가" },
  { n: "03", name: "Role Separation", desc: "각 Specialist의 입력·출력·권한 분리" },
  { n: "04", name: "Tool Hierarchy", desc: "도구를 위험도별 5단계로 분류" },
  { n: "05", name: "State & Context", desc: "Work Card로 압축 전달 (prompt 과적재 금지)" },
  { n: "06", name: "Guardrails", desc: "Loop 예산 · circuit breaker · 감정 신호 감지" },
  { n: "07", name: "Observability", desc: "run_id · structured log · 재현 가능성" },
];

function FadeInView({
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
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PipelineSection() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#09090F" }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Tech Lead Architecture ── */}
        <FadeInView>
          <p className="text-[10px] tracking-[4px] uppercase font-semibold mb-6" style={{ color: "#60A5FA" }}>
            Tech Lead Architecture
          </p>
          <h2
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ color: "#EDE9DF" }}>병렬 디스패치</span>
            <br />
            <span style={{ color: "rgba(237,233,223,0.28)" }}>+ Work Card.</span>
          </h2>
          <p className="text-base mb-16 max-w-xl" style={{ color: "rgba(237,233,223,0.4)", lineHeight: 1.7 }}>
            Tech Lead는 태스크를 분석해 필요한 서브에이전트만 선택·병렬 실행한다.
            에이전트 간 직접 조율은{" "}
            <code style={{ color: "#60A5FA", fontFamily: "monospace", fontSize: "0.85em" }}>
              .state/dev/_channel.md
            </code>
            를 통해 이루어진다.
          </p>
        </FadeInView>

        {/* Sub-agents manifest */}
        <FadeInView delay={0.1}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {SUBAGENTS.map(({ name, model, domain, color }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-5 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: color, boxShadow: `0 0 6px ${color}` }}
                />
                <code
                  className="text-sm font-mono font-medium flex-1"
                  style={{ color: "#EDE9DF" }}
                >
                  {name}
                </code>
                <span
                  className="hidden sm:block text-sm flex-1"
                  style={{ color: "rgba(237,233,223,0.35)" }}
                >
                  {domain}
                </span>
                <span
                  className="text-[10px] font-mono px-2.5 py-1 rounded-full shrink-0"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    color: "rgba(237,233,223,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {model}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeInView>

        {/* Work Card Protocol */}
        <FadeInView delay={0.15}>
          <div
            className="mt-10 mb-28 rounded-2xl p-6 md:p-8"
            style={{
              background: "rgba(99,102,241,0.06)",
              border: "1px solid rgba(99,102,241,0.16)",
            }}
          >
            <p
              className="text-[10px] tracking-[3px] uppercase font-semibold mb-6"
              style={{ color: "#818CF8" }}
            >
              Work Card Protocol
            </p>
            <div className="grid sm:grid-cols-2 gap-8">
              {[
                {
                  title: "Dispatch Card (TL → Sub-agent)",
                  fields: [
                    "[PROJECT] 프로젝트명 · 경로 · 목표",
                    "[TASK] 태스크 본문 (최대 2KB)",
                    "[CONTEXT_PATHS] PM Brief / Dev Ctx",
                    "[TEAM_CHANNEL] 채널 읽기 + 완료 게시",
                    "[SCOPE] 담당 영역 · 허용/금지 경로",
                    "[OUTPUT] .state/dev/{role}.md 저장",
                  ],
                },
                {
                  title: "Team Channel (_channel.md)",
                  fields: [
                    "에이전트 간 직접 조율 게시판",
                    "Database: 'nullable 컬럼 주의' 게시",
                    "Backend: 채널 읽고 직접 반영",
                    "Tech Lead 거치지 않고 peer 조율",
                    "완료 상태 · 후속 주의사항 공유",
                    "마지막 write가 dev-summary로 집계",
                  ],
                },
              ].map(({ title, fields }) => (
                <div key={title}>
                  <p className="text-sm font-medium mb-4" style={{ color: "#EDE9DF" }}>
                    {title}
                  </p>
                  <div className="space-y-2">
                    {fields.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <div
                          className="w-1 h-1 rounded-full mt-2 shrink-0"
                          style={{ background: "rgba(129,140,248,0.5)" }}
                        />
                        <span className="text-xs leading-relaxed" style={{ color: "rgba(237,233,223,0.45)" }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInView>

        {/* ── Agent Review 7-Axis ── */}
        <FadeInView delay={0.1}>
          <p
            className="text-[10px] tracking-[4px] uppercase font-semibold mb-6"
            style={{ color: "#C4B5FD" }}
          >
            Agent Review System
          </p>
          <h2
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
            }}
          >
            <span style={{ color: "#EDE9DF" }}>7축 심사,</span>
            <br />
            <span style={{ color: "rgba(237,233,223,0.28)" }}>70점 만점.</span>
          </h2>
          <p className="text-base mb-14 max-w-xl" style={{ color: "rgba(237,233,223,0.4)", lineHeight: 1.7 }}>
            <code
              style={{
                fontFamily: "monospace",
                fontSize: "0.85em",
                color: "#C4B5FD",
                background: "rgba(139,92,246,0.12)",
                padding: "2px 8px",
                borderRadius: "4px",
              }}
            >
              /sj-agent-review
            </code>{" "}
            는 에이전트 구조를 7가지 설계 축으로 심사하고 축별 점수(0–10)와 PASS/WARN/FAIL 판정을 산출합니다.
          </p>
        </FadeInView>

        {/* 7 axes — manifest */}
        <FadeInView delay={0.15}>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            {AXES_7.map(({ n, name, desc }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-6 py-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span
                  className="text-xs font-mono shrink-0 w-6"
                  style={{ color: "rgba(196,181,253,0.4)" }}
                >
                  {n}
                </span>
                <span
                  className="text-sm font-semibold shrink-0 w-36"
                  style={{ color: "#EDE9DF" }}
                >
                  {name}
                </span>
                <span
                  className="hidden sm:block text-sm"
                  style={{ color: "rgba(237,233,223,0.35)" }}
                >
                  {desc}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Score + verdicts */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div
              className="flex items-baseline gap-2 px-6 py-4 rounded-xl"
              style={{
                background: "rgba(139,92,246,0.1)",
                border: "1px solid rgba(139,92,246,0.2)",
              }}
            >
              <span
                style={{ fontSize: "2.5rem", fontWeight: 800, color: "#A78BFA", lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                70
              </span>
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(196,181,253,0.5)" }}>
                만점
              </span>
            </div>
            {(["PASS", "WARN", "FAIL"] as const).map((v, i) => (
              <span
                key={v}
                className="text-xs px-4 py-2 rounded-full font-semibold tracking-wider"
                style={{
                  background: [
                    "rgba(52,211,153,0.1)",
                    "rgba(251,191,36,0.1)",
                    "rgba(248,113,113,0.1)",
                  ][i],
                  color: ["#34D399", "#FBBF24", "#F87171"][i],
                  border: `1px solid ${["rgba(52,211,153,0.2)", "rgba(251,191,36,0.2)", "rgba(248,113,113,0.2)"][i]}`,
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </FadeInView>

        {/* Auto-learn */}
        <FadeInView delay={0.2}>
          <div
            className="mt-16 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
            style={{
              background: "rgba(16,185,129,0.06)",
              border: "1px solid rgba(16,185,129,0.18)",
            }}
          >
            <div className="flex-1 min-w-0">
              <p
                className="text-[10px] tracking-[3px] uppercase font-semibold mb-2"
                style={{ color: "#34D399" }}
              >
                Auto-Learn
              </p>
              <p className="text-base font-medium mb-1.5" style={{ color: "#EDE9DF" }}>
                세션 종료 시 패턴을 자동 학습합니다.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(237,233,223,0.4)" }}>
                세션 종료 → asyncRewake 훅 → Claude 재기동 → 비자명한 패턴 추출 →{" "}
                <code
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.85em",
                    color: "#34D399",
                    background: "rgba(52,211,153,0.1)",
                    padding: "1px 6px",
                    borderRadius: "4px",
                  }}
                >
                  ~/.claude/skills/learned/
                </code>{" "}
                저장.{" "}
                <code
                  style={{
                    fontFamily: "monospace",
                    fontSize: "0.85em",
                    color: "#34D399",
                    background: "rgba(52,211,153,0.1)",
                    padding: "1px 6px",
                    borderRadius: "4px",
                  }}
                >
                  /evolve
                </code>
                로 스킬 승격.
              </p>
            </div>
            <div
              className="shrink-0 flex flex-col items-center px-6 py-4 rounded-xl"
              style={{
                background: "rgba(52,211,153,0.08)",
                border: "1px solid rgba(52,211,153,0.2)",
              }}
            >
              <div
                style={{ fontSize: "2rem", fontWeight: 800, color: "#34D399", lineHeight: 1, letterSpacing: "-0.04em" }}
              >
                ∞
              </div>
              <div
                className="text-[9px] tracking-widest uppercase mt-1"
                style={{ color: "rgba(52,211,153,0.5)" }}
              >
                자동 누적
              </div>
            </div>
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
