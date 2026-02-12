import { motion } from "framer-motion";

const universities = [
  { name: "USP", logo: "/logos/usp.png" },
  { name: "UFRJ", logo: "/logos/ufrj.png" },
  { name: "UNICAMP", logo: "/logos/unicamp.png" },
  { name: "UFMG", logo: "/logos/ufmg.png" },
  { name: "UNIFESP", logo: "/logos/unifesp.png" },
  { name: "Minho", logo: "/logos/minho.png" },
  { name: "Porto", logo: "/logos/porto.png" },
  { name: "Dartmouth", logo: "/logos/dartmouth.png" },
  { name: "Utrecht", logo: "/logos/utrecht.png" },
  { name: "UC Davis", logo: "/logos/ucdavis.png" },
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
          className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
          animate={{
            x: ["0%", "-33.33%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {scrollItems.map((uni, idx) => (
            <div
              key={`${uni.name}-${idx}`}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                className="h-8 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
