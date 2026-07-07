// input: static page override requests from SEO data review
// output: targeted page content overrides for CTR and intent optimization
// pos: page override data layer (update rule: sync this header and src/data README when this file changes)
import { minimumExample, type ComparePage, type LongformPage } from "./content";

export const longformPageOverrides = {
  "what-is-okf": {
    path: "/what-is-okf/",
    title: "What Is OKF? Open Knowledge Format Meaning and Examples",
    description:
      "OKF means Open Knowledge Format: a Markdown and YAML metadata format for packaging knowledge. See the definition, meaning, and examples.",
    h1: "What is OKF? Open Knowledge Format meaning",
    eyebrow: "OKF definition",
    intro:
      "OKF means Open Knowledge Format. It uses Markdown and YAML metadata to package knowledge. It is different from Open Knowledge Foundation.",
    sections: [
      {
        heading: "OKF meaning",
        paragraphs: [
          "In this guide, OKF means Open Knowledge Format. It is a draft approach for describing knowledge as readable Markdown files with structured YAML frontmatter at the top of each file.",
          "The goal is not to replace documentation, databases, MCP, or RAG. The goal is to give humans and AI agents a cleaner way to inspect what a piece of knowledge is about before loading deeper context."
        ]
      },
      {
        heading: "OKF definition",
        paragraphs: [
          "Open Knowledge Format is a file-based knowledge packaging format. A basic OKF document combines a YAML metadata block with a Markdown body so a concept can carry a type, title, description, resource link, tags, timestamp, and human-readable explanation.",
          "A useful OKF bundle usually contains many small concept files plus an index file. Each concept should describe one durable item, such as a website page, API endpoint, data table, product rule, support playbook, or documentation topic."
        ]
      },
      {
        heading: "OKF file example",
        paragraphs: [
          "The smallest useful OKF file starts with frontmatter, then continues as normal Markdown. Keep the concept narrow and point `resource` to the canonical page, asset, or stable identifier it describes."
        ],
        code: {
          label: "Minimal OKF file example",
          value: minimumExample
        }
      },
      {
        heading: "Is OKF related to Google?",
        paragraphs: [
          "Public OKF draft materials are available from GoogleCloudPlatform sources, but this website is an unofficial learning site. It explains the draft, adds practical templates, and provides browser-only validation helpers. It is not a Google product page or official Google documentation."
        ]
      },
      {
        heading: "OKF vs Open Knowledge Foundation",
        paragraphs: [
          "Open Knowledge Format and Open Knowledge Foundation can both be abbreviated as OKF, but they are not the same thing. On this website, OKF always refers to Open Knowledge Format unless a section explicitly says otherwise."
        ],
        bullets: [
          "Open Knowledge Format is the knowledge packaging format discussed on this site.",
          "Open Knowledge Foundation is a separate organization name and should not be confused with the format.",
          "Search snippets should make the difference clear because users may search for OKF meaning, OKF definition, or what is OKF."
        ]
      },
      {
        heading: "What an OKF document contains",
        bullets: [
          "`type`: the concept category. In the draft specification, this is the required field.",
          "`title`: a human-readable name for the concept.",
          "`description`: a short summary for previews, indexes, and search snippets.",
          "`resource`: a stable URL, URN, or asset identifier.",
          "`tags`: short labels for grouping related files.",
          "`timestamp`: an ISO 8601 datetime for the last meaningful update."
        ]
      },
      {
        heading: "Start from these OKF resources",
        bullets: [
          '<a href="/okf-tutorial/">Read the OKF tutorial</a> to build a first bundle.',
          '<a href="/okf-examples/">Browse OKF examples</a> to see bundle patterns.',
          '<a href="/okf-templates/">Copy OKF templates</a> for websites, API docs, SaaS, documentation, and data catalogs.',
          '<a href="/okf-validator/">Use the OKF validator</a> to check frontmatter before publishing.',
          '<a href="/okf-folder-validator/">Use the OKF folder validator</a> before publishing a multi-file bundle.'
        ]
      },
      {
        heading: "Evidence and limits",
        paragraphs: [
          "This site is an unofficial guide. Public Google Cloud and GoogleCloudPlatform materials are useful references, but this site does not certify official OKF conformance or guarantee AI search visibility."
        ]
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "What is OKF in simple words?",
            text: "OKF is a way to package knowledge as Markdown files with YAML metadata so people and AI agents can understand what each file represents."
          },
          {
            heading: "Is OKF a database?",
            text: "No. OKF is a file format and bundle pattern, not a database, vector store, or hosted service."
          },
          {
            heading: "Is OKF official Google documentation?",
            text: "No. This website is unofficial. It uses public draft references and adds practical examples for learning."
          },
          {
            heading: "What should I create first?",
            text: "Start with one small OKF file for a website page, API endpoint, documentation topic, or data table, then validate the frontmatter."
          }
        ]
      }
    ]
  },
  "okf-templates": {
    path: "/okf-templates/",
    title: "OKF Templates: Copy Open Knowledge Format YAML Examples",
    description:
      "Browse copy-ready OKF templates with YAML examples for websites, API docs, SaaS, documentation, AI agent context, and data catalogs.",
    h1: "Copy-ready OKF templates for YAML knowledge files",
    eyebrow: "Template library",
    intro:
      "Copy practical OKF templates for websites, API docs, SaaS, documentation, AI agent context, and data catalogs.",
    kind: "templates",
    sections: [
      {
        heading: "Copy a template first",
        paragraphs: [
          "Start with the template closest to your source material, replace the placeholder resource, title, tags, and timestamp, then paste the result into the OKF Validator. Do not start by reading theory if your goal is to create a working OKF file.",
          "The templates below are practical starters, not official certification tests. They help you create focused Markdown files with YAML metadata that are easier to review, index, and connect."
        ]
      },
      {
        heading: "How to choose the right OKF template",
        bullets: [
          "Use the Website OKF template for public pages, landing pages, pricing pages, help pages, and trust pages.",
          "Use the API OKF template for endpoint meaning, request notes, errors, limits, and surrounding business context.",
          "Use the SaaS OKF template for product concepts such as workspaces, seats, billing limits, roles, and feature gates.",
          "Use the Documentation OKF template for task pages, reference pages, onboarding guides, and troubleshooting topics.",
          "Use the AI Agent Context OKF template for policies, routing rules, tool boundaries, and escalation notes.",
          "Use the Data Catalog OKF template for tables, metrics, dashboards, freshness notes, and ownership context."
        ]
      },
      {
        heading: "Before you copy an OKF template",
        bullets: [
          "Keep one concept per file instead of mixing unrelated topics.",
          "Replace every placeholder URL, timestamp, tag, and title before publishing.",
          "Use a stable URN or internal identifier when a concept has no public URL.",
          "Remove private or restricted records before putting any bundle on a public website.",
          '<a href="/okf-validator/">Validate copied Markdown with the OKF Validator</a> before expanding the body.'
        ]
      },
      {
        heading: "Bad example vs fixed example",
        paragraphs: [
          "A weak template copy usually lacks `type`, source context, and a stable resource. A fixed OKF example keeps the same concept but adds metadata that makes the file easier to review and reuse."
        ],
        code: {
          label: "Bad template copy",
          value: `---
title: Pricing
---

# Pricing

This page has everything about pricing.`
        }
      },
      {
        heading: "Fixed OKF template example",
        code: {
          label: "Fixed website OKF template",
          value: `---
type: Website Page
title: Pricing page
description: Explains plan tiers, billing limits, refunds, and upgrade paths.
resource: https://openknowledgeformat.online/sample/pricing/
tags: [website, pricing, billing]
timestamp: 2026-06-21T00:00:00Z
---

# Pricing page

Use this file for stable pricing facts, exclusions, source links, and review notes.`
        }
      },
      {
        heading: "Validate every copied template",
        bullets: [
          '<a href="/okf-validator/">Open the OKF Validator</a>.',
          "Paste the copied template Markdown.",
          "Fix missing `type`, `title`, `description`, or `tags` warnings before publishing.",
          '<a href="/okf-folder-validator/">Run the OKF Folder Validator</a> when the template becomes part of a multi-file bundle.',
          "Manually review factual claims because frontmatter validation cannot prove the content is true.",
          '<a href="/compare/okf-vs-rag/">Read OKF vs RAG</a> and <a href="/compare/okf-vs-mcp/">OKF vs MCP</a> if the template will be used in an agent workflow.'
        ]
      },
      {
        heading: "Examples vs templates",
        paragraphs: [
          "Templates are blank starters you copy before writing source-specific facts. Examples show bundle patterns after fields and body sections have been filled in."
        ],
        bullets: [
          '<a href="/okf-examples/">Use OKF examples</a> when you need to compare finished bundle shapes.',
          '<a href="/okf-folder-validator/">Run the folder validator</a> after a template becomes part of a bundle.'
        ]
      },
      {
        heading: "FAQ",
        subsections: [
          {
            heading: "What is an OKF template?",
            text: "An OKF template is a copy-ready Markdown starter with YAML frontmatter fields such as type, title, description, resource, tags, and timestamp."
          },
          {
            heading: "How do I use an OKF template?",
            text: "Copy the closest template, replace placeholders with your real source details, write one focused Markdown body, then validate the file."
          },
          {
            heading: "Can OKF templates work with RAG?",
            text: "Yes. OKF templates can help prepare cleaner source files before a RAG system indexes and retrieves content."
          },
          {
            heading: "Can OKF templates work with MCP?",
            text: "Yes. MCP can expose tools or resources that read, search, validate, or update OKF files, but OKF itself is not MCP."
          },
          {
            heading: "How do I validate an OKF file?",
            text: "Paste the Markdown into the OKF Validator, fix frontmatter errors first, then manually review the actual claims and links."
          }
        ]
      }
    ]
  }
} satisfies Record<string, LongformPage>;

export const comparePageOverrides = {
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
        okf: "OKF is a knowledge organization format for source files.",
        other: "RAG is a retrieval method for finding relevant context before generation."
      },
      {
        label: "Problem solved",
        okf: "Solves how knowledge is structured, described, linked, and reviewed.",
        other: "Solves how a system finds useful content for a user query."
      },
      {
        label: "Layer",
        okf: "Source preparation and review layer.",
        other: "Retrieval and generation pipeline layer."
      },
      {
        label: "Input quality",
        okf: "Improves titles, descriptions, tags, resource links, headings, and citations before indexing.",
        other: "Depends on chunk quality, metadata, filters, reranking, and source freshness."
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
        heading: "How RAG retrieves context",
        bullets: [
          "A user query is converted into a retrieval request.",
          "The system searches indexed content using embeddings, keyword search, filters, reranking, or a mix of methods.",
          "Relevant chunks are attached to the model prompt.",
          "The model generates an answer that should still be checked against the source."
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
        heading: "Related pages",
        bullets: [
          '<a href="/okf-examples/">OKF examples</a> for bundle patterns that can become retrieval sources.',
          '<a href="/okf-templates/">OKF templates</a> for copy-ready YAML starters.',
          '<a href="/okf-validator/">OKF Validator</a> for checking frontmatter before indexing.',
          '<a href="/what-is-okf/">What is OKF?</a> for the definition and minimal file example.'
        ]
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
  }
} satisfies Record<string, ComparePage>;
