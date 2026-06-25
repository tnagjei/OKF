# components
- 用途：放置全站复用的 Astro 组件。
- 关键入口：`Header.astro`、`Footer.astro`、`CodeBlock.astro`、`LongformPage.astro`、`ClusterPage.astro`、`LazyVideo.astro`。
- 边界/依赖：组件只读取传入 props 或共享站点配置，不直接执行数据获取。
> 一旦本目录内容变化，请更新本文件

## Files
- `CodeBlock.astro`：带复制按钮的代码块。
- `ClusterPage.astro`：SEO 资源中心页面渲染组件，支持步骤、表格、视频占位、FAQ、内链和 CTA。
- `Footer.astro`：全站页脚与非官方声明。
- `Header.astro`：全站导航。
- `LazyVideo.astro`：轻量视频占位组件，用户点击后才注入 iframe。
- `LongformPage.astro`：通用内容页渲染组件，支持正文、代码块、视频占位，并在模板库模块中追加验证器入口。