import { BrandMark } from "@/components/brand/BrandMark";

type LogoProps = {
  variant?: "horizontal" | "mark";
  id?: string;
  className?: string;
};

export function Logo({ variant = "horizontal", id = "brand-logo", className = "" }: LogoProps) {
  if (variant === "mark") {
    return <BrandMark id={id} className={`h-6 w-6 ${className}`} />;
  }

  return (
    <span className={`inline-flex items-center gap-2 text-base font-bold tracking-[-0.02em] text-text ${className}`}>
      <BrandMark id={id} className="h-6 w-6" />
      yzev<span className="text-accent-2">tech</span>
    </span>
  );
}
