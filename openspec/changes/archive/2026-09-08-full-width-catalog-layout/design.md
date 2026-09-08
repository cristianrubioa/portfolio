## Context

The site shell (`Layout.astro`) wraps the header and every page's content in a single `.wrap` div capped at `max-width: 1100px`, centered with `margin: 0 auto`. The project grid (`index.astro`) has one breakpoint at 760px (3-column desktop → 1-column mobile). The featured hero card (`ProjectCard.astro`) spans 2 columns × 2 rows, and its `.body p` uses `flex: 1` to fill leftover vertical space.

## Goals / Non-Goals

**Goals:**
- Use the full viewport width on wide screens, with only small side padding.
- Add an intermediate tablet layout instead of jumping straight from 1 to 3 columns.
- Let desktop column count grow with viewport width instead of stretching a fixed 3 columns.
- Eliminate the blank gap under the hero card's description.

**Non-Goals:**
- Redesigning card content, typography, or visual style.
- Changing which project is featured or how `featured` is set.
- A CMS/config-driven breakpoint or column count — values are fixed in CSS.

## Decisions

**Fluid `.wrap` instead of a larger fixed `max-width`.** Considered raising the cap to ~1600px, but that just moves the wasted-margin problem to larger screens (4K, ultrawide) and still requires picking an arbitrary number. Using small fixed side padding (no `max-width`, or a very generous sanity cap) keeps the layout using available width at any size.

**`grid-template-columns: repeat(auto-fill, minmax(320px, 1fr))` for desktop instead of a fixed column count.** A fixed `repeat(3, 1fr)` on a fluid container means cards keep stretching wider with no ceiling — on a 4K monitor a 3-column card would be enormous. `auto-fit`/`minmax` caps individual card width by adding columns instead, which is what "quepan más cosas" (fit more things) actually calls for. 320px minimum keeps thumbnails and text from feeling cramped. Initially used `auto-fit`, but that collapses empty tracks, so filtering down to a single visible card stretched that lone `1fr` column to the entire row width. Switched to `auto-fill`, which keeps the empty tracks reserved instead of collapsing them — a lone card renders at its normal column width with empty space beside it, rather than stretching.

**Hero card span changes from 2×2 to a full-width banner (`grid-column: 1 / -1`), superseding the originally planned 2×1.** First tried 2 columns × 1 row: this removed the *vertical* forced-height problem, but CSS Grid still shares row height across every cell in a row — the hero's thumbnail (2 columns wide) was still ~2x taller in absolute pixels than a 1-column card's thumbnail at the same aspect ratio, so the hero's row-mates (Erdős, Ubidots, Pale Blue Dot) were still forced to stretch to match it, reproducing the same blank-gap bug one level up. The actual root cause is structural: as long as the hero shares a grid row with normal-width cards, any difference in their natural content height leaks into the shorter cards as blank space.

The fix that removes the coupling entirely: give the hero `grid-column: 1 / -1` so it always occupies an entire row by itself, at every breakpoint (mobile/tablet/desktop) — no per-breakpoint override needed, since `1 / -1` spans however many columns exist. Non-hero cards then only ever share rows with other non-hero cards, which are uniform, so there's no more height mismatch to leak. This also directly serves the "cards más grandes, miniatura más clara" ask — the hero's image is now full viewport width. To keep that from producing an excessively tall banner on wide screens, the hero thumbnail's aspect ratio changed from `16/11` (sized for a 2-column box) to a wider `21/9` banner ratio with a `max-height: 480px` cap.

Alternatives considered: (a) keep 2×2 and just remove `flex: 1` — rejected, the gap just relocates instead of disappearing, same root cause. (b) A bento/magazine composition (hero + 2 "wide" cards + a stacked pair) matching the user's initial sketch — rejected as riskier: it assumes fixed role counts (exactly 1 hero + 2 + 2) that don't generalize when tag filtering leaves an arbitrary subset of cards, requiring a separate "filtered mode" layout. The full-width banner works identically regardless of what's filtered.

**Three breakpoints (mobile ≤640px, tablet 641–1024px, desktop >1024px).** Chosen to give tablet-width viewports (iPad-class, small laptops) a 2-column layout instead of either a cramped 3-column or the previous single 1-column-until-1100px jump.

**Final pivot: dropped the hero/featured size distinction entirely, uniform cards, fixed 4-column desktop grid.** Even as a full-width banner (`1 / -1`), the hero visually stood out in a way the user found ugly, and the dynamic `auto-fill`/`minmax` desktop column count (5 columns on a ~1850px screen) wasn't what they expected either — they asked to see a simpler, fixed 4-column grid with no per-card size differences. This removes the CSS Grid row-height-sharing problem class entirely (the root cause of every gap/stretch bug hit in this change): with every card the same 1x1 size, no card's content height can force another to stretch. `.card.hero` (grid span, thumbnail aspect-ratio/max-height, larger title) was deleted from `ProjectCard.astro`; `.grid` uses a fixed `repeat(4, 1fr)` on desktop instead of `auto-fill`/`minmax`. `project.featured` still exists in the content schema and still determines sort order (featured project listed first, per `src/lib/projects.ts`) — only its visual size treatment was removed.

## Risks / Trade-offs

- [A fixed 4-column desktop grid stretches cards wider with no ceiling on very large monitors, same class of issue `auto-fit`/`minmax` was originally meant to avoid] → Accepted for now — at ~1850px cards land around 430px wide, still reasonable; revisit with a `max-width` or `minmax` cap only if it looks bad on an actual ultra-wide/4K screen.
- [Removing `.body p { flex: 1 }` changes vertical alignment of tags/links on short-description cards generally] → Resolved by adding `margin-top: auto` on `.tags` instead, which pins tags/links to the card bottom without stretching the paragraph.

## Open Questions

None — breakpoint values, hero span, and grid strategy were confirmed in discussion before writing this proposal.
