import { Link } from "react-router-dom";
import { OmenlyLogo } from "@/components/icons/OmenlyLogo";
import { LazyVideo } from "@/components/ui/LazyVideo";

const PRODUCT = [
  { label: "Validator", to: "/validator" },
  { label: "Resolver", to: "/resolver" },
  { label: "Pricing", to: "/pricing" },
];

const COMPANY = [
  { label: "Request Access", to: "/pricing" },
  { label: "Contact", to: "/pricing" },
];

const SOCIALS = [
  {
    label: "X (Twitter)",
    href: "https://x.com/Jhod869800",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/omenly",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:sachinkardam5581@gmail.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--c-border)] overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <LazyVideo src="/videos/footer-bg.mp4" className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-[var(--c-bg)]/80" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-6 lg:px-8">

        {/* ── Top CTA strip ── */}
        <div className="py-10 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-[var(--c-border)]">
          <div>
            <h3 className="text-[clamp(1rem,2vw,1.25rem)] font-bold tracking-[-0.02em] text-[var(--c-text)]">
              Ready to deploy trustless settlement?
            </h3>
            <p className="text-[13px] text-[var(--c-text-muted)] mt-1">
              One oracle endpoint away from on-chain settlement finality.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/pricing"
              className="px-5 py-2.5 rounded-lg text-[13px] font-semibold text-white bg-gradient-to-r from-[var(--c-accent)] to-[var(--c-accent-2)] hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
            <Link
              to="/resolver"
              className="px-5 py-2.5 rounded-lg text-[13px] font-medium text-[var(--c-text-secondary)] border border-[var(--c-border)] hover:border-[var(--c-border-hover)] hover:text-[var(--c-text)] transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* ── Main grid ── */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-10 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="col-span-2 md:col-span-5">
            <Link to="/">
              <OmenlyLogo size={22} className="mb-5" />
            </Link>
            <p className="text-[12.5px] text-[var(--c-text-muted)] max-w-[280px] leading-[1.75] mb-6">
              The trustless oracle layer for DeFi prediction markets. Decentralized resolution and on-chain validation with cryptographic attestation.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={s.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  title={s.label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.03] border border-[var(--c-border)] text-[var(--c-text-muted)] hover:text-[var(--c-accent)] hover:border-[var(--c-accent)]/30 hover:bg-[var(--c-accent-muted)] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div className="col-span-1 md:col-span-2 md:col-start-7">
            <h4 className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--c-text-dim)] mb-4">Product</h4>
            <ul className="flex flex-col gap-2.5">
              {PRODUCT.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[12.5px] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-[10px] font-semibold tracking-[0.14em] uppercase text-[var(--c-text-dim)] mb-4">Company</h4>
            <ul className="flex flex-col gap-2.5">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-[12.5px] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors duration-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="py-5 border-t border-[var(--c-border)] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-[11px] text-[var(--c-text-dim)]">
            &copy; {new Date().getFullYear()} Omenly. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-[var(--c-text-dim)]">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  );
}
