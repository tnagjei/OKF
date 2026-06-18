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
timestamp: 2026-06-18T00:00:00Z
---

# Purpose

Explain the stable facts, boundaries, owner notes, and related links for this concept.

# Links

- Validator: https://openknowledgeformat.online/okf-validator/
- Examples: https://openknowledgeformat.online/okf-examples/`;
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
      title: spec.title,
      description: spec.description,
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
    slug: "okf-for-ai-agents",
    name: "AI agents",
    user: "Agent builders, platform teams, and operations teams preparing context packages.",
    why: "They need context that states scope, boundaries, tool notes, escalation rules, and stable references.",
    inputs: ["Policies, runbooks, tool boundaries, support flows, product facts, and safe action rules."],
    output: "An agent context OKF bundle with one file per workflow or concept.",
    template: ["/templates/ai-agent-context-okf-template/", "AI Agent Context OKF template"],
    type: "Agent Context",
    sampleTitle: "Refund support routing",
    sampleDescription: "Tells an agent when to answer, collect evidence, or escalate refund cases.",
    tags: ["agent", "support", "refunds"],
    mistakes: ["Mixing secrets into context files.", "Writing instructions that conflict with policy.", "Skipping human escalation triggers."]
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
      title: `OKF for ${spec.name}: Open Knowledge Format Use Case`,
      description: `Learn how to use OKF for ${spec.name}, including inputs, output bundle shape, a minimum example, template choice, and common mistakes.`,
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
        title: `${label}: Copyable Open Knowledge Format Example`,
        description: `Copy the ${label}, review field explanations, compare good and bad examples, and validate the file with the OKF validator.`,
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
        related: [
          relatedCore[0],
          { label: "Website OKF template", href: "/templates/website-okf-template/", note: "Use for public page knowledge." },
          { label: "API OKF template", href: "/templates/api-okf-template/", note: "Use for endpoint context." },
          { label: "Metrics OKF template", href: "/templates/metrics-okf-template/", note: "Use for formulas and dashboards." }
        ].slice(0, index % 3 === 0 ? 4 : 3),
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
    slug: "how-to-create-okf-for-a-website",
    h1: "How to create OKF for a website",
    conclusion: "Create OKF for a website by mapping key URLs to one Markdown concept file each.",
    sampleType: "Website Page",
    sampleTitle: "Contact page",
    sampleDescription: "Summarizes contact options, privacy notes, and support boundaries.",
    steps: ["Select important URLs.", "Write one file per URL.", "Use canonical URLs in resource.", "Add internal links.", "Review claims before publishing."]
  },
  {
    slug: "how-to-create-okf-for-api-docs",
    h1: "How to create OKF for API docs",
    conclusion: "Create OKF for API docs by keeping OpenAPI as the contract and adding OKF files for endpoint context.",
    sampleType: "API Endpoint",
    sampleTitle: "List invoices endpoint",
    sampleDescription: "Explains endpoint purpose, filters, limits, and related billing rules.",
    steps: ["Start from the API reference.", "Create one OKF file per endpoint or API area.", "Link the OpenAPI resource.", "Add examples and errors.", "Validate frontmatter."]
  },
  {
    slug: "common-okf-validation-errors",
    h1: "Common OKF validation errors",
    conclusion: "Most OKF validation errors come from missing frontmatter, missing guide-profile fields, empty tags, or a missing Markdown body.",
    sampleType: "Validation Error",
    sampleTitle: "Fixed OKF file",
    sampleDescription: "Shows a corrected file after adding required fields.",
    steps: ["Check that the file starts with frontmatter.", "Add missing type, title, description, and tags.", "Add a Markdown body.", "Use stable resource links.", "Run the validator again."]
  }
];

export const guidePages: Record<string, ClusterPage> = Object.fromEntries(
  guideSpecs.map((spec) => [
    spec.slug,
    {
      path: `/guides/${spec.slug}/`,
      title: `${spec.h1}: Open Knowledge Format Guide`,
      description: `${spec.conclusion} Includes prerequisites, steps, examples, validation checks, and related OKF pages.`,
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
