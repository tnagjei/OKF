// input: no runtime input
// output: static content collections for pages, examples, templates, and comparisons
// pos: content data layer (update rule: sync this header and src/data README when this file changes)
export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
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
    label: "GoogleCloudPlatform knowledge-catalog OKF specification",
    href: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md"
  },
  {
    label: "GoogleCloudPlatform knowledge-catalog OKF README",
    href: "https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/README.md"
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
timestamp: 2026-06-17T00:00:00Z
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
timestamp: 2026-06-17T00:00:00Z
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
timestamp: 2026-06-17T00:00:00Z
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
timestamp: 2026-06-17T00:00:00Z
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
timestamp: 2026-06-17T00:00:00Z
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
timestamp: 2026-06-17T00:00:00Z
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
timestamp: 2026-06-17T00:00:00Z
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
    nextStep: "Generate a draft from OpenAPI, then manually review examples and warnings."
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
      "A plain English explanation of Open Knowledge Format, OKF bundles, YAML frontmatter, Markdown files, required fields, and agent-ready knowledge.",
    h1: "What is Open Knowledge Format?",
    eyebrow: "OKF basics",
    intro:
      "Open Knowledge Format, or OKF, is a draft format for packaging knowledge as readable Markdown files with small YAML frontmatter fields.",
    sections: [
      {
        heading: "The short definition",
        paragraphs: [
          "OKF describes knowledge as a directory of Markdown files. Each file represents a concept, such as a data table, API endpoint, product rule, support playbook, documentation topic, or website page.",
          "The YAML frontmatter at the top of a file gives machines a few stable fields to scan. The Markdown body gives humans and AI agents the context they need to understand the concept."
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
        heading: "Why OKF is useful for agents",
        paragraphs: [
          "An agent does not always need a database, embedding pipeline, or custom SDK to understand a knowledge base. If the knowledge is already organized into files, frontmatter, headings, and links, the agent can inspect the structure before loading more content.",
          "That makes OKF useful for teams that want portable context. A bundle can live in Git, ship as a zip archive, or be hosted as static files."
        ]
      },
      {
        heading: "What OKF is not",
        bullets: [
          "OKF is not a Google product page or an official Google service.",
          "OKF is not a replacement for MCP, RAG, OpenAPI, or llms.txt.",
          "OKF is not a database. It is a file format for representing curated knowledge."
        ]
      },
      {
        heading: "Who should care",
        subsections: [
          {
            heading: "Developers",
            text: "Developers can keep API, product, and operational context close to the code review process."
          },
          {
            heading: "SEO teams",
            text: "SEO teams can turn important pages into structured knowledge that is easier for AI systems to interpret."
          },
          {
            heading: "Documentation teams",
            text: "Docs teams can split large manuals into smaller, linked concept files that stay readable outside a single platform."
          }
        ]
      }
    ]
  },
  "okf-tutorial": {
    path: "/okf-tutorial/",
    title: "OKF Tutorial: Build Your First Open Knowledge Format Bundle",
    description:
      "Follow a beginner-friendly OKF tutorial to create an Open Knowledge Format bundle with Markdown files, YAML frontmatter, index pages, and links.",
    h1: "OKF tutorial: build your first knowledge bundle",
    eyebrow: "Step-by-step tutorial",
    intro:
      "This tutorial walks through a small OKF bundle for a website. You can adapt the same pattern for documentation, APIs, data catalogs, and support playbooks.",
    sections: [
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
        heading: "Step 6: publish safely",
        bullets: [
          "Remove private keys, personal data, and internal-only material before public hosting.",
          "Keep `resource` links stable.",
          "Add a review date or timestamp so stale files are easier to spot."
        ]
      }
    ]
  },
  "okf-examples": {
    path: "/okf-examples/",
    title: "OKF Examples: Open Knowledge Format Bundle Patterns",
    description:
      "Browse practical OKF examples for website content, API endpoints, product documentation, support playbooks, SaaS metrics, and knowledge bases.",
    h1: "OKF examples for real knowledge bundles",
    eyebrow: "Example library",
    intro:
      "These examples show how different teams can organize OKF bundles. They are starter patterns, not official conformance tests.",
    kind: "examples",
    sections: [
      {
        heading: "How to read these examples",
        paragraphs: [
          "Each example shows a bundle shape, the fields that matter most, common mistakes, and a practical next step.",
          "Use the structure as a starting point, then adapt file names, tags, and links to your actual content model."
        ]
      }
    ]
  },
  "okf-templates": {
    path: "/okf-templates/",
    title: "OKF Templates: Copy Open Knowledge Format Frontmatter",
    description:
      "Copy OKF templates for websites, APIs, SaaS products, documentation, AI agent context, and data catalogs with field notes and mistakes.",
    h1: "Copy-ready OKF templates",
    eyebrow: "Template library",
    intro:
      "Use these templates to create a first Open Knowledge Format document. The examples follow a stricter guide profile than the draft specification so the files are easier to search and preview.",
    kind: "templates",
    sections: [
      {
        heading: "Before you copy a template",
        paragraphs: [
          "Replace placeholder resources, timestamps, and tags before publishing. If a concept is internal and has no URL, use a stable URN or internal identifier instead of a fake public link.",
          "Keep one concept per file. A short, precise OKF file is easier for an agent to load than a broad document that mixes unrelated ideas."
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
      "OKF and MCP solve different problems. OKF organizes knowledge into files. MCP connects models and agents to tools, resources, and prompts.",
    summaryRows: [
      {
        label: "Primary role",
        okf: "Organizes curated knowledge as Markdown files with frontmatter.",
        other: "Connects AI systems to tools, resources, and external capabilities."
      },
      {
        label: "Best fit",
        okf: "Portable knowledge packages, docs, data catalogs, support playbooks.",
        other: "Runtime tool access, system integration, and controlled agent actions."
      },
      {
        label: "Relationship",
        okf: "Can provide clean context that an MCP server exposes or reads.",
        other: "Can serve, search, or update OKF bundles through a tool interface."
      }
    ],
    sections: [
      {
        heading: "The core difference",
        paragraphs: [
          "MCP is about connection. It gives an AI client a standard way to use tools and resources exposed by a server.",
          "OKF is about organization. It gives people and agents a consistent way to read curated knowledge from ordinary files."
        ]
      },
      {
        heading: "How they can work together",
        bullets: [
          "A team stores product, support, and data context as OKF files.",
          "An MCP server exposes search, read, validate, or update operations for those files.",
          "An agent uses MCP to access the right OKF document instead of loading an unstructured folder."
        ]
      },
      {
        heading: "Decision rule",
        paragraphs: [
          "Use OKF when the problem is messy knowledge. Use MCP when the problem is controlled access to tools or resources. Use both when an agent needs clean knowledge and safe actions."
        ]
      }
    ]
  },
  "okf-vs-rag": {
    path: "/compare/okf-vs-rag/",
    title: "OKF vs RAG: Format and Retrieval Method Compared",
    description:
      "Compare Open Knowledge Format and Retrieval Augmented Generation: RAG retrieves context, while OKF structures the source knowledge before retrieval.",
    h1: "OKF vs RAG",
    eyebrow: "Comparison",
    intro:
      "RAG is a retrieval method. OKF is a knowledge organization format. A cleaner OKF source can improve the quality of content that a RAG system retrieves.",
    summaryRows: [
      {
        label: "Primary role",
        okf: "Defines how knowledge files are structured and linked.",
        other: "Retrieves relevant context before a model answers."
      },
      {
        label: "Input quality",
        okf: "Improves source clarity with titles, descriptions, tags, and headings.",
        other: "Depends heavily on chunk quality, metadata, and source freshness."
      },
      {
        label: "Relationship",
        okf: "Can become a structured source corpus for RAG.",
        other: "Can index and retrieve OKF documents."
      }
    ],
    sections: [
      {
        heading: "RAG answers the retrieval question",
        paragraphs: [
          "A RAG system decides which source chunks to fetch for a user question. It may use embeddings, keyword search, filters, reranking, or a mix of methods.",
          "RAG does not automatically make poor source documents clearer. If the source corpus is vague, outdated, or mixed together, retrieval can still return weak context."
        ]
      },
      {
        heading: "OKF answers the source organization question",
        paragraphs: [
          "OKF gives source files predictable metadata and body structure. Titles, descriptions, tags, resource identifiers, and links can help indexing, filtering, and human review."
        ]
      },
      {
        heading: "Decision rule",
        bullets: [
          "Use OKF to clean the knowledge before indexing.",
          "Use RAG to retrieve the right pieces at answer time.",
          "Review both the OKF bundle and the retrieval behavior when answers are wrong."
        ]
      }
    ]
  },
  "okf-vs-llms-txt": {
    path: "/compare/okf-vs-llms-txt/",
    title: "OKF vs llms.txt: Knowledge Bundle and AI Index Compared",
    description:
      "Compare Open Knowledge Format and llms.txt: llms.txt can guide AI crawlers to resources, while OKF packages structured knowledge files.",
    h1: "OKF vs llms.txt",
    eyebrow: "Comparison",
    intro:
      "llms.txt acts like an AI-readable entry point for a website. OKF acts like a structured knowledge package that can contain many linked Markdown concept files.",
    summaryRows: [
      {
        label: "Primary role",
        okf: "Packages structured knowledge as a bundle.",
        other: "Lists and explains important AI-readable site resources."
      },
      {
        label: "Shape",
        okf: "Many Markdown files with YAML frontmatter and links.",
        other: "Usually one text file with curated links and summaries."
      },
      {
        label: "Relationship",
        okf: "Can be linked from llms.txt as a deeper source.",
        other: "Can point AI systems to OKF pages, templates, and bundle downloads."
      }
    ],
    sections: [
      {
        heading: "llms.txt is an entry point",
        paragraphs: [
          "A site-level llms.txt file can tell AI systems what the site is, which pages matter, and where useful resources live.",
          "It is compact and useful for orientation, but it is not a full knowledge model by itself."
        ]
      },
      {
        heading: "OKF is a knowledge bundle",
        paragraphs: [
          "An OKF bundle can hold many concept files. Each concept can include frontmatter, headings, examples, citations, and links to other concepts."
        ]
      },
      {
        heading: "Decision rule",
        bullets: [
          "Use llms.txt to introduce the site and route AI readers.",
          "Use OKF to package deeper knowledge.",
          "Link the OKF guide, examples, or downloadable bundles from llms.txt when they are ready."
        ]
      }
    ]
  }
};
