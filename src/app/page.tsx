import type { Metadata } from "next";
import { LandingPage } from "@/components/marketing/landing-page";

const description =
  "Lumaire is building connected e-paper displays that bring useful information into a room the way paper does — reflectively and quietly. Calendars, dashboards, photographs, and art, without another glowing screen.";

export const metadata: Metadata = {
  title: { absolute: "Lumaire — When digital meets paper." },
  description,
  openGraph: {
    title: "Lumaire — When digital meets paper.",
    description,
    siteName: "Lumaire",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
