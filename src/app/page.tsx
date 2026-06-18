import { LandingHeader } from "@/components/landing/LandingHeader";
import { ChallengePill } from "@/components/landing/ChallengePill";
import { PresentationScroll } from "@/components/landing/PresentationScroll";
import { HeroSection } from "@/components/landing/HeroSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FinalCTASection } from "@/components/landing/FinalCTASection";

export default function HomePage() {
  return (
    <div className="liquid-bg relative h-[100dvh] overflow-hidden">
      <LandingHeader />
      <ChallengePill />
      <PresentationScroll>
        <HeroSection />
        <StatsSection />
        <FinalCTASection />
      </PresentationScroll>
    </div>
  );
}
