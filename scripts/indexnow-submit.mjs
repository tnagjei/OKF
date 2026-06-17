// input: SITE_URL, INDEXNOW_KEY, optional URL args, optional --dry-run flag
// output: IndexNow submission result or dry-run URL list
// pos: IndexNow submitter (update rule: sync this header and scripts README when this file changes)
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cwd } from "node:process";

const defaultEndpoint = "https://api.indexnow.org/indexnow";
const keyPattern = /^[A-Za-z0-9_-]+$/;
const batchSize = 10000;

function loadDotEnv() {
  const envPath = join(cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const lines = readFileSync(envPath, "utf8").split(/\r?\n/);

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      return;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      return;
    }

    const name = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (name && process.env[name] === undefined) {
      process.env[name] = value;
    }
  });
}

function maskKey(key) {
  if (key.length <= 8) {
    return `${key.slice(0, 2)}***${key.slice(-2)}`;
  }

  return `${key.slice(0, 4)}***${key.slice(-4)}`;
}

function parseSiteUrl(value) {
  try {
    const parsed = new URL(value);
    parsed.pathname = "/";
    parsed.search = "";
    parsed.hash = "";
    return parsed;
  } catch {
    return null;
  }
}

function parseSitemapUrls() {
  const sitemapPath = join(cwd(), "dist", "sitemap.xml");

  if (!existsSync(sitemapPath)) {
    throw new Error("dist/sitemap.xml was not found. Run npm run build before submitting sitemap URLs.");
  }

  const sitemap = readFileSync(sitemapPath, "utf8");
  return [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1].trim());
}

function htmlPathForUrl(url, siteUrl) {
  const relativePath = url.pathname === "/" ? "index.html" : join(url.pathname, "index.html");
  return join(cwd(), "dist", relativePath);
}

function hasNoindex(url, siteUrl) {
  const htmlPath = htmlPathForUrl(url, siteUrl);

  if (!existsSync(htmlPath)) {
    return false;
  }

  const html = readFileSync(htmlPath, "utf8");
  return /<meta\s+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
}

function filterUrls(urlValues, siteUrl, sourceIsSitemap) {
  const seen = new Set();
  const accepted = [];
  const skipped = [];

  urlValues.forEach((value) => {
    let parsed;

    try {
      parsed = new URL(value);
    } catch {
      skipped.push({ url: value, reason: "invalid URL" });
      return;
    }

    if (parsed.host !== siteUrl.host) {
      skipped.push({ url: value, reason: "different host" });
      return;
    }

    if (parsed.pathname.startsWith("/admin/") || parsed.pathname.startsWith("/private/")) {
      skipped.push({ url: value, reason: "blocked path" });
      return;
    }

    if (!sourceIsSitemap && ["/privacy/", "/terms/"].includes(parsed.pathname)) {
      skipped.push({ url: value, reason: "legal page is only submitted when present in sitemap" });
      return;
    }

    if (hasNoindex(parsed, siteUrl)) {
      skipped.push({ url: value, reason: "noindex" });
      return;
    }

    const normalized = parsed.href;

    if (!seen.has(normalized)) {
      seen.add(normalized);
      accepted.push(normalized);
    }
  });

  return { accepted, skipped };
}

function chunkUrls(urls) {
  const chunks = [];

  for (let index = 0; index < urls.length; index += batchSize) {
    chunks.push(urls.slice(index, index + batchSize));
  }

  return chunks;
}

function statusMessage(status) {
  if (status === 200 || status === 202) return "success";
  if (status === 400) return "request format error";
  if (status === 403) return "key file could not be verified or host does not match";
  if (status === 422) return "URL does not belong to host or URL format is invalid";
  if (status === 429) return "too many requests";
  return "unexpected response";
}

async function submitBatch({ endpoint, siteUrl, key, urls }) {
  const payload = {
    host: siteUrl.host,
    key,
    keyLocation: new URL(`/${key}.txt`, siteUrl).href,
    urlList: urls
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(payload)
  });

  const responseText = await response.text();
  const ok = response.status === 200 || response.status === 202;

  console.log(`Submitted ${urls.length} URL(s) to ${endpoint}.`);
  console.log(`HTTP status: ${response.status} (${statusMessage(response.status)}).`);

  if (!ok && responseText) {
    console.log(`Response: ${responseText.slice(0, 500)}`);
  }

  return ok;
}

loadDotEnv();

const rawArgs = process.argv.slice(2);
const dryRun = rawArgs.includes("--dry-run");
const urlArgs = rawArgs.filter((arg) => arg !== "--dry-run");
const indexNowKey = process.env.INDEXNOW_KEY?.trim();
const rawSiteUrl = process.env.SITE_URL?.trim();
const endpoint = process.env.INDEXNOW_ENDPOINT?.trim() || defaultEndpoint;

if (!rawSiteUrl) {
  console.error("SITE_URL is not set. Set SITE_URL before submitting IndexNow URLs.");
  process.exit(1);
}

if (!indexNowKey) {
  console.error("INDEXNOW_KEY is not set. Set INDEXNOW_KEY before submitting IndexNow URLs.");
  process.exit(1);
}

if (!keyPattern.test(indexNowKey) || indexNowKey.length < 8 || indexNowKey.length > 128) {
  console.error("INDEXNOW_KEY is invalid. Use 8 to 128 letters, numbers, hyphen, or underscore characters.");
  process.exit(1);
}

const siteUrl = parseSiteUrl(rawSiteUrl);

if (!siteUrl) {
  console.error("SITE_URL is invalid. Use a full URL such as https://openknowledgeformat.online.");
  process.exit(1);
}

const sourceIsSitemap = urlArgs.length === 0;
let sourceUrls;

try {
  sourceUrls = sourceIsSitemap ? parseSitemapUrls() : urlArgs;
} catch (error) {
  console.error(error.message);
  process.exit(1);
}

const { accepted, skipped } = filterUrls(sourceUrls, siteUrl, sourceIsSitemap);
const maskedKey = maskKey(indexNowKey);
const maskedKeyLocation = new URL(`/${maskedKey}.txt`, siteUrl).href;

console.log(`IndexNow key: ${maskedKey}`);
console.log(`Endpoint: ${endpoint}`);
console.log(`Host: ${siteUrl.host}`);
console.log(`Key location: ${maskedKeyLocation}`);
console.log(`Accepted URL count: ${accepted.length}`);

if (skipped.length > 0) {
  console.log(`Skipped URL count: ${skipped.length}`);
  skipped.slice(0, 20).forEach((item) => {
    console.log(`- ${item.url} (${item.reason})`);
  });
}

if (accepted.length === 0) {
  console.error("No URLs are eligible for IndexNow submission.");
  process.exit(1);
}

if (dryRun) {
  console.log("Dry run only. No network request was sent.");
  accepted.forEach((url) => console.log(url));
  process.exit(0);
}

let allOk = true;

for (const urls of chunkUrls(accepted)) {
  try {
    const ok = await submitBatch({ endpoint, siteUrl, key: indexNowKey, urls });
    allOk = allOk && ok;
  } catch (error) {
    allOk = false;
    console.error(`Network request failed: ${error.message}`);
  }
}

if (!allOk) {
  process.exit(1);
}
