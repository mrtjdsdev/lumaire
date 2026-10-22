import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { HoverText } from "@/components/text/hover-text";
import TerraDusk from "@/components/marketing/terra-dusk";

export const metadata: Metadata = {
  title: "Founders",
  description:
    "Meet the founders of Lumaire — three founders, three perspectives, one ambition: technology that serves your environment without demanding your attention.",
};

const founders = [
  {
    name: "Cody",
    role: "Co-Founder · Hardware & Product Innovation",
    meta: "Australia · 21",
    bio: "Cody brings creativity and an entrepreneurial perspective to Lumaire's hardware and product development. With a strong interest in emerging technology, innovative product concepts, and micro-SaaS ventures, he explores new opportunities and ideas that help shape Lumaire's direction. His curiosity and ability to think beyond conventional solutions contribute to the foundation of what we're building.",
  },
  {
    name: "Ravero",
    role: "Co-Founder · Software Engineering & Systems Architecture",
    meta: "India · 21",
    bio: "Ravero leads the development of Lumaire's core application, turning ideas and product requirements into functional software. With strong programming skills and a background in computer systems architecture, he focuses on building the software infrastructure that powers the Lumaire experience. His technical expertise and problem-solving mindset help transform ambitious concepts into practical, working technology.",
  },
  {
    name: "Bennett Deskovich",
    role: "Co-Founder · Marketing, Sales & Creative Design",
    meta: "United States · 17",
    bio: "Bennett leads Lumaire's marketing, sales, and web design, shaping the brand's identity and how it connects with the world. Driven by creativity and an entrepreneurial mindset, he focuses on building the company's digital presence, communicating its vision, and identifying opportunities for growth. His interest in business development and creative strategy helps bring Lumaire's ideas to market.",
  },
];

export default function FoundersPage() {
  return (
    <article className="relative isolate overflow-hidden bg-[#02040a] text-[#f4f4f0]">
      {/* Terra Dusk globe backdrop: a dusk-lit Earth behind the header,
          fading into the page. Dragging is off and it sits behind the
          content, but the globe gently tilts to follow the cursor;
          it respects prefers-reduced-motion. */}
      <div className="absolute inset-x-0 top-0 h-[1080px]" aria-hidden="true">
        <TerraDusk background="#02040a" size={920} stars={6} speed={6} drag={false} hover={7} sun="fixed" daylight={52} />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1080px] bg-[linear-gradient(180deg,rgba(2,4,10,0.58)_0%,rgba(2,4,10,0.52)_42%,rgba(2,4,10,0.9)_78%,#02040a_100%)]"
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-10 sm:px-10 sm:py-14">
        <Reveal as="header" className="max-w-3xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#9a9a94]">
            <span className="mr-3 text-[#f4f4f0]">About</span>
            The founders
          </p>
          <h1 className="mt-4 max-w-[16ch] text-[clamp(2.2rem,5vw,3.8rem)] font-medium leading-[1.02] tracking-[-0.04em]">
            <HoverText effect="explode">Meet the founders.</HoverText>
          </h1>
          <p className="accent-serif mt-5 max-w-2xl text-[1.45rem] leading-snug text-[#e8e8e2]">
            Three founders. Three perspectives. One ambition.
          </p>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[#c8c8c2]">
            Lumaire brings together three founders from different parts of the world, united by a shared
            vision for entrepreneurship, innovation, and the future of technology.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#c8c8c2]">
            We believe in challenging conventional ideas, building meaningful products, and turning
            ambitious concepts into reality. Each of us brings a different set of skills to the table —
            spanning hardware innovation, software engineering, marketing, sales, and creative design.
            What unites us is an entrepreneurial mindset and the drive to build something bigger than
            ourselves.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[#f4f4f0]">
            We&rsquo;re not just building a product. We&rsquo;re building a vision for what technology can
            become.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {founders.map((founder, index) => (
            <Reveal
              as="article"
              key={founder.name}
              delay={index * 0.08}
              className="lift rounded-3xl border border-[#2a2a2a] bg-[#101010] p-6 hover:border-[#3a3a3a] sm:p-7"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#a58a5f]">{founder.meta}</p>
              <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">{founder.name}</h2>
              <p className="mt-2 font-mono text-[11px] uppercase leading-5 tracking-[0.14em] text-[#9a9a94]">
                {founder.role}
              </p>
              <p className="mt-4 text-sm leading-6 text-[#b7b7b1]">{founder.bio}</p>
            </Reveal>
          ))}
        </div>

        <Reveal as="section" className="mt-8 rounded-3xl border border-[#2a2a2a] bg-[#0c0c0c] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">What unites us</p>
          <blockquote className="accent-serif mt-5 max-w-3xl text-[1.65rem] leading-snug text-[#f4f4f0] sm:text-[1.9rem]">
            &ldquo;We believe the future should illuminate our lives, not demand our attention.&rdquo;
          </blockquote>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-[#b7b7b1]">
            Beyond our individual strengths, we share a deep belief in entrepreneurship as a way to
            challenge the status quo, solve meaningful problems, and create something lasting. Lumaire is
            the result of that shared ambition: three different perspectives working toward one vision of
            more thoughtful technology.
          </p>
        </Reveal>

        <Reveal as="section" className="mt-8 rounded-3xl border border-[#2a2a2a] bg-[#050505] p-6 sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#9a9a94]">Invest</p>
          <h2 className="mt-4 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
            Interested in investing in us and our product?
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#b7b7b1]">
            We&rsquo;re building Lumaire in the open and talking with people who share the ambition. For
            investment, partnership, or supplier conversations, contact the founding team directly.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="mailto:founders@lumaire.io"
              className="press inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#f4f4f0] px-5 text-sm font-medium text-[#111111] transition-colors duration-200 hover:bg-white"
            >
              founders@lumaire.io
            </a>
            <Link
              href="/#waitlist"
              className="press inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#45453f] bg-[#f4f4f0]/[0.06] px-5 text-sm font-medium text-[#f4f4f0] transition-colors duration-200 hover:border-[#a58a5f] hover:bg-[#f4f4f0]/[0.12]"
            >
              Join the waitlist
            </Link>
            <Link
              href="/architecture"
              className="press inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#45453f] bg-[#f4f4f0]/[0.06] px-5 text-sm font-medium text-[#f4f4f0] transition-colors duration-200 hover:border-[#a58a5f] hover:bg-[#f4f4f0]/[0.12]"
            >
              Read the hardware plan
            </Link>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
