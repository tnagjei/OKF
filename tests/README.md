# tests
- 用途：放置可选的浏览器验证脚本。
- 关键入口：`browser.spec.js`。
- 边界/依赖：默认不进入生产构建，依赖 `@playwright/test` 开发期测试工具。
> 一旦本目录内容变化，请更新本文件

## Files
- `browser.spec.js`：检查核心页、对比页、场景页、模板页、问题页的移动端横向溢出、H1 数量和 OKF validator 行为。
