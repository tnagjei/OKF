// input: dist directory produced by npm run build
// output: process status and verification report
// pos: local static site verifier (update rule: sync this header and scripts README when this file changes)
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { publicRoutes, siteConfig } from "../site.config.mjs";

const distDir = join(process.cwd(), "dist");
const failures = [];
const placeholderDomain = "https://" + "example" + ".com";

function readRoute(path) {
  const filePath = path === "/" ? join(distDir, "index.html") : join(distDir, path, "index.html");

  if (!existsSync(filePath)) {
    failures.push(`Missing route output: ${path}`);
    return "";
  }

  return readFileSync(filePath, "utf8");
}

function countH1(html) {
  return (html.match(/<h1(\s|>)/g) || []).length;
}

publicRoutes.forEach((route) => {
  if (route.path.endsWith(".txt") || route.path.endsWith(".xml")) {
    return;
  }

  const html = readRoute(route.path);

  if (!html) {
    return;
  }

  const canonical = `<link rel="canonical" href="${new URL(route.path, siteConfig.url).href}">`;

  if (!html.includes(canonical)) {
    failures.push(`Missing canonical for ${route.path}`);
  }

  if (countH1(html) !== 1) {
    failures.push(`Expected exactly one H1 for ${route.path}`);
  }

  if (!html.includes(siteConfig.disclaimer)) {
    failures.push(`Missing unofficial disclaimer for ${route.path}`);
  }
});

["robots.txt", "sitemap.xml", "llms.txt", "llms-full.txt"].forEach((fileName) => {
  const filePath = join(distDir, fileName);

  if (!existsSync(filePath)) {
    failures.push(`Missing foundation file: ${fileName}`);
  }
});

const sitemapPath = join(distDir, "sitemap.xml");

if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");

  publicRoutes.forEach((route) => {
    const loc = new URL(route.path, siteConfig.url).href;

    if (!sitemap.includes(`<loc>${loc}</loc>`)) {
      failures.push(`Sitemap missing ${loc}`);
    }
  });
}

function readAllFiles(dir) {
  if (!existsSync(dir)) {
    return "";
  }

  return readdirSync(dir, { withFileTypes: true })
    .map((entry) => {
      const entryPath = join(dir, entry.name);
      return entry.isDirectory() ? readAllFiles(entryPath) : readFileSync(entryPath, "utf8");
    })
    .join("\n");
}

const serializedDist = readAllFiles(distDir);

if (serializedDist.includes(placeholderDomain)) {
  failures.push("Found placeholder domain in built output.");
}

if (failures.length > 0) {
  console.error("Verification failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Verification passed.");
