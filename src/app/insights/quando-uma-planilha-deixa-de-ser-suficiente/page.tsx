import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { HeroFlow } from "@/components/insights/HeroFlow";
import { DiagnosticSignals } from "@/components/insights/DiagnosticSignals";
import { PossibilityMap } from "@/components/insights/PossibilityMap";

export const metadata: Metadata = {
  title: "Quando uma planilha deixa de ser suficiente? | YZEV Tech",
  description:
    "Planilhas funcionam muito bem até o momento em que o processo começa a depender mais da operação do que da própria ferramenta. Uma leitura para quem administra uma empresa pequena ou média.",
};

// Esta página adota uma paleta LIGHT EDITORIAL própria — só nesta rota.
// Os tokens globais (--color-bg, --color-text, --color-divider, --color-surface,
// --color-accent-2) continuam intocados em src/styles/globals.css; aqui eles
// são apenas *redeclarados localmente*, via CSS custom properties num wrapper,
// e herdados por toda a árvore (Hero, ArticleIndex, DiagnosticSignals,
// PossibilityMap) sem precisar editar nenhum desses componentes.
// --color-accent-2 (roxo claro, pensado para fundo escuro) vira igual a
// --color-accent no tema claro, porque teria contraste ruim sobre o novo
// fundo claro — mesmo roxo da marca, só a variante correta para o fundo.
const lightVars = {
  "--color-bg": "#f5f5f2",
  "--color-surface": "#ffffff",
  "--color-text": "#0b0b10",
  "--color-divider": "color-mix(in srgb, #0b0b10 12%, transparent)",
  "--color-accent-2": "#7a3bff",
} as CSSProperties;

// O manifesto (único momento dark) reinstaura localmente a paleta escura
// original dentro do próprio recorte, criando uma ilha visual full-bleed no
// meio da página clara.
const darkVars = {
  "--color-bg": "#0b0b10",
  "--color-surface": "#14141f",
  "--color-text": "#e9e9ed",
  "--color-divider": "color-mix(in srgb, #e9e9ed 16%, transparent)",
  "--color-accent-2": "#a78bfa",
} as CSSProperties;

const indexItems = [
  { id: "problema", label: "O problema" },
  { id: "sinais", label: "Os quatro sinais" },
  { id: "o-que-muda", label: "O que muda" },
  { id: "o-que-pode-virar-software", label: "O que pode virar software" },
];

const problemBars = [
  { label: "Informação", width: "32%", strong: false },
  { label: "Ferramentas", width: "54%", strong: false },
  { label: "Pessoas", width: "76%", strong: false },
  { label: "Decisões", width: "100%", strong: true },
];

const signals = [
  {
    number: "01",
    kicker: "Dados desalinhados",
    heading: "Três pessoas abrem o mesmo arquivo e cada uma tem uma versão diferente do número.",
    text: "Quando várias pessoas precisam consultar, atualizar ou validar os mesmos dados, o controle passa a depender de disciplina manual. É justamente aí que ele começa a falhar.",
  },
  {
    number: "02",
    kicker: "Processo fragmentado",
    heading: "O pedido chega no WhatsApp, é anotado na planilha e confirmado por e-mail.",
    text: "O processo atravessa quatro ou cinco ferramentas que não conversam entre si. Ninguém tem a operação inteira em um lugar só, apenas pedaços dela.",
  },
  {
    number: "03",
    kicker: "Trabalho repetitivo",
    heading: "Alguém passa a primeira hora do dia copiando informação de um lugar para outro.",
    text: "Atualizar status, conferir dados, enviar as mesmas mensagens, montar o mesmo relatório. É trabalho que acontece todos os dias e não muda nada no negócio.",
  },
  {
    number: "04",
    kicker: "Decisão atrasada",
    heading: "A reunião de segunda começa com alguém consolidando a planilha.",
    text: "Quando os dados precisam ser reunidos à mão antes de uma decisão, a decisão sempre chega depois do momento em que ela valia mais.",
  },
];

const planilhaItems = [
  "Informação distribuída em arquivos",
  "Atualizações manuais",
  "Fórmulas e controles individuais",
  "Dependência de pessoas",
  "Relatórios preparados manualmente",
];

const sistemaItems = [
  "Informação centralizada",
  "Processos automatizados",
  "Regras definidas no sistema",
  "Processos reproduzíveis",
  "Informação disponível no momento necessário",
];

const relatedArticles = [
  {
    tag: "Automação",
    title: "Sua empresa ainda depende de tarefas que poderiam acontecer sozinhas?",
  },
  {
    tag: "IA",
    title: "Onde a inteligência artificial realmente ajuda uma empresa?",
  },
  {
    tag: "Produto",
    title: "E se um problema interno pudesse virar um produto?",
  },
];

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

export default function Page() {
  return (
    <>
    <main className="bg-bg text-text" style={lightVars}>
      {/* HERO — texto à esquerda, diagrama do pedido fragmentado à direita */}
      <section className="border-b border-divider">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Software</p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              Quando uma planilha
              <br />
              deixa de ser
              <br />
              suficiente?
            </h1>
            <p className="mt-6 max-w-md text-lg text-text/75">
              Planilhas funcionam muito bem até o momento em que o processo começa a
              depender mais da operação do que da própria ferramenta. Uma leitura para
              quem administra uma empresa pequena ou média e sente isso acontecendo.
            </p>
          </div>

          <HeroFlow />
        </Container>
      </section>

      <article>
        {/* CORPO EDITORIAL — bloco 1: índice lateral + problema + sinais */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <ArticleIndex items={indexItems} className="mb-14 lg:mb-0" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            {/* 02 — O problema */}
            <section id="problema" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O problema raramente começa com a planilha.
              </h2>
              <div className="mt-9 flex flex-wrap items-start gap-10 sm:gap-12">
                <div className="flex-1 space-y-5 text-lg text-text/75 sm:min-w-[20rem]">
                  <p>
                    Uma planilha pode organizar clientes, pedidos, estoque, tarefas, custos
                    e indicadores. Para muitas empresas, ela é exatamente a ferramenta certa
                    para começar.
                  </p>
                  <p>
                    O problema aparece quando a operação passa a depender de dezenas de
                    abas, arquivos compartilhados, fórmulas, mensagens e pessoas que sabem
                    exatamente onde determinada informação está.
                  </p>
                </div>
                <div className="flex w-44 shrink-0 flex-col gap-3.5 pt-1.5">
                  {problemBars.map((bar) => (
                    <div key={bar.label} className="flex flex-col gap-1.5">
                      <p
                        className={`text-xs ${
                          bar.strong ? "font-semibold text-text" : "text-text/60"
                        }`}
                      >
                        {bar.label}
                      </p>
                      <div className="h-0.5 bg-divider">
                        <div
                          className={`h-full ${bar.strong ? "bg-accent" : "bg-text/20"}`}
                          style={{ width: bar.width }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-12 max-w-lg">
                <p className="text-xl leading-snug text-text/60 sm:text-2xl">
                  Nesse momento, a empresa não tem necessariamente um problema de
                  planilha.
                </p>
                <div className="mt-7 h-px w-16 bg-accent" aria-hidden="true" />
                <p className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
                  Ela tem um problema de processo.
                </p>
              </div>
            </section>

            {/* 03 — Os quatro sinais */}
            <section id="sinais" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O que indica o problema é a complexidade da operação,
                <br />não o tamanho da planilha.
              </h2>
              <p className="mt-5 text-lg text-text/75">
                Na operação, quatro sinais costumam aparecer primeiro.
              </p>
              <DiagnosticSignals items={signals} />
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK — manifesto, full-bleed, pausa na leitura */}
        <section style={darkVars} className="border-y border-divider bg-bg text-text py-24 sm:py-32">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-3xl">
              <div className="mb-6 h-px w-16 bg-accent" aria-hidden="true" />
              <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                Quando uma operação precisa ser constantemente organizada por
                alguém, talvez ela precise ser organizada por{" "}
                <span className="text-accent">software</span>.
              </p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 2: o que muda, o que pode virar software */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            {/* 05 — O que muda */}
            <section id="o-que-muda" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O que muda quando o processo vira sistema
              </h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-14">
                <div>
                  <h3 className="border-t border-divider pt-3.5 text-xs uppercase tracking-[0.2em] text-text/60">
                    Na planilha
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 text-text/75">
                    {planilhaItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="border-t border-accent pt-3.5 text-xs uppercase tracking-[0.2em] text-accent">
                    No sistema
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 text-text">
                    {sistemaItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-10 space-y-4 text-lg text-text/75">
                <p>
                  Isso não significa abandonar a planilha. Existem processos em que ela
                  continua sendo a solução mais simples e mais adequada. Forçar um
                  sistema onde uma planilha resolve apenas troca um problema por outro.
                </p>
                <p>
                  O ponto de decisão aparece quando o custo de manter o processo manual
                  começa a superar o benefício de continuar usando uma ferramenta criada
                  para organizar dados, e não para executar toda a operação.
                </p>
              </div>
            </section>

            {/* 06 — O que pode virar software */}
            <section id="o-que-pode-virar-software" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Talvez o problema que você está tentando organizar já seja um produto.
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                Nem todo problema precisa de um sistema. Mas alguns processos deixam de
                funcionar bem quando dependem de controles manuais demais.
              </p>
              <PossibilityMap />
            </section>
          </div>
        </Container>

        {/* Painel de operação — recorte de como a mesma operação fica organizada por software */}
        <section aria-label="Painel de operação organizado por software" className="pb-20 sm:pb-24 lg:pb-28">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <figure className="m-0 max-w-3xl overflow-hidden border border-divider">
              <Image
                src="/img/yzev-planilha.png"
                alt="Painel de operação com pedidos, atendimentos, operações, estoque e financeiro centralizados em um só lugar, com o histórico de cliente ao lado. Um recorte de operação já em funcionamento."
                width={1672}
                height={940}
                sizes="(min-width: 1024px) 46rem, 100vw"
                className="h-auto w-full"
              />
            </figure>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 3: CTA + continue lendo */}
        <Container className={`border-t border-divider py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24">
            {/* 07 — CTA */}
            <section>
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Seu processo ainda cabe em uma planilha?
              </h2>
              <div className="mt-6 max-w-md space-y-4 text-lg text-text/75">
                <p>
                  O problema não aparece por causa do tamanho do arquivo. Ele aparece
                  quando informação, processo, pessoas e decisões passam a exigir
                  controle manual em excesso.
                </p>
                <p>
                  Quando isso acontece, trocar de ferramenta raramente resolve. O
                  passo seguinte é rever como o trabalho acontece.
                </p>
              </div>

              <Link href="/contato" className={`${buttonClasses("primary")} mt-8`}>
                Conversar sobre meu processo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            {/* 08 — Continue lendo */}
            <section aria-label="Continue lendo" className="border-t border-divider pt-10 sm:pt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text/60">Continue lendo</p>
              <div className="mt-7 grid gap-8 sm:grid-cols-3 sm:gap-10">
                {relatedArticles.map((article) => (
                  <a key={article.tag} href="#" className="block no-underline text-text">
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
