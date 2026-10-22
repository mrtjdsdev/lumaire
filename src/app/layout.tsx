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

const socialImage = {
  url: "/images/lumaire-calendar.jpg",
  width: 1024,
  height: 900,
  alt: "Framed Lumaire e-paper display showing a calendar",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://lumaire.io"),
  title: {
    default: "Lumaire — When digital meets paper.",
    template: "%s · Lumaire",
  },
  description,
  applicationName: "Lumaire",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Lumaire — When digital meets paper.",
    description,
    siteName: "Lumaire",
    type: "website",
    locale: "en_US",
    url: "/",
    images: [socialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lumaire — When digital meets paper.",
    description,
    images: [socialImage],
  },
  icons: {
    icon: [{ url: "/brand/lumaire-mark.svg", type: "image/svg+xml" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Lumaire",
      url: "https://lumaire.io",
      logo: "https://lumaire.io/brand/lumaire-mark.svg",
      email: "founders@lumaire.io",
      description,
    },
    {
      "@type": "WebSite",
      name: "Lumaire",
      url: "https://lumaire.io",
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
