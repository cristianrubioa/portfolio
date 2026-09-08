## Context

This is a greenfield repository (no existing code, only `CLAUDE.md` and OpenSpec scaffolding). The site is a companion to `crubio.fyi` (the main site) and `cvcraft.crubio.fyi` (CV), deployed as its own subdomain, `portfolio.crubio.fyi`. It has no backend today and none is planned: content changes are infrequent (a handful of projects, growing slowly over time) and are authored directly by Cristian, not by end users. A visual mockup (plain HTML/CSS/JS, Space Grotesk + IBM Plex Mono, paper/ink/orange-accent palette, graph-paper background) already exists and is the reference for the visual design; this document covers how that mockup's behavior gets implemented on a real architecture with typed, isolated content.

## Goals / Non-Goals

**Goals:**
- Ship a static, zero-backend catalog site that can be deployed as plain static assets.
- Make adding a project a self-contained, low-risk operation: one new folder, no shared file to edit.
- Reproduce the mockup's interactions (tag filter, progressive reveal, hover, blinking live-indicator) with the least JS necessary.
- Respect `prefers-reduced-motion` everywhere animation is used.

**Non-Goals:**
- No backend, no database, no CMS UI. Content is authored by hand in the repo.
- No `Publications` nav item in this iteration (only one entry exists; revisit when there are more).
- No footer.
- No server-side or URL-based pagination/filtering — everything is client-side over a dataset that is fully known at build time.
- No automated screenshot capture in CI — the Playwright script is a manual, local dev tool.
- No favicon caching/local copy — avatars are hotlinked from each project's own domain.

## Decisions

### 1. Astro as the framework
**Decision:** Build with Astro, using its `data`-type content collections for project entries, and a single small vanilla-JS (or Preact, if state gets fiddly) island for the tag filter + progressive reveal interaction.

**Why over alternatives:**
- Next.js static export brings a full React runtime for what is, behaviorally, ~40 lines of interactive JS (filter + reveal) — not justified here.
- Plain Vite + vanilla/Preact works but reimplements what Astro gives for free: schema-validated content collections and built-in image optimization for thumbnails.
- 11ty is comparable in weight to Astro but has weaker ergonomics for typed content collections and colocated image assets; Astro's `image()` helper in a Zod schema validates the thumbnail exists and optimizes it as part of the build.

### 2. Project data: one folder per project, `data` content collection
**Decision:**
```
src/content/projects/
├── 01-pale-blue-dot-nasa/
│   ├── data.yaml
│   └── thumbnail.png
├── 03-lidar-slam-comparison/
│   ├── data.yaml
│   └── thumbnail.png
...
```
Each `data.yaml` is validated against a Zod schema (title, description, tags, date, featured, links, favicon). The thumbnail is a colocated local asset referenced via Astro's `image()` schema helper (build-time optimized, responsive `srcset`).

**Why folder-per-project over one big `projects.yaml`:** it keeps each project's own asset (thumbnail) next to the data describing it, instead of a separate `public/images/...` path that can drift out of sync with the entry that references it, and it keeps each project's fields easy to review and fix in isolation.

**Verified during implementation:** because the catalog renders as a single page over the full collection, an invalid entry (bad schema, missing thumbnail) fails the *entire* build with a clear, file-scoped error rather than being skipped while the rest of the site ships — Astro's collection loading throws on any entry that fails validation. This is a deliberate fail-fast tradeoff, confirmed by testing a broken entry directly (see `specs/project-catalog`); true per-entry isolation would require replacing `getCollection()` with manual per-file reads and try/catch, which isn't worth the added complexity for a single-author, manually-curated catalog where a failed build is noticed immediately.

### 3. Project number is derived, not stored
**Decision:** The folder name's numeric prefix (`01-`, `02-`, ... `11-`) is the single source of truth for the displayed "No. XX". It is parsed from the collection entry's `id`/slug at build time — never duplicated as a YAML field.

**Why:** avoids a field that can drift from the filename it's meant to mirror. Cost of this choice: renumbering means renaming a folder, which is an accepted, infrequent, manual operation.

### 4. Featured project: explicit manual flag
**Decision:** `featured: true` in a project's `data.yaml` marks it as the hero card. Exactly one project should be `true` at a time (validated — see Risks). Recency is not used to derive this automatically.

**Why:** this was a deliberate, explicit choice — the ability to keep an older, more representative project (e.g., a NASA honorable mention) as the hero over the most recent experiment is worth the small manual cost of flipping the flag when priorities change. Computing "most recent = featured" would remove that curatorial control for no real implementation savings (reading a boolean field costs nothing less than computing a max-by-date).

### 5. Avatar: hotlinked favicon, not a local asset
**Decision:** `favicon` in `data.yaml` is an absolute URL to the project's own hosted favicon (e.g. `https://stringweave.crubio.fyi/favicon.svg`), rendered directly as a circular `<img>`. It is not downloaded or copied into the repo.

**Why:** each project already serves its own favicon at a stable path; hotlinking keeps it in sync automatically if that project's icon changes, and avoids build-time asset handling for a 20px decorative element. Trade-off accepted: if the linked project's subdomain is down, the avatar breaks — low severity, and covered in Risks.

### 6. Grid layout: CSS Grid with a spanning hero cell
**Decision:** `grid-template-columns: repeat(3, 1fr)` with `grid-auto-flow: dense`; the `featured` card gets `grid-column: span 2; grid-row: span 2`, matching the mockup exactly. Single column on mobile, hero collapses to span 1.

### 7. Tag filtering: client-side, no state in the URL
**Decision:** A small island holds the active tag in local component state (not the URL, not localStorage.). Filtering toggles a `filtered-out` class / `hidden` attribute on cards; it never removes them from the DOM (so reveal-count math in the progressive loader stays simple — see Decision 8).

**Why not URL-based filtering:** explicitly out of scope per the proposal ("no reload, no URL change") — this is a browsing convenience, not a shareable view.

### 8. Progressive loading: reveal-in-place over a pre-fetched dataset, not real pagination
**Decision:** All project data is already present in the rendered page (or as an inlined JSON island prop) — there is no API to page against. The island keeps a `visibleCount` starting at 9, increments by 9 when an `IntersectionObserver` sentinel placed after the last visible card intersects the viewport, and re-derives the visible slice from the currently-filtered list (`filteredProjects.slice(0, visibleCount)`). Changing the active tag filter resets `visibleCount` to 9.

**Why this is simpler than typical infinite scroll:** there's no network latency, no loading state, no error state, no cursor to track — it's a synchronous array slice re-run on scroll and on filter change.

### 9. Screenshot capture: local Playwright script, not CI automation
**Decision:** `scripts/screenshot.mjs`, a Playwright devDependency-only script, run manually against a project's live demo URL with a fixed viewport (matching the card's `4/3` aspect ratio, or `16/11` for a project currently marked featured) to produce a consistently-framed `thumbnail.png`, saved directly into that project's content folder.

**Why not CI:** thumbnails change only when a project is added or visibly updated — a handful of times a year. Automating capture on every deploy would mean re-screenshotting live third-party demo sites on every build for no benefit, and risks capturing a broken/loading state if a demo is slow to render.

## Risks / Trade-offs

- **[Risk]** Two projects both marked `featured: true` (or none) → grid layout becomes ambiguous (two hero cells, or no hero at all). **Mitigation:** Zod schema validation across the collection at build time asserts exactly one `featured: true` entry; build fails loudly rather than shipping an inconsistent grid.
- **[Risk]** Hotlinked favicon breaks if the linked project's subdomain goes down or changes its favicon path. **Mitigation:** low severity (decorative 20px avatar); render a neutral fallback (e.g. first letter of the title in a circle) on image load error.
- **[Risk]** Progressive-reveal-over-hidden-DOM-nodes means all thumbnails still load (no true lazy loading of below-the-fold images) — with ~10 projects this is a non-issue, but would need revisiting if the catalog grows to 50+. **Mitigation:** native `loading="lazy"` on `<img>` covers this adequately at current and near-future scale; not solving further now.
- **[Risk]** Manually-run screenshot script means thumbnails can go stale if a live demo's UI changes and nobody remembers to re-run it. **Mitigation:** accepted — same class of staleness as any manually-authored content; no auto-detection planned for this iteration.

## Migration Plan

Net-new project, not a migration. Sequence:
1. Scaffold the Astro project and content collection schema.
2. Build the site shell (header, background, no footer).
3. Build the grid + card rendering from static/sample data.
4. Add the tag filter and progressive-reveal island.
5. Add the Playwright screenshot script.
6. Backfill real project entries (using the mockup's 6 example projects as the initial dataset).
7. Point `portfolio.crubio.fyi` DNS/hosting at the built site (assumed to follow the same host as `crubio.fyi`; verify before deploy).

No rollback concerns beyond standard static-site redeploy (previous build artifact stays servable until the new one is promoted, per whatever host is used).

## Open Questions

- Confirm hosting target for `portfolio.crubio.fyi` (same provider as `crubio.fyi`?) — needed before the deploy task, not before implementation.
- Default sort order for non-featured cards (by date descending vs. by number ascending) when no tag filter is active — does not block implementation of the grid/filter mechanics, but needs an answer before the real dataset is finalized.
