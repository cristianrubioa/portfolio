## ADDED Requirements

### Requirement: Project entries are authored per folder with fail-fast validation
Each project SHALL be authored as its own folder under the projects content collection, containing exactly one data file (`data.yaml`) and its colocated thumbnail asset. A malformed or invalid entry SHALL fail the build with an error that clearly identifies the offending project folder and field, rather than silently shipping bad or missing data.

Note: since the catalog renders as a single page over the full project list, an invalid entry aborts the whole build rather than being skipped while the rest ships — this is a deliberate fail-fast tradeoff (verified against Astro's content collection behavior), not partial per-entry isolation. The folder-per-project structure still keeps each project's data and thumbnail self-contained and easy to fix in isolation once the build points at it.

#### Scenario: Invalid entry fails the build with a scoped error
- **WHEN** one project's `data.yaml` fails schema validation (e.g. a missing required field)
- **THEN** the build fails and the error output identifies the specific project folder and field at fault

### Requirement: Project number is derived from the folder name
The catalog SHALL NOT store the displayed project number as a data field. It SHALL be derived at build time from the numeric prefix of the project's folder name.

#### Scenario: Displayed number matches folder prefix
- **WHEN** a project folder is named `08-stringweave`
- **THEN** the rendered card displays "No. 08" without that value existing anywhere in `data.yaml`

### Requirement: Exactly one project is marked featured
The `featured` field SHALL be a manual boolean set independently of any date field. Across the full set of project entries, exactly one entry SHALL have `featured: true`.

#### Scenario: Build fails when featured count is not exactly one
- **WHEN** the collection contains zero entries with `featured: true`, or more than one
- **THEN** the build fails validation with an error identifying the offending count

#### Scenario: Featured flag is independent of date
- **WHEN** a project with an older date is marked `featured: true` while a newer project is marked `featured: false`
- **THEN** the older project is treated as the featured/hero project

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
