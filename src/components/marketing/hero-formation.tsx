import type { ReactNode } from "react";
import LetterGlitch from "@/components/marketing/letter-glitch";

/**
 * Hero shell. The background is the React Bits LetterGlitch canvas
 * (WebGL2 letter grid) tuned to the Lumaire palette: ink glyphs at
 * rest on paper, and a muted colour set — amber, terracotta, sage,
 * dusty blue — when they glitch, with a cleared centre so the headline
 * stays readable, plus the component's own cursor trail and click
 * "tear". The gradient overlay keeps text legible on the left.
 * If WebGL2 is unavailable the section simply stays paper-white.
 */
export function HeroFormation({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-[#e3e3da] bg-[#f7f7f4] text-[#151511]">
      <div className="absolute inset-0" aria-hidden="true">
        <LetterGlitch
          glitchColors={["#26261f", "#c28a12", "#c05a36", "#5d7d63", "#49688f", "#cf4b47"]}
          baseColor="#26261f"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%&@#/"
          fontSize={13}
          spacing={0.6}
          density={0.95}
          baseOpacity={0.38}
          glitchAmount={0.85}
          speed={1.2}
          flow={0.45}
          smooth
          interactive
          cursorRadius={150}
          clickEffect="tear"
          edgeFade={0.05}
          centerFade={0.22}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(247,247,244,0.5)_0%,rgba(247,247,244,0.18)_46%,rgba(247,247,244,0.04)_100%)] lg:bg-[linear-gradient(90deg,rgba(247,247,244,0.55)_0%,rgba(247,247,244,0.22)_28%,rgba(247,247,244,0.04)_58%,rgba(247,247,244,0)_100%)]"
        aria-hidden="true"
      />
      {children}
    </section>
  );
}
