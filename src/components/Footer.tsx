import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/brand/Logo";

type FooterLink = { label: string; href: string };

// Rotas alinhadas ao que o Header já usa (services dropdown, quem-somos,
// contato) ou coerentes com a mesma convenção de slugs — nada inventado sem
// relação com a arquitetura existente. Como no Header, algumas ainda não têm
// página própria; isso já é o padrão aceito neste site em construção.
const NAV_GROUPS: { title: string; links: FooterLink[] }[] = [
  {
    title: "O que fazemos",
    links: [
      { label: "Automação & IA", href: "/o-que-fazemos/automacoes" },
      { label: "Software & Web", href: "/o-que-fazemos/desenvolvimento-web" },
      { label: "SaaS & MicroSaaS", href: "/o-que-fazemos/saas-microsaas" },
    ],
  },
  {
    title: "O que pensamos",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Materiais", href: "/materiais" },
      { label: "eBooks", href: "/materiais/ebooks" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Quem somos", href: "/quem-somos" },
      { label: "Contato", href: "/contato" },
    ],
  },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Privacidade", href: "/privacidade" },
  { label: "Termos", href: "/termos" },
];

// Fechamento institucional da publicação — usado apenas nesta página de
// insight. Não foi adicionado a layout.tsx nem à Home: a marca e os tokens
// são os mesmos do resto do site (Logo/BrandMark, paleta dark padrão de
// globals.css), só a composição é nova. Nenhuma animação, nenhum estado —
// única microinteração é a mudança de cor no hover dos links, já herdada do
// padrão global do site.
export function Footer() {
  return (
    <footer className="border-t border-divider bg-bg text-text">
      <Container className="py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:gap-24">
          <div>
            <Link href="/" className="inline-block no-underline">
              <Logo variant="horizontal" id="footer-logo" gap={18} techGradient size="lg" />
            </Link>
            <p className="mt-6 max-w-xs text-xs uppercase tracking-[0.2em] text-text/50">
              Tecnologia para o próximo passo
            </p>
          </div>

          <nav aria-label="Rodapé" className="grid grid-cols-1 gap-x-14 gap-y-10 sm:grid-cols-3">
            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text/50">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-text/80 no-underline transition-colors duration-200 hover:text-accent"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-divider pt-8 text-xs text-text/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Yzevtech</p>
          <div className="flex gap-6">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-text/50 no-underline transition-colors duration-200 hover:text-text"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
