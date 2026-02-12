import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoPath from "@assets/image_1770907347590.png";

const navItems = [
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Cursos", href: "/cursos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      data-testid="header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-[hsl(215,25%,7%)]/95 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-narrow">
        <div className="flex items-center justify-between gap-4 h-16 md:h-20">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={logoPath}
                alt="Psicometria Online Academy"
                className="h-10 md:h-12 w-auto object-contain"
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
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" data-testid="button-login">
              Entrar
            </Button>
            <Button data-testid="button-signup">
              Comece Agora
            </Button>
          </div>

          <button
            data-testid="button-mobile-menu"
            className="md:hidden p-2 rounded-md text-foreground"
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
            className="md:hidden bg-white dark:bg-[hsl(215,25%,7%)] border-b border-border overflow-hidden"
          >
            <div className="container-narrow py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span
                    data-testid={`link-mobile-${item.label.toLowerCase()}`}
                    className={`block px-4 py-3 rounded-md text-body font-medium transition-colors cursor-pointer ${
                      location === item.href
                        ? "text-foreground bg-accent"
                        : "text-muted-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              ))}
              <div className="flex flex-col gap-2 pt-3 border-t border-border mt-2">
                <Button variant="outline" className="w-full" data-testid="button-mobile-login">
                  Entrar
                </Button>
                <Button className="w-full" data-testid="button-mobile-signup">
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
