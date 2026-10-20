import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";

export function VisionSection() {
  return (
    <section id="vision" className="scroll-mt-24 border-b border-[#242424] bg-[#0c0c0c] text-[#f4f4f0]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
            <span className="mr-3 text-[#f4f4f0]">03</span>
            Our vision
          </p>
          <h2 className="mt-4 text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            <HoverText effect="highlight">Technology that belongs in your space.</HoverText>
          </h2>
          <p className="mt-6 max-w-md text-base leading-7 text-[#c8c8c2]">
            A more considered way to bring digital imagery into your home.
          </p>
        </Reveal>
        <Reveal as="ul" delay={0.1} className="grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:grid-cols-3 lg:grid-cols-1">
          <li className="bg-[#111] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">Reflective</p>
            <p className="mt-2 text-sm leading-6 text-[#c8c8c2]">The surface is read with the light already in the room.</p>
          </li>
          <li className="bg-[#111] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">Still</p>
            <p className="mt-2 text-sm leading-6 text-[#c8c8c2]">A held image does not need the panel to stay lit.</p>
          </li>
          <li className="bg-[#111] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">Interest models</p>
            <p className="mt-2 text-sm leading-6 text-[#c8c8c2]">Wall Hub 10.0 inch black and white, Kitchen Display 7.5 inch tri-color, Gallery Frame 13.3 inch full color. Choosing one records interest. It is not an order.</p>
          </li>
        </Reveal>
      </div>
    </section>
  );
}
