import { Link } from "wouter";
import { Mail } from "lucide-react";
import logoPath from "@assets/image_1770909567089.png";

const footerLinks = {
  plataforma: [
    { label: "Ferramentas", href: "/#ferramentas" },
    { label: "Cursos", href: "/#cursos" },
    { label: "Suporte", href: "/#suporte" },
  ],
  institucional: [
    { label: "Planos", href: "/planos" },
    { label: "Sobre Nós", href: "/sobre" },
  ],
  legal: [
    { label: "Termos de Uso", href: "/legal/termos" },
    { label: "Política de Privacidade", href: "/legal/privacidade" },
  ],
};

function scrollToHash(hash: string) {
  const el = document.getElementById(hash);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

function handleFooterClick(e: React.MouseEvent, href: string) {
  if (href.startsWith("/#")) {
    const hash = href.slice(2);
    if (window.location.pathname === "/") {
      e.preventDefault();
      scrollToHash(hash);
    }
  }
}

export function Footer() {
  return (
    <footer className="bg-[hsl(213,80%,12%)] text-white/80" data-testid="footer">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={logoPath}
                alt="Psicometria Online Academy"
                className="h-9 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-body-sm text-white/60 leading-relaxed mb-6">
              Psicometria Online Academy - A maior plataforma de formação em Psicometria do Brasil.
            </p>
            <div className="flex flex-col gap-2 text-body-sm text-white/50">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>contato@psicometriaonline.com.br</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-body-sm font-semibold text-white uppercase tracking-wider mb-4">
                {category}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/#") ? (
                      <a
                        href={link.href}
                        onClick={(e) => handleFooterClick(e, link.href)}
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-body-sm text-white/50 transition-colors cursor-pointer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>
                        <span
                          data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-body-sm text-white/50 transition-colors cursor-pointer"
                        >
                          {link.label}
                        </span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-white/40">
            2026 Psicometria Online Academy. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/legal/termos">
              <span data-testid="link-footer-termos-bottom" className="text-body-sm text-white/40 transition-colors cursor-pointer">
                Termos
              </span>
            </Link>
            <Link href="/legal/privacidade">
              <span data-testid="link-footer-privacidade-bottom" className="text-body-sm text-white/40 transition-colors cursor-pointer">
                Privacidade
              </span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
