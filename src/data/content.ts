// input: no runtime input
// output: static content collections for pages, examples, templates, comparisons, code blocks, and videos
// pos: content data layer (update rule: sync this header and src/data README when this file changes)
export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
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
  subsections?: {
    heading: string;
    text: string;
  }[];
};

export type LongformPage = {
  path: string;
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  intro: string;
  sections: ContentSection[];
  kind?: "templates" | "examples";
};

export type ComparePage = LongformPage & {
  summaryRows: {
    label: string;
    okf: string;
    other: string;
  }[];
};

export type CodeAsset = {
  title: string;
  scenario: string;
  code: string;
  fields: string[];
  mistakes: string[];
  nextStep: string;
};

export const sourceLinks = [
  {
    label: "Google Cloud introduction to Open Knowledge Format",
    href: "https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing"
  },
  {
    label: "GoogleCloudPlatform knowledge-catalog OKF specification",
    href: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md"
  },
  {
    label: "GoogleCloudPlatform knowledge-catalog OKF README",
    href: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/README.md"
  },
  {
    label: "OpenAPI Initiative overview",
    href: "https://www.openapis.org/what-is-openapi"
  },
  {
    label: "Model Context Protocol introduction",
    href: "https://modelcontextprotocol.io/docs/getting-started/intro"
  },
  {
    label: "llms.txt proposal",
    href: "https://llmstxt.org/"
  }
];

export const homePanels = [
  {
    title: "Format",
    text: "OKF uses plain Markdown files with YAML frontmatter so knowledge can stay readable without a special runtime."
  },
  {
    title: "Bundle",
    text: "A folder of OKF documents can be shipped through Git, a zip archive, or any static file host."
  },
  {
    title: "Agent input",
    text: "AI agents can scan titles, descriptions, tags, resources, links, and body sections before loading deeper context."
  }
];

export const minimumExample = `---
type: Website Page
title: Open Knowledge Format Validator
description: A browser-only tool that checks basic OKF frontmatter fields.
resource: https://openknowledgeformat.online/okf-validator/
tags: [okf, validator, markdown]
timestamp: 2026-06-21T00:00:00Z
---

# Purpose

This page helps users test whether a Markdown document includes the fields expected by this guide.`;

export const templateLibrary: CodeAsset[] = [
  {
    title: "Website OKF template",
    scenario:
      "Use this when you want search pages, help pages, pricing pages, or landing pages to become a structured knowledge bundle.",
    code: `---
type: Website Page
title: Pricing Page
description: Explains plan tiers, billing limits, refund policy, and upgrade paths.
resource: https://openknowledgeformat.online/sample/pricing/
tags: [website, pricing, conversion]
timestamp: 2026-06-21T00:00:00Z
---

# Audience

Describe who should read this page and what decision it supports.

# Key facts

- List the offer, limits, exclusions, and trust statements.
- Link to related OKF documents for product, support, and legal context.

# Citations

[1] Source page or internal owner record.`,
    fields: [
      "`type` identifies this as a website page concept.",
      "`resource` points to the live URL the knowledge describes.",
      "`tags` group this page with other website and conversion documents."
    ],
    mistakes: [
      "Using promotional copy instead of stable facts.",
      "Leaving out pricing exclusions that an agent needs for accurate answers.",
      "Pointing `resource` to the home page when the concept is about a specific URL."
    ],
    nextStep: "Create one OKF file per important public URL, then add an index file for the section."
  },
  {
    title: "API OKF template",
    scenario:
      "Use this for REST, GraphQL, or webhook endpoints that agents need to call, explain, or troubleshoot.",
    code: `---
type: API Endpoint
title: Create customer endpoint
description: Creates a customer record and returns the new customer identifier.
resource: https://openknowledgeformat.online/sample-api/v1/customers
tags: [api, customers, write]
timestamp: 2026-06-21T00:00:00Z
---

# Method

POST /v1/customers

# Request fields

| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| email | string | yes | Must be unique. |

# Response

Return the created customer id and status.`,
    fields: [
      "`type` tells consumers this document describes an endpoint.",
      "`title` should match the business action, not only the URL.",
      "`resource` can be the endpoint URL or canonical API reference URL."
    ],
    mistakes: [
      "Documenting only the happy path.",
      "Omitting authentication, rate limits, and error responses.",
      "Mixing multiple endpoints into one concept file."
    ],
    nextStep: "Add one companion OKF file for shared authentication and one for common error codes."
  },
  {
    title: "SaaS OKF template",
    scenario:
      "Use this for product concepts such as accounts, workspaces, roles, billing limits, or feature gates.",
    code: `---
type: SaaS Product Concept
title: Workspace seats
description: Defines how seats are counted, invited, removed, and billed.
resource: https://openknowledgeformat.online/sample/docs/workspace-seats
tags: [saas, billing, workspace]
timestamp: 2026-06-21T00:00:00Z
---

# Definition

A seat is counted when a user has active access to a paid workspace.

# Rules

- Pending invites do not count until accepted.
- Suspended users stop counting at the next billing sync.

# Related concepts

See [Billing plans](/billing/plans.md).`,
    fields: [
      "`type` can be a precise business concept label.",
      "`description` should be one sentence so search snippets stay clean.",
      "`tags` connect the concept to billing, workspace, and support topics."
    ],
    mistakes: [
      "Using internal jargon without a plain definition.",
      "Skipping edge cases such as suspended users or pending invites.",
      "Failing to link to plan limits and support playbooks."
    ],
    nextStep: "Build a concept map for the main product objects and support workflows."
  },
  {
    title: "Documentation OKF template",
    scenario:
      "Use this when developer docs or product docs need a machine-readable summary next to human instructions.",
    code: `---
type: Documentation Topic
title: Import contacts from CSV
description: Guides admins through CSV preparation, upload, validation, and rollback.
resource: https://openknowledgeformat.online/sample/docs/import-csv
tags: [docs, import, csv]
timestamp: 2026-06-21T00:00:00Z
---

# Prerequisites

- Admin role.
- UTF-8 CSV file.
- Required columns: email, first_name, last_name.

# Procedure

1. Open Admin Settings.
2. Upload the CSV file.
3. Review validation warnings before confirming.

# Rollback

Export the affected contacts and remove the imported batch if needed.`,
    fields: [
      "`title` mirrors the documentation task.",
      "`description` summarizes the user goal and main steps.",
      "`timestamp` records the last meaningful update."
    ],
    mistakes: [
      "Turning a long page into one giant OKF document.",
      "Missing prerequisites, permissions, or rollback notes.",
      "Not linking related troubleshooting topics."
    ],
    nextStep: "Split large docs into one OKF document per task, concept, or reference topic."
  },
  {
    title: "AI Agent Context OKF template",
    scenario:
      "Use this to package policies, routing rules, tool boundaries, and escalation notes for an agent.",
    code: `---
type: Agent Context
title: Refund support routing
description: Tells the support agent when to answer, when to request proof, and when to escalate refund cases.
resource: urn:agent-context:refund-support-routing
tags: [agent, support, refunds]
timestamp: 2026-06-21T00:00:00Z
---

# Scope

The agent may explain the refund policy and collect order details.

# Boundaries

- Do not promise refunds before eligibility is checked.
- Escalate orders older than 90 days.

# Tool notes

Use the order lookup tool only after the user provides an order id.`,
    fields: [
      "`resource` can be a stable URN when no public URL exists.",
      "`type` marks this as context, not a customer-facing page.",
      "`tags` help route this context into the correct agent workflow."
    ],
    mistakes: [
      "Mixing policy, tool secrets, and user data in one file.",
      "Writing instructions that conflict with the product policy.",
      "Forgetting escalation conditions."
    ],
    nextStep: "Review the file with support owners before adding it to an agent context bundle."
  },
  {
    title: "Data Catalog OKF template",
    scenario:
      "Use this for tables, datasets, metrics, dashboards, or lineage notes that need human and agent review.",
    code: `---
type: Data Table
title: Orders fact table
description: One row per submitted order with revenue, customer, and fulfillment fields.
resource: bigquery://acme.analytics.orders
tags: [data, orders, revenue]
timestamp: 2026-06-21T00:00:00Z
---

# Schema

| Column | Type | Description |
| --- | --- | --- |
| order_id | string | Unique order id. |
| customer_id | string | Customer identifier. |
| total_usd | numeric | Order total in US dollars. |

# Freshness

Updated hourly from the commerce ingestion pipeline.`,
    fields: [
      "`resource` should identify the table, dashboard, or metric asset.",
      "`description` should state grain and purpose.",
      "`tags` support cross-cutting search by domain or metric group."
    ],
    mistakes: [
      "Leaving out data grain.",
      "Not documenting freshness or ownership.",
      "Using vague column descriptions that repeat the column name."
    ],
    nextStep: "Add related metric, dashboard, and playbook OKF files, then link them together."
  }
];

export const exampleLibrary: CodeAsset[] = [
  {
    title: "Website content bundle",
    scenario:
      "A marketing and docs team wants agents to answer questions from public website pages without scraping every page from scratch.",
    code: `bundle/
  index.md
  pages/
    home.md
    pricing.md
    privacy.md
  products/
    okf-validator.md
  support/
    contact.md`,
    fields: [
      "`index.md` lists the bundle contents for progressive reading.",
      "Each page file uses frontmatter fields for type, title, description, resource, tags, and timestamp.",
      "Markdown links connect pricing, privacy, support, and product documents."
    ],
    mistakes: [
      "Copying entire HTML pages instead of clean Markdown summaries.",
      "Missing canonical resource URLs.",
      "Not separating legal pages from product pages."
    ],
    nextStep: "Start with the top traffic URLs, then add internal docs only after public pages are stable."
  },
  {
    title: "API endpoint bundle",
    scenario:
      "A developer relations team wants agents to explain endpoints, parameters, limits, and errors.",
    code: `bundle/
  index.md
  api/
    create-customer.md
    update-subscription.md
    list-invoices.md
  references/
    auth.md
    rate-limits.md
    error-codes.md`,
    fields: [
      "Endpoint files describe one action per concept.",
      "Reference files hold authentication and shared error details.",
      "Cross-links keep repeated rules out of endpoint files."
    ],
    mistakes: [
      "Putting every endpoint in one file.",
      "Omitting error responses.",
      "Letting samples drift from the live API reference."
    ],
    nextStep: "Draft endpoint context from OpenAPI, then use the OpenAPI to OKF guide for manual review."
  },
  {
    title: "Product documentation bundle",
    scenario:
      "A docs team wants task pages, reference pages, and troubleshooting notes to stay readable by humans and agents.",
    code: `bundle/
  index.md
  concepts/
    workspace.md
    roles.md
  tasks/
    invite-user.md
    import-csv.md
  troubleshooting/
    csv-validation-errors.md`,
    fields: [
      "Concept files define product objects.",
      "Task files explain step-by-step procedures.",
      "Troubleshooting files capture symptoms, causes, fixes, and escalation."
    ],
    mistakes: [
      "Blending concept, task, and troubleshooting content.",
      "Skipping prerequisites.",
      "Not documenting who owns the page."
    ],
    nextStep: "Map docs IA first, then create one OKF file for each durable topic."
  },
  {
    title: "Support playbook bundle",
    scenario:
      "A support team wants agents to route cases, ask for the right evidence, and avoid unsupported promises.",
    code: `bundle/
  index.md
  playbooks/
    refund-request.md
    login-lockout.md
    billing-dispute.md
  policies/
    refund-policy.md
    account-security.md`,
    fields: [
      "Playbooks define trigger, triage steps, boundaries, and escalation.",
      "Policy files hold stable rules that many playbooks reference.",
      "Tags separate refund, security, billing, and account topics."
    ],
    mistakes: [
      "Writing agent actions that bypass human approval.",
      "Forgetting negative cases where support must refuse.",
      "Not listing escalation thresholds."
    ],
    nextStep: "Review each playbook with policy owners before production agent use."
  },
  {
    title: "SaaS metrics bundle",
    scenario:
      "A growth or finance team wants consistent definitions for ARR, churn, activation, and usage metrics.",
    code: `bundle/
  index.md
  metrics/
    arr.md
    logo-churn.md
    activation-rate.md
  dashboards/
    executive-overview.md
  tables/
    subscription-events.md`,
    fields: [
      "Metric files state formula, grain, exclusions, and owner.",
      "Dashboard files explain where numbers appear and how they are filtered.",
      "Table files document upstream data and freshness."
    ],
    mistakes: [
      "Publishing a metric without numerator and denominator.",
      "Not marking exclusions.",
      "Using dashboard labels as definitions."
    ],
    nextStep: "Create metric OKF files before dashboard OKF files so the dashboard has source definitions."
  },
  {
    title: "Knowledge base bundle",
    scenario:
      "An operations team wants a lightweight knowledge base that can be edited in Git and consumed by agents.",
    code: `bundle/
  index.md
  runbooks/
    deploy-checklist.md
    incident-triage.md
  decisions/
    why-static-export.md
  references/
    vendor-contacts.md`,
    fields: [
      "Runbooks focus on repeatable actions.",
      "Decision files capture why a choice was made.",
      "Reference files hold supporting facts and links."
    ],
    mistakes: [
      "Treating OKF as a file dump with no index.",
      "Keeping outdated decisions without timestamps.",
      "Mixing private credentials into agent-readable files."
    ],
    nextStep: "Add a review cadence and remove sensitive data before sharing the bundle."
  }
];

export const longformPages: Record<string, LongformPage> = {
  "what-is-okf": {
    path: "/what-is-okf/",
    title: "What Is OKF? Open Knowledge Format Explained",
    description:
      "What is Open Knowledge Format? Learn how OKF uses Markdown, YAML frontmatter, draft fields, and bundles for agent-ready knowledge.",
    h1: "What is Open Knowledge Format?",
    eyebrow: "OKF basics",
    intro:
      "Open Knowledge Format, or OKF, is a draft way to package knowledge as readable Markdown files with small YAML frontmatter fields. In this guide, OKF means Open Knowledge Format, not Open Knowledge Foundation or any unrelated OKF brand.",
    sections: [
      {
        heading: "The one-minute answer",
        paragraphs: [
          "OKF describes knowledge as a directory of Markdown files. Each file represents one concept, such as a data table, API endpoint, product rule, support playbook, documentation topic, or website page.",
          "The YAML frontmatter at the top of a file gives machines a few stable fields to scan. The Markdown body gives humans and AI agents the explanation, examples, citations, and links they need before using the concept."
        ]
      },
      {
        heading: "Not the Open Knowledge Foundation",
        bullets: [
          "OKF here means Open Knowledge Format.",
          "OKF is not the Open Knowledge Foundation.",
          "OKF is not an OKF beverage or consumer brand.",
          "This site is an unofficial learning and tool site, not official Google documentation."
        ]
      },
      {
        heading: "What an OKF document contains",
        bullets: [
          "`type`: the concept category. In the draft specification, this is the required field.",
          "`title`: a human-readable display name.",
          "`description`: a short summary for previews, index files, and search snippets.",
          "`resource`: a stable URL, URN, or asset identifier when the concept maps to a resource.",
          "`tags`: short labels that help group concepts across folders.",
          "`timestamp`: an ISO 8601 datetime for the last meaningful update."
        ]
      },
      {
        heading: "A minimal OKF example",
        paragraphs: [
          "A small OKF file starts with frontmatter, then continues as normal Markdown. The example below keeps one concept per file and points `resource` to the canonical page or asset it describes."
        ],
        code: {
          label: "Minimal OKF concept file",
          value: minimumExample
        }
      },
      {
        heading: "Visual overview",
        paragraphs: [
          "This video is included as a visual aid for the definition page. Use the official Google Cloud post and GoogleCloudPlatform specification for factual claims."
        ],
        video: {
          embedUrl: "https://www.youtube-nocookie.com/embed/wczuwg9EZdg",
          originalUrl: "https://www.youtube.com/watch?v=wczuwg9EZdg",
          title: "Open Knowledge Format overview video",
          fallbackText: "Watch the OKF overview on YouTube",
          note: "Evidence boundary: video used as visual background only, not as official definition proof."
        }
      },
      {
        heading: "When OKF is useful",
        paragraphs: [
          "An agent does not always need a database, embedding pipeline, or custom SDK to understand a knowledge base. If the knowledge is already organized into files, frontmatter, headings, and links, the agent can inspect the structure before loading more content.",
          "That makes OKF useful for teams that want portable context. A bundle can live in Git, ship as a zip archive, or be hosted as static files."
        ],
        bullets: [
          "Website teams can describe important public pages and trust statements.",
          "API teams can keep endpoint meaning, owners, limits, and examples beside OpenAPI contracts.",
          "Support teams can package playbooks with boundaries and escalation rules.",
          "Data teams can describe tables, metrics, dashboards, freshness, and ownership.",
          "Documentation teams can split large manuals into smaller linked concept files."
        ]
      },
      {
        heading: "What OKF is not",
        bullets: [
          "OKF is not a Google product page or an official Google service.",
          "OKF is not a replacement for MCP, RAG, OpenAPI, or llms.txt.",
          "OKF is not a database. It is a file format for representing curated knowledge.",
          "OKF is not proof that every claim inside a bundle is correct or current."
        ]
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "Is OKF official?",
            text: "Open Knowledge Format draft materials come from public GoogleCloudPlatform sources. This website is unofficial and not affiliated with Google."
          },
          {
            heading: "What field is required?",
            text: "The draft specification treats `type` as required. This site recommends extra fields such as title, description, resource, tags, and timestamp for clearer previews."
          },
          {
            heading: "Does OKF replace OpenAPI?",
            text: "No. OpenAPI describes API contracts. OKF can describe the surrounding business meaning, examples, owners, and related documentation."
          },
          {
            heading: "Where should I start?",
            text: "Start with one small bundle, validate each Markdown file, then expand only after the concept boundaries are clear."
          }
        ]
      }
    ]
  },
  "okf-tutorial": {
    path: "/okf-tutorial/",
    title: "OKF Tutorial: Build Your First OKF Bundle",
    description:
      "Follow a beginner-friendly OKF tutorial to build your first Open Knowledge Format bundle with Markdown files, YAML frontmatter, and links.",
    h1: "OKF tutorial: build your first knowledge bundle",
    eyebrow: "Step-by-step tutorial",
    intro:
      "This OKF tutorial builds one small knowledge bundle with `index.md`, three concept files, links, and a validation checklist. Start small before you convert a full site or documentation set.",
    sections: [
      {
        heading: "What you will build",
        paragraphs: [
          "The final output is a website content bundle with one root index and three focused concept files. The same shape can later be adapted for APIs, documentation, data catalogs, and support playbooks."
        ],
        code: {
          label: "Final bundle tree",
          value: `bundle/
  index.md
  pages/
    home.md
    pricing.md
  support/
    contact.md`
        }
      },
      {
        heading: "Before you start",
        bullets: [
          "Choose one narrow scope, such as five public pages or three API endpoints.",
          "Collect canonical source URLs before writing summaries.",
          "Do not include secrets, private keys, personal data, or internal-only records.",
          "Use plain Markdown so the bundle remains readable in Git and static hosting."
        ]
      },
      {
        heading: "Step 1: choose one knowledge scope",
        paragraphs: [
          "Start with a narrow scope. A good first bundle might cover five important pages, three API endpoints, or one support workflow.",
          "Do not start by converting everything. OKF works best when each file has a clear concept boundary."
        ]
      },
      {
        heading: "Step 2: create a folder",
        paragraphs: [
          "Create a bundle folder with an `index.md` file at the root. The index file helps humans and agents see what is available before opening individual concept files."
        ],
        bullets: [
          "`bundle/index.md` lists sections and links.",
          "`bundle/pages/home.md` describes one page.",
          "`bundle/support/contact.md` describes one support route."
        ]
      },
      {
        heading: "Step 3: write frontmatter first",
        paragraphs: [
          "Frontmatter is the structured block at the top of a Markdown file. In this guide, the validator checks `type`, `title`, `description`, and `tags` so your documents are useful for search and preview workflows."
        ]
      },
      {
        heading: "Step 4: write a focused Markdown body",
        bullets: [
          "Use headings for audience, facts, rules, examples, and citations.",
          "Use lists and tables where structure matters.",
          "Use ordinary Markdown links to connect related concept files."
        ]
      },
      {
        heading: "Step 5: validate and review",
        paragraphs: [
          "Paste each file into the OKF validator on this site. The validator runs in your browser, which means pasted content is not uploaded to this website.",
          "After validation, review the file for accuracy. A passing file can still contain outdated or unsupported claims."
        ]
      },
      {
        heading: "Final output",
        paragraphs: [
          "A useful first bundle has a root index, one concept per file, canonical resource links, and enough body text for a reviewer to understand the source without guessing."
        ],
        code: {
          label: "Example concept file",
          value: `---
type: Website Page
title: Contact page
description: Explains how visitors can report corrections, outdated examples, and validator issues.
resource: https://openknowledgeformat.online/contact/
tags: [website, contact, corrections]
timestamp: 2026-06-21T00:00:00Z
---

# Purpose

This page gives readers a correction path for Open Knowledge Format Guide.

# Related concepts

- [Privacy policy](../pages/privacy.md)
- [Validator](../products/okf-validator.md)`
        }
      },
      {
        heading: "Validation checklist",
        bullets: [
          "The frontmatter parses cleanly and starts at the top of the file.",
          "`type` is present and describes the concept category.",
          "`resource` points to a real URL, URN, or stable asset identifier.",
          "The Markdown body has one clear H1 and focused sections.",
          "Links point to real related files or public sources.",
          "Remove private keys, personal data, and internal-only material before public hosting.",
          "Add a timestamp or review date so stale files are easier to spot."
        ]
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "Can I generate OKF from OpenAPI?",
            text: "You can draft endpoint concept files from OpenAPI, but the business meaning, owners, examples, and warnings still need human review."
          },
          {
            heading: "Do I need a database?",
            text: "No. A first OKF bundle can be ordinary Markdown files in a folder, Git repo, zip archive, or static site."
          },
          {
            heading: "What should I validate first?",
            text: "Validate the frontmatter and required guide fields first, then review the actual claims for accuracy."
          }
        ]
      }
    ]
  },
  "okf-examples": {
    path: "/okf-examples/",
    title: "Open Knowledge Format Examples for Bundles",
    description:
      "Browse copy-ready Open Knowledge Format examples with OKF bundle patterns, common mistakes, and validation next steps.",
    h1: "Open Knowledge Format examples for real knowledge bundles",
    eyebrow: "Example library",
    intro:
      "These Open Knowledge Format examples show how different teams can organize OKF bundles. They are copy-ready starter patterns, not official conformance tests or certification results.",
    kind: "examples",
    sections: [
      {
        heading: "Copy-ready OKF examples",
        paragraphs: [
          "Each example shows a bundle shape, the fields that matter most, common mistakes, and a practical next step.",
          "Use the structure as a starting point, then adapt file names, tags, links, resource URLs, and citations to your actual content model."
        ]
      },
      {
        heading: "Common mistakes in OKF examples",
        bullets: [
          "Copying full HTML pages instead of clean Markdown summaries.",
          "Leaving `resource` blank or pointing every concept to the home page.",
          "Mixing many unrelated concepts into one file.",
          "Adding examples with no citations, owner, or review timestamp.",
          "Assuming a sample is production-ready because the frontmatter passes."
        ]
      },
      {
        heading: "How to validate these examples",
        bullets: [
          "Copy one example and replace placeholder URLs, tags, and timestamps.",
          "Paste the Markdown concept file into the browser-only OKF validator.",
          "Fix frontmatter errors before expanding the body.",
          "Review claims separately because validation cannot prove knowledge accuracy.",
          "Use <a href=\"/compare/okf-vs-openapi/\">OKF vs OpenAPI</a> when an API example needs both a contract and surrounding context."
        ]
      },
      {
        heading: "Downloadable sample bundles",
        paragraphs: [
          "Downloadable ZIP bundles are a planned next step. Until real files are published, treat this section as pending and use the visible bundle trees as copy-ready starting points."
        ],
        bullets: [
          "Pending: website content bundle ZIP.",
          "Pending: API endpoint bundle ZIP.",
          "Pending: support playbook bundle ZIP.",
          "Do not treat planned downloads as already validated assets."
        ]
      },
      {
        heading: "Example validation status",
        bullets: [
          "Current status: examples are guide patterns, not official conformance results.",
          "Next check: paste individual concept files into the OKF validator.",
          "Bundle-level check: use the OKF folder validator when you assemble a full folder.",
          "Manual review still has to confirm source links, owners, privacy risk, and timestamps."
        ]
      },
      {
        heading: "Visual walkthrough",
        paragraphs: [
          "This video is included as visual background for OKF examples. It does not prove that this site's examples pass validation."
        ],
        video: {
          embedUrl: "https://www.youtube-nocookie.com/embed/MY9F9K7wWX4",
          originalUrl: "https://www.youtube.com/watch?v=MY9F9K7wWX4",
          title: "OKF examples visual walkthrough video",
          fallbackText: "Watch the OKF walkthrough on YouTube",
          note: "Evidence boundary: video used as visual background only, not as validation proof."
        }
      }
    ]
  },
  "okf-templates": {
    path: "/okf-templates/",
    title: "OKF Templates: Copy Bundle Template Starters",
    description:
      "Copy OKF templates for websites, APIs, SaaS, documentation, agent context, and data catalogs, then validate the bundle fields.",
    h1: "Copy-ready OKF templates by bundle type",
    eyebrow: "Template library",
    intro:
      "Choose an OKF bundle type, copy the starter frontmatter, replace the resource and timestamp, then validate the Markdown before publishing.",
    kind: "templates",
    sections: [
      {
        heading: "Choose your OKF bundle type",
        paragraphs: [
          "Use the website template for public pages, the API template for endpoint context, the SaaS template for product concepts, the documentation template for tasks, the agent context template for boundaries, and the data catalog template for tables or metrics."
        ]
      },
      {
        heading: "Before you copy a template",
        paragraphs: [
          "Replace placeholder resources, timestamps, and tags before publishing. If a concept is internal and has no URL, use a stable URN or internal identifier instead of a fake public link.",
          "Keep one concept per file. A short, precise OKF file is easier for an agent to load than a broad document that mixes unrelated ideas."
        ]
      },
      {
        heading: "Bad example vs fixed example",
        paragraphs: [
          "The fastest way to misuse an OKF template is to copy the sample without replacing source-specific fields. The fixed example keeps the same concept but adds the missing frontmatter and review boundary."
        ],
        code: {
          label: "Bad example",
          value: `---
title: Pricing
---

# Pricing

This page has everything about pricing.`
        }
      },
      {
        heading: "Fixed template example",
        code: {
          label: "Fixed OKF template",
          value: `---
type: Website Page
title: Pricing page
description: Explains public plan tiers, billing limits, refunds, and upgrade paths.
resource: https://openknowledgeformat.online/sample/pricing/
tags: [website, pricing, billing]
timestamp: 2026-06-21T00:00:00Z
---

# Pricing page

Use this file for stable pricing facts, exclusions, source links, and review notes.`
        }
      },
      {
        heading: "Validate your template",
        bullets: [
          "Paste the copied Markdown into the OKF validator.",
          "Fix missing `type` first because it is the core draft field.",
          "Add title, description, resource, tags, and timestamp so previews and internal search work better.",
          "For API templates, read <a href=\"/compare/okf-vs-openapi/\">OKF vs OpenAPI</a> before treating OKF as an API contract.",
          "For full folders, use the <a href=\"/okf-folder-validator/\">OKF folder validator</a> and the <a href=\"/guides/validate-okf-bundle/\">bundle validation guide</a>."
        ]
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "Are these official templates?",
            text: "No. They are practical starter templates for this unofficial guide."
          },
          {
            heading: "Can I add custom fields?",
            text: "Yes, if your consumers can tolerate unknown keys and your team documents what each custom field means."
          },
          {
            heading: "Is title required?",
            text: "The draft specification identifies `type` as required. This site recommends title because it makes previews and review workflows clearer."
          }
        ]
      }
    ]
  },
  about: {
    path: "/about/",
    title: "About Open Knowledge Format Guide",
    description:
      "Learn what Open Knowledge Format Guide covers, why it exists, how it uses public OKF references, and why it is an unofficial resource.",
    h1: "About this Open Knowledge Format guide",
    eyebrow: "About",
    intro:
      "Open Knowledge Format Guide is an independent learning site for developers, AI agent builders, SEO teams, and documentation teams.",
    sections: [
      {
        heading: "Purpose",
        paragraphs: [
          "This site explains OKF in plain English, provides copy-ready templates, shows example bundle structures, and offers a browser-only validator for basic frontmatter checks.",
          "The site is intentionally practical. It focuses on how to turn website pages, API references, support workflows, product documentation, and data assets into structured knowledge packages."
        ]
      },
      {
        heading: "Evidence boundary",
        paragraphs: [
          "The content references the public GoogleCloudPlatform knowledge-catalog repository and OKF draft materials. It does not claim to be an official Google site, official documentation, or a compliance authority.",
          "When the OKF draft changes, templates and explanations on this site should be reviewed before being treated as current."
        ]
      },
      {
        heading: "Contact",
        paragraphs: [
          'For corrections or site issues, email <a href="#" class="obfuscated-email" data-user="tangjei414" data-domain="gmail.com">Send Email</a>.'
        ]
      }
    ]
  },
  contact: {
    path: "/contact/",
    title: "Contact Open Knowledge Format Guide",
    description:
      "Contact Open Knowledge Format Guide for corrections, template feedback, validator issues, or updates about OKF learning resources.",
    h1: "Contact",
    eyebrow: "Contact",
    intro:
      "Use this page to report corrections, broken examples, validator bugs, or outdated OKF references.",
    sections: [
      {
        heading: "Email",
        paragraphs: [
          'Send site feedback to <a href="#" class="obfuscated-email" data-user="tangjei414" data-domain="gmail.com">Send Email</a>.'
        ]
      },
      {
        heading: "Good correction reports",
        bullets: [
          "Include the page URL.",
          "Quote the specific sentence or template line that needs review.",
          "Include a public source link when the issue is about the OKF draft."
        ]
      },
      {
        heading: "Privacy note",
        paragraphs: [
          "Do not send private keys, private customer data, or confidential documents. The validator on this website is designed to run in the browser so you can test text locally."
        ]
      }
    ]
  },
  privacy: {
    path: "/privacy/",
    title: "Privacy Policy for Open Knowledge Format Guide",
    description:
      "Read the privacy policy for Open Knowledge Format Guide, including browser-only validator behavior and contact information.",
    h1: "Privacy policy",
    eyebrow: "Privacy",
    intro:
      "This privacy policy explains how this static guide site treats visitor content and contact information.",
    sections: [
      {
        heading: "Browser-only validator",
        paragraphs: [
          "The OKF validator runs in your browser. Text pasted into the validator is processed on your device and is not uploaded to this website by the validator code.",
          "You should still avoid pasting secrets, private keys, personal data, or confidential business records into any online page."
        ]
      },
      {
        heading: "Contact email",
        paragraphs: [
          "If you contact us via email, the information you send is used to read and respond to your message."
        ]
      },
      {
        heading: "Static site behavior",
        paragraphs: [
          "This first version does not include login, payment, database storage, or user accounts. Hosting providers may still collect standard server logs."
        ]
      },
      {
        heading: "Updates",
        paragraphs: [
          "This policy may be updated as the site adds features. Any update should keep validator privacy clear and visible."
        ]
      }
    ]
  },
  terms: {
    path: "/terms/",
    title: "Terms of Use for Open Knowledge Format Guide",
    description:
      "Read the terms of use for Open Knowledge Format Guide, an unofficial OKF learning, template, example, and validator resource.",
    h1: "Terms of use",
    eyebrow: "Terms",
    intro:
      "By using this site, you understand that it is an unofficial educational guide and not a source of official OKF compliance decisions.",
    sections: [
      {
        heading: "Unofficial resource",
        paragraphs: [
          "This site is not affiliated with Google. It summarizes public OKF draft information and provides practical examples for learning and implementation planning."
        ]
      },
      {
        heading: "No warranty",
        paragraphs: [
          "The content is provided for general guidance. You are responsible for reviewing templates, validator output, and examples before using them in production workflows."
        ]
      },
      {
        heading: "Acceptable use",
        bullets: [
          "Do not use the validator with confidential secrets or private personal data.",
          "Do not represent this website as official Google documentation.",
          "Do not rely on this site as legal, security, or compliance advice."
        ]
      },
      {
        heading: "Contact",
        paragraphs: [
          'Questions about these terms can be sent to <a href="#" class="obfuscated-email" data-user="tangjei414" data-domain="gmail.com">Send Email</a>.'
        ]
      }
    ]
  }
};

export const comparePages: Record<string, ComparePage> = {
  "okf-vs-mcp": {
    path: "/compare/okf-vs-mcp/",
    title: "OKF vs MCP: Knowledge Format and Tool Protocol Compared",
    description:
      "Compare Open Knowledge Format and Model Context Protocol: OKF organizes knowledge, MCP connects tools, and the two can work together.",
    h1: "OKF vs MCP",
    eyebrow: "Comparison",
    intro:
      "MCP connects tools. OKF organizes knowledge. Use both when an agent needs structured context and controlled actions.",
    summaryRows: [
      {
        label: "Purpose",
        okf: "Organize knowledge content into readable files with metadata.",
        other: "Connect AI applications to tools, resources, and data sources."
      },
      {
        label: "Best for",
        okf: "Stable knowledge packs, documentation context, support notes, and data catalogs.",
        other: "Tool access, runtime integration, controlled actions, and resource discovery."
      },
      {
        label: "Input",
        okf: "Markdown files with YAML metadata, links, citations, and body sections.",
        other: "Client requests, server capabilities, tools, resources, and prompts."
      },
      {
        label: "Output",
        okf: "Structured knowledge that an agent or reviewer can inspect before use.",
        other: "A connection layer for calling tools or reading resources through a protocol."
      },
      {
        label: "Can work together",
        okf: "Yes. OKF can be the structured input an MCP server reads or exposes.",
        other: "Yes. MCP can serve, search, validate, or update OKF bundles."
      }
    ],
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "MCP connects tools. OKF organizes knowledge. MCP, Model Context Protocol, is not a replacement for OKF, Open Knowledge Format.",
          "OKF can act as structured input when an MCP server reads knowledge. MCP is closer to a connection layer. OKF is closer to a knowledge format layer."
        ]
      },
      {
        heading: "Choosing the right layer",
        paragraphs: [
          'Use this section to decide whether your current problem is tool access, knowledge structure, or both. For retrieval context, compare <a href="/compare/okf-vs-rag/">OKF vs RAG</a>. For source files, start with <a href="/okf-templates/">OKF templates</a>, inspect working <a href="/okf-examples/">OKF examples</a>, and check files with the <a href="/okf-validator/">OKF validator</a>.'
        ],
        subsections: [
          {
            heading: "When to use MCP",
            text: "Use MCP when an AI client needs controlled access to tools, databases, calendars, ticket systems, internal resources, or live actions."
          },
          {
            heading: "When to use OKF",
            text: "Use OKF when source knowledge is scattered and needs readable files, YAML metadata, links, citations, and stable review boundaries."
          },
          {
            heading: "How MCP and OKF work together",
            text: "Store knowledge as OKF files, then let an MCP server expose search, read, validate, or update operations for those files."
          },
          {
            heading: "Common confusion between MCP and OKF",
            text: "MCP does not organize your knowledge by itself. OKF does not connect an agent to live tools by itself."
          }
        ]
      },
      {
        heading: "Visual explainer for MCP",
        paragraphs: [
          "This video is included as visual background for MCP only. It does not verify any claim about OKF or prove that OKF and MCP should be combined."
        ],
        video: {
          embedUrl: "https://www.youtube-nocookie.com/embed/ksLab69-Rkw",
          originalUrl: "https://www.youtube.com/watch?v=ksLab69-Rkw",
          title: "MCP visual explainer video",
          fallbackText: "Watch the MCP explainer on YouTube",
          note: "Evidence boundary: video result used as background only, not as proof of the OKF comparison."
        }
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "Is OKF a replacement for MCP?",
            text: "No. OKF organizes knowledge files. MCP connects clients to tools and resources at runtime."
          },
          {
            heading: "Can MCP serve OKF files?",
            text: "Yes. A server could expose search, read, validate, or update operations for OKF bundles."
          },
          {
            heading: "Which should I build first?",
            text: "If your knowledge is messy, start with OKF. If your agent cannot reach tools safely, start with MCP."
          },
          {
            heading: "Can OKF be used as MCP input?",
            text: "Yes. OKF files can provide structured knowledge for an MCP server to read, search, or return as context."
          }
        ]
      }
    ]
  },
  "okf-vs-rag": {
    path: "/compare/okf-vs-rag/",
    title: "OKF vs RAG: Source Knowledge and Retrieval Compared",
    description:
      "Compare OKF vs RAG: OKF structures source knowledge before indexing, while RAG retrieves relevant context at answer time.",
    h1: "OKF vs RAG",
    eyebrow: "Comparison",
    intro:
      "Use OKF before retrieval when your source knowledge is messy. Use RAG when the model needs to fetch relevant context at answer time.",
    summaryRows: [
      {
        label: "Primary role",
        okf: "Defines how knowledge files are structured and linked.",
        other: "Retrieves relevant context before a model answers."
      },
      {
        label: "Layer",
        okf: "Source preparation and review layer.",
        other: "Retrieval and generation pipeline layer."
      },
      {
        label: "Input quality",
        okf: "Improves source clarity with titles, descriptions, tags, and headings.",
        other: "Depends heavily on chunk quality, metadata, and source freshness."
      },
      {
        label: "Output",
        okf: "Readable Markdown concept files and metadata.",
        other: "Selected context chunks used in an answer."
      },
      {
        label: "Relationship",
        okf: "Can become a structured source corpus for RAG.",
        other: "Can index and retrieve OKF documents."
      }
    ],
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "RAG, Retrieval Augmented Generation, is a retrieval and generation method. OKF, Open Knowledge Format, is a knowledge organization format.",
          "RAG solves how to find content. OKF solves how content is organized before it is searched, reviewed, or indexed. They are not replacements for each other and can work together."
        ]
      },
      {
        heading: "How the two layers differ",
        paragraphs: [
          "OKF gives source files predictable metadata and body structure. Titles, descriptions, tags, resource identifiers, citations, and links can help indexing, filtering, and human review before content enters a retrieval pipeline.",
          'If you are new to the format, start with <a href="/what-is-okf/">what OKF means</a>, then compare <a href="/okf-templates/">OKF templates</a> and <a href="/okf-examples/">OKF examples</a> before checking files in the <a href="/okf-validator/">OKF validator</a>.'
        ],
        subsections: [
          {
            heading: "OKF vs RAG: quick difference",
            text: "OKF shapes the source corpus. RAG searches that corpus and passes selected context to a model at answer time."
          },
          {
            heading: "When to use OKF with RAG",
            text: "Use OKF before RAG when documents are inconsistent, metadata is missing, citations are weak, or reviewers need cleaner files before indexing."
          }
        ]
      },
      {
        heading: "Workflow example",
        paragraphs: [
          "A simple OKF RAG workflow keeps content cleanup separate from retrieval behavior. That separation makes it easier to test whether poor answers come from weak source files or weak retrieval."
        ],
        bullets: [
          "Collect source documents.",
          "Structure knowledge with OKF.",
          "Add YAML metadata.",
          "Index the content for retrieval.",
          "Use RAG to retrieve relevant context.",
          "Generate answers with cleaner context."
        ],
        subsections: [
          {
            heading: "RAG vs OKF workflow example",
            text: "RAG starts from a query and retrieves context. OKF starts earlier by making the source documents easier to index, filter, and review."
          },
          {
            heading: "Common mistakes when using OKF with RAG",
            text: "Do not treat OKF as a retrieval engine, skip retrieval evaluation, or assume cleaner files automatically fix stale or missing source facts."
          }
        ]
      },
      {
        heading: "How RAG retrieves context",
        bullets: [
          "A user query is converted into a retrieval request.",
          "The system searches indexed content using embeddings, keyword search, filters, reranking, or a mix of methods.",
          "Relevant chunks are attached to the model prompt.",
          "The model generates an answer that should still be checked against the source."
        ]
      },
      {
        heading: "Use both together",
        bullets: [
          "Write focused OKF files for durable concepts.",
          "Validate frontmatter and review claims.",
          "Index the OKF bundle into your retrieval system.",
          "Evaluate answer quality against source files, not only model output."
        ],
        paragraphs: [
          "Can OKF improve RAG retrieval? It can improve the source structure that retrieval uses: cleaner titles, metadata, tags, and citations can make filtering and review easier. It does not guarantee better ranking, recall, or answer accuracy by itself.",
          "Is OKF a replacement for RAG? No. A RAG system still needs retrieval logic, indexing, ranking, prompt assembly, and evaluation."
        ]
      },
      {
        heading: "Visual background on RAG",
        paragraphs: [
          "This video is included as visual background for RAG. It does not prove that OKF is better than RAG or that RAG results improve after using OKF."
        ],
        video: {
          embedUrl: "https://www.youtube-nocookie.com/embed/TuzpTb56b3s",
          originalUrl: "https://www.youtube.com/watch?v=TuzpTb56b3s",
          title: "RAG visual background video",
          fallbackText: "Watch the RAG background video on YouTube",
          note: "Evidence boundary: video result used as background only, not as proof of an OKF performance claim."
        }
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "Is OKF the same as RAG?",
            text: "No. OKF is a format for organizing knowledge. RAG is a method for retrieving context and generating answers."
          },
          {
            heading: "Does OKF replace RAG?",
            text: "No. OKF can prepare source files, but RAG still handles retrieval, context selection, and answer generation."
          },
          {
            heading: "Can OKF improve RAG retrieval quality?",
            text: "It can help when poor structure is the problem. It does not fix weak indexing, stale content, or bad ranking rules."
          },
          {
            heading: "When should I use OKF before building a RAG system?",
            text: "Use it before indexing when documents are mixed, duplicated, hard to review, or missing useful metadata."
          }
        ]
      }
    ]
  },
  "okf-vs-llms-txt": {
    path: "/compare/okf-vs-llms-txt/",
    title: "OKF vs llms.txt: Knowledge Bundle or AI Content Map",
    description:
      "Compare OKF and llms.txt: OKF packages structured knowledge, while llms.txt points AI systems toward selected site content.",
    h1: "OKF vs llms.txt",
    eyebrow: "Comparison",
    intro:
      "Use llms.txt to point AI readers to important site resources. Use OKF to package deeper structured knowledge and relationships.",
    summaryRows: [
      {
        label: "Primary role",
        okf: "Packages structured knowledge as a bundle.",
        other: "Lists and explains important AI-readable site resources."
      },
      {
        label: "Scope",
        okf: "Multiple concept files with metadata, citations, links, and body content.",
        other: "A site-level orientation file that points to selected resources."
      },
      {
        label: "Shape",
        okf: "Many Markdown files with YAML frontmatter and links.",
        other: "Usually one text file with curated links and summaries."
      },
      {
        label: "SEO evidence",
        okf: "A structure and readability asset, not a ranking guarantee.",
        other: "A visibility aid proposal, not a proven ranking guarantee."
      },
      {
        label: "Relationship",
        okf: "Can be linked from llms.txt as a deeper source.",
        other: "Can point AI systems to OKF pages, templates, and bundle downloads."
      }
    ],
    sections: [
      {
        heading: "OKF and llms.txt solve different jobs",
        paragraphs: [
          "A site-level llms.txt file can tell AI systems what the site is, which pages matter, and where useful resources live.",
          "It is compact and useful for orientation, but it is not a full knowledge model by itself. OKF is better when you need typed concepts, relationships, citations, and many linked files."
        ]
      },
      {
        heading: "What llms.txt points to",
        bullets: [
          "You only need a short site entry point.",
          "You want to list the most important public pages.",
          "You want to explain which resources are useful for AI readers.",
          "You do not need a multi-file knowledge bundle."
        ]
      },
      {
        heading: "What OKF packages",
        bullets: [
          "Use OKF when you need one concept per file.",
          "Use OKF when metadata, citations, related concepts, and review timestamps matter.",
          "Use OKF when the content should live in Git, zip archives, or static hosting.",
          "Use OKF when agents need deeper context than a link list can provide."
        ]
      },
      {
        heading: "How to use both on one site",
        bullets: [
          'Keep <a href="/llms.txt">/llms.txt</a> as the short entry point.',
          'Keep <a href="/llms-full.txt">/llms-full.txt</a> as the expanded site guide when useful.',
          "Link OKF templates, examples, validator, and future downloadable bundles from those files.",
          "Avoid claiming that either file guarantees AI search traffic."
        ]
      },
      {
        heading: "What neither file can guarantee",
        paragraphs: [
          "The safe claim is that llms.txt and OKF can make site resources easier to orient and inspect. Public evidence is not strong enough to claim that either file directly guarantees ranking, indexing, or AI citations."
        ]
      },
      {
        heading: "Related OKF resources",
        bullets: [
          '<a href="/okf-examples/">OKF Examples</a> for deeper bundle patterns after a link-list entry point.',
          '<a href="/okf-templates/">OKF Templates</a> for copy-ready concept files.',
          '<a href="/okf-folder-validator/">OKF Folder Validator</a> for checking local bundle structure.',
          '<a href="/guides/validate-okf-bundle/">Validate OKF Bundle</a> before publishing a multi-file knowledge package.'
        ]
      },
      {
        heading: "Visual background on llms.txt",
        paragraphs: [
          "This video is included as visual background for llms.txt only. It does not prove SEO impact or AI citation gains."
        ],
        video: {
          embedUrl: "https://www.youtube-nocookie.com/embed/r1ZhHme4LjI",
          originalUrl: "https://www.youtube.com/watch?v=r1ZhHme4LjI&vl=en",
          title: "llms.txt visual background video",
          fallbackText: "Watch the llms.txt background video on YouTube",
          note: "Evidence boundary: video result used as background only, not as proof of SEO benefit."
        }
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "Do I need both?",
            text: "Use llms.txt for orientation. Add OKF when you need deeper structured concept files."
          },
          {
            heading: "Does llms.txt guarantee AI search visibility?",
            text: "No. Treat visibility benefit claims as pending unless a platform publishes direct confirmation."
          },
          {
            heading: "Can llms.txt link to OKF?",
            text: "Yes. It can point AI readers to OKF guides, examples, templates, and bundles."
          }
        ]
      }
    ]
  },
  "okf-vs-openapi": {
    path: "/compare/okf-vs-openapi/",
    title: "OKF vs OpenAPI: Knowledge Context and API Contracts Compared",
    description:
      "Compare OKF and OpenAPI: OpenAPI describes API contracts, while OKF adds knowledge context, examples, owners, and related operations.",
    h1: "OKF vs OpenAPI",
    eyebrow: "Comparison",
    intro:
      "OpenAPI describes API contracts. OKF describes the knowledge context around APIs, data, metrics, and operations. They are complementary.",
    summaryRows: [
      {
        label: "Primary role",
        okf: "Packages knowledge context around APIs, data, docs, metrics, and operations.",
        other: "Describes HTTP API contracts, operations, schemas, and request or response behavior."
      },
      {
        label: "Artifact",
        okf: "Markdown concept files with YAML frontmatter.",
        other: "OpenAPI description documents, commonly written in YAML or JSON."
      },
      {
        label: "Best fit",
        okf: "Endpoint meaning, business rules, owners, runbooks, examples, and citations.",
        other: "API contract design, documentation, testing, mocks, and client or server tooling."
      },
      {
        label: "Owner",
        okf: "Docs, developer relations, support, product, data, and platform teams.",
        other: "API platform, backend, developer tooling, and integration teams."
      },
      {
        label: "Do not confuse",
        okf: "Does not validate OpenAPI schemas or replace an API contract.",
        other: "Does not explain every surrounding business workflow by itself."
      },
      {
        label: "Relationship",
        okf: "Can reference OpenAPI resources and explain surrounding context.",
        other: "Can remain the source of truth for the API contract."
      }
    ],
    sections: [
      {
        heading: "The short answer",
        paragraphs: [
          "Use OpenAPI for the API contract. Use OKF for the knowledge around that contract: why the endpoint exists, who owns it, what examples matter, what metrics it affects, and which runbooks support it.",
          "Do not replace an OpenAPI description with an OKF file. OKF can point to OpenAPI and add context that a contract file usually does not carry."
        ]
      },
      {
        heading: "What OpenAPI describes",
        paragraphs: [
          "OpenAPI is used to describe HTTP APIs across their lifecycle. It can capture paths, operations, parameters, schemas, request bodies, responses, authentication, and related API tooling inputs."
        ],
        bullets: [
          "API contract and operation shape.",
          "Request and response schemas.",
          "Documentation, mocks, tests, and client or server generation inputs.",
          "YAML or JSON description files."
        ]
      },
      {
        heading: "What OKF describes",
        paragraphs: [
          "OKF describes curated knowledge as Markdown concept files with frontmatter. Around an API, that context can include endpoint purpose, business rules, owner notes, related metrics, support workflows, and citations."
        ],
        bullets: [
          "Knowledge context around API contracts.",
          "Links to OpenAPI descriptions, runbooks, metrics, docs, and support notes.",
          "Reviewable Markdown that can live beside docs or code.",
          "Draft OKF fields such as `type`, with recommended fields for title, description, resource, tags, and timestamp."
        ]
      },
      {
        heading: "When to use OpenAPI",
        bullets: [
          "You need a precise HTTP API contract.",
          "You need request and response schemas.",
          "You need tooling for documentation, mocks, tests, clients, or servers.",
          "You need contract review between backend and integration teams."
        ]
      },
      {
        heading: "When to use OKF",
        bullets: [
          "You need to explain why an endpoint exists and how it fits the product.",
          "You need owners, runbooks, escalation notes, or support boundaries.",
          "You need related metrics, dashboards, data tables, or examples.",
          "You need citations and review notes beside the API context.",
          "You need agent-readable context without changing the OpenAPI contract."
        ]
      },
      {
        heading: "How to use OKF with OpenAPI",
        bullets: [
          "Keep OpenAPI as the source of truth for the API contract.",
          "Create one OKF concept file for each durable endpoint or API area.",
          "Set `resource` to the canonical API reference, OpenAPI file URL, or stable internal identifier.",
          "Link related metrics, data tables, support playbooks, and docs.",
          "Validate the OKF frontmatter, then manually review the business claims.",
          "For a conversion workflow, use the <a href=\"/guides/openapi-to-okf/\">OpenAPI to OKF guide</a> before expanding a full API bundle."
        ]
      },
      {
        heading: "Copy an API OKF template",
        paragraphs: [
          "Start with an API OKF file only after the OpenAPI contract has a stable reference. Replace the sample URL, method, request fields, response notes, and citations before publishing."
        ],
        code: {
          label: "API OKF template",
          value: templateLibrary[1].code
        }
      },
      {
        heading: "Visual background on OpenAPI",
        paragraphs: [
          "This video is included as visual background for OpenAPI only. It does not prove any claim about OKF or prove that automatic OpenAPI to OKF conversion is accurate."
        ],
        video: {
          embedUrl: "https://www.youtube-nocookie.com/embed/0iEo0nmNAGQ",
          originalUrl: "https://www.youtube.com/watch?v=0iEo0nmNAGQ",
          title: "OpenAPI visual background video",
          fallbackText: "Watch the OpenAPI explainer on YouTube",
          note: "Evidence boundary: video result used as background only, not as proof of the OKF relationship."
        }
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "Is OKF an OpenAPI alternative?",
            text: "No. Keep OpenAPI for the API contract. Use OKF for surrounding knowledge context."
          },
          {
            heading: "Can OKF reference an OpenAPI file?",
            text: "Yes. Put the OpenAPI URL or stable internal reference in `resource` or link it from the Markdown body."
          },
          {
            heading: "Can I generate OKF from OpenAPI?",
            text: "You can generate a draft, but owners, business rules, examples, and warnings need human review."
          },
          {
            heading: "Does OKF validate OpenAPI?",
            text: "No. Use OpenAPI tooling for schema and contract validation."
          }
        ]
      },
      {
        heading: "Related pages",
        bullets: [
          '<a href="/okf-validator/">OKF Validator</a> for checking API context files.',
          '<a href="/templates/api-okf-template/">API OKF template</a> for endpoint context.',
          '<a href="/use-cases/okf-for-api-docs/">OKF for API docs</a> for a full use case workflow.',
          '<a href="/guides/how-to-create-okf-for-api-docs/">How to create OKF for API docs</a> for step-by-step setup.'
        ]
      }
    ]
  }
};
