import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({
    pattern: '*/data.yaml',
    base: './src/content/projects',
    generateId: ({ entry }) => entry.split('/')[0],
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      tags: z.array(z.string()).min(1),
      date: z.coerce.date(),
      favicon: z.string().url(),
      thumbnail: image(),
      links: z
        .array(
          z.object({
            label: z.enum(['Live demo', 'GitHub', 'Blog post']),
            url: z.string().url(),
          }),
        )
        .max(3),
    }),
});

export const collections = { projects };
