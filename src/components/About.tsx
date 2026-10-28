import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { company } from "@/data/company";
import { Section, SectionHeader } from "./Section";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-line py-3 last:border-0">
      <dt className="text-[11px] font-bold tracking-wider text-primary/70 uppercase">{label}</dt>
      <dd className="mt-0.5 font-semibold text-primary">{children}</dd>
    </div>
  );
}

export function About() {
  return (
    <Section id="about" titleId="about-title" tone="tonal">
      <SectionHeader
        id="about-title"
        eyebrow="Distribution Agency"
        title="Your commercial LPG supply contact"
        description={`${company.legalName} is a commercial LPG distributor. We supply cylinders to restaurants, hotels, caterers and commercial kitchens, and we handle business customers only.`}
      />
      <div className="grid items-stretch gap-8 lg:grid-cols-12">
        <div className="flex flex-col justify-center gap-4 lg:col-span-5">
          <Card className="items-center gap-3 bg-primary p-8 text-center text-white">
            <Building2 className="size-10" aria-hidden="true" />
            <p className="text-sm font-bold tracking-wider uppercase">Registered Office</p>
            {company.addressLines && <p className="text-sm text-white/80">{company.addressLines.join(", ")}</p>}
          </Card>
          <p className="text-foreground/80">
            Prices and product details on this page are published only after they are checked against the applicable official rate
            list. Where something is not yet verified, we say so and ask you to contact us.
          </p>
          {company.affiliation && <p className="font-semibold text-primary">{company.affiliation}</p>}
        </div>

        <Card className="gap-0 lg:col-span-7">
          <CardHeader className="flex-row items-center justify-between border-b border-line">
            <CardTitle className="text-lg text-primary">Registered Business Details</CardTitle>
            <Badge variant="tonal">Company records</Badge>
          </CardHeader>
          <CardContent>
            <dl>
              <Row label="Registered name">{company.legalName}</Row>
              {company.addressLines && <Row label="Registered address">{company.addressLines.join(", ")}</Row>}
              {company.cin && <Row label="CIN">{company.cin}</Row>}
              {company.gstin && <Row label="GSTIN">{company.gstin}</Row>}
              <Row label="Business">Commercial LPG distribution</Row>
            </dl>
          </CardContent>
        </Card>
      </div>
    </Section>
  );
}
