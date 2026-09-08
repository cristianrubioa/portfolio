import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>['data'] & {
  id: string;
  number: string;
};

/**
 * Loads all projects. The display number is each project's 1-indexed
 * position when sorted by date ascending (oldest = No. 01), ties broken
 * alphabetically by title — independent of the grid's render order below.
 */
export async function getProjects(): Promise<Project[]> {
  const entries = await getCollection('projects');

  const numbers = new Map(
    [...entries]
      .sort(
        (a, b) =>
          a.data.date.getTime() - b.data.date.getTime() ||
          a.data.title.localeCompare(b.data.title),
      )
      .map((entry, index) => [entry.id, String(index + 1).padStart(2, '0')]),
  );

  return entries
    .map((entry) => ({
      ...entry.data,
      id: entry.id,
      number: numbers.get(entry.id)!,
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}
