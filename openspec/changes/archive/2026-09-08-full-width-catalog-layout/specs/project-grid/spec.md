## MODIFIED Requirements

### Requirement: Asymmetric 3-column grid with a spanning hero
The catalog grid SHALL render across three breakpoints: mobile (single column), tablet (2 columns), and desktop (4 columns). All projects, including the `featured` one, SHALL render as uniform 1x1 cells — no card is sized or spanned differently from the others. When fewer cards are visible than fit in a row (e.g. after filtering by tag), unfilled columns SHALL remain empty rather than stretching the remaining card(s) to fill the row.

#### Scenario: All cards render at a uniform size
- **WHEN** the grid renders, regardless of which project is marked `featured: true`
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

## ADDED Requirements

### Requirement: Card body has no forced blank gap
No card's rendered height SHALL be forced by anything other than its own content (image, title, description, tags, links) — there SHALL be no enforced blank space between the description and the tags/links footer.

#### Scenario: No card shows a forced blank gap
- **WHEN** any card renders with a short description
- **THEN** no large empty gap appears between the description text and the tags/links below it
