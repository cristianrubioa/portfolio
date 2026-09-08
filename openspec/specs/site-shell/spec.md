# site-shell Specification

## Purpose
TBD - created by archiving change portfolio-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Header navigation has exactly five external links
The site header SHALL contain exactly five navigation links, in order: "Home" linking to `crubio.fyi`, "CV" linking to `cvcraft.crubio.fyi`, "GitHub" linking to `github.com/cristianrubioa`, "LinkedIn" linking to `linkedin.com/in/cristianrubioaguiar`, and "Blog" linking to `blog.crubio.fyi`. No "Publications" or "Ko-fi" link SHALL be present in this iteration.

#### Scenario: Header links point to the correct destinations
- **WHEN** the site header renders
- **THEN** it contains exactly five links — Home → `crubio.fyi`, CV → `cvcraft.crubio.fyi`, GitHub → `github.com/cristianrubioa`, LinkedIn → `linkedin.com/in/cristianrubioaguiar`, Blog → `blog.crubio.fyi` — and no Publications or Ko-fi link

### Requirement: Header is sticky and scroll-transparent
The site header SHALL remain pinned to the top of the viewport as the page scrolls, rather than scrolling out of view with the rest of the page content. The header height SHALL equal two units of the graph-paper background grid (80px, given the 40px grid unit), and it SHALL render with no border. At the top of the page the header SHALL be fully transparent (no background fill). Once the page has scrolled past its top, the header SHALL apply a translucent, blurred background so its content stays legible over whatever scrolls beneath it.

#### Scenario: Header stays visible while scrolling
- **WHEN** a user scrolls down the page
- **THEN** the header remains pinned to the top of the viewport instead of scrolling away

#### Scenario: Header is transparent at the top of the page
- **WHEN** the page is scrolled to its top (`scrollY` is 0)
- **THEN** the header renders with no background fill and no border

#### Scenario: Header gains a translucent blurred background once scrolled
- **WHEN** the page has been scrolled down (`scrollY` > 0)
- **THEN** the header renders with a translucent, blurred background

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

### Requirement: External links open in a new tab
Every outbound link rendered by the site — header navigation links and project card links (Live demo, GitHub, Blog post) alike — SHALL open in a new browser tab, leaving the portfolio page open in its own tab, rather than navigating away from it.

#### Scenario: Header link opens in a new tab
- **WHEN** a user clicks any header navigation link
- **THEN** the destination opens in a new tab and the portfolio page remains open

#### Scenario: Project card link opens in a new tab
- **WHEN** a user clicks a Live demo, GitHub, or Blog post link on a project card
- **THEN** the destination opens in a new tab and the portfolio page remains open

### Requirement: All catalog copy is authored in English
All user-facing text rendered by the site — navigation labels, card copy, filter labels — SHALL be in English, regardless of the language used to author or discuss the content.

#### Scenario: Rendered text is in English
- **WHEN** any page of the site renders
- **THEN** every visible label and piece of copy is in English

