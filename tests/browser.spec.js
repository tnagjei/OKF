// input: running local Astro dev server URL from BASE_URL or default localhost
// output: Playwright assertions for mobile layout and validator behavior
// pos: optional browser QA spec (update rule: sync this header and tests README when this file changes)
import { expect, test } from "@playwright/test";

const baseUrl = process.env.BASE_URL || "http://127.0.0.1:4321";
const mobileRoutes = [
  { path: "/", width: 375 },
  { path: "/okf-validator/", width: 430 },
  { path: "/compare/okf-vs-mcp/", width: 375 }
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
  await expect(page.locator("#validator-output")).toContainText("Missing YAML frontmatter");

  await page.locator("[data-load-example=good]").click();
  await expect(page.locator("#validator-status")).toHaveText("Valid");
});
