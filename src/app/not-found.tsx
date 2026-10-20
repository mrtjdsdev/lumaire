import type { Metadata } from "next";
import Link from "next/link";
import { buttonClass } from "@/components/ui/button";
import { HoverText } from "@/components/text/hover-text";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-6 py-24 sm:py-32">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">404</p>
      <h1 className="mt-4 text-5xl font-medium tracking-[-0.04em] text-ink">
        <HoverText effect="rotor">This page is not here.</HoverText>
      </h1>
      <p className="mt-4 text-sm leading-6 text-muted">The page you asked for is not on this site.</p>
      <Link href="/" className={`${buttonClass("primary")} mt-8 self-start`}>
        Back home
      </Link>
    </div>
  );
}
