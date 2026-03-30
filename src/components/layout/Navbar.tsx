import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ChevronDown, ShieldCheck, Zap } from "lucide-react";
import { useLocation, Link } from "react-router-dom";
import { OmenlyLogo } from "@/components/icons/OmenlyLogo";
import { Button } from "@/components/ui/Button";
import { PAGE_NAV_LINKS, PRODUCT_LINKS } from "@/lib/constants";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleDropdownEnter = () => {
    clearTimeout(timeoutRef.current);
    setProductsOpen(true);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => setProductsOpen(false), 150);
  };

  const isProductPage = pathname === "/validator" || pathname === "/resolver";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--c-bg)]/85 backdrop-blur-2xl border-b border-[var(--c-border)]/50"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-[1120px] mx-auto px-6 lg:px-8 h-[60px] flex items-center justify-between gap-8">
        <Link to="/" className="shrink-0">
          <OmenlyLogo size={24} />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {PAGE_NAV_LINKS.map((link) => {
            const isProducts = "hasDropdown" in link && link.hasDropdown;
            const active = isProducts
              ? isProductPage
              : pathname === link.href;

            if (isProducts) {
              return (
                <li key="products" className="relative">
                  <div
                    ref={dropdownRef}
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      className={`relative flex items-center gap-1 px-3.5 py-2 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                        active || productsOpen
                          ? "text-[var(--c-text)]"
                          : "text-[var(--c-text-muted)] hover:text-[var(--c-text-secondary)]"
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                      />
                      {(active || productsOpen) && (
                        <motion.div
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-lg bg-white/[0.06] ring-1 ring-white/[0.08]"
                          style={{ zIndex: -1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                    </button>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {productsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-2.5 rounded-2xl border border-white/[0.08] bg-[#0a0b10] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.7)] overflow-hidden"
                        >
                          <div className="flex">
                            {/* Validator */}
                            <Link
                              to="/validator"
                              className="group relative w-[220px] p-4 transition-colors duration-200 hover:bg-white/[0.03] border-r border-white/[0.06]"
                            >
                              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 ring-1 ring-emerald-500/15">
                                <img
                                  src="/images/validator.png"
                                  alt="Validator"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <div className="text-[13px] font-semibold text-white mb-1 group-hover:text-emerald-300 transition-colors">
                                Validator
                              </div>
                              <div className="text-[11px] text-zinc-500 leading-relaxed">
                                Quality screening & market integrity gate
                              </div>
                            </Link>

                            {/* Resolver */}
                            <Link
                              to="/resolver"
                              className="group relative w-[220px] p-4 transition-colors duration-200 hover:bg-white/[0.03]"
                            >
                              <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-3 ring-1 ring-blue-500/15">
                                <img
                                  src="/images/resolver.png"
                                  alt="Resolver"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              </div>
                              <div className="text-[13px] font-semibold text-white mb-1 group-hover:text-blue-300 transition-colors">
                                Resolver
                              </div>
                              <div className="text-[11px] text-zinc-500 leading-relaxed">
                                Multi-agent consensus & settlement engine
                              </div>
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              );
            }

            return (
              <li key={link.href}>
                <Link
                  to={link.href}
                  className={`relative px-3.5 py-2 rounded-lg text-[13px] font-medium transition-colors duration-200 ${
                    active ? "text-[var(--c-text)]" : "text-[var(--c-text-muted)] hover:text-[var(--c-text-secondary)]"
                  }`}
                >
                  {link.label}
                  {active && !isProductPage && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-white/[0.06] ring-1 ring-white/[0.08]"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-2.5">
          <Button to="/pricing" className="text-[12.5px]">Request a Demo</Button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-1.5 rounded-md text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors"
          aria-label={mobileOpen ? "Close" : "Menu"}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-[var(--c-bg)]/98 backdrop-blur-2xl border-b border-[var(--c-border)]"
          >
            <div className="px-6 pb-5 pt-1">
              <ul className="flex flex-col gap-0.5 mb-3">
                {/* Products accordion */}
                <li>
                  <button
                    onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-[13px] text-[var(--c-text-muted)] hover:text-[var(--c-text)] transition-colors"
                  >
                    Products
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${mobileProductsOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileProductsOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pb-1 flex flex-col gap-0.5">
                          {PRODUCT_LINKS.map((p) => (
                            <Link
                              key={p.href}
                              to={p.href}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[13px] text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-white/[0.04] transition-colors"
                            >
                              <div className={`p-1.5 rounded-md border ${
                                p.color === "emerald"
                                  ? "border-emerald-500/20 bg-emerald-500/[0.08] text-emerald-400"
                                  : "border-blue-500/20 bg-blue-500/[0.08] text-blue-400"
                              }`}>
                                {p.color === "emerald" ? <ShieldCheck size={13} /> : <Zap size={13} />}
                              </div>
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>

                {PAGE_NAV_LINKS.filter((l) => !("hasDropdown" in l && l.hasDropdown)).map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="w-full block text-left px-3 py-2.5 rounded-md text-[13px] text-[var(--c-text-muted)] hover:text-[var(--c-text)] hover:bg-white/[0.04] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
                <Button variant="secondary" to="/pricing">Request Access</Button>
                <Button to="/pricing">Request a Demo</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
