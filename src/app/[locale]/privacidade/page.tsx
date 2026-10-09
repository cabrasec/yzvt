import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacidade" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

type Section = { title: string; body: string };

export default function PrivacidadePage() {
  const t = useTranslations("Privacidade");
  const sections = t.raw("sections") as Section[];

  return (
    <main className="theme-light bg-bg text-text">
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("eyebrow")}</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">{t("lastUpdated")}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="max-w-2xl space-y-12">
            {sections.map((secao) => (
              <div key={secao.title}>
                <h2 className="text-xl font-bold leading-snug tracking-[-0.01em] sm:text-2xl">
                  {secao.title}
                </h2>
                <div className="mt-4 space-y-4 text-base text-text/75">
                  <p>{secao.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
