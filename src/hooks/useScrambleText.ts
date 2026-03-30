import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * Scramble-reveal text effect. Characters resolve from random to final
 * in random order (not left-to-right) for a more organic feel.
 */
export function useScrambleText(
  trigger: boolean | "scroll" = "scroll",
  speed = 1,
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const finalText = el.dataset.scramble || el.textContent || "";
    const len = finalText.length;
    if (len === 0) return;

    const duration = Math.max(0.8, len * 0.035) * speed;

    // Build a random resolve order (which char index resolves at what progress)
    const order = Array.from({ length: len }, (_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }

    // Pre-generate scramble chars so they don't flicker every frame
    const scrambleChars = Array.from({ length: len }, () =>
      CHARS[Math.floor(Math.random() * CHARS.length)]
    );

    // Keep text as-is until animation starts
    const resolved = new Array(len).fill(false);

    const obj = { progress: 0 };

    const onStart = () => {
      // Cycle scramble chars periodically (not every frame)
      cycleInterval = setInterval(() => {
        for (let i = 0; i < len; i++) {
          if (!resolved[i]) {
            scrambleChars[i] = CHARS[Math.floor(Math.random() * CHARS.length)];
          }
        }
      }, 60);
    };

    let cycleInterval: ReturnType<typeof setInterval>;

    const tween = gsap.to(obj, {
      progress: 1,
      duration,
      ease: "none",
      onStart,
      onUpdate() {
        const p = obj.progress;
        const numResolved = Math.floor(p * len);

        // Mark characters as resolved based on shuffle order
        for (let i = 0; i < numResolved; i++) {
          resolved[order[i]] = true;
        }

        let out = "";
        for (let i = 0; i < len; i++) {
          if (resolved[i]) {
            out += finalText[i];
          } else if (finalText[i] === " ") {
            out += " ";
          } else {
            out += scrambleChars[i];
          }
        }
        el.textContent = out;
      },
      onComplete() {
        el.textContent = finalText;
        clearInterval(cycleInterval);
      },
      paused: trigger === "scroll",
      scrollTrigger: trigger === "scroll" ? {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      } : undefined,
    });

    return () => {
      tween.kill();
      clearInterval(cycleInterval);
    };
  }, [trigger, speed]);

  return ref;
}
