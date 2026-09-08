## MODIFIED Requirements

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
