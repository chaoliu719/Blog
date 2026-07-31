---
title: 第一篇文章
description: 基础 Markdown 夹具，覆盖标题、列表、代码块等常见元素。
pubDate: 2025-01-15
tags: [回归夹具, Markdown]
draft: true
---

# 欢迎

这是一篇基础的 Markdown 夹具，用来检查最常见的排版元素是否正常。

## 覆盖的元素

- 多级标题
- 有序 / 无序列表
- 行内代码与代码块
- 加粗、斜体等行内样式

### 代码块

```javascript
function greet(name) {
  return `你好，${name}！`;
}

console.log(greet('世界'));
```

## 列表

有序列表：

1. 第一项
2. 第二项
3. 第三项

无序列表：

- 咖啡
- 茶
- 牛奶

## 行内样式

这里有**加粗**、_斜体_，以及行内代码 `const a = 1`。中英文混排时的间距是这一节的观察重点，
比如 Astro 和中文之间、数字 2026 和中文之间。
