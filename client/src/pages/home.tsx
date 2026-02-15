import { HeroSection } from "@/components/sections/hero-section";
import { TrustSection } from "@/components/sections/trust-section";
import { ToolsSection } from "@/components/sections/tools-section";
import { HubSection } from "@/components/sections/hub-section";
import { SupportSection } from "@/components/sections/support-section";
import { CertificateSection } from "@/components/sections/certificate-section";
import { CtaSection } from "@/components/sections/cta-section";
import { FaqSection } from "@/components/sections/faq-section";

export default function Home() {
  return (
    <main data-testid="page-home">
      <HeroSection />
      <TrustSection />
      <ToolsSection />
      <HubSection />
      <SupportSection />
      <CertificateSection />
      <CtaSection />
      <FaqSection />
    </main>
  );
}
