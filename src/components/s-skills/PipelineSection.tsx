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

function FadeInView({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
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
    <section className="py-24 md:py-36 px-4" style={{ background: "#0B0B14" }}>
      <div className="max-w-6xl mx-auto">

        {/* ── Tech Lead Section ── */}
        <FadeInView>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-[10px] tracking-[4px] uppercase text-blue-400 font-semibold">Tech Lead Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight mb-4" style={{ color: "#E8E5DC" }}>
            병렬 디스패치 + Work Card.
          </h2>
          <p className="text-base max-w-2xl mb-14" style={{ color: "rgba(220,216,200,0.55)" }}>
            Tech Lead는 태스크를 분석해 필요한 서브에이전트만 선택·병렬 실행한다. 에이전트 간 직접 조율은
            Team Channel(`.state/dev/_channel.md`)을 통해 이루어진다.
          </p>
        </FadeInView>

        {/* Sub-agents grid */}
        <FadeInView delay={0.1}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
            {SUBAGENTS.map(({ name, model, domain, color }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="rounded-xl px-4 py-3.5 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-mono font-medium truncate" style={{ color: "#E8E5DC" }}>{name}</div>
                  <div className="text-[10px] mt-0.5 truncate" style={{ color: "rgba(220,216,200,0.45)" }}>{domain}</div>
                </div>
                <span className="text-[9px] px-2 py-0.5 rounded-full font-mono shrink-0"
                  style={{ background: "rgba(255,255,255,0.07)", color: "rgba(220,216,200,0.5)" }}>
                  {model}
                </span>
              </motion.div>
            ))}
          </div>
        </FadeInView>

        {/* Work Card Protocol */}
        <FadeInView delay={0.2}>
          <div className="rounded-2xl p-6 mb-20" style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)" }}>
            <div className="text-xs font-semibold tracking-wider uppercase mb-4" style={{ color: "#818CF8" }}>Work Card Protocol</div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: "Dispatch Card (TL → Sub-agent)", fields: ["[PROJECT] 프로젝트명 · 경로 · 목표", "[TASK] 태스크 본문 (최대 2KB)", "[CONTEXT_PATHS] PM Brief / Dev Ctx", "[TEAM_CHANNEL] 채널 읽기 + 완료 게시", "[SCOPE] 담당 영역 · 허용/금지 경로", "[OUTPUT] .state/dev/{role}.md 저장"] },
                { title: "Team Channel (_channel.md)", fields: ["에이전트 간 직접 조율 게시판", "Database: 'nullable 컬럼 주의' 게시", "Backend: 채널 읽고 직접 반영", "Tech Lead 거치지 않고 peer 조율", "완료 상태 · 후속 주의사항 공유", "마지막 write가 dev-summary로 집계"] },
              ].map(({ title, fields }) => (
                <div key={title}>
                  <div className="text-sm font-medium mb-2.5" style={{ color: "#E8E5DC" }}>{title}</div>
                  <div className="space-y-1">
                    {fields.map((f) => (
                      <div key={f} className="flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: "#6366F1" }} />
                        <span className="text-xs" style={{ color: "rgba(220,216,200,0.6)" }}>{f}</span>
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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <span className="text-[10px] tracking-[4px] uppercase text-violet-400 font-semibold">Agent Review System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight mb-4" style={{ color: "#E8E5DC" }}>
            7축 심사, 70점 만점.
          </h2>
          <p className="text-base max-w-2xl mb-12" style={{ color: "rgba(220,216,200,0.55)" }}>
            <code className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(139,92,246,0.2)", color: "#C4B5FD" }}>/sj-agent-review</code>는
            에이전트 구조를 7가지 설계 축으로 심사하고 축별 점수(0–10)와 PASS/WARN/FAIL 판정을 산출합니다.
          </p>
        </FadeInView>

        <FadeInView delay={0.15}>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {AXES_7.map(({ n, name, desc }, i) => (
              <motion.div
                key={n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="rounded-xl p-4"
                style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.18)" }}
              >
                <div className="text-[10px] font-mono mb-2" style={{ color: "rgba(196,181,253,0.6)" }}>{n}</div>
                <div className="text-sm font-semibold mb-1" style={{ color: "#E8E5DC" }}>{name}</div>
                <div className="text-[11px] leading-relaxed" style={{ color: "rgba(220,216,200,0.5)" }}>{desc}</div>
              </motion.div>
            ))}
            {/* Score card */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.42 }}
              className="rounded-xl p-4 flex flex-col items-center justify-center"
              style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.35)" }}
            >
              <div className="text-4xl font-bold mb-1" style={{ color: "#A78BFA" }}>70</div>
              <div className="text-[10px] tracking-wider uppercase" style={{ color: "rgba(196,181,253,0.7)" }}>만점</div>
              <div className="mt-3 flex gap-1.5">
                {["PASS", "WARN", "FAIL"].map((v, i) => (
                  <span key={v} className="text-[9px] px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: ["rgba(52,211,153,0.15)", "rgba(251,191,36,0.15)", "rgba(248,113,113,0.15)"][i],
                      color: ["#34D399", "#FBBF24", "#F87171"][i],
                    }}>
                    {v}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </FadeInView>

        {/* Auto-learn */}
        <FadeInView delay={0.2}>
          <div className="mt-16 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6"
            style={{ background: "rgba(16,185,129,0.07)", border: "1px solid rgba(16,185,129,0.2)" }}>
            <div className="flex-1">
              <div className="text-xs font-semibold tracking-wider uppercase mb-2" style={{ color: "#34D399" }}>Auto-Learn</div>
              <div className="text-base font-medium mb-1" style={{ color: "#E8E5DC" }}>세션 종료 시 패턴을 자동 학습합니다.</div>
              <div className="text-sm" style={{ color: "rgba(220,216,200,0.55)" }}>
                세션 종료 → asyncRewake 훅 → Claude 재기동 → 비자명한 패턴 추출 →
                <code className="text-xs mx-1 px-1.5 py-0.5 rounded font-mono" style={{ background: "rgba(52,211,153,0.15)", color: "#34D399" }}>~/.claude/skills/learned/</code>
                저장. <code className="text-xs mx-1 px-1.5 py-0.5 rounded font-mono" style={{ background: "rgba(52,211,153,0.15)", color: "#34D399" }}>/evolve</code>로 스킬 승격.
              </div>
            </div>
            <div className="shrink-0 flex gap-2">
              <div className="rounded-xl px-4 py-2 text-center" style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)" }}>
                <div className="text-xl font-bold" style={{ color: "#34D399" }}>∞</div>
                <div className="text-[9px] tracking-wider uppercase" style={{ color: "rgba(52,211,153,0.7)" }}>자동 누적</div>
              </div>
            </div>
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
