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
      {/* Founders quote over a pale Cloud Sky. The palette is a light
          steel-blue zenith dissolving to white at the horizon, and the
          scrims fade the band into the paper hero above and the product
          section below while a white wash behind the quote column
          keeps the dark text crisp over passing clouds. */}
      <section className="relative isolate overflow-hidden border-b border-[#e3e3da] bg-[#e8eff4] text-[#141412]">
        <div className="absolute inset-0" aria-hidden="true">
          <CloudSky
            background="#aecadb"
            baseColor="#f2f7f9"
            accentColor="#ffffff"
            density={58}
            speed={34}
            size={150}
            clouds={{ softness: 200, shadow: 58, cirrus: 70 }}
            sun={{ x: 84, y: 62, glow: "rgba(255, 255, 255, 0.9)" }}
            pointer={{ parallax: 120, wind: 60, damping: 24 }}
          />
        </div>
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(247,247,244,0.98)_0%,rgba(247,247,244,0.35)_18%,rgba(247,247,244,0.12)_42%,rgba(247,247,244,0.2)_68%,rgba(247,247,244,0.98)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0.18)_58%,rgba(255,255,255,0)_100%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 sm:py-20">
          <Quote
            quote="We turn the quiet power of sunlight into a brighter future for the way we live, think, and create."
            author="The Founders of Lumaire"
            onLight
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
