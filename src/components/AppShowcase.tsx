import { useEffect, useRef, useState } from "react";
import { CalendarCheck, ClipboardList, Headset } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { PlayBadge } from "./PlayBadge";
import { Rise } from "./Rise";
import { Section } from "./Section";

const features = [
  { icon: CalendarCheck, label: "Easy booking" },
  { icon: ClipboardList, label: "Order updates" },
  { icon: Headset, label: "Quick support" },
];

/**
 * Phone, cylinder and card drift up and settle as the section scrolls through the viewport;
 * the circle behind them grows. Without JS (or with reduced motion) they sit in their resting spots.
 */
function AppVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });
  const stops = [0, 0.42, 1];

  const phoneY = useTransform(p, stops, [180, 0, -80]);
  const phoneRotate = useTransform(p, stops, [5, 0, -3]);
  const cylinderY = useTransform(p, stops, [300, 0, -150]);
  const cylinderRotate = useTransform(p, stops, [-6, 0, 4]);
  const cardY = useTransform(p, stops, [240, 0, -120]);
  const cardRotate = useTransform(p, stops, [-10, 0, 5]);
  const circleScale = useTransform(p, stops, [0.7, 1, 1.08]);

  const animated = mounted && !reduced;

  return (
    <div ref={ref} className="relative mx-auto h-[440px] w-full max-w-[560px] lg:col-span-6 lg:h-[520px]" aria-hidden="true">
      <motion.span
        style={animated ? { scale: circleScale } : undefined}
        className="absolute top-1/2 left-[48%] size-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d8e8fa] sm:size-[420px]"
      />
      <motion.img
        src="/img/app-phone.webp"
        alt=""
        width={620}
        height={930}
        loading="lazy"
        style={animated ? { y: phoneY, rotate: phoneRotate } : undefined}
        className="absolute top-3 left-[16%] z-10 h-[420px] w-auto drop-shadow-[0_30px_30px_rgba(0,33,71,0.28)] sm:left-[20%] lg:h-[490px]"
      />
      <motion.img
        src="/img/app-cylinder.webp"
        alt=""
        width={460}
        height={552}
        loading="lazy"
        style={animated ? { y: cylinderY, rotate: cylinderRotate } : undefined}
        className="absolute right-0 bottom-2 z-20 h-[190px] w-auto drop-shadow-[0_22px_24px_rgba(0,33,71,0.3)] sm:h-[250px]"
      />
      <motion.img
        src="/img/app-card.webp"
        alt=""
        width={360}
        height={324}
        loading="lazy"
        style={animated ? { y: cardY, rotate: cardRotate } : undefined}
        className="absolute bottom-8 left-0 z-30 w-[120px] drop-shadow-[0_16px_20px_rgba(0,33,71,0.28)] sm:w-[150px]"
      />
    </div>
  );
}

export function AppShowcase() {
  return (
    <Section id="app" titleId="app-title" className="overflow-hidden md:py-16">
      <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
        <Rise from={40} exit={-16} className="lg:col-span-6">
          <p className="font-mono text-xs font-bold tracking-[0.2em] text-signal uppercase">The Munna United App</p>
          <h2 id="app-title" className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl lg:text-[56px]">
            Your LPG supply.
            <br />
            Now at your
            <br />
            <span className="text-signal">fingertips.</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-foreground/65">A simpler way to manage your commercial LPG needs.</p>

          <ul className="mt-8 grid max-w-md grid-cols-3 divide-x divide-primary/15">
            {features.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-2 px-2 text-center first:pl-0 last:pr-0">
                <Icon className="size-9 text-signal" strokeWidth={1.6} aria-hidden="true" />
                <span className="text-sm font-semibold text-foreground/75 sm:text-base">{label}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <PlayBadge />
            <p className="max-w-[12rem] border-l-2 border-signal pl-3 text-[13px] leading-snug text-foreground/70">
              <span className="block text-[15px] font-bold text-primary">Get the app on Android</span>
              Book refills and track every order from your phone.
            </p>
          </div>
        </Rise>

        <AppVisual />
      </div>
    </Section>
  );
}
