import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, GitMerge, BarChart3, Lock, Zap, Eye, Search, Cpu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { SEO } from "@/components/SEO";

gsap.registerPlugin(ScrollTrigger);

export default function ResolverPage() {
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(".r-hero-el", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2,
      });

      gsap.utils.toArray<HTMLElement>(".r-flow-card").forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, x: i % 2 === 0 ? -60 : 60 }, {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".r-feat").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40, scale: 0.95 }, {
          opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none reverse" },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SEO
        title="Resolver — Decentralized Settlement Finality Engine"
        description="Omenly Resolver achieves on-chain settlement finality in under 15 seconds. Multi-agent BFT consensus with cross-chain oracle feeds, cryptographic attestation, and immutable evidence anchoring. No centralized resolution bottlenecks."
        path="/resolver"
      />
      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/resolver-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-bg)]/60 via-[var(--c-bg)]/40 to-[var(--c-bg)]" />
          <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-blue-500/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/[0.03] rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-center">
            <div>
              <h1 className="r-hero-el text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold tracking-[-0.04em] text-white mb-6 leading-[1.08]">
                On-chain settlement
                <br />
                finality in seconds,
                <br />
                <span className="text-blue-400">not epochs</span>
              </h1>
              <p className="r-hero-el text-[15px] text-zinc-400 leading-[1.8] mb-9 max-w-[440px]">
                Manual resolution creates single points of failure and doesn&apos;t scale.
                Omenly Resolver achieves outcome finality through decentralized oracle
                consensus — delivering cryptographic attestation anchored on-chain.
              </p>
              <div className="r-hero-el flex flex-wrap gap-3">
                <Button to="/pricing">Get Started <ArrowRight size={14} /></Button>
                <Button variant="secondary" to="/pricing">Request Access</Button>
              </div>
            </div>

            <div className="r-hero-el relative hidden lg:block">
              <div className="absolute -inset-12 bg-blue-500/[0.05] rounded-full blur-[80px]" />
              <div className="relative">
                <div className="rounded-2xl overflow-hidden ring-1 ring-white/[0.08] shadow-2xl -rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img src="/images/resolver.png" alt="" className="w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-[#0c0d12]/80 backdrop-blur-2xl border border-white/[0.08] rounded-xl px-5 py-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <Zap size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white">Sub-Second</div>
                      <div className="text-[10px] text-zinc-500">BFT consensus latency</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 bg-[#0c0d12]/80 backdrop-blur-2xl border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-blue-400/80">settlement.live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FLOW — Alternating timeline ══════ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/footer-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-[var(--c-bg)]/70" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
        </div>
        <div ref={flowRef} className="relative max-w-[900px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="r-flow-card text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em] text-white">
              Expire. Attest. Finalize on-chain.
            </h2>
          </div>

          <div className="absolute left-1/2 top-[280px] bottom-[100px] w-px bg-gradient-to-b from-blue-500/20 via-purple-500/15 to-emerald-500/20 hidden md:block" />

          {/* Step 1 — Left */}
          <div className="r-flow-card relative md:w-[48%] md:mr-auto mb-16 md:mb-24">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/30 to-transparent">
              <div className="rounded-2xl bg-[#0a0c10] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center ring-1 ring-blue-500/15">
                    <Zap size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-blue-400/40 mb-0.5">STEP 01</div>
                    <h3 className="text-[15px] font-bold text-white">Block-Level Expiry</h3>
                  </div>
                </div>
                <p className="text-[13px] text-zinc-400 leading-[1.75]">
                  When the market hits its expiry block or timestamp condition, the
                  resolver oracle triggers deterministically. Independent oracle agents
                  are dispatched across cross-chain data feeds.
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 -right-[29px] w-3.5 h-3.5 rounded-full bg-[#0a0c10] border-2 border-blue-500/30 hidden md:block" />
          </div>

          {/* Step 2 — Right (highlighted) */}
          <div className="r-flow-card relative md:w-[48%] md:ml-auto mb-16 md:mb-24">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-bl from-blue-500/40 via-blue-500/20 to-blue-500/40 shadow-[0_0_80px_-20px_rgba(79,143,255,0.12)]">
              <div className="rounded-2xl bg-[#0a0c10] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center ring-1 ring-blue-500/25">
                    <Search size={20} className="text-blue-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-blue-400/60 mb-0.5">STEP 02</div>
                    <h3 className="text-[15px] font-bold text-white">Oracle Consensus</h3>
                  </div>
                  <span className="ml-auto w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                </div>
                <p className="text-[13px] text-zinc-400 leading-[1.75]">
                  Each oracle agent independently queries DEX price feeds, on-chain state,
                  and off-chain attestation sources. The BFT aggregator synthesizes findings
                  into a quorum-verified outcome.
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 -left-[29px] w-3.5 h-3.5 rounded-full bg-[#0a0c10] border-2 border-blue-500/40 hidden md:block" />
          </div>

          {/* Step 3 — Left */}
          <div className="r-flow-card relative md:w-[48%] md:mr-auto">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/30 to-transparent">
              <div className="rounded-2xl bg-[#0a0c10] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-500/15">
                    <Lock size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-emerald-400/40 mb-0.5">STEP 03</div>
                    <h3 className="text-[15px] font-bold text-white">On-Chain Settlement</h3>
                  </div>
                </div>
                <p className="text-[13px] text-zinc-400 leading-[1.75]">
                  Verified outcome anchored on-chain with cryptographic evidence hash —
                  confidence scores, oracle citations, and reasoning chains. Immutable.
                  Trustlessly dispute-ready.
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 -right-[29px] w-3.5 h-3.5 rounded-full bg-[#0a0c10] border-2 border-emerald-500/30 hidden md:block" />
          </div>
        </div>
      </section>

      {/* ══════ WHY — Bento grid ══════ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/footer-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[var(--c-bg)]/75" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
        </div>
        <div className="relative max-w-[1120px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="r-feat text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em] text-white">
              Eliminate centralized resolution bottlenecks
            </h2>
          </div>

          <div className="grid md:grid-cols-5 gap-3 mb-3">
            <div className="r-feat md:col-span-3 relative rounded-2xl p-[1px] bg-gradient-to-br from-blue-500/20 via-transparent to-transparent">
              <div className="rounded-2xl bg-[#0b0d12] p-8 h-full flex flex-col justify-between min-h-[280px]">
                <Cpu size={32} className="text-blue-400/50" />
                <div>
                  <h3 className="text-[22px] font-bold text-white mb-3 tracking-[-0.02em]">Permissionless Scalability</h3>
                  <p className="text-[13.5px] text-zinc-400 leading-[1.8] max-w-[400px]">
                    Centralized resolution creates single points of failure and governance overhead.
                    Resolver handles thousands of markets trustlessly — whether your protocol runs 10 or 10,000 concurrent positions.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col gap-3">
              <div className="r-feat relative rounded-2xl p-[1px] bg-gradient-to-bl from-white/[0.08] to-transparent flex-1">
                <div className="rounded-2xl bg-[#0b0d12] p-6 h-full">
                  <Eye size={24} className="text-blue-400/50 mb-4" />
                  <h3 className="text-[16px] font-bold text-white mb-2">Zero-Trust Verification</h3>
                  <p className="text-[12px] text-zinc-500 leading-[1.7]">
                    Market creator claims are verified against decentralized oracle sources. No single entity trusted.
                  </p>
                </div>
              </div>
              <div className="r-feat relative rounded-2xl p-[1px] bg-gradient-to-tl from-white/[0.08] to-transparent flex-1">
                <div className="rounded-2xl bg-[#0b0d12] p-6 h-full">
                  <BarChart3 size={24} className="text-blue-400/50 mb-4" />
                  <h3 className="text-[16px] font-bold text-white mb-2">Probabilistic Confidence</h3>
                  <p className="text-[12px] text-zinc-500 leading-[1.7]">
                    Calibrated confidence thresholds on every outcome. High-TVL markets require stronger oracle quorum.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="r-feat relative rounded-2xl p-[1px] bg-gradient-to-tr from-white/[0.06] to-transparent">
              <div className="rounded-2xl bg-[#0b0d12] p-7">
                <Lock size={24} className="text-blue-400/50 mb-4" />
                <h3 className="text-[16px] font-bold text-white mb-2">Cryptographic Attestation</h3>
                <p className="text-[12.5px] text-zinc-500 leading-[1.7]">
                  Full reasoning chains and oracle citations anchored as immutable evidence
                  hashes on-chain. Trustlessly verifiable by any protocol participant.
                </p>
              </div>
            </div>
            <div className="r-feat relative rounded-2xl p-[1px] bg-gradient-to-tl from-white/[0.06] to-transparent">
              <div className="rounded-2xl bg-[#0b0d12] p-7">
                <GitMerge size={24} className="text-blue-400/50 mb-4" />
                <h3 className="text-[16px] font-bold text-white mb-2">Single Oracle Endpoint</h3>
                <p className="text-[12.5px] text-zinc-500 leading-[1.7]">
                  No oracle nodes to run. No validator set to bootstrap. No infra overhead.
                  POST your expired market — receive settlement finality with evidence hash.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ CTA ══════ */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Video background */}
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/cta.mp4" className="absolute inset-0 w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-[var(--c-bg)]/70" />
        </div>

        <div className="relative z-10 max-w-[560px] mx-auto px-6 lg:px-8 text-center">
          <h2 className="r-feat text-[clamp(1.4rem,2.8vw,2rem)] font-bold tracking-[-0.03em] text-white mb-5">
            Achieve settlement finality at protocol speed
          </h2>
          <p className="r-feat text-[14px] text-zinc-400 leading-[1.7] mb-8">
            Single oracle endpoint. Decentralized resolution. Cryptographic attestation.
            Free devnet tier — no credit card required.
          </p>
          <div className="r-feat flex flex-wrap justify-center gap-3">
            <Button to="/pricing">View Pricing <ArrowRight size={13} /></Button>
            <Button variant="secondary" to="/pricing">Request Access</Button>
          </div>
        </div>
      </section>
    </>
  );
}
