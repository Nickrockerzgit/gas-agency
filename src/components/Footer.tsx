import type { ReactNode } from "react";
import { Clock, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { company, emergencyHelpline } from "@/data/company";
import { telHref } from "@/lib/links";
import { nav } from "./Header";
import { MobileBar } from "./MobileBar";
import { Container } from "./Section";

const accent = "text-[#ff8a9a]";

function Detail({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className={`mt-1 shrink-0 ${accent}`} aria-hidden="true">
        {icon}
      </span>
      <span className="text-white/85">{children}</span>
    </li>
  );
}

export function Footer() {
  const noContact = !company.phone && !company.email && !company.hours;
  return (
    <>
      <footer className="bg-primary text-white">
        <Container className="grid gap-10 py-12 text-sm md:grid-cols-2 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            <div>
              <p className="text-xl font-bold">{company.legalName.replace(" Private Limited", " Pvt. Ltd.")}</p>
              <p className={`mt-1 font-mono text-[11px] font-bold tracking-wider uppercase ${accent}`}>Commercial LPG Specialist</p>
            </div>
            <p className="max-w-md leading-relaxed text-white/80">
              Commercial LPG cylinder supply for restaurants, hotels, caterers, cloud kitchens and institutional kitchens. Contact our team
              for availability, applicable rates and supply enquiries.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-bold">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className={`size-4 ${accent}`} aria-hidden="true" /> Commercial supply only
              </li>
              {company.affiliation && (
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className={`size-4 ${accent}`} aria-hidden="true" /> {company.affiliation}
                </li>
              )}
            </ul>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-7">
            <h2 className="mb-4 text-xl font-bold text-white">Quick Links</h2>
            <ul className="space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="inline-flex min-h-9 items-center text-white/85 hover:text-white hover:underline">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="mb-4 text-xl font-bold text-white">Central Dispatch</h2>
            <ul className="space-y-3">
              {company.addressLines && <Detail icon={<MapPin className="size-4" />}>{company.addressLines.join(", ")}</Detail>}
              {company.phone && (
                <Detail icon={<Phone className="size-4" />}>
                  <a href={telHref(company.phone)} className="hover:underline">
                    {company.phone}
                  </a>
                </Detail>
              )}
              {company.email && (
                <Detail icon={<Mail className="size-4" />}>
                  <a href={`mailto:${company.email}`} className="hover:underline">
                    {company.email}
                  </a>
                </Detail>
              )}
              {company.hours && <Detail icon={<Clock className="size-4" />}>{company.hours}</Detail>}
              {noContact && <li className="pl-7 text-white/60">Phone, email and hours will be published soon.</li>}
            </ul>
          </div>
        </Container>

        <Container>
          <div className="border-t border-white/10 pt-8">
            <div className="rounded-lg border border-white/10 bg-black/25 px-5 py-4 text-center">
              <p className={`font-mono text-[11px] font-bold tracking-wider uppercase ${accent}`}>Statutory Regulatory Notice</p>
              <p className="mx-auto mt-2 max-w-3xl text-[13px] leading-relaxed text-white/85">
                This is not the official website of Indian Oil Corporation Limited. This website is owned and operated by {company.legalName}.
                Product variants, rates and availability must be confirmed with the agency.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between gap-3 py-6 text-xs font-bold text-white/85 sm:flex-row sm:items-center">
            <p>
              © <span suppressHydrationWarning>{new Date().getFullYear()}</span> {company.legalName}. All rights reserved.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              <li>
                <a href="#safety" className="inline-flex min-h-8 items-center hover:underline">
                  Safety Protocols
                </a>
              </li>
              <li>
                <a href={`tel:${emergencyHelpline}`} className="inline-flex min-h-8 items-center hover:underline">
                  Emergency Helpline
                </a>
              </li>
              <li>
                <a href="#contact" className="inline-flex min-h-8 items-center hover:underline">
                  Enquiries
                </a>
              </li>
            </ul>
          </div>
        </Container>
      </footer>
      <MobileBar />
    </>
  );
}
