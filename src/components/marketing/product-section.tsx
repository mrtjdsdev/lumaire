import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";

const steps = [
  {
    number: "01",
    title: "Choose",
    copy: "Pick a photograph or artwork, or lay out the information you glance at — a calendar, a list, a room dashboard.",
  },
  {
    number: "02",
    title: "Send",
    copy: "Your choice is prepared for the panel and delivered wirelessly. The display receives a finished image, not a web page to render.",
  },
  {
    number: "03",
    title: "Display",
    copy: "The new image appears, and then rests — visible without light of its own, until you send the next one.",
  },
];

export function ProductSection() {
  return (
    <section id="product" className="scroll-mt-24 border-b border-[#242424] bg-[#0c0c0c] text-[#f4f4f0]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
            <span className="mr-3 text-[#f4f4f0]">01</span>
            The product
          </p>
          <h2 className="mt-4 max-w-[16ch] text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            <HoverText effect="highlight">Useful information, without another glowing screen.</HoverText>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#c8c8c2]">
            Most connected displays are small televisions: they light up, and then they ask to be looked at. A
            Lumaire is closer to a framed page. It shows a calendar, a dashboard, a photograph — then simply
            stays there, readable in the room&rsquo;s own light, until you choose something new.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Made for</span>
          {["Calendars & schedules", "Room dashboards", "Photographs & art", "Lists that stay put"].map((item) => (
            <span key={item} className="rounded-full border border-[#2e2e2e] bg-[#111] px-3.5 py-1.5 text-sm text-[#d6d6d0]">
              {item}
            </span>
          ))}
        </Reveal>
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10 sm:pb-32">
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <span className="absolute left-[8%] right-[8%] top-5 hidden h-px bg-[#2a2a2a] md:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 0.09} className="relative">
              <p className="relative z-10 inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#111] px-3 font-mono text-sm text-[#f4f4f0]">{step.number}</p>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">
                <HoverText effect="rain">{step.title}</HoverText>
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#b7b7b1]">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
