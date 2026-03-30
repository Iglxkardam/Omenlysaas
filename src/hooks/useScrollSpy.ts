import { useEffect, useState } from "react";

/**
 * Tracks which section ID is currently in the viewport.
 * Uses IntersectionObserver — no scroll-event spam.
 */
export function useScrollSpy(ids: readonly string[], offset = 100): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: `-${offset}px 0px -40% 0px`, threshold: 0 },
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
