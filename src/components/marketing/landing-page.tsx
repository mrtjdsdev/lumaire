import CloudSky from "@/components/marketing/cloud-sky";
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
      {/* Founders quote over a slow dawn sky (Cloud Sky). The palette is
          a muted steel blue warming to paper at the horizon, and the
          scrims below darken the top/bottom edges so the band melts
          into the hero above and the product section below while the
          quote stays crisp. */}
      <section className="relative isolate overflow-hidden border-b border-[#242424] bg-[#131c26] text-[#f4f4f0]">
        <div className="absolute inset-0" aria-hidden="true">
          <CloudSky
            background="#5b84ae"
            baseColor="#dec39c"
            accentColor="#ffffff"
            density={62}
            speed={34}
            size={150}
            clouds={{ softness: 200, shadow: 32, cirrus: 70 }}
            sun={{ x: 84, y: 62, glow: "rgba(255, 244, 220, 0.85)" }}
            pointer={{ parallax: 120, wind: 60, damping: 24 }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,7,7,0.97)_0%,rgba(7,9,13,0.6)_14%,rgba(7,9,13,0.26)_38%,rgba(7,9,13,0.3)_64%,rgba(12,12,12,0.96)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,9,13,0.42)_0%,rgba(7,9,13,0.08)_62%,rgba(7,9,13,0)_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <Quote
            quote="We turn the quiet power of sunlight into a brighter future for the way we live, think, and create."
            author="The Founders of Lumaire"
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
