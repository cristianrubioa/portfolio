## ADDED Requirements

### Requirement: Asymmetric 3-column grid with a spanning hero
The catalog grid SHALL render as 3 columns at full viewport width on desktop. The single `featured` project SHALL render as a hero cell spanning 2 columns and 2 rows; all other projects SHALL render as uniform 1x1 cells.

#### Scenario: Featured project renders larger than the rest
- **WHEN** the grid renders with one project marked `featured: true`
- **THEN** that project's card occupies a 2x2 area and every other visible card occupies a 1x1 area

#### Scenario: Grid collapses to a single column on narrow viewports
- **WHEN** the viewport width is at or below the mobile breakpoint
- **THEN** the grid renders as a single column and the hero card spans only 1x1

### Requirement: Card displays required project metadata
Each card SHALL display: the derived project number, title, short description, tags, and a month+year formatted date (e.g. "Jun 2026"). For a continuously-updated project, the date SHALL reflect the most recent relevant update rather than the original creation date.

#### Scenario: Card renders full metadata set
- **WHEN** a project entry has title, description, tags, and date populated
- **THEN** the rendered card shows the project number, title, description, all tags, and the date formatted as month + year

### Requirement: Card displays up to three links with a live-status indicator
Each card SHALL render up to 3 links from: Live demo, GitHub, Details. When a Live demo link is present, it SHALL be preceded by a blinking green dot indicating the demo is live. The blink animation SHALL respect the `prefers-reduced-motion` media feature by rendering a static (non-blinking) dot instead.

#### Scenario: Live demo link shows a blinking indicator by default
- **WHEN** a card has a Live demo link and the user has no reduced-motion preference set
- **THEN** the green dot before the "Live demo" text animates (blinks)

#### Scenario: Reduced motion disables the blink
- **WHEN** a card has a Live demo link and the user's system has `prefers-reduced-motion: reduce` set
- **THEN** the green dot renders static, with no animation

#### Scenario: Card renders fewer than three links when fewer are provided
- **WHEN** a project entry provides only a Details link
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
