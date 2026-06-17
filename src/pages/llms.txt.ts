// input: static route request
// output: short llms.txt site guide
// pos: LLM short guide endpoint (update rule: sync this header and src/pages README when this file changes)
import { publicRoutes, siteConfig } from "../../site.config.mjs";

export const prerender = true;

export function GET() {
  const routeLines = publicRoutes
    .filter((route) => route.path !== "/privacy/" && route.path !== "/terms/")
    .map((route) => `- [${route.label}](${new URL(route.path, siteConfig.url).href}): ${route.label} resource.`);

  const body = `# ${siteConfig.name}
> An unofficial English guide to Open Knowledge Format, with OKF examples, templates, a browser-only validator, and comparisons with MCP, RAG, and llms.txt.

This site helps developers, AI agent builders, SEO teams, and documentation teams package knowledge as Markdown files with YAML frontmatter.

## Core content
${routeLines.join("\n")}

## Common resources
- [Contact](${siteConfig.url}/contact/): Corrections and feedback.
- [Privacy](${siteConfig.url}/privacy/): Validator privacy notes.
- [Terms](${siteConfig.url}/terms/): Terms of use.

## Status
${siteConfig.disclaimer}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
