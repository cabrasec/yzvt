import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { DiagnosticSignals } from "@/components/insights/DiagnosticSignals";
import { ProcessFlow } from "@/components/insights/ProcessFlow";
import { PossibilityMap } from "@/components/insights/PossibilityMap";
import { EngineeringMethod } from "@/components/insights/EngineeringMethod";

export const metadata: Metadata = {
  title: "Quando uma planilha deixa de ser suficiente? | YZEV Tech",
  description:
    "Planilhas funcionam muito bem até o momento em que o processo começa a depender mais da operação do que da própria ferramenta.",
};

// Esta página adota uma paleta LIGHT EDITORIAL própria — só nesta rota.
// Os tokens globais (--color-bg, --color-text, --color-divider, --color-surface,
// --color-accent-2) continuam intocados em src/styles/globals.css; aqui eles
// são apenas *redeclarados localmente*, via CSS custom properties num wrapper,
// e herdados por toda a árvore (Hero, ArticleIndex, DiagnosticSignals,
// ProcessFlow, OperationBlueprint) sem precisar editar nenhum desses
// componentes. --color-accent-2 (roxo claro, pensado para fundo escuro) vira
// igual a --color-accent no tema claro, porque teria contraste ruim sobre o
// novo fundo claro — mesmo roxo da marca, só a variante correta para o fundo.
const lightVars = {
  "--color-bg": "#f5f5f2",
  "--color-surface": "#ffffff",
  "--color-text": "#0b0b10",
  "--color-divider": "color-mix(in srgb, #0b0b10 12%, transparent)",
  "--color-accent-2": "#7a3bff",
} as CSSProperties;

// Os dois "momentos dark" (manifesto e takeaway) reinstauram localmente a
// paleta escura original dentro do próprio recorte, criando uma ilha visual
// full-bleed no meio da página clara.
const darkVars = {
  "--color-bg": "#0b0b10",
  "--color-surface": "#14141f",
  "--color-text": "#e9e9ed",
  "--color-divider": "color-mix(in srgb, #e9e9ed 16%, transparent)",
  "--color-accent-2": "#a78bfa",
} as CSSProperties;

const indexItems = [
  { id: "problema", label: "O problema" },
  { id: "ponto-de-virada", label: "O ponto de virada" },
  { id: "quando-migrar", label: "Quando migrar" },
  { id: "o-que-pode-virar-software", label: "O que pode virar software" },
  { id: "como-pensamos", label: "Como pensamos" },
];

const signals = [
  {
    number: "01",
    tag: "Mais pessoas",
    heading: "Mais pessoas precisam da mesma informação",
    text: "Quando várias pessoas precisam consultar, atualizar ou validar os mesmos dados, o controle passa a depender cada vez mais de disciplina manual.",
  },
  {
    number: "02",
    tag: "Mais ferramentas",
    heading: "O processo atravessa várias ferramentas",
    text: "A informação começa em uma planilha, passa pelo WhatsApp, segue por e-mail e termina em outro sistema ou arquivo.",
  },
  {
    number: "03",
    tag: "Mais repetição",
    heading: "As mesmas tarefas são repetidas",
    text: "Copiar informações, atualizar status, enviar mensagens, gerar relatórios e conferir dados consome tempo que poderia estar sendo usado em atividades de maior valor.",
  },
  {
    number: "04",
    tag: "Mais dependência",
    heading: "A decisão depende de informação desatualizada",
    text: "Quando os dados precisam ser consolidados manualmente antes de uma decisão, a operação começa a perder velocidade.",
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

const heroImageAlt = "Monitor exibindo gráficos e indicadores de dados financeiros";

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

export default function Page() {
  return (
    <>
    <main className="bg-bg text-text" style={lightVars}>
      {/* HERO — split-screen editorial, ~50/50, bastante espaço negativo */}
      <section className="relative overflow-hidden border-b border-divider">
        <Container className="grid gap-12 py-16 sm:py-20 lg:min-h-[calc(100svh-5.375rem)] lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
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
              depender mais da operação do que da própria ferramenta.
            </p>
          </div>

          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[min(70vh,40rem)]">
            <Image
              src="/img/carlos-muza-hpjSkU2UYSU-unsplash.jpg"
              alt={heroImageAlt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority
              className="object-cover grayscale contrast-[1.05]"
            />
          </div>
        </Container>
      </section>

      <article>
        {/* CORPO EDITORIAL — bloco 1: índice lateral + problema + diagnóstico + blueprint */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <ArticleIndex items={indexItems} className="mb-14 lg:mb-0" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            {/* 02 — O problema */}
            <section id="problema" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O problema raramente começa com a planilha.
              </h2>
              <div className="mt-8 space-y-5 text-lg text-text/75">
                <p>
                  Começa quando o negócio cresce, os processos se multiplicam e a
                  informação deixa de estar onde deveria.
                </p>
                <p>
                  Uma planilha pode organizar clientes, pedidos, estoque, tarefas, custos
                  e indicadores. Para muitas empresas, ela é exatamente a ferramenta certa
                  para começar.
                </p>
                <p>
                  O problema aparece quando a operação passa a depender de várias
                  abas, arquivos compartilhados, fórmulas, mensagens e, principalmente,
                  de pessoas que sabem exatamente onde determinada informação está.
                </p>
                <p>Nesse momento, a empresa não tem necessariamente um problema de planilha.</p>
              </div>
              <div className="mt-10">
                <div className="h-px w-16 bg-accent" aria-hidden="true" />
                <p className="mt-6 text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                  Ela tem um problema de processo.
                </p>
              </div>
            </section>

            {/* 03 — O ponto de virada */}
            <section id="ponto-de-virada" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                O sinal não é o tamanho da planilha.
                <br />É a complexidade da operação.
              </h2>
              <DiagnosticSignals items={signals} />
            </section>

            {/* Experiência central — blueprint da operação hoje (fase 1 do ProcessFlow) */}
            <section aria-label="Como o processo evolui de uma planilha para um sistema">
              <ProcessFlow />
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK 1 — manifesto, full-bleed, pausa na leitura */}
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

        {/* CORPO EDITORIAL — bloco 2: quando migrar, o que pode virar software, como pensamos */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            {/* 05 — Quando migrar */}
            <section id="quando-migrar" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Quando o processo cresce
              </h2>
              <div className="mt-10 grid items-start gap-8 sm:grid-cols-[1fr_auto_1fr] sm:gap-6">
                <div className="border border-divider bg-surface p-6">
                  <h3 className="border-b border-divider pb-3 text-xs uppercase tracking-[0.2em] text-text/65">
                    Planilha
                  </h3>
                  <ul className="mt-4 divide-y divide-divider">
                    {planilhaItems.map((item) => (
                      <li key={item} className="py-3 text-text/70">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  aria-hidden="true"
                  className="hidden items-center justify-center pt-16 text-text/30 sm:flex"
                >
                  <ArrowRight className="h-5 w-5" />
                </div>

                <div className="border border-accent/25 bg-surface p-6">
                  <h3 className="flex items-center gap-2 border-b border-divider pb-3 text-xs uppercase tracking-[0.2em] text-text/65">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                    Sistema
                  </h3>
                  <ul className="mt-4 divide-y divide-divider">
                    {sistemaItems.map((item) => (
                      <li key={item} className="py-3 text-text">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-10 space-y-2 text-text/70">
                <p>Isso não significa abandonar a planilha.</p>
                <p>Significa entender quando ela deixou de ser a melhor ferramenta para aquele processo.</p>
              </div>
            </section>

            {/* 06 — A questão não é substituir */}
            <section>
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                A questão não é substituir a planilha.
              </h2>
              <div className="mt-8 space-y-5 text-lg text-text/75">
                <p>
                  Existem processos em que uma planilha continua sendo a solução mais
                  simples, rápida e adequada.
                </p>
                <p>
                  O ponto de decisão aparece quando o custo de manter o processo manual
                  começa a superar o benefício de continuar utilizando uma ferramenta
                  criada para organizar dados, e não necessariamente para executar toda a
                  operação.
                </p>
                <p>
                  Nesse momento, o software pode deixar de ser apenas uma ferramenta de
                  registro e passar a fazer parte da própria operação.
                </p>
              </div>
            </section>

            {/* 07 — O que pode virar software */}
            <section id="o-que-pode-virar-software" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Talvez o problema que você está tentando organizar já seja um produto.
              </h2>
              <p className="mt-4 max-w-xl text-sm text-text/65">
                Seis áreas de uma mesma operação — passe o cursor ou navegue com o
                teclado para destacar como elas se conectam.
              </p>
              <PossibilityMap />
            </section>

            {/* 08 — Como pensamos */}
            <section id="como-pensamos" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Antes de construir software, entendemos o processo.
              </h2>
              <EngineeringMethod />
            </section>

            {/* 09 — manifesto */}
            <section className="border-t border-divider py-10 text-right">
              <div className="ml-auto max-w-xl space-y-4">
                <p className="text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                  Você não precisa de um sistema porque sua empresa cresceu.
                </p>
                <p className="text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                  Você precisa de um sistema quando o seu processo deixou de caber na
                  forma como ele é executado.
                </p>
              </div>
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK 2 — o que levar desta leitura, full-bleed, menor que o manifesto */}
        <section style={darkVars} className="border-y border-divider bg-bg text-text py-20 sm:py-28">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-2xl">
              <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-text/55">
                O que levar desta leitura
              </h2>
              <div className="mt-8 space-y-6 text-xl font-medium leading-snug tracking-[-0.01em] sm:text-2xl">
                <p>Uma planilha não se torna insuficiente porque ficou grande.</p>
                <p className="text-text/70">
                  Ela se torna insuficiente quando informação, processo, pessoas e
                  decisões passam a depender de controles manuais demais.
                </p>
                <p className="pt-4">
                  Quando isso acontece, talvez o próximo passo não seja trocar de
                  ferramenta.
                  <br />
                  Talvez seja repensar como o trabalho acontece.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 3: CTA */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl">
            {/* 10 — CTA */}
            <section className="pt-4">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Seu processo ainda cabe em uma planilha?
              </h2>

              <div className="relative mt-8 aspect-[16/9] max-w-xl overflow-hidden">
                <Image
                  src="/img/caleb-jack-NaxA1dH_JGg-unsplash.jpg"
                  alt="Pessoa diante de uma instalação luminosa formada por milhares de pontos de luz"
                  fill
                  sizes="(min-width: 1024px) 42rem, 100vw"
                  className="object-cover grayscale contrast-[1.05]"
                />
              </div>

              <div className="mt-8 max-w-md space-y-2 text-lg text-text/75">
                <p>Talvez a resposta não esteja em trocar a ferramenta.</p>
                <p>Talvez esteja em repensar como o trabalho acontece.</p>
              </div>

              <Link href="/contato" className={`${buttonClasses("primary")} mt-8`}>
                Conversar sobre meu processo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>
          </div>
        </Container>
      </article>
    </main>
    <Footer />
    </>
  );
}
