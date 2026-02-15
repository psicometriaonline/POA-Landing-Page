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
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
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
    </section>
  );
}
