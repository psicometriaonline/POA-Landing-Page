import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";

export default function Home() {
  return (
    <main data-testid="page-home">
      <HeroSection />
      <TrustSection />
    </main>
  );
}
