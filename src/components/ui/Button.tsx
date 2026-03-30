import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  href?: string;
  to?: string;
}

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-[13px] font-medium transition-all duration-300 ease-out cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--c-accent)] disabled:opacity-40 disabled:pointer-events-none";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-[var(--c-accent)] text-white hover:brightness-110 hover:shadow-[0_0_24px_-4px_var(--c-accent-glow)] hover:translate-y-[-1px] active:translate-y-0 active:scale-[0.98] shadow-[0_0_16px_-4px_var(--c-accent-glow)]",
  secondary:
    "border border-[var(--c-border)] text-[var(--c-text-secondary)] bg-transparent hover:border-[var(--c-border-hover)] hover:text-[var(--c-text)] hover:bg-[var(--c-bg-elevated)] hover:translate-y-[-1px] active:translate-y-0 active:scale-[0.98]",
  ghost:
    "text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-[var(--c-accent-muted)] active:scale-[0.98]",
};

export function Button({ variant = "primary", children, href, to, className = "", ...props }: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  if (to) {
    return <Link to={to} className={classes}>{children}</Link>;
  }

  if (href) {
    return <a href={href} className={classes}>{children}</a>;
  }

  return <button className={classes} {...props}>{children}</button>;
}
