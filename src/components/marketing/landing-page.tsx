import { CreatureSection } from "@/components/marketing/creature-section";
import { HeroSection } from "@/components/marketing/hero-section";
import { ProductSection } from "@/components/marketing/product-section";
import { TechnologySection } from "@/components/marketing/technology-section";
import { VisionSection } from "@/components/marketing/vision-section";
import { WaitlistSection } from "@/components/marketing/waitlist-section";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProductSection />
      <TechnologySection />
      <VisionSection />
      <CreatureSection />
      <WaitlistSection />
    </>
  );
}
