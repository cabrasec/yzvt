import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";

export const metadata: Metadata = {
  title: "O que pensamos | Yzev",
  description:
    "Insights sobre tecnologia, software, automação, desenvolvimento web e produto para empresas que querem evoluir.",
};

// Índice editorial de "O que pensamos". Reaproveita a mesma gramática visual
// já usada nos cards da Home (CategoryTag, proporções de imagem, arte em SVG
// para os dois Insights sem foto) e nos próprios artigos — sem recriar
// componentes do Header/Footer/Home, só compondo a página com os mesmos
// tokens e padrões.

const automationArtAlt =
  "Nós conectados por linhas finas, representando um processo que passa a acontecer sozinho";

const webLandingArtAlt =
  "Janela de navegador com o esqueleto de uma landing page, com um botão de ação conectado a um ponto de contato";

const produtoCoverAlt =
  "Painéis de interface em um dashboard futurista, conectados por linhas finas, em tons de verde sobre fundo escuro";

const featured = {
  category: "Automação",
  title: "Sua empresa ainda depende de tarefas que poderiam acontecer sozinhas?",
  href: "/insights/sua-empresa-ainda-depende-de-tarefas-que-poderiam-acontecer-sozinhas",
};

type SecondaryItem = {
  category: string;
  title: string;
  href: string;
  image?: string;
  alt?: string;
};

const secondary: SecondaryItem[] = [
  {
    category: "Software",
    title: "Quando uma planilha deixa de ser suficiente?",
    href: "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
    image: "/img/yzev-planilha.png",
    alt: "Painel de operação com pedidos, atendimentos, operações, estoque e financeiro centralizados em um só lugar",
  },
  {
    category: "Desenvolvimento Web",
    title: "Sua empresa está perdendo clientes por não ter uma página que vende?",
    href: "/insights/sua-empresa-esta-perdendo-clientes-por-nao-ter-uma-pagina-que-vende",
  },
  {
    category: "Produto",
    title: "E se um problema interno pudesse virar um produto?",
    href: "/insights/e-se-um-problema-interno-pudesse-virar-um-produto",
    image: "/img/dashboard-futurista-neon-verde.png",
    alt: produtoCoverAlt,
  },
];

// Mesma arte usada no card de Automação da Home — reaproveitada aqui porque
// esse Insight não tem foto própria; nenhuma imagem nova foi criada.
function AutomationFlowArt() {
  return (
    <div
      role="img"
      aria-label={automationArtAlt}
      className="blueprint-grid absolute inset-0 bg-surface transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    >
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <path d="M120 40 V 460" className="stroke-divider" strokeWidth="1" fill="none" />
        <path d="M120 150 H 230" className="stroke-divider" strokeWidth="1" fill="none" />
        <path d="M120 240 H 60" className="stroke-divider" strokeWidth="1" fill="none" />
        <path d="M120 330 H 250" className="stroke-accent-2/50" strokeWidth="1" fill="none" />

        <circle cx="120" cy="40" r="5" className="fill-bg stroke-text/35" strokeWidth="1" />
        <circle cx="120" cy="150" r="5" className="fill-accent-2" />
        <circle cx="230" cy="150" r="5" className="fill-bg stroke-text/35" strokeWidth="1" />
        <circle cx="120" cy="240" r="5" className="fill-accent-2" />
        <circle cx="60" cy="240" r="5" className="fill-bg stroke-text/35" strokeWidth="1" />
        <circle cx="120" cy="330" r="5" className="fill-accent-2" />
        <circle cx="250" cy="330" r="5" className="fill-bg stroke-accent-2" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="120" cy="420" r="5" className="fill-bg stroke-text/35" strokeWidth="1" />
        <circle cx="120" cy="460" r="6" className="fill-accent-2" />
      </svg>
    </div>
  );
}

// Mesma arte usada no card de Desenvolvimento Web da Home.
function WebLandingArt() {
  return (
    <div
      role="img"
      aria-label={webLandingArtAlt}
      className="blueprint-grid absolute inset-0 bg-surface transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    >
      <svg
        viewBox="0 0 480 330"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        aria-hidden="true"
      >
        <rect x="40.5" y="50.5" width="399" height="229" className="stroke-divider" strokeWidth="1" fill="none" />
        <path d="M40 80 H 440" className="stroke-divider" strokeWidth="1" />
        <circle cx="56" cy="65" r="2.5" className="fill-text/25" />
        <circle cx="68" cy="65" r="2.5" className="fill-text/25" />
        <circle cx="80" cy="65" r="2.5" className="fill-text/25" />

        <rect x="60" y="102" width="14" height="14" className="fill-accent-2/40" />
        <path d="M340 107 H 364 M372 107 H 396 M404 107 H 420" className="stroke-text/25" strokeWidth="1" />

        <rect x="60" y="142" width="220" height="10" className="fill-text/70" />
        <rect x="60" y="160" width="150" height="10" className="fill-text/35" />

        <rect x="60" y="187" width="110" height="26" className="stroke-accent-2" strokeWidth="1" fill="none" />

        <path d="M60 240 H 110 M60 254 H 95" className="stroke-text/20" strokeWidth="1" />
        <path d="M185 240 H 235 M185 254 H 220" className="stroke-text/20" strokeWidth="1" />
        <path d="M310 240 H 360 M310 254 H 345" className="stroke-text/20" strokeWidth="1" />

        <path d="M115 213 V 270 H 260" className="stroke-accent-2/50" strokeWidth="1" fill="none" />
        <circle cx="260" cy="270" r="5" className="fill-accent-2" />
      </svg>
    </div>
  );
}

function CategoryTag({ children }: { children: string }) {
  return (
    <span className="absolute right-4 top-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent-2 sm:right-6 sm:top-6">
      {children}
    </span>
  );
}

export default function InsightsIndexPage() {
  return (
    <main className="theme-light bg-bg text-text">
      {/* HERO — eyebrow + título + lead, sem diagrama, igual ao padrão já
          usado no topo dos Insights individuais. */}
      <section className="blueprint-grid border-b border-divider">
        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">O que pensamos</p>
            <div className="mt-6 h-px w-16 bg-accent" aria-hidden="true" />
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-[3.25rem]">
              Ideias para transformar problemas em próximos passos.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-text/75">
              Conteúdo sobre tecnologia, software, automação e produto para
              empresas que querem evoluir.
            </p>
          </div>
        </Container>
      </section>

      {/* DESTAQUE — composição editorial em duas colunas (texto + arte),
          diferente do empilhamento vertical usado na Home, para a página de
          índice não parecer uma simples repetição da seção "O que pensamos". */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <Link href={featured.href} className="group grid gap-8 no-underline lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden bg-surface lg:order-2">
              <AutomationFlowArt />
              <CategoryTag>{featured.category}</CategoryTag>
            </div>
            <div className="lg:order-1">
              <h2 className="text-3xl font-bold leading-tight tracking-[-0.01em] text-text transition-colors duration-300 group-hover:text-accent-2 sm:text-4xl lg:text-[2.75rem]">
                {featured.title}
              </h2>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent-2">
                Ler o Insight
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </div>
          </Link>
        </Container>
      </section>

      {/* SECUNDÁRIOS — linha de três itens menores, assimetria em relação ao
          destaque acima; sem "Leia mais" repetido, sem data, sem autor. */}
      <section className="border-t border-divider py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {secondary.map((item) => (
              <Link key={item.href} href={item.href} className="group block no-underline">
                <div className="relative aspect-[16/11] overflow-hidden bg-surface">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt ?? item.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
                        item.category === "Produto" ? "saturate-[0.6] contrast-[1.03] brightness-[0.96]" : ""
                      }`}
                    />
                  ) : (
                    <WebLandingArt />
                  )}
                  <CategoryTag>{item.category}</CategoryTag>
                </div>
                <h3 className="mt-5 text-lg font-bold leading-snug text-text transition-colors duration-300 group-hover:text-accent-2 sm:text-xl">
                  {item.title}
                </h3>
                <ArrowRight
                  className="mt-3 h-4 w-4 text-accent-2 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
