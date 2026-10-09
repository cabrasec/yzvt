import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Link } from "@/i18n/navigation";
import { WhatsAppIcon } from "@/components/Closing";
import { getWhatsAppUrl } from "@/lib/contact";
import { buildAlternates } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Obrigado" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    // noindex: página de redirecionamento pós-formulário, não é conteúdo
    // editorial — não precisa (nem deve) aparecer em busca.
    robots: { index: false, follow: true },
    alternates: buildAlternates(locale, "/obrigado"),
  };
}

// Destino do campo `redirect` do formulário nativo do Web3Forms (ver
// Contact.tsx): o plano gratuito deles não libera CORS pra leitura da
// resposta via fetch — confirmado testando direto contra a API, com a
// origem real de produção, nos dois casos (JSON e FormData). O jeito deles
// de funcionar de verdade no free tier é o <form> nativo navegando a sério
// (é literalmente o exemplo que eles mesmos dão), por isso o envio não é
// mais via JavaScript: o navegador sai do site, o Web3Forms processa, e
// redireciona de volta pra cá.
export default function ObrigadoPage() {
  const t = useTranslations("Obrigado");
  const tCommon = useTranslations("Common");
  const whatsappUrl = getWhatsAppUrl(tCommon("whatsappGreeting"));

  return (
    <main className="theme-light bg-bg text-text">
      <section className="flex min-h-[60vh] items-center border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("eyebrow")}</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-sm text-lg text-text/75">{t("body")}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link href="/" className={buttonClasses("primary")}>
                {t("homeLabel")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={buttonClasses("secondary")}>
                <WhatsAppIcon className="h-4 w-4" />
                {t("whatsappLabel")}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
