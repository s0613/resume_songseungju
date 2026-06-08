"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";


const CATEGORIES = [
  {
    id: "pipeline",
    name: "개발 파이프라인",
    color: "#6366F1",
    bg: "#EEF2FF",
    border: "#C7D2FE",
    tagBg: "#E0E7FF",
    skills: [
      { name: "sj-company", trigger: "/sj-company", desc: "전체 스킬 라우터 · 태스크 크기 자동 판정" },
      { name: "sj-pm", trigger: "/pm", desc: "요구사항 · 리스크 · 우선순위 분석" },
      { name: "sj-design", trigger: "/design", desc: "UI/UX 시각 리뷰 · AI 티 제거 체크" },
      { name: "sj-tech-lead", trigger: "/tech-lead", desc: "서브에이전트 병렬 디스패치 + Work Card 집계" },
      { name: "sj-qa", trigger: "/qa", desc: "PASS / FAIL / CONDITIONAL 판정" },
      { name: "sj-secretary", trigger: "/secretary", desc: "전 프로젝트 아침 브리핑 · KPI 요약" },
    ],
  },
  {
    id: "subagents",
    name: "서브에이전트 팀",
    color: "#3B82F6",
    bg: "#EFF6FF",
    border: "#BFDBFE",
    tagBg: "#DBEAFE",
    skills: [
      { name: "sj-dev-frontend", trigger: "dispatch", desc: "UI · 컴포넌트 · 접근성 · 반응형" },
      { name: "sj-dev-backend", trigger: "dispatch", desc: "API · 서버 · 도메인 로직" },
      { name: "sj-dev-database", trigger: "dispatch", desc: "스키마 · 마이그레이션 · 쿼리 최적화" },
      { name: "sj-dev-security", trigger: "dispatch", desc: "보안 구현 + 전체 cross-cutting 리뷰" },
      { name: "sj-dev-devops", trigger: "dispatch", desc: "CI/CD · 배포 · 인프라 구성" },
      { name: "sj-dev-data", trigger: "dispatch", desc: "데이터 파이프라인 · ML · ETL" },
    ],
  },
  {
    id: "automation",
    name: "자동화",
    color: "#10B981",
    bg: "#ECFDF5",
    border: "#A7F3D0",
    tagBg: "#D1FAE5",
    skills: [
      { name: "sj-automation", trigger: "/auto", desc: "macOS 시스템 자동화 · launchd · AppleScript" },
      { name: "sj-ui-auto", trigger: "/ui-auto", desc: "화면 UI 조작 · Playwright · PyAutoGUI · cliclick" },
    ],
  },
  {
    id: "marketing",
    name: "마케팅 · SEO",
    color: "#F59E0B",
    bg: "#FFFBEB",
    border: "#FDE68A",
    tagBg: "#FEF3C7",
    skills: [
      { name: "sj-marketing", trigger: "/sns", desc: "SNS · 블로그 캠페인 · 카피 · 브랜드 검수" },
      { name: "sj-seo", trigger: "/seo", desc: "Google Search Console + Naver 색인 자동화" },
    ],
  },
  {
    id: "agent-dev",
    name: "에이전트 설계",
    color: "#8B5CF6",
    bg: "#F5F3FF",
    border: "#DDD6FE",
    tagBg: "#EDE9FE",
    skills: [
      { name: "sj-agent-dev", trigger: "/sj-agent-dev", desc: "10축 아키텍처 설계 · 런타임 루프 · 가드레일" },
      { name: "sj-agent-review", trigger: "/sj-agent-review", desc: "7축 심사 · 0-70점 · PASS/WARN/FAIL" },
    ],
  },
  {
    id: "docs",
    name: "문서 · 테스트",
    color: "#14B8A6",
    bg: "#F0FDFA",
    border: "#99F6E4",
    tagBg: "#CCFBF1",
    skills: [
      { name: "docs-organize", trigger: "/docs-organize", desc: "코드 분석 → 표준 문서 → 건강 점수 0–100" },
      { name: "sj-dev-si", trigger: "/sj-dev-si", desc: "SI 문서 6종 · 제안서 · WBS · 결과보고서" },
      { name: "test-scenario", trigger: "/test-scenario", desc: "Chrome 확장 기반 시나리오 반복 하네스" },
      { name: "pw-loop", trigger: "/pw-loop", desc: "Playwright 기능별 심화 테스트 루프" },
      { name: "obsidian-writer", trigger: "/obsidian", desc: "Obsidian 볼트 구조화 문서 자동 작성" },
    ],
  },
];

function CategoryCard({ cat, delay }: { cat: typeof CATEGORIES[0]; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl overflow-hidden"
      style={{ background: "#FFFFFF", border: "1px solid #E8E4DC" }}
    >
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-2.5" style={{ background: cat.bg, borderBottom: `1px solid ${cat.border}` }}>
        <div className="w-2 h-2 rounded-full" style={{ background: cat.color }} />
        <span className="text-xs font-bold tracking-wider uppercase" style={{ color: cat.color }}>{cat.name}</span>
        <span className="ml-auto text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: cat.tagBg, color: cat.color }}>
          {cat.skills.length}
        </span>
      </div>

      {/* Skills list */}
      <div className="divide-y" style={{ borderColor: "#F5F2EC" }}>
        {cat.skills.map(({ name, trigger, desc }) => (
          <div key={name} className="px-5 py-3 flex items-start gap-3">
            <code className="text-[10px] font-mono px-2 py-0.5 rounded shrink-0 mt-0.5" style={{ background: cat.tagBg, color: cat.color }}>
              {trigger}
            </code>
            <div>
              <div className="text-sm font-medium mb-0.5" style={{ color: "#1A1A2E" }}>{name}</div>
              <div className="text-xs leading-relaxed" style={{ color: "#78716C" }}>{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: "-60px" });

  return (
    <section id="features" className="py-24 md:py-32 px-4" style={{ background: "#FFFFFF" }}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={titleRef}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            <span className="text-[10px] tracking-[4px] uppercase font-semibold text-violet-500">전체 스킬 목록</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight tracking-tight mb-4"
            style={{ color: "#0A0A1A" }}
          >
            6개 영역, 19개 스킬.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-base text-gray-500 mb-14 max-w-xl"
          >
            개발 파이프라인부터 마케팅, SEO, PC 자동화, 에이전트 설계까지 — 하나의 진입점에서 모든 스킬이 연결됩니다.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} delay={0.1 + i * 0.08} />
          ))}
        </div>

      </div>
    </section>
  );
}
