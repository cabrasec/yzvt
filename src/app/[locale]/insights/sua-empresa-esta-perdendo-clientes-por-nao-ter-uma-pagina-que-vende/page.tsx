import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { FlowChain } from "@/components/insights/FlowChain";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const [t, tMeta] = await Promise.all([
    getTranslations({ locale, namespace: "InsightLandingPage" }),
    getTranslations({ locale, namespace: "InsightsMeta" }),
  ]);

  return {
    title: `${tMeta("perdendoClientes.title")} | Yzev`,
    description: t("metaDescription"),
  };
}

// Mesmo sistema visual das outras duas páginas de insight: superfície clara
// via .theme-light, duas ilhas .theme-dark para os momentos editoriais de
// maior peso, e o mesmo grid de leitura (índice + coluna de 46rem).
// FlowChain é reaproveitado deste mesmo sistema (insights/automação); nenhum
// componente compartilhado foi alterado para esta página.

const relatedArticleHrefs = [
  "/insights/sua-empresa-ainda-depende-de-tarefas-que-poderiam-acontecer-sozinhas",
  "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
  "/insights/e-se-um-problema-interno-pudesse-virar-um-produto",
] as const;

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

type RelatedArticle = { tag: string; title: string };

export default function Page() {
  const t = useTranslations("InsightLandingPage");
  const tMeta = useTranslations("InsightsMeta");
  const locale = useLocale() as AppLocale;

  // Âncora nativa para #contato precisa do prefixo de locale montado à mão
  // (bypassa o Link do next-intl de propósito — mesma razão do Header.tsx:
  // o roteamento client-side, vindo de outra rota, tenta rolar até #contato
  // antes do ScrollTrigger terminar de medir, e o scroll erra o alvo).
  const contatoHref = locale === routing.defaultLocale ? "/#contato" : `/${locale}/#contato`;

  const indexItems = [
    { id: "problema", label: t("index.problema") },
    { id: "uma-pagina-uma-funcao", label: t("index.umaPaginaUmaFuncao") },
    { id: "o-que-uma-boa-pagina-precisa", label: t("index.oQueUmaBoaPaginaPrecisa") },
    { id: "quando-faz-mais-sentido", label: t("index.quandoFazMaisSentido") },
    { id: "comecar-pequeno", label: t("index.comecarPequeno") },
  ];

  const commercialFlow = t.raw("umaFuncaoSo.flowSteps") as string[];
  const pageComponents = t.raw("umaFuncaoSo.pageComponents") as string[];
  const communicatesItems = t.raw("boaPagina.communicatesItems") as string[];
  const behavesItems = t.raw("boaPagina.behavesItems") as string[];
  const contactFlow = t.raw("quandoFazSentido.flowSteps") as string[];
  const startSmallFlow = t.raw("comecarPequeno.flowSteps") as string[];
  const relatedArticles = t.raw("continueReading.articles") as RelatedArticle[];

  return (
    <>
    <main className="theme-light bg-bg text-text">
      {/* HERO — só texto: tese do artigo logo abaixo do título, sem diagrama */}
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{tMeta("perdendoClientes.category")}</p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              {tMeta("perdendoClientes.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">{t("heroIntro")}</p>
            <div className="mt-10 max-w-xl">
              <div className="h-px w-16 bg-accent" aria-hidden="true" />
              <p className="mt-6 text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                {t("metaDescription")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <article>
        {/* CORPO EDITORIAL — bloco 1: índice lateral + problema */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <ArticleIndex items={indexItems} className="mb-14 lg:mb-0" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="problema" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("problema.title")}
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg text-text/75">
                <p>{t("problema.paragraph1")}</p>
                <p>{t("problema.paragraph2")}</p>
              </div>
              <p className="mt-10 max-w-xl text-xl font-semibold leading-snug tracking-[-0.01em] text-text/80 sm:text-2xl">
                {t("problema.highlight")}
              </p>
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK — site vs. página comercial */}
        <section className="theme-dark border-y border-divider bg-bg text-text py-24 sm:py-32">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-3xl">
              <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
              <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                {t("siteVsComercial.headlineBefore")}
                <span className="text-accent-2">{t("siteVsComercial.headlineHighlight")}</span>
                {t("siteVsComercial.headlineAfter")}
              </p>
              <p className="mt-8 max-w-xl text-lg text-text/70">{t("siteVsComercial.body")}</p>
            </div>
          </Container>
        </section>

        {/* CORPO EDITORIAL — bloco 2: uma função só + o que uma boa página precisa */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="uma-pagina-uma-funcao" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("index.umaPaginaUmaFuncao")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">{t("umaFuncaoSo.intro")}</p>
              <FlowChain steps={commercialFlow} className="mt-10" />

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {t("umaFuncaoSo.exampleTitle")}
                </h3>
                <p className="mt-4 max-w-xl text-text/75">{t("umaFuncaoSo.exampleIntro")}</p>
                <ul className="mt-6 flex flex-col gap-3 text-text/75">
                  {pageComponents.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="mt-6 max-w-xl text-lg font-semibold text-text/80">{t("umaFuncaoSo.closing")}</p>
              </div>
            </section>

            <section id="o-que-uma-boa-pagina-precisa" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("boaPagina.title")}
              </h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-14">
                <div>
                  <h3 className="border-t border-divider pt-3.5 text-xs uppercase tracking-[0.2em] text-text/60">
                    {t("boaPagina.communicatesTitle")}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 text-text">
                    {communicatesItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="border-t border-accent pt-3.5 text-xs uppercase tracking-[0.2em] text-accent">
                    {t("boaPagina.behavesTitle")}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 text-text">
                    {behavesItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="mt-10 max-w-xl text-lg text-text/75">{t("boaPagina.closing")}</p>
            </section>
          </div>
        </Container>

        {/* CORPO EDITORIAL — bloco 3: quando faz mais sentido + começar pequeno */}
        <Container className={`border-t border-divider py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <div aria-hidden="true" className="hidden lg:block" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            <section id="quando-faz-mais-sentido" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("quandoFazSentido.title")}
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg text-text/75">
                <p>{t("quandoFazSentido.paragraph1")}</p>
                <p>{t("quandoFazSentido.paragraph2")}</p>
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {t("quandoFazSentido.stepsTitle")}
                </h3>
                <FlowChain steps={contactFlow} className="mt-8" />
                <p className="mt-8 max-w-xl text-text/75">{t("quandoFazSentido.closing")}</p>
              </div>
            </section>

            <section id="comecar-pequeno" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("comecarPequeno.title")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">{t("comecarPequeno.intro")}</p>
              <FlowChain steps={startSmallFlow} className="mt-10" />
              <p className="mt-10 max-w-xl text-lg text-text/75">{t("comecarPequeno.closing")}</p>
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
                {t("bigIdea.headlineBefore")}
                <span className="text-accent-2">{t("bigIdea.headlineHighlight")}</span>
                {t("bigIdea.headlineAfter")}
              </p>
              <div className="mt-8 max-w-xl space-y-2 text-lg text-text/70">
                <p>{t("bigIdea.body")}</p>
              </div>
              <p className="mt-6 text-2xl font-bold tracking-[-0.01em] text-text sm:text-3xl">
                {t("bigIdea.finalLine")}
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
                <p>{t("conclusion.paragraph1")}</p>
                <p>{t("conclusion.paragraph2")}</p>
              </div>

              <h2 className="mt-14 text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("conclusion.ctaTitle")}
              </h2>
              <p className="mt-6 max-w-md text-lg text-text/75">{t("conclusion.ctaBody")}</p>

              <a href={contatoHref} className={`${buttonClasses("primary")} mt-8`}>
                {t("conclusion.ctaButton")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </section>

            <section aria-label="Continue lendo" className="border-t border-divider pt-10 sm:pt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text/60">{t("continueReading.label")}</p>
              <div className="mt-7 grid gap-8 sm:grid-cols-3 sm:gap-10">
                {relatedArticles.map((article, index) => (
                  <Link
                    key={article.tag}
                    href={relatedArticleHrefs[index] ?? "/insights"}
                    className="block no-underline text-text"
                  >
                    <p className="text-xs uppercase tracking-[0.16em] text-accent">{article.tag}</p>
                    <p className="mt-2.5 text-lg font-semibold leading-snug transition-colors duration-200 hover:text-accent-2">
                      {article.title}
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
