import { motion } from "framer-motion";

const universities = [
  { name: "USP", logo: "/logos/USP.webp" },
  { name: "UFRJ", logo: "/logos/UFRJ.webp" },
  { name: "UNICAMP", logo: "/logos/UNICAMP.webp" },
  { name: "UFMG", logo: "/logos/UFMG.webp" },
  { name: "UFRGS", logo: "/logos/UFRGS.webp" },
  { name: "UFSCar", logo: "/logos/UFSCAR.webp" },
  { name: "UMass Dartmouth", logo: "/logos/Dartmouth.webp" },
  { name: "Utrecht University", logo: "/logos/Utrecht.webp" },
  { name: "UC Davis", logo: "/logos/Davis.webp" },
  { name: "Universidade do Minho", logo: "/logos/Minho.webp" },
  { name: "Universidade do Porto", logo: "/logos/Porto.webp" },
];

export function TrustSection() {
  const scrollItems = [...universities, ...universities, ...universities];

  return (
    <section className="bg-white py-16 md:py-20 border-y border-[#E2E5EA] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:text-3xl md:text-[2.1rem] font-heading font-bold text-[#0A2E76] text-center leading-tight"
          data-testid="text-home-trust-title"
        >
          Pesquisadores das melhores universidades do Brasil e do Mundo confiam na Psicometria Online Academy
        </motion.h2>
      </div>

      <div className="relative flex">
        <motion.div
          className="flex gap-12 md:gap-20 items-center whitespace-nowrap px-6"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {scrollItems.map((uni, idx) => (
            <div
              key={`${uni.name}-${idx}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                width={56}
                height={56}
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
