import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <div
      className={`
        rounded-xl border border-[var(--c-border)] bg-[var(--c-bg-card)]
        p-6 md:p-8
        ${hover ? "transition-all duration-300 hover:border-[var(--c-border-hover)] hover:glow-sm hover:-translate-y-0.5" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
