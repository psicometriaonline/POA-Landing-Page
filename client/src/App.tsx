import { useEffect, lazy, Suspense } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";
import { SocialProofToast } from "@/components/ui/social-proof-toast";
import { CheckoutProvider } from "@/components/checkout/checkout-provider";
import Home from "@/pages/home";

const Sobre = lazy(() => import("@/pages/sobre"));
const Planos = lazy(() => import("@/pages/planos"));
const Termos = lazy(() => import("@/pages/termos"));
const Privacidade = lazy(() => import("@/pages/privacidade"));
const NotFound = lazy(() => import("@/pages/not-found"));

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (!window.location.hash) {
      window.scrollTo({ top: 0 });
    }
  }, [location]);
  return null;
}

function Router() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/sobre" component={Sobre} />
        <Route path="/planos" component={Planos} />
        <Route path="/legal/termos" component={Termos} />
        <Route path="/legal/privacidade" component={Privacidade} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CheckoutProvider>
          <ScrollToTop />
          <Header />
          <Router />
          <Footer />
          <WhatsAppButton />
          <SocialProofToast />
          <Toaster />
        </CheckoutProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
