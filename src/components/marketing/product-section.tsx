import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";
import { Quote } from "@/components/marketing/quote";

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
    <section id="product" className="scroll-mt-24 border-b border-[#e3e3da] bg-[#f7f7f4] text-[#151511]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#77776e]">
            <span className="mr-3 text-[#151511]">01</span>
            The product
          </p>
          <h2 className="mt-4 max-w-[16ch] text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            <HoverText effect="highlight">Useful information, without another glowing screen.</HoverText>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#45453f]">
            Most connected displays are small televisions: they light up, and then they ask to be looked at. A
            Lumaire is closer to a framed page. It shows a calendar, a dashboard, a photograph — then simply
            stays there, readable in the room&rsquo;s own light, until you choose something new.
          </p>
        </Reveal>
        <Reveal delay={0.08} className="mt-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[#77776e]">Made for</span>
          {["Calendars & schedules", "Room dashboards", "Photographs & art", "Lists that stay put"].map((item) => (
            <span key={item} className="rounded-full border border-[#dcdcd2] bg-white px-3.5 py-1.5 text-sm text-[#3a3a36]">
              {item}
            </span>
          ))}
        </Reveal>
        <Quote
          className="mt-16"
          quote="Good design is as little design as possible."
          author="Dieter Rams"
          role="Industrial designer"
          onLight
        />
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10 sm:pb-32">
        <ol className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 0.09} className="lift rounded-3xl border border-[#e0e0d6] bg-white p-6 shadow-[0_10px_30px_rgba(17,17,17,0.04)] hover:border-[#c9c9bc] sm:p-7">
              <p className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#e0e0d6] bg-[#f4f4ee] px-3 font-mono text-sm text-[#151511]">{step.number}</p>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">
                <HoverText effect="rain">{step.title}</HoverText>
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#55554f]">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
