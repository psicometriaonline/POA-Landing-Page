import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { ToolsSection } from "@/components/sections/tools-section";
import { HubSection } from "@/components/sections/hub-section";

export default function Home() {
  return (
    <main data-testid="page-home">
      <HeroSection />
      <TrustSection />
      <ToolsSection />
      <HubSection />
    </main>
  );
}
