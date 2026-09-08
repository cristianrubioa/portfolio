## Why

There is no dedicated place to browse Cristian's project work as a catalog. Today the projects only exist scattered across crubio.fyi post pages; there is no single, scannable, filterable view of "everything built." This change ships the first iteration of a standalone portfolio dashboard at `portfolio.crubio.fyi`: a static, no-backend catalog grid with client-side filtering and progressive loading.

## What Changes

- New Astro static site (no backend) deployed to the `portfolio.crubio.fyi` subdomain.
- Header with three links only: Home → `crubio.fyi`, CV → `cvcraft.crubio.fyi`, GitHub → `github.com/cristianrubioa`. No footer, no Publications link (only one entry exists today, not worth its own nav item yet).
- Project data authored as one YAML + co-located thumbnail per project folder (Astro `data` content collection, Zod-validated), so a malformed entry only breaks that one project, not the whole catalog.
- Asymmetric 3-column grid: the `featured: true` project renders as a 2x2 hero, the rest as uniform 1x1 cards.
- Project cards show: sequential number (derived from folder prefix), title, short description, tags, month+year date, rounded-corner thumbnail, circular favicon avatar (always visible), up to 3 links (Live demo / GitHub / Details), and a blinking live-indicator dot on "Live demo" that respects `prefers-reduced-motion`.
- Client-side tag filtering: no page reload, no URL change.
- Client-side progressive loading: batches of 9 revealed automatically as the user scrolls near the end of the grid (no "load more" button), operating on the already-filtered result set. No server pagination — the full dataset is already in the static build.
- Graph-paper/blackboard background styling (light grid lines over a paper background), following the provided visual mockup (Space Grotesk + IBM Plex Mono, paper/ink/orange-accent palette).
- All catalog content (card copy, nav labels) is authored in English.

## Capabilities

### New Capabilities
- `project-catalog`: the per-project data model — folder-per-project YAML schema, co-located thumbnail asset, externally-referenced favicon avatar, derived project number, manual `featured` flag.
- `project-grid`: the asymmetric 3-column grid layout and card rendering (thumbnail, avatar, tags, date, links, hover treatment).
- `tag-filtering`: client-side, no-reload, no-URL-change filtering of the catalog by tag.
- `progressive-loading`: client-side batch-of-9 progressive reveal triggered by scroll proximity, composing with the active tag filter.
- `site-shell`: header navigation (Home/CV/GitHub), no-footer layout, and the graph-paper background treatment.

### Modified Capabilities
(none — this is a new, standalone project with no existing specs)

## Impact

- New repository content: this is the first code in the `portfolio` repo (currently empty aside from `CLAUDE.md`/OpenSpec scaffolding).
- New deploy target: `portfolio.crubio.fyi` (DNS/hosting setup outside this repo's scope, assumed to follow whatever host serves `crubio.fyi` today).
- New dev-only tooling: a Playwright screenshot script (not part of the deployed site, not run in CI) used to (re)generate thumbnails with a fixed viewport for consistent aspect ratio; covered in design/tasks, not as its own spec since it has no runtime behavior.
- No backend, no database, no API — everything ships as a static build.
