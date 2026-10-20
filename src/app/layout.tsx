import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const description =
  "Lumaire is building connected e-paper displays that bring useful information into a room the way paper does — reflectively and quietly. Calendars, dashboards, photographs, and art, without another glowing screen.";

export const metadata: Metadata = {
  title: {
    default: "Lumaire — Digital information. A quieter presence.",
    template: "%s · Lumaire",
  },
  description,
  applicationName: "Lumaire",
  openGraph: {
    title: "Lumaire — Digital information. A quieter presence.",
    description,
    siteName: "Lumaire",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Lumaire — Digital information. A quieter presence.",
    description,
  },
  icons: {
    icon: [{ url: "/brand/lumaire-mark.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
