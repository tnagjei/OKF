// input: running local Astro dev server URL from BASE_URL or default localhost
// output: Playwright assertions for mobile layout and validator behavior
// pos: optional browser QA spec (update rule: sync this header and tests README when this file changes)
import { expect, test } from "@playwright/test";
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4321";
const mobileRoutes = [
  { path: "/", width: 375 },
  { path: "/okf-validator/", width: 430 },
  { path: "/okf-folder-validator/", width: 375 },
  { path: "/compare/okf-vs-mcp/", width: 375 },
  { path: "/compare/okf-vs-openapi/", width: 430 },
  { path: "/use-cases/okf-for-ai-agents/", width: 375 },
  { path: "/templates/metrics-okf-template/", width: 430 },
  { path: "/guides/how-to-create-an-okf-bundle/", width: 375 },
  { path: "/guides/validate-okf-bundle/", width: 430 },
  { path: "/guides/openapi-to-okf/", width: 375 }
];

for (const route of mobileRoutes) {
  test(`mobile route has no horizontal overflow: ${route.path} at ${route.width}px`, async ({ page }) => {
    await page.setViewportSize({ width: route.width, height: 900 });
    await page.goto(`${baseUrl}${route.path}`);

    const hasOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
    );

    await expect(page.locator("main h1")).toHaveCount(1);
    expect(hasOverflow).toBe(false);
  });
}

test("OKF validator accepts the good example and rejects the bad example", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 900 });
  await page.goto(`${baseUrl}/okf-validator/`);

  await expect(page.locator("#validator-status")).toHaveText("Valid");

  await page.locator("[data-load-example=bad]").click();
  await expect(page.locator("#validator-status")).toHaveText("Invalid");
  await expect(page.locator("#validator-output")).toContainText("Missing simple frontmatter");

  await page.locator("[data-load-example=good]").click();
  await expect(page.locator("#validator-status")).toHaveText("Valid");
});

test("OKF folder validator checks the sample bundle", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(`${baseUrl}/okf-folder-validator/`);

  await page.locator("#load-sample-bundle").click();
  await expect(page.locator("#folder-validator-status")).toHaveText("Valid");
  await expect(page.locator("#folder-validator-output")).toContainText("markdown_files_checked: 3");
  await expect(page.locator("#folder-validator-output")).toHaveText(/warnings:\s*\n\s*- none$/);
});

test("OKF folder validator rejects missing frontmatter", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 900 });
  await page.goto(`${baseUrl}/okf-folder-validator/`);

  const bundleDir = mkdtempSync(join(tmpdir(), "okf-missing-frontmatter-"));

  try {
    writeFileSync(join(bundleDir, "bad.md"), "# Missing frontmatter\n\nThis file has no metadata.");

    await page.locator("#folder-input").setInputFiles(bundleDir);
    await page.locator("#validate-folder-button").click();
    await expect(page.locator("#folder-validator-status")).toHaveText("Invalid");
    await expect(page.locator("#folder-validator-output")).toContainText("missing simple frontmatter block.");
  } finally {
    rmSync(bundleDir, { recursive: true, force: true });
  }
});

test("OKF folder validator reports duplicate resources, broken links, and skipped non-Markdown files", async ({ page }) => {
  await page.setViewportSize({ width: 430, height: 900 });
  await page.goto(`${baseUrl}/okf-folder-validator/`);

  const bundleDir = mkdtempSync(join(tmpdir(), "okf-folder-warnings-"));
  const sharedResource = "https://openknowledgeformat.online/sample/duplicate/";
  const makeFile = (title, body) => `---
type: Website Page
title: ${title}
description: Test file for folder validation.
resource: ${sharedResource}
tags: [okf, test]
timestamp: 2026-06-21T00:00:00Z
---

${body}`;

  try {
    mkdirSync(join(bundleDir, "pages"));
    writeFileSync(join(bundleDir, "index.md"), makeFile("Index", "# Index\n\n- [Missing](missing%20page.md?source=test)"));
    writeFileSync(join(bundleDir, "pages", "duplicate.markdown"), makeFile("Duplicate", "# Duplicate\n\nThis uses the same resource."));
    writeFileSync(join(bundleDir, "notes.txt"), "Not Markdown");

    await page.locator("#folder-input").setInputFiles(bundleDir);
    await page.locator("#validate-folder-button").click();
    await expect(page.locator("#folder-validator-status")).toHaveText("Valid");
    await expect(page.locator("#folder-validator-output")).toContainText("markdown_files_checked: 2");
    await expect(page.locator("#folder-validator-output")).toContainText("1 non-Markdown file(s) skipped before reading.");
    await expect(page.locator("#folder-validator-output")).toContainText("resource duplicates");
    await expect(page.locator("#folder-validator-output")).toContainText("relative link target not selected: missing%20page.md?source=test.");
  } finally {
    rmSync(bundleDir, { recursive: true, force: true });
  }
});
