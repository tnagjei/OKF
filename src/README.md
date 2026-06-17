# src
- 用途：Astro 源码目录，承载页面、组件、布局、样式与内容数据。
- 关键入口：`pages/index.astro`、`layouts/BaseLayout.astro`、`data/content.ts`。
- 边界/依赖：只依赖 Astro 和根目录 `site.config.mjs`。
> 一旦本目录内容变化，请更新本文件

## Files
- `components/`：可复用 UI 组件。
- `data/`：页面内容、模板与示例数据。
- `layouts/`：全站 HTML 布局与 SEO 元标签。
- `pages/`：公开路由与文本端点。
- `styles/`：全站 CSS 样式。
