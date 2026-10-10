import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { HeroFlow } from "@/components/insights/HeroFlow";
import { DiagnosticSignals } from "@/components/insights/DiagnosticSignals";
import { PossibilityMap } from "@/components/insights/PossibilityMap";
import { buildAlternates, buildOpenGraph } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metaT = await getTranslations({ locale, namespace: "InsightsMeta" });
  const t = await getTranslations({ locale, namespace: "InsightPlanilha" });

  return {
    title: metaT("quandoPlanilha.title"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/insights/quando-uma-planilha-deixa-de-ser-suficiente"),
    openGraph: buildOpenGraph(locale, "/insights/quando-uma-planilha-deixa-de-ser-suficiente", "article"),
  };
}

// Esta página adota a superfície clara (off-white) só nesta rota, via a classe
// .theme-light de globals.css, que redeclara localmente as variáveis de
// superfície (bg, surface, text, divider) e faz --color-accent-2 valer o verde
// musgo de marca, legível sobre claro. O manifesto é uma ilha .theme-dark
// full-bleed no meio da página, com o verde de destaque legível sobre preto.

const indexKeys = ["problema", "sinais", "oQueMuda", "oQuePodeVirarSoftware"] as const;
const indexIds = ["problema", "sinais", "o-que-muda", "o-que-pode-virar-software"] as const;

const problemBarKeys = ["informacao", "ferramentas", "pessoas", "decisoes"] as const;
const problemBarMeta = [
  { width: "32%", strong: false },
  { width: "54%", strong: false },
  { width: "76%", strong: false },
  { width: "100%", strong: true },
];

type Signal = {
  number: string;
  kicker: string;
  heading: string;
  text: string;
};

const relatedArticles = [
  {
    metaKey: "tarefasSozinhas",
    href: "/insights/sua-empresa-ainda-depende-de-tarefas-que-poderiam-acontecer-sozinhas",
  },
  {
    metaKey: "problemaInterno",
    href: "/insights/e-se-um-problema-interno-pudesse-virar-um-produto",
  },
] as const;

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

export default function Page() {
  const t = useTranslations("InsightPlanilha");
  const metaT = useTranslations("InsightsMeta");

  const indexItems = indexKeys.map((key, index) => ({
    id: indexIds[index],
    label: t(`index.${key}`),
  }));

  const problemBars = problemBarKeys.map((key, index) => ({
    label: t(`problem.bars.${key}`),
    width: problemBarMeta[index].width,
    strong: problemBarMeta[index].strong,
  }));

  const signals = t.raw("signals.items") as Signal[];

  const planilhaItems = t.raw("whatChanges.planilhaItems") as string[];
  const sistemaItems = t.raw("whatChanges.sistemaItems") as string[];

  return (
    <>
    <main className="theme-light bg-bg text-text">
      {/* HERO — texto à esquerda, diagrama do pedido fragmentado à direita */}
      <section className="border-b border-divider">
        <Container className="grid gap-12 py-16 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:py-24">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {metaT("quandoPlanilha.category")}
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
              {metaT("quandoPlanilha.title")}
            </h1>
            <p className="mt-6 max-w-md text-lg text-text/75">{t("heroIntro")}</p>
          </div>

          <HeroFlow labels={t.raw("heroFlow")} />
        </Container>
      </section>

      <article>
        {/* CORPO EDITORIAL — bloco 1: índice lateral + problema + sinais */}
        <Container className={`py-20 sm:py-24 ${readingGrid} lg:py-28`}>
          <ArticleIndex items={indexItems} navLabel={metaT("articleIndexLabel")} className="mb-14 lg:mb-0" />

          <div className="max-w-3xl space-y-20 sm:space-y-24 lg:space-y-28">
            {/* 02 — O problema */}
            <section id="problema" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("problem.title")}
              </h2>
              <div className="mt-9 flex flex-wrap items-start gap-10 sm:gap-12">
                <div className="flex-1 space-y-5 text-lg text-text/75 sm:min-w-[20rem]">
                  <p>{t("problem.paragraph1")}</p>
                  <p>{t("problem.paragraph2")}</p>
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
                  {t("problem.calloutLight")}
                </p>
                <div className="mt-7 h-px w-16 bg-accent" aria-hidden="true" />
                <p className="mt-6 text-4xl font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl">
                  {t("problem.calloutBold")}
                </p>
              </div>
            </section>

            {/* 03 — Os quatro sinais */}
            <section id="sinais" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("signals.titleLine1")}
                <br />
                {t("signals.titleLine2")}
              </h2>
              <p className="mt-5 text-lg text-text/75">{t("signals.intro")}</p>
              <DiagnosticSignals items={signals} labels={t.raw("signals.visuals")} />
            </section>
          </div>
        </Container>

        {/* MOMENTO DARK — manifesto, full-bleed, pausa na leitura */}
        <section className="theme-dark border-y border-divider bg-bg text-text py-24 sm:py-32">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <div className="max-w-3xl">
              <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
              <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-5xl lg:text-6xl">
                {t("manifesto.part1")}{" "}
                <span className="text-accent-2">{t("manifesto.highlight")}</span>
                {t("manifesto.part2")}
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
                {t("whatChanges.title")}
              </h2>
              <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-14">
                <div>
                  <h3 className="border-t border-divider pt-3.5 text-xs uppercase tracking-[0.2em] text-text/60">
                    {t("whatChanges.planilhaHeading")}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 text-text/75">
                    {planilhaItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="border-t border-accent pt-3.5 text-xs uppercase tracking-[0.2em] text-accent">
                    {t("whatChanges.sistemaHeading")}
                  </h3>
                  <ul className="mt-4 flex flex-col gap-3 text-text">
                    {sistemaItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-10 space-y-4 text-lg text-text/75">
                <p>{t("whatChanges.paragraph1")}</p>
                <p>{t("whatChanges.paragraph2")}</p>
              </div>
            </section>

            {/* 06 — O que pode virar software */}
            <section id="o-que-pode-virar-software" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("possibility.title")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">{t("possibility.intro")}</p>
              <PossibilityMap items={t.raw("possibility.items")} />
            </section>
          </div>
        </Container>

        {/* Painel de operação — recorte de como a mesma operação fica organizada por software */}
        <section aria-label={t("operationPanel.ariaLabel")} className="pb-20 sm:pb-24 lg:pb-28">
          <Container className={readingGrid}>
            <div aria-hidden="true" className="hidden lg:block" />
            <figure className="m-0 max-w-3xl overflow-hidden border border-divider">
              <Image
                src="/img/yzev-planilha.png"
                alt={t("operationPanel.imageAlt")}
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
                {t("cta.title")}
              </h2>
              <div className="mt-6 max-w-md space-y-4 text-lg text-text/75">
                <p>{t("cta.paragraph1")}</p>
                <p>{t("cta.paragraph2")}</p>
              </div>

              <Link href="/#contato" className={`${buttonClasses("primary")} mt-8`}>
                {t("cta.buttonLabel")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            {/* 08 — Continue lendo */}
            <section aria-label={t("continueReading.label")} className="border-t border-divider pt-10 sm:pt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text/60">
                {t("continueReading.label")}
              </p>
              <div className="mt-7 grid gap-8 sm:grid-cols-2 sm:gap-10">
                {relatedArticles.map((article) => (
                  <Link key={article.metaKey} href={article.href} className="block no-underline text-text">
                    <p className="text-xs uppercase tracking-[0.16em] text-accent">
                      {metaT(`${article.metaKey}.category`)}
                    </p>
                    <p className="mt-2.5 text-lg font-semibold leading-snug transition-colors duration-200 hover:text-accent-2">
                      {metaT(`${article.metaKey}.title`)}
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
