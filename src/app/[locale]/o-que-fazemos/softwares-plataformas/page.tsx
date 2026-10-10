import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { ServicePage, type ServiceContent } from "@/components/services/ServicePage";
import { buildAlternates, buildOpenGraph } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServiceSoftwaresPlataformas" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: buildAlternates(locale, "/o-que-fazemos/softwares-plataformas"),
    openGraph: buildOpenGraph(locale, "/o-que-fazemos/softwares-plataformas"),
  };
}

export default function SoftwaresPlataformasPage() {
  const t = useTranslations("ServiceSoftwaresPlataformas");
  const content: ServiceContent = {
    eyebrow: t("eyebrow"),
    title: t("title"),
    lead: t("lead"),
    sections: t.raw("sections"),
    examplesLabel: t("examplesLabel"),
    examples: t.raw("examples"),
    ctaTitle: t("ctaTitle"),
    ctaBody: t("ctaBody"),
    ctaButtonLabel: t("ctaButtonLabel"),
  };
  return <ServicePage content={content} />;
}
