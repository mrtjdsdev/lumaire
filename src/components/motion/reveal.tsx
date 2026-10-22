"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { AriaAttributes, CSSProperties, FormEventHandler, ReactNode } from "react";

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const tags = {
  article: motion.article,
  div: motion.div,
  dl: motion.dl,
  figure: motion.figure,
  form: motion.form,
  header: motion.header,
  li: motion.li,
  nav: motion.nav,
  ol: motion.ol,
  section: motion.section,
  ul: motion.ul,
} as const;

export type RevealTag = keyof typeof tags;

type RevealProps = AriaAttributes & {
  /** Element to render, so lists, forms and definition lists keep their semantics. */
  as?: RevealTag;
  /** Stagger offset in seconds. */
  delay?: number;
  /** Vertical travel in px before settling. */
  y?: number;
  /** Only meaningful when `as="form"`. */
  noValidate?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  role?: string;
  /** Only meaningful when `as="form"`. */
  onSubmit?: FormEventHandler<HTMLFormElement>;
  children?: ReactNode;
};

/**
 * The site's scroll-reveal primitive (Motion `whileInView`): fades and
 * rises content the first time it enters the viewport. Transform motion
 * is automatically disabled for `prefers-reduced-motion` users via the
 * `MotionConfig` in `motion-provider.tsx`.
 */
export function Reveal({ as = "div", delay = 0, y = 18, children, ...props }: RevealProps) {
  // All tags share the same runtime; the cast keeps Motion's per-tag
  // handler generics from leaking into this component's public props.
  const Component = tags[as] as typeof motion.div;
  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
      {...(props as unknown as HTMLMotionProps<"div">)}
    >
      {children}
    </Component>
  );
}
