import { useEffect, useState } from "react";
import { istToday } from "./rates";

// Prerendered HTML is computed at build time; the client starts from that same date
// (avoids a hydration mismatch) and then switches to the visitor's real current date.
let builtOn: string | undefined;
export const setBuiltOn = (d: string) => {
  builtOn = d;
};

export function useToday(): string {
  const [today, setToday] = useState(() => builtOn ?? istToday());
  useEffect(() => setToday(istToday()), []);
  return today;
}
