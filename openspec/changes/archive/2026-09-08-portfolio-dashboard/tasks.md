## 1. Project setup

- [x] 1.1 Scaffold a new Astro project (TypeScript strict template) at the repo root
- [x] 1.2 Add fonts (Space Grotesk, IBM Plex Mono) and base global styles (paper/ink/accent CSS custom properties from the mockup)
- [x] 1.3 Configure `astro.config` for static output

## 2. Project content schema (`project-catalog`)

- [x] 2.1 Define the `projects` `data` content collection with a Zod schema: `title`, `description`, `tags` (array), `date`, `featured` (boolean), `favicon` (URL string), `thumbnail` (via `image()`), `links` (array of up to 3 `{ label, url }`, label constrained to Live demo/GitHub/Details)
- [x] 2.2 Add a build-time check that exactly one collection entry has `featured: true` (fail the build otherwise)
- [x] 2.3 Add a helper to derive each project's display number from its folder name's numeric prefix
- [x] 2.4 Create the initial project folders (one per mockup example: pale-blue-dot-nasa, lidar-slam-comparison, ubidots-cli, covid19-colombia-dashboard, erdos-unit-distance, stringweave) with `data.yaml` + placeholder `thumbnail.png`

## 3. Site shell (`site-shell`)

- [x] 3.1 Build the header component with exactly three links: Home → `crubio.fyi`, CV → `cvcraft.crubio.fyi`, GitHub → `github.com/cristianrubioa`
- [x] 3.2 Build the graph-paper background (CSS linear-gradient grid over the paper color, per mockup)
- [x] 3.3 Confirm no footer is rendered on the layout
- [x] 3.4 Verify all static copy (nav labels, intro text, filter chip labels) is written in English

## 4. Grid and card rendering (`project-grid`)

- [x] 4.1 Build the 3-column CSS grid layout with `grid-auto-flow: dense`, mobile single-column fallback
- [x] 4.2 Build the card component: number, title, description, tags, month+year date formatting (with "last updated" semantics for continuous projects)
- [x] 4.3 Apply the featured project's 2x2 span (1x1 on mobile) based on the `featured` field
- [x] 4.4 Render the rounded-corner optimized thumbnail via `astro:assets`
- [x] 4.5 Render the circular favicon avatar next to the title (always visible), with a fallback (e.g. title initial) on image load error
- [x] 4.6 Render up to 3 links (Live demo/GitHub/Details), omitting any not provided
- [x] 4.7 Implement the Live demo blinking green dot, gated on `prefers-reduced-motion` (static dot when reduced motion is set)
- [x] 4.8 Implement hover treatment: scale-up/shadow only, no blur

## 5. Tag filtering (`tag-filtering`)

- [x] 5.1 Derive the set of available tag chips from the full project collection at build time
- [x] 5.2 Build the filter island: clicking a chip toggles active state and filters visible cards client-side, no reload, no URL change
- [x] 5.3 Style active vs. inactive chip states per mockup

## 6. Progressive loading (`progressive-loading`)

- [x] 6.1 Implement `visibleCount` state (initial 9) in the same island as the filter, sliced over the currently-filtered project list
- [x] 6.2 Add an `IntersectionObserver` sentinel after the last visible card; increment `visibleCount` by 9 when it intersects and more items remain
- [x] 6.3 Reset `visibleCount` to 9 whenever the active tag filter changes
- [x] 6.4 Verify no "load more" control exists anywhere in the UI

## 7. Screenshot tooling (dev-only)

- [x] 7.1 Add Playwright as a devDependency
- [x] 7.2 Write `scripts/screenshot.mjs`: takes a project folder + URL, uses a fixed viewport (4/3 aspect ratio, or 16/11 when capturing the current featured project), saves `thumbnail.png` into that project's content folder
- [x] 7.3 Document the manual usage (README or inline script comment) — not wired into CI

## 8. Content backfill and QA

- [x] 8.1 Replace placeholder thumbnails with real captures via the screenshot script for each initial project
- [x] 8.2 Verify build-time validation catches a deliberately broken entry (bad featured count, missing thumbnail); confirmed it fails the whole build with a scoped, file-identifying error rather than silently continuing — see the note added to `specs/project-catalog` and design.md
- [x] 8.3 Manually verify: filter + progressive reveal interaction, hover states, reduced-motion behavior (via OS/browser emulation), mobile single-column layout

## 9. Deploy

- [ ] 9.1 Confirm hosting target for `portfolio.crubio.fyi` (same provider as `crubio.fyi`) and configure DNS/hosting accordingly
- [ ] 9.2 Deploy the static build and verify the live subdomain
