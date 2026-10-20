"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type PressLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

/** Anchor with Motion hover/tap spring feedback, safe to render from server components. */
export function PressLink({ href, className, children }: PressLinkProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      className={className}
    >
      {children}
    </motion.a>
  );
}
