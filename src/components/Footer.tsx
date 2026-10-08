import Link from "next/link";
import { Container } from "@/components/Container";
import { Logo } from "@/components/brand/Logo";

type FooterLink = { label: string; href: string };

// "O que fazemos" ainda não tem página própria — reaproveita o mesmo caminho
// que o dropdown do Header já usa para "Ver todos os serviços" (não é uma
// URL inventada agora, é o destino já estabelecido em outro lugar do site).
// "Aviso de Privacidade" segue o mesmo caminho já usado no aviso do
// formulário de Contato, pela mesma razão.
const NAV_LINKS: FooterLink[] = [
  { label: "O que fazemos", href: "/o-que-fazemos" },
  { label: "O que pensamos", href: "/insights" },
  { label: "Quem somos", href: "/quem-somos" },
  { label: "Contato", href: "/#contato" },
];

const LEGAL_LINKS: FooterLink[] = [{ label: "Aviso de Privacidade", href: "/privacidade" }];

function FooterLinkItem({ label, href }: FooterLink) {
  const className = "text-sm text-text/80 no-underline transition-colors duration-200 hover:text-accent-2";

  // Âncora nativa de propósito, igual ao Header: navegação client-side do
  // Next para #contato vindo de outra rota erra o scroll por causa do
  // ScrollTrigger da Seção 03 na Home; uma navegação completa sempre acerta.
  if (href === "/#contato") {
    return (
      <a href={href} className={className}>
        {label}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-divider bg-bg text-text">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-24">
          <div>
            <Link href="/" className="inline-block no-underline">
              <Logo variant="horizontal" id="footer-logo" gap={18} size="lg" />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-text/60">Tecnologia para o próximo passo.</p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-16 lg:mt-0">
            <nav aria-label="Rodapé">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text/50">Navegação</p>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLinkItem {...link} />
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-text/50">Legal</p>
              <ul className="mt-4 space-y-3">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.href}>
                    <FooterLinkItem {...link} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-divider pt-8 text-xs text-text/50">
          <p>© 2026 Yzev Tech. Todos os direitos reservados.</p>
        </div>
      </Container>
    </footer>
  );
}
