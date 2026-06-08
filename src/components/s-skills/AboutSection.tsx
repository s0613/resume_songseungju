"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current || !ref.current) return;
    started.current = true;
    const startTime = performance.now();
    const duration = 1400;
    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      if (ref.current) ref.current.textContent = String(Math.round(eased * to));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [inView, to]);

  return <span ref={ref}>0</span>;
}

const vp = { once: true, margin: "-40px" } as const;

const STATS = [
  { val: 19, label: "전문 스킬", sub: "개발·자동화·마케팅·에이전트·문서·테스트" },
  { val: 6, label: "카테고리", sub: "단 하나의 진입점으로 전부 접근" },
  { val: 7, label: "심사 축", sub: "에이전트 구조 자동 검증" },
  { val: 1, label: "명령어", sub: "/sj-company" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#FFFFFF" }}>
      <div className="max-w-5xl mx-auto">

        <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-end mb-24">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="text-[10px] tracking-[4px] uppercase font-semibold mb-6"
              style={{ color: "#4F46E5" }}
            >
              What is S-Skills
            </p>
            <h2
              style={{
                fontSize: "clamp(2.4rem, 5vw, 4.8rem)",
                fontWeight: 800,
                lineHeight: 1.0,
                letterSpacing: "-0.04em",
                color: "#0A0A0A",
              }}
            >
              태스크를 말하면,<br />
              <span style={{ color: "rgba(10,10,10,0.22)" }}>알아서 간다.</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-base"
            style={{ color: "rgba(10,10,10,0.45)", lineHeight: 1.8 }}
          >
            S-Skills는 Claude Code용 역할 기반 오케스트레이터다.
            개발부터 자동화, 마케팅, 에이전트 설계까지 —
            <code
              className="mx-1 px-1.5 py-0.5 rounded text-sm font-mono"
              style={{ color: "#4F46E5", background: "rgba(79,70,229,0.07)" }}
            >
              /sj-company
            </code>
            하나로 19개 전문 스킬이 라우팅된다.
          </motion.p>
        </div>

        {/* Stats — four large numbers in a row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ borderTop: "1px solid rgba(10,10,10,0.07)" }}
        >
          {STATS.map(({ val, label, sub }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="pt-10 pb-10 pr-8"
              style={{ borderRight: i < 3 ? "1px solid rgba(10,10,10,0.07)" : "none" }}
            >
              <div
                style={{
                  fontSize: "clamp(3rem, 6vw, 5rem)",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  lineHeight: 1,
                  color: "#0A0A0A",
                }}
              >
                <CountUp to={val} />
              </div>
              <div
                className="text-sm font-semibold mt-3"
                style={{ color: "#0A0A0A" }}
              >
                {label}
              </div>
              <div
                className="text-xs mt-1 leading-snug"
                style={{ color: "rgba(10,10,10,0.35)" }}
              >
                {sub}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
