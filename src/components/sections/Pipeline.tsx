import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LazyVideo } from "@/components/ui/LazyVideo";

gsap.registerPlugin(ScrollTrigger);

export function Pipeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelectorAll(".pipe-step, .pipe-arrow, .pipe-flow"), { opacity: 1, y: 0, scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Steps cascade in
      gsap.fromTo(".pipe-step", { opacity: 0, y: 40, scale: 0.95 }, {
        opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none reverse" },
      });
      // Arrows grow
      gsap.fromTo(".pipe-arrow", { opacity: 0, scaleX: 0 }, {
        opacity: 1, scaleX: 1, duration: 0.4, stagger: 0.12, ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 75%", toggleActions: "play none none reverse", },
        delay: 0.3,
      });
      // Flow dots animate continuously
      gsap.to(".pipe-dot", {
        x: 28, opacity: 0, duration: 1, repeat: -1, ease: "none", stagger: { each: 0.3, repeat: -1 },
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
        delay: 1,
      });
      // Center glow pulse
      gsap.to(".pipe-glow", {
        scale: 1.3, opacity: 0, duration: 2, repeat: -1, ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "play none none reverse" },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pipeline" className="relative py-28 md:py-36 overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <LazyVideo src="/videos/pipeline.mp4" className="absolute inset-0 w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-[var(--c-bg)]/50" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
      </div>
      <div className="absolute inset-0 bg-dot-grid opacity-10" />
      <div className="relative max-w-[1120px] mx-auto px-6 lg:px-8">
        <SectionHeading
          tag="Oracle Pipeline"
          title="From market submission to on-chain finality"
          description="A fully deterministic oracle pipeline — permissionless execution, cryptographic attestation, immutable audit trail."
        />

        {/* ── Visual flow diagram ── */}
        <div ref={ref} className="mt-4">
          {/* Desktop: horizontal flow */}
          <div className="hidden lg:flex items-center justify-center gap-0">
            <Step n="01" title="Intake" icon={<InboxIcon />} desc="Market calldata parsed via oracle endpoint" accent={false} />
            <Arrow />
            <Step n="02" title="Research" icon={<SearchIcon />} desc="Parallel agents query cross-chain oracle feeds" accent={false} />
            <Arrow />
            <Step n="03" title="Consensus" icon={<NodesIcon />} desc="BFT aggregator achieves quorum convergence" accent />
            <Arrow />
            <Step n="04" title="Aggregation" icon={<MergeIcon />} desc="Evidence synthesis & cryptographic attestation" accent={false} />
            <Arrow />
            <Step n="05" title="Settlement" icon={<CheckIcon />} desc="On-chain finality with immutable evidence hash" accent={false} />
          </div>

          {/* Mobile: vertical flow */}
          <div className="lg:hidden flex flex-col items-center gap-0">
            <Step n="01" title="Intake" icon={<InboxIcon />} desc="Market calldata parsed via oracle endpoint" accent={false} />
            <ArrowV />
            <Step n="02" title="Research" icon={<SearchIcon />} desc="Parallel agents query cross-chain oracle feeds" accent={false} />
            <ArrowV />
            <Step n="03" title="Consensus" icon={<NodesIcon />} desc="BFT aggregator achieves quorum convergence" accent />
            <ArrowV />
            <Step n="04" title="Aggregation" icon={<MergeIcon />} desc="Evidence synthesis & cryptographic attestation" accent={false} />
            <ArrowV />
            <Step n="05" title="Settlement" icon={<CheckIcon />} desc="On-chain finality with immutable evidence hash" accent={false} />
          </div>

          {/* Bottom stats bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-[720px] mx-auto">
            {[
              { val: "< 15s", label: "Settlement finality", icon: <ClockIcon /> },
              { val: "3", label: "Oracle agents", icon: <ValidatorIcon /> },
              { val: "0.85–0.95", label: "Confidence threshold", icon: <TargetIcon /> },
              { val: "100%", label: "On-chain verifiable", icon: <ShieldIcon /> },
            ].map((s) => (
              <div
                key={s.label}
                className="pipe-step group relative flex flex-col items-center text-center px-4 py-5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:border-[var(--c-accent)]/20 hover:bg-[var(--c-accent)]/[0.03] transition-all duration-300"
              >
                <div className="text-[var(--c-accent)]/60 mb-2.5 group-hover:text-[var(--c-accent)] transition-colors duration-300">
                  {s.icon}
                </div>
                <div className="text-[20px] font-bold text-[var(--c-text)] font-[family-name:var(--font-mono)] tracking-tight leading-none mb-1.5">
                  {s.val}
                </div>
                <div className="text-[10px] text-[var(--c-text-dim)] tracking-[0.08em] uppercase font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Step card ── */
function Step({ n, title, icon, desc, accent }: { n: string; title: string; icon: React.ReactNode; desc: string; accent: boolean }) {
  return (
    <div className={`pipe-step relative flex flex-col items-center text-center p-5 rounded-xl border w-full lg:w-44 shrink-0 transition-all duration-300 ${
      accent
        ? "border-[var(--c-accent)]/30 bg-[var(--c-accent)]/[0.04] shadow-[0_0_30px_-8px_var(--c-accent-glow)]"
        : "border-[var(--c-border)] bg-[var(--c-bg-card)]"
    }`}>
      {accent && <div className="pipe-glow absolute inset-0 rounded-xl bg-[var(--c-accent)]/10 pointer-events-none" />}
      <div className="text-[9px] font-mono text-[var(--c-text-dim)] mb-2">{n}</div>
      <div className={`mb-2.5 ${accent ? "text-[var(--c-accent)]" : "text-[var(--c-text-muted)]"}`}>
        {icon}
      </div>
      <h3 className={`text-[13px] font-semibold mb-1 ${accent ? "text-[var(--c-accent)]" : "text-[var(--c-text)]"}`}>
        {title}
      </h3>
      <p className="text-[10.5px] text-[var(--c-text-muted)] leading-[1.5]">{desc}</p>
    </div>
  );
}

/* ── Arrows ── */
function Arrow() {
  return (
    <div className="pipe-arrow flex items-center gap-1 px-1 origin-left shrink-0">
      {/* Flow dots */}
      <div className="relative w-8 h-px bg-[var(--c-border)] overflow-hidden">
        <div className="pipe-dot absolute left-0 top-[-1.5px] w-1 h-1 rounded-full bg-[var(--c-accent)]" />
      </div>
      <svg width="6" height="10" viewBox="0 0 6 10" fill="none" className="text-[var(--c-text-dim)]">
        <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ArrowV() {
  return (
    <div className="pipe-arrow flex flex-col items-center py-1 origin-top">
      <div className="relative w-px h-6 bg-[var(--c-border)] overflow-hidden">
        <div className="pipe-dot absolute top-0 left-[-1.5px] w-1 h-1 rounded-full bg-[var(--c-accent)]" />
      </div>
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className="text-[var(--c-text-dim)]">
        <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── Step SVG icons ── */
function InboxIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  );
}

function NodesIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" /><circle cx="5" cy="6" r="2" /><circle cx="19" cy="6" r="2" /><circle cx="12" cy="20" r="2" />
      <line x1="6.7" y1="7.5" x2="10" y2="10" /><line x1="17.3" y1="7.5" x2="14" y2="10" /><line x1="12" y1="15" x2="12" y2="18" />
    </svg>
  );
}

function MergeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="18" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ── Stats icons ── */
function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ValidatorIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="9" y="14" width="6" height="6" rx="1" />
      <line x1="7" y1="10" x2="7" y2="14" /><line x1="17" y1="10" x2="17" y2="14" /><line x1="7" y1="14" x2="12" y2="14" /><line x1="17" y1="14" x2="12" y2="14" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
    </svg>
  );
}
