## 1. Schema and lib changes

- [x] 1.1 In `src/content.config.ts`: remove `featured: z.boolean()` from the schema.
- [x] 1.2 In `src/content.config.ts`: change `links[].label` enum from `['Live demo', 'GitHub', 'Details']` to `['Live demo', 'GitHub', 'Blog post']`.
- [x] 1.3 In `src/lib/projects.ts`: remove the featured-count validation (`featuredCount !== 1` check).
- [x] 1.4 In `src/lib/projects.ts`: replace the folder-prefix `number` derivation (`entry.id.match(/^\d+/)`) with a computed value — sort a copy of entries by `date` ascending (tie-break alphabetically by `title`), assign 1-indexed position as `number`, zero-padded to 2 digits.
- [x] 1.5 In `src/lib/projects.ts`: simplify the render-order sort to `date` descending only (drop the featured-first branch).

## 2. Remove old project entries

- [x] 2.1 Delete `src/content/projects/01-pale-blue-dot-nasa/`.
- [x] 2.2 Delete `src/content/projects/03-lidar-slam-comparison/`.
- [x] 2.3 Delete `src/content/projects/04-ubidots-cli/`.
- [x] 2.4 Delete `src/content/projects/06-covid19-colombia-dashboard/`.

## 3. Migrate existing entries to new format

- [x] 3.1 Rename `src/content/projects/07-erdos-unit-distance/` → `src/content/projects/erdos-unit-distance/`; update `data.yaml`: date to `2026-05`, add GitHub link (`https://github.com/cristianrubioa/erdos`), remove `featured` field, remove `Details` link.
- [x] 3.2 Rename `src/content/projects/08-stringweave/` → `src/content/projects/stringweave/`; update `data.yaml`: date to `2026-06`, add GitHub link (`https://github.com/cristianrubioa/stringweave`), remove `featured` field, change `Details` link label to `Blog post`.

## 4. Add new project entries

- [x] 4.1 Create `src/content/projects/readmecraft/data.yaml` — title ReadmeCraft, description (self-updating GitHub profile README), tags: [tools], date `2026-04`, favicon `https://readmecraft.crubio.fyi/favicon.svg`, links: Live demo, GitHub, Blog post.
- [x] 4.2 Create `src/content/projects/blog/data.yaml` — title Blog, description (personal blog), tags: [writing], date `2026-05`, favicon `https://blog.crubio.fyi/favicon.svg`, links: Live demo only.
- [x] 4.3 Create `src/content/projects/celeste/data.yaml` — title Celeste, description (star map for any place and time), tags: [astronomy], date `2026-05`, favicon `https://celeste.crubio.fyi/favicon.svg`, links: Live demo, GitHub, Blog post.
- [x] 4.4 Create `src/content/projects/cvcraft/data.yaml` — title CVCraft, description (CV builder), tags: [tools], date `2026-05`, favicon `https://cvcraft.crubio.fyi/favicon.svg`, links: Live demo only.
- [x] 4.5 Create `src/content/projects/bookforge/data.yaml` — title BookForge, description **[NEEDS REVIEW — no source text provided, placeholder used]**, tags: [tools], date `2026-06`, favicon `https://bookforge.crubio.fyi/favicon.svg`, links: Live demo only.
- [x] 4.6 Create `src/content/projects/argus/data.yaml` — title Argus, description **[NEEDS REVIEW — no source text provided, placeholder used]**, tags: [tools], date `2026-08`, favicon `https://argus.crubio.fyi/favicon.svg`, links: Live demo, GitHub.
- [x] 4.7 Create `src/content/projects/signia/data.yaml` — title Signia, description (email signature without depending on a service), tags: [tools], date `2026-09`, favicon `https://signia.crubio.fyi/favicon.svg`, links: Live demo, GitHub, Blog post.

## 5. Thumbnails

- [x] 5.1 Run `node scripts/screenshot.mjs <folder> <url>` for each of the 9 project folders against their live URL (readmecraft, blog, celeste, cvcraft, erdos-unit-distance, bookforge, stringweave, argus, signia) to generate real `thumbnail.png` files. Build will fail until every folder has one.

## 6. Verify

- [x] 6.1 Run `npm run build` and confirm it succeeds with exactly 9 project entries, no featured-count error, and no missing-thumbnail error.
- [x] 6.2 Visually check the rendered grid (`npm run dev` or `npm run preview`): numbers run 01–09 oldest-to-newest, links show the right labels, tag filter chips include the new tags.
- [ ] 6.3 Confirm final description copy for BookForge and Argus with the user before considering the change complete.
