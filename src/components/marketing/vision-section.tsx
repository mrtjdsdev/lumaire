import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";

export function VisionSection() {
  return (
    <section id="vision" className="scroll-mt-24 border-b border-[#e3e3da] bg-white text-[#151511]">
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#77776e]">
            <span className="mr-3 text-[#151511]">03</span>
            Our vision
          </p>
          <h2 className="mt-4 text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            <HoverText effect="highlight">We want to give you back your walls.</HoverText>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#45453f]">
            The connected home was meant to make life easier. Too often it made rooms brighter and busier
            instead — another glowing rectangle asking to be checked, updated, and attended to.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#45453f]">
            We started Lumaire on a simple belief: most of the information in a home does not need to shine. A
            calendar, the state of a room, a photograph you love — these can be present the way paper is
            present. Readable, still, and easy to ignore until the moment you want them.
          </p>
          <p className="accent-serif mt-8 max-w-xl border-l-2 border-[#a58a5f] pl-5 text-[1.55rem] leading-snug text-[#141412]">
            Technology that serves your environment — without constantly demanding your attention.
          </p>
        </Reveal>
        <Reveal as="ul" delay={0.1} className="grid gap-px overflow-hidden rounded-3xl border border-[#e0e0d6] bg-[#e0e0d6] shadow-[0_20px_50px_rgba(17,17,17,0.05)] sm:grid-cols-3 lg:grid-cols-1">
          <li className="bg-[#fbfbfa] p-5 transition-colors hover:bg-white">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#77776e]">Calm by design</p>
            <p className="mt-2 text-sm leading-6 text-[#45453f]">Information that is there when you look for it and quiet when you don&rsquo;t. We design for glances, not engagement — that is a design philosophy, and we think it is enough.</p>
          </li>
          <li className="bg-[#fbfbfa] p-5 transition-colors hover:bg-white">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#77776e]">Made for rooms</p>
            <p className="mt-2 text-sm leading-6 text-[#45453f]">A display should earn its place on a wall the way a frame does — by fitting the room it hangs in, not by dominating it.</p>
          </li>
          <li className="bg-[#fbfbfa] p-5 transition-colors hover:bg-white">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#77776e]">An ecosystem, not a gadget</p>
            <p className="mt-2 text-sm leading-6 text-[#45453f]">Different sizes for different rooms, and content that flows from the phone — and eventually the home systems — you already use. One family of displays, designed together.</p>
          </li>
        </Reveal>
      </div>
    </section>
  );
}
