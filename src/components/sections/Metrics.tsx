import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useGsapReveal } from "@/hooks/useAnimeOnView";

const METRICS = [
  { value: 99.97, pre: "", suf: "%", label: "Uptime SLA", dec: 2 },
  { value: 15, pre: "<", suf: "s", label: "Avg. Settlement", dec: 0 },
  { value: 8, pre: "", suf: "+", label: "Live Data Feeds", dec: 0 },
  { value: 90, pre: "", suf: "%", label: "Cost Reduction", dec: 0 },
  { value: 7, pre: "", suf: "", label: "Validation Criteria", dec: 0 },
  { value: 0.01, pre: "$", suf: "", label: "Cost per Resolution", dec: 2 },
];

export function Metrics() {
  const ref = useRef<HTMLDivElement>(null);
  useGsapReveal(ref, { stagger: 0.06 });

  return (
    <section id="metrics" className="relative py-28 md:py-36 bg-[var(--c-bg-elevated)]">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        <SectionHeading
          tag="Performance"
          title="Numbers that matter"
          description="Engineered for platforms where settlement speed and reliability are non-negotiable."
        />
        <div ref={ref} className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {METRICS.map((m) => (
            <div key={m.label} className="gsap-reveal rounded-xl border border-[var(--c-border)] bg-[var(--c-bg-card)] p-6 text-center transition-all duration-300 hover:border-[var(--c-border-hover)]">
              <Counter value={m.value} prefix={m.pre} suffix={m.suf} decimals={m.dec} />
              <p className="text-[11px] text-[var(--c-text-muted)] mt-2 tracking-wide">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, prefix, suffix, decimals }: { value: number; prefix: string; suffix: string; decimals: number }) {
  const [display, setDisplay] = useState("0");
  const elRef = useRef<HTMLSpanElement>(null);
  const ran = useRef(false);

  useEffect(() => {
    const el = elRef.current;
    if (!el || ran.current) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting || ran.current) return;
      ran.current = true;
      obs.disconnect();
      const o = { v: 0 };
      gsap.to(o, { v: value, duration: 1.2, ease: "power2.out", onUpdate: () => setDisplay(o.v.toFixed(decimals)) });
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, decimals]);

  return (
    <span ref={elRef} className="text-2xl md:text-3xl font-semibold text-[var(--c-text)] tabular-nums font-[family-name:var(--font-mono)]">
      {prefix}{display}{suffix}
    </span>
  );
}
