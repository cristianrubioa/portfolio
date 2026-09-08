## Why

On viewports wider than ~1100px, the shared `.wrap` container centers all content with a hard `max-width: 1100px`, leaving large unused margins (e.g. ~375px per side on a ~1850px screen) instead of showing more of the catalog. The grid also only has a single responsive breakpoint (mobile vs. desktop), so there's no tailored tablet layout, and the hero card's 2-row span forces a tall blank gap below its description.

## What Changes

- Replace `.wrap`'s fixed `max-width: 1100px` centered container with a fluid layout using small side padding, so header and grid use the full viewport width.
- Add a tablet breakpoint (2-column grid) between the existing mobile (1-column) and desktop layouts; desktop uses a fixed 4-column grid.
- **BREAKING (visual)**: remove the featured project's special "hero" sizing (larger spanning card) entirely — every card, including the featured one, renders at the same uniform size. `project.featured` still determines catalog sort order, just no longer visual size.
- Remove the `p { flex: 1 }` stretch behavior in the card body (replaced by `margin-top: auto` on `.tags`) that previously caused forced blank gaps whenever a card's height was constrained by something other than its own content.

<!-- Superseded intermediate attempts, kept for history: a `repeat(auto-fit, minmax(320px,1fr))` dynamic desktop column count, and a 2×1/full-width "banner" hero — both replaced by the simpler uniform-card, fixed-4-column approach above after user feedback. See design.md for why. -->

## Capabilities

### New Capabilities
(none)

### Modified Capabilities
- `site-shell`: the shared layout container changes from a fixed-width centered `.wrap` to a fluid full-width layout with small side padding.
- `project-grid`: grid column behavior becomes responsive across three breakpoints (mobile 1 / tablet 2 / desktop 4, all fixed) instead of two, and the featured card's distinct hero sizing is removed — all cards render uniformly.

## Impact

- `src/layouts/Layout.astro` — `.wrap` max-width/padding rules.
- `src/pages/index.astro` — `.grid` column rules and breakpoints.
- `src/components/ProjectCard.astro` — `.hero` grid span, and `.body p` flex behavior.
- No data, dependency, or build changes.
