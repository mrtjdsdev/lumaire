import { HeroSection } from "@/components/marketing/hero-section";
import { ProductSection } from "@/components/marketing/product-section";
import { ShowcaseSection } from "@/components/marketing/showcase-section";
import { TechnologySection } from "@/components/marketing/technology-section";
import { VisionSection } from "@/components/marketing/vision-section";
import { WaitlistSection } from "@/components/marketing/waitlist-section";
import { Quote } from "@/components/marketing/quote";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <section className="border-b border-[#242424] bg-[#070707] text-[#f4f4f0]">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <Quote
            quote="We harness the light of the sun to create space for art, thought, and productivity."
            author="The Lumaire Founding Team"
          />
        </div>
      </section>
      <ProductSection />
      <ShowcaseSection />
      <TechnologySection />
      <VisionSection />
      <WaitlistSection />
    </>
  );
}
