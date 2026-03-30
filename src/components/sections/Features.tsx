import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LazyVideo } from "@/components/ui/LazyVideo";

gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { id: "intake", label: "Intake", sub: "Calldata parsing via oracle", x: 15, y: 15 },
  { id: "validate", label: "Validation", sub: "Deterministic integrity gate", x: 50, y: 15, accent: true },
  { id: "research", label: "Research", sub: "Cross-chain oracle feeds", x: 85, y: 15 },
  { id: "models", label: "Inference", sub: "Multi-model attestation", x: 15, y: 50 },
  { id: "consensus", label: "Consensus", sub: "BFT quorum convergence", x: 50, y: 50, accent: true },
  { id: "data", label: "Data Layer", sub: "Real-time DEX oracles", x: 85, y: 50 },
  { id: "security", label: "Security", sub: "MEV-resistant execution", x: 15, y: 85 },
  { id: "settle", label: "Settlement", sub: "Sub-15s block finality", x: 50, y: 85, accent: true },
  { id: "audit", label: "Audit Trail", sub: "Immutable evidence hash", x: 85, y: 85 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [3, 4], [5, 4], [6, 7], [7, 8],
  [0, 3], [1, 4], [2, 5], [3, 6], [4, 7], [5, 8],
];

export function Features() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el.querySelectorAll(".fn, .fe"), { opacity: 1 });
      return;
    }

    gsap.set(el.querySelectorAll(".fn"), { opacity: 0, scale: 0.5 });
    gsap.set(el.querySelectorAll(".fe"), { opacity: 0 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el.querySelector(".feat-diagram"), start: "top 75%", toggleActions: "play none none reverse" },
      });

      // Edges fade in with stagger
      tl.to(".fe", { opacity: 1, duration: 0.8, stagger: 0.04, ease: "power2.out" }, 0);

      // Nodes scale + fade in with bounce
      tl.to(".fn", { opacity: 1, scale: 1, duration: 0.6, stagger: 0.07, ease: "back.out(2)" }, 0.3);

      // After entrance — nodes float continuously
      el.querySelectorAll<SVGGElement>(".fn").forEach((node, i) => {
        gsap.to(node, {
          y: `+=${4 + (i % 3) * 2}`,
          duration: 2.5 + (i % 4) * 0.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: i * 0.3,
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="features" className="relative py-20 md:py-28 overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <LazyVideo src="/videos/features-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-[var(--c-bg)]/65" />
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8">
        <SectionHeading
          tag="Protocol Architecture"
          title="Engineered for trustless execution"
          description="Every module built for deterministic finality, Byzantine fault tolerance, and verifiable on-chain state transitions."
        />

        {/* Diagram */}
        <div className="feat-diagram relative w-full" style={{ aspectRatio: "2.3/1" }}>
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 420" fill="none" preserveAspectRatio="xMidYMid meet">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="glow-lg">
                <feGaussianBlur stdDeviation="10" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="var(--c-accent)" stopOpacity="0.12" />
                <stop offset="100%" stopColor="var(--c-accent)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient floating particles */}
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={`ap-${i}`} r={1 + Math.random() * 1.5} fill="var(--c-accent)" fillOpacity={0.1 + Math.random() * 0.2}>
                <animateMotion
                  dur={`${8 + Math.random() * 12}s`}
                  repeatCount="indefinite"
                  begin={`${Math.random() * 5}s`}
                  path={`M${Math.random() * 1000},${Math.random() * 420} Q${Math.random() * 1000},${Math.random() * 420} ${Math.random() * 1000},${Math.random() * 420}`}
                />
                <animate attributeName="fill-opacity" values={`${0.05};${0.25};${0.05}`} dur={`${3 + Math.random() * 4}s`} repeatCount="indefinite" />
              </circle>
            ))}

            {/* Edges with animated dashes + traveling pulses */}
            {EDGES.map(([a, b], i) => {
              const x1 = NODES[a].x * 10;
              const y1 = NODES[a].y * 4.4;
              const x2 = NODES[b].x * 10;
              const y2 = NODES[b].y * 4.4;
              const pathD = `M${x1},${y1} L${x2},${y2}`;

              return (
                <g key={`e-${i}`} className="fe">
                  {/* Static base line */}
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--c-accent)" strokeWidth="1" strokeOpacity="0.08" />

                  {/* Animated dashed overlay */}
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--c-accent)" strokeWidth="0.5" strokeOpacity="0.25" strokeDasharray="4 8">
                    <animate attributeName="stroke-dashoffset" values="0;-24" dur="1.5s" repeatCount="indefinite" />
                  </line>

                  {/* Traveling pulse 1 */}
                  <circle r="2.5" fill="var(--c-accent)" filter="url(#glow)" opacity="0.8">
                    <animateMotion dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" begin={`${i * 0.12}s`}>
                      <mpath xlinkHref={`#ep-${i}`} />
                    </animateMotion>
                    <animate attributeName="r" values="1.5;3;1.5" dur={`${1.8 + i * 0.2}s`} repeatCount="indefinite" />
                  </circle>

                  {/* Traveling pulse 2 — offset */}
                  <circle r="1.5" fill="var(--c-accent)" opacity="0.4">
                    <animateMotion dur={`${2.4 + i * 0.15}s`} repeatCount="indefinite" begin={`${0.8 + i * 0.1}s`}>
                      <mpath xlinkHref={`#ep-${i}`} />
                    </animateMotion>
                  </circle>

                  <path id={`ep-${i}`} d={pathD} fill="none" />
                </g>
              );
            })}

            {/* Nodes */}
            {NODES.map((n, i) => {
              const cx = n.x * 10;
              const cy = n.y * 4.4;
              const isAccent = !!n.accent;

              return (
                <g key={n.id} className="fn" style={{ transformOrigin: `${cx}px ${cy}px` }}>
                  {/* Ambient glow behind accent nodes */}
                  {isAccent && (
                    <>
                      <circle cx={cx} cy={cy} r="65" fill="url(#nodeGlow)">
                        <animate attributeName="r" values="60;70;60" dur="4s" repeatCount="indefinite" begin={`${i * 0.5}s`} />
                      </circle>
                      <circle cx={cx} cy={cy} r="50" fill="none" stroke="var(--c-accent)" strokeWidth="0.4" strokeOpacity="0.15" strokeDasharray="3 6">
                        <animateTransform attributeName="transform" type="rotate" values={`0 ${cx} ${cy};360 ${cx} ${cy}`} dur="30s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}

                  {/* Card */}
                  <rect
                    x={cx - 80} y={cy - 36} width="160" height="72" rx="12"
                    fill={isAccent ? "rgba(79,143,255,0.08)" : "rgba(12,13,18,0.92)"}
                    stroke={isAccent ? "rgba(79,143,255,0.35)" : "rgba(45,48,58,0.7)"}
                    strokeWidth="1.2"
                  />

                  {/* Top accent bar */}
                  <rect x={cx - 80} y={cy - 36} width="160" height="2" rx="1" fill={isAccent ? "var(--c-accent)" : "rgba(79,143,255,0.15)"} fillOpacity={isAccent ? "0.6" : "0.3"} />

                  {/* Label — big & bold */}
                  <text x={cx} y={cy - 1} textAnchor="middle" fill={isAccent ? "#ffffff" : "#edeef0"} fontSize="16" fontWeight="800" fontFamily="var(--font-heading)" letterSpacing="-0.3">
                    {n.label}
                  </text>

                  {/* Sub — lighter, smaller */}
                  <text x={cx} y={cy + 17} textAnchor="middle" fill="#6b7080" fontSize="10" fontWeight="400" fontFamily="var(--font-sans)">
                    {n.sub}
                  </text>

                  {/* Status dot — pulsing */}
                  <circle cx={cx + 64} cy={cy - 24} r="3" fill={isAccent ? "var(--c-accent)" : "#22c55e"} fillOpacity="0.8">
                    <animate attributeName="r" values="2;3.5;2" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                    <animate attributeName="fill-opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" begin={`${i * 0.2}s`} />
                  </circle>

                  {/* Port dots */}
                  {[
                    [cx, cy - 36],
                    [cx, cy + 36],
                    [cx - 80, cy],
                    [cx + 80, cy],
                  ].map(([px, py], pi) => (
                    <circle key={pi} cx={px} cy={py} r="2" fill="var(--c-accent)" fillOpacity="0.3">
                      <animate attributeName="fill-opacity" values="0.2;0.5;0.2" dur="2.5s" repeatCount="indefinite" begin={`${pi * 0.3}s`} />
                    </circle>
                  ))}
                </g>
              );
            })}

            {/* Row labels */}
            {[
              { label: "INTAKE", y: NODES[0].y },
              { label: "PROCESS", y: NODES[3].y },
              { label: "OUTPUT", y: NODES[6].y },
            ].map((r) => (
              <text
                key={r.label}
                x="25"
                y={r.y * 4.4}
                textAnchor="middle"
                fill="var(--c-text-dim)"
                fontSize="7"
                fontFamily="var(--font-mono)"
                letterSpacing="3"
                transform={`rotate(-90, 25, ${r.y * 4.4})`}
              >
                {r.label}
              </text>
            ))}

            {/* Arrow indicators on edges */}
            {EDGES.map(([a, b], i) => {
              const x1 = NODES[a].x * 10;
              const y1 = NODES[a].y * 4.4;
              const x2 = NODES[b].x * 10;
              const y2 = NODES[b].y * 4.4;
              const mx = (x1 + x2) / 2;
              const my = (y1 + y2) / 2;
              const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

              return (
                <g key={`arr-${i}`} className="fe" transform={`translate(${mx},${my}) rotate(${angle})`}>
                  <polygon points="-4,-3 4,0 -4,3" fill="var(--c-accent)" fillOpacity="0.3" />
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </section>
  );
}
