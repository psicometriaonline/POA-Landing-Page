import { motion } from "framer-motion";
import certificateImg from "@assets/Im-2-copiar_1770941008351.webp";

export function CertificateSection() {
  return (
    <section
      data-testid="section-certificate"
      className="section-padding"
      style={{ background: "linear-gradient(135deg, #0A2E76 0%, #0045B5 100%)" }}
    >
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-body-lg text-white/85 leading-relaxed mb-6">
              Você recebe certificados em{" "}
              <span className="underline decoration-[#0065FF] underline-offset-4 font-semibold text-white">
                todos os cursos concluídos, mais de 300 horas certificadas
              </span>
              , válidas como formação complementar no currículo e nos processos seletivos.
            </p>
            <p className="text-body-lg text-[#0065FF] font-bold leading-relaxed">
              Ouro puro, né? Até professores de universidades europeias incluem essa formação em seus currículos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center"
          >
            <img
              src={certificateImg}
              alt="Certificados da Psicometria Online Academy"
              className="w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
              data-testid="img-certificate"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center"
        >
          <h3
            className="text-xl md:text-2xl font-heading font-bold text-[#0065FF] mb-3"
            data-testid="text-certificate-cta-title"
          >
            Melhore a qualidade do seu currículo
          </h3>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            <span className="font-bold text-white">Mais de 300 horas de formação complementar</span>, em mais de 30 certificados, para potencializar o seu currículo.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
