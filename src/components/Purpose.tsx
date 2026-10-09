import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";

export function Purpose() {
  const t = useTranslations("Purpose");

  return (
    <section className="relative overflow-hidden bg-background-light pb-16 pt-10 sm:pt-14 lg:pb-24 lg:pt-16">
      <Container className="flex flex-wrap items-stretch gap-8 lg:gap-20">
        <div className="min-w-0 max-w-[40rem] flex-[1_1_34rem]">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{t("eyebrow")}</p>

          <h2 className="mt-8 text-4xl font-bold leading-[1.02] tracking-[-0.02em] text-text-primary sm:text-5xl lg:text-[5.5rem]">
            {t("titleLead")}
            <br />
            <span className="text-accent">{t("titleHighlight")}</span>
          </h2>

          <div className="mt-14 max-w-md space-y-5 text-base text-text-body lg:ml-28">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
          </div>

          <p className="mt-14 max-w-xs border-t border-border pt-4 text-xs uppercase tracking-[0.15em] text-text-secondary lg:ml-28">
            {t("captionLine1")}
            <br />
            {t("captionLine2")}
          </p>
        </div>

        <div className="relative min-h-[26rem] min-w-0 flex-[1_1_22rem] self-stretch lg:min-h-[min(58vh,44rem)] lg:-mr-[calc(2rem+max(0px,(100vw-72rem)/2))]">
          <Image
            src="/img/richard-williams-aImqKqAq6I0-unsplash.jpg"
            alt={t("imageAlt")}
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover grayscale contrast-[1.05] brightness-[0.97]"
          />
        </div>
      </Container>
    </section>
  );
}
