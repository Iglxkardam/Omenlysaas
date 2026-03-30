import { SEO } from "@/components/SEO";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Pipeline } from "@/components/sections/Pipeline";
import { Features } from "@/components/sections/Features";
import { CTA } from "@/components/sections/CTA";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { Marquee } from "@/components/ui/Marquee";
import { useScrollAnimations } from "@/hooks/useScrollAnimations";

const TICKER_WORDS = [
  "Decentralized Oracle Network",
  "On-Chain Settlement Finality",
  "Zero-Knowledge Verification",
  "Multi-Agent BFT Consensus",
  "Trustless Market Resolution",
  "Permissionless Infrastructure",
  "Cryptographic Attestation",
  "MEV-Resistant Architecture",
];

const TICKER_WORDS_2 = [
  "Binary & Multi-Leg Markets",
  "Cross-Chain Data Feeds",
  "Sub-15s Block Finality",
  "8+ Oracle Data Sources",
  "Sybil-Resistant Screening",
  "Front-Running Detection",
  "Immutable Audit Trails",
  "Byzantine Fault Tolerance",
];

export default function LandingPage() {
  useScrollAnimations();

  return (
    <>
      <SEO
        path="/"
        description="Omenly is the trustless oracle layer for DeFi prediction markets. Decentralized market validation and autonomous settlement finality with BFT multi-agent consensus, cross-chain oracle feeds, and immutable on-chain evidence anchoring. Sub-15s resolution."
      />
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>

      <div className="relative py-5 border-y border-white/[0.04] overflow-hidden">
        <Marquee items={TICKER_WORDS} className="text-[var(--c-text-muted)]" speed={35} />
      </div>

      <ErrorBoundary>
        <Services />
      </ErrorBoundary>

      <div className="relative py-5 border-y border-white/[0.04] overflow-hidden">
        <Marquee items={TICKER_WORDS_2} className="text-[var(--c-accent)]/40" speed={30} reverse />
      </div>

      <ErrorBoundary>
        <Pipeline />
      </ErrorBoundary>

      <ErrorBoundary>
        <Features />
      </ErrorBoundary>

      <ErrorBoundary>
        <CTA />
      </ErrorBoundary>
    </>
  );
}
