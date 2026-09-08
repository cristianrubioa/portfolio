## ADDED Requirements

### Requirement: Initial view shows the first batch of 9 projects
On load, the catalog SHALL render at most the first 9 projects from the current (unfiltered or filtered) result set. No "load more" button SHALL be present anywhere in the UI.

#### Scenario: First load shows at most 9 cards
- **WHEN** the catalog loads with more than 9 total projects and no filter applied
- **THEN** exactly 9 project cards are visible, and no "load more" control exists on the page

#### Scenario: Fewer than 9 projects shows all of them
- **WHEN** the current result set (filtered or not) contains fewer than 9 projects
- **THEN** all of them are visible and no additional loading occurs

### Requirement: Next batch reveals automatically on scroll proximity
When the user scrolls near the end of the currently visible grid, the next batch of up to 9 projects from the current result set SHALL be revealed automatically, without any user click and without a network request (the full dataset is already present in the page).

#### Scenario: Scrolling near the bottom reveals the next 9
- **WHEN** the user scrolls such that the end-of-grid sentinel enters the viewport, and more than 9 projects remain in the current result set beyond what's visible
- **THEN** up to 9 more project cards become visible immediately, with no loading indicator and no network request

#### Scenario: No more projects to reveal
- **WHEN** the user scrolls to the end-of-grid sentinel and every project in the current result set is already visible
- **THEN** no further cards are added and no sentinel-triggered action occurs

### Requirement: Changing the active tag filter resets the visible batch
Applying or clearing a tag filter SHALL reset the progressive-loading state so the first batch of up to 9 projects from the newly-filtered result set is shown.

#### Scenario: Switching filters resets to the first 9
- **WHEN** a user has scrolled to reveal more than 9 cards under "All", then selects a specific tag
- **THEN** the visible set resets to at most the first 9 projects matching that tag, and scrolling further re-triggers reveal of subsequent batches within that filtered set
