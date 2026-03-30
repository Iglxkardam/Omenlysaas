import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Hero graphic — HTML/CSS based pipeline visualization.
 * Much more reliable than SVG for GSAP animations.
 * Shows: Validators → Aggregator → Outcome flow.
 */
export function HeroGraphic({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasRun.current) return;
    hasRun.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelectorAll(".gfx-node"), { opacity: 1, scale: 1 });
      gsap.set(el.querySelectorAll(".gfx-line"), { opacity: 1, scaleX: 1 });
      gsap.set(el.querySelectorAll(".gfx-label"), { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // Nodes pop in
      gsap.fromTo(".gfx-node", { opacity: 0, scale: 0 }, {
        opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: "back.out(2)", delay: 0.4,
      });
      // Lines grow
      gsap.fromTo(".gfx-line", { opacity: 0, scaleX: 0 }, {
        opacity: 1, scaleX: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.7,
      });
      // Labels fade
      gsap.fromTo(".gfx-label", { opacity: 0, y: 6 }, {
        opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.9,
      });
      // Pulse the center
      gsap.to(".gfx-pulse", {
        scale: 1.8, opacity: 0, duration: 2, repeat: -1, ease: "power1.out",
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className={`relative select-none ${className}`}>
      {/* Container with aspect ratio */}
      <div className="relative w-full aspect-[4/3]">

        {/* ── Dot grid background ── */}
        <div className="absolute inset-0 bg-dot-grid opacity-30 rounded-xl" />

        {/* ── Connection lines ── */}
        {/* Validator 1 → Center */}
        <div className="gfx-line absolute top-[22%] left-[12%] w-[32%] h-px bg-gradient-to-r from-[var(--c-accent)]/40 to-[var(--c-accent)]/20 origin-left rotate-[18deg]" />
        {/* Validator 2 → Center */}
        <div className="gfx-line absolute top-[24%] right-[18%] w-[28%] h-px bg-gradient-to-l from-[var(--c-accent)]/40 to-[var(--c-accent)]/20 origin-right -rotate-[14deg]" />
        {/* Validator 3 → Center */}
        <div className="gfx-line absolute bottom-[28%] left-[12%] w-[32%] h-px bg-gradient-to-r from-[var(--c-accent)]/40 to-[var(--c-accent)]/20 origin-left -rotate-[16deg]" />
        {/* Center → Outcome */}
        <div className="gfx-line absolute top-[50%] left-[52%] w-[28%] h-px bg-gradient-to-r from-[var(--c-accent-2)]/50 to-[var(--c-accent-2)]/20 origin-left" />

        {/* ── Validator nodes ── */}
        <Node x="8%" y="18%" label="Validator" />
        <Node x="68%" y="12%" label="Validator" />
        <Node x="8%" y="72%" label="Validator" />

        {/* ── Aggregator (center) ── */}
        <div className="absolute left-[42%] top-[44%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
          {/* Pulse ring */}
          <div className="gfx-pulse absolute w-12 h-12 rounded-full bg-[var(--c-accent)]/20" />
          {/* Outer ring */}
          <div className="gfx-node w-12 h-12 rounded-full border border-[var(--c-accent)]/25 flex items-center justify-center">
            {/* Dashed ring */}
            <div className="absolute w-9 h-9 rounded-full border border-dashed border-[var(--c-accent)]/15" />
            {/* Core dot */}
            <div className="w-3 h-3 rounded-full bg-[var(--c-accent)]" />
          </div>
          <span className="gfx-label text-[10px] font-mono font-semibold text-[var(--c-text)] tracking-wide opacity-0">
            Aggregator
          </span>
          <span className="gfx-label text-[8px] font-mono text-[var(--c-text-dim)] -mt-1.5 opacity-0">
            CONSENSUS
          </span>
        </div>

        {/* ── Outcome box ── */}
        <div className="absolute right-[4%] top-[44%] -translate-y-1/2 flex flex-col items-center gap-1.5">
          <div className="gfx-node px-4 py-2 rounded-lg border border-[var(--c-accent-2)]/25 bg-[var(--c-accent-2)]/[0.04]">
            <span className="text-[9px] font-mono font-semibold text-[var(--c-accent-2)] tracking-wider">
              OUTCOME
            </span>
          </div>
          <span className="gfx-label text-[8px] font-mono text-[var(--c-text-dim)] opacity-0">
            SETTLEMENT
          </span>
        </div>

        {/* ── Phase label ── */}
        <div className="absolute top-[6%] left-1/2 -translate-x-1/2">
          <span className="gfx-label text-[8px] font-mono text-[var(--c-text-dim)] tracking-[0.1em] opacity-0">
            PARALLEL RESEARCH
          </span>
        </div>
      </div>
    </div>
  );
}

function Node({ x, y, label }: { x: string; y: string; label: string }) {
  return (
    <div className="absolute flex flex-col items-center gap-1.5" style={{ left: x, top: y }}>
      <div className="gfx-node flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border border-[var(--c-accent)]/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[var(--c-accent)]/70" />
        </div>
      </div>
      <span className="gfx-label text-[9px] font-mono text-[var(--c-text-secondary)] opacity-0">
        {label}
      </span>
    </div>
  );
}
