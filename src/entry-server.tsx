import { renderToString } from "react-dom/server";
import App from "./App";
import { company } from "./data/company";
import { localBusinessJsonLd } from "./lib/jsonld";
import { setBuiltOn } from "./lib/today";

export function render(builtOn: string): string {
  setBuiltOn(builtOn);
  return renderToString(<App />);
}

export function headTags(siteUrl: string | null): string {
  const site = siteUrl ?? company.siteUrl;
  const tags: string[] = [];
  if (site) tags.push(`<link rel="canonical" href="${site}/" />`, `<meta property="og:url" content="${site}/" />`);
  const json = JSON.stringify(localBusinessJsonLd(site)).replace(/</g, "\\u003c");
  tags.push(`<script type="application/ld+json">${json}</script>`);
  return tags.join("\n    ");
}
