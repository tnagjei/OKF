// input: static route request
// output: sitemap.xml for all public pages
// pos: sitemap endpoint (update rule: sync this header and src/pages README when this file changes)
import { publicRoutes, siteConfig } from "../../site.config.mjs";

export const prerender = true;

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const urls = publicRoutes
    .map((route) => {
      const loc = xmlEscape(new URL(route.path, siteConfig.url).href);
      const lastmod = route.lastmod ? `\n    <lastmod>${xmlEscape(route.lastmod)}</lastmod>` : "";

      return `  <url>
    <loc>${loc}</loc>${lastmod}
    <changefreq>weekly</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
    })
    .join("\n");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}