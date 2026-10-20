import { Reveal } from "@/components/motion/reveal";

const steps = [
  {
    number: "01",
    title: "Choose",
    copy: "Select a photo, artwork, or image from your phone.",
  },
  {
    number: "02",
    title: "Send",
    copy: "Prepare your image and send it to your connected display.",
  },
  {
    number: "03",
    title: "Display",
    copy: "Your selected image appears on the e-paper screen.",
  },
];

const specs = [
  { label: "Simulator buffer", value: "800 × 480 PNG", note: "Matches a common 7.5 inch landscape panel. A later controller can advertise another size." },
  { label: "Planned controller", value: "ESP32-S3", note: "The driver path exists in software. This site does not open a connection to a board." },
  { label: "Frame path", value: "Resize, dither, pack", note: "The hardware path is meant to hash the payload and wait for an acknowledgement." },
  { label: "Confirmation", value: "hardwareConfirmed false", note: "A simulated refresh never reports that a physical panel accepted the image." },
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
            Digital convenience. A different kind of display.
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#c8c8c2]">
            Traditional screens produce their own light. E-paper reflects ambient light to create a more paper-like viewing experience. Lumaire is developing a connected display experience that makes choosing and changing digital content simple.
          </p>
        </Reveal>
        <Reveal delay={0.1} className="grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:grid-cols-2">
          <article className="bg-[#111] p-6 sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Conventional screen</p>
            <div className="mt-8 aspect-[4/3] border border-[#3a3a3a] bg-[#070707] p-4">
              <div className="h-full w-full bg-[linear-gradient(180deg,#3a3a3a,#111)]" />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#c8c8c2]">Produces its own light, whether or not the image is changing.</p>
          </article>
          <article className="bg-[#141414] p-6 sm:p-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">E-paper</p>
            <div className="relative mt-8 aspect-[4/3] border border-[#3a3a3a] bg-[#eceae4] p-4">
              <div className="h-full w-full bg-[#f4f3ef]" />
              <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6b6b66]">Ambient light</span>
              <span className="absolute bottom-7 right-7 h-8 w-8 border-b border-r border-[#231F1D]/40" aria-hidden="true" />
            </div>
            <p className="mt-5 text-sm leading-6 text-[#c8c8c2]">Reflects the light already in the room, closer to a printed page.</p>
          </article>
        </Reveal>
      </div>
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10 sm:pb-32">
        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <span className="absolute left-[8%] right-[8%] top-5 hidden h-px bg-[#2a2a2a] md:block" aria-hidden="true" />
          {steps.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 0.09} className="relative">
              <p className="relative z-10 inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-[#2a2a2a] bg-[#111] px-3 font-mono text-sm text-[#f4f4f0]">{step.number}</p>
              <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em]">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-6 text-[#b7b7b1]">{step.copy}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal className="mt-16 overflow-hidden rounded-2xl border border-[#2a2a2a]">
          <div className="border-b border-[#2a2a2a] px-5 py-4 sm:px-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Signal path on this site</p>
          </div>
          <dl className="grid lg:grid-cols-2">
            {specs.map((spec) => (
              <div key={spec.label} className="border-b border-[#2a2a2a] px-5 py-5 last:border-b-0 sm:px-6 lg:[&:nth-last-child(-n+2)]:border-b-0 lg:odd:border-r">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">{spec.label}</dt>
                <dd className="mt-2 text-lg tracking-[-0.03em] text-[#f4f4f0]">{spec.value}</dd>
                <dd className="mt-2 text-sm leading-6 text-[#b7b7b1]">{spec.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <p className="mt-8 max-w-2xl text-sm leading-6 text-[#9a9a94]">
          The steps above describe the product Lumaire is building. No display is connected on this site.
        </p>
      </div>
    </section>
  );
}
