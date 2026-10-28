import { company } from "../data/company";

const clean = (n: string) => n.replace(/[^\d+]/g, "");

export const telHref = (n: string) => `tel:${clean(n)}`;

export const whatsappHref = (n: string, text: string) =>
  `https://wa.me/${clean(n).replace("+", "")}?text=${encodeURIComponent(text)}`;

export const productEnquiryText = (label: string) =>
  `Hello, I would like to enquire about a ${label} LPG cylinder for my business.`;

export const generalEnquiryText = "Hello, I would like to enquire about commercial LPG supply for my business.";

export const hasContact = () => Boolean(company.phone || company.whatsapp);
