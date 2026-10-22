import type { Metadata } from "next";
import { LandingPage } from "@/components/marketing/landing-page";

const description =
  "Lumaire is building connected e-paper displays that bring useful information into a room the way paper does — reflectively and quietly. Calendars, dashboards, photographs, and art, without another glowing screen.";

export const metadata: Metadata = {
  title: { absolute: "Lumaire — Take back your attention." },
  description,
  openGraph: {
    title: "Lumaire — Take back your attention.",
    description,
    siteName: "Lumaire",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
