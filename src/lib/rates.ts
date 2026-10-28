import type { PriceRecord } from "../data/pricing";

export type RateState = "verified" | "pending" | "stale" | "future" | "unavailable";

/** Today's date in Asia/Kolkata as YYYY-MM-DD. */
export function istToday(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(now);
}

/**
 * Decides which message to show. Never calculates a price and never implies verification.
 * Review deadline: first day of each month (IST) – a rate reviewed before that is stale.
 */
export function rateState(r: PriceRecord | undefined, today: string): RateState {
  if (!r || r.status === "unavailable") return "unavailable";
  if (r.status === "awaiting-update" || r.amountInr == null || r.amountInr <= 0) return "pending";
  if (!r.effectiveFrom || !r.reviewedAt) return "pending";
  if (r.effectiveFrom > today) return "future";
  if (r.validThrough && r.validThrough < today) return "stale";
  const monthStart = today.slice(0, 8) + "01";
  if (r.reviewedAt < monthStart) return "stale";
  return "verified";
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso + "T00:00:00Z"),
  );
}

export function formatInr(n: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(n);
}
