"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { CSSProperties } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  showAsterisk?: boolean;
  delay?: number;
}

export function WordsPullUp({
  text,
  className = "",
  style,
  showAsterisk = false,
  delay = 0,
}: WordsPullUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={isInView ? { y: 0 } : { y: "105%" }}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {showAsterisk && i === words.length - 1 && (
              <sup className="relative top-[0.65em] -right-[0.3em] text-[0.31em]">*</sup>
            )}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
