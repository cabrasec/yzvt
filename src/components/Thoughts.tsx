import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/Container";

type ThoughtCard = {
  category: string;
  title: string;
  alt: string;
  href?: string;
  image?: string;
  grayscale?: boolean;
  /** Substitui CardMedia por uma composição própria (ex.: AutomationFlowArt) quando não houver foto. */
  media?: ReactNode;
  /** Card "claro" (.theme-light) dentro da seção — por padrão os cards herdam
   *  o tema escuro da Home. Usado para alternar peso visual entre os cards. */
  light?: boolean;
};

const automationFlowArtAlt =
  "Nós conectados por linhas finas, representando um processo que passa a acontecer sozinho";

const webLandingArtAlt =
  "Janela de navegador com o esqueleto de uma landing page, com um botão de ação conectado a um ponto de contato";

const produtoCoverAlt =
  "Painéis de interface em um dashboard futurista, conectados por linhas finas, em tons de verde sobre fundo escuro";

// Brilho, contraste e saturação reduzidos para tirar o excesso de glow do
// arquivo original — o card continua escuro e técnico, mas sem a sensação
// de "dashboard cyberpunk" (este é o único momento escuro da seção).
function ProdutoCoverImage() {
  return (
    <Image
      src="/img/dashboard-futurista-neon-verde.png"
      alt={produtoCoverAlt}
      fill
      sizes="(min-width: 1024px) 50vw, 100vw"
      className="object-cover saturate-[0.5] contrast-[0.94] brightness-[0.85] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
  );
}

// Cards sem `image` nem `media` caem no placeholder .blueprint-grid em
// CardMedia; o `alt` já fica pronto para quando a imagem chegar.
const featured: ThoughtCard = {
  category: "Automação",
  title: "Sua empresa ainda depende de tarefas que poderiam acontecer sozinhas?",
  alt: automationFlowArtAlt,
  href: "/insights/sua-empresa-ainda-depende-de-tarefas-que-poderiam-acontecer-sozinhas",
  media: <AutomationFlowArt label={automationFlowArtAlt} />,
  light: true,
};

const secondary: ThoughtCard[] = [
  {
    category: "Software",
    title: "Quando uma planilha deixa de ser suficiente?",
    alt: "Painel de operação com pedidos, atendimentos, operações, estoque e financeiro centralizados em um só lugar",
    href: "/insights/quando-uma-planilha-deixa-de-ser-suficiente",
    image: "/img/yzev-planilha.png",
    grayscale: false,
  },
  {
    category: "Desenvolvimento Web",
    title: "Sua empresa está perdendo clientes por não ter uma página que vende?",
    alt: webLandingArtAlt,
    href: "/insights/sua-empresa-esta-perdendo-clientes-por-nao-ter-uma-pagina-que-vende",
    media: <WebLandingArt label={webLandingArtAlt} />,
    light: true,
  },
  {
    category: "Produto",
    title: "E se um problema interno pudesse virar um produto?",
    alt: produtoCoverAlt,
    href: "/insights/e-se-um-problema-interno-pudesse-virar-um-produto",
    media: <ProdutoCoverImage />,
  },
];

// Capa do card "Automação": nenhuma foto, nenhum ícone — a espinha com nós
// (vazados e, nos pontos de automação, preenchidos em verde) é a mesma
// gramática visual do FlowChain usado dentro do próprio artigo. A grade de
// fundo reaproveita .blueprint-grid, já usado como placeholder dos outros
// cards desta seção.
function AutomationFlowArt({ label }: { label?: string }) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className="blueprint-grid absolute inset-0 bg-surface transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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

// Capa do card "Desenvolvimento Web": uma janela de navegador com o esqueleto
// de uma landing page (título, botão de ação) conectada por uma linha fina a
// um ponto de contato — a mesma gramática de nós e linhas do FlowChain e do
// AutomationFlowArt, sem foto, sem ícone, sem pessoa.
function WebLandingArt({ label }: { label?: string }) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className="blueprint-grid absolute inset-0 bg-surface transition-transform duration-700 ease-out group-hover:scale-[1.04]"
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

function CardMedia({
  src,
  alt,
  grayscale = true,
  className = "",
}: {
  src?: string;
  alt?: string;
  grayscale?: boolean;
  className?: string;
}) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt ?? ""}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
          grayscale ? "grayscale contrast-[1.05] brightness-[0.97]" : ""
        } ${className}`}
      />
    );
  }

  return (
    <div
      className={`blueprint-grid absolute inset-0 bg-surface transition-transform duration-700 ease-out group-hover:scale-[1.04] ${className}`}
    />
  );
}

function CategoryTag({ children }: { children: string }) {
  return (
    <span className="absolute right-4 top-4 text-xs font-semibold uppercase tracking-[0.15em] text-accent-2 sm:right-6 sm:top-6">
      {children}
    </span>
  );
}

function FeaturedCard({ category, title, href, image, alt, grayscale, media, light }: ThoughtCard) {
  return (
    <a href={href ?? "#"} className={`group relative block ${light ? "theme-light" : ""}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        {media ?? <CardMedia src={image} alt={alt} grayscale={grayscale} />}
        <CategoryTag>{category}</CategoryTag>
      </div>
      <div className="relative z-10 -mt-16 ml-4 mr-8 bg-bg px-6 py-6 sm:-mt-20 sm:ml-6 sm:mr-12 sm:px-8 sm:py-8">
        <h3 className="text-2xl font-bold leading-tight tracking-[-0.01em] text-text transition-colors duration-300 group-hover:text-accent-2 sm:text-3xl">
          {title}
        </h3>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-2">
          Ler mais
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </a>
  );
}

function SecondaryCard({ category, title, href, image, alt, grayscale, media, light }: ThoughtCard) {
  return (
    <a
      href={href ?? "#"}
      className={`group relative flex aspect-[16/11] flex-col justify-end overflow-hidden bg-surface ${
        light ? "theme-light" : ""
      }`}
    >
      {media ?? <CardMedia src={image} alt={alt} grayscale={grayscale} />}
      <CategoryTag>{category}</CategoryTag>
      <div className="relative z-10 bg-gradient-to-t from-bg via-bg/70 to-transparent px-5 pb-5 pt-14 sm:px-6 sm:pb-6">
        <h3 className="text-lg font-bold leading-snug text-text transition-colors duration-300 group-hover:text-accent-2 sm:text-xl">
          {title}
        </h3>
        <ArrowRight
          className="mt-3 h-4 w-4 text-accent-2 transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        />
      </div>
    </a>
  );
}

export function Thoughts() {
  return (
    <section className="bg-bg py-20 text-text sm:py-24 lg:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent-2">O que pensamos</p>
          <h2 className="mt-6 text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-4xl lg:text-5xl">
            Tecnologia muda rápido.
            <br />
            Os problemas das empresas continuam esperando soluções.
          </h2>
          <p className="mt-6 max-w-lg text-lg text-text/75">
            Ideias, análises e exemplos sobre tecnologia aplicada aos negócios,
            sem complicação e sem tecnologia pela tecnologia.
          </p>
        </div>

        <div className="mt-12 border-t border-divider pt-12 lg:mt-16 lg:pt-16">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start lg:gap-12">
            <div className="order-2 flex flex-col gap-10 lg:order-1 lg:gap-12">
              {secondary.map((card) => (
                <SecondaryCard key={card.category} {...card} />
              ))}
            </div>

            <div className="order-1 lg:order-2 lg:sticky lg:top-24">
              <FeaturedCard {...featured} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
