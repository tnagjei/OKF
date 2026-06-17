# scripts
- 用途：放置本地验证脚本。
- 关键入口：`verify-site.mjs`。
- 边界/依赖：只读取本地 `dist` 构建产物，不联网、不修改源码。
> 一旦本目录内容变化，请更新本文件

## Files
- `verify-site.mjs`：检查公开页面、SEO 元信息、H1 数量与基础文件。
