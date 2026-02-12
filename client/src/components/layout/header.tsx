import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoPath from "@assets/image_1770909567089.png";

const navItems = [
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Cursos", href: "/cursos" },
  { label: "Planos", href: "/planos" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      data-testid="header"
      className="fixed top-0 left-0 right-0 z-50 bg-[hsl(213,80%,8%)] border-b border-white/10"
    >
      <div className="container-narrow">
        <div className="flex items-center justify-between gap-4 h-16 md:h-[72px]">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={logoPath}
                alt="Psicometria Online Academy"
                className="h-10 md:h-11 w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                  className={`px-4 py-2 rounded-md text-body-sm font-medium transition-colors cursor-pointer ${
                    location === item.href
                      ? "text-white"
                      : "text-white/60"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/entrar">
              <span
                data-testid="button-login"
                className="px-4 py-2 rounded-md text-body-sm font-medium text-white/60 transition-colors cursor-pointer"
              >
                Entrar
              </span>
            </Link>
            <Button
              data-testid="button-signup"
              className="bg-[#0065FF] text-white border-[#0065FF] font-semibold"
            >
              Comece Agora
            </Button>
          </div>

          <button
            data-testid="button-mobile-menu"
            className="md:hidden p-2 rounded-md text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[hsl(213,80%,8%)] border-t border-white/10 overflow-hidden"
          >
            <div className="container-narrow py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    className={`block px-4 py-3 rounded-md text-body font-medium cursor-pointer ${
                      location === item.href
                        ? "text-white bg-white/10"
                        : "text-white/60"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-white/10 mt-2">
                <Link href="/entrar">
                  <span
                    data-testid="button-mobile-login"
                    className="block px-4 py-3 rounded-md text-body font-medium text-white/60 cursor-pointer text-center"
                  >
                    Entrar
                  </span>
                </Link>
                <Button
                  className="w-full bg-[#0065FF] text-white border-[#0065FF] font-semibold"
                  data-testid="button-mobile-signup"
                >
                  Comece Agora
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
