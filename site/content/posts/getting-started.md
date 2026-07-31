---
title: Astro 与 Svelte 上手
description: 技术栈说明类夹具，覆盖多级标题、嵌套列表、目录树代码块和外部链接。
pubDate: 2025-01-20
tags: [回归夹具, Astro, Svelte]
draft: true
---

# Astro 与 Svelte 上手

这篇夹具用来检查偏「文档型」文章的排版：多级标题、嵌套列表、纯文本代码块和外链混在一起时的表现。

## 这套组合的优势

### Astro

- **默认零 JS** —— 只发送真正需要的脚本
- **岛屿架构** —— 组件各自独立水合
- **内容集合** —— 带类型校验的内容管理
- **开发体验好** —— 构建快，热更新及时

### Svelte

- **代码量少** —— 比 React、Vue 更简洁
- **真正的响应式** —— 没有虚拟 DOM 开销
- **性能好** —— 打包体积小
- **易上手** —— API 直观

## 目录结构

```
src/
├── components/
│   └── ui/
│       └── button/
├── content/
│   ├── config.ts
│   └── posts/
├── layouts/
└── pages/
```

## 后续步骤

1. 浏览组件库
2. 多写几篇文章
3. 添加自定义布局
4. 部署到生产环境

## 参考资料

- [Astro 文档](https://docs.astro.build)
- [Svelte 文档](https://svelte.dev)

预期：上面两个外链应在新标签页打开。

祝写作愉快 🚀
