import type { Metadata } from "next";
import { LandingPage } from "@/components/marketing/landing-page";

const description =
  "Lumaire brings the flexibility of digital content to the paper-like simplicity of e-paper. Choose what you want to display and make your space your own.";

export const metadata: Metadata = {
  title: { absolute: "Lumaire — Digital, reimagined" },
  description,
  openGraph: {
    title: "Lumaire — Digital, reimagined",
    description,
    siteName: "Lumaire",
  },
};

export default function HomePage() {
  return <LandingPage />;
}
