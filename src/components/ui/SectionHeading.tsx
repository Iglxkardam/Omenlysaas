import { useRef } from "react";
import { useGsapReveal } from "@/hooks/useAnimeOnView";

interface Props {
  tag?: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ title, description, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useGsapReveal(ref, { stagger: 0.08 });

  return (
    <div ref={ref} className={`text-center max-w-xl mx-auto mb-16 md:mb-20 ${className}`}>
      <h2 className="gsap-reveal text-[clamp(1.5rem,3vw,2.2rem)] font-semibold tracking-[-0.03em] text-[var(--c-text)] mb-4">
        {title}
      </h2>
      {description && (
        <p className="gsap-reveal text-[14px] text-[var(--c-text-secondary)] leading-[1.7]">
          {description}
        </p>
      )}
    </div>
  );
}
