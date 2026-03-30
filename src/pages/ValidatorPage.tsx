import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck, Scan, GitMerge, Eye, AlertTriangle, CheckCircle, Lock, Fingerprint } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { SEO } from "@/components/SEO";

gsap.registerPlugin(ScrollTrigger);

export default function ValidatorPage() {
  const heroRef = useRef<HTMLElement>(null);
  const flowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Hero elements stagger in
      gsap.fromTo(".v-hero-el", { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", delay: 0.2,
      });

      // Flow cards slide in from alternating sides
      gsap.utils.toArray<HTMLElement>(".v-flow-card").forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, x: i % 2 === 0 ? -60 : 60 }, {
          opacity: 1, x: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });

      // Feature cards pop in
      gsap.utils.toArray<HTMLElement>(".v-feat").forEach((el) => {
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
        title="Validator — On-Chain Market Integrity Screening"
        description="Omenly Validator is a deterministic pre-trade integrity gate for prediction markets. 7-point screening pipeline with MEV detection, Sybil resistance, and auto-remediation. Protect protocol TVL before markets go live."
        path="/validator"
      />
      {/* ══════ HERO — Immersive full-width with floating image ══════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/validator-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-bg)]/60 via-[var(--c-bg)]/40 to-[var(--c-bg)]" />
          {/* Ambient glow orbs */}
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500/[0.04] rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8 py-32 w-full">
          <div className="grid lg:grid-cols-[1fr_0.8fr] gap-12 items-center">
            <div>
              <h1 className="v-hero-el text-[clamp(2.2rem,4.5vw,3.4rem)] font-extrabold tracking-[-0.04em] text-white mb-6 leading-[1.08]">
                The on-chain integrity
                <br />
                gate your protocol
                <br />
                <span className="text-emerald-400">demands</span>
              </h1>
              <p className="v-hero-el text-[15px] text-zinc-400 leading-[1.8] mb-9 max-w-[440px]">
                Malformed markets drain protocol TVL and trigger governance disputes.
                Omenly Validator screens every submission deterministically — flagging
                Sybil-exploitable criteria, front-runnable parameters, and unresolvable
                settlement conditions before they hit the order book.
              </p>
              <div className="v-hero-el flex flex-wrap gap-3">
                <Button to="/pricing">Get Started <ArrowRight size={14} /></Button>
                <Button variant="secondary" to="/pricing">Request Access</Button>
              </div>
            </div>

            {/* Floating image with glass overlay */}
            <div className="v-hero-el relative hidden lg:block">
              <div className="absolute -inset-12 bg-emerald-500/[0.05] rounded-full blur-[80px]" />
              <div className="relative">
                <div className="rounded-2xl overflow-hidden ring-1 ring-white/[0.08] shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                  <img src="/images/validator.png" alt="" className="w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#06070a] via-transparent to-transparent" />
                </div>
                {/* Glass stat card floating over image */}
                <div className="absolute -bottom-6 -left-6 bg-[#0c0d12]/80 backdrop-blur-2xl border border-white/[0.08] rounded-xl px-5 py-4 shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                      <ShieldCheck size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-[13px] font-bold text-white">Deterministic</div>
                      <div className="text-[10px] text-zinc-500">Zero human dependency</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-[#0c0d12]/80 backdrop-blur-2xl border border-white/[0.08] rounded-xl px-4 py-3 shadow-xl">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-emerald-400/80">screening.live</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ FLOW — Alternating side cards with gradient connectors ══════ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/footer-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-[var(--c-bg)]/70" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
        </div>
        <div ref={flowRef} className="relative max-w-[900px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="v-flow-card text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em] text-white">
              Submit. Validate. Deploy on-chain.
            </h2>
          </div>

          {/* Vertical timeline line */}
          <div className="absolute left-1/2 top-[280px] bottom-[100px] w-px bg-gradient-to-b from-emerald-500/20 via-emerald-500/10 to-transparent hidden md:block" />

          {/* Step 1 — Left */}
          <div className="v-flow-card relative md:w-[48%] md:mr-auto mb-16 md:mb-24">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/30 to-transparent">
              <div className="rounded-2xl bg-[#0a0c10] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center ring-1 ring-emerald-500/15">
                    <Fingerprint size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-emerald-400/40 mb-0.5">STEP 01</div>
                    <h3 className="text-[15px] font-bold text-white">Market Intake</h3>
                  </div>
                </div>
                <p className="text-[13px] text-zinc-400 leading-[1.75]">
                  Market calldata is submitted via a single oracle endpoint. The validator
                  parses settlement criteria, expiry block conditions, and resolution parameters.
                </p>
              </div>
            </div>
            {/* Connector dot */}
            <div className="absolute top-1/2 -right-[29px] w-3.5 h-3.5 rounded-full bg-[#0a0c10] border-2 border-emerald-500/30 hidden md:block" />
          </div>

          {/* Step 2 — Right (highlighted) */}
          <div className="v-flow-card relative md:w-[48%] md:ml-auto mb-16 md:mb-24">
            <div className="relative rounded-2xl p-[1px] bg-gradient-to-bl from-emerald-500/40 via-emerald-500/20 to-emerald-500/40 shadow-[0_0_80px_-20px_rgba(16,185,129,0.12)]">
              <div className="rounded-2xl bg-[#0a0c10] p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center ring-1 ring-emerald-500/25">
                    <ShieldCheck size={20} className="text-emerald-400" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-emerald-400/60 mb-0.5">STEP 02</div>
                    <h3 className="text-[15px] font-bold text-white">Autonomous Screening</h3>
                  </div>
                  <span className="ml-auto w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[13px] text-zinc-400 leading-[1.75]">
                  The oracle executes a deterministic screening pipeline — verifying
                  on-chain resolvability, detecting MEV and Sybil attack vectors, and
                  ensuring unambiguous settlement state transitions.
                </p>
              </div>
            </div>
            <div className="absolute top-1/2 -left-[29px] w-3.5 h-3.5 rounded-full bg-[#0a0c10] border-2 border-emerald-500/40 hidden md:block" />
          </div>

          {/* Step 3 — Outcomes spanning full width */}
          <div className="v-flow-card relative">
            <div className="text-center mb-6">
              <div className="text-[9px] font-mono text-emerald-400/40 mb-1">OUTCOME</div>
              <h3 className="text-[15px] font-bold text-white">Three Verdicts</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="rounded-2xl p-[1px] bg-gradient-to-b from-emerald-500/25 to-transparent">
                <div className="rounded-2xl bg-[#0a0c10] p-5 text-center h-full">
                  <CheckCircle size={20} className="text-emerald-400 mx-auto mb-3" />
                  <div className="text-[14px] font-bold text-emerald-400 mb-1.5">Approved</div>
                  <p className="text-[11.5px] text-zinc-500 leading-[1.6]">Integrity verified. Deployed to order book with cryptographic attestation.</p>
                </div>
              </div>
              <div className="rounded-2xl p-[1px] bg-gradient-to-b from-amber-500/25 to-transparent">
                <div className="rounded-2xl bg-[#0a0c10] p-5 text-center h-full">
                  <GitMerge size={20} className="text-amber-400 mx-auto mb-3" />
                  <div className="text-[14px] font-bold text-amber-400 mb-1.5">Remediated</div>
                  <p className="text-[11.5px] text-zinc-500 leading-[1.6]">Auto-remediated by the oracle. Re-attested independently before deployment.</p>
                </div>
              </div>
              <div className="rounded-2xl p-[1px] bg-gradient-to-b from-red-500/25 to-transparent">
                <div className="rounded-2xl bg-[#0a0c10] p-5 text-center h-full">
                  <AlertTriangle size={20} className="text-red-400 mx-auto mb-3" />
                  <div className="text-[14px] font-bold text-red-400 mb-1.5">Rejected</div>
                  <p className="text-[11.5px] text-zinc-500 leading-[1.6]">Fundamentally unresolvable. Full reasoning chain with evidence hash returned.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ WHY — Bento grid with mixed sizes ══════ */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/footer-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[var(--c-bg)]/75" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
        </div>
        <div className="relative max-w-[1120px] mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="v-feat text-[clamp(1.6rem,3vw,2.4rem)] font-bold tracking-[-0.03em] text-white">
              Stop rolling your own oracle infrastructure
            </h2>
          </div>

          {/* Bento — 1 large left + 2 stacked right */}
          <div className="grid md:grid-cols-5 gap-3 mb-3">
            {/* Large card */}
            <div className="v-feat md:col-span-3 relative rounded-2xl p-[1px] bg-gradient-to-br from-emerald-500/20 via-transparent to-transparent">
              <div className="rounded-2xl bg-[#0b0d12] p-8 h-full flex flex-col justify-between min-h-[280px]">
                <ShieldCheck size={32} className="text-emerald-400/50" />
                <div>
                  <h3 className="text-[22px] font-bold text-white mb-3 tracking-[-0.02em]">Eliminate Governance Disputes</h3>
                  <p className="text-[13.5px] text-zinc-400 leading-[1.8] max-w-[400px]">
                    Ambiguous markets trigger settlement disputes, drain protocol TVL, and create
                    governance overhead. Validator enforces deterministic pre-trade integrity —
                    protecting liquidity providers and your protocol&apos;s on-chain reputation.
                  </p>
                </div>
              </div>
            </div>

            {/* 2 stacked */}
            <div className="md:col-span-2 flex flex-col gap-3">
              <div className="v-feat relative rounded-2xl p-[1px] bg-gradient-to-bl from-white/[0.08] to-transparent flex-1">
                <div className="rounded-2xl bg-[#0b0d12] p-6 h-full">
                  <Scan size={24} className="text-emerald-400/50 mb-4" />
                  <h3 className="text-[16px] font-bold text-white mb-2">MEV & Sybil Detection</h3>
                  <p className="text-[12px] text-zinc-500 leading-[1.7]">
                    Markets exploitable via front-running, sandwich attacks, or information asymmetry are flagged and rejected.
                  </p>
                </div>
              </div>
              <div className="v-feat relative rounded-2xl p-[1px] bg-gradient-to-tl from-white/[0.08] to-transparent flex-1">
                <div className="rounded-2xl bg-[#0b0d12] p-6 h-full">
                  <GitMerge size={24} className="text-emerald-400/50 mb-4" />
                  <h3 className="text-[16px] font-bold text-white mb-2">Auto-Remediation</h3>
                  <p className="text-[12px] text-zinc-500 leading-[1.7]">
                    Fixable markets are rewritten and re-attested, not rejected. More listings. More TVL. More protocol revenue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row — 2 equal */}
          <div className="grid md:grid-cols-2 gap-3">
            <div className="v-feat relative rounded-2xl p-[1px] bg-gradient-to-tr from-white/[0.06] to-transparent">
              <div className="rounded-2xl bg-[#0b0d12] p-7">
                <Lock size={24} className="text-emerald-400/50 mb-4" />
                <h3 className="text-[16px] font-bold text-white mb-2">Immutable Evidence Anchoring</h3>
                <p className="text-[12.5px] text-zinc-500 leading-[1.7]">
                  Every verdict is anchored on-chain with a cryptographic evidence hash —
                  immutable, dispute-ready, and verifiable by any on-chain participant.
                </p>
              </div>
            </div>
            <div className="v-feat relative rounded-2xl p-[1px] bg-gradient-to-tl from-white/[0.06] to-transparent">
              <div className="rounded-2xl bg-[#0b0d12] p-7">
                <Eye size={24} className="text-emerald-400/50 mb-4" />
                <h3 className="text-[16px] font-bold text-white mb-2">Single Oracle Endpoint</h3>
                <p className="text-[12.5px] text-zinc-500 leading-[1.7]">
                  No infra to deploy. No oracle nodes to maintain. No validator set to manage.
                  One POST to the oracle endpoint — deterministic verdict returned.
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
          <h2 className="v-feat text-[clamp(1.4rem,2.8vw,2rem)] font-bold tracking-[-0.03em] text-white mb-5">
            Deploy trustless markets at protocol speed
          </h2>
          <p className="v-feat text-[14px] text-zinc-400 leading-[1.7] mb-8">
            Single oracle endpoint. Deterministic screening. Cryptographic attestation.
            Free devnet tier — no credit card required.
          </p>
          <div className="v-feat flex flex-wrap justify-center gap-3">
            <Button to="/pricing">View Pricing <ArrowRight size={13} /></Button>
            <Button variant="secondary" to="/pricing">Request Access</Button>
          </div>
        </div>
      </section>
    </>
  );
}
