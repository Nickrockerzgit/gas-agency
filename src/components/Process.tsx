import { ArrowRight, BedDouble, Building2, ChefHat, CookingPot, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section } from "./Section";

const customers = [
  {
    icon: Utensils,
    t: "Restaurants",
    d: "High-flame burner uptime & scheduled morning replenishment before kitchen opening shifts.",
    primary: "19 kg refills",
  },
  {
    icon: BedDouble,
    t: "Hotels",
    d: "Multi-kitchen manifold connections and banqueting fuel reliability for uninterrupted hospitality operations.",
    primary: "47.5 kg lot",
  },
  {
    icon: ChefHat,
    t: "Caterers",
    d: "Event-based bulk supply and timely venue delivery coordinated directly with banquet floor captains.",
    primary: "19 kg / 5 kg",
  },
  {
    icon: CookingPot,
    t: "Cloud Kitchens",
    d: "Continuous multi-brand shift continuity, safety-compliant manifold lines, and express swap routines.",
    primary: "19 kg dual-bank",
  },
  {
    icon: Building2,
    t: "Canteens",
    d: "Institutional mess, university halls, and hospital bulk catering requiring audited safety compliance.",
    primary: "High-volume bank",
  },
];

/** Two-tone line icons: navy outline with red details. */
const stroke = { fill: "none", strokeWidth: 2.2, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function DocIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <path d="M12 6h17l9 9v27H12z" stroke="#002147" {...stroke} />
      <path d="M29 6v9h9" stroke="#002147" {...stroke} />
      <path d="M18 25h13M18 32h13" stroke="#c8102e" {...stroke} />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <path d="M24 8c9.4 0 17 5.6 17 12.5S33.4 33 24 33c-1.7 0-3.3-.2-4.8-.5L10 37l2.4-7.3C9.6 27.5 7 24.2 7 20.5 7 13.6 14.6 8 24 8z" stroke="#002147" {...stroke} />
      <circle cx="16.5" cy="20.5" r="1.6" fill="#c8102e" />
      <circle cx="24" cy="20.5" r="1.6" fill="#c8102e" />
      <circle cx="31.5" cy="20.5" r="1.6" fill="#c8102e" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12" aria-hidden="true">
      <rect x="7" y="10" width="34" height="31" rx="4" stroke="#002147" {...stroke} />
      <path d="M7 19h34M16 6v8M32 6v8" stroke="#002147" {...stroke} />
      <path d="m17 30 5 5 9-9" stroke="#c8102e" {...stroke} />
    </svg>
  );
}

const steps = [
  { icon: DocIcon, t: "Share your requirement", d: "Tell us your cylinder size, quantity and location." },
  { icon: ChatIcon, t: "Confirm the details", d: "Discuss availability, current rates and delivery or collection terms." },
  { icon: CalendarIcon, t: "Arrange your supply", d: "Agree the details with our team before arranging supply or collection." },
];

export function Customers() {
  return (
    <Section tone="navy" titleId="who-title">
      <div className="mb-10 max-w-3xl">
        <p className="font-mono text-xs font-bold tracking-widest text-[#ff8a9a] uppercase">Institutional Commercial Clients</p>
        <h2 id="who-title" className="mt-1 text-3xl font-bold text-white sm:text-4xl">
          For commercial kitchens of every scale
        </h2>
        <p className="mt-3 text-base text-white/80">Reliable fuel distribution architecture tailored to high-output commercial establishments.</p>
      </div>
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
        {customers.map(({ icon: Icon, t, d, primary }) => (
          <li key={t}>
            <Card className="h-full justify-between gap-4 border-white/15 bg-white/5 p-5 text-white">
              <div className="space-y-2">
                <span className="grid size-10 place-items-center rounded-lg bg-white/10" aria-hidden="true">
                  <Icon className="size-5 text-white" />
                </span>
                <h3 className="pt-2 text-lg font-bold text-white">{t}</h3>
                <p className="text-[13px] leading-5 text-white/75">{d}</p>
              </div>
              <p className="border-t border-white/10 pt-3 font-mono text-[10px] font-semibold tracking-wider text-white/60 uppercase">
                Primary: {primary}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function Steps() {
  return (
    <Section titleId="how-title">
      <div className="mb-12 max-w-3xl">
        <p className="flex items-center gap-4 font-mono text-sm font-bold tracking-[0.22em] text-signal uppercase">
          Process <span className="h-0.5 w-16 bg-signal" aria-hidden="true" />
        </p>
        <h2 id="how-title" className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          How to enquire
        </h2>
        <p className="mt-3 text-lg text-foreground/75">Three simple steps to discuss your supply needs.</p>
      </div>

      <ol className="relative grid gap-12 md:grid-cols-3 md:gap-0">
        {/* Timeline: navy line with red segments, ending in an arrow. */}
        <div
          className="absolute top-7 right-[3%] left-[16.66%] hidden h-0.5 md:block"
          style={{ background: "linear-gradient(90deg, #002147 0 24%, #c8102e 24% 30%, #002147 30% 62%, #c8102e 62% 68%, #002147 68% 100%)" }}
          aria-hidden="true"
        />
        <ArrowRight className="absolute top-[18px] right-[1.5%] hidden size-5 text-signal md:block" strokeWidth={2.5} aria-hidden="true" />

        {steps.map(({ icon: Icon, t, d }, i) => (
          <li key={t} className="relative flex flex-col items-center text-center">
            <span
              className="relative z-10 grid size-14 place-items-center rounded-full bg-primary text-lg font-bold text-white ring-8 ring-white"
              aria-hidden="true"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-4">
              <Icon />
            </div>
            <h3 className="mt-3 text-xl font-bold">
              <span className="sr-only">Step {i + 1}: </span>
              {t}
            </h3>
            <p className="mt-2 max-w-[17rem] text-base text-foreground/70">{d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
