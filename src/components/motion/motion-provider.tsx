"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Site-wide Motion configuration. `reducedMotion="user"` makes every
 * Motion animation on the site honour the OS `prefers-reduced-motion`
 * setting (transform/layout animations are dropped, opacity remains).
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
