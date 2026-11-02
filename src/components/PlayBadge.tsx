import { cn } from "@/lib/utils";

/** "Get it on Google Play" badge. The Android app isn't live yet, so it isn't a link. */
export function PlayBadge({ className }: { className?: string }) {
  return (
    <span
      title="Android app coming soon"
      className={cn("inline-flex h-14 items-center gap-2.5 rounded-xl border border-white/30 bg-black px-4 text-white", className)}
    >
      <svg viewBox="0 0 24 26" className="h-7 w-auto" aria-hidden="true">
        <path d="M1.2 1.3 13.3 13 1.2 24.7c-.4-.3-.7-.9-.7-1.6V2.9c0-.7.3-1.3.7-1.6z" fill="#00d7fe" />
        <path d="m17.3 9-4 4L1.2 1.3C1.7 1 2.4 1 3.1 1.4L17.3 9z" fill="#00f076" />
        <path d="m17.3 17-14.2 7.6c-.7.4-1.4.4-1.9.1L13.3 13l4 4z" fill="#ff3a44" />
        <path d="m17.3 9 4.4 2.4c1 .6 1 2.1 0 2.7L17.3 17l-4-4 4-4z" fill="#ffd000" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[9px] font-medium tracking-wider uppercase">Get it on</span>
        <span className="mt-0.5 text-xl font-semibold tracking-tight">Google Play</span>
      </span>
    </span>
  );
}
