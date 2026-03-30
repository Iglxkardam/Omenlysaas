interface IconProps {
  size?: number;
  className?: string;
}

export function ResolverIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="2.5" fill="var(--c-accent)" />
      <circle cx="5" cy="5" r="1.5" fill="var(--c-accent)" opacity="0.5" />
      <circle cx="19" cy="5" r="1.5" fill="var(--c-accent)" opacity="0.5" />
      <circle cx="12" cy="21" r="1.5" fill="var(--c-accent)" opacity="0.5" />
      <line x1="6.5" y1="6" x2="10.5" y2="10.5" stroke="var(--c-accent)" strokeWidth="0.7" opacity="0.3" />
      <line x1="17.5" y1="6" x2="13.5" y2="10.5" stroke="var(--c-accent)" strokeWidth="0.7" opacity="0.3" />
      <line x1="12" y1="19.5" x2="12" y2="14.5" stroke="var(--c-accent)" strokeWidth="0.7" opacity="0.3" />
    </svg>
  );
}

export function ValidatorIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2L4 6v6c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V6l-8-4z"
        stroke="var(--c-accent-2)"
        strokeWidth="1.2"
        fill="var(--c-accent-2)"
        fillOpacity="0.06"
      />
      <path d="M9 12.5l2 2 4-5" stroke="var(--c-accent-2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function StepIcon({ number, size = 40, className = "" }: IconProps & { number: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="18" fill="var(--c-accent)" opacity="0.06" />
      <circle cx="20" cy="20" r="18" stroke="var(--c-accent)" strokeWidth="0.7" opacity="0.2" />
      <text x="20" y="21" textAnchor="middle" dominantBaseline="central" fill="var(--c-accent)" fontSize="13" fontWeight="600" fontFamily="var(--font-sans)">
        {number}
      </text>
    </svg>
  );
}
