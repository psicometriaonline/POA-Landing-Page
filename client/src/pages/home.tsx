import { lazy, Suspense } from "react";
import { HeroSection } from "@/components/sections/hero-section";

const TrustSection = lazy(() => import("@/components/sections/trust-section").then(m => ({ default: m.TrustSection })));
const ToolsSection = lazy(() => import("@/components/sections/tools-section"));
const HubSection = lazy(() => import("@/components/sections/hub-section"));
const SupportSection = lazy(() => import("@/components/sections/support-section"));
const CertificateSection = lazy(() => import("@/components/sections/certificate-section"));
const CtaSection = lazy(() => import("@/components/sections/cta-section"));
const FaqSection = lazy(() => import("@/components/sections/faq-section"));

export default function Home() {
  return (
    <main data-testid="page-home">
      <HeroSection />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <TrustSection />
      </Suspense>
      <Suspense fallback={<div className="min-h-[400px]" />}>
        <ToolsSection />
        <HubSection />
        <SupportSection />
        <CertificateSection />
        <CtaSection />
        <FaqSection />
      </Suspense>
    </main>
  );
}
