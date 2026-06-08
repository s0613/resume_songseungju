"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface Segment {
  text: string;
  className: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  containerClassName?: string;
  delay?: number;
}

export function WordsPullUpMultiStyle({
  segments,
  containerClassName = "",
  delay = 0,
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const allWords = segments.flatMap((seg) =>
    seg.text
      .split(" ")
      .filter((w) => w.length > 0)
      .map((word) => ({ word, className: seg.className }))
  );

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${containerClassName}`}
    >
      {allWords.map(({ word, className }, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: "105%" }}
            animate={isInView ? { y: 0 } : { y: "105%" }}
            transition={{
              duration: 0.75,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
