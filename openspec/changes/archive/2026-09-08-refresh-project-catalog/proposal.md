## Why

The current project catalog showcases six older projects (NASA visualization, LiDAR SLAM, Ubidots CLI, COVID-19 dashboard, plus two recent ones) that no longer represent the active body of work. A new set of nine shipped projects — several with their own live sites, repos, and blog write-ups — needs to replace it. Building the new entries also exposed two maintenance frictions in the current catalog design worth fixing at the same time: the displayed project number requires manually picking an unused numeric folder prefix (leading to gaps like `02`/`05` after past removals), and the `featured` field requires hand-picking exactly one project to force to the front even though it has no distinct visual treatment today.

## What Changes

- Replace all 6 existing project entries with 9 new ones: ReadmeCraft, Blog, Celeste, CVCraft, Erdős unit distance explorer, BookForge, StringWeave, Argus, Signia.
- **BREAKING**: Remove the `featured` field from the project schema and content entirely. The catalog grid orders purely by `date` descending (newest first); no project is manually forced to the front.
- **BREAKING**: The displayed project number ("No. XX") is no longer derived from the project folder's numeric prefix. It is now computed at build time as the project's 1-indexed position when all projects are sorted by `date` ascending (oldest = No. 01). Project folders are renamed to plain slugs with no numeric prefix (e.g. `readmecraft/` instead of `01-readmecraft/`).
- **BREAKING**: The `links[].label` enum value `'Details'` is replaced with `'Blog post'`. The old `Details` link pointed at `crubio.fyi/portfolio/<slug>/`, a route that doesn't exist anywhere in this codebase (dead link). The new `Blog post` label points directly at the project's write-up on `blog.crubio.fyi` when one exists; projects without a post simply omit that link.
- Project entry dates are now authored at year-month granularity (e.g. `2026-05`) rather than a specific day, since day-level precision isn't meaningful for these entries and isn't used anywhere in the UI (which already displays month + year).

## Capabilities

### New Capabilities
(none — all changes fall under existing capabilities)

### Modified Capabilities
- `project-catalog`: Removes the `featured` field and its "exactly one featured" validation requirement. Changes project-number derivation from folder-name prefix to date-sorted position. Adds the year-month date authoring convention. Changes the `links[].label` enum from `Details` to `Blog post`.
- `project-grid`: Removes the requirement referencing `featured: true` rendering uniformly (since `featured` no longer exists, this requirement collapses — there is no longer a featured project to render specially or not-specially).

## Impact

- `src/content.config.ts`: schema changes (drop `featured`, change `links[].label` enum value).
- `src/lib/projects.ts`: `getProjects()` — drop featured-count validation and featured-first sort; change `number` derivation from folder-prefix regex to date-ascending position.
- `src/content/projects/*`: 6 existing project folders removed, 9 new project folders added (plain-slug names, no numeric prefix), each with `data.yaml` and a `thumbnail.png`.
- `openspec/specs/project-catalog/spec.md` and `openspec/specs/project-grid/spec.md`: requirement text updated to match.
- Out of scope for this change (tracked as follow-up tasks, not spec requirements): generating the real thumbnail screenshots via `scripts/screenshot.mjs`, and finalizing exact description copy for BookForge and Argus (no source text was provided for these two).
