"use client";

import { useEffect, useRef } from "react";
import { animate, createTimeline, createTimer, stagger, utils } from "animejs";

const ROWS = 13;
const COUNT = ROWS * ROWS;

/**
 * Faithful port of the supplied Anime.js "additive creature" demo, adapted
 * to live inside a contained stage instead of owning the whole page:
 *
 * - 169 divs on a 13 × 13 grid, `plus-lighter` blending, centre-out
 *   stagger for scale / opacity / colour / glow / z-index — unchanged.
 * - The original follows the pointer across the full window; here the
 *   pointer is tracked relative to this panel, so the creature gathers
 *   around your cursor while you are over the stage and resumes its
 *   autonomous wander (with the pulse on every loop) when you leave it.
 * - Colours are shifted from the demo's pure red ramp to a hot paper-white
 *   core cooling to ember red at the edges, to sit with the Lumaire ink /
 *   paper palette while keeping the additive glow.
 * - The 15 fps follow-timer and timelines pause when the stage is off
 *   screen or the tab is hidden, and everything reverts on unmount.
 *   Under `prefers-reduced-motion` the creature renders at rest.
 */
export function AdditiveCreature() {
  const stageRef = useRef<HTMLDivElement>(null);
  const creatureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const creature = creatureRef.current;
    if (!stage || !creature) return;

    const particles = creature.querySelectorAll("[data-creature-particle]");
    if (particles.length === 0) return;

    const grid: [number, number] = [ROWS, ROWS];
    const from = "center" as const;
    const scaleStagger = stagger([2, 5], { ease: "inQuad", grid, from });
    const opacityStagger = stagger([1, 0.1], { grid, from });
    const viewport = { w: stage.clientWidth * 0.5, h: stage.clientHeight * 0.5 };

    // The demo sizes the creature in em (.2vh font) so the whole grid
    // scales with the viewport; here 1em tracks the stage's short edge.
    const fit = () => {
      viewport.w = stage.clientWidth * 0.5;
      viewport.h = stage.clientHeight * 0.5;
      const min = Math.min(stage.clientWidth, stage.clientHeight);
      creature.style.fontSize = `${Math.max(1.1, min / 138)}px`;
    };
    fit();

    utils.set(creature, {
      width: ROWS * 10 + "em",
      height: ROWS * 10 + "em",
    });
    utils.set(particles, {
      x: 0,
      y: 0,
      scale: scaleStagger,
      opacity: opacityStagger,
      background: stagger([92, 18], {
        grid,
        from,
        modifier: (v: number) => `hsl(${utils.lerp(38, 6, (92 - v) / 74)}, 78%, ${v}%)`,
      }),
      boxShadow: stagger([8, 1], {
        grid,
        from,
        modifier: (v: number) => `0px 0px ${utils.round(v, 0)}em 0px rgba(255, 84, 48, 0.55)`,
      }),
      zIndex: stagger([COUNT, 1], { grid, from, modifier: utils.round(0) }),
    });

    const resizeObserver = new ResizeObserver(fit);
    resizeObserver.observe(stage);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => resizeObserver.disconnect();
    }

    const cursor = { x: 0, y: 0 };
    let followAnimation: ReturnType<typeof animate> | null = null;
    let holding = false;
    let visible = true;

    const pulse = () => {
      animate(particles, {
        keyframes: [
          {
            scale: 5,
            opacity: 1,
            delay: stagger(90, { start: 1650, grid, from }),
            duration: 150,
          },
          {
            scale: scaleStagger,
            opacity: opacityStagger,
            ease: "inOutQuad",
            duration: 600,
          },
        ],
      });
    };

    const mainLoop = createTimer({
      frameRate: 15, // Re-target the follow animation ~15×/s, as in the demo
      onUpdate: () => {
        followAnimation = animate(particles, {
          x: cursor.x,
          y: cursor.y,
          delay: stagger(40, { grid, from }),
          duration: stagger(120, { start: 750, ease: "inQuad", grid, from }),
          ease: "inOut",
          composition: "blend", // Overlapping re-targets blend instead of jump
        });
      },
    });

    const autoMove = createTimeline()
      .add(
        cursor,
        {
          x: [-viewport.w * 0.45, viewport.w * 0.45],
          modifier: (x: number) =>
            x + Math.sin(mainLoop.currentTime * 0.0007) * viewport.w * 0.5,
          duration: 3000,
          ease: "inOutExpo",
          alternate: true,
          loop: true,
          onBegin: pulse,
          onLoop: pulse,
        },
        0,
      )
      .add(
        cursor,
        {
          y: [-viewport.h * 0.45, viewport.h * 0.45],
          modifier: (y: number) =>
            y + Math.cos(mainLoop.currentTime * 0.00012) * viewport.h * 0.5,
          duration: 1000,
          ease: "inOutQuad",
          alternate: true,
          loop: true,
        },
        0,
      );

    const manualMovementTimeout = createTimer({
      duration: 1500,
      onComplete: () => {
        holding = false;
        if (visible) autoMove.play();
      },
    });

    const setRunning = (running: boolean) => {
      visible = running;
      if (running) {
        mainLoop.play();
        if (!holding) autoMove.play();
      } else {
        mainLoop.pause();
        autoMove.pause();
      }
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => setRunning(entries[0]?.isIntersecting ?? false),
      { threshold: 0.05 },
    );
    intersectionObserver.observe(stage);

    const onVisibilityChange = () => setRunning(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);

    const followPointer = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      cursor.x = event.clientX - rect.left - rect.width * 0.5;
      cursor.y = event.clientY - rect.top - rect.height * 0.5;
      holding = true;
      autoMove.pause();
      manualMovementTimeout.restart();
    };
    stage.addEventListener("pointermove", followPointer);

    return () => {
      stage.removeEventListener("pointermove", followPointer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      manualMovementTimeout.pause();
      mainLoop.pause();
      autoMove.pause();
      autoMove.revert();
      followAnimation?.pause();
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className="relative flex h-[26rem] items-center justify-center overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:h-[34rem]"
      role="img"
      aria-label="Interactive animation: 169 glowing points on a grid that gather around your pointer and wander on their own when left alone."
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,120,80,0.07), transparent 65%)",
        }}
      />
      <div ref={creatureRef} aria-hidden="true" className="flex flex-wrap items-center justify-center">
        {Array.from({ length: COUNT }, (_, index) => (
          <div
            key={index}
            data-creature-particle
            className="relative m-[3em] h-[4em] w-[4em] rounded-[2em] will-change-transform"
            style={{ mixBlendMode: "plus-lighter", transformStyle: "preserve-3d" }}
          />
        ))}
      </div>

      <p className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8a84]">
        Additive creature — 169 pts
      </p>
      <p className="pointer-events-none absolute right-4 top-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8a84]">
        13 × 13 · plus-lighter
      </p>
      <p className="pointer-events-none absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8a84]">
        Move across the field to attract it
      </p>
      <p className="pointer-events-none absolute bottom-4 right-4 hidden font-mono text-[10px] uppercase tracking-[0.18em] text-[#8a8a84] sm:block">
        Idle · auto-wander + pulse
      </p>
    </div>
  );
}
