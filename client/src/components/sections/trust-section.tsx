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
    <section className="bg-white py-12 border-y border-[#E2E5EA] overflow-hidden">
      <div className="container-narrow mb-8">
        <p className="text-center text-[#0A2E76] font-medium text-body-sm md:text-body uppercase tracking-wider opacity-80">
          Confiada por pesquisadores das melhores universidades do Brasil e do Mundo
        </p>
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
                loading="lazy"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
