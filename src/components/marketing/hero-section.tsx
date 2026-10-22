import { HeroFormation } from "@/components/marketing/hero-formation";
import { PressLink } from "@/components/motion/press-link";
import { Reveal } from "@/components/motion/reveal";

export function HeroSection() {
  return (
    <HeroFormation>
      <div className="relative z-10 flex min-h-[calc(100svh-4.5rem)] flex-col justify-center px-6 py-16 sm:px-10 sm:py-20 lg:w-1/2 lg:px-16 lg:py-24">
        <Reveal as="div" y={12}>
          <p className="inline-flex items-center gap-2.5 rounded-full border border-[#161613]/20 bg-white/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#2c2c26] backdrop-blur-[2px]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#c9ab72]" aria-hidden="true" />
            In development — the waitlist is open
          </p>
        </Reveal>
        <Reveal as="div" delay={0.08} y={22}>
          <h1 className="mt-6 max-w-[9em] text-[clamp(2.6rem,8.5vw,6.4rem)] font-medium leading-[0.92] tracking-[-0.045em] text-[#14140f]">
            When digital meets <em className="accent-serif">paper.</em>
          </h1>
        </Reveal>
        <Reveal as="div" delay={0.18} y={18}>
          <p className="mt-6 max-w-md text-lg leading-8 text-[#45453f]">
            Your home is full of screens competing to be looked at. Lumaire is the opposite — connected
            e-paper displays that put the information you need on the wall: calendars, room dashboards,
            photographs, and art. Quietly, beautifully, and only as present as you want it to be.
          </p>
        </Reveal>
        <Reveal delay={0.28} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PressLink href="#waitlist" className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#151511] px-6 text-sm font-medium text-[#f7f7f4] shadow-[0_8px_24px_rgba(17,17,17,0.22)] hover:bg-black">
            Join the waitlist
            <span aria-hidden="true">→</span>
          </PressLink>
          <PressLink
            href="#technology"
            className="inline-flex h-12 items-center justify-center rounded-full border border-[#161613]/30 px-6 text-sm text-[#171713] backdrop-blur-[2px] hover:border-[#161613] hover:bg-[#161613]/5"
          >
            Explore the technology
          </PressLink>
        </Reveal>
        <Reveal as="dl" delay={0.38} className="mt-8 grid max-w-lg grid-cols-3 gap-px overflow-hidden rounded-2xl border border-[#161613]/12 bg-[#161613]/10 shadow-[0_16px_40px_rgba(17,17,17,0.08)]">
          <div className="bg-white/75 px-3 py-3 backdrop-blur-[2px]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#77776e]">Surface</dt>
            <dd className="mt-1 text-sm text-[#171713]">Reflective e-paper</dd>
          </div>
          <div className="bg-white/75 px-3 py-3 backdrop-blur-[2px]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#77776e]">Image</dt>
            <dd className="mt-1 text-sm text-[#171713]">Held without power</dd>
          </div>
          <div className="bg-white/75 px-3 py-3 backdrop-blur-[2px]">
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#77776e]">Presence</dt>
            <dd className="mt-1 text-sm text-[#171713]">Made for the wall</dd>
          </div>
        </Reveal>
        <a href="#product" className="mt-12 inline-flex w-fit items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-[#6f6f66]">
          <span className="scroll-cue-line inline-block h-8 w-px bg-current" aria-hidden="true" />
          Scroll
        </a>
      </div>
    </HeroFormation>
  );
}
