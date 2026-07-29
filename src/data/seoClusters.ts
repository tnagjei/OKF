// input: no runtime input
// output: SEO cluster page data for comparisons, use cases, templates, and guides
// pos: SEO content data layer (update rule: sync this header and src/data README when this file changes)
import type { ComparePage } from "./content";

export type ClusterSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
  code?: {
    label: string;
    value: string;
  };
  video?: {
    embedUrl: string;
    originalUrl: string;
    title: string;
    fallbackText: string;
    note: string;
  };
};

export type ClusterPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  conclusion?: string;
  sections: ClusterSection[];
  faq?: {
    question: string;
    answer: string;
  }[];
  related?: {
    label: string;
    href: string;
    note: string;
  }[];
  cta?: {
    heading: string;
    text: string;
    label: string;
    href: string;
  };
};

function okfDocument(type: string, title: string, description: string, resource: string, tags: string[]) {
  return `---
type: ${type}
title: ${title}
description: ${description}
resource: ${resource}
tags: [${tags.join(", ")}]
timestamp: 2026-06-21T00:00:00Z
---

# Purpose

Explain the stable facts, boundaries, owner notes, and related links for this concept.

# Links

- Validator: https://openknowledgeformat.online/okf-validator/
- Examples: https://openknowledgeformat.online/okf-examples/`;
}

// 智能截断：超长时优先在空格处截断，不斩断英文单词，最后保留省略号
function clampSmart(text: string, max: number): string {
  if (text.length <= max) return text;
  
  const limit = max - 1; // 留 1 个字符位给省略号
  const sliced = text.slice(0, limit);
  const lastSpace = sliced.lastIndexOf(" ");
  
  if (lastSpace > 0) {
    return `${sliced.slice(0, lastSpace).trimEnd()}…`;
  }
  return `${sliced.trimEnd()}…`;
}

// SEO 长度约束：title ≤ 60，description ≤ 160
// 设计意图：内容来自模板拼接，经常超限；在边界处干净截断并补省略号，保持语义完整
function clampTitle(text: string, max = 60): string {
  return clampSmart(text, max);
}

function clampDesc(text: string, max = 160): string {
  return clampSmart(text, max);
}

const relatedCore = [
  { label: "OKF Validator", href: "/okf-validator/", note: "Check required guide-profile fields before publishing." },
  { label: "OKF Templates", href: "/okf-templates/", note: "Copy starter Markdown and YAML frontmatter patterns." },
  { label: "OKF Examples", href: "/okf-examples/", note: "Review bundle structures before creating your own." }
];

const compareSpecs = [
  {
    slug: "okf-vs-agents-md",
    other: "AGENTS.md",
    otherLabel: "AGENTS.md",
    title: "OKF vs AGENTS.md: Knowledge Bundles and Agent Instructions",
    description: "Compare OKF with AGENTS.md: OKF packages reusable knowledge, while AGENTS.md gives coding agents repository-specific instructions.",
    conclusion: "Use AGENTS.md to instruct a coding agent inside a repo; use OKF to package reusable knowledge that can outlive one coding session.",
    what: "AGENTS.md is commonly used to tell coding agents how to work in a repository: commands, style rules, safety boundaries, and project-specific conventions.",
    where: ["Repository setup notes for coding agents.", "Build, test, commit, and review instructions.", "Local workflow constraints that should apply while editing code."],
    differences: ["OKF models knowledge concepts; AGENTS.md models agent behavior in a repo.", "OKF can be shared as a bundle; AGENTS.md is usually tied to one codebase.", "OKF files can describe products, docs, data, and support; AGENTS.md focuses on how an agent should operate."],
    together: "Yes. AGENTS.md can tell an agent to read a local OKF bundle before changing docs, support content, or data catalog files.",
    workflow: ["Create OKF files for product concepts and documentation topics.", "Add AGENTS.md instructions that point coding agents to the OKF folder.", "Ask the agent to validate OKF frontmatter before opening a pull request."],
    faq: [
      ["Should OKF replace AGENTS.md?", "No. They answer different questions."],
      ["Can AGENTS.md reference OKF files?", "Yes. That is a practical way to route an agent toward maintained context."],
      ["Should secrets go in either file?", "No. Keep credentials and private customer data out of both."]
    ]
  },
  {
    slug: "okf-vs-data-catalog",
    other: "Data catalog",
    otherLabel: "Data Catalog",
    title: "OKF vs Data Catalog: Lightweight Knowledge and Data Inventory",
    description: "Compare OKF and data catalogs: OKF packages readable concept files, while data catalogs inventory datasets, ownership, lineage, and governance.",
    conclusion: "Use a data catalog for governed data inventory; use OKF to write portable explanations around tables, metrics, dashboards, and data workflows.",
    what: "A data catalog inventories datasets and metadata such as owners, schema, lineage, classifications, freshness, and governance state.",
    where: ["Enterprise table discovery and stewardship.", "Data governance, ownership, lineage, and compliance workflows.", "Warehouse, lakehouse, BI, and metric inventory programs."],
    differences: ["A data catalog is usually a platform or managed system; OKF can be a Git-friendly file bundle.", "A data catalog is strong at inventory and governance state; OKF is strong at readable explanations and linked context.", "OKF can describe why a metric matters even when the catalog stores where the table lives."],
    together: "Yes. OKF can reference catalog assets and add human-readable notes for metrics, dashboards, and agent context.",
    workflow: ["Export or identify important tables and dashboards from the catalog.", "Create OKF concept files for high-use datasets and metrics.", "Link each OKF file back to the catalog resource and owner."],
    faq: [
      ["Is OKF a data catalog replacement?", "No. It can supplement a catalog, but it does not replace governance workflows."],
      ["Can OKF describe metrics?", "Yes, if the file states formula, grain, exclusions, and owner."],
      ["Should all warehouse tables become OKF files?", "No. Start with tables that users or agents frequently query."]
    ]
  },
  {
    slug: "okf-vs-knowledge-graph",
    other: "Knowledge graph",
    otherLabel: "Knowledge Graph",
    title: "OKF vs Knowledge Graph: Files and Connected Entities",
    description: "Compare OKF and knowledge graphs: OKF uses readable files, while knowledge graphs model entities and relationships for richer querying.",
    conclusion: "Use OKF when you need maintainable knowledge files; use a knowledge graph when relationship querying is the main problem.",
    what: "A knowledge graph represents entities and relationships in a graph model so systems can query how concepts connect.",
    where: ["Entity relationship modeling.", "Semantic search, recommendations, and relationship traversal.", "Domains where relationship precision matters more than file portability."],
    differences: ["OKF is file-based and editor-friendly; a knowledge graph is model-based and query-oriented.", "OKF can be reviewed in Markdown; a graph often needs schema, ingestion, and graph tooling.", "OKF links are useful, but they are not the same as typed graph edges."],
    together: "Yes. OKF files can seed graph nodes, and graph IDs can be written back into OKF frontmatter or body links.",
    workflow: ["Write OKF concept files for stable entities.", "Add links or identifiers for related entities.", "Import reviewed OKF metadata into graph tooling when relationship queries are needed."],
    faq: [
      ["Can OKF create a knowledge graph?", "It can provide curated source files, but graph modeling still needs schema and ingestion."],
      ["Which is simpler to start?", "OKF is usually simpler because it starts with Markdown files."],
      ["When does a graph become worth it?", "When typed relationships and graph queries are core to the use case."]
    ]
  },
  {
    slug: "okf-vs-markdown",
    other: "Markdown",
    otherLabel: "Markdown",
    title: "OKF vs Markdown: Structured Knowledge and Plain Text",
    description: "Compare OKF and Markdown: Markdown is the writing format, while OKF adds frontmatter, fields, and bundle conventions around Markdown.",
    conclusion: "OKF is not a replacement for Markdown; it is a structured way to use Markdown for agent-readable knowledge bundles.",
    what: "Markdown is a lightweight text format for headings, lists, links, code, and tables. OKF builds on that readability with frontmatter and bundle patterns.",
    where: ["Plain documentation and notes.", "Git-based content editing.", "Static sites, READMEs, and developer docs."],
    differences: ["Markdown alone does not require `type`, `title`, `description`, or `tags`; OKF uses frontmatter fields for discovery.", "Markdown can be one long page; OKF favors one concept per file.", "OKF adds bundle conventions so files can be scanned and linked predictably."],
    together: "Yes. OKF uses Markdown as the body format and adds metadata at the top.",
    workflow: ["Take an existing Markdown page.", "Add YAML frontmatter with type, title, description, resource, tags, and timestamp.", "Split broad pages into concept files and validate them."],
    faq: [
      ["Is every Markdown file OKF?", "No. It needs the OKF-style metadata and concept boundary."],
      ["Can I convert Markdown to OKF?", "Yes, but you still need to choose type, title, description, tags, and links."],
      ["Does OKF require a database?", "No. A folder of Markdown files can be enough for a first bundle."]
    ]
  }
];

export const seoComparePages: Record<string, ComparePage> = Object.fromEntries(
  compareSpecs.map((spec) => [
    spec.slug,
    {
      path: `/compare/${spec.slug}/`,
      title: clampTitle(spec.title),
      description: clampDesc(spec.description),
      h1: `OKF vs ${spec.otherLabel}`,
      eyebrow: "Comparison",
      intro: spec.conclusion,
      summaryRows: [
        { label: "One-sentence conclusion", okf: "Packages reusable Markdown knowledge files with frontmatter.", other: spec.conclusion },
        { label: "What it is", okf: "A draft format for structured knowledge bundles.", other: spec.what },
        { label: "Where it fits", okf: "Portable docs, API context, data notes, support playbooks, and agent context.", other: spec.where[0] },
        { label: "Use together?", okf: "Can link to or describe the other artifact.", other: spec.together }
      ],
      sections: [
        { heading: "One-sentence conclusion", paragraphs: [spec.conclusion] },
        { heading: "What it is", paragraphs: [spec.what] },
        { heading: "Where it fits", bullets: spec.where },
        { heading: "Key differences", bullets: spec.differences },
        { heading: "Can they work together", paragraphs: [spec.together] },
        { heading: "Example workflow", bullets: spec.workflow },
        {
          heading: "FAQ",
          subsections: spec.faq.map(([heading, text]) => ({ heading, text }))
        },
        {
          heading: "Related pages",
          bullets: [
            '<a href="/okf-validator/">OKF Validator</a> for checking frontmatter.',
            '<a href="/okf-templates/">OKF Templates</a> for starter files.',
            '<a href="/okf-examples/">OKF Examples</a> for bundle patterns.'
          ]
        }
      ]
    }
  ])
);

const useCaseSpecs = [
  {
    slug: "okf-for-websites",
    name: "websites",
    user: "SEO teams, site owners, and content engineers managing public pages.",
    why: "They need a cleaner way to turn important pages into agent-readable summaries without scraping the whole site every time.",
    inputs: ["Canonical website URLs.", "Page titles, summaries, FAQs, product claims, and source links.", "Privacy, support, pricing, and feature pages."],
    output: "A website OKF bundle with one file per important URL plus an index file.",
    template: ["/templates/website-okf-template/", "Website OKF template"],
    type: "Website Page",
    sampleTitle: "Pricing Page",
    sampleDescription: "Explains pricing tiers, limits, refunds, and upgrade rules.",
    tags: ["website", "seo", "pricing"],
    mistakes: ["Copying raw HTML instead of reviewed facts.", "Using one OKF file for the entire website.", "Forgetting canonical resource URLs."]
  },
  {
    slug: "okf-for-api-docs",
    name: "API docs",
    user: "Developer relations, API platform, and integration teams.",
    why: "They need context around endpoints that OpenAPI contracts and reference docs may not explain fully.",
    inputs: ["OpenAPI files or API reference URLs.", "Endpoint examples, limits, auth notes, and error handling.", "Owner notes and support escalation rules."],
    output: "An API OKF bundle with endpoint files and shared reference files.",
    template: ["/templates/api-okf-template/", "API OKF template"],
    type: "API Endpoint",
    sampleTitle: "Create customer endpoint",
    sampleDescription: "Documents endpoint purpose, request fields, response notes, and related support rules.",
    tags: ["api", "openapi", "endpoint"],
    mistakes: ["Treating OKF as an API contract validator.", "Skipping errors and rate limits.", "Mixing many endpoints into one file."]
  },
  {
    slug: "okf-for-saas",
    name: "SaaS",
    user: "Product, growth, support, and customer success teams at software companies.",
    why: "They need shared definitions for plans, roles, billing rules, feature gates, and customer workflows.",
    inputs: ["Product docs, pricing rules, feature lists, support policies, and lifecycle notes.", "Definitions for accounts, workspaces, users, seats, and plans."],
    output: "A SaaS OKF bundle that defines durable product concepts and links them to docs and support playbooks.",
    template: ["/templates/saas-okf-template/", "SaaS OKF template"],
    type: "SaaS Product Concept",
    sampleTitle: "Workspace seats",
    sampleDescription: "Defines how seats are counted, billed, removed, and reviewed.",
    tags: ["saas", "billing", "workspace"],
    mistakes: ["Writing marketing copy instead of operational rules.", "Skipping plan exclusions.", "Not linking support workflows."]
  },
  {
    slug: "okf-for-data-warehouses",
    name: "data warehouses",
    user: "Analytics engineers, data stewards, BI teams, and AI data consumers.",
    why: "They need readable context around tables, metrics, dashboards, freshness, and data grain.",
    inputs: ["Table schemas, metric definitions, dashboard URLs, lineage notes, and owner records."],
    output: "A data warehouse OKF bundle with table, metric, dashboard, and runbook files.",
    template: ["/templates/data-catalog-okf-template/", "Data Catalog OKF template"],
    type: "Data Table",
    sampleTitle: "Orders fact table",
    sampleDescription: "One row per submitted order with revenue, customer, and fulfillment fields.",
    tags: ["data", "warehouse", "orders"],
    mistakes: ["Leaving out grain and freshness.", "Using dashboard names as metric definitions.", "Putting private credentials in files."]
  },
  {
    slug: "okf-for-documentation-sites",
    name: "documentation sites",
    user: "Technical writers, docs engineers, support content owners, and developer educators.",
    why: "They need task, concept, reference, and troubleshooting pages to become easier for agents to scan and link.",
    inputs: ["Docs IA, Markdown pages, tutorials, troubleshooting pages, and API reference links."],
    output: "A documentation OKF bundle split by concept, task, reference, and troubleshooting file.",
    template: ["/templates/documentation-okf-template/", "Documentation OKF template"],
    type: "Documentation Topic",
    sampleTitle: "Import contacts from CSV",
    sampleDescription: "Guides admins through CSV preparation, upload, validation, and rollback.",
    tags: ["docs", "tutorial", "csv"],
    mistakes: ["Converting a long manual into one file.", "Skipping prerequisites.", "Not linking troubleshooting topics."]
  },
  {
    slug: "okf-for-seo",
    name: "SEO",
    user: "SEO teams, content strategists, and site operators adapting content for AI-readable discovery.",
    why: "They need a controlled way to summarize important pages without claiming ranking guarantees.",
    inputs: ["Canonical pages, title and description data, FAQs, citations, update dates, and internal links."],
    output: "An SEO OKF bundle that maps important pages into reviewed concept files.",
    template: ["/templates/website-okf-template/", "Website OKF template"],
    type: "Website Page",
    sampleTitle: "OKF Validator landing page",
    sampleDescription: "Summarizes the validator page, privacy promise, and internal links.",
    tags: ["seo", "website", "ai-search"],
    mistakes: ["Keyword stuffing.", "Claiming guaranteed AI visibility.", "Creating files for thin or outdated pages."]
  },
  {
    slug: "okf-for-ai-search",
    name: "AI search",
    user: "Search, content, and product teams preparing structured material for AI answer systems.",
    why: "They need pages and concepts to be easier to identify, cite, and review before retrieval or indexing.",
    inputs: ["High-value pages, summaries, citations, examples, and related page maps."],
    output: "An AI search OKF bundle with concise concept files and links back to canonical pages.",
    template: ["/templates/website-okf-template/", "Website OKF template"],
    type: "Website Page",
    sampleTitle: "AI-readable OKF guide",
    sampleDescription: "Packages a page summary, source boundary, examples, and related resources.",
    tags: ["ai-search", "content", "okf"],
    mistakes: ["Treating OKF as an AI citation guarantee.", "Publishing unverified claims.", "Failing to keep files current."]
  }
];

export const useCasePages: Record<string, ClusterPage> = Object.fromEntries(
  useCaseSpecs.map((spec) => [
    spec.slug,
    {
      path: `/use-cases/${spec.slug}/`,
      title: clampTitle(`OKF for ${spec.name}: Use Case`),
      description: clampDesc(`Learn how to use OKF for ${spec.name}, including inputs, output bundle shape, a minimum example, template choice, and common mistakes.`),
      h1: `OKF for ${spec.name}`,
      eyebrow: "Use case",
      intro: `A practical guide for using Open Knowledge Format with ${spec.name}.`,
      conclusion: `Use OKF for ${spec.name} when you need reviewed Markdown concept files with metadata, links, and clear ownership.`,
      sections: [
        { heading: "User", paragraphs: [spec.user] },
        { heading: "Why this user needs OKF", paragraphs: [spec.why] },
        { heading: "Input materials", bullets: spec.inputs },
        {
          heading: "Output OKF bundle",
          paragraphs: [spec.output],
          table: {
            headers: ["Folder", "Purpose"],
            rows: [
              ["index.md", "Explains the bundle scope and links to important files."],
              ["concepts/", "Stores stable concepts, pages, endpoints, tables, or workflows."],
              ["references/", "Stores supporting policies, source links, and shared definitions."]
            ]
          }
        },
        {
          heading: "Minimum example",
          code: {
            label: `${spec.name} minimum OKF example`,
            value: okfDocument(spec.type, spec.sampleTitle, spec.sampleDescription, `https://openknowledgeformat.online/use-cases/${spec.slug}/`, spec.tags)
          }
        },
        {
          heading: "Recommended template",
          paragraphs: [`Start with the <a href="${spec.template[0]}">${spec.template[1]}</a>, then replace sample fields with your own source material.`]
        },
        { heading: "Common mistakes", bullets: spec.mistakes }
      ],
      faq: [
        { question: `Should every ${spec.name} asset become an OKF file?`, answer: "No. Start with high-value, stable, frequently reused knowledge." },
        { question: "Can this work with existing Markdown?", answer: "Yes. Add OKF frontmatter, split broad pages, and validate the result." }
      ],
      related: [
        { label: spec.template[1], href: spec.template[0], note: "Use this as the first implementation pattern." },
        { label: "OKF Validator", href: "/okf-validator/", note: "Check the frontmatter before publishing." },
        { label: "OKF Examples", href: "/okf-examples/", note: "Compare bundle shapes before creating files." }
      ],
      cta: {
        heading: "Next step",
        text: "Copy a template, create one file, and validate it before expanding the bundle.",
        label: "Open OKF Validator",
        href: "/okf-validator/"
      }
    }
  ])
);

const templateRelatedMap: Record<string, { label: string; href: string; note: string }[]> = {
  "website-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "Product Docs OKF template", href: "/templates/product-docs-okf-template/", note: "Use for feature detail files." },
    { label: "OKF for websites", href: "/use-cases/okf-for-websites/", note: "Study the full website catalog use case." }
  ],
  "api-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "AI Agent Context OKF template", href: "/templates/ai-agent-context-okf-template/", note: "Use for tools routing details." },
    { label: "OKF for API docs", href: "/use-cases/okf-for-api-docs/", note: "Read the full API catalog integration guide." }
  ],
  "saas-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "Support Playbook OKF template", href: "/templates/support-playbook-okf-template/", note: "Use for triage escalation playbooks." },
    { label: "OKF for SaaS", href: "/use-cases/okf-for-saas/", note: "Understand workspaces and role modeling." }
  ],
  "documentation-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "Product Docs OKF template", href: "/templates/product-docs-okf-template/", note: "Use for product and limit guides." },
    { label: "OKF for documentation sites", href: "/use-cases/okf-for-documentation-sites/", note: "Learn how to structure public developer documentation." }
  ],
  "ai-agent-context-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "API OKF template", href: "/templates/api-okf-template/", note: "Use for model endpoint routing rules." },
    { label: "OKF for AI agents", href: "/use-cases/okf-for-ai-agents/", note: "Expose structured context through MCP." }
  ],
  "data-catalog-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "Metrics OKF template", href: "/templates/metrics-okf-template/", note: "Use for formulas and dashboard descriptions." },
    { label: "OKF for data warehouses", href: "/use-cases/okf-for-data-warehouses/", note: "Organize metrics and tables for data consumers." }
  ],
  "support-playbook-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "SaaS OKF template", href: "/templates/saas-okf-template/", note: "Use for account rules and billing limits." },
    { label: "Common OKF errors", href: "/guides/common-okf-validation-errors/", note: "Fix frontmatter mistakes before indexing." }
  ],
  "product-docs-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "Documentation OKF template", href: "/templates/documentation-okf-template/", note: "Use for CSV import templates." },
    { label: "Create an OKF bundle", href: "/guides/how-to-create-an-okf-bundle/", note: "Create a support bundle from scratch." }
  ],
  "runbook-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "Support Playbook OKF template", href: "/templates/support-playbook-okf-template/", note: "Use for escalation guidelines." },
    { label: "Validate OKF files", href: "/guides/how-to-validate-okf-files/", note: "Learn how to inspect concepts before deployment." }
  ],
  "metrics-okf-template": [
    relatedCore[0],
    relatedCore[1],
    { label: "Data Catalog OKF template", href: "/templates/data-catalog-okf-template/", note: "Use for dataset descriptions." },
    { label: "OKF for data warehouses", href: "/use-cases/okf-for-data-warehouses/", note: "Define tables and schemas for consumers." }
  ]
};

const templateSpecs = [
  ["website-okf-template", "Website OKF template", "Website Page", "Website teams turning important public URLs into reviewed knowledge files.", "Teams that need raw HTML archives or CMS migrations."],
  ["api-okf-template", "API OKF template", "API Endpoint", "API teams documenting endpoint context around OpenAPI contracts.", "Teams looking for schema validation or client generation."],
  ["saas-okf-template", "SaaS OKF template", "SaaS Product Concept", "SaaS teams documenting plans, roles, limits, and product objects.", "Teams only writing short marketing blurbs."],
  ["documentation-okf-template", "Documentation OKF template", "Documentation Topic", "Docs teams splitting tasks, concepts, references, and troubleshooting pages.", "Teams that want one huge page for every topic."],
  ["ai-agent-context-okf-template", "AI Agent Context OKF template", "Agent Context", "Agent builders packaging scope, boundaries, and escalation rules.", "Teams trying to store secrets or private user data in context files."],
  ["data-catalog-okf-template", "Data Catalog OKF template", "Data Table", "Data teams documenting table grain, freshness, owners, and metric context.", "Teams replacing a governed catalog workflow."],
  ["support-playbook-okf-template", "Support Playbook OKF template", "Support Playbook", "Support teams documenting triage steps, evidence, boundaries, and escalation.", "Teams that need ticket system automation only."],
  ["product-docs-okf-template", "Product Docs OKF template", "Product Documentation", "Product and docs teams explaining features, limits, and user-facing rules.", "Teams writing release notes with no durable concept boundary."],
  ["runbook-okf-template", "Runbook OKF template", "Operational Runbook", "Operations teams documenting repeatable procedures and rollback paths.", "Teams that need live incident tooling rather than static context."],
  ["metrics-okf-template", "Metrics OKF template", "Metric Definition", "Analytics teams documenting formulas, grain, exclusions, and dashboards.", "Teams using dashboard labels as metric definitions."]
];

export const templateDetailPages: Record<string, ClusterPage> = Object.fromEntries(
  templateSpecs.map(([slug, label, type, fit, notFit], index) => {
    const tag = slug.replace("-okf-template", "").replaceAll("-", "-");
    const code = okfDocument(type, label.replace(" template", ""), `Starter ${type.toLowerCase()} file with owner notes, links, and review fields.`, `https://openknowledgeformat.online/templates/${slug}/`, ["okf", tag, "template"]);
    return [
      slug,
      {
        path: `/templates/${slug}/`,
        title: clampTitle(`${label}: OKF Template Example`),
        description: clampDesc(`Copy the ${label}, review field explanations, compare good and bad examples, and validate the file with the OKF validator.`),
        h1: label,
        eyebrow: "Template detail",
        intro: `Use this copyable ${label} when a single concept needs stable frontmatter, readable Markdown, and links to related knowledge.`,
        sections: [
          { heading: "Who this template fits", bullets: [fit, "Teams that need portable Markdown files with searchable frontmatter.", "Editors who can review source links and update timestamps."] },
          { heading: "Who should not use it", bullets: [notFit, "Teams that need a database-backed workflow before they have stable source material.", "Anyone trying to publish private keys, secrets, or confidential customer data."] },
          { heading: "Copyable template", code: { label, value: code } },
          {
            heading: "Field explanations",
            table: {
              headers: ["Field", "How to fill it"],
              rows: [
                ["type", `Use a precise label such as <code>${type}</code>.`],
                ["title", "Use a human-readable concept name, not only a file name."],
                ["description", "Write one sentence that explains the concept and boundary."],
                ["resource", "Point to a canonical URL, stable URN, or source asset."],
                ["tags", "Use short labels for routing and filtering."]
              ]
            }
          },
          { heading: "Correct example", code: { label: "Correct OKF example", value: code } },
          {
            heading: "Incorrect example",
            code: {
              label: "Incorrect OKF example",
              value: `---
title: ${label}
---

# Notes

This file is missing type, description, tags, resource, and a clear concept boundary.`
            }
          },
          {
            heading: "Validate with OKF Validator",
            steps: [
              "Copy the template.",
              "Replace title, description, resource, tags, and body content.",
              'Paste the file into the <a href="/okf-validator/">OKF Validator</a>.',
              "Fix errors first, then review warnings and source accuracy."
            ]
          }
        ],
        faq: [
          { question: "Can I publish the template unchanged?", answer: "No. Replace sample resource links, tags, and body content first." },
          { question: "Does validation prove the content is correct?", answer: "No. Validation checks structure; humans still need to review facts and sources." }
        ],
        related: templateRelatedMap[slug] || relatedCore,

        cta: {
          heading: "Check this template",
          text: "Paste your edited file into the validator before adding it to a bundle.",
          label: "Validate OKF file",
          href: "/okf-validator/"
        }
      }
    ];
  })
);

const guideSpecs = [
  {
    slug: "how-to-create-an-okf-bundle",
    h1: "How to create an OKF bundle",
    conclusion: "Create an OKF bundle by choosing a narrow scope, writing one concept per file, adding frontmatter, and linking files from an index.",
    sampleType: "Knowledge Bundle",
    sampleTitle: "Website support bundle",
    sampleDescription: "Indexes support pages, policies, and contact workflows.",
    steps: ["Choose one bundle scope.", "Create an index.md file.", "Add one concept file per page, endpoint, policy, or table.", "Validate frontmatter.", "Review sources and publish."]
  },
  {
    slug: "how-to-validate-okf-files",
    h1: "How to validate OKF files",
    conclusion: "Validate OKF files by checking frontmatter first, then reviewing body headings, links, and source accuracy.",
    sampleType: "Validation Example",
    sampleTitle: "Validator-ready OKF file",
    sampleDescription: "Shows the minimum fields used by this guide profile.",
    steps: ["Open the validator.", "Paste one Markdown file.", "Fix missing type, title, description, or tags.", "Review warnings.", "Recheck after editing."]
  },
  {
    slug: "how-to-add-yaml-frontmatter-for-okf",
    h1: "How to add YAML frontmatter for OKF",
    conclusion: "Add YAML frontmatter by placing a metadata block at the top of the Markdown file before the first heading.",
    sampleType: "Documentation Topic",
    sampleTitle: "Add YAML frontmatter",
    sampleDescription: "Explains required and recommended metadata fields.",
    steps: ["Start the file with ---.", "Add type, title, description, resource, tags, and timestamp.", "Close the block with ---.", "Write the Markdown body.", "Validate the file."]
  },
  {
    slug: "how-to-link-okf-concept-files",
    h1: "How to link OKF concept files",
    conclusion: "Link OKF concept files with ordinary Markdown links and keep each link tied to a clear relationship.",
    sampleType: "Concept Link",
    sampleTitle: "Pricing and refund policy links",
    sampleDescription: "Shows how one OKF file links to related policy and support files.",
    steps: ["List related concepts.", "Use relative Markdown links inside the body.", "Avoid unrelated link blocks.", "Add source URLs when needed.", "Check links during review."]
  },
  {
    slug: "how-to-use-okf-with-rag",
    h1: "How to use OKF with RAG",
    conclusion: "Use OKF with RAG by cleaning source files before indexing them for retrieval.",
    sampleType: "RAG Source Document",
    sampleTitle: "Support policy source file",
    sampleDescription: "Prepares a support policy for retrieval with frontmatter and clear sections.",
    steps: ["Create OKF files for stable source concepts.", "Keep one concept per file.", "Index files with tags and titles.", "Evaluate retrieved chunks.", "Update stale files before reindexing."]
  },
  {
    slug: "how-to-use-okf-with-mcp",
    h1: "How to use OKF with MCP",
    conclusion: "Use OKF with MCP by storing knowledge as files and exposing read, search, or validation actions through MCP tools.",
    sampleType: "Agent Context",
    sampleTitle: "MCP-readable OKF context",
    sampleDescription: "Packages agent context that can be exposed through an MCP server.",
    steps: ["Store OKF files in a predictable folder.", "Expose read or search through MCP.", "Return small relevant files.", "Keep tool actions separate from knowledge files.", "Validate updated files."]
  },
  {
    slug: "how-to-convert-markdown-to-okf",
    h1: "How to convert Markdown to OKF",
    conclusion: "Convert Markdown to OKF by adding frontmatter, splitting broad pages, and linking related concepts.",
    sampleType: "Markdown Conversion",
    sampleTitle: "Converted Markdown page",
    sampleDescription: "Shows a Markdown page after adding OKF metadata.",
    steps: ["Find the concept boundary.", "Add YAML frontmatter.", "Rewrite vague headings.", "Add resource and tags.", "Validate the result."]
  },
  {
    slug: "how-to-create-okf-for-api-docs",
    h1: "How to create OKF for API docs",
    conclusion: "Create OKF for API docs by keeping OpenAPI as the contract and adding OKF files for endpoint context.",
    sampleType: "API Endpoint",
    sampleTitle: "List invoices endpoint",
    sampleDescription: "Explains endpoint purpose, filters, limits, and related billing rules.",
    steps: ["Start from the API reference.", "Create one OKF file per endpoint or API area.", "Link the OpenAPI resource.", "Add examples and errors.", "Validate frontmatter."]
  }
];

export const guidePages: Record<string, ClusterPage> = Object.fromEntries(
  guideSpecs.map((spec) => [
    spec.slug,
    {
      path: `/guides/${spec.slug}/`,
      title: `${spec.h1}: OKF Guide`,
      description: clampDesc(spec.conclusion),
      h1: spec.h1,
      eyebrow: "How-to guide",
      intro: spec.conclusion,
      conclusion: spec.conclusion,
      sections: [
        { heading: "Prerequisites", bullets: ["A Markdown file or source page to convert.", "A clear concept boundary.", "A canonical source URL or stable resource identifier.", "Access to the OKF Validator for structure checks."] },
        { heading: "Step-by-step tutorial", steps: spec.steps },
        { heading: "Copyable example", code: { label: `${spec.h1} example`, value: okfDocument(spec.sampleType, spec.sampleTitle, spec.sampleDescription, `https://openknowledgeformat.online/guides/${spec.slug}/`, ["okf", "guide", "example"]) } },
        { heading: "Common mistakes", bullets: ["Trying to cover too many concepts in one file.", "Leaving metadata blank or vague.", "Treating validation as proof that every claim is correct.", "Publishing private or unreviewed information."] },
        { heading: "Validation method", steps: ['Paste the file into the <a href="/okf-validator/">OKF Validator</a>.', "Fix errors before warnings.", "Check links and source claims manually.", "Add the file to the bundle index."] },
        { heading: "Related page links", bullets: ['<a href="/okf-tutorial/">OKF Tutorial</a> for the full beginner workflow.', '<a href="/okf-examples/">OKF Examples</a> for bundle structures.', '<a href="/okf-templates/">OKF Templates</a> for copyable starting points.'] }
      ],
      faq: [
        { question: "Does this require a database?", answer: "No. A folder of Markdown files is enough for the first version." },
        { question: "Can I automate this?", answer: "You can generate drafts, but owners should review source accuracy and boundaries." }
      ],
      related: [
        { label: "OKF Tutorial", href: "/okf-tutorial/", note: "Use the main tutorial for the full workflow." },
        { label: "OKF Examples", href: "/okf-examples/", note: "Compare bundle structures." },
        { label: "OKF Validator", href: "/okf-validator/", note: "Check the file before publishing." }
      ]
    }
  ])
);

useCasePages["okf-for-ai-agents"] = {
  path: "/use-cases/okf-for-ai-agents/",
  title: "OKF for AI Agents: Portable Context Files and Limits",
  description: "Learn how to use OKF for AI agents with context bundles, workflow files, policy boundaries, validation steps, and source review limits.",
  h1: "OKF for AI agents",
  eyebrow: "Use case",
  intro: "Use OKF for AI agents to package context bundles, workflow files, policy boundaries, and source review limits without mixing tool permissions, authentication, private data, or unsupported claims into the knowledge files.",
  conclusion: "OKF helps agent builders organize context; it does not grant permissions, validate facts, or replace policy and tool-control systems.",
  sections: [
    {
      heading: "What an agent can read from OKF",
      paragraphs: [
        "An AI agent needs context before it can answer, search, route, or decide whether to escalate. OKF can hold that context as Markdown files with predictable metadata.",
        "Keep the boundary clear: OKF is a knowledge package. Tool permissions, authentication, payment actions, deletion actions, and private customer data need separate controls."
      ]
    },
    {
      heading: "Bundle design for agent context",
      table: {
        headers: ["Folder", "Agent use", "Review risk"],
        rows: [
          ["index.md", "Declares scope, owners, and safe use boundaries.", "High if it overstates what the agent may do."],
          ["workflows/", "Stores support, refund, onboarding, or troubleshooting flows.", "High if escalation triggers are missing."],
          ["policies/", "Stores public policy summaries and source links.", "High if policy text is stale or simplified too far."],
          ["references/", "Stores stable product, docs, or API references.", "Medium if source URLs are not canonical."]
        ]
      }
    },
    {
      heading: "Minimum agent context file",
      code: {
        label: "AI agent context OKF example",
        value: okfDocument(
          "Agent Context",
          "Refund support routing",
          "Defines when an agent can answer refund questions and when it must escalate.",
          "https://openknowledgeformat.online/use-cases/okf-for-ai-agents/",
          ["agent", "support", "escalation"]
        )
      }
    },
   {
     heading: "Build a small OKF bundle for an agent",
     steps: [
       "Pick one narrow agent task such as support routing, refund triage, onboarding, or documentation lookup.",
       "Create index.md with scope, owner, safe-use boundaries, and escalation triggers.",
       "Add only the workflows, policies, and references the agent needs for that task.",
       'Validate one file with the <a href="/okf-validator/">OKF Validator</a>, then validate the folder with the <a href="/okf-folder-validator/">OKF Folder Validator</a>.',
       "Review stale context, unsupported policy claims, secrets, private tokens, customer records, and restricted operational notes before using the bundle."
     ]
   },
   {
     heading: "Python SDK and AI agent context consumption example",
     paragraphs: [
       "AI Agent frameworks can inspect OKF YAML metadata to verify `status`, filter out deprecated concepts, and check `stale_after` timestamps before injecting concept body text into agent prompt memory (`verified`)."
     ],
     code: {
       label: "Python AI Agent OKF context parser example",
       value: `# ponytail: parse OKF context bundle for AI Agent prompt assembly
import yaml

def parse_okf_context(markdown_text: str) -> dict:
    parts = markdown_text.split("---", 2)
    if len(parts) < 3:
        return {"metadata": {}, "body": markdown_text.strip(), "agent_ready": False}

    metadata = yaml.safe_load(parts[1]) or {}
    body = parts[2].strip()
    is_ready = (
        metadata.get("type") is not None
        and metadata.get("status") in ["active", "verified", None]
    )
    return {
        "metadata": metadata,
        "body": body,
        "agent_ready": is_ready
    }`
     }
   },
   {
     heading: "Why agents still need reviewed source context",
      steps: [
        'Validate each Markdown file with the <a href="/okf-validator/">single-file OKF Validator</a>.',
        'Validate the local folder with the <a href="/okf-folder-validator/">OKF Folder Validator</a>.',
        "Check every policy, owner, and escalation rule against the source owner.",
        "Remove secrets, personal records, private tokens, and unsupported policy claims.",
        "Revalidate the bundle after every source change."
      ]
    },
    {
      heading: "Visual background",
      paragraphs: [
        "This video is included only as visual background for AI-agent context work. It is not evidence that OKF is officially required by any agent platform."
      ],
      video: {
        embedUrl: "https://www.youtube-nocookie.com/embed/QZCkrFWCVho",
        originalUrl: "https://www.youtube.com/watch?v=QZCkrFWCVho",
        title: "AI agent visual background video",
        fallbackText: "Watch the AI agent background video on YouTube",
        note: "Visual context only; not used as factual proof for OKF claims."
      }
    },
    {
      heading: "OKF is not MCP or RAG",
      paragraphs: [
        "OKF packages reviewed context. MCP connects an agent to tools or resources, while RAG retrieves relevant source material at query time. An OKF bundle can support either workflow, but it does not grant tool access, replace retrieval, or prove that an agent will use the files correctly."
      ],
      bullets: [
        "Do not store credentials, customer records, or private operational notes in OKF files.",
        "Do not write agent instructions that conflict with product policy or legal policy.",
        "Do not treat a valid OKF structure as proof that every answer from an agent will be correct.",
        "Do not skip escalation rules for refunds, account access, billing disputes, or safety-sensitive topics."
      ]
    }
  ],
  faq: [
    { question: "Does OKF make an agent safe?", answer: "No. It can organize context, but safety still depends on policy, tool controls, review, and runtime behavior." },
    { question: "Can OKF replace AGENTS.md?", answer: "No. AGENTS.md usually instructs coding agents inside a repo. OKF packages reusable knowledge concepts." },
    { question: "Should private customer data go into OKF?", answer: "No. Keep private records and secrets outside public or reusable OKF bundles." },
    { question: "Does OKF guarantee better AI citations?", answer: "No. OKF can make context easier to inspect, but it does not guarantee retrieval quality, AI citations, or platform support." }
  ],
  related: [
    { label: "OKF vs MCP", href: "/compare/okf-vs-mcp/", note: "Separate portable context from tool access." },
    { label: "OKF vs RAG", href: "/compare/okf-vs-rag/", note: "Separate source packaging from retrieval." },
    { label: "Use OKF with MCP", href: "/guides/how-to-use-okf-with-mcp/", note: "Connect reviewed context through a tool or resource layer." },
    { label: "OKF Templates", href: "/okf-templates/", note: "Choose a reusable context-file pattern." },
    { label: "OKF Validator", href: "/okf-validator/", note: "Check one context file before bundling." }
  ],
  cta: {
    heading: "Validate before agent use",
    text: "Check the files structurally, then review policy accuracy with the source owner.",
    label: "Open Folder Validator",
    href: "/okf-folder-validator/"
  }
};

guidePages["common-okf-validation-errors"] = {
  path: "/guides/common-okf-validation-errors/",
  title: "Common OKF Validation Errors and How to Fix Them",
  description: "Fix common OKF validation errors including missing simple frontmatter, missing type, invalid tags, missing resource, and broken internal links.",
  h1: "Common OKF validation errors",
  eyebrow: "Validation guide",
  intro: "Most OKF validation problems are structural. Fix frontmatter first, then fields, then links, then source accuracy.",
  conclusion: "A clean validator result means the file shape is easier to review; it does not prove the claims inside the Markdown body are true.",
  sections: [
    {
      heading: "Error table",
      table: {
        headers: ["Error", "Cause", "Fix", "Tool to run"],
        rows: [
          ["Missing simple frontmatter", "The file starts without parseable metadata.", "Start the file with a frontmatter block before the first heading.", '<a href="/okf-validator/">OKF Validator</a>'],
          ["Missing type", "The file has metadata but no concept category.", "Add a clear concept label such as <code>Website Page</code> or <code>API Endpoint</code>.", '<a href="/okf-validator/">OKF Validator</a>'],
          ["Invalid frontmatter", "The metadata shape cannot be parsed predictably.", "Use one simple <code>field: value</code> line per field.", '<a href="/okf-validator/">OKF Validator</a>'],
          ["Tags not array", "Tags are not written as a reusable list.", "Use an inline list such as <code>[okf, validator]</code>.", '<a href="/okf-validator/">OKF Validator</a>'],
          ["Missing resource", "The source cannot be traced from the file.", "Add a canonical URL, URN, or stable source identifier.", '<a href="/guides/validate-okf-bundle/">Bundle checklist</a>'],
          ["Duplicate resource", "Two files may describe the same source.", "Decide whether to merge or split the overlap.", '<a href="/okf-folder-validator/">OKF Folder Validator</a>'],
          ["Broken internal link", "A relative link points outside the selected bundle or to a missing file.", "Check the target file inside the real bundle folder.", '<a href="/okf-folder-validator/">OKF Folder Validator</a>'],
          ["Stale timestamp", "The date may imply a source review that did not happen.", "Update the timestamp only after the source content has materially changed.", '<a href="/guides/validate-okf-bundle/">Bundle checklist</a>']
        ]
      }
    },
    {
      heading: "Fix errors in the right order",
      steps: [
        "Fix fatal parsing errors first, because field checks depend on readable frontmatter.",
        "Add the required <code>type</code> field before tuning optional metadata.",
        "Repair tags, resource, title, and description warnings so previews and indexes stay useful.",
        'Use the <a href="/okf-folder-validator/">OKF Folder Validator</a> after single-file errors are fixed.',
        "Review duplicate resources, broken relative links, and stale timestamps before publishing."
      ]
    },
    {
      heading: "Missing simple frontmatter",
      paragraphs: [
        "OKF files need metadata at the top of the Markdown file. If the file starts directly with a heading, the validator cannot read fields such as type, title, tags, or resource."
      ],
      code: {
        label: "Frontmatter repair",
        value: `---
type: Website Page
title: Contact Page
description: Summarizes the public contact options and support boundaries.
resource: https://openknowledgeformat.online/sample/contact/
tags: [website, support, contact]
timestamp: 2026-06-21T00:00:00Z
---

# Contact Page

Write the reviewed page summary here.`
      }
    },
    {
      heading: "Missing type",
      paragraphs: [
        "The <code>type</code> field tells readers and tools what kind of concept the file describes. Without it, a website page, API endpoint, metric, support playbook, or agent context file all look the same."
      ],
      bullets: ["Use short human-readable labels.", "Do not use a file name as the type.", "Keep similar files consistent across the bundle."]
    },
    {
      heading: "Invalid frontmatter",
      paragraphs: [
        "This guide profile uses a simple frontmatter subset. Each normal field should fit the <code>field: value</code> pattern so the browser validator can read it."
      ],
      table: {
        headers: ["Bad pattern", "Why it fails", "Fix"],
        rows: [
          ["<code>title Contact Page</code>", "Missing colon.", "<code>title: Contact Page</code>"],
          ["<code>tags: okf, website</code>", "Tags are not an inline array.", "<code>tags: [okf, website]</code>"],
          ["<code>resource:</code>", "The source identifier is blank.", "<code>resource: https://openknowledgeformat.online/sample/contact/</code>"]
        ]
      }
    },
    {
      heading: "Tags not array",
      paragraphs: [
        "Tags are easier to scan and filter when they use a predictable list shape. This site expects inline arrays for the guide profile."
      ],
      code: {
        label: "Tag fix",
        value: `tags: [okf, validator, markdown]`
      }
    },
    {
      heading: "Missing resource",
      paragraphs: [
        "The <code>resource</code> field should point to the page, API reference, data asset, or stable identifier the OKF file describes. This makes source review and stale-content checks possible."
      ],
      bullets: ["Use canonical public URLs when possible.", "Use stable internal identifiers for private assets.", "Do not point every file to the homepage."]
    },
    {
      heading: "Broken internal link",
      paragraphs: [
        "Relative Markdown links are useful inside bundles, but single-file paste validation cannot prove that the target file exists. Use folder validation for this check."
      ],
      steps: [
        'Open the <a href="/okf-folder-validator/">OKF Folder Validator</a>.',
        "Select the local folder that contains the Markdown files.",
        "Review unresolved relative links in the validation output.",
        "Fix paths or add missing target files."
      ]
    },
    {
      heading: "Link and resource errors",
      bullets: [
        "Duplicate resources usually mean two files describe the same source.",
        "Broken relative links mean the target file is missing, renamed, or outside the selected bundle.",
        'Use the <a href="/okf-folder-validator/">OKF Folder Validator</a> to check both cases together.'
      ]
    },
    {
      heading: "Folder structure errors",
      bullets: [
        "A missing <code>index.md</code> weakens bundle discovery.",
        "A bundle with no Markdown files has no useful OKF content to validate.",
        "Keep generated drafts out of published folders until a source owner reviews them."
      ]
    },
    {
      heading: "Wrong timestamp format",
      paragraphs: [
        "Use a machine-readable timestamp so reviewers can identify freshness. This site uses ISO-style timestamps such as <code>2026-06-21T00:00:00Z</code> in examples."
      ]
    },
    {
      heading: "Validation is not fact-checking",
      bullets: [
        "It cannot prove that a claim is true or current.",
        "It cannot certify official Google or OKF compliance.",
        "It cannot replace OpenAPI schema validation.",
        "It cannot approve legal, privacy, policy, or security-sensitive text."
      ]
    }
  ],
  faq: [
    { question: "Should I fix errors or warnings first?", answer: "Fix errors first because later checks depend on parseable frontmatter." },
    { question: "Does a valid file mean the content is correct?", answer: "No. It means the file shape passed this guide profile. Source facts still need human review." },
    { question: "When should I use the folder validator?", answer: "Use it when the bundle has more than one Markdown file or relative links." },
    { question: "When should I update timestamp?", answer: "Update timestamp only after the source content materially changes, not after a generated draft is reworded." }
  ],
  related: [
    { label: "OKF Validator", href: "/okf-validator/", note: "Check one pasted Markdown file." },
    { label: "OKF Folder Validator", href: "/okf-folder-validator/", note: "Check local multi-file bundles." },
    { label: "Validate OKF Bundle", href: "/guides/validate-okf-bundle/", note: "Use a full publishing checklist." }
  ],
  cta: {
    heading: "Recheck after fixing",
    text: "Validate the repaired file first, then validate the bundle folder if links or duplicate resources matter.",
    label: "Open OKF Validator",
    href: "/okf-validator/"
  }
};

guidePages["validate-okf-bundle"] = {
  path: "/guides/validate-okf-bundle/",
  title: "Validate an OKF Bundle: Checklist for Structure and Trust",
  description: "Validate an OKF bundle with single-file checks, folder structure, links, duplicate resources, source review, and v0.2 trust metadata limits.",
  h1: "Validate an OKF bundle before publishing",
  eyebrow: "Bundle guide",
  intro: "Validate an OKF bundle before publishing with three layers: a single-file check, a folder check, and source owner review. Passing structure checks does not prove the facts are current.",
  conclusion: "Validate structure with tools, then validate facts with source owners.",
  sections: [
    {
      heading: "What an OKF bundle validation should check",
      bullets: [
        "Put related Markdown files in one local folder.",
        "Keep one concept per file.",
        "Add an <code>index.md</code> file that explains scope and links to important files.",
        "Check frontmatter fields such as <code>type</code>, <code>resource</code>, <code>tags</code>, and timestamps.",
        "Review relative links and duplicate resources before publishing.",
        "Remove secrets, private keys, private customer data, and unreviewed policy text."
      ]
    },
    {
      heading: "Bundle validation workflow",
      steps: [
        'Check a representative file in the <a href="/okf-validator/">single-file validator</a>.',
        'Open the <a href="/okf-folder-validator/">folder validator</a>.',
        "Select the local folder that contains your Markdown files.",
        "Fix missing frontmatter and missing type errors first.",
        "Resolve duplicate resources, missing index warnings, and relative-link warnings.",
        "Review source accuracy with the owner before publishing."
      ]
    },
    {
      heading: "File, folder, and source review checklist",
      table: {
        headers: ["Check", "Tool", "Failure handling", "Evidence label"],
        rows: [
          ["Markdown files exist", "Folder validator", "Select `.md` or `.markdown` files.", "reported"],
          ["index.md exists", "Folder validator", "Add a root index file that declares scope.", "reported"],
          ["Each file has frontmatter", "OKF Validator", "Fix YAML before reviewing links.", "reported"],
          ["Each file has type", "OKF Validator", "Add a concept label such as Website Page or API Endpoint.", "reported"],
          ["Resources are not duplicated", "Folder validator", "Merge overlapping files or split concepts clearly.", "reported"],
          ["Relative links resolve", "Folder validator", "Fix paths or add target Markdown files.", "reported"],
          ["Source claims are current", "Manual review", "Check facts with the source owner.", "pending"],
          ["Private fields are excluded", "Manual review", "Remove secrets, private records, and restricted policy text.", "reported"]
        ]
      }
    },
    {
      heading: "Common bundle failures",
      table: {
        headers: ["Finding", "Repair path", "Next page"],
        rows: [
          ["Missing frontmatter or type", "Repair the single Markdown file before reviewing the rest of the bundle.", '<a href="/okf-validator/">OKF Validator</a>'],
          ["Invalid tags or blank resource", "Fix metadata shape so previews, search, and review notes stay useful.", '<a href="/guides/common-okf-validation-errors/">Common validation errors</a>'],
          ["Duplicate resource", "Merge overlapping files or make the concept boundary explicit.", '<a href="/okf-folder-validator/">OKF Folder Validator</a>'],
          ["Broken internal link", "Add the missing Markdown file or correct the relative path.", '<a href="/guides/common-okf-validation-errors/">Common validation errors</a>']
        ]
      }
    },
    {
      heading: "Sample bundle shape",
      code: {
        label: "Small OKF bundle",
        value: `bundle/
  index.md
  pages/home.md
  pages/pricing.md
  api/create-customer.md
  support/refund-policy.md`
      }
    },
    {
      heading: "Publishing review",
      bullets: [
        "Confirm every resource points to a canonical source.",
        "Confirm each title and description matches the actual source.",
        "Confirm examples, limits, policy claims, and owner names are current.",
        "Keep video references as visual context only unless they are the factual source."
      ]
    },
    {
      heading: "What validation cannot prove",
      paragraphs: [
        "This site is an unofficial OKF guide. The browser folder validator reads files selected by the user. It does not upload the bundle, run a server-side crawler, fetch URLs, certify official conformance, or prove that factual claims are current."
      ]
    },
    {
      heading: "v0.2 trust review",
      bullets: [
        "Review provenance, `sources`, `status`, and `stale_after` with the source owner before publishing.",
        "Do not treat optional metadata as proof that facts are verified or that a bundle is officially conformant."
      ]
    },
    {
      heading: "Visual background",
      paragraphs: [
        "This video is included as visual background for OKF learning demand. It is not evidence that this page proves official OKF conformance."
      ],
      video: {
        embedUrl: "https://www.youtube-nocookie.com/embed/_BD2zq3R4lg",
        originalUrl: "https://www.youtube.com/watch?v=_BD2zq3R4lg",
        title: "Open Knowledge Format visual background video",
        fallbackText: "Watch the OKF visual background video on YouTube",
        note: "Visual background only; not used as factual proof for bundle validation rules."
      }
    }
  ],
  faq: [
    { question: "Can I validate private folders?", answer: "The current page reads files in the browser, but you should still avoid using online pages for secrets or confidential records." },
    { question: "Does folder validation replace source review?", answer: "No. It checks structure and some file relationships, not factual truth." },
    { question: "Should I publish a bundle without index.md?", answer: "No. Use index.md to declare scope, owners, and the most important links." },
    { question: "Where should I go after a failed check?", answer: 'Fix single-file errors in the <a href="/okf-validator/">OKF Validator</a>, then use <a href="/guides/common-okf-validation-errors/">common OKF validation errors</a> for repair order.' }
  ],
  related: [
    { label: "OKF Validator", href: "/okf-validator/", note: "Repair one Markdown file first." },
    { label: "OKF Folder Validator", href: "/okf-folder-validator/", note: "Run a local folder check." },
    { label: "Common OKF Validation Errors", href: "/guides/common-okf-validation-errors/", note: "Fix the most common failures." },
    { label: "OKF Templates", href: "/okf-templates/", note: "Start from a reviewed file pattern." },
    { label: "OKF Examples", href: "/okf-examples/", note: "Compare bundle shapes." }
  ],
  cta: {
    heading: "Run a folder check",
    text: "Start with the sample bundle, then select your own local Markdown folder.",
    label: "Open Folder Validator",
    href: "/okf-folder-validator/"
  }
};

guidePages["how-to-create-okf-for-a-website"] = {
  path: "/guides/how-to-create-okf-for-a-website/",
  title: "Website to OKF: Map URLs into Reviewed Knowledge Files",
  description: "Create website OKF files from selected public URLs, preserve canonical sources, exclude private data, review generated drafts, and validate the bundle.",
  h1: "Website to OKF guide",
  eyebrow: "Website guide",
  intro: "Website to OKF starts with URL mapping: choose important public pages, convert them into reviewed Markdown files, and skip private or thin pages instead of scraping everything.",
  conclusion: "Start with high-value URLs, write one OKF file per stable page, and validate the folder before publishing.",
  sections: [
    {
      heading: "What website content belongs in OKF",
      bullets: [
        "Start with homepage, pricing, product, documentation, FAQ, about, contact, policy, and high-value guides.",
        "Skip duplicate, thin, outdated, or private pages until the source owner reviews them.",
        "Use canonical URLs as the <code>resource</code> field.",
        "Do not publish private customer records, internal-only support notes, secrets, or restricted legal text."
      ]
    },
    {
      heading: "Create website OKF files step by step",
      steps: [
        "Create a local folder for the website bundle.",
        "Add index.md with scope, source owner, update date, and top links.",
        "Create one Markdown file per important URL.",
        "Write a short title, description, source URL, tags, and reviewed page summary.",
        'Validate files with the <a href="/okf-validator/">single-file validator</a>.',
        'Validate links and duplicate resources with the <a href="/okf-folder-validator/">folder validator</a>.'
      ]
    },
    {
      heading: "URL to OKF file mapping",
      table: {
        headers: ["Website source", "Concept type", "OKF file pattern", "Review note", "Private fields to exclude"],
        rows: [
          ["Homepage", "Website Page", "index.md or pages/home.md", "Keep the site summary short and source-linked.", "Analytics IDs and private admin links."],
          ["Product or feature page", "Product Page", "pages/product-name.md", "Capture stable positioning, limits, and related docs.", "Roadmap notes and unreleased pricing."],
          ["Help or FAQ page", "Support Topic", "support/topic-name.md", "Preserve support boundaries and escalation notes.", "Customer tickets and private account details."],
          ["Documentation page", "Documentation Topic", "docs/topic-name.md", "Keep task steps and version notes clear.", "Internal runbooks and credentials."],
          ["Policy page", "Policy Page", "policies/policy-name.md", "Do not simplify legal or privacy language without owner review.", "Attorney notes and non-public revisions."],
          ["Thin or duplicate URL", "No file until reviewed", "No file until merged", "Merge into a stronger concept instead of creating thin OKF files.", "Everything until the owner approves scope."]
        ]
      }
    },
    {
      heading: "Write index and log files",
      bullets: [
        "Use <code>index.md</code> to explain bundle scope, owner, source date, and top links.",
        "Use a short change log when source pages materially change.",
        "Do not update timestamps when only generated draft text changed."
      ]
    },
    {
      heading: "Validate the folder",
      steps: [
        'Check one file with the <a href="/okf-validator/">OKF Validator</a>.',
        'Run the <a href="/okf-folder-validator/">OKF Folder Validator</a> for duplicate resources and relative links.',
        "Review source accuracy with the page owner before publishing."
      ]
    },
    {
      heading: "Per-page OKF example",
      code: {
        label: "Website page OKF example",
        value: okfDocument(
          "Website Page",
          "Pricing Page",
          "Summarizes pricing tiers, plan limits, refund notes, and upgrade paths.",
          "https://openknowledgeformat.online/sample/pricing/",
          ["website", "pricing", "product"]
        )
      }
    },
    {
      heading: "Evidence and limits",
      bullets: [
        "Do not keyword-stuff OKF fields.",
        "Do not claim OKF guarantees AI search visibility.",
        "Keep descriptions factual and short.",
        "Use internal links only when they help users understand the concept boundary.",
        "Update timestamps when source pages materially change."
      ]
    },
    {
      heading: "Visual background for website OKF",
      paragraphs: [
        "This video is included as visual background for website-to-OKF learning demand. It is not evidence that OKF guarantees AI search visibility or SEO gains."
      ],
      video: {
        embedUrl: "https://www.youtube-nocookie.com/embed/MY9F9K7wWX4",
        originalUrl: "https://www.youtube.com/watch?v=MY9F9K7wWX4",
        title: "Website OKF visual background video",
        fallbackText: "Watch the website OKF background video on YouTube",
        note: "Visual background only; not used as proof of SEO or AI citation impact."
      }
    },
    {
      heading: "Bad website OKF pattern",
      paragraphs: [
        "The weak pattern is one giant file that summarizes the whole site with no canonical resource for each page. That makes review, freshness, and retrieval weaker."
      ]
    },
    {
      heading: "Generated drafts are still drafts",
      paragraphs: [
        "You can generate first drafts from a URL list, but generated OKF remains pending draft content until a source owner checks accuracy, page scope, links, and privacy boundaries."
      ]
    }
  ],
  faq: [
    { question: "Should every URL become an OKF file?", answer: "No. Start with stable pages that matter to users, support, search, or agents." },
    { question: "Can OKF replace a sitemap?", answer: "No. A sitemap lists URLs for crawlers. OKF adds reviewed knowledge files around selected URLs." },
    { question: "Can I use generated drafts?", answer: "Yes, but treat them as drafts until reviewed." },
    { question: "Can private pages go into public OKF?", answer: "No. Keep private, restricted, or customer-specific content out of public OKF bundles." }
  ],
  related: [
    { label: "Website OKF template", href: "/templates/website-okf-template/", note: "Copy a starter file." },
    { label: "OKF Templates", href: "/okf-templates/", note: "Choose a copy-ready starting pattern." },
    { label: "OKF Examples", href: "/okf-examples/", note: "Review finished bundle shapes." },
    { label: "OKF Validator", href: "/okf-validator/", note: "Check one drafted file." },
    { label: "OKF Folder Validator", href: "/okf-folder-validator/", note: "Check the finished folder." },
    { label: "OKF for Websites", href: "/use-cases/okf-for-websites/", note: "Review the use-case framing." }
  ],
  cta: {
    heading: "Validate the website bundle",
    text: "After drafting the first files, run both single-file and folder checks before publishing.",
    label: "Open Folder Validator",
    href: "/okf-folder-validator/"
  }
};

guidePages["openapi-to-okf"] = {
  path: "/guides/openapi-to-okf/",
  title: "OpenAPI to OKF: Add Reviewed API Context Files",
  description: "Use OpenAPI as the API contract and OKF for reviewed context, examples, owners, limits, and support notes without copying secrets or schemas blindly.",
  h1: "OpenAPI to OKF conversion guide",
  eyebrow: "API guide",
  intro: "OpenAPI to OKF is a workflow for keeping OpenAPI as the API contract while moving reviewed endpoint context, owner notes, examples, limits, and support notes into OKF files.",
  conclusion: "Do not replace OpenAPI with OKF. Convert endpoint context, not the contract itself.",
  sections: [
    {
      heading: "What OpenAPI to OKF means",
      paragraphs: [
        "OpenAPI paths, methods, parameters, schemas, responses, and authentication patterns stay in OpenAPI. OKF carries the surrounding context: owners, examples, limits, support notes, review warnings, and related docs."
      ]
    },
    {
      heading: "What OKF adds",
      paragraphs: [
        "OKF adds owner notes, support context, examples, limits, review warnings, and related documentation around an API contract. It should point back to OpenAPI instead of copying schema details blindly."
      ]
    },
    {
      heading: "Before you convert",
      bullets: [
        "Start with the current OpenAPI specification or API reference URL.",
        "Collect reviewed examples, error-handling notes, and support ownership details.",
        "Remove tokens, private request bodies, customer identifiers, and restricted operational notes.",
        "Choose one stable API area before expanding the bundle.",
        "Keep schema and contract changes in OpenAPI, then review the surrounding context in OKF."
      ]
    },
    {
      heading: "OpenAPI field to OKF context map",
      table: {
        headers: ["OpenAPI input", "OKF output", "Review note"],
        rows: [
          ["Operation summary", "OKF title and description", "Rewrite for business meaning, not just method names."],
          ["Path and method", "Markdown body and resource link", "Keep OpenAPI as source of truth."],
          ["Schema", "Short explanatory note", "Keep exact request and response contracts in OpenAPI."],
          ["Request and response examples", "Examples section", "Remove secrets and private identifiers."],
          ["Error responses", "Warnings and troubleshooting section", "Explain user-facing impact."],
          ["Authentication", "Boundary note", "Do not copy tokens or private auth details into OKF."],
          ["Owner or support team", "Owner notes", "Add human review and escalation context."],
          ["Tags", "OKF tags", "Use a small, consistent tag set."],
          ["Many small operations", "One concept file or section per durable business concept", "Do not turn every endpoint into a thin OKF page."]
        ]
      }
    },
    {
      heading: "Endpoint OKF example",
      code: {
        label: "OpenAPI endpoint context OKF",
        value: okfDocument(
          "API Endpoint",
          "Create customer endpoint",
          "Explains endpoint purpose, owner notes, request context, response notes, and support warnings.",
          "https://openknowledgeformat.online/sample/openapi.yaml#/paths/~1customers/post",
          ["api", "openapi", "customers"]
        )
      }
    },
    {
      heading: "Convert one API area first",
      steps: [
        "Pick one stable endpoint or API area.",
        "Link the OpenAPI file or API reference as the resource.",
        "Write the endpoint purpose in normal language.",
        "Add examples, limits, warnings, owner notes, and related docs.",
        'Validate the file with the <a href="/okf-validator/">OKF Validator</a>.',
        'Validate the API bundle with the <a href="/okf-folder-validator/">OKF Folder Validator</a>.'
      ]
    },
    {
      heading: "What must stay in OpenAPI",
      bullets: [
        "Do not claim OKF validates OpenAPI schemas.",
        "Do not generate client code from OKF.",
        "Do not let OKF contradict the OpenAPI contract.",
        "Do not mechanically convert every endpoint into a separate thin concept file.",
        "Do not include tokens, private request bodies, or customer data in examples."
      ]
    },
    {
      heading: "Review boundaries",
      paragraphs: [
        "Generated API context remains pending until an owner reviews the contract link, examples, limits, and support notes. OKF does not validate OpenAPI schemas or replace contract tooling."
      ]
    },
    {
      heading: "OpenAPI visual background",
      paragraphs: [
        "This video is included as visual background for OpenAPI context. It is not evidence that automatic OpenAPI to OKF conversion is accurate."
      ],
      video: {
        embedUrl: "https://www.youtube-nocookie.com/embed/0iEo0nmNAGQ",
        originalUrl: "https://www.youtube.com/watch?v=0iEo0nmNAGQ",
        title: "OpenAPI visual background video",
        fallbackText: "Watch the OpenAPI background video on YouTube",
        note: "Visual background only; not used as proof for OpenAPI to OKF conversion."
      }
    },
    {
      heading: "Related comparison",
      paragraphs: [
        'Read <a href="/compare/okf-vs-openapi/">OKF vs OpenAPI</a> when you need the difference between contract validation and knowledge context.'
      ]
    }
  ],
  faq: [
    { question: "Can OKF replace OpenAPI?", answer: "No. OpenAPI remains the API contract. OKF adds context around that contract." },
    { question: "Can I generate OKF drafts from OpenAPI?", answer: "Yes, but owner notes, warnings, examples, and support rules still need human review." },
    { question: "Does OKF validate schemas?", answer: "No. Use OpenAPI tooling for schema and contract validation." },
    { question: "What should never move into OKF?", answer: "Do not move tokens, private request bodies, customer data, or exact schemas that must stay controlled by the OpenAPI contract." }
  ],
  related: [
    { label: "OKF vs OpenAPI", href: "/compare/okf-vs-openapi/", note: "Compare contracts and context." },
    { label: "Create OKF for API Docs", href: "/guides/how-to-create-okf-for-api-docs/", note: "Plan a broader API documentation bundle." },
    { label: "OKF Validator", href: "/okf-validator/", note: "Check one API context file." },
    { label: "API OKF template", href: "/templates/api-okf-template/", note: "Copy an endpoint context pattern." },
    { label: "OKF Templates", href: "/okf-templates/", note: "Browse other reviewed starter patterns." },
    { label: "OKF Folder Validator", href: "/okf-folder-validator/", note: "Check API context bundles." }
  ],
  cta: {
    heading: "Convert one endpoint first",
    text: "Start with one stable endpoint, validate it, then expand the API context bundle.",
    label: "Open API OKF Template",
    href: "/templates/api-okf-template/"
  }
};
