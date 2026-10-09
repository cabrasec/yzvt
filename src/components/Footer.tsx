import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/Closing";
import { Link } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import {
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  WHATSAPP_DISPLAY,
  getWhatsAppUrl,
} from "@/lib/contact";

type FooterLink = { key: string; href: string };

const NAV_LINKS: FooterLink[] = [
  { key: "services", href: "/o-que-fazemos" },
  { key: "insights", href: "/insights" },
  { key: "about", href: "/quem-somos" },
  { key: "contact", href: "/#contato" },
];

const LEGAL_LINKS: FooterLink[] = [{ key: "privacy", href: "/privacidade" }];

const linkClass = "text-sm text-text/80 no-underline transition-colors duration-200 hover:text-accent-2";
const headingClass = "text-xs font-semibold uppercase tracking-[0.15em] text-text/50";

function FooterLinkItem({
  label,
  href,
  contatoHref,
}: {
  label: string;
  href: string;
  contatoHref: string;
}) {
  // Âncora nativa de propósito, igual ao Header: navegação client-side do
  // Next para #contato vindo de outra rota erra o scroll por causa do
  // ScrollTrigger da Seção 03 na Home; uma navegação completa sempre acerta.
  if (href === "/#contato") {
    return (
      <a href={contatoHref} className={linkClass}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={linkClass}>
      {label}
    </Link>
  );
}

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations("Footer");
  const tCommon = useTranslations("Common");
  const whatsappUrl = getWhatsAppUrl(tCommon("whatsappGreeting"));
  const locale = useLocale() as AppLocale;

  // Âncora nativa para #contato precisa do prefixo de locale montado à mão
  // (bypassa o Link do next-intl de propósito — ver comentário no FooterLinkItem).
  const contatoHref = locale === routing.defaultLocale ? "/#contato" : `/${locale}/#contato`;

  return (
    <footer className="border-t border-divider bg-bg text-text">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-16">
          <div>
            <Link href="/" className="inline-block no-underline">
              {/* Z em uma cor: o degradê verde-escuro some neste tamanho. */}
              <Logo variant="horizontal" id="footer-logo" gap={18} size="lg" markVariant="flat" />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-text/60">{t("tagline")}</p>
          </div>

          <div>
            <p className={headingClass}>{t("talkToUs")}</p>
            <ul className="mt-4 space-y-3">
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <WhatsAppIcon className="h-4 w-4 shrink-0 text-accent-2" />
                  {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2.5`}>
                  <InstagramIcon className="h-4 w-4 shrink-0 text-accent-2" />
                  {INSTAGRAM_HANDLE}
                </a>
              </li>
              <li className="text-xs text-text/50">{tCommon("serviceHours")}</li>
            </ul>
          </div>

          <nav aria-label={t("navAriaLabel")}>
            <p className={headingClass}>{t("navigation")}</p>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLinkItem
                    label={t(`navLinks.${link.key}`)}
                    href={link.href}
                    contatoHref={contatoHref}
                  />
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={headingClass}>{t("legal")}</p>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <FooterLinkItem
                    label={t(`legalLinks.${link.key}`)}
                    href={link.href}
                    contatoHref={contatoHref}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Mesma largura do container que a linha de cima (border-t do footer
            é full-bleed só porque é a borda da seção). */}
        <div className="mt-14 border-t border-divider pt-8 text-xs text-text/50">
          <p>{t("copyright", { year: new Date().getFullYear() })}</p>
        </div>
      </Container>
    </footer>
  );
}
