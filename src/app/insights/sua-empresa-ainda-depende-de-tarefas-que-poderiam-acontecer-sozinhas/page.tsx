import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { FlowChain } from "@/components/insights/FlowChain";

export const metadata: Metadata = {
  title: "Sua empresa ainda depende de tarefas que poderiam acontecer sozinhas? | Yzev",
  description:
    "Automatizar não é substituir pessoas. É entender quais etapas de um processo podem acontecer sozinhas — e onde a presença humana realmente faz diferença.",
};

// Mesmo sistema visual da página "Quando uma planilha deixa de ser
// suficiente?": superfície clara via .theme-light, ilhas full-bleed em
// .theme-dark para os dois momentos editoriais de maior peso, e o mesmo grid
// de leitura (índice + coluna de 46rem). Nenhum componente compartilhado foi
// alterado para esta página; FlowChain é novo e só é usado aqui.

const indexItems = [
  { id: "processo-manual", label: "Um processo, várias etapas" },
  { id: "processo-automatizado", label: "O mesmo processo, automatizado" },
  { id: "o-que-pode-acontecer-sozinho", label: "O que pode acontecer sozinho" },
  { id: "outros-exemplos", label: "Outros exemplos" },
  { id: "como-pensamos", label: "Como pensamos automação" },
];

const manualFlowGroups = [
  {
    label: "Entrada",
    steps: ["Cliente envia mensagem", "Alguém responde", "Pergunta o que ele precisa"],
  },
  {
    label: "Agendamento",
    steps: ["Consulta horários", "Verifica disponibilidade", "Confirma o horário"],
  },
  {
    label: "Controle",
    steps: ["Anota na agenda", "Envia confirmação", "Envia lembrete"],
  },
];

const automatedFlow = [
  "Cliente entra em contato",
  "Atendimento identifica a necessidade",
  "Consulta disponibilidade",
  "Apresenta horários",
  "Cliente escolhe",
  "Agendamento é registrado",
  "Confirmação é enviada",
  "Lembrete é enviado",
];

const automaticItems = [
  "Consultar disponibilidade",
  "Registrar dados",
  "Enviar confirmação",
  "Enviar lembrete",
  "Atualizar status",
  "Encaminhar solicitações",
  "Organizar informações",
  "Disparar notificações",
  "Iniciar a próxima etapa de um processo",
];

const personItems = [
  "Tomar uma decisão fora das regras",
  "Resolver uma exceção",
  "Negociar",
  "Interpretar uma situação específica",
  "Lidar com uma situação sensível",
  "Assumir uma decisão que exige contexto",
];

const otherAreas = [
  { label: "Atendimento", stages: ["Receber", "Identificar", "Responder", "Encaminhar"] },
  { label: "Agendamento", stages: ["Disponibilidade", "Escolha", "Confirmação", "Lembrete"] },
  { label: "Pedidos", stages: ["Receber", "Registrar", "Processar", "Atualizar"] },
  { label: "Documentos", stages: ["Solicitar", "Receber", "Validar", "Sinalizar pendência"] },
  { label: "Rotinas internas", stages: ["Coletar", "Organizar", "Distribuir", "Acompanhar"] },
];

const ordersFlow = [
  "Pedido recebido",
  "Dados estruturados",
  "Processo iniciado",
  "Responsáveis notificados",
  "Cliente recebe atualização",
];

const documentsFlow = [
  "Documento solicitado",
  "Prazo registrado",
  "Lembrete automático",
  "Documento recebido",
  "Validação",
  "Pendência sinalizada",
];

const startSmallFlow = ["Uma tarefa", "Um fluxo", "Uma integração", "Um processo mais autônomo"];

const method = [
  { number: "01", title: "Mapear", text: "Entender como o trabalho acontece hoje." },
  { number: "02", title: "Identificar", text: "Encontrar tarefas repetitivas, regras e pontos de decisão." },
  { number: "03", title: "Integrar", text: "Conectar sistemas e informações que hoje estão separados." },
  { number: "04", title: "Automatizar", text: "Fazer as etapas previsíveis acontecerem sozinhas, como parte do fluxo." },
  { number: "05", title: "Acompanhar", text: "Observar o processo e evoluir quando novas necessidades aparecem." },
];

const relatedArticles = [
  {
    tag: "Software",
    title: "Quando uma planilha deixa de ser suficiente?",
    href: "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
  },
  {
    tag: "Produto",
    title: "E se um problema interno pudesse virar um produto?",
    href: "/insights/e-se-um-problema-interno-pudesse-virar-um-produto",
  },
];

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

// Cada área é um processo curto, não uma descrição: nome da área + as
// etapas em sequência, separadas por uma seta discreta (mesmo peso do
// texto ao redor, sem virar elemento gráfico).
function MicroFlow({ label, stages }: { label: string; stages: string[] }) {
  return (
    <div>
      <h3 className="text-lg font-semibold leading-snug">{label}</h3>
      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text/70">
        {stages.map((stage, index) => (
          <span key={stage} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-text/30">
                →
              </span>
            )}
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <>
    <main className="theme-light bg-bg text-text">
      {/* HERO — só texto: tese do artigo logo abaixo do título, sem diagrama */}
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Automação</p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              Sua empresa ainda depende de tarefas que poderiam acontecer sozinhas?
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">
              Nem todo trabalho precisa ser automatizado. Mas quando uma pessoa passa
              boa parte do dia repetindo as mesmas etapas, talvez o problema não seja
              falta de tempo. Talvez seja o processo.
            </p>
            <div className="mt-10 max-w-xl">
              <div className="h-px w-16 bg-accent" aria-hidden="true" />
              <p className="mt-6 text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                Automatizar não é fazer uma máquina trabalhar no lugar de uma pessoa.
                É fazer o processo cuidar sozinho do que não precisa de intervenção
                humana.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <article>
        {/* CORPO EDITORIAL — bloco 1: índice lateral + os dois processos */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <ArticleIndex items={indexItems} className="mb-14 lg:mb-0" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            {/* O processo manual */}
            <section id="processo-manual" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Atendimento e agendamento, etapa por etapa
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                Clínicas, consultórios, salões, assistências técnicas e qualquer
                negócio que atende pelo WhatsApp costumam reconhecer essa rotina.
                Veja como ela normalmente acontece.
              </p>
              <FlowChain groups={manualFlowGroups} emphasizeLast={false} className="mt-10" />
              <p className="mt-10 max-w-xl text-xl font-semibold leading-snug tracking-[-0.01em] text-text/80 sm:text-2xl">
                São nove etapas, não uma. E cada uma delas depende de alguém lembrar
                de fazer.
              </p>
            </section>

            {/* O mesmo processo automatizado */}
            <section id="processo-automatizado" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O mesmo processo, sem depender de alguém lembrar
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                O fluxo muda de forma, mas o objetivo continua o mesmo: o cliente
                marcado, avisado e lembrado no horário certo.
              </p>
              <FlowChain
                steps={automatedFlow}
                tone="automated"
                branch={{ condition: "Casos fora das regras", result: "Pessoa assume" }}
                className="mt-10"
              />
              <p className="mt-10 max-w-xl text-lg text-text/75">
                Nada disso depende de um chatbot respondendo mensagens. Depende do
                processo estar descrito de um jeito que o sistema consiga seguir
                sozinho, do início ao fim, exceto quando algo foge da regra. Nesse
                ponto, a pessoa assume de novo.
              </p>
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK — a pergunta central */}
        <section className="theme-dark border-y border-divider bg-bg text-text py-24 sm:py-32">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-3xl">
              <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
              <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                A pergunta não é: o que podemos automatizar?
                <br />
                É: onde a presença de uma <span className="text-accent-2">pessoa</span>{" "}
                realmente faz diferença?
              </p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 2: o que pode acontecer sozinho + outros exemplos */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            {/* O que pode acontecer sozinho */}
            <section id="o-que-pode-acontecer-sozinho" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O que pode acontecer sozinho
              </h2>
              <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-14">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-2">
                    Pode acontecer automaticamente
                  </p>
                  <div className="relative mt-6">
                    <span aria-hidden="true" className="absolute left-[3px] top-[7px] bottom-[7px] w-px bg-accent-2/35" />
                    <ul className="flex flex-col gap-4">
                      {automaticItems.map((item) => (
                        <li key={item} className="relative flex items-center gap-3">
                          <span aria-hidden="true" className="relative z-10 h-[7px] w-[7px] shrink-0 rounded-full bg-accent-2" />
                          <span className="text-text">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-text/60">Precisa de pessoa</p>
                  <ul className="mt-6 flex flex-col gap-5">
                    {personItems.map((item) => (
                      <li key={item} className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-[7px] w-[7px] shrink-0 rounded-full border border-text/40" />
                        <span className="text-text/75">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-14 max-w-xl border-l-2 border-accent-2 pl-6">
                <p className="text-2xl font-semibold leading-snug tracking-[-0.01em] text-text sm:text-3xl">
                  Uma boa automação não elimina a pessoa do processo.
                </p>
                <p className="mt-2 text-xl leading-snug text-text/70 sm:text-2xl">
                  Ela tira da pessoa aquilo que não precisa da presença dela.
                </p>
              </div>
            </section>

            {/* Outros exemplos */}
            <section id="outros-exemplos" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O mesmo princípio em outras áreas
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                O exemplo do atendimento é só uma porta de entrada. A mesma lógica
                aparece em outras rotinas da operação.
              </p>

              <div className="mt-10 border-b border-divider">
                <div className="grid grid-cols-1 border-t border-divider sm:grid-cols-2 sm:gap-x-12">
                  {otherAreas.map((area) => (
                    <div
                      key={area.label}
                      className="border-t border-divider py-7 first:border-t-0 sm:[&:nth-child(-n+2)]:border-t-0"
                    >
                      <MicroFlow label={area.label} stages={area.stages} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  Pedidos, por exemplo
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  Um pedido pode entrar no sistema e disparar as próximas etapas
                  sozinho, sem que alguém precise copiar a mesma informação de um
                  lugar para outro.
                </p>
                <FlowChain steps={ordersFlow} className="mt-8" />
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  Documentos, por exemplo
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  O mesmo vale para documentos com prazo. O lembrete sai antes do
                  vencimento, e a pendência aparece sozinha quando o prazo passa
                  sem resposta.
                </p>
                <FlowChain steps={documentsFlow} className="mt-8" />
              </div>
            </section>
          </div>
        </Container>

        {/* CORPO EDITORIAL — bloco 3: nem automatizar por automatizar, começar pequeno, método */}
        <Container className={`border-t border-divider py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="como-pensamos" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Nem tudo que é repetitivo precisa ser automatizado.
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg text-text/75">
                <p>
                  Uma automação só faz sentido quando frequência, volume, regras
                  claras, tempo operacional e a possibilidade de padronizar e
                  integrar pesam a favor dela.
                </p>
                <p>
                  Se uma tarefa acontece uma vez por mês e leva dois minutos,
                  talvez não exista um problema para resolver. Se ela acontece
                  centenas de vezes e exige sempre as mesmas etapas, a conversa
                  muda.
                </p>
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  Começar pequeno
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  Automatizar não precisa ser um projeto enorme desde o início. Uma
                  empresa pode começar por uma tarefa específica e evoluir conforme
                  entende melhor o processo.
                </p>
                <FlowChain steps={startSmallFlow} className="mt-8" />
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  Como pensamos automação
                </h3>
                <div className="mt-10">
                  <div className="relative hidden lg:block">
                    <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-divider" />
                    <div className="grid lg:grid-cols-5 lg:gap-8">
                      {method.map((step) => (
                        <div key={step.number} className="relative pt-6">
                          <span
                            aria-hidden="true"
                            className="absolute left-0 top-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent-2"
                          />
                          <span className="text-xs tracking-[0.3em] text-text/65">{step.number}</span>
                          <h4 className="mt-2 text-sm font-bold uppercase tracking-[0.04em]">{step.title}</h4>
                          <p className="mt-3 text-sm text-text/70">{step.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative space-y-8 pl-6 lg:hidden">
                    <div aria-hidden="true" className="absolute bottom-1 left-0 top-1 w-px bg-divider" />
                    {method.map((step) => (
                      <div key={step.number} className="relative">
                        <span
                          aria-hidden="true"
                          className="absolute -left-6 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-2"
                        />
                        <span className="text-xs tracking-[0.3em] text-text/65">{step.number}</span>
                        <h4 className="mt-2 text-sm font-bold uppercase tracking-[0.04em]">{step.title}</h4>
                        <p className="mt-2 max-w-xs text-sm text-text/70">{step.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK — a grande ideia do artigo */}
        <section className="theme-dark border-y border-divider bg-bg text-text py-24 sm:py-32">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-3xl">
              <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
              <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                A melhor automação é aquela que deixa de{" "}
                <span className="text-accent-2">chamar atenção</span>.
              </p>
              <div className="mt-8 max-w-xl space-y-2 text-lg text-text/70">
                <p>
                  O cliente recebe a confirmação. O pedido segue para a próxima
                  etapa. O lembrete é enviado. A informação chega a quem precisa.
                </p>
                <p>Ninguém precisa parar o trabalho para fazer aquilo acontecer.</p>
              </div>
              <p className="mt-6 text-2xl font-bold tracking-[-0.01em] text-text sm:text-3xl">
                O processo simplesmente continua.
              </p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 4: conclusão + CTA + continue lendo */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24">
            <section>
              <div className="max-w-xl space-y-4 text-lg text-text/75">
                <p>Automação não significa retirar pessoas do processo.</p>
                <p>
                  Significa deixar que elas concentrem atenção onde existe
                  decisão, contexto ou relacionamento. O resto pode acontecer como
                  parte do próprio processo.
                </p>
              </div>

              <h2 className="mt-14 text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Existe uma tarefa que sua empresa repete todos os dias?
              </h2>
              <p className="mt-6 max-w-md text-lg text-text/75">
                Talvez o primeiro passo não seja automatizar tudo. É entender o que
                realmente precisa continuar dependendo de alguém.
              </p>

              <Link href="/#contato" className={`${buttonClasses("primary")} mt-8`}>
                Conversar sobre meu processo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section aria-label="Continue lendo" className="border-t border-divider pt-10 sm:pt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text/60">Continue lendo</p>
              <div className="mt-7 grid gap-8 sm:grid-cols-2 sm:gap-10">
                {relatedArticles.map((article) => (
                  <a
                    key={article.tag}
                    href={article.href ?? "#"}
                    className="block no-underline text-text"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-accent">{article.tag}</p>
                    <p className="mt-2.5 text-lg font-semibold leading-snug transition-colors duration-200 hover:text-accent-2">
                      {article.title}
                    </p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </Container>
      </article>
    </main>
    <Footer />
    </>
  );
}
