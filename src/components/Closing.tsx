import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { Link } from "@/i18n/navigation";

// Última assinatura da Home, entre o Contato e o Footer: não repete o
// convite pra falar no WhatsApp (já coberto na Seção de Contato, acima) —
// em vez disso reforça o posicionamento e encaminha pra "O que fazemos".
export function Closing() {
  const t = useTranslations("Closing");

  return (
    <section className="border-t border-divider bg-bg py-16 text-text sm:py-20">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <div className="h-px w-16 bg-accent-2" aria-hidden="true" />
            <p className="mt-6 text-2xl font-medium leading-snug tracking-[-0.015em] sm:text-3xl">
              {t("title")}
            </p>
            <p className="mt-4 text-text/60">{t("description")}</p>
            <p className="mt-3 text-text/60">{t("complement")}</p>
          </div>

          <Link
            href="/o-que-fazemos"
            className="group inline-flex items-center gap-2.5 self-start border border-accent-2/70 px-6 py-3 text-sm font-semibold text-text no-underline transition-colors duration-200 hover:border-accent-2 hover:bg-accent-2/[0.06] lg:self-auto"
          >
            {t("ctaLabel")}
            <ArrowRight
              className="h-4 w-4 text-accent-2 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.35-1.4a9.8 9.8 0 0 0 4.69 1.2h.01c5.43 0 9.84-4.4 9.84-9.84A9.78 9.78 0 0 0 12.04 2Zm5.74 13.9c-.24.68-1.4 1.3-1.93 1.35-.5.05-.96.07-1.66-.1a13.4 13.4 0 0 1-4.5-2.5 11.3 11.3 0 0 1-2.3-3.03c-.24-.47-.4-1.02-.4-1.55 0-.7.36-1.28.7-1.6.25-.24.53-.3.72-.3h.5c.17 0 .4-.03.6.46.22.53.75 1.86.82 2 .07.13.12.29.02.47-.1.19-.2.3-.35.47-.14.16-.3.36-.42.48-.14.14-.28.29-.12.56.16.28.7 1.13 1.5 1.83a6.9 6.9 0 0 0 2.06 1.27c.28.11.44.1.6-.06.17-.16.7-.8.88-1.08.19-.28.37-.23.62-.14.25.09 1.58.75 1.86.88.27.14.45.2.52.32.07.11.07.68-.17 1.36Z" />
    </svg>
  );
}
