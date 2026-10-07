import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "filled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold leading-tight transition-colors disabled:opacity-45 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-background-light border border-transparent hover:bg-accent-dark active:bg-accent-dark",
  secondary:
    "text-text border border-divider hover:bg-text/[7%] active:bg-text/[14%]",
  ghost: "text-accent-2 px-2 hover:bg-accent-2/[10%] active:bg-accent-2/[18%]",
  filled:
    "bg-accent text-background-light border border-transparent hover:bg-accent-dark active:bg-accent-dark",
};

export function buttonClasses(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`;
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return <button className={buttonClasses(variant, className)} {...props} />;
}
