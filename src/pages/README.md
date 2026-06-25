# pages
- 用途：放置 Astro 页面路由与动态路由入口。
- 关键入口：`index.astro`、`[slug].astro`、`compare/[slug].astro`。
- 边界/依赖：页面路由读取静态数据并交给组件渲染，不直接访问外部 API。
> 一旦本目录内容变化，请更新本文件

## Files
- `index.astro`：首页路由。
- `[slug].astro`：标准长内容页动态路由，合并基础内容与页面覆盖内容。
- `404.astro`：404 页面。
- `about.astro`：如存在，作为独立关于页面入口。
- `compare/`：对比页面动态路由目录。