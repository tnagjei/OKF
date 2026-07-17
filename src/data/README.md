# data
- 用途：集中维护英文页面内容、OKF 模板、示例、对比页数据、SEO 集群数据、页面覆盖数据、长尾页面数据与视频嵌入元信息。
- 关键入口：`content.ts`、`seoClusters.ts`、`pageOverrides.ts`、`longTailPages.ts`。
- 边界/依赖：只输出静态数据，不访问网络或浏览器 API。
> 一旦本目录内容变化，请更新本文件

## Files
- `content.ts`：长内容页、对比页、模板库、示例库与首页片段数据；包含 compare 页面边界说明。
- `seoClusters.ts`：扩展对比页、场景页、模板详情页与 how-to 问题页数据；承接 bundle、Website to OKF、OpenAPI to OKF、验证错误与 AI agents 刷新内容。
- `pageOverrides.ts`：页面级 SEO 覆盖内容，保留模板页资源边界和证据边界。
- `longTailPages.ts`：第三轮长尾页面、OpenAPI 对比覆盖、示例页增强覆盖数据，避免重复薄页扩张。
