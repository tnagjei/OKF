# Open Knowledge Format Guide

- 用途：英文 OKF 非官方资源中心，覆盖学习、模板、示例、单文件与文件夹验证器、对比页、场景页与 how-to 问题页。
- 技术栈：Astro 静态网站框架、TypeScript 类型脚本语言、少量浏览器端 JavaScript 网页脚本语言。
- 域名：`https://openknowledgeformat.online`

## 页面路由

- `/`：首页
- `/what-is-okf/`：什么是 Open Knowledge Format
- `/okf-tutorial/`：入门教程
- `/okf-examples/`：示例库
- `/okf-templates/`：模板库
- `/okf-validator/`：浏览器端 OKF 验证器
- `/okf-folder-validator/`：浏览器端 OKF 文件夹验证器
- `/compare/okf-vs-mcp/`：OKF 对比 MCP
- `/compare/okf-vs-rag/`：OKF 对比 RAG
- `/compare/okf-vs-llms-txt/`：OKF 对比 llms.txt
- `/compare/okf-vs-openapi/`：OKF 对比 OpenAPI
- `/compare/okf-vs-agents-md/`：OKF 对比 AGENTS.md
- `/compare/okf-vs-data-catalog/`：OKF 对比 data catalog
- `/compare/okf-vs-knowledge-graph/`：OKF 对比 knowledge graph
- `/compare/okf-vs-markdown/`：OKF 对比 Markdown
- `/use-cases/okf-for-websites/`：网站场景页
- `/use-cases/okf-for-api-docs/`：API docs 场景页
- `/use-cases/okf-for-saas/`：SaaS 场景页
- `/use-cases/okf-for-data-warehouses/`：数据仓库场景页
- `/use-cases/okf-for-documentation-sites/`：文档站场景页
- `/use-cases/okf-for-ai-agents/`：AI agents 场景页
- `/use-cases/okf-for-seo/`：SEO 场景页
- `/use-cases/okf-for-ai-search/`：AI search 场景页
- `/templates/*-okf-template/`：独立模板详情页，共 10 个
- `/guides/*/`：OKF how-to 问题页，共 12 个
- `/about/`：关于本站
- `/contact/`：联系方式
- `/privacy/`：隐私政策
- `/terms/`：使用条款

## 开发命令

```bash
npm install
npm run dev
```

## 构建命令

```bash
npm run build
```

## 验证命令

```bash
npm run verify
```

验证脚本会检查 `dist` 构建产物中的公开页面、canonical 规范链接、单个 H1、基础 SEO 文件、非官方声明，以及是否残留占位域名。

可选浏览器验证：

```bash
npm run dev -- --host 127.0.0.1 --port 4321
npm run verify:browser
```

浏览器验证会检查 375px 与 430px 移动端宽度、横向溢出、H1 数量，以及 OKF validator 正确示例、错误示例和 folder validator 示例 bundle。

## SEO 与基础文件说明

- `src/pages/404.astro`：生成自定义 404.html 错误页面（不包含在 sitemap.xml 中）。
- `src/pages/robots.txt.ts`：生成 `robots.txt`，包含 sitemap 与 AI crawler 提示。
- `src/pages/sitemap.xml.ts`：根据 `site.config.mjs` 的路由注册表生成 sitemap。
- `src/pages/llms.txt.ts`：生成给大语言模型读取的短版站点说明。
- `src/pages/llms-full.txt.ts`：生成给大语言模型读取的完整版站点说明。
- `scripts/generate-og-image.mjs`：在 prebuild 阶段自动绘制生成尺寸为 1200x630 的社交分享图 `public/og-image.png`。


## 关键配置

- `site.config.mjs`：集中维护站点名称、域名、联系邮箱、版权信息、公开路由与导航。
- 联系邮箱：`tangjei414@gmail.com`
- 所有页面必须保留非官方声明：`This is an unofficial guide to Open Knowledge Format. It is not affiliated with Google.`

## IndexNow

IndexNow 是用于通知支持 IndexNow 的搜索引擎页面已新增、更新或删除的协议。它只帮助搜索引擎更快发现变化，不保证收录，也不保证 Google 收录。

### 本项目如何配置

1. 复制环境变量模板：

```bash
cp .env.example .env
```

2. 生成 IndexNow key：

```bash
npm run indexnow:key
```

3. 把生成的 key 填入 `.env` 的 `INDEXNOW_KEY`。
4. 确认 `.env` 的 `SITE_URL` 是：

```env
SITE_URL=https://openknowledgeformat.online
```

5. 不要提交真实 `.env`。本项目已经在 `.gitignore` 忽略 `.env`。

### Cloudflare Pages 设置

在 Cloudflare Pages 后台设置环境变量：

1. Project，项目。
2. Settings，设置。
3. Environment variables，环境变量。
4. 添加 `SITE_URL`，值为 `https://openknowledgeformat.online`。
5. 添加 `INDEXNOW_KEY`，值为你生成的 key。
6. 重新部署。

### 部署后验证 key 文件

部署后打开：

```text
https://openknowledgeformat.online/{INDEXNOW_KEY}.txt
```

页面内容必须只显示 key 本身，不能有额外说明。构建时如果没有设置 `INDEXNOW_KEY`，构建仍会成功，只会跳过 key 文件生成。

### 提交 URL

提交 sitemap 中的所有合格 URL：

```bash
npm run build
npm run indexnow:submit
```

上线前 dry-run，试运行，不发送网络请求：

```bash
npm run build
npm run indexnow:submit -- --dry-run
```

提交单个 URL：

```bash
npm run indexnow:submit -- https://openknowledgeformat.online/okf-validator/
```

注意事项：

1. 不要提交 `.env`。
2. 不要把 key 写死进源码。
3. 不要提交不属于 `openknowledgeformat.online` host，主机名，的 URL。
4. IndexNow 不保证 Google 收录。
5. 真实提交前，先确认 `https://openknowledgeformat.online/{INDEXNOW_KEY}.txt` 能公开访问。

## 后续扩展方向

- 增加真实 OKF bundle 下载包。
- 增加模板复制后的字段编辑器。
- 增加更完整的 YAML frontmatter 解析与导出功能。
- 增加博客或更新日志栏目，持续覆盖 OKF 规范变化。
- 将 IndexNow 提交接入部署后的手动审批或独立 CI 任务，避免无意重复提交。
