## 1. Site shell container

- [x] 1.1 Replace `.wrap`'s `max-width: 1100px; margin: 0 auto` in `src/layouts/Layout.astro` with small fixed side padding and no centering max-width (or a very generous sanity cap), so header and content use the full viewport width.

## 2. Grid breakpoints

- [x] 2.1 In `src/pages/index.astro`, change desktop `.grid` from `grid-template-columns: repeat(3, 1fr)` to `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`.
- [x] 2.2 Add a tablet breakpoint (641–1024px) setting `.grid` to `grid-template-columns: repeat(2, 1fr)`.
- [x] 2.3 Update the mobile breakpoint threshold to 640px (from 760px) for the existing single-column rule.

## 3. Hero card span

- [x] 3.1 In `src/components/ProjectCard.astro`, change `.card.hero` from `grid-column: span 2; grid-row: span 2` to `grid-column: span 2; grid-row: span 1`, applied at tablet and desktop widths. (Superseded by 6.1 — see below.)
- [x] 3.2 Confirm the mobile override (`.card.hero { grid-column: span 1; grid-row: span 1; }` under the mobile breakpoint) still applies correctly with the new breakpoint threshold. (Removed in 6.1 — no longer needed once hero is full-width at every breakpoint.)

## 4. Card body whitespace fix

- [x] 4.1 Remove `flex: 1` from `.body p` in `ProjectCard.astro`.
- [x] 4.2 Add `margin-top: auto` to `.tags` or `.links` (whichever sits last before the footer) so links/tags stay pinned to the card bottom on cards where content is short, without reintroducing the stretch-driven gap.

## 5. Verify

- [x] 5.1 Run the dev server and check mobile (≤640px), tablet (641–1024px), and desktop (>1024px, plus a very wide viewport e.g. 2560px) — confirm column counts, hero span, and full-width usage match the spec.
- [x] 5.2 Confirm the hero card (StringWeave) no longer shows a blank gap between its description and tags/links.
- [x] 5.3 Confirm non-hero cards' tags/links still align sensibly at the bottom of the card.

## 6. Follow-up fixes (user feedback after first pass)

- [x] 6.1 Change `.card.hero` to a full-width banner: `grid-column: 1 / -1; grid-row: span 1;` at every breakpoint (removes the mobile-specific override, since `1 / -1` already spans full width at any column count). Root cause: even at 2×1, the hero's 2-column-wide thumbnail was still ~2x taller than a normal card's, so row-mates were still forced to stretch and reproduce the blank-gap bug one level up.
- [x] 6.2 Cap the hero thumbnail's height: change `.card.hero .thumb` from `aspect-ratio: 16/11` to `aspect-ratio: 21/9; max-height: 480px`, since the thumbnail is now full viewport width and the old ratio produced an excessively tall banner.
- [x] 6.3 Change `.grid` from `repeat(auto-fit, minmax(320px, 1fr))` to `repeat(auto-fill, minmax(320px, 1fr))` — `auto-fit` collapsed empty tracks so a single filtered-down card stretched to fill the whole row width; `auto-fill` keeps the columns reserved so a lone card renders at normal width.
- [x] 6.4 Re-verify: single-tag filter down to 1 card no longer stretches; hero renders full-width banner at mobile/tablet/desktop; non-hero cards no longer share a row with the hero and show no forced blank gap.

## 7. Final simplification (user feedback: full-width banner looked ugly, wanted uniform cards)

- [x] 7.1 In `src/pages/index.astro`, change desktop `.grid` from `repeat(auto-fill, minmax(320px, 1fr))` to a fixed `repeat(4, 1fr)`.
- [x] 7.2 In `src/components/ProjectCard.astro`, remove the `hero`/`featured` visual distinction entirely: drop `class:list={['card', { hero: project.featured }]}` in favor of a plain `class="card"`, and delete the `.card.hero` grid-span rule, `.card.hero .thumb` aspect-ratio/max-height override, and both `.card.hero h3` font-size overrides (desktop and mobile). `project.featured` still drives sort order in `src/lib/projects.ts` — unchanged.
- [x] 7.3 Re-verify: all cards render at the same size at every breakpoint (mobile 1 col / tablet 2 col / desktop 4 col); filtering to 1 result still doesn't stretch; no forced blank gaps anywhere.
