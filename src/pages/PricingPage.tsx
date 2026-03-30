import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { LazyVideo } from "@/components/ui/LazyVideo";
import { Button } from "@/components/ui/Button";
import { SEO } from "@/components/SEO";

export default function PricingPage() {
  const [form, setForm] = useState({ name: "", email: "", protocol: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".p-anim", { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out", delay: 0.15,
      });
    });
    return () => ctx.revert();
  }, []);

  // Animate success state
  useEffect(() => {
    if (!submitted || !successRef.current) return;
    const el = successRef.current;
    const ctx = gsap.context(() => {
      gsap.fromTo(el, { opacity: 0, scale: 0.9 }, {
        opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)",
      });
      const path = el.querySelector(".tick-path") as SVGPathElement | null;
      if (path) {
        const len = path.getTotalLength();
        gsap.fromTo(path, { strokeDasharray: len, strokeDashoffset: len }, {
          strokeDashoffset: 0, duration: 0.6, ease: "power2.out", delay: 0.3,
        });
      }
      gsap.fromTo(el.querySelector(".tick-ring"), { scale: 0.8, opacity: 0 }, {
        scale: 1, opacity: 1, duration: 0.4, ease: "power3.out", delay: 0.1,
      });
    }, el);
    return () => ctx.revert();
  }, [submitted]);

  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      await fetch("https://formspree.io/f/xbdpooyp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setSubmitted(true);
    } catch {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title="Pricing — Oracle Integration for DeFi Protocols"
        description="Integrate the Omenly oracle layer into your prediction market protocol. Custom integration architecture, cross-chain settlement configuration, and dedicated oracle endpoints. Free devnet tier available."
        path="/pricing"
      />
      {/* ══════ HERO ══════ */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/cta.mp4" className="absolute inset-0 w-full h-full object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--c-bg)]/80 via-[var(--c-bg)]/60 to-[var(--c-bg)]" />
        </div>

        <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8 text-center">
          <h1 className="p-anim text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-[var(--c-text)] mb-5 leading-[1.1]">
            Integrate the oracle layer
            <span className="block text-[var(--c-accent)]">into your protocol</span>
          </h1>
          <p className="p-anim text-[15px] text-[var(--c-text-secondary)] leading-[1.8] max-w-[520px] mx-auto">
            We&apos;re onboarding select DeFi prediction market protocols for early mainnet access.
            Share your protocol specs and we&apos;ll architect a custom integration within 24 hours.
          </p>
        </div>
      </section>

      {/* ══════ FORM + IMAGE ══════ */}
      <section className="relative pb-28 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <LazyVideo src="/videos/footer-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-[var(--c-bg)]/80" />
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[var(--c-bg)] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--c-bg)] to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1060px] mx-auto px-6 lg:px-8">
          <div className="p-anim relative rounded-2xl p-[1px] bg-gradient-to-br from-white/[0.08] via-[var(--c-accent)]/10 to-white/[0.04] shadow-[0_0_80px_-20px_rgba(79,143,255,0.1)]">
            <div className="rounded-2xl bg-[#0a0c10] overflow-hidden">
              <div className="grid md:grid-cols-[1fr_1.1fr]">
                {/* Left — Image + Steps */}
                <div className="relative p-8 md:p-10 flex flex-col justify-between">
                  {/* Image with radial fade — no rectangle feel */}
                  <div className="relative mb-8 flex justify-center">
                    <div className="absolute inset-0 bg-[var(--c-accent)]/[0.03] rounded-full blur-[60px]" />
                    <div
                      className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px]"
                      style={{
                        maskImage: "radial-gradient(circle, black 40%, transparent 72%)",
                        WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 72%)",
                      }}
                    >
                      <img src="/images/pricing.png" alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>

                  {/* Steps */}
                  <div className="flex flex-col gap-6">
                    <Step n={1} title="Submit your protocol specs" desc="Share your market type, expected TVL, and chain deployment." />
                    <Step n={2} title="Receive integration architecture" desc="Custom oracle endpoint configuration and settlement parameters." />
                    <Step n={3} title="Deploy to mainnet" desc="Integrate via oracle REST endpoint. We handle the infra layer." />
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/[0.06]">
                    <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-zinc-500 mb-3">Contact Us</p>
                    <div className="flex items-center gap-4">
                      {/* Email */}
                      <a href="mailto:sachinkardam5581@gmail.com" className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all" title="Email">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" />
                        </svg>
                      </a>
                      {/* X (Twitter) */}
                      <a href="https://x.com/Jhod869800" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all" title="X (Twitter)">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                      {/* LinkedIn */}
                      <a href="https://linkedin.com/company/omenly" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] text-zinc-400 hover:text-white hover:border-white/[0.12] transition-all" title="LinkedIn">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right — Form or Success */}
                <div className="p-8 md:p-10 border-l border-white/[0.04]">
                  {submitted ? (
                    <div ref={successRef} className="flex flex-col items-center justify-center h-full text-center py-16">
                      {/* Animated tick */}
                      <div className="relative mb-6">
                        <div className="tick-ring w-20 h-20 rounded-full border-2 border-[var(--c-accent)]/30 flex items-center justify-center">
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                            <path
                              className="tick-path"
                              d="M8 16l6 6L24 10"
                              stroke="var(--c-accent)"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />
                          </svg>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-[var(--c-accent)]/10 animate-ping" style={{ animationDuration: "2s" }} />
                      </div>
                      <h3 className="text-[20px] font-bold text-white mb-3">Integration request submitted</h3>
                      <p className="text-[13px] text-zinc-400 max-w-[280px] leading-[1.7]">
                        We&apos;ll review your protocol specs and return a custom oracle integration architecture within 24 hours.
                      </p>
                      <p className="text-[12px] text-zinc-500 mt-6">
                        Check your inbox for a confirmation email.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full justify-center">
                      <h2 className="text-[18px] font-bold text-white mb-2">Request mainnet access</h2>

                      <div>
                        <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 tracking-wide uppercase">Your Name</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-white placeholder-zinc-600 outline-none focus:border-[var(--c-accent)]/40 focus:ring-1 focus:ring-[var(--c-accent)]/20 transition-all"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 tracking-wide uppercase">Email</label>
                        <input
                          type="email"
                          required
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-white placeholder-zinc-600 outline-none focus:border-[var(--c-accent)]/40 focus:ring-1 focus:ring-[var(--c-accent)]/20 transition-all"
                          placeholder="you@protocol.xyz"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 tracking-wide uppercase">Protocol / Company</label>
                        <input
                          type="text"
                          value={form.protocol}
                          onChange={(e) => setForm({ ...form, protocol: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-white placeholder-zinc-600 outline-none focus:border-[var(--c-accent)]/40 focus:ring-1 focus:ring-[var(--c-accent)]/20 transition-all"
                          placeholder="e.g. Polymarket, Azuro, Custom DEX"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-medium text-zinc-400 mb-1.5 tracking-wide uppercase">Integration details</label>
                        <textarea
                          required
                          rows={3}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                          className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-[13px] text-white placeholder-zinc-600 outline-none focus:border-[var(--c-accent)]/40 focus:ring-1 focus:ring-[var(--c-accent)]/20 transition-all resize-none"
                          placeholder="Expected TVL, market types, chain deployment, settlement requirements..."
                        />
                      </div>

                      <Button type="submit" className="w-full mt-2" disabled={sending}>
                        {sending ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Request Access
                            <ArrowRight size={14} />
                          </>
                        )}
                      </Button>

                      <p className="text-[10px] text-zinc-600 text-center mt-1">
                        We&apos;ll never share your info. No spam, ever.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Step ── */
function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div className="flex gap-3.5">
      <div className="relative flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-[var(--c-accent)]/10 border border-[var(--c-accent)]/20 flex items-center justify-center shrink-0">
          <span className="text-[12px] font-bold text-[var(--c-accent)] font-[family-name:var(--font-mono)]">{n}</span>
        </div>
        {n < 3 && <div className="w-px flex-1 mt-1.5 bg-gradient-to-b from-[var(--c-accent)]/15 to-transparent" />}
      </div>
      <div className="pb-1">
        <div className="text-[13px] font-semibold text-white mb-0.5">{title}</div>
        <div className="text-[11px] text-zinc-500 leading-[1.6]">{desc}</div>
      </div>
    </div>
  );
}
