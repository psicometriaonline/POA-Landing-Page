import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MessageCircle, Mail, Users, Video } from "lucide-react";

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
          className="text-center mb-12"
        >
          <h2
            className="text-heading-1 md:text-display-sm font-heading font-bold text-[#0A2E76] leading-[1.15] mb-5"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {channels.map((channel, idx) => (
            <motion.div
              key={channel.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <Card
                className="p-6 bg-white border-[#E2E5EA] h-full flex flex-col"
                data-testid={`card-support-${idx}`}
              >
                <div className="w-12 h-12 rounded-lg bg-[#F4F5F7] border border-[#E2E5EA] flex items-center justify-center mb-5">
                  <channel.icon className="w-5 h-5 text-[#0065FF]" />
                </div>
                <h3 className="text-base font-bold text-[#0065FF] font-heading mb-3 leading-snug">
                  {channel.title}
                </h3>
                <p className="text-sm text-[hsl(215,15%,45%)] leading-relaxed">
                  {channel.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
