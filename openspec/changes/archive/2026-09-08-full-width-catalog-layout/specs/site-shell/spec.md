## ADDED Requirements

### Requirement: Layout container uses full viewport width
The shared page container SHALL NOT apply a fixed `max-width` that centers content with large unused side margins. It SHALL instead use small, fixed side padding so the header and page content extend to the full viewport width on all screen sizes.

#### Scenario: Content extends across a wide viewport
- **WHEN** the page renders on a viewport wider than the previous 1100px cap
- **THEN** the header and page content extend beyond 1100px, bounded only by the small side padding, with no large centered empty margins

#### Scenario: Small side padding is preserved
- **WHEN** the page renders at any viewport width
- **THEN** content does not touch the viewport edges — a small fixed padding remains on both sides
