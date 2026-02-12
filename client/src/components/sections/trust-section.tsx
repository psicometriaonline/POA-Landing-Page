import { motion } from "framer-motion";

const universities = [
  { name: "USP", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/a/a2/Logotipo_da_USP.svg/1200px-Logotipo_da_USP.svg.png" },
  { name: "UFRJ", logo: "https://upload.wikimedia.org/wikipedia/pt/d/d4/Logotipo_UFRJ.png" },
  { name: "UNICAMP", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/b/b2/Logo_Unicamp.svg/1200px-Logo_Unicamp.svg.png" },
  { name: "UFMG", logo: "https://upload.wikimedia.org/wikipedia/pt/d/d7/UFMG_logo.png" },
  { name: "UNIFESP", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/d/d1/Logotipo_da_Unifesp.svg/1200px-Logotipo_da_Unifesp.svg.png" },
  { name: "UFC", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/f/f9/Bras%C3%A3o_UFC.png/200px-Bras%C3%A3o_UFC.png" },
  { name: "UFSC", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/1/13/Logo_UFSC.svg/1200px-Logo_UFSC.svg.png" },
  { name: "UnB", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/0/01/UnB_logo.svg/1200px-UnB_logo.svg.png" },
  { name: "UFRGS", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/1/10/UFRGS_logo.svg/1200px-UFRGS_logo.svg.png" },
  { name: "UFSCar", logo: "https://upload.wikimedia.org/wikipedia/pt/thumb/c/cd/Logo_UFSCar.svg/1200px-Logo_UFSCar.svg.png" },
  { name: "UFCG", logo: "https://upload.wikimedia.org/wikipedia/pt/a/a5/UFCG_logo.png" },
  { name: "Minho", logo: "https://upload.wikimedia.org/wikipedia/pt/a/a9/Universidade_do_Minho_logo.png" },
  { name: "Porto", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Uporto_logo.svg/1200px-Uporto_logo.svg.png" },
  { name: "Dartmouth", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Dartmouth_College_shield.svg/1200px-Dartmouth_College_shield.svg.png" },
  { name: "Utrecht", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/UU_logo_color.svg/1200px-UU_logo_color.svg.png" },
  { name: "UC Davis", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/UC_Davis_logo.svg/1200px-UC_Davis_logo.svg.png" },
];

export function TrustSection() {
  // Triple the list to ensure smooth infinite scroll
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
