import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "filled";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold leading-tight transition-colors disabled:opacity-45 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "text-text border border-accent hover:bg-accent/[12%] active:bg-accent/[22%]",
  secondary:
    "text-text border border-divider hover:bg-text/[7%] active:bg-text/[14%]",
  ghost: "text-accent px-2 hover:bg-accent/[10%] active:bg-accent/[18%]",
  filled:
    "bg-gradient-to-br from-accent-2 to-accent text-white border border-transparent hover:brightness-110 active:brightness-95",
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
