---
title: 如何发布文章
description: 写作与发布流程的参考文档，同时作为夹具覆盖表格、引用块、嵌套列表和多种代码块。
pubDate: 2026-02-01
tags: [回归夹具, 参考]
featured: true
draft: true
---

这篇既是**参考文档**，也是排版夹具。内容按本仓库的实际结构写，路径和字段都可以直接照用。

## 新建文章

在 `site/content/posts/` 下新建 `.md` 或 `.mdx` 文件即可。

文件名默认就是 URL 的一部分，最终地址形如 `/posts/2026-02-01-my-post`（日期前缀自动加）。
下划线开头的文件（如 `_template.md`）会被内容加载器跳过。

## Frontmatter 字段

### 必填

| 字段          | 类型   | 说明                        |
| ------------- | ------ | --------------------------- |
| `title`       | 字符串 | 文章标题                    |
| `description` | 字符串 | 摘要，用于 SEO 和列表页     |
| `pubDate`     | 日期   | 发布日期，格式 `2026-02-01` |

### 可选

| 字段              | 类型       | 默认值       | 说明                          |
| ----------------- | ---------- | ------------ | ----------------------------- |
| `draft`           | 布尔       | `false`      | `true` 时只在 dev 可见        |
| `tags`            | 字符串数组 | `['others']` | 标签                          |
| `featured`        | 布尔       | —            | 是否进首页精选                |
| `slug`            | 字符串     | —            | 覆盖默认的日期前缀命名        |
| `lang`            | 字符串     | `'en'`       | 语言标记                      |
| `updatedDate`     | 日期       | —            | 更新日期                      |
| `series`          | 对象       | —            | `{ id, order }`，串联系列文章 |
| `translatedPosts` | 映射       | —            | 语言到 slug，跨语言互链       |
| `ogImage`         | 字符串     | —            | 自定义 OG 图                  |
| `showCTA`         | 布尔       | `true`       | 是否显示文末 CTA              |
| `showComments`    | 布尔       | `true`       | 是否显示评论                  |

> 字段校验由 `src/content.config.ts` 里的 zod schema 负责。
> 写错字段名或类型，`pnpm build` 会直接失败——这是好事，能在发布前拦住问题。

## 草稿与日期过滤

两种方式都能让文章不出现在线上：

1. **草稿**：`draft: true`
2. **未来日期**：`pubDate` 晚于今天

两者行为一致——在 `pnpm dev` 里可见，在 `pnpm build` 的产物里被排除。
逻辑在 `src/lib/utils/posts.ts` 的 `getPublishedPosts()`。

```yaml
---
title: 还没写完
pubDate: 2026-12-31 # 未来日期，同样不会发布
draft: true
---
```

## 图片

放在 `site/assets/` 的图片可以用绝对路径引用：

```markdown
![说明文字](/og.png)
```

Astro 会自动优化并生成 WebP。构建日志里能看到类似
`profile_photo.webp (before: 727kB, after: 10kB)` 的输出。

## 系列文章

给同一系列的文章写相同的 `series.id`，用 `order` 决定顺序：

```yaml
series:
  id: 'my-series'
  order: 1
```

正文上方会自动出现系列导航。

## 多语言

用 `lang` 标注语言，用 `translatedPosts` 建立互链：

```yaml
lang: 'zh'
translatedPosts:
  en: 'demo-english'
```

## MDX

改用 `.mdx` 扩展名即可在正文里导入 Svelte 组件：

```mdx
import Counter from '../_components/Counter.svelte';

<Counter client:load />
```

注意必须加 `client:load` 之类的指令，否则组件不会水合，页面上是死的。

## 发布流程

1. 写作，`pnpm dev` 本地预览
2. `pnpm check:all` 跑类型检查和 lint
3. 把 `draft` 改成 `false`
4. `pnpm build` 确认构建通过
5. 提交并推送到 `main`，Vercel 自动部署
