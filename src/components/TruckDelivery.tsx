import { useEffect, useLayoutEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/smoothScroll";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const WORDS = ["On", "time", "delivery"];

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

function Word({ value, setRef, children }: { value: MotionValue<number>; setRef: (el: HTMLSpanElement | null) => void; children: string }) {
  const y = useTransform(value, [0, 1], [32, 0]);
  return (
    <motion.span ref={setRef} style={{ opacity: value, y }} className="inline-block">
      {children}
    </motion.span>
  );
}

/**
 * Scroll-driven delivery scene.
 * - GSAP ScrollTrigger scrubs the truck from left to right while the section scrolls through the screen.
 * - The heading sits behind the truck, at the truck's height. Each word fades in, in its own place,
 *   as soon as the truck's rear has driven past it (driven by Motion values).
 * Without JS (or with reduced motion) the heading is fully visible and the truck is parked on the right.
 */
export function TruckDelivery() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const truck = useRef<HTMLDivElement>(null);
  const wordEls = useRef<(HTMLSpanElement | null)[]>([]);

  // 0..1 per word; 1 = visible (static fallback).
  const w0 = useMotionValue(1);
  const w1 = useMotionValue(1);
  const w2 = useMotionValue(1);
  const words = [w0, w1, w2];

  useIsoLayoutEffect(() => {
    if (prefersReducedMotion() || !section.current || !stage.current || !truck.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const stageEl = stage.current;
    const truckEl = truck.current;
    const vals = [w0, w1, w2];
    vals.forEach((v) => v.set(0));

    // Horizontal span of each word, relative to the stage.
    let bounds: { l: number; w: number }[] = [];
    const measure = () => {
      const s = stageEl.getBoundingClientRect();
      bounds = wordEls.current.map((el) => {
        const r = el?.getBoundingClientRect();
        return r ? { l: r.left - s.left, w: r.width } : { l: 0, w: 1 };
      });
    };

    const ctx = gsap.context(() => {
      // Truck is laid out parked on the right; x moves it from fully off-screen left to fully off-screen right.
      const parkedLeft = () => truckEl.offsetLeft;
      gsap.fromTo(
        truckEl,
        { x: () => -truckEl.offsetWidth - parkedLeft() },
        {
          x: () => stageEl.offsetWidth - parkedLeft(),
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            // No pin: the section stays compact and the truck is driven by the scroll while it crosses the screen.
            start: "top 88%",
            end: "center 38%",
            scrub: 0.6,
            invalidateOnRefresh: true,
            onRefresh: measure,
            onUpdate: () => {
              // Rear (left edge) of the truck. A word appears once the rear has passed over it.
              const rear = parkedLeft() + (gsap.getProperty(truckEl, "x") as number);
              bounds.forEach((b, i) => vals[i].set(clamp01((rear - b.l - b.w * 0.45) / (b.w * 0.55))));
            },
          },
        },
      );
    }, section);

    measure();
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
      vals.forEach((v) => v.set(1));
    };
  }, [w0, w1, w2]);

  return (
    <section
      ref={section}
      id="delivery"
      aria-labelledby="delivery-title"
      className="overflow-hidden border-b border-line bg-white py-4 sm:py-8"
    >
      <div ref={stage} className="relative mx-auto h-[190px] w-full max-w-[1400px] sm:h-[280px]">
        {/* Heading sits behind the truck, at the truck's height: each word shows up where the truck just was. */}
        <h2
          id="delivery-title"
          className="absolute inset-x-0 bottom-[44px] flex flex-wrap justify-center gap-x-[0.3em] text-4xl leading-none font-extrabold tracking-tight sm:bottom-[92px] sm:text-7xl lg:bottom-[80px] lg:text-8xl"
        >
          {WORDS.map((word, i) => (
            <Word
              key={word}
              value={words[i]}
              setRef={(el) => {
                wordEls.current[i] = el;
              }}
            >
              {word}
            </Word>
          ))}
        </h2>

        {/* Road */}
        <div className="absolute inset-x-0 bottom-3 h-px bg-primary/25" aria-hidden="true" />
        <div
          className="absolute inset-x-0 bottom-0 h-1.5"
          style={{ backgroundImage: "repeating-linear-gradient(90deg, rgb(0 33 71 / 0.25) 0 28px, transparent 28px 56px)" }}
          aria-hidden="true"
        />

        <div ref={truck} className="absolute right-[4%] bottom-2 z-10 w-[min(78vw,620px)] will-change-transform">
          <img
            src="/img/truck.webp"
            alt="Munna United commercial LPG delivery truck loaded with cylinders"
            width={1400}
            height={542}
            loading="lazy"
            draggable={false}
            className="block h-auto w-full select-none"
          />
        </div>
      </div>
    </section>
  );
}
