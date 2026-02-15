import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Sparkle({ delay, x, y, size }: { delay: number; x: string; y: string; size: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        repeatDelay: Math.random() * 3 + 1.5,
        ease: "easeInOut",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z"
          fill="white"
          fillOpacity="0.7"
        />
      </svg>
    </motion.div>
  );
}

const sparkles = [
  { delay: 0, x: "10%", y: "20%", size: 12 },
  { delay: 0.8, x: "85%", y: "15%", size: 16 },
  { delay: 1.4, x: "25%", y: "75%", size: 10 },
  { delay: 0.3, x: "70%", y: "70%", size: 14 },
  { delay: 2.0, x: "50%", y: "10%", size: 10 },
  { delay: 1.0, x: "15%", y: "50%", size: 8 },
  { delay: 1.8, x: "90%", y: "55%", size: 12 },
  { delay: 0.5, x: "40%", y: "85%", size: 10 },
  { delay: 2.5, x: "60%", y: "30%", size: 8 },
  { delay: 1.2, x: "5%", y: "80%", size: 14 },
  { delay: 0.7, x: "78%", y: "40%", size: 10 },
  { delay: 1.6, x: "35%", y: "18%", size: 12 },
];

const avatarColors = [
  "bg-blue-500", "bg-emerald-500", "bg-amber-500",
  "bg-purple-500", "bg-rose-500", "bg-cyan-500",
];
const avatarInitials = ["MR", "LS", "AC", "JP", "RF", "TC"];

function GradientBorder() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id="border-gradient-left" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FF3366">
              <animate attributeName="stop-color" values="#FF3366;#FF6633;#FF3366" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#CC33FF">
              <animate attributeName="stop-color" values="#CC33FF;#FF3366;#CC33FF" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#0065FF">
              <animate attributeName="stop-color" values="#0065FF;#CC33FF;#0065FF" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
          <linearGradient id="border-gradient-right" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0065FF">
              <animate attributeName="stop-color" values="#0065FF;#CC33FF;#0065FF" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="50%" stopColor="#3366FF">
              <animate attributeName="stop-color" values="#3366FF;#0065FF;#3366FF" dur="6s" repeatCount="indefinite" />
            </stop>
            <stop offset="100%" stopColor="#0065FF">
              <animate attributeName="stop-color" values="#0065FF;#3366FF;#0065FF" dur="6s" repeatCount="indefinite" />
            </stop>
          </linearGradient>
        </defs>
        <line x1="0" y1="0" x2="0" y2="100%" stroke="url(#border-gradient-left)" strokeWidth="2" />
        <line x1="0" y1="100%" x2="30%" y2="100%" stroke="url(#border-gradient-left)" strokeWidth="2" />
        <line x1="100%" y1="0" x2="100%" y2="100%" stroke="url(#border-gradient-right)" strokeWidth="2" />
        <line x1="70%" y1="100%" x2="100%" y2="100%" stroke="url(#border-gradient-right)" strokeWidth="2" />
      </svg>
    </div>
  );
}

export function CtaSection() {
  return (
    <section
      className="relative overflow-hidden bg-[hsl(213,80%,8%)]"
      data-testid="section-cta"
    >
      <div className="absolute inset-0">
        {sparkles.map((s, i) => (
          <Sparkle key={i} {...s} />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0065FF]/10 via-transparent to-[#0065FF]/5 pointer-events-none" />

      <div className="container-narrow py-20 md:py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-10"
        >
          <div className="flex items-center">
            <div className="flex -space-x-3">
              {avatarInitials.map((initials, i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full ${avatarColors[i]} border-2 border-[hsl(213,80%,8%)] flex items-center justify-center text-white text-xs font-bold`}
                  data-testid={`avatar-cta-${i}`}
                >
                  {initials}
                </div>
              ))}
            </div>
            <div className="ml-2 bg-white/15 backdrop-blur-sm text-white text-xs font-bold rounded-full px-3 py-2 border border-white/20">
              +2.5K
            </div>
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto px-8 md:px-16 py-14 md:py-20">
          <GradientBorder />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white leading-tight tracking-tight"
              data-testid="text-cta-title"
            >
              A Plataforma de Pesquisa Quantitativa que vai transformar a sua carreira acadêmica.
            </h2>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-10"
            >
              <a
                href="https://psicometriaonline.com.br/academy/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="button-cta-start"
              >
                <Button
                  className="bg-white text-[#0A2E76] font-semibold px-8 rounded-full border border-white/80 gap-2 text-base"
                >
                  Começar
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
