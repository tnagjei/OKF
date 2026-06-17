# layouts
- 用途：放置页面外壳、SEO 元信息与全站脚本。
- 关键入口：`BaseLayout.astro`。
- 边界/依赖：布局读取 `site.config.mjs`，不包含页面正文业务数据。
> 一旦本目录内容变化，请更新本文件

## Files
- `BaseLayout.astro`：全站基础 HTML、canonical、meta、导航、页脚与复制脚本。
