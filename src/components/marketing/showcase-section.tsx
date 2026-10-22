import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";
import { Quote } from "@/components/marketing/quote";

const shots = [
  {
    src: "/images/lumaire-calendar.jpg",
    alt: "Framed Lumaire display on a desk by a window, showing an April 2025 calendar with the day's events and weather",
  },
  {
    src: "/images/lumaire-mountain-lake.jpg",
    alt: "Framed Lumaire display on a desk by a window, showing a black-and-white photograph of a mountain lake",
  },
] as const;

export function ShowcaseSection() {
  return (
    <section className="border-b border-[#242424] bg-[#0c0c0c] text-[#f4f4f0]">
      <div className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10 sm:pb-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
              In your space
            </p>
            <h2 className="mt-4 text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              <HoverText effect="highlight">Your world. On display.</HoverText>
            </h2>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#9a9a94]">
            Product imagery
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {shots.map((shot, index) => (
            <Reveal key={shot.src} delay={index * 0.1}>
              <figure className="group lift overflow-hidden rounded-[1.75rem] border border-[#2a2a2a] bg-[#111] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-[#3a3a3a]">
                <div className="overflow-hidden">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={1024}
                    height={900}
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
              </figure>
            </Reveal>
          ))}
        </div>

        <Quote
          className="mt-16"
          quote="Space and light and order. Those are the things that men need just as much as they need bread or a place to sleep."
          author="Le Corbusier"
          role="Architect"
        />
      </div>
    </section>
  );
}
