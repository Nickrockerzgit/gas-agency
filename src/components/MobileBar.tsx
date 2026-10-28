import { hasContact } from "@/lib/links";
import { cn } from "@/lib/utils";
import { CallButton, WhatsAppButton } from "./ContactAction";

/** Fixed bottom action bar on small screens; the page has matching bottom padding so nothing is covered. */
export function MobileBar() {
  return (
    <div
      className={cn("fixed inset-x-0 bottom-0 z-40 grid gap-2 border-t border-line bg-white p-2 md:hidden", hasContact() ? "grid-cols-2" : "grid-cols-1")}
      style={{ paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
    >
      <CallButton label="Call" />
      {hasContact() && <WhatsAppButton label="WhatsApp" />}
    </div>
  );
}
