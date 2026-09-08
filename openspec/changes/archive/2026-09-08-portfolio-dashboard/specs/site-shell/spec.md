## ADDED Requirements

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

### Requirement: All catalog copy is authored in English
All user-facing text rendered by the site — navigation labels, card copy, filter labels — SHALL be in English, regardless of the language used to author or discuss the content.

#### Scenario: Rendered text is in English
- **WHEN** any page of the site renders
- **THEN** every visible label and piece of copy is in English
