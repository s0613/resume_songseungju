"use client";

import { motion } from "framer-motion";

const SUBAGENTS = [
  { name: "sj-dev-frontend", domain: "UI · 컴포넌트 · a11y · 반응형" },
  { name: "sj-dev-backend", domain: "API · 서버 · 도메인 로직" },
  { name: "sj-dev-database", domain: "스키마 · 마이그레이션 · 쿼리" },
  { name: "sj-dev-devops", domain: "CI/CD · 배포 · 인프라" },
  { name: "sj-dev-security", domain: "보안 구현 + cross-cutting 리뷰" },
  { name: "sj-dev-data", domain: "데이터 파이프라인 · ML" },
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

const vp = { once: true, margin: "-40px" } as const;

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function PipelineSection() {
  return (
    <section className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Tech Lead Architecture ── */}
        <FadeIn>
          <p className="text-[10px] tracking-[4px] uppercase font-semibold mb-6" style={{ color: "#4F46E5" }}>
            Tech Lead Architecture
          </p>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.8rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
              color: "#0A0A0A",
            }}
          >
            병렬 디스패치<br />
            <span style={{ color: "rgba(10,10,10,0.22)" }}>+ Work Card.</span>
          </h2>
          <p className="text-base mb-16 max-w-xl" style={{ color: "rgba(10,10,10,0.45)", lineHeight: 1.7 }}>
            Tech Lead는 태스크를 분석해 필요한 서브에이전트만 선택·병렬 실행한다.
            에이전트 간 직접 조율은{" "}
            <code style={{ color: "#4F46E5", fontFamily: "monospace", fontSize: "0.85em", background: "rgba(79,70,229,0.07)", padding: "1px 6px", borderRadius: "4px" }}>
              .state/dev/_channel.md
            </code>
            를 통해 이루어진다.
          </p>
        </FadeIn>

        {/* Sub-agents manifest */}
        <FadeIn delay={0.1}>
          <div style={{ borderTop: "1px solid rgba(10,10,10,0.07)" }}>
            {SUBAGENTS.map(({ name, domain }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-5 py-4"
                style={{ borderBottom: "1px solid rgba(10,10,10,0.05)" }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "#4F46E5" }}
                />
                <code className="text-sm font-mono font-medium flex-1" style={{ color: "#0A0A0A" }}>
                  {name}
                </code>
                <span className="hidden sm:block text-sm flex-1" style={{ color: "rgba(10,10,10,0.35)" }}>
                  {domain}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Work Card Protocol */}
        <FadeIn delay={0.15}>
          <div
            className="mt-10 mb-28 rounded-2xl p-6 md:p-8"
            style={{
              background: "rgba(79,70,229,0.04)",
              border: "1px solid rgba(79,70,229,0.1)",
            }}
          >
            <p className="text-[10px] tracking-[3px] uppercase font-semibold mb-6" style={{ color: "#4F46E5" }}>
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
                  <p className="text-sm font-medium mb-4" style={{ color: "#0A0A0A" }}>{title}</p>
                  <div className="space-y-2">
                    {fields.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <div
                          className="w-1 h-1 rounded-full mt-2 shrink-0"
                          style={{ background: "rgba(79,70,229,0.4)" }}
                        />
                        <span className="text-xs leading-relaxed" style={{ color: "rgba(10,10,10,0.45)" }}>
                          {f}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* ── Agent Review 7-Axis ── */}
        <FadeIn delay={0.1}>
          <p className="text-[10px] tracking-[4px] uppercase font-semibold mb-6" style={{ color: "#4F46E5" }}>
            Agent Review System
          </p>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.8rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              marginBottom: "1.5rem",
              color: "#0A0A0A",
            }}
          >
            7축 심사,<br />
            <span style={{ color: "rgba(10,10,10,0.22)" }}>70점 만점.</span>
          </h2>
          <p className="text-base mb-14 max-w-xl" style={{ color: "rgba(10,10,10,0.45)", lineHeight: 1.7 }}>
            <code style={{ fontFamily: "monospace", fontSize: "0.85em", color: "#4F46E5", background: "rgba(79,70,229,0.07)", padding: "2px 8px", borderRadius: "4px" }}>
              /sj-agent-review
            </code>{" "}
            는 에이전트 구조를 7가지 설계 축으로 심사하고 축별 점수(0–10)와 PASS/WARN/FAIL 판정을 산출합니다.
          </p>
        </FadeIn>

        {/* 7 axes manifest */}
        <FadeIn delay={0.15}>
          <div style={{ borderTop: "1px solid rgba(10,10,10,0.07)" }}>
            {AXES_7.map(({ n, name, desc }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={vp}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="flex items-center gap-6 py-4"
                style={{ borderBottom: "1px solid rgba(10,10,10,0.05)" }}
              >
                <span className="text-xs font-mono shrink-0 w-6 tabular-nums" style={{ color: "rgba(10,10,10,0.25)" }}>
                  {n}
                </span>
                <span className="text-sm font-semibold shrink-0 w-36" style={{ color: "#0A0A0A" }}>
                  {name}
                </span>
                <span className="hidden sm:block text-sm" style={{ color: "rgba(10,10,10,0.4)" }}>
                  {desc}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Score + verdicts */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div
              className="flex items-baseline gap-2 px-6 py-4 rounded-xl"
              style={{ background: "rgba(79,70,229,0.06)", border: "1px solid rgba(79,70,229,0.12)" }}
            >
              <span style={{ fontSize: "2.5rem", fontWeight: 800, color: "#4F46E5", lineHeight: 1, letterSpacing: "-0.04em" }}>
                70
              </span>
              <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(79,70,229,0.5)" }}>
                만점
              </span>
            </div>
            {(["PASS", "WARN", "FAIL"] as const).map((v) => (
              <span
                key={v}
                className="text-xs px-4 py-2 rounded-full font-semibold tracking-wider"
                style={{
                  background: "rgba(10,10,10,0.04)",
                  color: "rgba(10,10,10,0.5)",
                  border: "1px solid rgba(10,10,10,0.1)",
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </FadeIn>

        {/* Auto-learn */}
        <FadeIn delay={0.2}>
          <div
            className="mt-16 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
            style={{ background: "rgba(10,10,10,0.03)", border: "1px solid rgba(10,10,10,0.07)" }}
          >
            <div className="flex-1 min-w-0">
              <p className="text-[10px] tracking-[3px] uppercase font-semibold mb-2" style={{ color: "#4F46E5" }}>
                Auto-Learn
              </p>
              <p className="text-base font-medium mb-1.5" style={{ color: "#0A0A0A" }}>
                세션 종료 시 패턴을 자동 학습합니다.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(10,10,10,0.4)" }}>
                세션 종료 → asyncRewake 훅 → Claude 재기동 → 비자명한 패턴 추출 →{" "}
                <code style={{ fontFamily: "monospace", fontSize: "0.85em", color: "#4F46E5", background: "rgba(79,70,229,0.07)", padding: "1px 6px", borderRadius: "4px" }}>
                  ~/.claude/skills/learned/
                </code>{" "}
                저장.{" "}
                <code style={{ fontFamily: "monospace", fontSize: "0.85em", color: "#4F46E5", background: "rgba(79,70,229,0.07)", padding: "1px 6px", borderRadius: "4px" }}>
                  /evolve
                </code>
                로 스킬 승격.
              </p>
            </div>
            <div
              className="shrink-0 flex flex-col items-center px-6 py-4 rounded-xl"
              style={{ background: "rgba(79,70,229,0.06)", border: "1px solid rgba(79,70,229,0.12)" }}
            >
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "#4F46E5", lineHeight: 1, letterSpacing: "-0.04em" }}>
                ∞
              </div>
              <div className="text-[9px] tracking-widest uppercase mt-1" style={{ color: "rgba(79,70,229,0.5)" }}>
                자동 누적
              </div>
            </div>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
