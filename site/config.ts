export interface SiteConfig {
  author: string;
  desc: string;
  title: string;
  ogImage: string;
  lang: string;
  base: string;
  website: string;
  social: Record<string, string>;
  googleAnalyticsId?: string;
  homeHeroDescription: string;
  blogDescription: string;
  projectsDescription: string;

  // Homepage post counts
  featuredPostsCount: number;
  latestPostsCount: number;

  // Homepage projects
  homeProjects: {
    enabled: boolean;
    count: number;
  };

  // Homepage appearances
  homeAppearances: {
    enabled: boolean;
    count: number;
  };

  // Page visibility
  pages: {
    projects: { enabled: boolean };
    appearances: { enabled: boolean };
  };

  // CTA (Call-to-Action) block for blog posts
  cta: {
    enabled: boolean;
    filePath: string; // Path to markdown file with CTA content
  };

  // Homepage Hero block
  hero: {
    enabled: boolean;
    filePath: string;
  };

  // Giscus comments configuration
  comments: {
    enabled: boolean;
    repo: string; // e.g., 'username/repo'
    repoId: string;
    category: string;
    categoryId: string;
    mapping: 'pathname' | 'url' | 'title' | 'og:title' | 'specific' | 'number';
    reactionsEnabled: boolean;
    emitMetadata: boolean;
    inputPosition: 'top' | 'bottom';
    theme: string; // e.g., 'preferred_color_scheme', 'light', 'dark'
    lang: string;
  };
}

export const SITE: SiteConfig = {
  author: 'Maos',
  title: 'Maos 的 AI 实验室',
  desc: '正在探索 AI 如何改造组织与业务，记录实践与思考',
  ogImage: 'og.png',
  lang: 'zh-CN',
  base: '/',
  website: 'https://liuchao.life',
  social: {
    x: 'https://x.com/chaoliu719',
    github: 'https://github.com/chaoliu719',
    xiaohongshu: 'https://www.xiaohongshu.com/user/profile/5df5f22400000000010046ab',
  },
  googleAnalyticsId: '', // Example: 'G-XXXXXXXXXX'
  homeHeroDescription:
    'Building premium web experiences with Astro, Svelte, and Tailwind. Focused on performance, aesthetics, and clean code. I am currently working on open-source tools and sharing my journey through writing.',
  blogDescription: '记录 AI 实践中的思考、踩坑与方法。',
  projectsDescription: '一些自己做的小工具，大多是开源的。',

  // Homepage post counts
  featuredPostsCount: 0,
  latestPostsCount: 15,

  // Homepage projects
  homeProjects: {
    enabled: true,
    count: 3,
  },

  // Homepage appearances
  homeAppearances: {
    enabled: false,
    count: 3,
  },

  // Page visibility
  pages: {
    projects: { enabled: true },
    appearances: { enabled: false },
  },

  // CTA (Call-to-Action) block for blog posts
  cta: {
    enabled: false,
    filePath: 'site/cta.md',
  },

  hero: {
    enabled: true,
    filePath: 'site/hero.md',
  },

  // Giscus comments configuration
  // Get your configuration from https://giscus.app
  comments: {
    enabled: false, // Set to true after filling in the IDs below
    repo: 'chaoliu719/Blog', // Your GitHub repository
    repoId: '', // Get from https://giscus.app - enter repo above and copy the value
    category: 'General', // GitHub Discussions category name
    categoryId: '', // Get from https://giscus.app - select category and copy the value
    mapping: 'pathname',
    reactionsEnabled: true,
    emitMetadata: false,
    inputPosition: 'bottom',
    theme: 'preferred_color_scheme', // Automatically matches your site theme
    lang: 'zh-CN',
  },
};
