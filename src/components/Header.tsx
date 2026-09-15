"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu, X } from "lucide-react";
import { Container } from "@/components/Container";
import { buttonClasses } from "@/components/Button";
import { Logo } from "@/components/brand/Logo";

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

  return (
    <header className="sticky top-0 z-50 border-b border-divider bg-bg/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="no-underline">
          <Logo variant="horizontal" />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 md:flex">
          <div ref={servicesRef} className="relative">
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((open) => !open)}
              onMouseEnter={() => setServicesOpen(true)}
              className="flex items-center gap-1 text-sm text-text hover:text-accent"
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
                  Tecnologia para transformar ideias em soluções digitais.
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
              className="text-sm text-text no-underline hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contato" className={buttonClasses("primary")}>
            Fale conosco
          </Link>
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
            </Link>
          </Container>
        </nav>
      )}
    </header>
  );
}
