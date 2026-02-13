import { motion } from "framer-motion";
import { Award } from "lucide-react";
import certificateImg from "@assets/Im-2-copiar_1770941008351.webp";

export function CertificateSection() {
  return (
    <section data-testid="section-certificate" className="relative" style={{ backgroundColor: "#F4F5F7" }}>
      <div className="absolute inset-x-0 top-0 h-[80%]" style={{ background: "linear-gradient(135deg, #0A2E76 0%, #0045B5 100%)" }} />

      <div className="relative section-padding">
        <div className="container-narrow">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2
              className="text-heading-1 md:text-display-sm font-heading font-bold text-white leading-[1.15] mb-4"
              data-testid="text-certificate-title"
            >
              Certificado +300 horas
            </h2>
            <p
              className="text-body-lg text-white/80 max-w-2xl mx-auto leading-relaxed"
              data-testid="text-certificate-subtitle"
            >
              A dedicação que você vai ter na nossa plataforma{" "}
              <span className="font-bold text-white">pode e deve ser comprovada.</span>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="bg-white rounded-2xl border border-[#E2E5EA] shadow-lg px-5 py-3 md:px-7 md:py-4 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
          >
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#0065FF]" />
                </div>
                <h3 className="text-xl font-heading font-bold text-[#0A2E76]">
                  Currículo potencializado
                </h3>
              </div>
              <p className="text-body-lg text-[hsl(215,15%,35%)] leading-relaxed mb-6">
                Você recebe certificados em{" "}
                <span className="underline decoration-[#0065FF] underline-offset-4 font-semibold text-[#0A2E76]">
                  todos os cursos concluídos, mais de 300 horas certificadas
                </span>
                , válidas como formação complementar no currículo e nos processos seletivos.
              </p>
              <p className="text-body-lg text-[hsl(215,15%,35%)] leading-relaxed">
                Até professores de universidades europeias incluem essa formação em seus currículos.
              </p>
            </div>

            <div className="flex justify-center">
              <img
                src={certificateImg}
                alt="Certificados da Psicometria Online Academy"
                className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-xl"
                data-testid="img-certificate"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
