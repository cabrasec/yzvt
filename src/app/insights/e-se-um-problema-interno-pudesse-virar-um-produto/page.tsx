import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { FlowChain } from "@/components/insights/FlowChain";

export const metadata: Metadata = {
  title: "E se um problema interno pudesse virar um produto? | Yzev",
  description:
    "Às vezes, o próximo produto da sua empresa está escondido dentro de um problema que ela já resolveu.",
};

// Mesmo sistema visual dos outros dois insights (planilha e automação):
// superfície clara via .theme-light, duas ilhas .theme-dark para os momentos
// editoriais de maior peso, e o mesmo grid de leitura (índice + coluna de
// 46rem). FlowChain é reaproveitado deste mesmo sistema; nenhum componente
// compartilhado foi alterado para esta página.

const indexItems = [
  { id: "problema", label: "Todo produto começa com um problema" },
  { id: "da-solucao-interna-ao-produto", label: "Da solução interna ao produto" },
  { id: "quando-pode-virar-produto", label: "Quando uma solução pode virar produto" },
  { id: "de-ferramenta-a-saas", label: "De ferramenta interna a SaaS" },
  { id: "comecar-pequeno", label: "Começar pequeno" },
];

const internalFlow = ["Problema", "Solução interna", "Processo mais organizado"];

const revealedItems = [
  "Quem usa a solução",
  "Qual problema realmente precisa ser resolvido",
  "Quais etapas são desnecessárias",
  "Quais informações são importantes",
  "Onde estão as exceções",
  "O que realmente gera valor",
];

const productFlow = ["Problema interno", "Solução interna", "Problema recorrente", "MVP", "Produto"];

const mvpComponents = ["Cadastro", "Acompanhamento da solicitação", "Atualização de status", "Notificações"];

const signals = [
  "O problema aparece com frequência",
  "Outras empresas enfrentam a mesma dificuldade",
  "Existe um processo que pode ser padronizado",
  "A solução gera valor claro",
  "Existe disposição para pagar pela solução",
  "O problema continua existindo mesmo depois da primeira solução",
];

const saasFlow = ["Ferramenta interna", "MVP", "Primeiros usuários", "Validação", "SaaS / MicroSaaS"];

const evolutionCaption = ["Problema", "Solução", "MVP", "Produto"];

// Legenda discreta para a imagem da seção "De ferramenta interna a SaaS":
// uma linha fina horizontal com nós pequenos, tipografia minúscula e o
// último passo em verde — um eco contido da própria imagem, não uma
// segunda camada de conteúdo.
function EvolutionCaption({ steps }: { steps: string[] }) {
  return (
    <div aria-hidden="true" className="flex items-center">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        return (
          <div key={step} className="flex items-center">
            {index > 0 && <span className="h-px w-6 shrink-0 bg-divider sm:w-8" />}
            <div className="flex items-center gap-1.5">
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                  isLast ? "bg-accent-2" : "border border-text/35 bg-bg"
                }`}
              />
              <span
                className={`whitespace-nowrap text-[11px] uppercase tracking-[0.12em] ${
                  isLast ? "font-semibold text-accent-2" : "text-text/45"
                }`}
              >
                {step}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

const startSmallFlow = ["Identificar", "Entender", "Prototipar", "Validar", "Construir", "Evoluir"];

const relatedArticles = [
  {
    tag: "Automação",
    title: "Sua empresa ainda depende de tarefas que poderiam acontecer sozinhas?",
    href: "/insights/sua-empresa-ainda-depende-de-tarefas-que-poderiam-acontecer-sozinhas",
  },
  {
    tag: "Software",
    title: "Quando uma planilha deixa de ser suficiente?",
    href: "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
  },
  {
    tag: "Desenvolvimento Web",
    title: "Sua empresa está perdendo clientes por não ter uma página que vende?",
    href: "/insights/sua-empresa-esta-perdendo-clientes-por-nao-ter-uma-pagina-que-vende",
  },
];

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

export default function Page() {
  return (
    <>
    <main className="theme-light bg-bg text-text">
      {/* HERO — só texto: tese do artigo logo abaixo do título, sem diagrama */}
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Produto</p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              E se um problema interno pudesse virar um produto?
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">
              Produtos relevantes normalmente começam do mesmo jeito: uma
              empresa percebe que perde tempo controlando pedidos, clientes,
              documentos, agenda, estoque, aprovações ou acompanhamento de
              tarefas.
            </p>
            <div className="mt-10 max-w-xl">
              <div className="h-px w-16 bg-accent" aria-hidden="true" />
              <p className="mt-6 text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                Às vezes, o próximo produto da sua empresa está escondido
                dentro de um problema que ela já resolveu.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <article>
        {/* CORPO EDITORIAL — bloco 1: índice lateral + o problema vem primeiro */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <ArticleIndex items={indexItems} className="mb-14 lg:mb-0" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="problema" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Todo produto começa com um problema
              </h2>
              <p className="mt-6 max-w-xl text-lg text-text/75">
                Primeiro existe o problema. Depois vem a tentativa de
                resolvê-lo.
              </p>
              <p className="mt-10 max-w-xl text-xl font-semibold leading-snug tracking-[-0.01em] text-text/80 sm:text-2xl">
                Um produto não começa com uma tecnologia. Começa com um
                problema que vale a pena resolver.
              </p>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  Primeiro, resolva para você
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  Uma empresa pode criar uma ferramenta própria para resolver
                  uma necessidade interna. Nesse estágio, o objetivo não é
                  vender software. É fazer o próprio processo funcionar
                  melhor.
                </p>
                <FlowChain steps={internalFlow} className="mt-8" />
                <p className="mt-8 max-w-xl text-text/75">
                  Esse processo também revela coisas que não dava para ver de
                  fora:
                </p>
                <ul className="mt-6 flex flex-col gap-3 text-text/75">
                  {revealedItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK — a virada */}
        <section className="theme-dark border-y border-divider bg-bg text-text py-24 sm:py-32">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-3xl">
              <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
              <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                E se{" "}
                <span className="text-accent-2">outras empresas</span>{" "}
                tiverem o mesmo problema?
              </p>
              <p className="mt-8 max-w-xl text-lg text-text/70">
                Se outras empresas enfrentam uma dor parecida, uma solução
                criada internamente pode ter potencial para se tornar um
                produto. Isso não significa que todo problema interno vai
                virar produto. É uma possibilidade, e toda possibilidade
                assim precisa ser validada.
              </p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 2: da solução interna ao produto + sinais */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="da-solucao-interna-ao-produto" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Da solução interna ao produto
              </h2>
              <FlowChain steps={productFlow} className="mt-10" />

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  Não é preciso começar grande
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  Um MVP não precisa ser uma plataforma enorme. Pode ser uma
                  solução pequena que resolve uma parte importante de um
                  problema específico.
                </p>
                <p className="mt-4 max-w-xl text-text/75">
                  Uma empresa percebe, por exemplo, que seus clientes
                  precisam acompanhar solicitações. Em vez de construir uma
                  plataforma completa com dezenas de funcionalidades, pode
                  começar com:
                </p>
                <ul className="mt-6 flex flex-col gap-3 text-text/75">
                  {mvpComponents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-6 max-w-xl text-lg font-semibold text-text/80">
                  Depois, conforme o uso mostra novas necessidades, o produto
                  pode evoluir.
                </p>
              </div>
            </section>

            <section id="quando-pode-virar-produto" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Quando uma solução pode virar produto
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                Alguns sinais ajudam a enxergar isso:
              </p>
              <ul className="mt-6 flex flex-col gap-3 text-text/75">
                {signals.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          </div>
        </Container>

        {/* CORPO EDITORIAL — bloco 3: de ferramenta a SaaS, composição editorial
            de duas colunas assimétricas (texto + diagrama à esquerda, imagem
            contida à direita), em vez de texto seguido de imagem gigante. */}
        <Container className={`border-t border-divider py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-5xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="de-ferramenta-a-saas" className="scroll-mt-28">
              <div className="lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-start lg:gap-16">
                <div className="max-w-md">
                  <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                    De ferramenta interna a SaaS
                  </h2>
                  <p className="mt-6 text-lg text-text/75">
                    SaaS pode transformar uma solução específica em um
                    produto usado continuamente por outras empresas.
                    MicroSaaS é uma possibilidade parecida, só que para
                    soluções menores e bem focadas: resolvem um problema
                    específico, sem tentar fazer de tudo.
                  </p>
                  <FlowChain steps={saasFlow} className="mt-12" />
                </div>

                <div className="mt-14 lg:mt-10">
                  <EvolutionCaption steps={evolutionCaption} />

                  {/* Satura e contrasta menos que o arquivo original: a
                      composição (quatro painéis evoluindo) permanece, mas o
                      verde-neon e o ar de dashboard de SaaS ficam mais
                      discretos, próximos da paleta editorial do artigo. Sem
                      borda, sem card, sem sombra — a imagem funciona como
                      peça solta na página, contida apenas pela própria
                      largura. */}
                  <figure className="m-0 mt-6 max-w-xs lg:ml-auto lg:max-w-[22rem]">
                    <Image
                      src="/img/da-solucao-interna-ao-produto.png"
                      alt="Quatro janelas em sequência, cada vez mais definidas, com as etiquetas Problema interno, Solução interna, MVP e Produto, representando essa evolução"
                      width={1024}
                      height={1536}
                      sizes="(min-width: 1024px) 22rem, 20rem"
                      className="h-auto w-full saturate-[0.55] contrast-[1.03] brightness-[0.96]"
                    />
                  </figure>
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
                Antes de ser vendido, um produto precisa{" "}
                <span className="text-accent-2">fazer sentido</span> para
                alguém.
              </p>
              <p className="mt-8 max-w-xl text-lg text-text/70">
                Validar o problema e a necessidade vem antes de investir em
                uma plataforma complexa. A pergunta não deve ser &ldquo;o que
                podemos construir?&rdquo;.
              </p>
              <p className="mt-6 text-2xl font-bold tracking-[-0.01em] text-text sm:text-3xl">
                É: qual problema vale a pena resolver?
              </p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 4: começar pequeno */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl">
            <section id="comecar-pequeno" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Começar pequeno
              </h2>
              <FlowChain steps={startSmallFlow} className="mt-10" />
              <p className="mt-8 max-w-xl text-text/75">
                O produto pode crescer conforme existe evidência de que a
                solução realmente resolve um problema.
              </p>
            </section>
          </div>
        </Container>

        {/* CORPO EDITORIAL — bloco 5: conclusão + CTA + continue lendo */}
        <Container className={`border-t border-divider py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24">
            <section>
              <div className="max-w-xl space-y-4 text-lg text-text/75">
                <p>
                  Às vezes, o próximo produto da sua empresa está escondido
                  dentro de um problema que ela já resolveu.
                </p>
                <p>
                  Uma ferramenta criada para organizar a própria operação
                  pode revelar um processo que outras empresas também
                  precisam resolver.
                </p>
                <p>
                  O primeiro passo não é construir uma grande plataforma. É
                  entender se existe um problema real, recorrente e
                  relevante o suficiente para virar uma solução.
                </p>
              </div>

              <h2 className="mt-14 text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                Existe um problema que sua empresa já resolveu internamente?
              </h2>
              <p className="mt-6 max-w-md text-lg text-text/75">
                O primeiro passo pode ser simples: entender se esse problema
                também é de outras empresas.
              </p>

              <Link href="/#contato" className={`${buttonClasses("primary")} mt-8`}>
                Conversar sobre meu produto
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section aria-label="Continue lendo" className="border-t border-divider pt-10 sm:pt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text/60">Continue lendo</p>
              <div className="mt-7 grid gap-8 sm:grid-cols-3 sm:gap-10">
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
