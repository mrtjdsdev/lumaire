import type { ReactNode } from "react";
import LetterGlitch from "@/components/marketing/letter-glitch";

/**
 * Hero shell. The background is the React Bits LetterGlitch canvas
 * (WebGL2 letter grid) tuned to the Lumaire palette: warm paper glyphs
 * at rest, and a muted colour set — amber, terracotta, sage, dusty
 * blue — when they glitch, with a cleared centre so the headline stays
 * readable, plus the component's own cursor trail and click "tear".
 * The gradient overlay keeps text legible on the left.
 * If WebGL2 is unavailable the section simply stays near-black.
 */
export function HeroFormation({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-[#1c1c1c] bg-[#101010] text-[#f4f4f0]">
      <div className="absolute inset-0" aria-hidden="true">
        <LetterGlitch
          glitchColors={["#f6f1e7", "#f2c14e", "#e07a5f", "#81b29a", "#5e8fce", "#ef6f6c"]}
          baseColor="#f6f1e7"
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
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(7,7,7,0.42)_0%,rgba(7,7,7,0.14)_46%,rgba(7,7,7,0.02)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,7,7,0.45)_0%,rgba(7,7,7,0.18)_28%,rgba(7,7,7,0.02)_58%,rgba(7,7,7,0)_100%)]"
        aria-hidden="true"
      />
      {children}
    </section>
  );
}
