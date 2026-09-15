type BrandMarkProps = {
  /** Unique id for this instance — required so the gradient defs never collide across multiple marks on one page. */
  id: string;
  variant?: "gradient" | "flat";
  className?: string;
};

/**
 * Símbolo "Z" da Yzev Tech — geometria de três faixas (fita dobrada) extraída
 * de "YZEV Tech - Logo System.html". Fonte única do path: não redesenhar
 * livremente, reutilizar em qualquer contexto (Header, Hero, futuro favicon).
 */
export function BrandMark({ id, variant = "gradient", className = "" }: BrandMarkProps) {
  if (variant === "flat") {
    return (
      <svg viewBox="0 0 96 96" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M8 8h82v26H8Z" />
        <path d="M62 34h28L62 62H34Z" opacity="0.72" />
        <path d="M6 62h82v26H6Z" />
      </svg>
    );
  }

  const top = `${id}-zg-top`;
  const fold = `${id}-zg-fold`;
  const bot = `${id}-zg-bot`;

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={top} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#B69CFF" />
          <stop offset="1" stopColor="#7A3BFF" />
        </linearGradient>
        <linearGradient id={fold} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5B21D6" />
          <stop offset="1" stopColor="#3D1499" />
        </linearGradient>
        <linearGradient id={bot} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#6423E8" />
        </linearGradient>
      </defs>
      <path d="M8 8h82v26H8Z" fill={`url(#${top})`} />
      <path d="M62 34h28L62 62H34Z" fill={`url(#${fold})`} />
      <path d="M6 62h82v26H6Z" fill={`url(#${bot})`} />
    </svg>
  );
}
