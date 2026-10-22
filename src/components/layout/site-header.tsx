"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { Wordmark } from "@/components/brand/wordmark";
import { HoverText } from "@/components/text/hover-text";
import { cn } from "@/lib/cn";

const MotionLink = motion.create(Link);

const sectionLinks = [
  { href: "/#product", label: "Product" },
  { href: "/#technology", label: "Technology" },
  { href: "/#vision", label: "Our vision" },
  { href: "/architecture", label: "Hardware" },
  { href: "/#waitlist", label: "Waitlist" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const menuId = useId();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const open = openPath === pathname;
  const { scrollYProgress } = useScroll();
  const progressScaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-[#f5f5f3]/85 backdrop-blur-md transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-[#deded8] shadow-[0_8px_30px_rgba(17,17,17,0.05)]" : "border-transparent",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-card focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-6 sm:px-10">
        <Wordmark />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {sectionLinks.map((link) => {
            const active = link.href === pathname;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-active={active || undefined}
                aria-current={active ? "page" : undefined}
                className={`nav-link text-sm transition-colors hover:text-ink ${active ? "text-ink" : "text-[#3f3f3c]"}`}
              >
                <HoverText effect="split">{link.label}</HoverText>
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <MotionLink href="/#waitlist" aria-label="Join the waitlist" whileTap={{ scale: 0.96 }} className="inline-flex h-10 items-center rounded-full bg-ink px-4 text-sm text-paper shadow-[0_1px_2px_rgba(17,17,17,0.18)] hover:bg-[#2a2a2a] lg:hidden">
            Waitlist
          </MotionLink>
          <MotionLink href="/#waitlist" whileTap={{ scale: 0.96 }} className="hidden h-10 items-center rounded-full bg-ink px-5 text-sm text-paper shadow-[0_1px_2px_rgba(17,17,17,0.18)] hover:bg-[#2a2a2a] lg:inline-flex">
            Join the waitlist
          </MotionLink>
          <motion.button
            type="button"
            whileTap={{ scale: 0.96 }}
            className="inline-flex h-10 items-center rounded-full border border-[#deded8] bg-white/60 px-4 text-sm lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            onClick={() => setOpenPath(open ? null : pathname)}
          >
            {open ? "Close" : "Menu"}
          </motion.button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={menuId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-[#deded8] bg-[#f5f5f3] lg:hidden"
          >
            <nav className="mx-auto flex w-full max-w-6xl flex-col px-6 py-3 sm:px-10" aria-label="Mobile">
              {sectionLinks.map((link) => (
                <Link key={link.href} href={link.href} className="border-b border-[#ecece8] py-3 text-base" onClick={() => setOpenPath(null)}>
                  {link.label}
                </Link>
              ))}
              <MotionLink href="/#waitlist" whileTap={{ scale: 0.97 }} className="mt-4 inline-flex h-12 items-center justify-center rounded-full bg-ink text-sm text-paper" onClick={() => setOpenPath(null)}>
                Join the waitlist
              </MotionLink>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        aria-hidden="true"
        style={{ scaleX: progressScaleX }}
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-ink/60"
      />
    </header>
  );
}
