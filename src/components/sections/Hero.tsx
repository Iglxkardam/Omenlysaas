import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { getLenis } from "@/hooks/useSmoothScroll";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelectorAll(".hero-anim, .hero-word"), { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      // Heading lines — smooth clip-path reveal (wipe up)
      gsap.fromTo(".hero-word",
        { clipPath: "inset(100% 0 0 0)", y: 20 },
        {
          clipPath: "inset(0% 0 0 0)",
          y: 0,
          duration: 0.9,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.3,
        },
      );

      // Subtitle, CTAs, stats fade up
      gsap.fromTo(".hero-anim",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 1 },
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <LazyVideo src="/videos/hero-bg.mp4" className="absolute inset-0 w-full h-full object-cover" eager />
        <div className="absolute inset-0 bg-[var(--c-bg)]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--c-bg)]/80 via-[var(--c-bg)]/40 to-transparent" />
        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="max-w-[640px]">
          {/* Heading */}
          <h1 className="text-[clamp(1.9rem,3.8vw,3rem)] font-extrabold tracking-[-0.03em] leading-[1.2] mb-7">
            <span className="hero-word block text-[var(--c-text)]">The trustless oracle layer for</span>
            <span className="hero-word block text-gradient-accent">prediction markets</span>
          </h1>

          {/* Sub */}
          <p className="hero-anim text-[15px] text-[var(--c-text-secondary)] leading-[1.8] max-w-[520px] mb-8">
            Omenly is a decentralized oracle engine that validates market
            integrity and resolves outcomes — binary or multi-leg — through
            multi-agent Byzantine fault-tolerant consensus, cross-chain data
            verification, and immutable on-chain audit trails.
          </p>

          {/* CTAs */}
          <div className="hero-anim flex flex-wrap gap-3 mb-10">
            <Button onClick={() => {
              const lenis = getLenis();
              if (lenis) lenis.scrollTo("#services", { duration: 1.2 });
              else document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Explore Services
              <ArrowRight size={14} />
            </Button>
            <Button variant="secondary" to="/pricing">
              View Pricing
            </Button>
          </div>

          {/* Stats */}
          <div className="hero-anim flex items-center gap-8 pt-6 border-t border-white/[0.06]">
            <Stat value="< 15s" label="Settlement Finality" />
            <Stat value="BFT" label="Consensus Protocol" />
            <Stat value="8+" label="Oracle Sources" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[14px] font-semibold text-[var(--c-text)] font-[family-name:var(--font-mono)]">{value}</span>
      <span className="text-[10px] text-[var(--c-text-dim)] tracking-wide">{label}</span>
    </div>
  );
}
