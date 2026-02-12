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
      className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4"
    >
      <div className="w-full max-w-6xl bg-[hsl(213,80%,8%)]/95 backdrop-blur-md border border-[#0065FF]/30 rounded-full px-6 md:px-10 shadow-lg">
        <div className="flex items-center justify-between gap-4 h-16 md:h-[72px]">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={logoPath}
                alt="Psicometria Online Academy"
                className="h-9 md:h-10 w-auto object-contain"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2" data-testid="nav-desktop">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  data-testid={`link-nav-${item.label.toLowerCase()}`}
                  className={`px-4 py-2 rounded-md text-body-sm font-medium transition-all duration-200 cursor-pointer ${
                    location === item.href
                      ? "text-white"
                      : "text-white hover:text-[#0065FF]"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/entrar">
              <span
                data-testid="button-login"
                className="px-4 py-2 rounded-md text-body-sm font-medium text-white transition-colors cursor-pointer hover:text-[#0065FF]"
              >
                Entrar
              </span>
            </Link>
            <Button
              data-testid="button-signup"
              className="bg-[#0065FF] text-white border-[#0065FF] font-semibold rounded-full px-6 hover:bg-[#0065FF]/90 transition-all"
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
