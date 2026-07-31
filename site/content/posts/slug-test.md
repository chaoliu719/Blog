---
title: 自定义 slug 的文章
description: 这篇文章手动指定了 slug 为 'custom-url'，用来验证 frontmatter 的 slug 覆盖默认的日期前缀命名。
pubDate: 2026-02-01
tags: [回归夹具, slug]
slug: custom-url
draft: true
---

预期：本文的地址是 `/posts/custom-url`，而**不是**默认的 `/posts/2026-02-01-slug-test`。

也就是说 frontmatter 里的 `slug` 字段优先级高于自动生成的「日期-文件名」。
