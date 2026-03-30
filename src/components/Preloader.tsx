import { useEffect, useState, useRef, useCallback } from "react";

const CRITICAL_ASSETS = [
  "/images/validator.png",
  "/images/resolver.png",
  "/images/pricing.png",
  "/images/terminal.png",
  "/images/error.png",
  "/videos/hero-bg.mp4",
];

function preloadAsset(src: string): Promise<void> {
  return new Promise((resolve) => {
    if (src.endsWith(".mp4")) {
      const v = document.createElement("video");
      v.preload = "auto";
      v.muted = true;
      const done = () => resolve();
      v.oncanplaythrough = done;
      v.onerror = done;
      setTimeout(done, 10000);
      v.src = src;
    } else {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve();
      img.src = src;
    }
  });
}

export function Preloader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<"loading" | "exiting" | "done">("loading");
  const [displayNum, setDisplayNum] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);

  // Smooth number counter animation
  const animateCounter = useCallback(() => {
    const animate = () => {
      setDisplayNum((prev) => {
        const target = targetRef.current;
        if (prev >= target) return target;
        const diff = target - prev;
        const step = Math.max(1, Math.ceil(diff * 0.12));
        return Math.min(prev + step, target);
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animateCounter();

    const total = CRITICAL_ASSETS.length;
    let loaded = 0;
    const start = Date.now();

    const promises = CRITICAL_ASSETS.map((src) =>
      preloadAsset(src).then(() => {
        loaded++;
        targetRef.current = Math.round((loaded / total) * 100);
      }),
    );

    Promise.all(promises).then(() => {
      targetRef.current = 100;
      // Min 2s so the counter animation looks good
      const elapsed = Date.now() - start;
      const wait = Math.max(0, 2000 - elapsed);
      setTimeout(() => {
        cancelAnimationFrame(rafRef.current);
        setDisplayNum(100);
        // Start exit
        setTimeout(() => setPhase("exiting"), 400);
        setTimeout(() => setPhase("done"), 1200);
      }, wait);
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [animateCounter]);

  // Once done, just render children — no wrapper div
  if (phase === "done") return <>{children}</>;

  return (
    <>
      {/* ── Preloader screen ── */}
      <div
        className={`fixed inset-0 z-[9999] transition-all duration-700 ease-out ${
          phase === "exiting"
            ? "opacity-0 scale-[1.02]"
            : "opacity-100 scale-100"
        }`}
      >
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/images/error.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#06070a]/70 via-[#06070a]/60 to-[#06070a]/80" />
        </div>

        {/* Dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #4f8fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center">

          {/* Logo */}
          <div className="relative mb-10">
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
              <path
                d="M8 16c0 0 4-6 8-6s8 6 8 6-4 6-8 6-8-6-8-6z"
                stroke="#4f8fff"
                strokeWidth="1.3"
                fill="#4f8fff"
                fillOpacity="0.08"
              />
              <circle cx="16" cy="16" r="3.5" fill="none" stroke="#4f8fff" strokeWidth="1" opacity="0.5" />
              <circle cx="16" cy="16" r="1.5" fill="#4f8fff" />
            </svg>
            {/* Glow behind logo */}
            <div className="absolute -inset-8 rounded-full bg-[#4f8fff]/[0.06] blur-[40px] pointer-events-none" />
          </div>

          {/* Counter number — big */}
          <div className="relative mb-6">
            <span
              className="text-[clamp(4rem,12vw,7rem)] font-extrabold tracking-[-0.06em] leading-none tabular-nums"
              style={{
                background: "linear-gradient(135deg, #4f8fff 0%, #8b9cf7 50%, #4f8fff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {displayNum}
            </span>
            <span
              className="absolute -right-6 top-2 text-[clamp(1rem,3vw,1.5rem)] font-bold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #4f8fff, #8b9cf7)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              %
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-56 h-[1.5px] bg-white/[0.06] rounded-full overflow-hidden mb-5">
            <div
              className="h-full rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${displayNum}%`,
                background: "linear-gradient(90deg, #4f8fff, #8b9cf7)",
              }}
            />
          </div>

          {/* Status text */}
          <span className="text-[10px] font-mono text-white/15 tracking-[0.25em] uppercase">
            {displayNum < 30
              ? "Initializing oracle"
              : displayNum < 70
                ? "Loading protocol"
                : displayNum < 100
                  ? "Finalizing assets"
                  : "Ready"}
          </span>
        </div>

        {/* Bottom brand */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center">
          <span className="text-[11px] font-semibold tracking-[-0.02em] text-white/10">
            Omenly
          </span>
        </div>
      </div>

      {/* Children pre-render hidden so React mounts them early */}
      {phase === "loading" && (
        <div className="fixed inset-0 opacity-0 pointer-events-none overflow-hidden" aria-hidden="true">
          {children}
        </div>
      )}
    </>
  );
}
