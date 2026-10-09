import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { FlowChain } from "@/components/insights/FlowChain";
import { Link } from "@/i18n/navigation";

// Nenhum número, cliente, equipe ou case é citado nesta página — apenas o
// posicionamento que já existe no site (Home, Insights). FlowChain é
// reaproveitado do sistema dos Insights para as duas composições de linha
// (não são passos sequenciais estritos, mas a mesma gramática de espinha +
// nós já aprovada serve bem para "relação entre conceitos").

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "QuemSomos" });

  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

const pilaresKeys = ["automacaoIa", "softwareWeb", "saasMicrosaas"] as const;

const etapasKeys = ["entender", "projetar", "construir", "evoluir"] as const;

export default function QuemSomosPage() {
  const t = useTranslations("QuemSomos");

  return (
    <main className="theme-light bg-bg text-text">
      {/* HERO */}
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("heroEyebrow")}</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">{t("heroLead")}</p>
          </div>
        </Container>
      </section>

      {/* COMO PENSAMOS */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[1.1fr_1fr] lg:gap-16">
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
                {t("comoPensamosTitle")}
              </h2>
              <div className="mt-8 space-y-5 text-lg text-text/75">
                <p>{t("comoPensamosParagraph1")}</p>
                <p>{t("comoPensamosParagraph2")}</p>
              </div>
            </div>

            <div className="mt-14 lg:mt-0 lg:flex lg:items-center">
              <FlowChain
                steps={[
                  t("comoPensamosFlow.automatizar"),
                  t("comoPensamosFlow.criar"),
                  t("comoPensamosFlow.evoluir"),
                ]}
                className="w-full max-w-sm"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* O QUE FAZEMOS */}
      <section className="theme-dark border-y border-divider bg-bg py-20 text-text sm:py-24">
        <Container>
          <p className="text-xs uppercase tracking-[0.2em] text-accent-2">
            {t("oQueFazemosEyebrow")}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-10 border-t border-divider pt-10 sm:grid-cols-3 sm:gap-8">
            {pilaresKeys.map((key) => (
              <div key={key}>
                <h3 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {t(`pilares.${key}.title`)}
                </h3>
                <p className="mt-3 text-text/70">{t(`pilares.${key}.text`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* NOSSA FORMA DE TRABALHAR */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-[-0.01em] sm:text-4xl">
            {t("formaDeTrabalharTitle")}
          </h2>

          <FlowChain
            steps={etapasKeys.map((key) => t(`etapas.${key}.title`))}
            className="mt-10 max-w-md"
          />

          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {etapasKeys.map((key) => (
              <div key={key} className="border-t border-divider pt-4">
                <p className="text-sm font-semibold uppercase tracking-[0.1em] text-text">
                  {t(`etapas.${key}.title`)}
                </p>
                <p className="mt-2 text-sm text-text/70">{t(`etapas.${key}.text`)}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ENCERRAMENTO */}
      <section className="theme-dark border-t border-divider bg-bg py-24 text-text sm:py-32">
        <Container>
          <div className="max-w-2xl">
            <div className="mb-6 h-px w-16 bg-accent-2" aria-hidden="true" />
            <p className="text-3xl font-bold leading-[1.15] tracking-[-0.01em] sm:text-4xl lg:text-5xl">
              {t("closingLine1")}
            </p>
            <p className="mt-4 text-3xl font-bold leading-[1.15] tracking-[-0.01em] text-accent-2 sm:text-4xl lg:text-5xl">
              {t("closingLine2")}
            </p>

            <Link href="/#contato" className={`${buttonClasses("primary")} mt-10`}>
              {t("ctaContact")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
