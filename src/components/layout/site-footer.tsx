import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";

const explore = [
  { href: "/#product", label: "Product" },
  { href: "/#technology", label: "Technology" },
  { href: "/#vision", label: "Our vision" },
  { href: "/#waitlist", label: "Waitlist" },
];

const tools = [{ href: "/architecture", label: "Hardware plan" }];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e4e4e0] bg-[#f5f5f3]">
      <Reveal className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Lumaire, home">
            <LogoMark className="h-8 w-8" />
            <span className="text-sm font-medium uppercase tracking-[0.16em]">Lumaire</span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#4a4a46]">
            Connected e-paper displays for useful information — reflective, still, and made for the wall. In
            development.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6b6b66]">Explore</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {explore.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link w-fit text-[#2c2c2a] transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#6b6b66]">More</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {tools.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="nav-link w-fit text-[#2c2c2a] transition-colors hover:text-ink">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-[#6b6b66]">Contact</p>
          <a href="mailto:founders@lumaire.io" className="nav-link mt-3 inline-block w-fit text-sm text-[#2c2c2a] transition-colors hover:text-ink">
            founders@lumaire.io
          </a>
        </div>
      </Reveal>
      <div className="overflow-hidden" aria-hidden="true">
        <p className="-mb-[0.23em] text-center text-[clamp(4.5rem,15.5vw,13rem)] font-medium uppercase leading-[0.82] tracking-[-0.02em] text-[#111111]/[0.055] select-none">
          Lumaire
        </p>
      </div>
      <div className="border-t border-[#e4e4e0]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-6 py-5 sm:px-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b6b66]">© 2026 Lumaire</p>
          <a href="#main" className="nav-link w-fit font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b6b66] transition-colors hover:text-ink">
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}
