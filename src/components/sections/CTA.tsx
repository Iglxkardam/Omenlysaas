import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { useGsapReveal } from "@/hooks/useAnimeOnView";

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  useGsapReveal(ref, { stagger: 0.1 });

  return (
    <section ref={ref} id="contact" className="relative py-32 md:py-44 overflow-hidden">
      {/* Video background — more visible */}
      <div className="absolute inset-0 z-0">
        <LazyVideo src="/videos/cta.mp4" className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--c-bg)]/80 via-[var(--c-bg)]/50 to-[var(--c-bg)]/30" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-16 items-center">
          {/* Left — text + CTAs */}
          <div>
            <h2 className="gsap-reveal text-[clamp(1.6rem,3.2vw,2.4rem)] font-semibold tracking-[-0.03em] text-[var(--c-text)] mb-5 leading-[1.15]">
              Deploy on the trustless
              <br />
              <span className="text-gradient-accent">oracle settlement layer</span>
            </h2>

            <p className="gsap-reveal text-[14px] text-[var(--c-text-secondary)] leading-[1.8] mb-8 max-w-[440px]">
              One endpoint for pre-trade validation and post-expiry settlement.
              Permissionless infrastructure with BFT consensus, cryptographic
              attestation, and immutable on-chain proofs. Free tier — no credit card.
            </p>

            <div className="gsap-reveal flex flex-wrap gap-3 mb-6">
              <Button to="/pricing">
                Request Access
                <ArrowRight size={14} />
              </Button>
            </div>

            <div className="gsap-reveal flex items-center gap-6 pt-5 border-t border-white/[0.06]">
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[var(--c-text)] font-[family-name:var(--font-mono)]">99.9%</span>
                <span className="text-[10px] text-[var(--c-text-dim)]">Uptime SLA</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[var(--c-text)] font-[family-name:var(--font-mono)]">BFT</span>
                <span className="text-[10px] text-[var(--c-text-dim)]">Consensus</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-semibold text-[var(--c-text)] font-[family-name:var(--font-mono)]">Free</span>
                <span className="text-[10px] text-[var(--c-text-dim)]">Devnet Tier</span>
              </div>
            </div>
          </div>

          {/* Right — terminal */}
          <div className="gsap-reveal mt-24 lg:mt-32">
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#0d0e11] border-b border-white/[0.06]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-auto text-[9px] font-mono text-[var(--c-text-dim)]">~/terminal</span>
              </div>
              <img
                src="/images/terminal.png"
                alt="Terminal startup"
                className="w-full h-auto block"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
