export type PriceStatus = "verified" | "awaiting-update" | "unavailable";

export interface PriceRecord {
  productId: string;
  /** Positive INR amount, or null when no verified price exists. Never use 0. */
  amountInr: number | null;
  /** e.g. "Refill" or "New-cylinder package" */
  priceBasis: string | null;
  /** City / distribution area this rate applies to */
  locality: string | null;
  /** ISO dates (YYYY-MM-DD) */
  effectiveFrom: string | null;
  reviewedAt: string | null;
  /** Only when an actual validity end is known. Do not invent an expiry. */
  validThrough?: string;
  /** Internal reference to the official rate sheet */
  sourceReference: string | null;
  /** Verified tax / deposit / delivery treatment. No assumed inclusions. */
  chargesNote: string | null;
  status: PriceStatus;
}

// Monthly update: edit this list from the official rate sheet, then rebuild and redeploy.
// Example of a fully verified record:
//   { productId: "19kg", amountInr: 1234, priceBasis: "Refill", locality: "Patna",
//     effectiveFrom: "2026-11-01", reviewedAt: "2026-11-01", sourceReference: "IOCL rate sheet Nov-2026",
//     chargesNote: "Prices exclude delivery charges.", status: "verified" }
export const prices: PriceRecord[] = [
  {
    productId: "19kg",
    amountInr: null,
    priceBasis: null,
    locality: null,
    effectiveFrom: null,
    reviewedAt: null,
    sourceReference: null,
    chargesNote: null,
    status: "awaiting-update",
  },
  {
    productId: "47.5kg",
    amountInr: null,
    priceBasis: null,
    locality: null,
    effectiveFrom: null,
    reviewedAt: null,
    sourceReference: null,
    chargesNote: null,
    status: "awaiting-update",
  },
];
