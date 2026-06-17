// input: static route request
// output: full llms.txt style site guide
// pos: LLM full guide endpoint (update rule: sync this header and src/pages README when this file changes)
import { publicRoutes, siteConfig } from "../../site.config.mjs";

export const prerender = true;

export function GET() {
  const routeLines = publicRoutes.map(
    (route) => `- ${route.label}: ${new URL(route.path, siteConfig.url).href}`
  );

  const body = `# ${siteConfig.name}

${siteConfig.disclaimer}

## Site purpose
Open Knowledge Format Guide explains how to organize website, documentation, API, SaaS, support, and data catalog knowledge as Markdown concept files with YAML frontmatter.

## Primary audience
- Developers building agent-readable documentation.
- AI agent teams preparing context packages.
- SEO teams adapting public website knowledge for AI discovery.
- Documentation teams splitting large docs into maintainable concept files.

## Public routes
${routeLines.join("\n")}

## OKF guide profile
This site teaches a practical guide profile that checks type, title, description, and tags. The OKF draft specification identifies type as the required frontmatter field and describes title, description, resource, tags, and timestamp as useful structured fields.

## Validator behavior
The validator runs in the browser. Pasted Markdown is not uploaded by the validator code in this static MVP.

## Contact
${siteConfig.email}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
