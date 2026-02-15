import { Link } from "wouter";
import logoPath from "@assets/Academy_colorful_1771123552632.png";

export default function Privacidade() {
  return (
    <main data-testid="page-privacidade" className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <img
              src={logoPath}
              alt="Psicometria Online Academy"
              className="h-12 md:h-14 w-auto object-contain cursor-pointer"
              data-testid="img-privacidade-logo"
            />
          </Link>
        </div>

        <article className="prose prose-slate max-w-none">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#0A2E76] text-center mb-1" data-testid="text-privacidade-title">
            POLÍTICA DE PRIVACIDADE
          </h1>
          <p className="text-center text-[#0A2E76]/70 font-semibold text-lg mb-2">PSICOMETRIA ONLINE ACADEMY</p>
          <p className="text-center text-sm text-[hsl(215,15%,55%)] mb-10">Última atualização: 31 de outubro de 2025</p>

          <Section title="1. INTRODUÇÃO">
            <p>A Psicometria Online Academy ("Academy", "nós") tem compromisso com a proteção da privacidade e dos dados pessoais de seus usuários ("Usuário").</p>
            <p>Esta Política descreve como coletamos, utilizamos, armazenamos, tratamos e protegemos as informações pessoais fornecidas em nossa plataforma educacional, sites, aplicativos e demais serviços digitais.</p>
            <p>Ao utilizar nossos serviços, o Usuário concorda com esta Política e com o tratamento de seus dados conforme aqui descrito.</p>
          </Section>

          <Section title="2. PRINCÍPIOS GERAIS">
            <p>O tratamento de dados realizado pela Academy observa os princípios previstos na Lei nº 13.709/2018 (LGPD), incluindo:</p>
            <ul>
              <li>Finalidade específica e legítima;</li>
              <li>Necessidade e minimização da coleta;</li>
              <li>Transparência;</li>
              <li>Segurança e prevenção;</li>
              <li>Responsabilização e prestação de contas.</li>
            </ul>
          </Section>

          <Section title="3. DADOS COLETADOS">
            <h3 className="text-base font-heading font-semibold text-[#0A2E76] mt-4 mb-2">3.1. Dados fornecidos diretamente pelo Usuário</h3>
            <p>Durante o cadastro ou uso da Plataforma, poderemos coletar:</p>
            <ul>
              <li>Nome completo;</li>
              <li>E-mail;</li>
              <li>CPF/CNPJ (quando aplicável para emissão fiscal);</li>
              <li>Endereço;</li>
              <li>Dados de pagamento (intermediados por gateways externos);</li>
              <li>Instituição de vínculo (quando informado voluntariamente);</li>
              <li>Informações acadêmicas e de perfil profissional;</li>
              <li>Dados inseridos em formulários, chats, comentários ou comunicações com o suporte.</li>
            </ul>

            <h3 className="text-base font-heading font-semibold text-[#0A2E76] mt-4 mb-2">3.2. Dados coletados automaticamente</h3>
            <p>Durante a navegação, poderemos registrar informações como:</p>
            <ul>
              <li>Endereço IP e geolocalização aproximada;</li>
              <li>Tipo e versão do navegador;</li>
              <li>Sistema operacional;</li>
              <li>Páginas acessadas, tempo de permanência e ações executadas;</li>
              <li>Cookies e identificadores anônimos de sessão.</li>
            </ul>

            <h3 className="text-base font-heading font-semibold text-[#0A2E76] mt-4 mb-2">3.3. Dados derivados do uso de funcionalidades inteligentes</h3>
            <p>A Academy poderá empregar tecnologias de Inteligência Artificial (IA) e Modelos de Linguagem (LLMs) para otimizar a experiência do Usuário, tais como:</p>
            <ul>
              <li>recomendações de conteúdo;</li>
              <li>personalização de materiais;</li>
              <li>respostas automáticas ou suporte interativo;</li>
              <li>sugestões de escrita e análise textual.</li>
            </ul>
            <p>Essas ferramentas processam dados de forma automatizada e restrita ao contexto de uso, sem utilização para fins publicitários ou de venda a terceiros, e sempre em conformidade com a LGPD.</p>
          </Section>

          <Section title="4. FINALIDADE DO TRATAMENTO DE DADOS">
            <p>Os dados pessoais são tratados para as seguintes finalidades legítimas:</p>
            <ul>
              <li>Permitir o acesso à plataforma e suas funcionalidades;</li>
              <li>Executar o contrato de prestação de serviços educacionais;</li>
              <li>Emitir notas fiscais e cumprir obrigações legais;</li>
              <li>Personalizar conteúdos e recomendações de cursos;</li>
              <li>Prestar suporte técnico e atendimento ao Usuário;</li>
              <li>Enviar comunicações institucionais, administrativas e educacionais;</li>
              <li>Realizar análises estatísticas e melhorias contínuas da plataforma;</li>
              <li>Garantir segurança e prevenção a fraudes;</li>
              <li>Cumprir ordens judiciais e exigências legais.</li>
            </ul>
          </Section>

          <Section title="5. COMPARTILHAMENTO DE DADOS">
            <p>A Academy não comercializa dados pessoais de seus usuários. O compartilhamento poderá ocorrer apenas:</p>
            <ul>
              <li>a) Com parceiros operacionais estritamente necessários à execução do serviço (ex.: processadores de pagamento, hospedagem, suporte técnico, e-mail marketing);</li>
              <li>b) Com autoridades públicas, mediante requisição legal;</li>
              <li>c) Com sistemas de IA e provedores tecnológicos, exclusivamente para execução de funcionalidades específicas e em ambiente seguro;</li>
              <li>d) Com auditores ou consultores jurídicos, quando indispensável à defesa de direitos da Academy.</li>
            </ul>
            <p>Todos os parceiros são contratualmente obrigados a cumprir padrões de confidencialidade e segurança compatíveis com esta Política.</p>
          </Section>

          <Section title="6. BASES LEGAIS PARA O TRATAMENTO">
            <p>O tratamento dos dados pessoais se baseia nas seguintes hipóteses da LGPD:</p>
            <ul>
              <li>Execução de contrato (art. 7º, V);</li>
              <li>Cumprimento de obrigação legal ou regulatória (art. 7º, II);</li>
              <li>Exercício regular de direitos (art. 7º, VI);</li>
              <li>Legítimo interesse (art. 7º, IX), quando aplicável;</li>
              <li>Consentimento expresso (art. 7º, I), quando necessário para comunicações, newsletters e recursos opcionais.</li>
            </ul>
          </Section>

          <Section title="7. ARMAZENAMENTO E SEGURANÇA">
            <p>7.1. Os dados são armazenados em servidores com padrões internacionais de segurança e criptografia.</p>
            <p>7.2. Adotamos medidas técnicas e administrativas adequadas para proteger contra acesso não autorizado, perda, destruição ou alteração indevida.</p>
            <p>7.3. Apesar dos esforços, nenhum sistema é 100% seguro; o Usuário reconhece e aceita os riscos inerentes ao uso de serviços digitais.</p>
            <p>7.4. Caso ocorra incidente de segurança que possa acarretar risco relevante, a Academy comunicará à ANPD e aos titulares afetados, conforme exigido pela legislação.</p>
          </Section>

          <Section title="8. RETENÇÃO E ELIMINAÇÃO DOS DADOS">
            <p>Os dados pessoais serão armazenados apenas pelo tempo necessário para cumprir as finalidades desta Política e obrigações legais ou contratuais. Encerrado o prazo, serão eliminados ou anonimizados, salvo se houver necessidade de preservação por exigência legal ou judicial.</p>
          </Section>

          <Section title="9. DIREITOS DO TITULAR DOS DADOS">
            <p>O Usuário pode, a qualquer momento, exercer seus direitos previstos na LGPD, incluindo:</p>
            <ul>
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos dados;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Portabilidade dos dados;</li>
              <li>Eliminação de dados tratados com consentimento;</li>
              <li>Informação sobre compartilhamento;</li>
              <li>Revogação do consentimento;</li>
              <li>Reclamação junto à ANPD.</li>
            </ul>
            <p>Para exercer tais direitos, o Usuário poderá entrar em contato pelo e-mail <a href="mailto:privacidade@psicometriaonline.com" className="text-[#0065FF] underline">privacidade@psicometriaonline.com</a>.</p>
          </Section>

          <Section title="10. COOKIES E TECNOLOGIAS DE RASTREAMENTO">
            <p>10.1. Utilizamos cookies para melhorar a experiência do Usuário, armazenar preferências e medir o desempenho da plataforma.</p>
            <p>10.2. O Usuário poderá configurar seu navegador para recusar cookies, mas isso poderá limitar certas funcionalidades.</p>
          </Section>

          <Section title="11. TRANSFERÊNCIA INTERNACIONAL DE DADOS">
            <p>Poderá haver transferência internacional de dados para servidores localizados fora do Brasil (ex.: provedores de nuvem, ferramentas de IA e comunicação), sempre observando cláusulas contratuais padrão e garantias adequadas de proteção.</p>
          </Section>

          <Section title="12. USO DE INTELIGÊNCIA ARTIFICIAL">
            <p>12.1. Algumas funcionalidades poderão utilizar sistemas de IA e aprendizado de máquina para fornecer recomendações personalizadas, apoio à escrita ou feedback automatizado.</p>
            <p>12.2. O tratamento é realizado apenas com dados necessários ao contexto de uso, sem criação de perfis para fins de marketing ou decisões automatizadas que produzam efeitos jurídicos sobre o Usuário.</p>
            <p>12.3. O Usuário será sempre informado quando o tratamento automatizado for relevante à sua experiência.</p>
          </Section>

          <Section title="13. ALTERAÇÕES DESTA POLÍTICA">
            <p>A Academy poderá atualizar esta Política periodicamente. A versão mais recente estará sempre disponível na Plataforma, e o uso contínuo dos serviços implica ciência e concordância com as alterações.</p>
          </Section>

          <Section title="14. CONTATO E ENCARREGADO DE DADOS (DPO)">
            <p>Em caso de dúvidas, solicitações ou exercício de direitos previstos na LGPD, o Usuário poderá contatar o Encarregado de Proteção de Dados (DPO) da Academy:</p>
            <p>Nome: Encarregado de Dados – Psicometria Online Academy</p>
            <p>E-mail: <a href="mailto:privacidade@psicometriaonline.com" className="text-[#0065FF] underline">privacidade@psicometriaonline.com</a></p>
          </Section>

          <Section title="15. LEI APLICÁVEL E FORO">
            <p>Esta Política será regida pela legislação brasileira, em especial pela Lei nº 13.709/2018 (LGPD). Fica eleito o foro da Comarca do Rio de Janeiro/RJ, com renúncia a qualquer outro, para dirimir controvérsias decorrentes de sua interpretação.</p>
            <p>Para mais informações sobre nossas regras de uso, consulte também os <Link href="/legal/termos"><span className="text-[#0065FF] underline cursor-pointer">Termos de Uso</span></Link>.</p>
          </Section>
        </article>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-heading font-bold text-[#0A2E76] mb-3">{title}</h2>
      <div className="text-[hsl(215,15%,30%)] text-[15px] leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}
