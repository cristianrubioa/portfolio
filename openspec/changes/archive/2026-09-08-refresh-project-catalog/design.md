## Context

The catalog is a single Astro content collection (`src/content/projects/*/data.yaml`) read by `getProjects()` in `src/lib/projects.ts` and rendered by `index.astro` + `ProjectCard.astro`. Today the folder name doubles as both the content ID and the source of the displayed "No. XX" (via a numeric prefix regex), and a required `featured: boolean` field is validated to appear exactly once and forced to the front of the sort. Both mechanisms require the author to hand-manage global state (which numbers are taken, which single project is featured) every time the catalog changes — this is exactly the friction that surfaced while preparing the new 9-project set, so it's fixed alongside the content swap rather than left for later.

## Goals / Non-Goals

**Goals:**
- Swap the 6 current project entries for the 9 new ones.
- Make the displayed project number a pure function of `date`, removing manual folder-prefix bookkeeping.
- Remove `featured` since it has no distinct rendering today and duplicates what `date`-ordering already does.
- Point the third card link at the project's real blog post instead of a dead internal URL.

**Non-Goals:**
- Generating the real thumbnail screenshots (tracked as a manual follow-up task — requires running `scripts/screenshot.mjs` against each live URL, which needs network/Playwright access at apply time).
- Finalizing exact description copy for BookForge and Argus (no source text was provided; placeholders are used and flagged for review).
- Any visual/layout change to the grid or card component beyond what removing `featured` and renaming the link label requires.

## Decisions

**Project number = 1-indexed position in date-ascending order, computed at build time.**
All entries are sorted by `date` ascending; ties (same year-month) are broken alphabetically by `title`. The project with the oldest date gets No. 01. This replaces the folder-name-prefix derivation.
- Alternative considered: keep a manually authored `order` or numeric-prefix field. Rejected — it's the exact problem being fixed (hand-tracking used numbers, gaps after deletions).
- Alternative considered: number by render order (date descending) directly, i.e. newest = No. 01. Rejected — doesn't match the existing convention (today's oldest project has the lowest folder number), and the user confirmed the ascending/oldest-first reading.
- Consequence: numbers are not stable identities — adding or removing a project can shift other projects' displayed numbers. This is acceptable because nothing else in the codebase treats the number as an identifier; the content ID (folder slug) is what's stable, and `number` is purely a derived display label.

**Project folders become plain slugs with no numeric prefix** (e.g. `readmecraft/`, `erdos-unit-distance/`). The `generateId` loader option in `content.config.ts` still uses the folder name as-is for the ID — no change needed there, since it already just takes the raw folder name; only the downstream regex-based number extraction in `getProjects()` is replaced by the date-position computation.

**`featured` is deleted from the schema, content, and `getProjects()`.** Grid sort becomes a single `date` descending comparator (no featured-first branch, no featured-count validation).

**`links[].label` enum: `'Details'` → `'Blog post'`.** The old label pointed at `crubio.fyi/portfolio/<slug>/`, which resolves to nothing in this codebase (no `/portfolio/` route exists — `src/pages/` only has `index.astro`). The new label is only used when a project has an actual blog post URL; projects without one (Blog, CVCraft, BookForge, Argus) simply have a shorter `links` array.

**Dates authored at year-month granularity** (`2026-05`, not `2026-05-25`). No schema change — `z.coerce.date()` already accepts this via `new Date('2026-05')`. This is purely an authoring convention for new/updated entries, documented in the spec so it reads as intentional.

## Risks / Trade-offs

- **Build fails until real thumbnails exist** → the `image()` schema validator requires a real, readable image file per entry at build time. Mitigation: task to run `scripts/screenshot.mjs <folder> <url>` for each of the 9 live URLs (including `argus.crubio.fyi`) before the change is considered mergeable/deployable; until then the build is expected to fail on missing thumbnails, same fail-fast behavior the catalog already relies on for malformed entries.
- **Placeholder descriptions for BookForge and Argus** → ships with generic, best-guess copy. Mitigation: called out explicitly as an open task; not silently presented as final.
- **Renumbering cascades** → inserting a project with an earlier date than existing ones shifts every subsequent number. Mitigation: this is a display-only, build-time-derived value with no external references (URLs, cross-links) depending on it, so a shift is cosmetic, not a broken-reference risk.

## Migration Plan

1. Update `src/content.config.ts`: drop `featured` from the schema, change the `links[].label` enum value.
2. Update `src/lib/projects.ts`: remove featured-count validation and featured-first sort; replace folder-prefix number regex with the date-ascending position computation (alphabetical tie-break on `title`).
3. Delete the 6 existing project folders (`01-pale-blue-dot-nasa`, `03-lidar-slam-comparison`, `04-ubidots-cli`, `06-covid19-colombia-dashboard`, `07-erdos-unit-distance`, `08-stringweave`).
4. Add the 9 new project folders (plain slugs) with `data.yaml` per the table in `proposal.md`; carry over and adapt the existing description text for Erdős and StringWeave.
5. Generate real thumbnails via `scripts/screenshot.mjs` for all 9 (follow-up task, not blocking spec/code correctness).
6. Update `openspec/specs/project-catalog/spec.md` and `openspec/specs/project-grid/spec.md` requirement text to match (handled via this change's delta specs).

No rollback complexity beyond standard git revert — this is static content plus a small schema/lib change with no runtime data migration.

## Open Questions

- Final description copy for BookForge and Argus (placeholders used for now).
