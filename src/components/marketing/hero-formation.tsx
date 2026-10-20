import type { ReactNode } from "react";
import LetterGlitch from "@/components/marketing/letter-glitch";

/**
 * Hero shell. The background is the React Bits LetterGlitch canvas
 * (WebGL2 letter grid) tuned to the Lumaire palette: warm paper glyphs
 * at rest, brighter paper tones when they glitch, a cleared centre so
 * the headline stays readable, and the component's own cursor trail +
 * click "tear". The gradient overlay keeps text legible on the left.
 * If WebGL2 is unavailable the section simply stays near-black.
 */
export function HeroFormation({ children }: { children: ReactNode }) {
  return (
    <section className="relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden border-b border-[#1c1c1c] bg-[#070707] text-[#f4f4f0]">
      <div className="absolute inset-0" aria-hidden="true">
        <LetterGlitch
          glitchColors={["#f4f4f0", "#cdc4b2", "#7d7668"]}
          baseColor="#f4f4f0"
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789%&@#/"
          fontSize={13}
          spacing={0.6}
          density={0.85}
          baseOpacity={0.13}
          glitchAmount={0.45}
          speed={1}
          flow={0.45}
          smooth
          interactive
          cursorRadius={150}
          clickEffect="tear"
          edgeFade={0.12}
          centerFade={0.45}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(7,7,7,0.78)_0%,rgba(7,7,7,0.42)_46%,rgba(7,7,7,0.2)_100%)] lg:bg-[linear-gradient(90deg,rgba(7,7,7,0.78)_0%,rgba(7,7,7,0.5)_28%,rgba(7,7,7,0.16)_58%,rgba(7,7,7,0)_100%)]"
        aria-hidden="true"
      />
      {children}
    </section>
  );
}
