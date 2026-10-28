// Runs after the client + SSR builds: injects server-rendered HTML into dist/index.html
// so essential content is readable without JavaScript, then writes robots/sitemap.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const ssrDir = path.resolve("dist-server");
const { render, headTags } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const builtOn = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
const siteUrl = (process.env.SITE_URL || "").replace(/\/$/, "") || null;

let html = fs.readFileSync(path.join(dist, "index.html"), "utf8");
html = html
  .replace('<html lang="en">', `<html lang="en" data-built="${builtOn}">`)
  .replace("<!--head-tags-->", headTags(siteUrl))
  .replace("<!--app-html-->", render(builtOn));
fs.writeFileSync(path.join(dist, "index.html"), html);

const robots = ["User-agent: *", "Allow: /"];
if (siteUrl) robots.push(`Sitemap: ${siteUrl}/sitemap.xml`);
fs.writeFileSync(path.join(dist, "robots.txt"), robots.join("\n") + "\n");

if (siteUrl) {
  fs.writeFileSync(
    path.join(dist, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc><lastmod>${builtOn}</lastmod></url>\n</urlset>\n`,
  );
} else {
  console.warn("SITE_URL not set: canonical URL and sitemap.xml skipped. Set it for production builds.");
}

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered dist/index.html (built ${builtOn})`);
