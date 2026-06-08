"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { CSSProperties, RefObject } from "react";
import type { MotionValue } from "framer-motion";

interface AnimatedLetterProps {
  char: string;
  progress: MotionValue<number>;
  index: number;
  total: number;
}

function AnimatedLetter({ char, progress, index, total }: AnimatedLetterProps) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [charProgress - 0.1, charProgress + 0.05],
    [0.15, 1]
  );

  if (char === " ") return <span>&nbsp;</span>;

  return (
    <motion.span style={{ opacity }} className="inline-block">
      {char}
    </motion.span>
  );
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
  targetRef: RefObject<HTMLElement | null>;
}

export function AnimatedText({ text, className = "", style, targetRef }: AnimatedTextProps) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p className={className} style={style}>
      {chars.map((char, i) => (
        <AnimatedLetter
          key={i}
          char={char}
          progress={scrollYProgress}
          index={i}
          total={chars.length}
        />
      ))}
    </p>
  );
}
