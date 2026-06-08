"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy, ArrowUpRight } from "lucide-react";

const installCommands = [
  {
    label: "플러그인 설치 (권장)",
    cmd: "claude plugin install s0613/S-skills",
  },
  {
    label: "수동 심링크",
    cmd: "git clone https://github.com/s0613/S-skills.git ~/S-skills && ln -sf ~/S-skills/skills/harness ~/.claude/skills/s-skills",
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex-shrink-0 p-2 rounded-md transition-colors duration-200"
      style={{ color: copied ? "#059669" : "rgba(15,15,26,0.3)" }}
      aria-label="Copy command"
    >
      {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}

const vp = { once: true, margin: "-40px" } as const;

export function InstallSection() {
  return (
    <section id="install" className="py-28 md:py-40 px-6 md:px-10" style={{ background: "#F5F3EE" }}>
      <div className="max-w-5xl mx-auto">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[4px] uppercase font-semibold mb-10"
          style={{ color: "#6366F1" }}
        >
          Get Started
        </motion.p>

        {/* Big headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
            marginBottom: "1.75rem",
          }}
        >
          <span style={{ color: "#0F0F1A" }}>지금 바로</span>
          <br />
          <span style={{ color: "rgba(15,15,26,0.2)" }}>시작하세요.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.14 }}
          className="text-sm mb-16 max-w-sm"
          style={{ color: "rgba(15,15,26,0.45)", lineHeight: 1.7 }}
        >
          설치 후 Claude Code에서{" "}
          <code
            style={{
              color: "#4338CA",
              fontFamily: "monospace",
              background: "#EEF2FF",
              padding: "2px 6px",
              borderRadius: "4px",
            }}
          >
            /sj-company
          </code>
          를 입력하세요.
        </motion.p>

        {/* Commands */}
        <div className="space-y-3 mb-16">
          {installCommands.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.5, delay: 0.18 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(15,15,26,0.1)",
              }}
            >
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ borderBottom: "1px solid rgba(15,15,26,0.06)" }}
              >
                <span
                  className="text-[9px] tracking-widest uppercase font-medium"
                  style={{ color: "rgba(15,15,26,0.3)" }}
                >
                  {item.label}
                </span>
                <CopyButton text={item.cmd} />
              </div>
              <div className="px-4 py-4">
                <code
                  className="text-xs sm:text-sm font-mono break-all"
                  style={{ color: "#4338CA", lineHeight: 1.6 }}
                >
                  {item.cmd}
                </code>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
        >
          <a
            href="https://github.com/s0613/S-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full pl-6 pr-2 py-2 text-sm font-semibold transition-all duration-300"
            style={{ background: "#0F0F1A", color: "#FAFAF7" }}
          >
            GitHub에서 보기
            <span
              className="rounded-full w-8 h-8 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ background: "#6366F1" }}
            >
              <ArrowUpRight className="w-4 h-4 text-white" />
            </span>
          </a>
          <a
            href="/"
            className="text-sm transition-colors duration-200"
            style={{ color: "rgba(15,15,26,0.3)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0F0F1A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(15,15,26,0.3)")}
          >
            ← 포트폴리오로 돌아가기
          </a>
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-24 text-xs"
          style={{ color: "rgba(15,15,26,0.15)" }}
        >
          © 2026 SongSeungJu · s-skills · MIT License
        </motion.p>

      </div>
    </section>
  );
}
