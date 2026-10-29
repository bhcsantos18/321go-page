import type { ReactNode } from 'react'
import { PageHero } from '../components/Hero'
import { company } from '../data/company'

// Textos-base. Recomenda-se revisão por assessoria jurídica antes da publicação.
const address = `${company.address.street}, ${company.address.district}, ${company.address.city}, CEP ${company.address.zip}`

function LegalPage({ kicker, title, updated, children }: { kicker: string; title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <PageHero size="sm" kicker={kicker} title={title} text={`Última atualização: ${updated}`} />
      <section className="bg-white py-16 sm:py-20">
        <article className="mx-auto max-w-3xl px-4 text-ink-700 sm:px-6 [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-900 [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6">{children}</article>
      </section>
    </>
  )
}

export function Privacidade() {
  return (
    <LegalPage kicker="LGPD" title="Política de Privacidade" updated="outubro de 2026">
      <p>
        A <strong>{company.legalName}</strong> (CNPJ {company.cnpj}), com sede em {address}, respeita a sua privacidade e trata dados pessoais de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </p>
      <h2>1. Quais dados coletamos</h2>
      <ul>
        <li>Dados de identificação e contato: nome, WhatsApp e e-mail informados nos formulários.</li>
        <li>Dados da viagem: destinos, datas, número de viajantes, preferências e observações.</li>
        <li>Dados de acesso à Área do Cliente: e-mail e senha (armazenada de forma protegida).</li>
        <li>Dados técnicos de navegação necessários ao funcionamento do site.</li>
      </ul>
      <h2>2. Para que usamos</h2>
      <ul>
        <li>Elaborar e enviar propostas e orçamentos solicitados por você.</li>
        <li>Entrar em contato sobre a sua solicitação por WhatsApp, telefone ou e-mail.</li>
        <li>Executar o contrato de viagem: reservas, emissões, vouchers e documentos.</li>
        <li>Cumprir obrigações legais e regulatórias do setor de turismo.</li>
      </ul>
      <h2>3. Base legal</h2>
      <p>Tratamos seus dados com base no seu consentimento, na execução de contrato ou de procedimentos preliminares a pedido do titular, no cumprimento de obrigação legal e no legítimo interesse, conforme o art. 7º da LGPD.</p>
      <h2>4. Compartilhamento</h2>
      <p>Compartilhamos apenas o necessário com fornecedores da sua viagem (companhias aéreas, hotéis, locadoras, seguradoras, operadoras e parques) e com prestadores de serviço que nos apoiam, sempre sob dever de confidencialidade. Não vendemos dados pessoais.</p>
      <h2>5. Armazenamento e segurança</h2>
      <p>Adotamos medidas técnicas e administrativas para proteger seus dados e os mantemos apenas pelo tempo necessário às finalidades informadas ou exigido por lei.</p>
      <h2>6. Seus direitos</h2>
      <p>Você pode solicitar confirmação, acesso, correção, anonimização, portabilidade, eliminação de dados e revogação do consentimento, entre outros direitos do art. 18 da LGPD, pelo e-mail {company.email}.</p>
      <h2>7. Cookies</h2>
      <p>Este site utiliza armazenamento local do navegador apenas para funcionalidades essenciais, como manter sua sessão na Área do Cliente. Os mapas utilizam o OpenStreetMap.</p>
      <h2>8. Contato</h2>
      <p>
        Dúvidas sobre esta política: {company.email} · {company.phone}.
      </p>
    </LegalPage>
  )
}

export function Termos() {
  return (
    <LegalPage kicker="Termos" title="Termos de Uso" updated="outubro de 2026">
      <p>
        Ao utilizar este site, você concorda com os termos abaixo. O site é operado por <strong>{company.legalName}</strong> (CNPJ {company.cnpj}).
      </p>
      <h2>1. Solicitações de orçamento</h2>
      <p>Os formulários do site registram pedidos de orçamento sem compromisso. Valores, disponibilidade e condições só são válidos após proposta formal enviada por um consultor e confirmação da reserva.</p>
      <h2>2. Conteúdo informativo</h2>
      <p>Dicas de destinos, informações sobre parques, mapas e a calculadora de dias têm caráter informativo e estimativo. Regras de documentação, vistos, horários e atrações podem mudar e devem ser confirmadas com a agência e com os órgãos oficiais antes da viagem.</p>
      <h2>3. Área do Cliente</h2>
      <p>O acesso é pessoal e intransferível. Você é responsável por manter a confidencialidade da sua senha e por avisar a agência sobre qualquer uso não autorizado.</p>
      <h2>4. Propriedade intelectual</h2>
      <p>Marcas, logotipos e nomes de parques e atrações citados pertencem aos seus respectivos titulares e são mencionados apenas para fins informativos. Os dados de mapa são © colaboradores do OpenStreetMap.</p>
      <h2>5. Responsabilidade</h2>
      <p>A agência atua como intermediadora entre o cliente e os fornecedores de serviços turísticos, nos termos da legislação aplicável.</p>
      <h2>6. Foro</h2>
      <p>Fica eleito o foro da comarca de São Paulo/SP para dirimir questões relativas a estes termos.</p>
    </LegalPage>
  )
}
