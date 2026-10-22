import { Reveal } from "@/components/motion/reveal";

type QuoteProps = {
  quote: string;
  author: string;
  role: string;
  className?: string;
};

/**
 * Editorial pull-quote used sparingly across the site: a large Fraunces
 * italic line with a brass rule and a mono attribution. Attributions are
 * real, verifiable quotes — never invented testimonials.
 */
export function Quote({ quote, author, role, className = "" }: QuoteProps) {
  return (
    <Reveal as="figure" className={`border-l-2 border-[#a58a5f] pl-5 sm:pl-7 ${className}`}>
      <blockquote className="accent-serif max-w-3xl text-[1.65rem] leading-snug text-[#f4f4f0] sm:text-[1.9rem]">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">
        {author} <span className="text-[#6f6f6a]">· {role}</span>
      </figcaption>
    </Reveal>
  );
}
