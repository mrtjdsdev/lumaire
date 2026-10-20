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
            <HoverText effect="highlight">We want to give you back your walls.</HoverText>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#c8c8c2]">
            The connected home was meant to make life easier. Too often it made rooms brighter and busier
            instead — another glowing rectangle asking to be checked, updated, and attended to.
          </p>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#c8c8c2]">
            We started Lumaire on a simple belief: most of the information in a home does not need to shine. A
            calendar, the state of a room, a photograph you love — these can be present the way paper is
            present. Readable, still, and easy to ignore until the moment you want them.
          </p>
          <p className="mt-6 max-w-xl border-l-2 border-[#f4f4f0] pl-4 text-base leading-7 text-[#f4f4f0]">
            Our mission: technology that serves your environment without constantly demanding your attention.
          </p>
        </Reveal>
        <Reveal as="ul" delay={0.1} className="grid gap-px overflow-hidden rounded-2xl border border-[#2a2a2a] bg-[#2a2a2a] shadow-[0_20px_50px_rgba(0,0,0,0.25)] sm:grid-cols-3 lg:grid-cols-1">
          <li className="bg-[#111] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">Calm by design</p>
            <p className="mt-2 text-sm leading-6 text-[#c8c8c2]">Information that is there when you look for it and quiet when you don&rsquo;t. We design for glances, not engagement — that is a design philosophy, and we think it is enough.</p>
          </li>
          <li className="bg-[#111] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">Made for rooms</p>
            <p className="mt-2 text-sm leading-6 text-[#c8c8c2]">A display should earn its place on a wall the way a frame does — by fitting the room it hangs in, not by dominating it.</p>
          </li>
          <li className="bg-[#111] p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">An ecosystem, not a gadget</p>
            <p className="mt-2 text-sm leading-6 text-[#c8c8c2]">Different sizes for different rooms, and content that flows from the phone — and eventually the home systems — you already use. One family of displays, designed together.</p>
          </li>
        </Reveal>
      </div>
    </section>
  );
}
