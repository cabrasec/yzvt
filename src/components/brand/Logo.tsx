import { BrandMark } from "@/components/brand/BrandMark";

type LogoProps = {
  variant?: "horizontal" | "mark";
  id?: string;
  className?: string;
  gap?: number;
  techGradient?: boolean;
};

export function Logo({
  variant = "horizontal",
  id = "brand-logo",
  className = "",
  gap,
  techGradient = false,
}: LogoProps) {
  if (variant === "mark") {
    return <BrandMark id={id} className={`h-7 w-7 ${className}`} />;
  }

  return (
    <span
      style={gap !== undefined ? { gap: `${gap}px` } : undefined}
      className={`inline-flex items-center gap-1 text-base font-bold leading-none tracking-[-0.02em] text-text ${className}`}
    >
      <BrandMark id={id} className="h-7 w-7" />
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
