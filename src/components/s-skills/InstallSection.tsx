"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Copy, ArrowRight } from "lucide-react";

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
      className="flex-shrink-0 p-1.5 rounded-md transition-colors duration-200 text-gray-600 hover:text-[#DEDBC8]"
      aria-label="Copy command"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

const vp = { once: true, margin: "-40px" } as const;

export function InstallSection() {
  return (
    <section id="install" className="py-24 md:py-36 px-4" style={{ background: "#F8F5EE" }}>
      <div className="max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="text-[10px] tracking-[4px] uppercase mb-6 font-semibold"
          style={{ color: "#6366F1" }}
        >
          Get Started
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-4xl md:text-5xl font-medium leading-tight mb-4 tracking-tight"
          style={{ color: "#0A0A1A" }}
        >
          지금 바로 시작하세요.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm mb-12"
          style={{ color: "#6B7280" }}
        >
          설치 후 Claude Code에서{" "}
          <code className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "#E8E5DC", color: "#4338CA" }}>
            /sj-company
          </code>{" "}
          를 입력하세요.
        </motion.p>

        <div className="space-y-3 text-left mb-12">
          {installCommands.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55, delay: 0.22 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl p-4"
              style={{ background: "#FFFFFF", border: "1px solid #E8E4DC" }}
            >
              <p className="text-[10px] tracking-wider uppercase mb-2 font-medium" style={{ color: "#9CA3AF" }}>
                {item.label}
              </p>
              <div className="flex items-center gap-2">
                <code className="flex-1 text-xs sm:text-sm font-mono break-all" style={{ color: "#1F2937" }}>
                  {item.cmd}
                </code>
                <CopyButton text={item.cmd} />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://github.com/s0613/S-skills"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 hover:gap-3 transition-all duration-300 rounded-full pl-6 pr-1.5 py-1.5 text-sm font-semibold"
            style={{ background: "#0A0A1A", color: "#F8F5EE" }}
          >
            GitHub에서 보기
            <span className="rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
              style={{ background: "#6366F1" }}>
              <ArrowRight className="w-4 h-4 text-white" />
            </span>
          </a>
          <a href="/" className="text-sm transition-colors duration-200" style={{ color: "#9CA3AF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#0A0A1A")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}>
            ← 포트폴리오로 돌아가기
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-20 text-xs"
          style={{ color: "#D1CDC5" }}
        >
          © 2026 SongSeungJu · s-skills · MIT License
        </motion.p>
      </div>
    </section>
  );
}
