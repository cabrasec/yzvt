import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-md px-4 py-2 text-sm font-medium leading-tight transition-colors disabled:opacity-45 disabled:cursor-not-allowed";

const variants: Record<ButtonVariant, string> = {
  primary:
    "text-accent border border-accent hover:bg-accent/[12%] active:bg-accent/[22%]",
  secondary:
    "text-text border border-divider hover:bg-text/[7%] active:bg-text/[14%]",
  ghost: "text-accent px-2 hover:bg-accent/[10%] active:bg-accent/[18%]",
};

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props} />
  );
}
