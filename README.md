# Maos 的 AI 实验室

个人博客源码，部署在 [liuchao.life](https://liuchao.life)。

技术栈：Astro 7 + Svelte 5 + Tailwind 4，静态构建，Vercel 自动部署。

## 快速开始

```bash
pnpm install
pnpm dev        # http://localhost:4321
```

Astro 7 的 dev server 是后台守护进程，重复执行 `pnpm dev` 不会重启它：

```bash
pnpm astro dev status   # 查看状态
pnpm astro dev stop     # 停止
pnpm astro dev logs     # 查看日志
```

## 常用命令

| 命令             | 用途                       |
| ---------------- | -------------------------- |
| `pnpm dev`       | 本地开发，草稿可见         |
| `pnpm build`     | 生产构建，产物在 `dist/`   |
| `pnpm preview`   | 预览构建产物               |
| `pnpm check`     | 类型检查（Astro + Svelte） |
| `pnpm lint`      | ESLint                     |
| `pnpm check:all` | 上面两项一起跑，提交前用   |
| `pnpm format`    | Prettier 格式化            |

## 目录结构

核心约定：**`src/` 是引擎，`site/` 是内容**。日常写作只碰 `site/`。

```
site/
├── config.ts            # 站点配置：标题、社交链接、首页板块、评论
├── hero.md              # 首页 hero 文案
├── cta.md               # 文末行动号召
├── assets/              # favicon、OG 图、头像
└── content/
    ├── posts/           # 文章
    ├── projects/        # 项目条目
    ├── appearances/     # 演讲、播客
    └── about/           # 关于页

src/
├── pages/               # 路由（文件名即网址）
├── components/          # Svelte / Astro 组件
├── layouts/             # 页面外壳
├── lib/utils/           # 工具函数
├── styles/global.css    # 全站样式
└── content.config.ts    # 内容集合的 schema 定义
```

## 写文章

在 `site/content/posts/` 新建 `.md` 或 `.mdx`：

```yaml
---
title: 标题
description: 摘要，用于 SEO 和列表页
pubDate: 2026-07-31
tags: [标签]
draft: false
lang: 'zh'
---
```

字段由 `src/content.config.ts` 的 zod schema 校验，写错构建会直接失败。
完整字段说明见夹具文章《如何发布文章》（仅在 `pnpm dev` 中可见）。

## 草稿机制

`draft: true` 或 `pubDate` 为未来日期的内容：

- 在 `pnpm dev` 中**可见**
- 在 `pnpm build` 的产物中**被排除**

三个集合（posts / projects / appearances）行为一致，逻辑在
`src/lib/utils/posts.ts` 和 `src/lib/utils/collections.ts`。

## 回归夹具

`site/content/` 里有一批标记为 `回归夹具` 标签的内容，全部是 `draft: true`，
只在开发环境可见，用于升级依赖后验证渲染是否正常。

其中 **`upgrade-smoke-test.mdx`** 是主入口：一页覆盖代码高亮、shiki 的三个
transformer、mermaid、emoji、外链属性和标题锚点，每节都写了预期结果。

升级依赖后的建议流程：

```bash
pnpm update
pnpm build && pnpm check && pnpm lint
pnpm dev    # 打开冒烟测试页，逐项对照
```

注意 mermaid 是客户端渲染的，只能肉眼验证，构建产物里查不出来。

## 部署

推送到 `main` 触发 Vercel 自动构建部署。`.github/workflows/ci.yml` 会在
push 和 PR 时跑 lint、格式检查、类型检查和构建。

## 致谢

本项目基于 [Spaceship](https://github.com/alec-c4/spaceship)（MIT，
Copyright © 2026 Alexey Poimtsev）构建，此后已独立演进：升级到 Astro 7、
补充了 shiki transformer 样式、为 projects/appearances 集合增加草稿支持，
并将示例内容改造为中文回归夹具。原始许可证见 `LICENSE`。
