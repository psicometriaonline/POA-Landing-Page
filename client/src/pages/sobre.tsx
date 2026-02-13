import { motion } from "framer-motion";

export default function Sobre() {
  return (
    <main data-testid="page-sobre" className="pt-28">
      <section className="section-padding" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1
              className="text-display-sm md:text-display-md font-heading font-bold text-[#0A2E76] leading-[1.1] mb-6"
              data-testid="text-sobre-title"
            >
              Sobre Nós
            </h1>
            <p
              className="text-body-lg text-[hsl(215,15%,45%)] max-w-3xl mx-auto leading-relaxed"
              data-testid="text-sobre-subtitle"
            >
              Conheça a história e a missão da Psicometria Online Academy.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
