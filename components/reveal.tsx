"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const FLUID: [number, number, number, number] = [0.32, 0.72, 0, 1];

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Seconds to spend on the entrance. The skill asks for 800ms or longer. */
  duration?: number;
};

/**
 * The standard scroll reveal across the site:
 * translate-y-16 blur-md opacity-0 -> translate-y-0 blur-0 opacity-100.
 */
export function Reveal({ children, className, delay = 0, duration = 0.9 }: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ y: 64, opacity: 0, filter: "blur(12px)" }}
      whileInView={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, delay, ease: FLUID }}
    >
      {children}
    </motion.div>
  );
}
