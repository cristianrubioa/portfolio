# site-shell Specification

## Purpose
TBD - created by archiving change portfolio-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Header navigation has exactly three external links
The site header SHALL contain exactly three navigation links: "Home" linking to `crubio.fyi`, "CV" linking to `cvcraft.crubio.fyi`, and "GitHub" linking to `github.com/cristianrubioa`. No "Publications" link SHALL be present in this iteration.

#### Scenario: Header links point to the correct destinations
- **WHEN** the site header renders
- **THEN** it contains exactly three links — Home → `crubio.fyi`, CV → `cvcraft.crubio.fyi`, GitHub → `github.com/cristianrubioa` — and no Publications link

### Requirement: No footer is rendered
The site SHALL NOT render a footer element anywhere on the page.

#### Scenario: Page has no footer
- **WHEN** any page of the site renders
- **THEN** no footer element is present in the DOM

### Requirement: Graph-paper background
The page background SHALL render a subtle graph-paper/blackboard-style grid line pattern behind all content, following the reference visual mockup's paper/ink/orange-accent palette.

#### Scenario: Background renders the grid pattern
- **WHEN** any page of the site renders
- **THEN** the body background shows the graph-paper line pattern rather than a flat/solid fill

### Requirement: Layout container uses full viewport width
The shared page container SHALL NOT apply a fixed `max-width` that centers content with large unused side margins. It SHALL instead use small, fixed side padding so the header and page content extend to the full viewport width on all screen sizes.

#### Scenario: Content extends across a wide viewport
- **WHEN** the page renders on a viewport wider than the previous 1100px cap
- **THEN** the header and page content extend beyond 1100px, bounded only by the small side padding, with no large centered empty margins

#### Scenario: Small side padding is preserved
- **WHEN** the page renders at any viewport width
- **THEN** content does not touch the viewport edges — a small fixed padding remains on both sides

### Requirement: All catalog copy is authored in English
All user-facing text rendered by the site — navigation labels, card copy, filter labels — SHALL be in English, regardless of the language used to author or discuss the content.

#### Scenario: Rendered text is in English
- **WHEN** any page of the site renders
- **THEN** every visible label and piece of copy is in English

