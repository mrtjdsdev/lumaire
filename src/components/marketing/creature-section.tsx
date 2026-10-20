import { AdditiveCreature } from "@/components/marketing/additive-creature";

export function CreatureSection() {
  return (
    <section className="border-b border-[#242424] bg-[#0c0c0c] text-[#f4f4f0]">
      <div className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 sm:py-32">
        <div className="reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
              Motion study · Additive field
            </p>
            <h2 className="mt-4 text-[clamp(2.1rem,4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.04em]">
              A surface that follows you.
            </h2>
            <p className="mt-6 max-w-md text-base leading-7 text-[#c8c8c2]">
              One hundred sixty-nine points on a 13 × 13 grid, blended additively. Move across
              the field and the creature gathers around your pointer; leave it alone for a
              moment and it wanders — and pulses — on its own.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase leading-6 tracking-[0.16em] text-[#9a9a94]">
            Browser motion study · Anime.js
            <br />
            Not panel footage
          </p>
        </div>
        <div className="reveal mt-12">
          <AdditiveCreature />
        </div>
      </div>
    </section>
  );
}
