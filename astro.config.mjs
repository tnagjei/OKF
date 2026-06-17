// input: site.config.mjs
// output: Astro static build configuration
// pos: root build config (update rule: sync this header and root README when this file changes)
import { defineConfig } from "astro/config";
import { siteConfig } from "./site.config.mjs";

export default defineConfig({
  site: siteConfig.url,
  output: "static",
  pageExtensions: ["astro", "ts"],
  devToolbar: {
    enabled: false
  }
});
