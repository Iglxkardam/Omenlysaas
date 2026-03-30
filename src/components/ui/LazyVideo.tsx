import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  eager?: boolean;
}

/**
 * Video that only loads & plays when scrolled into view.
 * Pauses when out of view to save resources.
 */
export function LazyVideo({ src, className = "", eager = false }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(eager);

  useEffect(() => {
    if (eager) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eager]);

  return (
    <video
      ref={ref}
      autoPlay={eager}
      muted
      loop
      playsInline
      preload={eager ? "auto" : "none"}
      className={className}
    >
      {visible && <source src={src} type="video/mp4" />}
    </video>
  );
}
