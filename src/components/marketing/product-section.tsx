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

const lineup = [
  {
    label: "Wall Hub (10.0\")",
    value: "10.0 inch · black and white",
    note: "For dashboards and room control — the glanceable state of a home, on the wall. In development.",
  },
  {
    label: "Kitchen Display (7.5\")",
    value: "7.5 inch · tri-color",
    note: "For calendars, schedules, and lists, where the day gets planned. In development.",
  },
  {
    label: "Gallery Frame (13.3\")",
    value: "13.3 inch · full color",
    note: "For artwork and photography at the size of a small framed print — where much of our current exploration is focused. In development.",
  },
  {
    label: "Availability",
    value: "Not on sale yet",
    note: "The waitlist records interest in a model. It is not an order, and final specifications will be published as they are confirmed.",
  },
];

export function ProductSection() {
  return (
    <section id="product" className="scroll-mt-24 border-b border-[#242424] bg-[#0c0c0c] text-[#f4f4f0]">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
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
        <Reveal delay={0.1} className="grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:grid-cols-2">
          <article className="bg-[#111] p-6 sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Conventional screen</p>
            <div className="mt-8 aspect-[4/3] border border-[#3a3a3a] bg-[#070707] p-4">
              <div className="h-full w-full bg-[linear-gradient(180deg,#3a3a3a,#111)]" />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#c8c8c2]">Produces its own light and keeps producing it, whether the information changed a second ago or last week.</p>
          </article>
          <article className="bg-[#141414] p-6 sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">E-paper</p>
            <div className="relative mt-8 aspect-[4/3] border border-[#3a3a3a] bg-[#eceae4] p-4">
              <div className="h-full w-full bg-[#f4f3ef]" />
              <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6b6b66]">Ambient light</span>
              <span className="absolute bottom-7 right-7 h-8 w-8 border-b border-r border-[#231F1D]/40" aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#c8c8c2]">Reflects the light already in the room, closer to a printed page. When the image stops changing, the panel can stop drawing power.</p>
          </article>
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
        <Reveal className="mt-16 overflow-hidden rounded-2xl border border-[#2a2a2a]">
          <div className="border-b border-[#2a2a2a] px-5 py-4 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">The intended lineup</p>
          </div>
          <dl className="grid lg:grid-cols-2">
            {lineup.map((item) => (
              <div key={item.label} className="border-b border-[#2a2a2a] px-5 py-5 last:border-b-0 sm:px-6 lg:[&:nth-last-child(-n+2)]:border-b-0 lg:odd:border-r">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">{item.label}</dt>
                <dd className="mt-2 text-lg tracking-[-0.03em] text-[#f4f4f0]">{item.value}</dd>
                <dd className="mt-2 text-sm leading-6 text-[#b7b7b1]">{item.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-[#9a9a94]">
          Three sizes, three jobs — one idea: information that belongs on a wall, not on another glowing screen.
        </p>
      </div>
    </section>
  );
}
