import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle, ShieldCheck, Scan, GitMerge, Timer, Search, BarChart3 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Button } from "@/components/ui/Button";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  const validatorRef = useRef<HTMLDivElement>(null);
  const resolverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".svc-media, .svc-content, .svc-feat").forEach((el) => {
        (el as HTMLElement).style.opacity = "1";
        (el as HTMLElement).style.transform = "none";
      });
      return;
    }

    // Set initial states so GSAP owns them
    [validatorRef, resolverRef].forEach((ref, idx) => {
      if (!ref.current) return;
      const el = ref.current;
      const isEven = idx % 2 === 0;
      gsap.set(el.querySelector(".svc-media"), { opacity: 0, x: isEven ? -60 : 60 });
      gsap.set(el.querySelector(".svc-content"), { opacity: 0, x: isEven ? 40 : -40 });
      gsap.set(el.querySelectorAll(".svc-feat"), { opacity: 0, y: 16 });
    });

    const ctx = gsap.context(() => {
      [validatorRef, resolverRef].forEach((ref) => {
        if (!ref.current) return;
        const el = ref.current;

        gsap.to(el.querySelector(".svc-media"),
          { opacity: 1, x: 0, duration: 1, ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" } });

        gsap.to(el.querySelector(".svc-content"),
          { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.15,
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" } });

        gsap.to(el.querySelectorAll(".svc-feat"),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: "power2.out", delay: 0.4,
            scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" } });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative py-28 md:py-36 overflow-hidden">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        <SectionHeading
          tag="Protocol Infrastructure"
          title="Trustless infrastructure for on-chain markets"
          description="Two permissionless engines solving the hardest primitives in DeFi prediction markets — pre-trade integrity validation and post-expiry outcome finality."
        />

        {/* ═══ VALIDATOR FIRST ═══ */}
        <div ref={validatorRef} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-32 md:mb-40">
          <VideoBlock src="/videos/validator-bg.mp4" badge="Integrity Gate — Live" dotColor="bg-emerald-400" />

          <div className="svc-content">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-emerald-400 mb-4 block">
              Omenly Validator
            </span>
            <h3 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold tracking-[-0.03em] text-white mb-5 leading-[1.2]">
              Pre-trade integrity gate for
              <br className="hidden md:block" />
              every on-chain market
            </h3>
            <p className="text-[14px] text-zinc-400 leading-[1.8] mb-8">
              Malformed markets erode protocol TVL and trigger governance disputes.
              Omenly Validator runs every submission through a deterministic screening
              pipeline — flagging Sybil-exploitable criteria, front-runnable parameters,
              and unresolvable settlement conditions before they hit the order book.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <FeatureChip icon={<ShieldCheck size={14} />} text="7-point deterministic screening" />
              <FeatureChip icon={<Scan size={14} />} text="MEV & Sybil detection" />
              <FeatureChip icon={<GitMerge size={14} />} text="Auto-remediation engine" />
              <FeatureChip icon={<CheckCircle size={14} />} text="Independent re-attestation" />
            </div>

            <Button to="/validator" variant="secondary">
              Explore Validator
              <ArrowRight size={13} />
            </Button>
          </div>
        </div>

        {/* ═══ RESOLVER SECOND ═══ */}
        <div ref={resolverRef} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="svc-content order-2 lg:order-1">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-blue-400 mb-4 block">
              Omenly Resolver
            </span>
            <h3 className="text-[clamp(1.4rem,2.5vw,1.9rem)] font-semibold tracking-[-0.03em] text-white mb-5 leading-[1.2]">
              Deterministic settlement finality
              <br className="hidden md:block" />
              in under 15 seconds
            </h3>
            <p className="text-[14px] text-zinc-400 leading-[1.8] mb-8">
              At block-level expiry, Omenly Resolver dispatches independent oracle agents
              that query cross-chain data feeds, DEX price oracles, and off-chain
              attestation sources. A BFT consensus aggregator synthesizes findings into
              a cryptographically signed settlement with on-chain evidence anchoring.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              <FeatureChip icon={<Timer size={14} />} text="Sub-15s settlement finality" color="blue" />
              <FeatureChip icon={<Search size={14} />} text="8+ cross-chain oracle feeds" color="blue" />
              <FeatureChip icon={<GitMerge size={14} />} text="BFT multi-agent consensus" color="blue" />
              <FeatureChip icon={<BarChart3 size={14} />} text="On-chain evidence anchoring" color="blue" />
            </div>

            <Button to="/resolver" variant="secondary">
              Explore Resolver
              <ArrowRight size={13} />
            </Button>
          </div>

          <VideoBlock src="/videos/resolver-bg.mp4" badge="Settlement Finality — Live" dotColor="bg-blue-400" className="order-1 lg:order-2" />
        </div>
      </div>
    </section>
  );
}

/** Video block with faded edges — no hard border */
function VideoBlock({ src, badge, dotColor, className = "" }: { src: string; badge: string; dotColor: string; className?: string }) {
  return (
    <div
      className={`svc-media relative aspect-[4/3] ${className}`}
      style={{
        WebkitMaskImage: "radial-gradient(ellipse 85% 80% at 50% 45%, black 50%, transparent 100%)",
        maskImage: "radial-gradient(ellipse 85% 80% at 50% 45%, black 50%, transparent 100%)",
      }}
    >
      <LazyVideo src={src} className="absolute inset-0 w-full h-full object-cover rounded-2xl" />
      {/* Bottom badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-xl rounded-full px-3.5 py-1.5">
        <div className={`w-1.5 h-1.5 rounded-full ${dotColor} animate-pulse`} />
        <span className="text-[10px] font-mono text-zinc-400">{badge}</span>
      </div>
    </div>
  );
}

function FeatureChip({ icon, text, color = "emerald" }: { icon: React.ReactNode; text: string; color?: string }) {
  const styles = color === "blue"
    ? "border-blue-500/15 bg-blue-500/[0.04] text-blue-300"
    : "border-emerald-500/15 bg-emerald-500/[0.04] text-emerald-300";

  return (
    <div className={`svc-feat flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[11px] font-medium ${styles}`}>
      {icon}
      <span className="leading-tight">{text}</span>
    </div>
  );
}
