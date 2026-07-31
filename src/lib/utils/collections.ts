import { getCollection, type CollectionEntry } from 'astro:content';

/**
 * Get published projects, filtering out drafts.
 * Mirrors the behaviour of getPublishedPosts:
 * - In development, everything is returned, including drafts
 * - In production, entries with draft: true are hidden
 */
export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');

  if (import.meta.env.DEV) {
    return projects;
  }

  return projects.filter((project: CollectionEntry<'projects'>) => !project.data.draft);
}

/**
 * Get published appearances, filtering out drafts.
 * Same development/production split as getPublishedProjects.
 */
export async function getPublishedAppearances(): Promise<CollectionEntry<'appearances'>[]> {
  const appearances = await getCollection('appearances');

  if (import.meta.env.DEV) {
    return appearances;
  }

  return appearances.filter((appearance: CollectionEntry<'appearances'>) => !appearance.data.draft);
}
