import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

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
              <Link href="/o-que-fazemos" className={buttonClasses("secondary")}>
                {t("servicesLabel")}
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
