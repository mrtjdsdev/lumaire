import { HeroFormation } from "@/components/marketing/hero-formation";
import { PressLink } from "@/components/motion/press-link";
import { Reveal } from "@/components/motion/reveal";

export function HeroSection() {
  return (
    <HeroFormation>
      <div className="relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:w-1/2 lg:px-16 lg:py-24">
        <Reveal as="div" y={12}>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#c8c8c2]">E-paper display</p>
        </Reveal>
        <Reveal as="div" delay={0.08} y={22}>
          <h1 className="mt-5 max-w-[8.5em] text-[clamp(2.35rem,8vw,6.1rem)] font-medium leading-[0.92] tracking-[-0.045em] text-[#f7f7f4]">
            Digital, reimagined.
          </h1>
        </Reveal>
        <Reveal as="div" delay={0.18} y={18}>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#d7d7d1]">
            Lumaire brings the flexibility of digital content to the paper-like simplicity of e-paper. Choose what you want to display and make your space your own.
          </p>
        </Reveal>
        <Reveal delay={0.28} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PressLink href="#waitlist" className="inline-flex h-12 items-center justify-center rounded-full bg-[#f4f4f0] px-6 text-sm font-medium text-ink shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:bg-white">
            Join the waitlist
          </PressLink>
          <PressLink
            href="#product"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#f4f4f0]/35 px-6 text-sm text-[#f4f4f0] backdrop-blur-[2px] hover:border-[#f4f4f0] hover:bg-[#f4f4f0]/10"
          >
            Explore the technology
          </PressLink>
        </Reveal>
        <Reveal as="dl" delay={0.38} className="mt-8 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[#f4f4f0]/20 bg-[#f4f4f0]/15 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          <div className="bg-[#070707]/75 px-3 py-3 backdrop-blur-[2px]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#b7b7b1]">Buffer</dt>
            <dd className="mt-1 text-sm text-[#f7f7f4]">800 × 480</dd>
          </div>
          <div className="bg-[#070707]/75 px-3 py-3 backdrop-blur-[2px]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#b7b7b1]">Controller</dt>
            <dd className="mt-1 text-sm text-[#f7f7f4]">ESP32-S3</dd>
          </div>
          <div className="bg-[#070707]/75 px-3 py-3 backdrop-blur-[2px]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#b7b7b1]">Link</dt>
            <dd className="mt-1 text-sm text-[#f7f7f4]">Simulated</dd>
          </div>
        </Reveal>
        <Reveal delay={0.46} y={10}>
          <p className="mt-4 max-w-sm font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-[#a3a39c]">
            The 800 × 480 buffer is the on-site simulator. No ESP32-S3 is connected.
          </p>
        </Reveal>
        <a href="#product" className="mt-12 inline-flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#b7b7b1]">
          <span className="scroll-cue-line inline-block h-8 w-px bg-current" aria-hidden="true" />
          Scroll
        </a>
      </div>
    </HeroFormation>
  );
}
