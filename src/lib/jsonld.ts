import { company } from "../data/company";

export function localBusinessJsonLd(siteUrl: string | null) {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: company.legalName,
    description: "Commercial LPG cylinder distributor for restaurants, hotels, caterers and commercial kitchens.",
  };
  if (company.gstin) data.taxID = company.gstin;
  if (siteUrl) data.url = siteUrl;
  if (company.phone) data.telephone = company.phone;
  if (company.email) data.email = company.email;
  if (company.hours) data.openingHours = company.hours;
  if (company.addressLines) data.address = { "@type": "PostalAddress", streetAddress: company.addressLines.join(", ") };
  if (company.serviceArea) data.areaServed = company.serviceArea;
  return data;
}
