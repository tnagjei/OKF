// input: no runtime input
// output: shared site metadata and public route registry
// pos: root site config (update rule: sync this header and root README when this file changes)
export const siteConfig = {
  name: "Open Knowledge Format Guide",
  shortName: "OKF Guide",
  url: "https://openknowledgeformat.online",
  email: "tangjei414@gmail.com",
  year: "2026",
  owner: "Open Knowledge Format Guide",
  disclaimer:
    "This is an unofficial guide to Open Knowledge Format. It is not affiliated with Google.",
  brandColor: "#0f172a",
  accentColor: "#38bdf8",
  iconTheme: "default",
  analytics: {
    clarityId: "x8c07w7ub7",
    googleAnalyticsId: "G-2MNFZ0VFFM",
    adsenseClient: "ca-pub-3083296102953963"
  }
};

const compareExpansionRoutes = [
  { path: "/compare/okf-vs-agents-md/", label: "OKF vs AGENTS.md", priority: "0.8" },
  { path: "/compare/okf-vs-data-catalog/", label: "OKF vs Data Catalog", priority: "0.8" },
  { path: "/compare/okf-vs-knowledge-graph/", label: "OKF vs Knowledge Graph", priority: "0.8" },
  { path: "/compare/okf-vs-markdown/", label: "OKF vs Markdown", priority: "0.8" }
];

const useCaseRoutes = [
  { path: "/use-cases/okf-for-websites/", label: "OKF for Websites", priority: "0.8" },
  { path: "/use-cases/okf-for-api-docs/", label: "OKF for API Docs", priority: "0.8" },
  { path: "/use-cases/okf-for-saas/", label: "OKF for SaaS", priority: "0.8" },
  { path: "/use-cases/okf-for-data-warehouses/", label: "OKF for Data Warehouses", priority: "0.8" },
  { path: "/use-cases/okf-for-documentation-sites/", label: "OKF for Documentation Sites", priority: "0.8" },
  { path: "/use-cases/okf-for-ai-agents/", label: "OKF for AI Agents", priority: "0.8" },
  { path: "/use-cases/okf-for-seo/", label: "OKF for SEO", priority: "0.8" },
  { path: "/use-cases/okf-for-ai-search/", label: "OKF for AI Search", priority: "0.8" }
];

const templateDetailRoutes = [
  { path: "/templates/website-okf-template/", label: "Website OKF Template", priority: "0.75" },
  { path: "/templates/api-okf-template/", label: "API OKF Template", priority: "0.75" },
  { path: "/templates/saas-okf-template/", label: "SaaS OKF Template", priority: "0.75" },
  { path: "/templates/documentation-okf-template/", label: "Documentation OKF Template", priority: "0.75" },
  { path: "/templates/ai-agent-context-okf-template/", label: "AI Agent Context OKF Template", priority: "0.75" },
  { path: "/templates/data-catalog-okf-template/", label: "Data Catalog OKF Template", priority: "0.75" },
  { path: "/templates/support-playbook-okf-template/", label: "Support Playbook OKF Template", priority: "0.75" },
  { path: "/templates/product-docs-okf-template/", label: "Product Docs OKF Template", priority: "0.75" },
  { path: "/templates/runbook-okf-template/", label: "Runbook OKF Template", priority: "0.75" },
  { path: "/templates/metrics-okf-template/", label: "Metrics OKF Template", priority: "0.75" }
];

const guideRoutes = [
  { path: "/guides/how-to-create-an-okf-bundle/", label: "Create an OKF Bundle", priority: "0.75" },
  { path: "/guides/how-to-validate-okf-files/", label: "Validate OKF Files", priority: "0.75" },
  { path: "/guides/validate-okf-bundle/", label: "Validate OKF Bundle", priority: "0.75" },
  { path: "/guides/how-to-add-yaml-frontmatter-for-okf/", label: "Add YAML Frontmatter for OKF", priority: "0.75" },
  { path: "/guides/how-to-link-okf-concept-files/", label: "Link OKF Concept Files", priority: "0.75" },
  { path: "/guides/how-to-use-okf-with-rag/", label: "Use OKF with RAG", priority: "0.75" },
  { path: "/guides/how-to-use-okf-with-mcp/", label: "Use OKF with MCP", priority: "0.75" },
  { path: "/guides/how-to-convert-markdown-to-okf/", label: "Convert Markdown to OKF", priority: "0.75" },
  { path: "/guides/how-to-create-okf-for-a-website/", label: "Create OKF for a Website", priority: "0.75" },
  { path: "/guides/how-to-create-okf-for-api-docs/", label: "Create OKF for API Docs", priority: "0.75" },
  { path: "/guides/openapi-to-okf/", label: "OpenAPI to OKF", priority: "0.75" },
  { path: "/guides/common-okf-validation-errors/", label: "Common OKF Validation Errors", priority: "0.75" }
];

export const publicRoutes = [
  { path: "/", label: "Home", priority: "1.0", lastmod: "2026-06-25" },
  { path: "/what-is-okf/", label: "What is OKF", priority: "0.9", lastmod: "2026-06-25" },
  { path: "/okf-tutorial/", label: "OKF Tutorial", priority: "0.9" },
  { path: "/okf-examples/", label: "OKF Examples", priority: "0.9" },
  { path: "/okf-templates/", label: "OKF Templates", priority: "0.9", lastmod: "2026-06-25" },
  { path: "/okf-validator/", label: "OKF Validator", priority: "0.9", lastmod: "2026-06-25" },
  { path: "/okf-folder-validator/", label: "OKF Folder Validator", priority: "0.85", lastmod: "2026-06-25" },
  { path: "/compare/okf-vs-mcp/", label: "OKF vs MCP", priority: "0.8" },
  { path: "/compare/okf-vs-rag/", label: "OKF vs RAG", priority: "0.8", lastmod: "2026-06-25" },
  { path: "/compare/okf-vs-llms-txt/", label: "OKF vs llms.txt", priority: "0.8" },
  { path: "/compare/okf-vs-openapi/", label: "OKF vs OpenAPI", priority: "0.8" },
  ...compareExpansionRoutes,
  ...useCaseRoutes,
  ...templateDetailRoutes,
  ...guideRoutes,
  { path: "/about/", label: "About", priority: "0.6" },
  { path: "/contact/", label: "Contact", priority: "0.6" },
  { path: "/privacy/", label: "Privacy", priority: "0.5" },
  { path: "/terms/", label: "Terms", priority: "0.5" }
];

export const mainNav = [
  { href: "/what-is-okf/", label: "What is OKF" },
  { href: "/okf-tutorial/", label: "Tutorial" },
  { href: "/okf-examples/", label: "Examples" },
  { href: "/okf-templates/", label: "Templates" },
  { href: "/okf-validator/", label: "Validator" }
];
