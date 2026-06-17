# Open Knowledge Format Guide

- 用途：英文 OKF 非官方指南站，覆盖学习、模板、示例、验证器与对比页面。
- 技术栈：Astro 静态网站框架、TypeScript 类型脚本语言、少量浏览器端 JavaScript 网页脚本语言。
- 域名：`https://openknowledgeformat.online`

## 页面路由

- `/`：首页
- `/what-is-okf/`：什么是 Open Knowledge Format
- `/okf-tutorial/`：入门教程
- `/okf-examples/`：示例库
- `/okf-templates/`：模板库
- `/okf-validator/`：浏览器端 OKF 验证器
- `/compare/okf-vs-mcp/`：OKF 对比 MCP
- `/compare/okf-vs-rag/`：OKF 对比 RAG
- `/compare/okf-vs-llms-txt/`：OKF 对比 llms.txt
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

浏览器验证会检查 375px 与 430px 移动端宽度、横向溢出、H1 数量，以及 OKF validator 正确示例和错误示例。

## SEO 文件说明

- `src/pages/robots.txt.ts`：生成 `robots.txt`，包含 sitemap 与 AI crawler 提示。
- `src/pages/sitemap.xml.ts`：根据 `site.config.mjs` 的路由注册表生成 sitemap。
- `src/pages/llms.txt.ts`：生成给大语言模型读取的短版站点说明。
- `src/pages/llms-full.txt.ts`：生成给大语言模型读取的完整版站点说明。

## 关键配置

- `site.config.mjs`：集中维护站点名称、域名、联系邮箱、版权信息、公开路由与导航。
- 联系邮箱：`tangjei414@gmail.com`
- 所有页面必须保留非官方声明：`This is an unofficial guide to Open Knowledge Format. It is not affiliated with Google.`

## 后续扩展方向

- 增加真实 OKF bundle 下载包。
- 增加模板复制后的字段编辑器。
- 增加更完整的 YAML frontmatter 解析与导出功能。
- 增加博客或更新日志栏目，持续覆盖 OKF 规范变化。
