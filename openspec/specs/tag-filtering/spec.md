# tag-filtering Specification

## Purpose
TBD - created by archiving change portfolio-dashboard. Update Purpose after archive.
## Requirements
### Requirement: Client-side tag filtering without reload or URL change
The catalog SHALL let a user filter visible projects by a single tag at a time, entirely client-side. Selecting a tag SHALL NOT trigger a page reload, a network request, or any change to the browser URL.

#### Scenario: Selecting a tag hides non-matching cards
- **WHEN** a user selects a tag chip (e.g. "robotics")
- **THEN** only project cards whose tags include "robotics" remain visible, with no page reload and no URL change

#### Scenario: Selecting "All" restores the full catalog
- **WHEN** a user selects the "All" filter option
- **THEN** every project card becomes visible again, subject to the current progressive-loading batch size

#### Scenario: Filter selection is reflected in the active chip's styling
- **WHEN** a user selects a tag chip
- **THEN** that chip is visually marked active and any previously active chip is no longer marked active

