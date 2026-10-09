"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, ChevronDown, Globe, Menu, X } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Logo } from "@/components/brand/Logo";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type AppLocale } from "@/i18n/routing";

const serviceSlugs = [
  "infraestrutura",
  "cloud",
  "automacoes",
  "desenvolvimento-web",
  "softwares-plataformas",
  "saas-microsaas",
] as const;

const serviceKeys = [
  "infraestrutura",
  "cloud",
  "automacoes",
  "desenvolvimentoWeb",
  "softwaresPlataformas",
  "saasMicrosaas",
] as const;

export function Header() {
  const t = useTranslations("Header");
  const locale = useLocale() as AppLocale;
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  // Âncora nativa para #contato precisa do prefixo de locale montado à mão
  // (bypassa o Link do next-intl de propósito — ver comentário mais abaixo).
  const contatoHref = locale === routing.defaultLocale ? "/#contato" : `/${locale}/#contato`;

  useEffect(() => {
    if (!servicesOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!servicesRef.current?.contains(event.target as Node)) {
        setServicesOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setServicesOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [servicesOpen]);

  useEffect(() => {
    if (!langOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (!langRef.current?.contains(event.target as Node)) {
        setLangOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLangOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [langOpen]);

  function switchLocale(nextLocale: AppLocale) {
    setLangOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  const navLinks = [
    { label: t("navInsights"), href: "/insights" as const },
    { label: t("navAbout"), href: "/quem-somos" as const },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/80 backdrop-blur">
      <Container headerWide className="flex h-20 items-center justify-between gap-4 lg:h-[86px]">
        <Link href="/" className="no-underline">
          <Logo variant="horizontal" id="header-logo" gap={18} size="lg" />
        </Link>

        <nav aria-label={t("navAriaLabel")} className="hidden items-center gap-6 md:flex lg:gap-8">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((open) => !open)}
              onMouseEnter={() => setServicesOpen(true)}
              className="flex items-center gap-1 text-sm text-text hover:text-accent-2 lg:text-base"
            >
              {t("servicesNav")}
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            {servicesOpen && (
              <div
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute left-1/2 top-full w-[440px] -translate-x-1/2 border-x border-b border-divider border-t-2 border-t-accent-light bg-surface p-6 shadow-lg rounded-b-lg"
              >
                <p className="mb-1 text-xs uppercase tracking-[0.08em] text-accent-2">
                  {t("servicesTitle")}
                </p>
                <p className="mb-5 text-sm text-text/70">{t("servicesIntro")}</p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {serviceSlugs.map((slug, index) => (
                    <li key={slug}>
                      <Link
                        href={`/o-que-fazemos/${slug}`}
                        className="block text-sm leading-snug text-text no-underline hover:text-accent-2"
                        onClick={() => setServicesOpen(false)}
                      >
                        {t(`services.${serviceKeys[index]}`)}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/o-que-fazemos"
                  className="mt-5 block text-right text-sm text-accent-2 no-underline"
                  onClick={() => setServicesOpen(false)}
                >
                  {t("viewAllServices")} →
                </Link>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text no-underline hover:text-accent-2 lg:text-base"
            >
              {link.label}
            </Link>
          ))}

          {/* Âncora nativa de propósito: o roteamento client-side do Next,
              vindo de outra rota, tenta rolar até #contato antes do
              ScrollTrigger da Seção 03 terminar de medir seu pin-spacer,
              e o scroll erra o alvo. Uma navegação completa (sem
              interceptação do router) sempre chega no lugar certo. */}
          <a
            href={contatoHref}
            className="text-sm text-text no-underline hover:text-accent-2 lg:text-base"
          >
            {t("navContact")}
          </a>
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <div ref={langRef} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((open) => !open)}
              className="flex items-center gap-2 text-sm text-text hover:text-accent-2 lg:text-base"
            >
              <Globe className="h-5 w-5 lg:h-[22px] lg:w-[22px]" aria-hidden="true" />
              {localeLabels[locale]}
              <ChevronDown className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true" />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-divider bg-surface py-1.5 shadow-sm">
                {routing.locales.map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => switchLocale(code)}
                    className={`block w-full px-3 py-1.5 text-left text-sm ${
                      code === locale ? "text-accent-2" : "text-text hover:text-accent-2"
                    }`}
                  >
                    {localeLabels[code]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-md text-text md:hidden"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </Container>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          aria-label={t("navAriaLabel")}
          className="border-t border-divider bg-bg md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            <button
              type="button"
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((open) => !open)}
              className="flex items-center justify-between py-2 text-left text-sm text-text"
            >
              {t("servicesNav")}
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {mobileServicesOpen && (
              <ul className="flex flex-col gap-1 pb-2 pl-3">
                {serviceSlugs.map((slug, index) => (
                  <li key={slug}>
                    <Link
                      href={`/o-que-fazemos/${slug}`}
                      className="block py-1.5 text-sm text-text/80 no-underline hover:text-accent-2"
                      onClick={() => setMobileOpen(false)}
                    >
                      {t(`services.${serviceKeys[index]}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm text-text no-underline hover:text-accent-2"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <a
              href={contatoHref}
              className="py-2 text-sm text-text no-underline hover:text-accent-2"
              onClick={() => setMobileOpen(false)}
            >
              {t("navContact")}
            </a>

            <a
              href={contatoHref}
              className={buttonClasses("primary", "mt-2 w-full")}
              onClick={() => setMobileOpen(false)}
            >
              {t("ctaContact")}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </Container>
        </nav>
      )}
    </header>
  );
}
