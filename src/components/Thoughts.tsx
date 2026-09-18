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
};

// TODO: quando as imagens chegarem, adicionar `src` aqui e trocar o
// placeholder .blueprint-grid por <Image src={...} alt={alt} fill /> em
// CardMedia. O `alt` já está pronto para uso imediato.
const featured: ThoughtCard = {
  category: "Automação",
  title: "Sua empresa ainda depende de tarefas que poderiam acontecer sozinhas?",
  alt: "Dashboard com indicadores e gráficos",
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
    category: "IA",
    title: "Onde a inteligência artificial realmente ajuda uma empresa?",
    alt: "Onda abstrata formada por pontos",
  },
  {
    category: "Produto",
    title: "E se um problema interno pudesse virar um produto?",
    alt: "Blocos de madeira sendo empilhados para formar uma estrutura",
  },
];

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

function FeaturedCard({ category, title, href, image, alt, grayscale }: ThoughtCard) {
  return (
    <a href={href ?? "#"} className="group relative block">
      <div className="relative aspect-[4/5] overflow-hidden bg-surface">
        <CardMedia src={image} alt={alt} grayscale={grayscale} />
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

function SecondaryCard({ category, title, href, image, alt, grayscale }: ThoughtCard) {
  return (
    <a
      href={href ?? "#"}
      className="group relative flex aspect-[16/11] flex-col justify-end overflow-hidden bg-surface"
    >
      <CardMedia src={image} alt={alt} grayscale={grayscale} />
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
          <p className="text-xs uppercase tracking-[0.2em] text-accent">O que pensamos</p>
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
