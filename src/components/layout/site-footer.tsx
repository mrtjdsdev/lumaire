import Link from "next/link";
import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";

const explore = [
  { href: "/#product", label: "Product" },
  { href: "/#technology", label: "Technology" },
  { href: "/#vision", label: "Our vision" },
  { href: "/#waitlist", label: "Waitlist" },
];

const tools = [
  { href: "/device", label: "Device" },
  { href: "/pair", label: "Pair" },
  { href: "/architecture", label: "Hardware plan" },
];

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
            Lumaire is developing e-paper displays for the home.
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
      <div className="border-t border-[#e4e4e0]">
        <p className="mx-auto w-full max-w-6xl px-6 py-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#6b6b66] sm:px-10">
          © 2026 Lumaire
        </p>
      </div>
    </footer>
  );
}
