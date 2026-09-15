import { BrandMark } from "@/components/brand/BrandMark";

type LogoProps = {
  variant?: "horizontal" | "mark";
  id?: string;
  className?: string;
  gap?: number;
  techGradient?: boolean;
  size?: "default" | "lg";
};

export function Logo({
  variant = "horizontal",
  id = "brand-logo",
  className = "",
  gap,
  techGradient = false,
  size = "default",
}: LogoProps) {
  const markSize = size === "lg" ? "h-7 w-7 lg:h-8 lg:w-8" : "h-7 w-7";
  const textSize = size === "lg" ? "text-base lg:text-[1.1rem]" : "text-base";

  if (variant === "mark") {
    return <BrandMark id={id} className={`${markSize} ${className}`} />;
  }

  return (
    <span
      style={gap !== undefined ? { gap: `${gap}px` } : undefined}
      className={`inline-flex items-center gap-1 font-bold leading-none tracking-[-0.02em] text-text ${textSize} ${className}`}
    >
      <BrandMark id={id} className={markSize} />
      <span>
        {"yzev"}
        <span
          className={
            techGradient
              ? "bg-[linear-gradient(135deg,#A477FF_0%,#7C3FF0_55%,#6330D7_100%)] bg-clip-text text-transparent"
              : "text-accent-2"
          }
        >
          tech
        </span>
      </span>
    </span>
  );
}
