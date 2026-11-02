import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

type RiseProps = {
  /** Pixels the block sits below its resting spot when it first enters the viewport. */
  from?: number;
  /** Pixels it drifts past its resting spot as it leaves (negative = upward). */
  exit?: number;
  /** Degrees of tilt on entry; it settles flat and leans the other way, slightly, on exit. */
  tilt?: number;
  as?: "div" | "li";
  className?: string;
  children: ReactNode;
};

const stops = [0, 0.42, 1];

/**
 * Scroll-scrubbed parallax: the block rides the scroll position instead of firing once.
 * Give siblings different `from`/`exit` values and they land in a staircase and leave at their own pace.
 * Position only (no opacity gate); without JS or with reduced motion it simply sits at rest.
 */
export function Rise({ from = 48, exit = -20, tilt = 0, as = "div", className, children }: RiseProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const y = useTransform(p, stops, [from, 0, exit]);
  const rotate = useTransform(p, stops, [tilt, 0, -tilt * 0.5]);

  const Tag = motion[as];
  return (
    <Tag ref={ref as never} style={mounted && !reduced ? { y, rotate } : undefined} className={className}>
      {children}
    </Tag>
  );
}

/** Staircase offsets for the nth sibling in a row: later ones start lower and drift further. */
export const stair = (i: number, base = 56, step = 36) => ({
  from: base + i * step,
  exit: -(10 + i * 8),
  tilt: i % 2 ? 1.2 : -1.2,
});
