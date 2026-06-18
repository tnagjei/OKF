# scripts
- 用途：放置本地验证脚本与 IndexNow 自动化脚本。
- 关键入口：`verify-site.mjs`、`generate-indexnow-key-file.mjs`、`create-indexnow-key.mjs`、`indexnow-submit.mjs`、`generate-favicons.mjs`。
- 边界/依赖：优先使用 Node.js 内置能力；除提交脚本外不联网；不把真实 key 写入源码。
> 一旦本目录内容变化，请更新本文件

## Files
- `verify-site.mjs`：检查公开页面、SEO 元信息、H1 数量与基础文件。
- `generate-indexnow-key-file.mjs`：构建前按 `INDEXNOW_KEY` 生成 `public/{key}.txt`。
- `create-indexnow-key.mjs`：生成随机 IndexNow key，不自动修改 `.env`。
- `indexnow-submit.mjs`：从命令行 URL 或 `dist/sitemap.xml` 读取 URL，并提交或 dry-run。
- `generate-favicons.mjs`：根据站点配置生成 favicon、manifest 和触摸图标。
