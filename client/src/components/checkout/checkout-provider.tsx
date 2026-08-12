import { createContext, useCallback, useContext, useState } from "react";
import type { BillingPeriod, PlanId } from "@shared/lead-schema";
import {
  type CheckoutSelection,
  LeadCaptureModal,
} from "./lead-capture-modal";

interface CheckoutContextValue {
  /** Abre o pop-up de cadastro para o plano e a periodicidade escolhidos. */
  openCheckout: (plan: PlanId, billing: BillingPeriod) => void;
}

const CheckoutContext = createContext<CheckoutContextValue | null>(null);

/**
 * Mantém o pop-up de captura montado uma única vez para toda a aplicação, de
 * modo que qualquer botão de compra possa abri-lo.
 */
export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<CheckoutSelection | null>(null);

  const openCheckout = useCallback((plan: PlanId, billing: BillingPeriod) => {
    setSelection({ plan, billing });
  }, []);

  const close = useCallback(() => setSelection(null), []);

  return (
    <CheckoutContext.Provider value={{ openCheckout }}>
      {children}
      <LeadCaptureModal selection={selection} onClose={close} />
    </CheckoutContext.Provider>
  );
}

export function useCheckout(): CheckoutContextValue {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error("useCheckout precisa estar dentro de <CheckoutProvider>");
  }
  return context;
}
