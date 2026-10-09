type BrandMarkProps = {
  /** Unique id for this instance — required so the gradient defs never collide across multiple marks on one page. */
  id: string;
  variant?: "gradient" | "flat";
  className?: string;
};

/**
 * Símbolo "Z" da Yzev Tech — duas peças espelhadas com cortes a 45°,
 * encaixadas em torno de um vazio retangular (fonte: uploads/zev-green.png).
 * Fonte única do path: reutilizar em Header, Hero e favicon.
 */
const TOP = "M5 36 L28.5 13 H92 V35 L62.6 61.5 V36 Z";
const BOTTOM = "M4 62.2 L32.4 36 V61.5 H92 L68.7 83.2 H4 Z";

export function BrandMark({ id, variant = "gradient", className = "" }: BrandMarkProps) {
  if (variant === "flat") {
    return (
      <svg viewBox="0 0 96 96" fill="currentColor" aria-hidden="true" className={className}>
        <path d={TOP} />
        <path d={BOTTOM} />
      </svg>
    );
  }

  const top = `${id}-zg-top`;
  const bot = `${id}-zg-bot`;

  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={top} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-accent-mid)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-accent-dark)" }} />
        </linearGradient>
        <linearGradient id={bot} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--color-accent-dark)" }} />
          <stop offset="1" style={{ stopColor: "var(--color-accent-mid)" }} />
        </linearGradient>
      </defs>
      <path d={TOP} fill={`url(#${top})`} />
      <path d={BOTTOM} fill={`url(#${bot})`} />
    </svg>
  );
}
