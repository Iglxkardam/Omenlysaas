import { Helmet } from "react-helmet-async";

const SITE = "https://omenly.xyz";
const SITE_NAME = "Omenly";
const DEFAULT_IMAGE = `${SITE}/images/og-cover.png`;

interface SEOProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
}

export function SEO({
  title,
  description = "The trustless oracle layer for DeFi prediction markets. Decentralized settlement finality with BFT consensus and cryptographic attestation.",
  path = "/",
  image = DEFAULT_IMAGE,
}: SEOProps) {
  const pageTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Trustless Oracle Layer for Prediction Markets`;
  const url = `${SITE}${path}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO keywords via meta */}
      <meta
        name="keywords"
        content="prediction market oracle, DeFi settlement, trustless oracle, on-chain resolution, BFT consensus, market validation, crypto oracle infrastructure, decentralized oracle network, prediction market infrastructure, Omenly, cross-chain oracle, MEV resistant, settlement finality, cryptographic attestation"
      />
    </Helmet>
  );
}
