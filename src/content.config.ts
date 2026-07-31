import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/_*'],
    base: './site/content/posts',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    slug: z.string().optional(),
    updatedDate: z.date().optional(),
    tags: z.array(z.string()).default(['others']),
    featured: z.boolean().optional(),
    draft: z.boolean().default(false),
    ogImage: z.string().optional(),
    canonicalURL: z.string().url().optional(),
    showCTA: z.boolean().default(true),
    showComments: z.boolean().default(true),
    lang: z.string().default('en'),
    series: z
      .object({
        id: z.string(),
        order: z.number(),
      })
      .optional(),
    translatedPosts: z.record(z.string(), z.string()).optional(), // lang -> slug mapping
  }),
});

const projects = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/_*'],
    base: './site/content/projects',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /**
     * Where the project can be used: a site, a demo, a published package.
     * Leave it out when the only place to go is the source — otherwise the
     * detail page shows a 访问网站 button next to a GitHub button that both
     * lead to the same URL.
     */
    link: z.string().url().optional(),
    /** The source repository. */
    github: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
    /**
     * What kind of work it is, which is only worth setting once the list holds
     * more than one kind: 'commercial' for paid or client work, 'open-source'
     * for public source, 'social' for something given away.
     */
    types: z.array(z.enum(['commercial', 'open-source', 'social'])).default([]),
    image: z.string().optional(),
    order: z.number().default(0),
    /** Send visitors straight to `link`, skipping the detail page. */
    directLink: z.boolean().default(false).optional(),
    draft: z.boolean().default(false),
  }),
});

const appearances = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/_*'],
    base: './site/content/appearances',
  }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.date(),
    type: z.enum(['talk', 'podcast', 'article', 'workshop', 'video']),
    media: z.enum(['video', 'audio', 'text']).optional(),
    link: z.string().url(),
    description: z.string().optional(),
    lang: z.string().default('en'),
    duration: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const about = defineCollection({
  loader: glob({
    pattern: ['**/*.{md,mdx}', '!**/_*'],
    base: './site/content/about',
  }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { posts, projects, appearances, about };
