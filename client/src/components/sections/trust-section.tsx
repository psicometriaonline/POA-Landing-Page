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
        <h2
          className="text-[1.375rem] md:text-display-sm font-heading font-bold text-[#0A2E76] text-center"
          data-testid="text-home-trust-title"
        >
          Pesquisadores das melhores universidades do Brasil e do Mundo confiam na{" "}
          <br className="hidden md:inline" />
          Psicometria Online Academy
        </h2>
      </div>

      <div className="hidden md:flex relative">
        <div className="flex gap-20 items-center whitespace-nowrap px-6 animate-scroll-marquee">
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
                className="h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden overflow-hidden">
        <div className="flex gap-10 items-center whitespace-nowrap animate-scroll-marquee-mobile">
          {scrollItems.map((uni, idx) => (
            <div
              key={`mobile-${uni.name}-${idx}`}
              className="flex-shrink-0 flex items-center justify-center"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                width={48}
                height={48}
                className="h-10 w-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
