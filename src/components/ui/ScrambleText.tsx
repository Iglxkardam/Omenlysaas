import { useScrambleText } from "@/hooks/useScrambleText";

interface ScrambleTextProps {
  text: string;
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  trigger?: boolean | "scroll";
  speed?: number;
}

export function ScrambleText({ text, as: Tag = "span", className = "", trigger = "scroll", speed = 1 }: ScrambleTextProps) {
  const ref = useScrambleText(trigger, speed);

  return (
    // @ts-expect-error — dynamic tag
    <Tag ref={ref} className={className} data-scramble={text}>
      {text}
    </Tag>
  );
}
