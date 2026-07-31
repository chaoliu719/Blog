---
title: 站点配置说明
description: 站点配置项的参考文档，同时作为夹具覆盖长文档结构、深层嵌套列表和多语言代码块。
pubDate: 2026-02-01
tags: [回归夹具, 参考]
featured: true
draft: true
---

配置全部集中在 `site/config.ts`。这篇按本仓库实际的字段来写，可以直接对照修改。

## 目录约定

核心约定是：**`src/` 是模板引擎，`site/` 是你自己的东西**。日常写作只碰 `site/`。

| 位置                        | 用途                 |
| --------------------------- | -------------------- |
| `site/config.ts`            | 站点全局配置         |
| `site/content/posts/`       | 文章                 |
| `site/content/projects/`    | 项目条目             |
| `site/content/appearances/` | 演讲、播客等露出     |
| `site/hero.md`              | 首页 hero 文案       |
| `site/cta.md`               | 文末行动号召         |
| `site/assets/`              | favicon、OG 图、头像 |

## 基本信息

```ts
export const SITE: SiteConfig = {
  author: 'Maos',
  title: 'Maos 的 AI 实验室',
  desc: '正在探索 AI 如何改造组织与业务，记录实践与思考',
  ogImage: 'og.png',
  lang: 'zh-CN',
  base: '/',
  website: 'https://liuchao.life',
};
```

> `website` 会被 `astro.config.mjs` 读取，用于生成 sitemap、RSS 和 OG 图的绝对地址。
> 换域名时改这一处即可。

## 社交链接

```ts
social: {
  x: 'https://x.com/chaoliu719',
  github: 'https://github.com/chaoliu719',
  xiaohongshu: 'https://www.xiaohongshu.com/user/profile/...',
},
```

留空的平台不会显示图标。

## 首页

- `homeHeroDescription` —— hero 区的介绍文字
- `featuredPostsCount` —— 精选文章条数（对应 frontmatter 的 `featured: true`）
- `latestPostsCount` —— 最新文章条数
- `homeProjects` / `homeAppearances` —— 是否显示以及显示几条

## 页面开关

```ts
pages: {
  projects: { enabled: false },
  appearances: { enabled: false },
},
```

注意：这个开关控制的是**导航入口和页面可达性**。

## 评论

评论用 Giscus，基于 GitHub Discussions：

```ts
comments: {
  enabled: false,
  repo: 'username/repo',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname',
  theme: 'preferred_color_scheme',
},
```

启用前需要：

1. 仓库是**公开**的
2. 已安装 [Giscus app](https://github.com/apps/giscus)
3. 仓库开启了 Discussions 功能
4. 从 giscus.app 拿到 `repoId` 和 `categoryId`

## 内容集合

集合定义在 `src/content.config.ts`，三个集合都带 zod schema 校验：

- **posts** —— 文章，字段最多，支持草稿、系列、多语言
- **projects** —— 项目，用 `order` 排序，支持 `draft`
- **appearances** —— 演讲/播客，按日期倒序，支持 `draft`

改 schema 后记得跑 `pnpm check`，类型会自动重新生成。

## 样式

样式入口是 `src/styles/global.css`，用 Tailwind 4。

需要注意的是代码高亮：主题在 `astro.config.mjs` 的 `shikiConfig` 里配置，
亮色用 `min-light`，暗色用 `catppuccin-frappe`。而 shiki transformer
（行高亮、单词高亮、diff 标注）产生的 class 需要 `global.css` 里有对应规则才会生效。

## 部署

推送到 `main` 后 Vercel 自动构建部署。构建命令和产物目录用默认值即可：

```bash
pnpm build   # 产物在 dist/
```

## 故障排查

### 构建失败

多半是 frontmatter 不满足 schema。看报错里的文件名和字段名，对照
`src/content.config.ts` 修正。

### 端口被占用

Astro 7 的 dev server 是后台守护进程，重复执行 `pnpm dev` 不会重启它：

```bash
pnpm astro dev status   # 查看状态
pnpm astro dev stop     # 停止
pnpm astro dev logs     # 查看日志
```

### 热更新不生效

改 `site/config.ts` 之类的配置文件后通常需要重启 dev server。
