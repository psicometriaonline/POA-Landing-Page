import { motion } from "framer-motion";

const universities = [
  { name: "USP", logo: "/logos/1.webp" },
  { name: "UFRJ", logo: "/logos/2.webp" },
  { name: "UNICAMP", logo: "/logos/3.webp" },
  { name: "UFMG", logo: "/logos/4.webp" },
  { name: "UNIFESP", logo: "/logos/5.webp" },
  { name: "UFC", logo: "/logos/6.webp" },
  { name: "UFSC", logo: "/logos/7.webp" },
  { name: "UnB", logo: "/logos/8.webp" },
  { name: "UFRGS", logo: "/logos/9.webp" },
  { name: "UFSCar", logo: "/logos/10.webp" },
  { name: "UFCG", logo: "/logos/11.webp" },
  { name: "Universidade do Minho", logo: "/logos/12.webp" },
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
              className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-50 hover:opacity-100"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
