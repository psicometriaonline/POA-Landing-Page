import { Link } from "wouter";
import { GraduationCap, Mail, MapPin } from "lucide-react";

const footerLinks = {
  plataforma: [
    { label: "Ferramentas", href: "/ferramentas" },
    { label: "Cursos", href: "/cursos" },
    { label: "Comunidade", href: "/#comunidade" },
  ],
  institucional: [
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
    { label: "Blog", href: "#" },
  ],
  suporte: [
    { label: "Central de Ajuda", href: "#" },
    { label: "Termos de Uso", href: "#" },
    { label: "Privacidade", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[hsl(213,80%,12%)] text-white/80" data-testid="footer">
      <div className="container-narrow section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-7 h-7 text-white" />
              <span className="text-heading-3 text-white font-heading">POA</span>
            </div>
            <p className="text-body-sm text-white/60 leading-relaxed mb-6">
              Psicometria Online Academy - A maior plataforma de formacao em Psicometria do Brasil.
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
                    <Link href={link.href}>
                      <span
                        data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-body-sm text-white/50 transition-colors cursor-pointer"
                      >
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-body-sm text-white/40">
            2025 Psicometria Online Academy. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" data-testid="link-footer-termos-bottom" className="text-body-sm text-white/40 transition-colors">
              Termos
            </a>
            <a href="#" data-testid="link-footer-privacidade-bottom" className="text-body-sm text-white/40 transition-colors">
              Privacidade
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
