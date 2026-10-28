import { ArrowRight, CircleAlert } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { products, type Product } from "@/data/products";
import { cn } from "@/lib/utils";
import { WhatsAppButton } from "./ContactAction";
import { CylinderIcon } from "./CylinderIcon";
import { Section, SectionHeader } from "./Section";

const badgeTone = {
  tonal: "border border-line bg-tonal text-primary",
  signal: "bg-signal text-white",
  navy: "bg-primary text-white",
} as const;

function ProductCard({ p }: { p: Product }) {
  const featured = Boolean(p.feature);
  return (
    <Card
      className={cn(
        "relative h-full w-full justify-between gap-0 p-5 transition-colors",
        featured ? "border-primary shadow-[0_0_0_1px_var(--primary)]" : "shadow-sm hover:border-primary/30",
      )}
    >
      {p.feature && (
        <span
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 font-mono text-[10px] font-bold tracking-wider whitespace-nowrap text-white uppercase shadow-sm",
            p.feature.tone === "signal" ? "bg-signal" : "bg-primary",
          )}
        >
          {p.feature.tag}
        </span>
      )}
      <CardContent className="p-0">
        <div className="flex items-center justify-between gap-2 border-b border-line pt-1 pb-3">
          <h3 className="text-2xl font-extrabold whitespace-nowrap">{p.label}</h3>
          <span className={cn("rounded px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider whitespace-nowrap uppercase", badgeTone[p.badgeTone])}>
            {p.badge}
          </span>
        </div>

        {/* Fixed-height stage, bottom-aligned: every cylinder stands on the same baseline at its true relative size. */}
        <div className="mt-4 flex h-72 items-end justify-center rounded border border-line bg-tonal px-3 pt-4 pb-3">
          <div className="flex h-full w-full items-end justify-center">
            {p.image ? (
              <img
                src={p.image}
                alt={`${p.label} LPG cylinder`}
                loading="lazy"
                style={{ height: `${(p.scale ?? 1) * 100}%` }}
                className="w-auto max-w-full object-contain object-bottom"
              />
            ) : (
              <CylinderIcon label={p.label} capacityKg={p.capacityKg} className="h-full w-auto" />
            )}
          </div>
        </div>

        {(p.title || p.description) && (
          <div className="space-y-1.5">
            {p.title && <p className="text-xs font-bold text-primary">{p.title}</p>}
            {p.description && <p className="text-xs leading-normal text-foreground/75">{p.description}</p>}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-5 border-t border-line p-0 pt-5">
        <WhatsAppButton
          productLabel={p.label}
          label={
            <>
              Enquire Now <ArrowRight />
            </>
          }
          icon={null}
          variant={featured ? "signal" : "outline"}
          size="sm"
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}

export function Products() {
  return (
    <Section id="cylinders" titleId="cyl-title">
      <SectionHeader
        id="cyl-title"
        center
        eyebrow="Full Commercial Portfolio"
        title="Find the right cylinder for your business"
        description="Explore available sizes and enquire about the right product for your requirement."
      />
      <ul className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-5">
        {products.map((p) => (
          <li key={p.id} className="flex">
            <ProductCard p={p} />
          </li>
        ))}
      </ul>
      <p className="mt-10 flex items-center justify-center gap-2 rounded-lg border border-line bg-tonal p-4 text-center text-xs font-semibold text-primary">
        <CircleAlert className="size-4 shrink-0 text-signal" aria-hidden="true" />
        Product variants and availability are subject to confirmation.
      </p>
    </Section>
  );
}
