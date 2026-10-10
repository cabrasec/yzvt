import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { Link } from "@/i18n/navigation";
import { buildAlternates, buildOpenGraph } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesIndex" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/o-que-fazemos"),
    openGraph: buildOpenGraph(locale, "/o-que-fazemos"),
  };
}

// Cada card reaproveita title/lead do próprio namespace do serviço (não
// duplica o conteúdo das páginas individuais) — só o slug/href é dado local.
const services = [
  { slug: "infraestrutura", namespace: "ServiceInfraestrutura" },
  { slug: "cloud", namespace: "ServiceCloud" },
  { slug: "automacoes", namespace: "ServiceAutomacoes" },
  { slug: "desenvolvimento-web", namespace: "ServiceDesenvolvimentoWeb" },
  { slug: "softwares-plataformas", namespace: "ServiceSoftwaresPlataformas" },
  { slug: "saas-microsaas", namespace: "ServiceSaasMicrosaas" },
] as const;

function ServiceCard({ slug, namespace, readMore }: { slug: string; namespace: (typeof services)[number]["namespace"]; readMore: string }) {
  const t = useTranslations(namespace);
  return (
    <Link
      href={`/o-que-fazemos/${slug}`}
      className="group block border border-divider p-6 no-underline transition-colors duration-200 hover:border-accent-2 sm:p-8"
    >
      <h2 className="text-xl font-bold leading-snug tracking-[-0.01em] text-text transition-colors duration-300 group-hover:text-accent-2 sm:text-2xl">
        {t("title")}
      </h2>
      <p className="mt-3 text-base text-text/70">{t("lead")}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-2">
        {readMore}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
      </span>
    </Link>
  );
}

export default function ServicesIndexPage() {
  const t = useTranslations("ServicesIndex");

  return (
    <main className="theme-light bg-bg text-text">
      <section className="border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("eyebrow")}</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">{t("lead")}</p>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} {...service} readMore={t("readMore")} />
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
