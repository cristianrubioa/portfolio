# project-catalog Specification

## Purpose
TBD - created by archiving change portfolio-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Project entries are authored per folder with fail-fast validation
Each project SHALL be authored as its own folder under the projects content collection, containing exactly one data file (`data.yaml`) and its colocated thumbnail asset. A malformed or invalid entry SHALL fail the build with an error that clearly identifies the offending project folder and field, rather than silently shipping bad or missing data.

Note: since the catalog renders as a single page over the full project list, an invalid entry aborts the whole build rather than being skipped while the rest ships — this is a deliberate fail-fast tradeoff (verified against Astro's content collection behavior), not partial per-entry isolation. The folder-per-project structure still keeps each project's data and thumbnail self-contained and easy to fix in isolation once the build points at it.

#### Scenario: Invalid entry fails the build with a scoped error
- **WHEN** one project's `data.yaml` fails schema validation (e.g. a missing required field)
- **THEN** the build fails and the error output identifies the specific project folder and field at fault

### Requirement: Avatar is referenced by external URL, not stored locally
Each project entry's `favicon` field SHALL be an absolute URL pointing to that project's own hosted favicon. The catalog SHALL NOT copy or store this file locally.

#### Scenario: Avatar renders from the project's own domain
- **WHEN** a project's `data.yaml` sets `favicon: https://stringweave.crubio.fyi/favicon.svg`
- **THEN** the card's avatar `<img>` src is that exact URL, unmodified

### Requirement: Thumbnail is a colocated, build-optimized local asset
Each project entry SHALL reference its thumbnail as a local file colocated in the same project folder, validated and optimized by the build (responsive output, no client-side full-resolution download when a smaller size suffices).

#### Scenario: Missing thumbnail fails validation
- **WHEN** a project's `data.yaml` references a thumbnail file that does not exist in its folder
- **THEN** the build fails validation for that entry

### Requirement: Project number is derived from date-sorted position
The catalog SHALL NOT store the displayed project number as a data field, and SHALL NOT derive it from the project folder's name. It SHALL be computed at build time as the project's 1-indexed position when all catalog entries are sorted by `date` ascending. Ties (entries sharing the same year-month) SHALL be broken alphabetically by `title`.

#### Scenario: Oldest project is numbered first
- **WHEN** the catalog is built with entries dated `2026-04`, `2026-05`, and `2026-06`
- **THEN** the `2026-04` entry renders as "No. 01", `2026-05` as "No. 02", and `2026-06` as "No. 03"

#### Scenario: Same-month entries are ordered alphabetically by title
- **WHEN** two entries share the same year-month `date` (e.g. both `2026-05`)
- **THEN** the entry whose `title` sorts first alphabetically receives the lower number

#### Scenario: Project folder names carry no numeric prefix
- **WHEN** a project folder is named `signia` (no leading digits)
- **THEN** the build still derives and renders a "No. XX" number for it from its date-sorted position

### Requirement: Project date is authored at month granularity
Each project entry's `date` field SHALL be authored with year-month precision (e.g. `2026-05`), not a specific day. Day-level precision SHALL NOT be required or relied upon, since the catalog only ever displays and sorts at month granularity.

#### Scenario: Year-month date parses and sorts correctly
- **WHEN** a project's `data.yaml` sets `date: 2026-05`
- **THEN** the build accepts it as a valid date and sorts/numbers the entry as if dated the first of that month

