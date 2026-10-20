"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  createTimeline,
  splitText,
  spring,
  stagger,
  utils,
  type Timeline,
} from "animejs";

export type HoverTextEffect = "split" | "wave" | "rain" | "highlight" | "explode" | "rotor";

type HoverTextProps = {
  effect: HoverTextEffect;
  /** Plain text only — it is split into chars/words on mount. */
  children: string;
  className?: string;
};

/**
 * The supplied Anime.js text hover effects, adapted from the demo grid
 * onto real Lumaire text:
 *
 * - `split`     horizontal split roll  → header nav links
 * - `wave`      wavy chars while hovered → waitlist heading
 * - `rain`      spring "raining letters" → Choose / Send / Display steps
 * - `highlight` per-char glow sweep     → section headings
 * - `explode`   chars scatter & return  → Hardware page heading
 * - `rotor`     3D word drum rotation   → 404 heading
 *
 * Splitting happens client-side after mount (the server renders plain
 * text), listeners are scoped to the element (or its enclosing link),
 * everything reverts on unmount, and nothing is split at all under
 * `prefers-reduced-motion`. One deliberate deviation from the demo: the
 * highlight variant keeps headings at full opacity — only the glow
 * sweeps — so section titles never sit dimmed waiting for a hover.
 */
export function HoverText({ effect, children, className }: HoverTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const hoverTarget: HTMLElement = el.closest("a") ?? el;
    const timelines: Timeline[] = [];
    let onEnter: () => void = () => {};
    let onLeave: () => void = () => {};

    if (effect === "split") {
      const split = splitText(el, { chars: { class: "ht-char", clone: "left", wrap: "clip" } });
      const roll = createTimeline({
        autoplay: false,
        defaults: { ease: "inOutQuad", duration: 400 },
      }).add(
        el.querySelectorAll(".ht-char > span"),
        { x: "100%" },
        stagger(5, { use: "data-char" }),
      );
      timelines.push(roll);
      onEnter = () => animate(roll, { progress: 1 });
      onLeave = () => animate(roll, { progress: 0 });
      hoverTarget.addEventListener("pointerenter", onEnter);
      hoverTarget.addEventListener("pointerleave", onLeave);
      hoverTarget.addEventListener("focus", onEnter);
      hoverTarget.addEventListener("blur", onLeave);
      return () => {
        hoverTarget.removeEventListener("pointerenter", onEnter);
        hoverTarget.removeEventListener("pointerleave", onLeave);
        hoverTarget.removeEventListener("focus", onEnter);
        hoverTarget.removeEventListener("blur", onLeave);
        timelines.forEach((tl) => tl.revert());
        split.revert();
      };
    }

    if (effect === "wave") {
      const split = splitText(el, { chars: true });
      const params = { strength: 0 };
      const waveAnim = createTimeline()
        .add(
          split.chars,
          {
            y: ["-50%", "50%"],
            duration: 500,
            loop: true,
            alternate: true,
            ease: "inOut(2)",
            autoplay: false,
            modifier: (v: number) => v * params.strength,
          },
          stagger(50),
        )
        .seek(1000);
      timelines.push(waveAnim);
      onEnter = () =>
        animate(params, { strength: 1, onBegin: () => waveAnim.play() });
      onLeave = () =>
        animate(params, { strength: 0, onComplete: () => waveAnim.pause() });
      hoverTarget.addEventListener("pointerenter", onEnter);
      hoverTarget.addEventListener("pointerleave", onLeave);
      return () => {
        hoverTarget.removeEventListener("pointerenter", onEnter);
        hoverTarget.removeEventListener("pointerleave", onLeave);
        timelines.forEach((tl) => tl.revert());
        split.revert();
      };
    }

    if (effect === "rain") {
      const split = splitText(el, { chars: { class: "ht-char", clone: "top", wrap: "clip" } });
      const spans = el.querySelectorAll(".ht-char > span");
      const ease = spring({ stiffness: 90, damping: 11 });
      onEnter = () => {
        createTimeline().add(
          spans,
          { y: "100%", composition: "blend", ease },
          stagger(10, { use: "data-char", from: "random" }),
        );
      };
      onLeave = () => {
        createTimeline().add(
          spans,
          { y: "0%", composition: "blend", ease },
          stagger(10, { use: "data-char", from: "random" }),
        );
      };
      hoverTarget.addEventListener("pointerenter", onEnter);
      hoverTarget.addEventListener("pointerleave", onLeave);
      return () => {
        hoverTarget.removeEventListener("pointerenter", onEnter);
        hoverTarget.removeEventListener("pointerleave", onLeave);
        split.revert();
      };
    }

    if (effect === "highlight") {
      const split = splitText(el, { chars: true });
      onEnter = () => {
        createTimeline({ defaults: { ease: "out(3)", duration: 350, composition: "blend" } }).add(
          split.chars,
          { textShadow: "0 0 30px rgba(244,244,240,.9)" },
          stagger(12),
        );
      };
      onLeave = () => {
        createTimeline({ defaults: { ease: "out(3)", duration: 350, composition: "blend" } }).add(
          split.chars,
          { textShadow: "0 0 0px rgba(244,244,240,0)" },
          stagger(12),
        );
      };
      hoverTarget.addEventListener("pointerenter", onEnter);
      hoverTarget.addEventListener("pointerleave", onLeave);
      return () => {
        hoverTarget.removeEventListener("pointerenter", onEnter);
        hoverTarget.removeEventListener("pointerleave", onLeave);
        split.revert();
      };
    }

    if (effect === "explode") {
      const split = splitText(el, { chars: true });
      onEnter = () => {
        createTimeline().add(
          split.chars,
          {
            x: {
              to: () => `${utils.random(-3, 3)}rem`,
              duration: () => utils.random(150, 500),
            },
            y: () => `${utils.random(-5, 5)}rem`,
            rotate: () => utils.random(-180, 180),
            duration: () => utils.random(200, 750),
            ease: "outCirc",
            composition: "blend",
          },
          stagger(5, { from: "random" }),
        );
      };
      onLeave = () => {
        createTimeline().add(
          split.chars,
          {
            x: { to: 0, delay: 75 },
            y: 0,
            duration: () => utils.random(200, 400),
            rotate: { to: 0, delay: 150, duration: () => utils.random(300, 400) },
            ease: "inOut(2)",
            composition: "blend",
          },
          stagger(10, { from: "random" }),
        );
      };
      hoverTarget.addEventListener("pointerenter", onEnter);
      hoverTarget.addEventListener("pointerleave", onLeave);
      return () => {
        hoverTarget.removeEventListener("pointerenter", onEnter);
        hoverTarget.removeEventListener("pointerleave", onLeave);
        split.revert();
      };
    }

    // rotor — 3D word drums (faces styled in globals.css)
    const split = splitText(el, {
      words: `<span class="word-3d word-{i}"><em class="face face-top">{value}</em><em class="face-front">{value}</em><em class="face face-bottom">{value}</em><em class="face face-back">{value}</em></span>`,
    });
    const wordStagger = stagger(50, { use: "data-word", start: 0 });
    const rotateAnim = createTimeline({
      autoplay: false,
      defaults: { ease: "inOut(2)", duration: 750 },
    })
      .add(el.querySelectorAll(".word-3d"), { rotateX: -180 }, wordStagger)
      .add(el.querySelectorAll(".word-3d .face-top"), { opacity: [0, 0, 0] }, wordStagger)
      .add(el.querySelectorAll(".word-3d .face-front"), { opacity: [1, 0, 0] }, wordStagger)
      .add(el.querySelectorAll(".word-3d .face-bottom"), { opacity: [0, 1, 0] }, wordStagger)
      .add(el.querySelectorAll(".word-3d .face-back"), { opacity: [0, 0, 1] }, wordStagger);
    timelines.push(rotateAnim);
    onEnter = () => animate(rotateAnim, { progress: 1 });
    onLeave = () => animate(rotateAnim, { progress: 0 });
    hoverTarget.addEventListener("pointerenter", onEnter);
    hoverTarget.addEventListener("pointerleave", onLeave);
    return () => {
      hoverTarget.removeEventListener("pointerenter", onEnter);
      hoverTarget.removeEventListener("pointerleave", onLeave);
      timelines.forEach((tl) => tl.revert());
      split.revert();
    };
  }, [effect]);

  return (
    <span ref={ref} className={className}>
      {children}
    </span>
  );
}
