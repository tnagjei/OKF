# components
- 用途：放置全站复用的 Astro 组件。
- 关键入口：`Header.astro`、`Footer.astro`、`CodeBlock.astro`、`LongformPage.astro`。
- 边界/依赖：组件只读取传入 props 或共享站点配置，不直接执行数据获取。
> 一旦本目录内容变化，请更新本文件

## Files
- `CodeBlock.astro`：带复制按钮的代码块。
- `Footer.astro`：全站页脚与非官方声明。
- `Header.astro`：全站导航。
- `LongformPage.astro`：通用内容页渲染组件。
