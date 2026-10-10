import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { FlowChain } from "@/components/insights/FlowChain";
import { Link } from "@/i18n/navigation";
import { buildAlternates, buildOpenGraph } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const tMeta = await getTranslations({ locale, namespace: "InsightsMeta" });
  const t = await getTranslations({ locale, namespace: "InsightProduto" });
  return {
    title: tMeta("problemaInterno.title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/insights/e-se-um-problema-interno-pudesse-virar-um-produto"),
    openGraph: buildOpenGraph(locale, "/insights/e-se-um-problema-interno-pudesse-virar-um-produto", "article"),
  };
}

// Mesmo sistema visual dos outros dois insights (planilha e automação):
// superfície clara via .theme-light, duas ilhas .theme-dark para os momentos
// editoriais de maior peso, e o mesmo grid de leitura (índice + coluna de
// 46rem). FlowChain é reaproveitado deste mesmo sistema; nenhum componente
// compartilhado foi alterado para esta página.

const indexConfig = [
  { id: "problema", key: "problema" },
  { id: "da-solucao-interna-ao-produto", key: "solucaoProduto" },
  { id: "quando-pode-virar-produto", key: "quandoVirarProduto" },
  { id: "de-ferramenta-a-saas", key: "ferramentaSaas" },
  { id: "comecar-pequeno", key: "comecarPequeno" },
] as const;

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

const relatedArticlesConfig = [
  {
    metaKey: "tarefasSozinhas",
    href: "/insights/sua-empresa-ainda-depende-de-tarefas-que-poderiam-acontecer-sozinhas",
  },
  {
    metaKey: "quandoPlanilha",
    href: "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
  },
  {
    metaKey: "perdendoClientes",
    href: "/insights/sua-empresa-esta-perdendo-clientes-por-nao-ter-uma-pagina-que-vende",
  },
] as const;

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

export default function Page() {
  const t = useTranslations("InsightProduto");
  const tMeta = useTranslations("InsightsMeta");

  const indexItems = indexConfig.map((item) => ({
    id: item.id,
    label: t(`${item.key}.heading`),
  }));

  const internalFlow = t.raw("flows.internal") as string[];
  const revealedItems = t.raw("problema.revealedItems") as string[];
  const productFlow = t.raw("flows.product") as string[];
  const mvpComponents = t.raw("solucaoProduto.mvpComponents") as string[];
  const signals = t.raw("quandoVirarProduto.signals") as string[];
  const saasFlow = t.raw("flows.saas") as string[];
  const evolutionCaption = t.raw("flows.evolutionCaption") as string[];
  const startSmallFlow = t.raw("flows.startSmall") as string[];

  return (
    <>
    <main className="theme-light bg-bg text-text">
      {/* HERO — só texto: tese do artigo logo abaixo do título, sem diagrama */}
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {tMeta("problemaInterno.category")}
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              {tMeta("problemaInterno.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">{t("hero.intro")}</p>
            <div className="mt-10 max-w-xl">
              <div className="h-px w-16 bg-accent" aria-hidden="true" />
              <p className="mt-6 text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                {t("hero.pullQuote")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <article>
        {/* CORPO EDITORIAL — bloco 1: índice lateral + o problema vem primeiro */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <ArticleIndex items={indexItems} navLabel={tMeta("articleIndexLabel")} className="mb-14 lg:mb-0" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="problema" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("problema.heading")}
              </h2>
              <p className="mt-6 max-w-xl text-lg text-text/75">{t("problema.intro")}</p>
              <p className="mt-10 max-w-xl text-xl font-semibold leading-snug tracking-[-0.01em] text-text/80 sm:text-2xl">
                {t("problema.lead")}
              </p>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {t("problema.subheading")}
                </h3>
                <p className="mt-4 max-w-xl text-text/75">{t("problema.body")}</p>
                <FlowChain steps={internalFlow} className="mt-8" />
                <p className="mt-8 max-w-xl text-text/75">{t("problema.revealedIntro")}</p>
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
                {t("darkVirada.headingPrefix")}{" "}
                <span className="text-accent-2">{t("darkVirada.headingAccent")}</span>{" "}
                {t("darkVirada.headingSuffix")}
              </p>
              <p className="mt-8 max-w-xl text-lg text-text/70">{t("darkVirada.body")}</p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 2: da solução interna ao produto + sinais */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="da-solucao-interna-ao-produto" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("solucaoProduto.heading")}
              </h2>
              <FlowChain steps={productFlow} className="mt-10" />

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {t("solucaoProduto.subheading")}
                </h3>
                <p className="mt-4 max-w-xl text-text/75">{t("solucaoProduto.body1")}</p>
                <p className="mt-4 max-w-xl text-text/75">{t("solucaoProduto.body2")}</p>
                <ul className="mt-6 flex flex-col gap-3 text-text/75">
                  {mvpComponents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-6 max-w-xl text-lg font-semibold text-text/80">
                  {t("solucaoProduto.closing")}
                </p>
              </div>
            </section>

            <section id="quando-pode-virar-produto" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("quandoVirarProduto.heading")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">{t("quandoVirarProduto.intro")}</p>
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
                    {t("ferramentaSaas.heading")}
                  </h2>
                  <p className="mt-6 text-lg text-text/75">{t("ferramentaSaas.body")}</p>
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
                      alt={t("ferramentaSaas.imageAlt")}
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
                {t("darkSentido.headingPrefix")}{" "}
                <span className="text-accent-2">{t("darkSentido.headingAccent")}</span> {t("darkSentido.headingSuffix")}
              </p>
              <p className="mt-8 max-w-xl text-lg text-text/70">{t("darkSentido.body")}</p>
              <p className="mt-6 text-2xl font-bold tracking-[-0.01em] text-text sm:text-3xl">
                {t("darkSentido.closing")}
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
                {t("comecarPequeno.heading")}
              </h2>
              <FlowChain steps={startSmallFlow} className="mt-10" />
              <p className="mt-8 max-w-xl text-text/75">{t("comecarPequeno.body")}</p>
            </section>
          </div>
        </Container>

        {/* CORPO EDITORIAL — bloco 5: conclusão + CTA + continue lendo */}
        <Container className={`border-t border-divider py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24">
            <section>
              <div className="max-w-xl space-y-4 text-lg text-text/75">
                <p>{t("hero.pullQuote")}</p>
                <p>{t("closing.paragraph2")}</p>
                <p>{t("closing.paragraph3")}</p>
              </div>

              <h2 className="mt-14 text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("closing.heading")}
              </h2>
              <p className="mt-6 max-w-md text-lg text-text/75">{t("closing.body")}</p>

              <Link href="/#contato" className={`${buttonClasses("primary")} mt-8`}>
                {t("closing.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section aria-label={t("continueReading")} className="border-t border-divider pt-10 sm:pt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text/60">{t("continueReading")}</p>
              <div className="mt-7 grid gap-8 sm:grid-cols-3 sm:gap-10">
                {relatedArticlesConfig.map((article) => (
                  <Link
                    key={article.metaKey}
                    href={article.href}
                    className="block no-underline text-text"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-accent">
                      {tMeta(`${article.metaKey}.category`)}
                    </p>
                    <p className="mt-2.5 text-lg font-semibold leading-snug transition-colors duration-200 hover:text-accent-2">
                      {tMeta(`${article.metaKey}.title`)}
                    </p>
                  </Link>
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
