import { BedDouble, Building2, ChefHat, CookingPot, Utensils } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Section, SectionHeader } from "./Section";

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

const steps = [
  { t: "Share your requirement", d: "Tell us the cylinder size, quantity and your location by call or WhatsApp." },
  { t: "Confirm details", d: "We confirm availability, the applicable rate and delivery or collection terms." },
  { t: "Arrange supply or collection", d: "Once details are agreed, we arrange supply to you or collection." },
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
      <SectionHeader id="how-title" center eyebrow="Process" title="How to enquire" />
      <ol className="grid gap-6 md:grid-cols-3">
        {steps.map((s, i) => (
          <li key={s.t}>
            <Card className="h-full gap-2 bg-tonal p-6">
              <span className="grid size-10 place-items-center rounded-lg bg-primary font-bold text-white" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-2 text-lg font-bold">
                <span className="sr-only">Step {i + 1}: </span>
                {s.t}
              </h3>
              <p className="text-sm text-foreground/80">{s.d}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
