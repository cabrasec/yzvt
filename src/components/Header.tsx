"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Globe, Menu, Search, X } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Logo } from "@/components/brand/Logo";
import { availableLocales, defaultLocale, localeLabel, type LocaleCode } from "@/lib/i18n";

const services = [
  { label: "Infraestrutura", href: "/o-que-fazemos/infraestrutura" },
  { label: "Cloud", href: "/o-que-fazemos/cloud" },
  { label: "Automações", href: "/o-que-fazemos/automacoes" },
  { label: "Desenvolvimento Web", href: "/o-que-fazemos/desenvolvimento-web" },
  { label: "Softwares & Plataformas", href: "/o-que-fazemos/softwares-plataformas" },
  { label: "SaaS & MicroSaaS", href: "/o-que-fazemos/saas-microsaas" },
];

const navLinks = [
  { label: "O que pensamos", href: "/o-que-pensamos" },
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [langOpen, setLangOpen] = useState(false);
  const [locale, setLocale] = useState<LocaleCode>(defaultLocale);
  const langRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/80 backdrop-blur">
      <Container headerWide className="flex h-20 items-center justify-between gap-4 lg:h-[86px]">
        <Link href="/" className="no-underline">
          <Logo variant="horizontal" id="header-logo" gap={18} techGradient size="lg" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex lg:gap-8">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((open) => !open)}
              onMouseEnter={() => setServicesOpen(true)}
              className="flex items-center gap-1 text-sm text-text hover:text-accent lg:text-base"
            >
              O que fazemos
              <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            {servicesOpen && (
              <div
                onMouseLeave={() => setServicesOpen(false)}
                className="absolute left-1/2 top-full w-[440px] -translate-x-1/2 border-x border-b border-divider border-t-2 border-t-accent bg-surface p-6 shadow-lg rounded-b-lg"
              >
                <p className="mb-1 text-xs uppercase tracking-[0.08em] text-accent">
                  O que fazemos
                </p>
                <p className="mb-5 text-sm text-text/70">
                  Infraestrutura, automações e software sob medida para o seu negócio.
                </p>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {services.map((service) => (
                    <li key={service.href}>
                      <Link
                        href={service.href}
                        className="block text-sm leading-snug text-text no-underline hover:text-accent"
                        onClick={() => setServicesOpen(false)}
                      >
                        {service.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/o-que-fazemos"
                  className="mt-5 block text-right text-sm text-accent no-underline"
                  onClick={() => setServicesOpen(false)}
                >
                  Ver todos os serviços →
                </Link>
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text no-underline hover:text-accent lg:text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          {searchOpen ? (
            <div className="flex items-center gap-2 border-b border-divider pb-0.5">
              <Search className="h-5 w-5 text-text/60 lg:h-[22px] lg:w-[22px]" aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Buscar..."
                aria-label="Buscar no site"
                onBlur={() => setSearchOpen(false)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setSearchOpen(false);
                }}
                className="w-28 bg-transparent text-sm text-text placeholder:text-text/40 outline-none transition-[width] duration-200 focus:w-40"
              />
            </div>
          ) : (
            <button
              type="button"
              aria-label="Buscar"
              onClick={() => setSearchOpen(true)}
              className="text-text/60 hover:text-text"
            >
              <Search className="h-5 w-5 lg:h-[22px] lg:w-[22px]" aria-hidden="true" />
            </button>
          )}

          <div ref={langRef} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={langOpen}
              onClick={() => setLangOpen((open) => !open)}
              className="flex items-center gap-2 text-sm text-text hover:text-accent lg:text-base"
            >
              <Globe className="h-5 w-5 lg:h-[22px] lg:w-[22px]" aria-hidden="true" />
              {localeLabel(locale)}
              <ChevronDown className="h-3.5 w-3.5 lg:h-4 lg:w-4" aria-hidden="true" />
            </button>

            {langOpen && (
              <div className="absolute right-0 top-full mt-2 w-36 rounded-lg border border-divider bg-surface py-1.5 shadow-sm">
                {availableLocales().map((option) => (
                  <button
                    key={option.code}
                    type="button"
                    onClick={() => {
                      setLocale(option.code);
                      setLangOpen(false);
                    }}
                    className={`block w-full px-3 py-1.5 text-left text-sm ${
                      option.code === locale ? "text-accent" : "text-text hover:text-accent"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
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
          aria-label="Principal"
          className="border-t border-divider bg-bg md:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            <button
              type="button"
              aria-expanded={mobileServicesOpen}
              onClick={() => setMobileServicesOpen((open) => !open)}
              className="flex items-center justify-between py-2 text-left text-sm text-text"
            >
              O que fazemos
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform ${
                  mobileServicesOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {mobileServicesOpen && (
              <ul className="flex flex-col gap-1 pb-2 pl-3">
                {services.map((service) => (
                  <li key={service.href}>
                    <Link
                      href={service.href}
                      className="block py-1.5 text-sm text-text/80 no-underline hover:text-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-2 text-sm text-text no-underline hover:text-accent"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/contato"
              className={buttonClasses("primary", "mt-2 w-full")}
              onClick={() => setMobileOpen(false)}
            >
              Fale conosco
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
