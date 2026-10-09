import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Footer } from "@/components/Footer";
import { Link } from "@/i18n/navigation";
import { ArticleIndex } from "@/components/insights/ArticleIndex";
import { FlowChain } from "@/components/insights/FlowChain";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const metaT = await getTranslations({ locale, namespace: "InsightsMeta" });
  const t = await getTranslations({ locale, namespace: "InsightAutomacao" });

  return {
    title: `${metaT("tarefasSozinhas.title")} | Yzev`,
    description: t("meta.description"),
  };
}

// Mesmo sistema visual da página "Quando uma planilha deixa de ser
// suficiente?": superfície clara via .theme-light, ilhas full-bleed em
// .theme-dark para os dois momentos editoriais de maior peso, e o mesmo grid
// de leitura (índice + coluna de 46rem). Nenhum componente compartilhado foi
// alterado para esta página; FlowChain é novo e só é usado aqui.

// Grid com a mesma largura de coluna do índice lateral, usado nos blocos que
// vêm depois do primeiro (índice não se repete — some, e o texto continua
// alinhado à mesma margem esquerda do artigo).
const readingGrid = "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-16";

type RelatedArticle = {
  metaKey: "quandoPlanilha" | "problemaInterno";
  href: string;
};

// Tag e título vêm do namespace compartilhado InsightsMeta: as mesmas frases
// já têm tradução canônica nos artigos de origem, então reaproveitamos em
// vez de traduzir a mesma sentença duas vezes.
const relatedArticles: RelatedArticle[] = [
  {
    metaKey: "quandoPlanilha",
    href: "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
  },
  {
    metaKey: "problemaInterno",
    href: "/insights/e-se-um-problema-interno-pudesse-virar-um-produto",
  },
];

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
  const t = useTranslations("InsightAutomacao");
  const tMeta = useTranslations("InsightsMeta");

  const indexItems = [
    { id: "processo-manual", label: t("indexItems.processoManual") },
    { id: "processo-automatizado", label: t("indexItems.processoAutomatizado") },
    { id: "o-que-pode-acontecer-sozinho", label: t("indexItems.oQuePodeAcontecerSozinho") },
    { id: "outros-exemplos", label: t("indexItems.outrosExemplos") },
    { id: "como-pensamos", label: t("indexItems.comoPensamos") },
  ];

  const manualFlowGroups = t.raw("manualProcess.groups") as { label: string; steps: string[] }[];
  const automatedFlow = t.raw("automatedProcess.steps") as string[];
  const automaticItems = t.raw("canHappenAlone.automaticItems") as string[];
  const personItems = t.raw("canHappenAlone.personItems") as string[];
  const otherAreas = t.raw("otherAreasSection.areas") as { label: string; stages: string[] }[];
  const ordersFlow = t.raw("otherAreasSection.ordersFlow") as string[];
  const documentsFlow = t.raw("otherAreasSection.documentsFlow") as string[];
  const methodParagraphs = t.raw("methodSection.paragraphs") as string[];
  const startSmallFlow = t.raw("methodSection.startSmallFlow") as string[];
  const method = (t.raw("methodSection.method") as { title: string; text: string }[]).map(
    (step, index) => ({ number: String(index + 1).padStart(2, "0"), ...step }),
  );

  return (
    <>
    <main className="theme-light bg-bg text-text">
      {/* HERO — só texto: tese do artigo logo abaixo do título, sem diagrama */}
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">
              {tMeta("tarefasSozinhas.category")}
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              {tMeta("tarefasSozinhas.title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">{t("hero.intro")}</p>
            <div className="mt-10 max-w-xl">
              <div className="h-px w-16 bg-accent" aria-hidden="true" />
              <p className="mt-6 text-2xl font-bold leading-snug tracking-[-0.01em] sm:text-3xl">
                {t("hero.quote")}
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
                {t("manualProcess.heading")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                {t("manualProcess.intro")}
              </p>
              <FlowChain groups={manualFlowGroups} emphasizeLast={false} className="mt-10" />
              <p className="mt-10 max-w-xl text-xl font-semibold leading-snug tracking-[-0.01em] text-text/80 sm:text-2xl">
                {t("manualProcess.closing")}
              </p>
            </section>

            {/* O mesmo processo automatizado */}
            <section id="processo-automatizado" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("automatedProcess.heading")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                {t("automatedProcess.intro")}
              </p>
              <FlowChain
                steps={automatedFlow}
                tone="automated"
                branch={{
                  condition: t("automatedProcess.branch.condition"),
                  result: t("automatedProcess.branch.result"),
                }}
                className="mt-10"
              />
              <p className="mt-10 max-w-xl text-lg text-text/75">
                {t("automatedProcess.closing")}
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
                {t.rich("darkQuestion", {
                  br: () => <br />,
                  accent: (chunks) => <span className="text-accent-2">{chunks}</span>,
                })}
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
                {t("indexItems.oQuePodeAcontecerSozinho")}
              </h2>
              <div className="mt-10 grid gap-10 sm:grid-cols-2 sm:gap-14">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-accent-2">
                    {t("canHappenAlone.automaticLabel")}
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
                  <p className="text-xs uppercase tracking-[0.2em] text-text/60">{t("canHappenAlone.personLabel")}</p>
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
                  {t("canHappenAlone.quote1")}
                </p>
                <p className="mt-2 text-xl leading-snug text-text/70 sm:text-2xl">
                  {t("canHappenAlone.quote2")}
                </p>
              </div>
            </section>

            {/* Outros exemplos */}
            <section id="outros-exemplos" className="scroll-mt-28">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("otherAreasSection.heading")}
              </h2>
              <p className="mt-5 max-w-xl text-lg text-text/75">
                {t("otherAreasSection.intro")}
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
                  {t("otherAreasSection.ordersHeading")}
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  {t("otherAreasSection.ordersIntro")}
                </p>
                <FlowChain steps={ordersFlow} className="mt-8" />
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {t("otherAreasSection.documentsHeading")}
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  {t("otherAreasSection.documentsIntro")}
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
                {t("methodSection.heading")}
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-lg text-text/75">
                {methodParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {t("methodSection.startSmallHeading")}
                </h3>
                <p className="mt-4 max-w-xl text-text/75">
                  {t("methodSection.startSmallIntro")}
                </p>
                <FlowChain steps={startSmallFlow} className="mt-8" />
              </div>

              <div className="mt-16">
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {t("indexItems.comoPensamos")}
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
                {t.rich("darkBigIdea.text", {
                  accent: (chunks) => <span className="text-accent-2">{chunks}</span>,
                })}
              </p>
              <div className="mt-8 max-w-xl space-y-2 text-lg text-text/70">
                <p>{t("darkBigIdea.paragraph1")}</p>
                <p>{t("darkBigIdea.paragraph2")}</p>
              </div>
              <p className="mt-6 text-2xl font-bold tracking-[-0.01em] text-text sm:text-3xl">
                {t("darkBigIdea.closing")}
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
                {t("conclusion.heading")}
              </h2>
              <p className="mt-6 max-w-md text-lg text-text/75">
                {t("conclusion.intro")}
              </p>

              <Link href="/#contato" className={`${buttonClasses("primary")} mt-8`}>
                {t("conclusion.cta")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </section>

            <section aria-label={t("conclusion.continueReading")} className="border-t border-divider pt-10 sm:pt-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text/60">{t("conclusion.continueReading")}</p>
              <div className="mt-7 grid gap-8 sm:grid-cols-2 sm:gap-10">
                {relatedArticles.map((article) => (
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
