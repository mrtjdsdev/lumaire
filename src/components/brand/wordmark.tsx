"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { createTimeline, stagger, utils } from "animejs";
import { LogoMark } from "@/components/brand/logo";

const LETTERS = ["L", "U", "M", "A", "I", "R", "E"] as const;

export function Wordmark() {
  const rootRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Adapted from the supplied Anime.js logo timeline: the mark drops in
    // (FALL), then the wordmark letters pop with squash-and-stretch from
    // the centre (POP). The snippet's morph and outro stages target the
    // Anime.js logo's own letterform paths (#a-1, #dot-1, ...), which the
    // Lumaire lockup does not have, and its outro fades the logo out — so
    // this timeline ends settled on the exact mark instead. The supplied
    // SVG artwork itself is never distorted: only its wrapper moves, with
    // a uniform scale.
    const mark = root.querySelector("[data-logo-mark]");
    const letters = root.querySelectorAll("[data-logo-letter]");
    if (!mark || letters.length === 0) return;

    utils.set(letters, { transformOrigin: "50% 100% 0px" });
    utils.set(mark, { transformOrigin: "50% 100% 0px" });

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.label("FALL")
      .add(mark, {
        opacity: [0, 1],
        translateY: [-16, 0],
        scale: [1.3, 1],
        duration: 700,
        ease: "outElastic(1, 1.2)",
      })
      .label("POP", "-=420")
      .add(
        letters,
        {
          opacity: [0, 1],
          translateY: [
            { to: [16, -6], duration: 190, ease: "outQuad" },
            { to: 0, duration: 260, ease: "outElastic(1.4, 0.7)" },
          ],
          scaleY: [
            { to: [0.35, 1.35], duration: 160, ease: "outSine" },
            { to: 1, duration: 340, ease: "outElastic(1.4, 0.7)" },
          ],
          scaleX: [
            { to: [0.6, 1.12], duration: 160, ease: "outSine" },
            { to: 1, duration: 300, ease: "outQuad" },
          ],
          duration: 460,
          delay: stagger(48, { from: "center" }),
        },
        "POP",
      );

    return () => {
      tl.revert();
    };
  }, []);

  return (
    <Link ref={rootRef} href="/" className="inline-flex items-center gap-2.5" aria-label="Lumaire, home">
      <span data-logo-mark className="inline-flex will-change-transform">
        <LogoMark className="h-7 w-7 shrink-0" priority />
      </span>
      <span aria-hidden="true" className="text-[0.92rem] font-medium uppercase tracking-[0.16em] text-ink">
        {LETTERS.map((letter, index) => (
          <span key={index} data-logo-letter className="inline-block will-change-transform">
            {letter}
          </span>
        ))}
      </span>
      <span className="sr-only">Lumaire</span>
    </Link>
  );
}
