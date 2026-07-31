---
title: 'splitpatch'
description: '把体积过大的 patch 按目录结构智能拆分成若干小 patch，让 review 和分工重新成为可能。已发布到 PyPI。'
github: 'https://github.com/chaoliu719/splitpatch'
tags: ['Python', 'Git', '开发工具']
types: ['open-source']
order: 2
draft: false
---

起因是一个 AOSP 的巨型 patch。

别人丢过来一个改动，涉及几十上百个文件、横跨各个目录。这种东西**我自己没法审**——打开就是几千行 diff，看到一半上下文就丢了；**也没法分给手下的人审**，因为它拆不开，没办法说「你负责这块、我负责那块」。

于是有了 splitpatch：按目录结构把大 patch 切成若干个小 patch。

## 和同类工具的区别

已有的拆分工具（比如 Ubuntu 自带的 `splitpatch`、或者 `split-patch`）通常按**单个文件**或**单个 hunk** 来切。小改动上够用，但面对大型项目会把逻辑模块切碎——同一个功能的改动散落在十几个碎片里，反而更难读。

这个工具的思路不同：

- **按目录拆，不按文件或 hunk 拆**——以目录结构为依据，保住逻辑模块的完整性
- **智能合并与路径优化**——分析目录层级和文件数量，把零散的小改动合并成有意义的分组
- **保持文件完整**——同一个文件的多个 hunk 始终留在同一个 patch 里，不破坏文件级的上下文

结果是拆出来的分组更贴近人的直觉和项目本身的结构，而不是机械等分。

## 用法

```bash
pip install splitpatch

# 基本用法
splitpatch patch.diff --outdir patches

# 控制目录层级和文件数阈值
splitpatch patch.diff --outdir patches --level 2 --threshold 5
```

无第三方依赖，也可以直接 clone 下来用。
