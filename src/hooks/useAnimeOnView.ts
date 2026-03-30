import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Reveals `.gsap-reveal` children when the container scrolls into view.
 * Uses GSAP ScrollTrigger — fires once, GPU-accelerated.
 */
export function useGsapReveal(
  ref: RefObject<HTMLElement | null>,
  options?: {
    stagger?: number;
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  },
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el.querySelectorAll(".gsap-reveal"), { opacity: 1, y: 0 });
      return;
    }

    const targets = el.querySelectorAll(".gsap-reveal");
    if (targets.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y: options?.y ?? 32,
        },
        {
          opacity: 1,
          y: 0,
          duration: options?.duration ?? 0.8,
          stagger: options?.stagger ?? 0.1,
          delay: options?.delay ?? 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: options?.start ?? "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [ref, options]);
}

// Keep old export name for compatibility
export { useGsapReveal as useAnimeOnView };
