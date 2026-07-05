"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ScrollScaleProps {
  children: ReactNode;
  className?: string;
}

/**
 * Bölüm görünüme girerken hafifçe büyüyüp belirir (0.96 → 1),
 * çıkarken usulca küçülüp soluklaşır. Yalnızca transform/opacity — 60fps.
 */
export function ScrollScale({ children, className }: ScrollScaleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.75, 1],
    [0.96, 1, 1, 0.98],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.8, 1],
    [0, 1, 1, 0.55],
  );

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
