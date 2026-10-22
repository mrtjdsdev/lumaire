import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";
import { CollectionFolder } from "@/components/marketing/collection-folder";

const hints = [
  { action: "Open", detail: "Click the folder and the front flap drops." },
  { action: "Browse", detail: "Drag a page out and leave it on the desk." },
  { action: "Look closer", detail: "Click a page to bring it up close." },
];

export function CollectionSection() {
  return (
    <section className="border-b border-[#242424] bg-[#0c0c0c] text-[#f4f4f0]">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-24 sm:px-10 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
            In brief
          </p>
          <h2 className="mt-4 max-w-[18ch] text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
            <HoverText effect="highlight">The product, page by page.</HoverText>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#c8c8c2]">
            Why an e-paper surface reads differently, how an image rests on it, how content
            gets there from your phone, and an honest note on where the hardware stands — the
            short version of Lumaire, kept in one folder.
          </p>
          <ul className="mt-10 space-y-4">
            {hints.map((hint) => (
              <li key={hint.action} className="flex items-baseline gap-4">
                <span className="min-w-24 font-mono text-[11px] uppercase tracking-[0.16em] text-[#f4f4f0]">
                  {hint.action}
                </span>
                <span className="text-sm leading-6 text-[#b7b7b1]">{hint.detail}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="relative flex items-center justify-center rounded-[1.75rem] border border-[#2a2a2a] bg-[#111] bg-[radial-gradient(120%_120%_at_50%_0%,#1a1a15_0%,#111_55%)] px-4 py-16 shadow-[0_20px_50px_rgba(0,0,0,0.3)] sm:px-8 sm:py-20">
            <CollectionFolder />
            <p className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">
              The product — four pages
            </p>
            <p className="absolute bottom-4 right-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">
              Try it
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
