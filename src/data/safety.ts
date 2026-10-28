// Owner must review this guidance and the official links before publication.
export const safetyLinks = [
  { label: "IndianOil — Contact Us (emergency helpline)", href: "https://iocl.com/contact-us" },
  { label: "IndianOil — Indane Cooking Gas Overview", href: "https://iocl.com/pages/indane-cooking-gas-overview" },
];

export type SafetyIcon = "wind" | "wrench" | "truck" | "file";

export interface SafetyItem {
  icon: SafetyIcon;
  title: string;
  text: string;
  /** Where the arrow goes: point at the official page for each topic once confirmed. */
  href: string;
}

export const safetyItems: SafetyItem[] = [
  {
    icon: "wind",
    title: "Storage & ventilation",
    text: "Understand appropriate storage and ventilation.",
    href: safetyLinks[1].href,
  },
  {
    icon: "wrench",
    title: "Equipment & maintenance",
    text: "Explore approved equipment and professional care.",
    href: safetyLinks[1].href,
  },
  {
    icon: "truck",
    title: "Delivery-time checks",
    text: "Know what to check when receiving a cylinder.",
    href: safetyLinks[1].href,
  },
  {
    icon: "file",
    title: "Official safety resources",
    text: "Refer to manufacturer and official LPG guidance.",
    href: safetyLinks[0].href,
  },
];
