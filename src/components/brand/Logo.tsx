import { BrandMark } from "@/components/brand/BrandMark";

type LogoProps = {
  variant?: "horizontal" | "mark";
  id?: string;
  className?: string;
  gap?: number;
  size?: "default" | "lg";
  /**
   * "flat" desenha o Z em uma cor (--color-accent-2). Use em tamanhos pequenos
   * sobre o fundo escuro, onde o degradê verde-escuro perde contraste.
   */
  markVariant?: "gradient" | "flat";
};

export function Logo({
  variant = "horizontal",
  id = "brand-logo",
  className = "",
  gap,
  size = "default",
  markVariant = "gradient",
}: LogoProps) {
  const markSize = size === "lg" ? "h-7 w-7 lg:h-8 lg:w-8" : "h-7 w-7";
  const textSize = size === "lg" ? "text-base lg:text-[1.1rem]" : "text-base";
  const markColor = markVariant === "flat" ? "text-accent-2" : "";

  if (variant === "mark") {
    return <BrandMark id={id} variant={markVariant} className={`${markSize} ${markColor} ${className}`} />;
  }

  return (
    <span
      style={gap !== undefined ? { gap: `${gap}px` } : undefined}
      className={`inline-flex items-center gap-1 font-bold leading-none tracking-[-0.02em] text-text ${textSize} ${className}`}
    >
      <BrandMark id={id} variant={markVariant} className={`${markSize} ${markColor}`} />
      <span>
        {"yzev"}
        <span className="text-accent-2">tech</span>
      </span>
    </span>
  );
}
