"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; className?: string; delay?: number; amount?: number; y?: number };

/** Stays invisible until enough of it is scrolled into view, then fades/slides in once. */
export default function Reveal({ children, className = "", delay = 0, amount = 0.2, y = 40 }: Props) {
  const reduce = usePrefersReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
