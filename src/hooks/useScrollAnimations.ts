import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global scroll-triggered animations.
 * Re-runs on route change so new page elements get animated.
 * Uses gsap.context() so only OUR triggers are killed on cleanup.
 */
export function useScrollAnimations() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(".gsap-reveal", { opacity: 1, y: 0 });
      return;
    }

    let ctx: gsap.Context;

    const raf = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        const reveals = gsap.utils.toArray<HTMLElement>(".gsap-reveal");
        reveals.forEach((el) => {
          gsap.fromTo(el,
            { opacity: 0, y: 32 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
          const speed = parseFloat(el.dataset.speed ?? "0.5");
          gsap.to(el, {
            y: () => (1 - speed) * ScrollTrigger.maxScroll(window) * 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf);
      ctx?.revert();
    };
  }, [pathname]);
}
