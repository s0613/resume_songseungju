"use client";

import { motion } from "framer-motion";

const vp = { once: true, margin: "-30px" } as const;

/*
  모든 6개 카테고리를 동등하게 보여주는 에디토리얼 목록.
  색상: 검정/회색 + 인디고(라벨 전용) 단 하나만 사용.
*/

const CAPABILITIES = [
  {
    num: "01",
    category: "개발 파이프라인",
    desc: "PM 분석부터 QA 검증까지 자동으로. 태스크 크기를 감지해 Tiny·Small·Medium·Large·xLarge 최적 워크플로우를 실행한다.",
    commands: [
      "/sj-company 로그인 기능 만들어줘",
      "/sj-company 결제 API 구현해줘",
    ],
    agents: "PM · TechLead · Frontend · Backend · Database · Security · DevOps · QA",
  },
  {
    num: "02",
    category: "macOS 자동화",
    desc: "launchd 스케줄러, AppleScript, shell 스크립트를 조합해 반복 작업을 완전히 자동화한다. 매일, 매주 실행되는 루틴을 한 줄로 설정한다.",
    commands: [
      "/sj-company 매일 파일 정리해줘",
      "/sj-company 앱 실행 자동화해줘",
    ],
    agents: "sj-automation · launchd · AppleScript · shell",
  },
  {
    num: "03",
    category: "UI 자동화",
    desc: "화면을 직접 제어한다. Playwright · PyAutoGUI · cliclick으로 웹 브라우저부터 데스크탑 앱까지 모든 UI를 자동화할 수 있다.",
    commands: [
      "/sj-company 로그인 자동화해줘",
      "/sj-company 버튼 클릭 스크립트 만들어줘",
    ],
    agents: "sj-ui-auto · Playwright · PyAutoGUI · cliclick",
  },
  {
    num: "04",
    category: "마케팅 · SEO",
    desc: "SNS 카피, 블로그 포스팅, Google / Naver 검색 색인까지. 마케팅 파이프라인 전체를 에이전트가 처리한다.",
    commands: [
      "/sj-company 인스타 포스팅 써줘",
      "/sj-company 구글 색인 등록해줘",
    ],
    agents: "sj-marketing · sj-seo · Search Console · SNS",
  },
  {
    num: "05",
    category: "에이전트 설계",
    desc: "10축 아키텍처로 에이전트를 설계하고 7축 심사(0–70점)로 품질을 보증한다. PASS / WARN / FAIL 판정으로 배포 전 구조를 검증한다.",
    commands: [
      "/sj-agent-dev 에이전트 설계해줘",
      "/sj-agent-review 구조 점검해줘",
    ],
    agents: "sj-agent-dev · sj-agent-review · 7-axis · PASS/WARN/FAIL",
  },
  {
    num: "06",
    category: "문서 · 테스트",
    desc: "코드베이스를 분석해 표준 문서를 자동 생성하고 건강 점수(0–100)를 산출한다. Playwright 루프로 기능별 심화 테스트를 반복 실행한다.",
    commands: [
      "/docs-organize",
      "/pw-loop 기능별 테스트 반복해줘",
    ],
    agents: "docs-organize · pw-loop · test-scenario · obsidian-writer",
  },
];

export function SkillsSection() {
  return (
    <section id="features" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#F9F8F5" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <p className="text-[10px] tracking-[4px] uppercase font-semibold mb-5" style={{ color: "#4F46E5" }}>
            전체 기능
          </p>
          <h2
            style={{
              fontSize: "clamp(2.4rem, 5vw, 4.8rem)",
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: "-0.04em",
              color: "#0A0A0A",
            }}
          >
            개발만이 아니다.<br />
            <span style={{ color: "rgba(10,10,10,0.22)" }}>6개 영역, 19개 스킬.</span>
          </h2>
        </motion.div>

        {/* Editorial capability list */}
        <div>
          {CAPABILITIES.map(({ num, category, desc, commands, agents }, i) => (
            <motion.div
              key={num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="grid md:grid-cols-[56px_1fr_1fr] gap-6 md:gap-10 py-10 md:py-12"
              style={{ borderTop: "1px solid rgba(10,10,10,0.07)" }}
            >
              {/* Number */}
              <span
                className="text-sm font-mono tabular-nums"
                style={{ color: "rgba(10,10,10,0.2)", paddingTop: "3px" }}
              >
                {num}
              </span>

              {/* Category + description */}
              <div>
                <h3
                  className="font-bold mb-3"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", color: "#0A0A0A", letterSpacing: "-0.02em" }}
                >
                  {category}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-4"
                  style={{ color: "rgba(10,10,10,0.5)", lineHeight: 1.75 }}
                >
                  {desc}
                </p>
                <p
                  className="text-[10px] font-mono"
                  style={{ color: "rgba(10,10,10,0.28)" }}
                >
                  {agents}
                </p>
              </div>

              {/* Example commands */}
              <div className="space-y-2">
                {commands.map((cmd) => (
                  <div
                    key={cmd}
                    className="flex items-center gap-2 rounded-lg px-4 py-3"
                    style={{ background: "#FFFFFF", border: "1px solid rgba(10,10,10,0.07)" }}
                  >
                    <span style={{ color: "#4F46E5", fontSize: "10px", fontFamily: "monospace" }}>❯</span>
                    <code
                      className="text-xs font-mono"
                      style={{ color: "#1D4ED8" }}
                    >
                      {cmd}
                    </code>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid rgba(10,10,10,0.07)" }} />
        </div>

      </div>
    </section>
  );
}
