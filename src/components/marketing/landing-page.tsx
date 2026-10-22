import { HeroSection } from "@/components/marketing/hero-section";
import { ProductSection } from "@/components/marketing/product-section";
import { ShowcaseSection } from "@/components/marketing/showcase-section";
import { TechnologySection } from "@/components/marketing/technology-section";
import { VisionSection } from "@/components/marketing/vision-section";
import { WaitlistSection } from "@/components/marketing/waitlist-section";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <ProductSection />
      <ShowcaseSection />
      <TechnologySection />
      <VisionSection />
      <WaitlistSection />
    </>
  );
}
