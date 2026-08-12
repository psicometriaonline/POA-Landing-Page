import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  buildCheckoutUrl,
  collectUtm,
  COUNTRIES,
  DEFAULT_COUNTRY,
  formatBrazilianPhone,
  splitBrazilianPhone,
} from "@/lib/checkout";
import type { BillingPeriod, PlanId } from "@shared/lead-schema";
import logoPath from "@assets/optimized/Academy_colorful_1771123552632.webp";
import avatarVanessa from "@assets/optimized/Vanessa_Cesnik_1771207282488.webp";
import avatarGustavo from "@assets/optimized/Gustavo_Pfister_Pirola_1771207282488.webp";
import avatarFrancine from "@assets/optimized/Francine-Alves_1771207282487.webp";

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const PLAN_NAMES: Record<PlanId, string> = {
  master: "Master",
  pro: "Pro",
  premium: "Premium",
};

const avatars = [
  { src: avatarVanessa, alt: "Vanessa" },
  { src: avatarGustavo, alt: "Gustavo" },
  { src: avatarFrancine, alt: "Francine" },
];

export interface CheckoutSelection {
  plan: PlanId;
  billing: BillingPeriod;
}

interface LeadCaptureModalProps {
  selection: CheckoutSelection | null;
  onClose: () => void;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}

/** Conteúdo mostrado na aba aberta enquanto o lead é registrado. */
const REDIRECT_PLACEHOLDER = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<title>Redirecionando…</title></head>
<body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;
font-family:system-ui,sans-serif;color:#0A2E76;background:#F4F5F7">
Levando você para o pagamento…</body></html>`;

export function LeadCaptureModal({ selection, onClose }: LeadCaptureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY.iso);
  const [phone, setPhone] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  const country = useMemo(
    () => COUNTRIES.find((item) => item.iso === countryIso) ?? DEFAULT_COUNTRY,
    [countryIso],
  );
  const isBrazil = country.dial === DEFAULT_COUNTRY.dial;

  // Cada abertura começa limpa, inclusive depois de um envio.
  useEffect(() => {
    if (!selection) return;
    setErrors({});
    setSubmitting(false);
    const timer = setTimeout(() => nameRef.current?.focus(), 120);
    return () => clearTimeout(timer);
  }, [selection]);

  function validate(): FieldErrors {
    const found: FieldErrors = {};
    const digits = phone.replace(/\D/g, "");

    if (name.trim().length < 2) found.name = "Informe seu nome completo";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      found.email = "Informe um e-mail válido";

    if (isBrazil) {
      if (!splitBrazilianPhone(digits)) found.phone = "Informe DDD e número";
    } else if (digits.length < 6) {
      found.phone = "Informe seu telefone";
    }

    return found;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!selection || submitting) return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // A aba precisa ser aberta ainda dentro do gesto de clique, antes de
    // qualquer await — caso contrário o navegador bloqueia o pop-up.
    const tab = window.open("", "_blank");
    tab?.document.write(REDIRECT_PLACEHOLDER);
    tab?.document.close();

    setSubmitting(true);

    const digits = phone.replace(/\D/g, "");
    const buyer = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      countryCode: country.dial,
      phone: digits,
    };

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...buyer,
          plan: selection.plan,
          billing: selection.billing,
          website: honeypot,
          utm: collectUtm(),
          pageUrl: window.location.href,
        }),
      });
    } catch {
      // Uma falha de rede não pode custar a venda: segue para o checkout.
    }

    window.dataLayer?.push({
      event: "lead_captured",
      plan: selection.plan,
      billing: selection.billing,
    });

    const url = buildCheckoutUrl(selection.plan, selection.billing, buyer);
    if (tab && !tab.closed) {
      tab.location.href = url;
    } else {
      window.location.href = url;
    }

    setSubmitting(false);
    onClose();
  }

  return (
    <Dialog open={selection !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="max-w-[480px] w-[calc(100%-2rem)] max-h-[92vh] overflow-y-auto rounded-3xl border-[#E2E5EA] bg-white p-6 sm:p-8 gap-0"
        data-testid="modal-lead-capture"
      >
        <img
          src={logoPath}
          alt="Psicometria Online Academy"
          className="h-7 w-auto"
          loading="eager"
        />

        <div className="mt-5 flex items-center gap-3">
          <span className="shrink-0 rounded-full border border-[#0065FF]/25 bg-[#0065FF]/8 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#0065FF]">
            O último passo
          </span>
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E2E5EA]"
            role="presentation"
          >
            <div className="h-full w-[70%] rounded-full bg-[#0065FF]" />
          </div>
          <span className="text-xs font-bold text-[#0065FF]">70%</span>
        </div>

        <DialogTitle className="mt-4 font-heading text-[22px] leading-tight font-bold text-[#0A2E76] sm:text-2xl">
          Você vai aprender análise de dados e{" "}
          <span className="bg-[#0065FF] px-1.5 py-0.5 text-white box-decoration-clone">
            nunca mais depender dos outros
          </span>
        </DialogTitle>

        <div className="mt-4 flex items-start gap-2">
          <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[#0050CC]">
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </span>
          <p className="text-sm leading-snug text-[hsl(215,15%,30%)]">
            Cursos, recursos e uma enorme estrutura de suporte, para você nunca
            mais passar trabalho sozinho(a)
          </p>
        </div>

        {selection && (
          <span className="mt-3 inline-flex w-fit items-center rounded-lg bg-[#F4F5F7] px-2.5 py-1 text-xs font-bold text-[#0A2E76]">
            Plano {PLAN_NAMES[selection.plan]} ·{" "}
            {selection.billing === "anual" ? "Anual" : "Mensal"}
          </span>
        )}

        <p className="mt-3 text-sm text-[hsl(215,15%,55%)]">
          Preencha os dados abaixo em menos de 10 segundos.
        </p>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3" noValidate>
          <Field error={errors.name}>
            <input
              ref={nameRef}
              type="text"
              autoComplete="name"
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass(errors.name)}
              data-testid="input-lead-name"
            />
          </Field>

          <Field error={errors.email}>
            <input
              type="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass(errors.email)}
              data-testid="input-lead-email"
            />
          </Field>

          <Field error={errors.phone}>
            <div className="flex gap-2">
              <div className="relative shrink-0">
                <select
                  value={countryIso}
                  onChange={(e) => {
                    setCountryIso(e.target.value);
                    setPhone("");
                  }}
                  aria-label="Código do país"
                  className="h-[52px] appearance-none rounded-2xl border border-[#E2E5EA] bg-[#FAFBFC] pl-3 pr-7 text-sm text-[#0A2E76] outline-none focus:border-[#0065FF]"
                  data-testid="select-lead-country"
                >
                  {COUNTRIES.map((option) => (
                    <option key={option.iso} value={option.iso}>
                      {option.flag} +{option.dial}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-[hsl(215,15%,55%)]">
                  ▾
                </span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="Telefone"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    isBrazil
                      ? formatBrazilianPhone(e.target.value)
                      : e.target.value.replace(/[^\d\s-]/g, "").slice(0, 15),
                  )
                }
                className={`${inputClass(errors.phone)} flex-1`}
                data-testid="input-lead-phone"
              />
            </div>
          </Field>

          {/* Armadilha para bots: invisível e fora da ordem de tabulação. */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
          />

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 flex h-[58px] w-full items-center justify-between gap-2 rounded-full bg-[#0065FF] pl-6 pr-2 font-heading font-bold text-white transition-colors hover:bg-[#0050CC] disabled:cursor-not-allowed disabled:opacity-70"
            data-testid="button-lead-submit"
          >
            <span className="text-left text-[15px] leading-tight">
              Quero aprender a analisar os meus dados
            </span>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0A2E76]">
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowUpRight className="h-4 w-4" />
              )}
            </span>
          </button>
        </form>

        <p className="mt-3 text-center text-xs text-[hsl(215,15%,55%)]">
          Você não precisa de nenhum conhecimento prévio
        </p>

        <div className="mt-4 flex items-center justify-center gap-3 border-t border-[#F4F5F7] pt-4">
          <div className="flex -space-x-2">
            {avatars.map((avatar) => (
              <img
                key={avatar.alt}
                src={avatar.src}
                alt=""
                loading="lazy"
                className="h-8 w-8 rounded-full border-2 border-white object-cover"
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-[#0A2E76]">
            +10 mil alunos saíram do zero
          </span>
        </div>

        <p className="mt-3 text-center text-[11px] leading-snug text-[hsl(215,15%,60%)]">
          Ao continuar, você concorda com a nossa{" "}
          <a
            href="/legal/privacidade"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            Política de Privacidade
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
}

function inputClass(error?: string): string {
  return [
    "h-[52px] w-full rounded-2xl border bg-[#FAFBFC] px-4 text-[15px] text-[#0A2E76]",
    "placeholder:text-[hsl(215,15%,60%)] outline-none transition-colors",
    error ? "border-[#F34266]" : "border-[#E2E5EA] focus:border-[#0065FF]",
  ].join(" ");
}

function Field({
  error,
  children,
}: {
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {error && (
        <p className="mt-1 pl-1 text-xs text-[#F34266]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
