import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";

const points = [
  {
    title: "It reflects light",
    copy: "An e-paper surface is read with the light already in the room, instead of shining light toward you.",
  },
  {
    title: "A still image can rest",
    copy: "Once an image is on the panel, e-paper can hold it without continuously illuminating the display.",
  },
  {
    title: "Holding is free; changing is not",
    copy: "The panel needs no power to keep an image. The controller, the radio, and the refresh still draw energy — so the device is designed to wake for an update, then go back to sleep.",
  },
];

const pipeline = [
  {
    step: "01",
    title: "Choose and compose",
    copy: "On your phone, pick a photograph or artwork, or compose what you glance at — a calendar, a dashboard. Deeper integrations, Home Assistant included, are what we're building toward, not a shipped feature.",
  },
  {
    step: "02",
    title: "Prepare the frame",
    copy: "Software converts your choice into exactly what the panel can show: resized, its colors mapped to the panel's pigments, and dithered so photographs keep their shading. The heavy work happens off the device.",
  },
  {
    step: "03",
    title: "Send a finished image",
    copy: "The display receives that prepared image over Wi-Fi — finished pixels, not a web page. A small microcontroller never has to render layouts, fonts, or feeds.",
  },
  {
    step: "04",
    title: "Refresh, then sleep",
    copy: "The controller wakes, applies the image, confirms it, and returns to sleep. The picture then holds on its own — no light, no fan, no glow in a dark room.",
  },
];

const tradeoffs = [
  {
    title: "Refresh",
    copy: "A full refresh takes seconds, not milliseconds. Lumaire is for information that changes occasionally — not video, games, or animation. We accept the wait; in exchange, the image can stay.",
  },
  {
    title: "Compute",
    copy: "A simple microcontroller instead of a single-board computer. Less to power and less to go wrong, because the frame arrives already prepared.",
  },
  {
    title: "Power",
    copy: "Holding an image costs the panel nothing. Energy goes to waking, receiving, and refreshing — brief, occasional work instead of a screen lit all day. We will publish battery figures only when they are measured.",
  },
  {
    title: "Light",
    copy: "Color on e-paper is pigment, not emitted light. It will never match a backlit screen for saturation — and it will never glow in a dark room, either.",
  },
];

export function TechnologySection() {
  return (
    <section id="technology" className="scroll-mt-24 border-b border-[#242424] bg-[#090909] text-[#f4f4f0]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <Reveal className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
            <span className="mr-3 text-[#f4f4f0]">02</span>
            Technology
          </p>
          <h2 className="mt-4 max-w-[18ch] text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            <HoverText effect="highlight">Engineered for a different kind of screen.</HoverText>
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-7 text-[#c8c8c2]">
            A Lumaire is not a small computer with a screen attached. It is a reflective panel, a simple
            microcontroller, and a pipeline that does the heavy work before anything reaches the wall — so the
            device itself can stay simple, and mostly asleep.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.3)] lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="bg-[#111] p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">How the surface is read</p>
            <svg viewBox="0 0 360 280" className="mt-6 h-auto w-full" role="img" aria-label="Diagram of ambient light reflecting from an e-paper surface">
              <rect x="40" y="168" width="280" height="18" fill="#f4f3ef" stroke="#d7d7d1" />
              <path d="M70 48 L150 168" fill="none" stroke="#f4f4f0" strokeWidth="1" />
              <path d="M150 168 L250 56" fill="none" stroke="#f4f4f0" strokeWidth="1" />
              <circle cx="70" cy="48" r="3" fill="#f4f4f0" />
              <circle cx="250" cy="56" r="3" fill="#f4f4f0" />
              <text x="48" y="36" fill="#c8c8c2" fontSize="11" fontFamily="ui-monospace, monospace">
                Ambient light
              </text>
              <text x="196" y="40" fill="#c8c8c2" fontSize="11" fontFamily="ui-monospace, monospace">
                To the eye
              </text>
              <text x="40" y="220" fill="#c8c8c2" fontSize="11" fontFamily="ui-monospace, monospace">
                Reflective surface
              </text>
              <g fill="#231F1D">
                <rect x="48" y="246" width="6" height="6" />
                <rect x="60" y="246" width="6" height="6" opacity="0.55" />
                <rect x="72" y="246" width="6" height="6" opacity="0.28" />
              </g>
            </svg>
          </Reveal>
          <ol className="bg-[#101010]">
            {points.map((point, index) => (
              <Reveal as="li" key={point.title} delay={index * 0.08} className="border-b border-[#2a2a2a] p-6 last:border-b-0 sm:p-8">
                <p className="font-mono text-[11px] text-[#9a9a94]">0{index + 1}</p>
                <h3 className="mt-3 text-xl font-medium tracking-[-0.03em]">{point.title}</h3>
                <p className="mt-2 max-w-lg text-sm leading-6 text-[#c8c8c2]">{point.copy}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] md:grid-cols-4">
          {pipeline.map((item, index) => (
            <Reveal as="article" key={item.step} delay={index * 0.07} className="bg-[#101010] p-5 sm:p-6">
              <p className="font-mono text-[11px] text-[#9a9a94]">{item.step}</p>
              <h3 className="mt-3 text-lg font-medium tracking-[-0.03em]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#b7b7b1]">{item.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Trade-offs, chosen on purpose</p>
          <dl className="mt-4 grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] sm:grid-cols-2">
            {tradeoffs.map((item) => (
              <div key={item.title} className="bg-[#0c0c0c] px-5 py-5 sm:px-6">
                <dt className="text-sm font-medium text-[#f4f4f0]">{item.title}</dt>
                <dd className="mt-2 text-sm leading-6 text-[#b7b7b1]">{item.copy}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-8 max-w-2xl text-sm leading-6 text-[#9a9a94]">
            Where this stands: the panel-first design is set. Panel selection, firmware, and the delivery
            backend are in development — the hardware plan page describes each of them as the plan it is.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
