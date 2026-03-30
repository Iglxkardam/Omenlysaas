/** Landing page scroll-spy links */
export const LANDING_NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#pipeline" },
  { label: "Features", href: "#features" },
  { label: "Metrics", href: "#metrics" },
  { label: "Team", href: "#team" },
] as const;

/** Products dropdown items */
export const PRODUCT_LINKS = [
  {
    label: "Omenly Validator",
    href: "/validator",
    desc: "7-point quality screening for prediction markets",
    color: "emerald",
  },
  {
    label: "Omenly Resolver",
    href: "/resolver",
    desc: "Autonomous multi-agent outcome settlement",
    color: "blue",
  },
] as const;

/** Site-wide page navigation links */
export const PAGE_NAV_LINKS = [
  { label: "Products", href: "/validator", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
] as const;

/** @deprecated Use LANDING_NAV_LINKS or PAGE_NAV_LINKS */
export const NAV_LINKS = LANDING_NAV_LINKS;

/** Animation durations (seconds) */
export const ANIM = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  stagger: 0.08,
  viewportThreshold: 0.15,
} as const;

/** Breakpoints matching Tailwind defaults */
export const BP = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
