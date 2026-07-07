// input: no runtime input
// output: third-round long-tail SEO pages and targeted page overrides
// pos: long-tail SEO data layer (update rule: sync this header and src/data README when this file changes)
import { minimumExample, type ComparePage, type LongformPage } from "./content";
import type { ClusterPage } from "./seoClusters";

const okfFileExample = `---
type: Documentation Topic
title: API rate limit policy
description: Explains the public rate limit rules, retry behavior, and related API documentation.
resource: https://openknowledgeformat.online/sample/api-rate-limits/
tags: [okf, api, rate-limits]
timestamp: 2026-06-21T00:00:00Z
---

# API rate limit policy

This file describes the stable knowledge a reader or AI agent needs before answering questions about API rate limits.

## Key facts

- Requests are limited per workspace and endpoint group.
- Retry behavior should follow the canonical API documentation.
- Support teams should escalate repeated limit errors to the API owner.

## Related links

- [OKF Validator](/okf-validator/)
- [API OKF template](/templates/api-okf-template/)`;

const badFrontmatterExample = `---
title API rate limits
description:
tags: api, okf
---

# API rate limits

This file has broken frontmatter and missing type.`;

const fixedFrontmatterExample = `---
type: Documentation Topic
title: API rate limits
description: Explains public API rate limit rules and retry behavior.
resource: https://openknowledgeformat.online/sample/api-rate-limits/
tags: [api, okf, limits]
timestamp: 2026-06-21T00:00:00Z
---

# API rate limits

Write the reviewed rate limit explanation here.`;

export const guidePageAdditions: Record<string, ClusterPage> = {
  "okf-file-example": {
    path: "/guides/okf-file-example/",
    title: "OKF File Example: Open Knowledge Format Markdown and YAML",
    description:
      "Explain what an OKF file looks like with a copy-ready Markdown and YAML frontmatter example, field notes, validation checks, and common mistakes.",
    h1: "OKF file example",
    eyebrow: "File example",
    intro: "Copy this minimal OKF file example first, then review what each Markdown and YAML frontmatter field means.",
    sections: [
      {
        heading: "Minimal OKF file example",
        paragraphs: [
          "An OKF file is a Markdown document with YAML frontmatter at the top. The example below is intentionally small so you can copy it, replace the resource URL, and validate the structure before expanding the body."
        ],
        code: {
          label: "Copy-ready OKF file example",
          value: okfFileExample
        }
      },
      {
        heading: "What an OKF file contains",
        bullets: [
          "A YAML frontmatter block between two <code>---</code> lines.",
          "A required <code>type</code> field that names the concept category.",
          "Recommended fields such as <code>title</code>, <code>description</code>, <code>resource</code>, <code>tags</code>, and <code>timestamp</code>.",
          "A Markdown body with a clear heading, facts, boundaries, links, and source notes.",
          "One durable concept per file instead of a mixed content dump."
        ]
      },
      {
        heading: "YAML frontmatter fields",
        table: {
          headers: ["Field", "Purpose", "Example"],
          rows: [
            ["type", "Names the concept category.", "<code>Documentation Topic</code>"],
            ["title", "Gives the file a readable display name.", "<code>API rate limit policy</code>"],
            ["description", "Summarizes the file for previews and indexes.", "<code>Explains public API rate limit rules.</code>"],
            ["resource", "Points to the canonical page, asset, or stable identifier.", "<code>https://example.com/docs/rate-limits/</code>"],
            ["tags", "Groups related files for browsing and filtering.", "<code>[okf, api, rate-limits]</code>"]
          ]
        }
      },
      {
        heading: "Markdown body structure",
        bullets: [
          "Start with one H1 that matches the file concept.",
          "Use short H2 sections such as purpose, key facts, boundaries, examples, and related links.",
          "Keep source claims close to their source links or owner notes.",
          "Avoid mixing unrelated topics, policies, or endpoints in one file."
        ]
      },
      {
        heading: "Common mistakes",
        bullets: [
          "Leaving out <code>type</code> because the title seems obvious.",
          "Using a homepage URL as the resource for every file.",
          "Writing broad marketing copy instead of stable facts.",
          "Putting multiple concepts into one Markdown file.",
          "Treating a valid file shape as proof that the claims are correct."
        ]
      },
      {
        heading: "How to validate the file",
        steps: [
          'Copy the example above into the <a href="/okf-validator/">OKF Validator</a>.',
          "Replace title, description, resource, tags, and body content with your source material.",
          "Fix frontmatter errors before reviewing warnings.",
          "Check links and factual claims manually before publishing."
        ]
      }
    ],
    faq: [
      { question: "Is this an official OKF file example?", answer: "No. It is an unofficial learning example based on public draft concepts and this site's guide profile." },
      { question: "Does every OKF file need all fields shown here?", answer: "The draft centers on type. This site recommends title, description, resource, tags, and timestamp because they make files easier to preview and validate." },
      { question: "Can I use this example for a website page?", answer: "Yes. Change type to Website Page, point resource to the canonical URL, and describe one page per file." },
      { question: "Can I validate a full folder from this page?", answer: 'Use the single-file <a href="/okf-validator/">OKF Validator</a> for one file, then use the folder validator for multi-file bundles.' }
    ],
    related: [
      { label: "OKF Validator", href: "/okf-validator/", note: "Paste the Markdown file and check frontmatter." },
      { label: "OKF Templates", href: "/okf-templates/", note: "Copy starter patterns for websites, API docs, SaaS, and data catalogs." },
      { label: "OKF Examples", href: "/okf-examples/", note: "Review bundle examples before creating your own." },
      { label: "What is OKF?", href: "/what-is-okf/", note: "Read the definition and basic format explanation." }
    ],
    cta: {
      heading: "Validate this example",
      text: "Copy the OKF file, edit the source fields, and check it before adding it to a bundle.",
      label: "Open OKF Validator",
      href: "/okf-validator/"
    }
  },
  "okf-yaml-frontmatter": {
    path: "/guides/okf-yaml-frontmatter/",
    title: "OKF YAML Frontmatter: Required Fields and Examples",
    description:
      "Learn the YAML frontmatter fields used in OKF files, including type, title, description, tags, resources, and validation examples.",
    h1: "OKF YAML frontmatter",
    eyebrow: "Frontmatter guide",
    intro: "YAML frontmatter is the metadata block that lets an OKF Markdown file describe what concept it contains before the body is read.",
    sections: [
      {
        heading: "What YAML frontmatter does in OKF",
        paragraphs: [
          "Frontmatter gives readers, reviewers, and tools a small structured summary before they load the Markdown body. In OKF files, this metadata helps identify the concept type, readable title, summary, source resource, tags, and freshness signal."
        ]
      },
      {
        heading: "Required fields",
        bullets: [
          "<code>type</code> names the concept category. This is the field this site treats as required from the public draft direction.",
          "Use a human-readable value such as <code>Website Page</code>, <code>API Endpoint</code>, <code>Documentation Topic</code>, <code>Data Table</code>, or <code>Agent Context</code>.",
          "Keep type consistent across related files so bundles are easier to browse."
        ]
      },
      {
        heading: "Optional fields",
        bullets: [
          "<code>title</code> gives the file a readable display name.",
          "<code>description</code> summarizes the concept in one sentence.",
          "<code>resource</code> points to the canonical URL, URN, or stable asset identifier.",
          "<code>tags</code> groups the file with related concepts.",
          "<code>timestamp</code> records the last meaningful update when your workflow has a real date."
        ]
      },
      {
        heading: "Copy-ready frontmatter example",
        code: {
          label: "OKF YAML frontmatter example",
          value: `---
type: Documentation Topic
title: API rate limits
description: Explains public API rate limit rules and retry behavior.
resource: https://openknowledgeformat.online/sample/api-rate-limits/
tags: [api, okf, limits]
timestamp: 2026-06-21T00:00:00Z
---`
        }
      },
      {
        heading: "Bad example vs fixed example",
        paragraphs: ["The bad example below has no valid type field, an empty description, and tags that are not an inline array."],
        code: {
          label: "Bad OKF frontmatter example",
          value: badFrontmatterExample
        }
      },
      {
        heading: "Fixed frontmatter example",
        code: {
          label: "Fixed OKF frontmatter example",
          value: fixedFrontmatterExample
        }
      },
      {
        heading: "Validation checklist",
        bullets: [
          "Does the file start with <code>---</code> before the first heading?",
          "Is <code>type</code> present and specific?",
          "Are <code>title</code> and <code>description</code> readable without opening the body?",
          "Does <code>resource</code> point to a stable source?",
          "Are <code>tags</code> written as an inline array?",
          'Have you checked the file with the <a href="/okf-validator/">OKF Validator</a>?'
        ]
      }
    ],
    faq: [
      { question: "Is YAML frontmatter the same as the Markdown body?", answer: "No. Frontmatter is metadata at the top of the file; the Markdown body contains the explanation and source context." },
      { question: "What OKF frontmatter field should I add first?", answer: "Add type first, then fill title, description, resource, and tags for clearer previews and validation." },
      { question: "Can tags be a comma-separated string?", answer: "This site's validator expects an inline array such as [okf, api, limits]." },
      { question: "Where should I see a complete file?", answer: 'Use the <a href="/guides/okf-file-example/">OKF file example</a> guide for a full Markdown file.' }
    ],
    related: [
      { label: "OKF Validator", href: "/okf-validator/", note: "Check whether frontmatter parses correctly." },
      { label: "OKF Templates", href: "/okf-templates/", note: "Copy full starter files with frontmatter and body sections." },
      { label: "OKF file example", href: "/guides/okf-file-example/", note: "See a complete Markdown file." },
      { label: "What is OKF?", href: "/what-is-okf/", note: "Review the definition before building files." }
    ],
    cta: {
      heading: "Check your frontmatter",
      text: "Paste one Markdown file and fix the metadata before adding the file to a bundle.",
      label: "Open OKF Validator",
      href: "/okf-validator/"
    }
  },
  "okf-definition": {
    path: "/guides/okf-definition/",
    title: "OKF Definition: What Open Knowledge Format Means",
    description:
      "OKF means Open Knowledge Format, a way to package Markdown knowledge with YAML metadata for AI agents, documentation, websites, and retrieval workflows.",
    h1: "OKF definition",
    eyebrow: "Definition guide",
    intro: "OKF means Open Knowledge Format. It packages knowledge as Markdown files with YAML metadata. It is different from Open Knowledge Foundation.",
    sections: [
      {
        heading: "OKF definition",
        paragraphs: [
          "Open Knowledge Format is a file-based way to package reviewed knowledge as Markdown files with structured YAML metadata. Each file should describe one stable concept, such as a website page, API endpoint, documentation topic, data table, product rule, or support playbook."
        ]
      },
      {
        heading: "OKF meaning",
        bullets: [
          "OKF means Open Knowledge Format on this website.",
          "The format uses readable Markdown plus metadata fields that make files easier to preview, validate, and link.",
          "The abbreviation OKF can also refer to other organizations or brands, so context matters in search results."
        ]
      },
      {
        heading: "What OKF is not",
        bullets: [
          "OKF is not the Open Knowledge Foundation.",
          "OKF is not a database, vector store, or hosted SaaS product.",
          "OKF is not a replacement for OpenAPI, RAG, MCP, or llms.txt.",
          "OKF structure does not prove the claims inside a file are correct."
        ]
      },
      {
        heading: "OKF file example",
        code: {
          label: "Minimal OKF definition example",
          value: minimumExample
        }
      },
      {
        heading: "How OKF relates to AI agents",
        paragraphs: [
          "AI agents need context before they answer questions or use tools. OKF can package that context as small Markdown files with titles, descriptions, tags, and source links so the agent or retrieval system can inspect the file boundary before using the body content."
        ],
        bullets: [
          "Use OKF to prepare source knowledge, not to grant tool permissions.",
          "Use OKF with retrieval workflows when source documents need cleaner metadata and concept boundaries.",
          "Review every public or internal file before letting agents rely on it."
        ]
      },
      {
        heading: "OKF vs Open Knowledge Foundation",
        paragraphs: [
          "Open Knowledge Format and Open Knowledge Foundation can share the OKF abbreviation, but they are different. This website uses OKF to mean Open Knowledge Format unless a page explicitly says otherwise."
        ]
      }
    ],
    faq: [
      { question: "What does OKF mean?", answer: "OKF means Open Knowledge Format on this website." },
      { question: "Is OKF the Open Knowledge Foundation?", answer: "No. They are different. This site focuses on Open Knowledge Format." },
      { question: "What is an OKF file?", answer: "An OKF file is a Markdown document with YAML frontmatter and a body that explains one concept." },
      { question: "Where should I start?", answer: 'Start with the <a href="/guides/okf-file-example/">OKF file example</a>, then copy a template and validate it.' }
    ],
    related: [
      { label: "What is OKF?", href: "/what-is-okf/", note: "Read the main explanation page." },
      { label: "OKF Examples", href: "/okf-examples/", note: "See bundle patterns and file structures." },
      { label: "OKF Templates", href: "/okf-templates/", note: "Copy starter files." },
      { label: "OKF file example", href: "/guides/okf-file-example/", note: "Start from a full Markdown file example." }
    ],
    cta: {
      heading: "Turn the definition into a file",
      text: "Copy a template and validate your first OKF Markdown file before expanding the bundle.",
      label: "Copy OKF templates",
      href: "/okf-templates/"
    }
  }
};

export const comparePageAdditions: Record<string, ComparePage> = {
  "okf-vs-openapi": {
    path: "/compare/okf-vs-openapi/",
    title: "OKF vs OpenAPI: Knowledge Format and API Specs Compared",
    description:
      "Compare OKF and OpenAPI: OpenAPI describes API endpoints, while OKF organizes knowledge files, examples, and documentation for AI-readable context.",
    h1: "OKF vs OpenAPI",
    eyebrow: "Comparison",
    intro: "OpenAPI describes API contracts and endpoint behavior. OKF organizes surrounding knowledge, examples, documentation context, and review notes for people and AI-readable workflows.",
    summaryRows: [
      {
        label: "Primary role",
        okf: "Organizes Markdown knowledge files with frontmatter and linked context.",
        other: "Describes API endpoints, schemas, request parameters, responses, and errors."
      },
      {
        label: "Best for",
        okf: "API meaning, examples, owner notes, support context, docs context, and agent-readable explanations.",
        other: "API contracts, generated docs, SDK tooling, schema validation, and integration references."
      },
      {
        label: "Input format",
        okf: "Markdown files with YAML frontmatter and body sections.",
        other: "OpenAPI documents, usually YAML or JSON."
      },
      {
        label: "Output use",
        okf: "Reviewed knowledge files for docs, retrieval, support, and agent context.",
        other: "API documentation, client generation, testing, and integration contracts."
      },
      {
        label: "Relationship",
        okf: "Can explain the business meaning and usage notes around OpenAPI endpoints.",
        other: "Can be referenced by OKF files as the source contract."
      }
    ],
    sections: [
      {
        heading: "Short answer",
        paragraphs: [
          "Use OpenAPI when you need to describe an API contract. Use OKF when you need to package the surrounding knowledge that helps people and AI agents understand why an endpoint exists, how it is used, what the edge cases are, and where the source documentation lives."
        ]
      },
      {
        heading: "Where OpenAPI is stronger",
        paragraphs: [
          "OpenAPI is a specification for describing HTTP APIs. It can define paths, methods, parameters, request bodies, response shapes, status codes, authentication, examples, and other contract-level details used by documentation and developer tooling."
        ]
      },
      {
        heading: "Where OKF is different",
        paragraphs: [
          "Open Knowledge Format is a Markdown-and-frontmatter approach for packaging knowledge files. An OKF file can describe an API endpoint in plain language, link to its OpenAPI reference, explain support boundaries, and add review notes that do not belong inside the contract itself."
        ]
      },
      {
        heading: "Key differences",
        bullets: [
          "OpenAPI is contract-first; OKF is context-first.",
          "OpenAPI is strong at schema and endpoint structure; OKF is strong at readable explanations and source boundaries.",
          "OpenAPI powers developer tooling; OKF can feed documentation, support, retrieval, and agent context workflows.",
          "OpenAPI should remain the source of truth for endpoint shape; OKF should point back to that source instead of duplicating it blindly."
        ]
      },
      {
        heading: "When to use OpenAPI",
        bullets: [
          "You need an API contract that developers and tools can rely on.",
          "You need generated reference docs, client SDKs, mocks, or tests.",
          "You need precise request and response schemas.",
          "You need endpoint-level details that must stay aligned with implementation."
        ]
      },
      {
        heading: "When to use OKF",
        bullets: [
          "You need plain-language context around an endpoint, not just the schema.",
          "You need support, docs, or agent workflows to understand endpoint purpose and boundaries.",
          "You need to link examples, known limits, owner notes, troubleshooting, and related docs.",
          "You want reviewed Markdown files that can live next to docs or in a static knowledge bundle."
        ]
      },
      {
        heading: "When to use both",
        paragraphs: [
          "Yes. A practical pattern is to keep OpenAPI as the canonical contract and create OKF files that reference important endpoints. The OKF file should explain business purpose, common mistakes, support boundaries, and related documentation without pretending to replace the API contract."
        ]
      },
      {
        heading: "Example workflow",
        bullets: [
          "Choose one important endpoint from the OpenAPI file.",
          "Create one OKF file with type <code>API Endpoint</code>.",
          "Set resource to the canonical API reference URL or stable endpoint identifier.",
          "Add human-readable purpose, request notes, common errors, owner notes, and related docs.",
          'Validate the OKF file with the <a href="/okf-validator/">OKF Validator</a>.',
          'Use the <a href="/guides/openapi-to-okf/">OpenAPI to OKF guide</a> before expanding a full API context bundle.',
          "Review the file when the OpenAPI contract changes."
        ],
        code: {
          label: "API endpoint OKF example",
          value: `---
type: API Endpoint
title: Create customer endpoint
description: Explains endpoint purpose, required inputs, common errors, and support notes.
resource: https://openknowledgeformat.online/sample-api/v1/customers
tags: [api, openapi, customers]
timestamp: 2026-06-21T00:00:00Z
---

# Create customer endpoint

This OKF file explains the business context around the OpenAPI contract.

## Source contract

Use the canonical OpenAPI reference as the source of truth for schema details.

## Common errors

- Missing email
- Duplicate customer
- Invalid workspace permissions`
        }
      },
      {
        heading: "Related pages",
        bullets: [
          '<a href="/compare/okf-vs-rag/">OKF vs RAG</a> for retrieval context.',
          '<a href="/compare/okf-vs-mcp/">OKF vs MCP</a> for tool and context boundaries.',
          '<a href="/guides/openapi-to-okf/">OpenAPI to OKF</a> for the conversion workflow.',
          '<a href="/okf-templates/">OKF Templates</a> for copy-ready starters.',
          '<a href="/okf-examples/">OKF Examples</a> for bundle patterns.',
          '<a href="/okf-validator/">OKF Validator</a> for checking frontmatter.'
        ]
      },
      {
        heading: "FAQ",
        subsections: [
          { heading: "Does OKF replace OpenAPI?", text: "No. OpenAPI remains the better fit for API contracts. OKF can document surrounding knowledge and context." },
          { heading: "Can an OKF file link to an OpenAPI document?", text: "Yes. Use the resource field or body links to point back to the canonical API reference." },
          { heading: "Should schema details be copied into OKF?", text: "Only copy stable explanatory details. Keep the exact contract in OpenAPI and link to it." },
          { heading: "Can RAG systems use both?", text: "Yes. They can retrieve OKF context while developers still use OpenAPI for contract details." }
        ]
      }
    ]
  }
};

export const longformThirdRoundOverrides: Record<string, LongformPage> = {
  "okf-examples": {
    path: "/okf-examples/",
    title: "OKF Examples: Open Knowledge Format Bundles You Can Copy",
    description:
      "Browse copy-ready OKF examples for website content, API endpoints, product docs, support playbooks, SaaS metrics, and knowledge bases.",
    h1: "OKF examples you can copy",
    eyebrow: "Example library",
    intro: "Start from practical OKF examples for websites, API docs, product documentation, support playbooks, SaaS metrics, and knowledge bases.",
    kind: "examples",
    sections: [
      {
        heading: "OKF examples by source type",
        paragraphs: [
          "The examples below show bundle shapes rather than official certification tests. Use them to choose folders, file boundaries, and review notes before creating your own Open Knowledge Format files."
        ],
        bullets: [
          "Website examples show how to describe public pages, help pages, and policy pages.",
          "API endpoint examples show how to add context around OpenAPI references without replacing the contract.",
          "Support and policy examples show where escalation notes and owner review matter.",
          "Data catalog examples show how to describe metrics, tables, owners, and freshness boundaries."
        ]
      },
      {
        heading: "OKF file example",
        paragraphs: [
          'If you need a single Markdown file before a whole bundle, start with the <a href="/guides/okf-file-example/">OKF file example</a>. It shows YAML frontmatter, body sections, validation checks, and common mistakes.'
        ],
        code: {
          label: "Minimal OKF file example",
          value: okfFileExample
        }
      },
      {
        heading: "How to read an OKF example",
        bullets: [
          "Read <code>type</code> first to understand what concept the file represents.",
          "Check <code>title</code> and <code>description</code> for a narrow, reviewable scope.",
          "Use <code>resource</code> to trace the source page, API reference, policy, table, or stable identifier.",
          "Treat <code>tags</code> as grouping hints, not proof that the file is complete.",
          "Review the Markdown body for boundaries, examples, citations, and related links before copying the pattern."
        ]
      },
      {
        heading: "Copy safely into a template",
        bullets: [
          "Pick the example closest to your source material.",
          "Copy the bundle shape, not the sample facts.",
          "Create one Markdown file per durable concept.",
          "Validate each file before adding it to the bundle.",
          "Review claims with the source owner before publishing."
        ]
      },
      {
        heading: "Validate the result",
        bullets: [
          '<a href="/guides/okf-file-example/">OKF file example</a> for a complete single-file starter.',
          '<a href="/guides/okf-yaml-frontmatter/">OKF YAML frontmatter</a> for field rules and examples.',
          '<a href="/okf-validator/">OKF Validator</a> for checking one Markdown file.',
          '<a href="/okf-folder-validator/">OKF Folder Validator</a> for checking example bundles.',
          '<a href="/guides/validate-okf-bundle/">Validate OKF Bundle</a> before publishing a copied pattern.',
          '<a href="/okf-templates/">OKF Templates</a> for copy-ready file starters.'
        ]
      }
    ]
  }
};
