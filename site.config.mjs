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

export const publicRoutes = [
  { path: "/", label: "Home", priority: "1.0" },
  { path: "/what-is-okf/", label: "What is OKF", priority: "0.9" },
  { path: "/okf-tutorial/", label: "OKF Tutorial", priority: "0.9" },
  { path: "/okf-examples/", label: "OKF Examples", priority: "0.9" },
  { path: "/okf-templates/", label: "OKF Templates", priority: "0.9" },
  { path: "/okf-validator/", label: "OKF Validator", priority: "0.9" },
  { path: "/compare/okf-vs-mcp/", label: "OKF vs MCP", priority: "0.8" },
  { path: "/compare/okf-vs-rag/", label: "OKF vs RAG", priority: "0.8" },
  { path: "/compare/okf-vs-llms-txt/", label: "OKF vs llms.txt", priority: "0.8" },
  { path: "/compare/okf-vs-openapi/", label: "OKF vs OpenAPI", priority: "0.8" },
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
