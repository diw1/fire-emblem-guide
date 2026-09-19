# 火纹作战手册 · 凯伊线

《火焰纹章：万缕千丝 / 万紫千红》的中文速查攻略，面向有系列经验的困难经典玩家。

第一版只整理凯伊线：培养方向、角色分工、挖角门槛、每周训练、临战准备和原文来源。4 月 2 日的具体任务仍待确认；另外三条路线尚未编写。

## 网站

https://diw1.github.io/fire-emblem-guide/

## 本地预览

需要 Node.js 20 或更新版本，无第三方依赖。

```sh
node scripts/validate.mjs
node scripts/serve.mjs
```

打开 http://127.0.0.1:4187 。

## 发布

推送 `main` 或手动运行 `Deploy guide to GitHub Pages` 工作流，校验后上传 `dist/` 并发布到 GitHub Pages。仓库 Pages 的 Build and deployment Source 设置为 GitHub Actions。

## 内容维护

- 页面及攻略：`dist/index.html`
- 响应式样式：`dist/styles.css`
- 部署：`.github/workflows/pages.yml`
- 文本和资源完整性校验：`scripts/validate.mjs`

区分来源记载与配队建议；不把未确认的日期推断成章节，不把计划描述为已完成。每条攻略保留来源链接和资料日期。无需外部字体、图片 CDN 或前端框架，页面阅读、目录导航及折叠内容不依赖 JavaScript。

本项目为非官方攻略，与 Nintendo / Intelligent Systems 无关联。未包含游戏原图、游戏文件或其他对话资料。
