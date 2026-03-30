import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: number;
  reverse?: boolean;
  className?: string;
}

export function Marquee({ items, separator = "—", speed = 40, reverse = false, className = "" }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const content = track.querySelector(".marquee-content") as HTMLElement;
    if (!content) return;

    // Duplicate content for seamless loop
    const clone = content.cloneNode(true) as HTMLElement;
    track.appendChild(clone);

    const width = content.offsetWidth;
    const duration = width / speed;

    const tween = gsap.fromTo(track,
      { x: reverse ? -width : 0 },
      {
        x: reverse ? 0 : -width,
        duration,
        ease: "none",
        repeat: -1,
      },
    );

    return () => { tween.kill(); };
  }, [speed, reverse]);

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div ref={trackRef} className="inline-flex">
        <div className="marquee-content inline-flex items-center">
          {items.map((item, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="px-4 md:px-6 text-[clamp(0.85rem,1.5vw,1.1rem)] font-semibold tracking-[-0.01em]">
                {item}
              </span>
              <span className="text-[var(--c-text-dim)] text-[10px]">{separator}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
