import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let lenis: Lenis | null = null;

export const getLenis = () => lenis;

export const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Lenis smooth scrolling driven by GSAP's ticker, so ScrollTrigger and Lenis share one clock.
 * Skipped entirely when the visitor prefers reduced motion.
 */
export function initSmoothScroll(): () => void {
  gsap.registerPlugin(ScrollTrigger);
  if (prefersReducedMotion()) return () => {};

  lenis = new Lenis({
    lerp: 0.1,
    // Sticky header is 80px tall: keep anchor targets below it.
    anchors: { offset: -88 },
  });
  lenis.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => lenis?.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis?.destroy();
    lenis = null;
  };
}
