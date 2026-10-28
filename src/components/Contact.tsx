import type { ReactNode } from "react";
import { Building2, Clock, Mail, MessageSquare, Phone } from "lucide-react";
import { Card } from "@/components/ui/card";
import { company } from "@/data/company";
import { telHref } from "@/lib/links";
import { cn } from "@/lib/utils";
import { CallButton, DirectionsButton, WhatsAppButton } from "./ContactAction";
import { Section, SectionHeader } from "./Section";

function Tile({ label, icon, children, className }: { label: string; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-lg border border-line bg-tonal p-4", className)}>
      <p className="font-mono text-[10px] font-semibold tracking-wider text-primary/70 uppercase">{label}</p>
      <div className="mt-2 flex items-start gap-2 text-[15px] font-bold text-primary">
        {icon && (
          <span className="mt-0.5 shrink-0 text-signal" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="min-w-0 break-words">{children}</div>
      </div>
    </div>
  );
}

const Pending = () => <span className="font-semibold text-primary/60">To be confirmed</span>;

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-line py-1.5 font-mono text-[11px]">
      <dt className="text-foreground/70">{label}</dt>
      <dd className="text-right font-bold text-primary">{value}</dd>
    </div>
  );
}

export function Contact() {
  return (
    <Section id="contact" titleId="contact-title" tone="tonal">
      <SectionHeader
        id="contact-title"
        eyebrow="Commercial Support Desk"
        title="Let's discuss your LPG requirement"
        description="Reach out directly to our commercial booking desk for live availability and supply schedules."
      />
      <div className="grid items-start gap-6 lg:grid-cols-12">
        <Card className="gap-6 p-6 shadow-sm md:p-8 lg:col-span-8">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
            <div>
              <h3 className="text-xl font-bold">{company.legalName.replace(" Private Limited", " Pvt. Ltd.")}</h3>
              <p className="font-mono text-[11px] text-foreground/70">Commercial LPG Booking Desk</p>
            </div>
            <span className="rounded border border-line bg-tonal px-2.5 py-1 font-mono text-[11px] font-bold text-primary">Commercial LPG</span>
          </div>

          <dl className="grid gap-4 md:grid-cols-2">
            <Tile label="Primary phone line" icon={<Phone className="size-4" />}>
              {company.phone ? (
                <a href={telHref(company.phone)} className="hover:underline">
                  {company.phone}
                </a>
              ) : (
                <Pending />
              )}
            </Tile>
            <Tile label="Instant business messaging" icon={<MessageSquare className="size-4" />}>
              {company.whatsapp ? company.whatsapp : <Pending />}
            </Tile>
            <Tile label="Electronic mail orders" icon={<Mail className="size-4" />}>
              {company.email ? (
                <a href={`mailto:${company.email}`} className="hover:underline">
                  {company.email}
                </a>
              ) : (
                <Pending />
              )}
            </Tile>
            <Tile label="Operating dispatch hours" icon={<Clock className="size-4" />}>
              {company.hours ?? <Pending />}
            </Tile>
            <Tile label="Registered office address" className="md:col-span-2">
              {company.addressLines ? company.addressLines.join(", ") : <Pending />}
              <p className="mt-1 text-xs font-normal text-foreground/70">
                Service areas: {company.serviceArea ? `${company.serviceArea}${company.coverageNote ? ` — ${company.coverageNote}` : ""}` : "to be confirmed"}
              </p>
            </Tile>
          </dl>

          <div className="flex flex-wrap gap-3">
            <CallButton size="sm" />
            <WhatsAppButton variant="default" size="sm" />
            <DirectionsButton size="sm" />
          </div>
          <p className="text-xs text-foreground/70">
            Opening WhatsApp or placing a call is an enquiry only; availability and supply are confirmed by our team.
          </p>
        </Card>

        <Card className="gap-4 p-5 shadow-sm lg:col-span-4">
          <p className="flex items-center justify-between border-b border-line pb-3 font-mono text-[11px] font-bold tracking-wider text-primary uppercase">
            Business verification
            <span className="size-2.5 rounded-full bg-primary" aria-hidden="true" />
          </p>
          <div className="rounded-lg border border-line bg-tonal p-4">
            <p className="flex items-center gap-2 text-sm font-bold text-primary">
              <Building2 className="size-4 text-signal" aria-hidden="true" /> Registered Office
            </p>
            <p className="mt-2 text-[13px] leading-5 text-foreground/75">
              Our registered office is in Hyderabad, Telangana. Call or message us before visiting so our team can confirm the visit.
            </p>
          </div>
          <dl>
            <Row label="Pincode Check:" value="Available via Phone" />
            {company.cin && <Row label="CIN:" value={company.cin} />}
            {company.gstin && <Row label="GSTIN:" value={company.gstin} />}
          </dl>
          <div className="rounded-lg bg-primary p-5 text-center">
            <p className="font-mono text-[11px] text-white">Commercial supply only</p>
            <p className="mt-1 font-mono text-xs font-bold tracking-wider text-[#ff8a9a] uppercase">No domestic sales</p>
          </div>
        </Card>
      </div>
    </Section>
  );
}
