// input: static route request
// output: robots.txt with sitemap and AI crawler hints
// pos: robots endpoint (update rule: sync this header and src/pages README when this file changes)
import { siteConfig } from "../../site.config.mjs";

export const prerender = true;

export function GET() {
  const aiCrawlers = [
    "GPTBot",
    "Claude-Web",
    "Anthropic-AI",
    "PerplexityBot",
    "GoogleOther",
    "DuckAssistBot"
  ];

  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin/",
    "Disallow: /private/",
    `Sitemap: ${siteConfig.url}/sitemap.xml`,
    `LLM-Content: ${siteConfig.url}/llms.txt`,
    `LLM-Full-Content: ${siteConfig.url}/llms-full.txt`,
    "",
    ...aiCrawlers.flatMap((crawler) => [
      `User-agent: ${crawler}`,
      "Allow: /",
      "Disallow: /user-content/",
      `LLM-Content: ${siteConfig.url}/llms.txt`,
      `LLM-Full-Content: ${siteConfig.url}/llms-full.txt`,
      ""
    ])
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
