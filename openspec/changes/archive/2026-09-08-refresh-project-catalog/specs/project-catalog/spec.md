## ADDED Requirements

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

## REMOVED Requirements

### Requirement: Project number is derived from the folder name
**Reason**: Requiring a manually-chosen numeric folder prefix forced the author to track which numbers were already in use and left gaps after entries were removed. Replaced by computing the number from `date`-sorted position (see "Project number is derived from date-sorted position").
**Migration**: Existing project folders are renamed to drop their numeric prefix (e.g. `08-stringweave` → `stringweave`). No data field changes — the number was never stored, only derived differently.

### Requirement: Exactly one project is marked featured
**Reason**: The `featured` field had no distinct visual treatment in the rendered grid (confirmed against `ProjectCard.astro`/`index.astro` — all cards render uniformly), so it only added a mandatory-single-boolean validation burden without a corresponding behavior difference. The catalog now sorts purely by `date` descending.
**Migration**: Remove the `featured` field from every entry's `data.yaml` and from the schema in `content.config.ts`. No replacement field is needed.
