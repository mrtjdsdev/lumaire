"use client";

import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { MotionProvider } from "@/components/motion/motion-provider";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <div className="flex min-h-full flex-1 flex-col">
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </div>
    </MotionProvider>
  );
}
