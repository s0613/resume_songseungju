"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "개발 파이프라인",
    color: "#4F46E5",
    bg: "#EEF2FF",
    skills: [
      { trigger: "/sj-company", name: "sj-company", desc: "전체 스킬 라우터 · 태스크 크기 자동 판정" },
      { trigger: "/pm", name: "sj-pm", desc: "요구사항 · 리스크 · 우선순위 분석" },
      { trigger: "/design", name: "sj-design", desc: "UI/UX 시각 리뷰 · AI 티 제거 체크" },
      { trigger: "/tech-lead", name: "sj-tech-lead", desc: "서브에이전트 병렬 디스패치 + Work Card 집계" },
      { trigger: "/qa", name: "sj-qa", desc: "PASS / FAIL / CONDITIONAL 판정" },
      { trigger: "/secretary", name: "sj-secretary", desc: "전 프로젝트 아침 브리핑 · KPI 요약" },
    ],
  },
  {
    name: "서브에이전트 팀",
    color: "#1D4ED8",
    bg: "#DBEAFE",
    skills: [
      { trigger: "dispatch", name: "sj-dev-frontend", desc: "UI · 컴포넌트 · 접근성 · 반응형" },
      { trigger: "dispatch", name: "sj-dev-backend", desc: "API · 서버 · 도메인 로직" },
      { trigger: "dispatch", name: "sj-dev-database", desc: "스키마 · 마이그레이션 · 쿼리 최적화" },
      { trigger: "dispatch", name: "sj-dev-security", desc: "보안 구현 + 전체 cross-cutting 리뷰" },
      { trigger: "dispatch", name: "sj-dev-devops", desc: "CI/CD · 배포 · 인프라 구성" },
      { trigger: "dispatch", name: "sj-dev-data", desc: "데이터 파이프라인 · ML · ETL" },
    ],
  },
  {
    name: "자동화",
    color: "#065F46",
    bg: "#D1FAE5",
    skills: [
      { trigger: "/auto", name: "sj-automation", desc: "macOS 시스템 자동화 · launchd · AppleScript" },
      { trigger: "/ui-auto", name: "sj-ui-auto", desc: "화면 UI 조작 · Playwright · PyAutoGUI · cliclick" },
    ],
  },
  {
    name: "마케팅 · SEO",
    color: "#92400E",
    bg: "#FEF3C7",
    skills: [
      { trigger: "/sns", name: "sj-marketing", desc: "SNS · 블로그 캠페인 · 카피 · 브랜드 검수" },
      { trigger: "/seo", name: "sj-seo", desc: "Google Search Console + Naver 색인 자동화" },
    ],
  },
  {
    name: "에이전트 설계",
    color: "#5B21B6",
    bg: "#EDE9FE",
    skills: [
      { trigger: "/sj-agent-dev", name: "sj-agent-dev", desc: "10축 아키텍처 설계 · 런타임 루프 · 가드레일" },
      { trigger: "/sj-agent-review", name: "sj-agent-review", desc: "7축 심사 · 0-70점 · PASS/WARN/FAIL" },
    ],
  },
  {
    name: "문서 · 테스트",
    color: "#0F766E",
    bg: "#CCFBF1",
    skills: [
      { trigger: "/docs-organize", name: "docs-organize", desc: "코드 분석 → 표준 문서 → 건강 점수 0–100" },
      { trigger: "/sj-dev-si", name: "sj-dev-si", desc: "SI 문서 6종 · 제안서 · WBS · 결과보고서" },
      { trigger: "/test-scenario", name: "test-scenario", desc: "Chrome 확장 기반 시나리오 반복 하네스" },
      { trigger: "/pw-loop", name: "pw-loop", desc: "Playwright 기능별 심화 테스트 루프" },
      { trigger: "/obsidian", name: "obsidian-writer", desc: "Obsidian 볼트 구조화 문서 자동 작성" },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="features" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
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
            style={{ color: "#6366F1" }}
          >
            전체 스킬 목록
          </p>
          <h2
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
            }}
          >
            <span style={{ color: "#0F0F1A" }}>6개 카테고리.</span>
            <br />
            <span style={{ color: "rgba(15,15,26,0.2)" }}>19개 스킬.</span>
          </h2>
        </motion.div>

        {/* Skill manifest */}
        <div>
          {CATEGORIES.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: ci * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="py-8"
              style={{ borderTop: "1px solid rgba(15,15,26,0.07)" }}
            >
              {/* Category header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span
                    className="text-[9px] font-bold tracking-[3px] uppercase px-3 py-1 rounded-full"
                    style={{ color: cat.color, background: cat.bg }}
                  >
                    {cat.name}
                  </span>
                </div>
                <span
                  className="text-xs font-mono tabular-nums"
                  style={{ color: "rgba(15,15,26,0.2)" }}
                >
                  {String(cat.skills.length).padStart(2, "0")}
                </span>
              </div>

              {/* Skills — manifest rows */}
              <div className="space-y-3.5">
                {cat.skills.map(({ trigger, name, desc }) => (
                  <div key={name} className="flex items-baseline gap-5">
                    <code
                      className="shrink-0 text-xs font-mono w-28 truncate px-1.5 py-0.5 rounded"
                      style={{ color: "#4338CA", background: "#EEF2FF" }}
                    >
                      {trigger}
                    </code>
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 min-w-0">
                      <span
                        className="text-sm font-semibold shrink-0"
                        style={{ color: "#0F0F1A" }}
                      >
                        {name}
                      </span>
                      <span
                        className="text-sm truncate"
                        style={{ color: "rgba(15,15,26,0.35)" }}
                      >
                        — {desc}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(15,15,26,0.07)" }} />
        </div>

      </div>
    </section>
  );
}
