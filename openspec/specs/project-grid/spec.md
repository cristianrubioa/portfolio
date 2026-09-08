# project-grid Specification

## Purpose
TBD - created by archiving change portfolio-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Asymmetric 3-column grid with a spanning hero
The catalog grid SHALL render across three breakpoints: mobile (single column), tablet (2 columns), and desktop (4 columns). All projects SHALL render as uniform 1x1 cells — no card is sized or spanned differently from the others. When fewer cards are visible than fit in a row (e.g. after filtering by tag), unfilled columns SHALL remain empty rather than stretching the remaining card(s) to fill the row.

#### Scenario: All cards render at a uniform size
- **WHEN** the grid renders
- **THEN** every visible card occupies the same 1x1 cell size — none is enlarged or spans multiple columns/rows

#### Scenario: Grid collapses to a single column on mobile
- **WHEN** the viewport width is at or below the mobile breakpoint
- **THEN** the grid renders as a single column

#### Scenario: Grid shows two columns on tablet
- **WHEN** the viewport width is between the mobile and desktop breakpoints
- **THEN** the grid renders as 2 columns

#### Scenario: Grid shows four columns on desktop
- **WHEN** the viewport width is above the tablet breakpoint
- **THEN** the grid renders as 4 fixed columns

#### Scenario: A single filtered result does not stretch to fill the row
- **WHEN** a tag filter narrows the visible projects down to one card, on a viewport wide enough for multiple columns
- **THEN** that card renders at its normal column width, and the remaining columns in its row stay empty rather than stretching the card to fill them

### Requirement: Card body has no forced blank gap
No card's rendered height SHALL be forced by anything other than its own content (image, title, description, tags, links) — there SHALL be no enforced blank space between the description and the tags/links footer.

#### Scenario: No card shows a forced blank gap
- **WHEN** any card renders with a short description
- **THEN** no large empty gap appears between the description text and the tags/links below it

### Requirement: Card displays required project metadata
Each card SHALL display: the derived project number, title, short description, tags, and a month+year formatted date (e.g. "Jun 2026"). For a continuously-updated project, the date SHALL reflect the most recent relevant update rather than the original creation date.

#### Scenario: Card renders full metadata set
- **WHEN** a project entry has title, description, tags, and date populated
- **THEN** the rendered card shows the project number, title, description, all tags, and the date formatted as month + year

### Requirement: Card displays up to three links with a live-status indicator
Each card SHALL render up to 3 links from: Live demo, GitHub, Blog post. When a Live demo link is present, it SHALL be preceded by a blinking green dot indicating the demo is live. The blink animation SHALL respect the `prefers-reduced-motion` media feature by rendering a static (non-blinking) dot instead.

#### Scenario: Live demo link shows a blinking indicator by default
- **WHEN** a card has a Live demo link and the user has no reduced-motion preference set
- **THEN** the green dot before the "Live demo" text animates (blinks)

#### Scenario: Reduced motion disables the blink
- **WHEN** a card has a Live demo link and the user's system has `prefers-reduced-motion: reduce` set
- **THEN** the green dot renders static, with no animation

#### Scenario: Card renders fewer than three links when fewer are provided
- **WHEN** a project entry provides only a Blog post link
- **THEN** the card renders only that one link, with no empty placeholders for the missing Live demo/GitHub links

### Requirement: Avatar renders as a circular icon, always visible
Each card SHALL render the project's favicon as a circular avatar positioned next to the title. The avatar SHALL be visible at all times, not only on hover.

#### Scenario: Avatar is visible without interaction
- **WHEN** a card is rendered and not being hovered
- **THEN** the circular favicon avatar is visible next to the title

### Requirement: Hover feedback uses scale/shadow, not blur
On hover, a card SHALL apply a subtle scale-up and/or elevation shadow. Hover SHALL NOT apply any blur effect to the card or its contents.

#### Scenario: Hovering a card lifts it without blurring it
- **WHEN** a user hovers over a project card
- **THEN** the card scales up slightly and/or gains a drop shadow, and no blur filter is applied anywhere on the card

