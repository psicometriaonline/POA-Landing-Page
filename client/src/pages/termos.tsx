import { Link } from "wouter";
import logoPath from "@assets/image_1770909567089.png";

export default function Termos() {
  return (
    <main data-testid="page-termos" className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="flex justify-center mb-8">
          <Link href="/">
            <img
              src={logoPath}
              alt="Psicometria Online Academy"
              className="h-12 md:h-14 w-auto object-contain cursor-pointer"
              data-testid="img-termos-logo"
            />
          </Link>
        </div>

        <article className="prose prose-slate max-w-none">
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#0A2E76] text-center mb-1" data-testid="text-termos-title">
            TERMO DE USO
          </h1>
          <p className="text-center text-[#0A2E76]/70 font-semibold text-lg mb-2">PSICOMETRIA ONLINE ACADEMY</p>
          <p className="text-center text-sm text-[hsl(215,15%,55%)] mb-10">Última atualização: 31 de outubro de 2025</p>

          <Section title="1. ACEITAÇÃO DOS TERMOS">
            <p>Ao acessar, se cadastrar ou utilizar qualquer funcionalidade da Psicometria Online Academy ("Academy", "Plataforma", "nós"), o usuário ("Usuário") declara ter lido, compreendido e aceitado integralmente este Termo de Uso. Caso não concorde com qualquer disposição, o Usuário deve se abster de utilizar os serviços.</p>
          </Section>

          <Section title="2. OBJETO">
            <p>A Psicometria Online Academy é uma plataforma educacional voltada à capacitação em Psicometria, Análise Quantitativa e Escrita Científica, oferecendo cursos, treinamentos, formações e ferramentas de apoio técnico, inclusive funcionalidades assistidas por Inteligência Artificial (IA).</p>
          </Section>

          <Section title="3. CADASTRO E CONTA DE USUÁRIO">
            <p>3.1. O uso da Plataforma requer cadastro com informações verídicas e atualizadas.</p>
            <p>3.2. O Usuário é responsável pela confidencialidade de seu login e senha, bem como por todas as ações realizadas sob sua conta.</p>
            <p>3.3. O compartilhamento de credenciais é expressamente proibido, podendo resultar em suspensão ou cancelamento da conta sem restituição de valores.</p>
            <p>3.4. A Academy poderá suspender ou excluir contas que violem este Termo, por decisão unilateral, sem prejuízo de medidas judiciais cabíveis.</p>
          </Section>

          <Section title="4. LICENÇA DE USO">
            <p>4.1. A Academy concede ao Usuário licença não exclusiva, intransferível e limitada para acesso ao conteúdo adquirido, exclusivamente para fins pessoais e educacionais.</p>
            <p>4.2. É vedada qualquer reprodução, redistribuição, revenda, disponibilização pública ou compartilhamento de materiais didáticos, vídeos, planilhas, modelos ou qualquer conteúdo protegido por direito autoral, sem autorização expressa e por escrito.</p>
            <p>4.3. Todos os conteúdos e marcas exibidos pertencem à Psicometria Online Academy e/ou a seus parceiros, sendo protegidos pelas leis de propriedade intelectual vigentes no Brasil.</p>
          </Section>

          <Section title="5. PAGAMENTOS, RENOVAÇÕES E PLANOS">
            <p>5.1. A utilização dos cursos e formações requer pagamento conforme valores, prazos e condições informados no momento da contratação.</p>
            <p>5.2. Os planos anuais, mensais, vitalícios ou promocionais estarão sujeitos às regras específicas descritas na oferta.</p>
            <p>5.3. A inadimplência autoriza a suspensão imediata do acesso.</p>
            <p>5.4. A Academy poderá alterar preços, planos e condições comerciais a qualquer momento, mediante comunicação prévia.</p>
          </Section>

          <Section title="6. FUNCIONALIDADES DE INTELIGÊNCIA ARTIFICIAL (IA) E COBRANÇAS ADICIONAIS">
            <p>6.1. Algumas funcionalidades da Plataforma utilizam Modelos de Linguagem de Grande Escala (LLM) e outros recursos de Inteligência Artificial (como assistentes de escrita, análise automatizada de dados e tutoria interativa).</p>
            <p>6.2. O uso dessas tecnologias poderá ser cobrado separadamente da assinatura principal, conforme tabela de preços vigente, créditos de uso, pacotes adicionais ou limites de consumo.</p>
            <p>6.3. A Academy reserva-se o direito de modificar, restringir, suspender ou tarifar o acesso a recursos de IA a qualquer momento, mediante comunicação prévia de, no mínimo, 15 (quinze) dias.</p>
            <p>6.4. O Usuário reconhece que as respostas geradas por sistemas de IA são baseadas em modelos estatísticos e não configuram aconselhamento profissional, validação científica definitiva ou orientação jurídica, médica ou técnica vinculante.</p>
          </Section>

          <Section title="7. LIMITAÇÃO DE RESPONSABILIDADE">
            <p>7.1. A Academy não garante resultados específicos de aprendizagem, publicações ou desempenho profissional decorrentes do uso dos cursos ou ferramentas.</p>
            <p>7.2. A Plataforma é fornecida "no estado em que se encontra", sem garantias expressas ou implícitas.</p>
            <p>7.3. A Academy não se responsabiliza por:</p>
            <ul>
              <li>falhas de conexão ou indisponibilidade temporária;</li>
              <li>perdas de dados por mau uso da conta;</li>
              <li>interpretações equivocadas de conteúdos;</li>
              <li>decisões acadêmicas, profissionais ou pessoais tomadas com base em informações fornecidas pela Plataforma;</li>
              <li>resultados ou comportamento de sistemas de IA, que podem conter imprecisões ou vieses.</li>
            </ul>
          </Section>

          <Section title="8. SUPORTE E ATENDIMENTO">
            <p>8.1. O suporte é prestado exclusivamente pelos canais oficiais informados no site ou na Plataforma.</p>
            <p>8.2. O prazo de resposta poderá variar conforme a complexidade da solicitação.</p>
          </Section>

          <Section title="9. CANCELAMENTO E REEMBOLSO">
            <p>9.1. O Usuário poderá solicitar o cancelamento conforme as condições previstas na política de reembolso vigente na data da compra.</p>
            <p>9.2. A Academy poderá cancelar o acesso de usuários que violem este Termo, sem reembolso, quando houver uso indevido, violação de direitos autorais ou tentativa de engenharia reversa dos sistemas.</p>
          </Section>

          <Section title="10. PROPRIEDADE INTELECTUAL">
            <p>Todos os direitos sobre textos, vídeos, códigos, materiais, design, marca e identidade visual da Psicometria Online Academy pertencem exclusivamente à empresa, sendo vedada sua reprodução, modificação, distribuição ou exploração comercial sem autorização prévia.</p>
          </Section>

          <Section title="11. PRIVACIDADE E PROTEÇÃO DE DADOS">
            <p>As regras sobre coleta, tratamento, armazenamento e compartilhamento de dados pessoais estão descritas na <Link href="/legal/privacidade"><span className="text-[#0065FF] underline cursor-pointer">Política de Privacidade</span></Link>, parte integrante deste Termo.</p>
          </Section>

          <Section title="12. ALTERAÇÕES DOS TERMOS">
            <p>A Academy poderá atualizar este Termo a qualquer momento. O uso contínuo da Plataforma após a publicação das alterações implica concordância com a nova versão.</p>
          </Section>

          <Section title="13. FORO E LEI APLICÁVEL">
            <p>Este Termo será regido pelas leis da República Federativa do Brasil. Fica eleito o foro da Comarca do Rio de Janeiro/RJ, com renúncia a qualquer outro, para dirimir eventuais controvérsias.</p>
            <p>Em caso de dúvidas sobre este termo, entre em contato através do <a href="https://membros.psicometriaonline.com.br/atendimento" target="_blank" rel="noopener noreferrer" className="text-[#0065FF] underline">formulário de atendimento</a>.</p>
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
      <div className="text-[hsl(215,15%,30%)] text-[15px] leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}
