import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Users, Video, ArrowRight } from "lucide-react";
import { PlansLink } from "@/components/ui/plans-link";

const channels = [
  {
    icon: MessageCircle,
    title: "Plataforma de aulas:",
    description:
      "Ficou com alguma dúvida na aula que está assistindo? Basta comentar abaixo. Todas as perguntas são respondidas.",
  },
  {
    icon: Mail,
    title: "Suporte via e-mail:",
    description:
      "Está com uma dúvida maior, sobre sua pesquisa, que não é referente a uma aula específica? Envie-nos por e-mail. Temos uma pessoa dedicada só para te ajudar.",
  },
  {
    icon: Users,
    title: "Comunidade de Alunos:",
    description:
      "Aqui está a nossa inteligência coletiva. Na nossa comunidade rola de tudo: ajuda mútua, parcerias de pesquisa, consultorias e negócios.",
  },
  {
    icon: Video,
    title: "Encontros semanais ao vivo no Zoom",
    description:
      "Toda semana, encontro ao vivo para tirar suas dúvidas específicas com a nossa equipe.",
  },
];

export function SupportSection() {
  return (
    <section
      id="suporte"
      data-testid="section-support"
      className="section-padding"
      style={{ backgroundColor: "#F4F5F7" }}
    >
      <div className="container-narrow">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2
            className="text-[1.75rem] md:text-display-sm font-heading font-bold text-[#0A2E76] mb-5"
            data-testid="text-support-title"
          >
            Suporte como você nunca viu{" "}
            <br className="hidden md:block" />
            em nenhum lugar
          </h2>
          <p
            className="text-body-lg text-[hsl(215,15%,45%)] max-w-3xl mx-auto leading-relaxed"
            data-testid="text-support-subtitle"
          >
            Você vai aprender muito conosco, mas terá dúvidas no meio do caminho. Por isso, oferecemos acesso a <span className="font-bold text-[#0A2E76]">quatro (4) canais de suporte</span>.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {channels.map((channel, idx) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card
                className="p-4 md:p-6 bg-white border-[#E2E5EA] h-full flex flex-col"
                data-testid={`card-support-${idx}`}
              >
                <div className="flex md:flex-col items-start gap-3 md:gap-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center shrink-0 md:mb-5">
                    <channel.icon className="w-4 h-4 md:w-5 md:h-5 text-[#0065FF]" />
                  </div>
                  <h3 className="text-sm md:text-base font-bold text-[#0065FF] font-heading leading-snug md:mb-3">
                    {channel.title}
                  </h3>
                </div>
                <p className="text-sm text-[hsl(215,15%,45%)] leading-relaxed mt-2 md:mt-0">
                  {channel.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex justify-center mt-8 md:mt-10"
        >
          <PlansLink data-testid="button-support-cta">
            <Button
              className="bg-[#0065FF] text-white font-semibold px-8 rounded-full border border-[#0065FF] gap-2 text-base"
            >
              Comece agora
              <ArrowRight className="w-4 h-4" />
            </Button>
          </PlansLink>
        </motion.div>
      </div>
    </section>
  );
}

export default SupportSection;
