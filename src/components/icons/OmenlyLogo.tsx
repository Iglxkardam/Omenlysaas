interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function OmenlyLogo({ className = "", size = 28, showText = true }: LogoProps) {
  return (
    <span className={`flex items-center gap-2.5 group ${className}`} aria-label="Omenly Home">
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M8 16c0 0 4-6 8-6s8 6 8 6-4 6-8 6-8-6-8-6z"
          stroke="var(--c-accent)"
          strokeWidth="1.3"
          fill="var(--c-accent)"
          fillOpacity="0.08"
        />
        <circle cx="16" cy="16" r="3.5" fill="none" stroke="var(--c-accent)" strokeWidth="1" opacity="0.5" />
        <circle cx="16" cy="16" r="1.5" fill="var(--c-accent)" />
      </svg>

      {showText && (
        <span className="text-[15px] font-bold tracking-[-0.03em] text-[var(--c-text)] group-hover:text-[var(--c-accent)] transition-colors duration-300">
          Omenly
        </span>
      )}
    </span>
  );
}
