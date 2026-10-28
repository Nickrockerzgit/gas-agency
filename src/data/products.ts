export type PublishStatus = "published" | "unverified";

export interface Product {
  id: string;
  capacityKg: number;
  label: string;
  /** Exact variant, used in the rate table. */
  variant: string;
  category: string;
  /** Heading on the portfolio card. */
  /** Optional text under the image. Leave out for image-only cards. */
  title?: string;
  description?: string;
  /** Short tag next to the size on the portfolio card. */
  badge: string;
  badgeTone: "tonal" | "signal" | "navy";
  /** Floating ribbon above a highlighted card. */
  feature?: { tag: string; tone: "navy" | "signal" };
  /** Path to an approved product photo in /public, e.g. "/img/19kg.webp" */
  image?: string;
  /** Image height relative to the tallest cylinder (47.5 kg = 1), so sizes look true to scale. */
  scale?: number;
  /**
   * "published": shown everywhere as a verified commercial product.
   * "unverified": still listed in the portfolio, but marked "pending verification"
   * (no image, no commercial label) and left out of the hero and rate table.
   */
  status: PublishStatus;
}

// IndianOil lists 19 kg and 47.5 kg as commercial/industrial cylinders.
// 2 / 5 / 10 kg belong to other categories (free-trade / composite) -> keep "unverified"
// until the agency supplies the exact variant and permitted category.
export const products: Product[] = [
  {
    id: "2kg",
    image: "/img/products/2kg.webp",
    scale: 0.408,
    capacityKg: 2,
    label: "2 kg",
    variant: "Variant to be confirmed",
    category: "To be confirmed",
    badge: "Portable",
    badgeTone: "tonal",
    status: "unverified",
  },
  {
    id: "5kg",
    image: "/img/products/5kg.webp",
    scale: 0.512,
    capacityKg: 5,
    label: "5 kg",
    variant: "Variant to be confirmed",
    category: "To be confirmed",
    badge: "Buffet",
    badgeTone: "tonal",
    status: "unverified",
  },
  {
    id: "10kg",
    image: "/img/products/10kg.webp",
    scale: 0.609,
    capacityKg: 10,
    label: "10 kg",
    variant: "Variant to be confirmed",
    category: "To be confirmed",
    badge: "Light duty",
    badgeTone: "tonal",
    status: "unverified",
  },
  {
    id: "19kg",
    image: "/img/products/19kg.webp",
    scale: 0.752,
    capacityKg: 19,
    label: "19 kg",
    variant: "Commercial cylinder",
    category: "Commercial",
    badge: "Core B2B",
    badgeTone: "signal",
    feature: { tag: "Commercial Workhorse", tone: "navy" },
    status: "published",
  },
  {
    id: "47.5kg",
    image: "/img/products/47.5kg.webp",
    scale: 1,
    capacityKg: 47.5,
    label: "47.5 kg",
    variant: "Commercial / industrial cylinder",
    category: "Commercial / Industrial",
    badge: "Lot Jumbo",
    badgeTone: "navy",
    feature: { tag: "Heavy Industrial & Manifold", tone: "signal" },
    status: "published",
  },
];

export const publishedProducts = products.filter((p) => p.status === "published");
