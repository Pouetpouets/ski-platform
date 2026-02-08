# Story 3.1: Resort Detail Panel Component

Status: done

## Story

As a **user**,
I want **to view detailed resort information when I select a resort**,
so that **I can make an informed decision (FR12)**.

## Acceptance Criteria

1. **Given** I click on a resort marker, **When** the selection is made, **Then** a slide-in panel appears from the right side with 400px width and 200ms ease-out animation
2. **Given** the detail panel is open, **When** viewing its content, **Then** resort name displays prominently at top, Perfect Day Score shows with large number, and all condition factors are listed below
3. **Given** the detail panel is open, **When** I click the X button or click outside the panel, **Then** panel slides out with 200ms animation and map returns to full interaction mode
4. **Given** keyboard accessibility, **When** the panel is open, **Then** focus is trapped within panel, Escape key closes the panel, and Tab navigates through interactive elements

## Tasks / Subtasks

- [x] Task 1: Create ResortDetailPanel component (AC: #1, #2, #3, #4)
  - [x] 1.1 Create `components/map/resort-detail-panel.tsx` using shadcn Sheet component (side="right")
  - [x] 1.2 Build panel header: resort name, altitude range, score badge with color
  - [x] 1.3 Build distance section: formatted distance + driving time from user/Lyon
  - [x] 1.4 Build conditions grid: snow, runs, lifts, crowd, price, fresh snow, weather, parking
  - [x] 1.5 Build links footer: website + webcam external links
  - [x] 1.6 Ensure 200ms animation (override Sheet default 300ms/500ms durations)
- [x] Task 2: Refactor ski-map-wrapper.tsx (AC: #1, #3)
  - [x] 2.1 Remove inline resort card JSX (current bottom card)
  - [x] 2.2 Import and use ResortDetailPanel component
  - [x] 2.3 Control Sheet open state via `selectedResort !== null`
  - [x] 2.4 Pass score, distanceInfo, userLocation as props
- [x] Task 3: Accessibility & keyboard (AC: #4)
  - [x] 3.1 Verify Sheet provides focus trapping (Radix Dialog does this natively)
  - [x] 3.2 Add `aria-label="Resort details"` to SheetContent
  - [x] 3.3 Ensure Escape key closes panel (Radix handles this)
  - [x] 3.4 Test Tab navigation through interactive elements
- [x] Task 4: Tests (AC: #1, #2, #3, #4)
  - [x] 4.1 Create `__tests__/resort-detail-panel.test.tsx`
  - [x] 4.2 Test: panel renders resort name, altitude, score when open
  - [x] 4.3 Test: conditions data displayed correctly (snow, runs, lifts, crowd)
  - [x] 4.4 Test: "No conditions data" message when conditions is null
  - [x] 4.5 Test: close button calls onClose
  - [x] 4.6 Test: links render when URLs present, hidden when null
  - [x] 4.7 Update smoke.test.tsx if needed (no update needed — existing tests still pass)

## Dev Notes

### Architecture Compliance

- **Component location**: `components/map/resort-detail-panel.tsx` — stays in `/map` folder since it's tightly coupled with the map interaction. Architecture doc suggests `components/resort/ResortPanel.tsx` but that structure is for later when the resort folder has multiple components (ScoreBreakdown, ConditionBadge, etc. in Epic 3-4). For now, keep it simple in `/map`.
- **Use shadcn Sheet**: The Sheet component (`components/ui/sheet.tsx`) is already installed and uses Radix Dialog under the hood. It provides: slide-in animation, overlay, focus trapping, Escape to close, click-outside to close.
- **No barrel exports yet**: Don't create `index.ts` barrel files until there are 3+ components in a folder.
- **State pattern**: `selectedResort` state stays in `ski-map-wrapper.tsx` — it's the parent managing map↔panel communication per architecture spec.

### Technical Requirements

- **Sheet side**: `side="right"` (default, but be explicit)
- **Animation override**: Sheet defaults to 500ms open / 300ms close. AC requires 200ms. Override via className on SheetContent: `duration-200` on both `data-[state=open]` and `data-[state=closed]` transitions.
- **Width**: AC says 400px. Sheet default is `sm:max-w-sm` (384px). Override to `sm:max-w-[400px]` or use `className="w-[400px]"`.
- **Score display**: Use `getScoreColor(score)` for Tailwind class and display `{score}%` prominently.
- **Distance**: Always shows (from user location or from Lyon). Use existing `getDistanceInfo()` — it never returns null.

### Library/Framework Requirements

- **shadcn Sheet** — already installed at `components/ui/sheet.tsx`
- **Radix Dialog** — `@radix-ui/react-dialog@^1.1.15` already in package.json
- **lucide-react** — `^0.511.0` for icons (X, Snowflake, Mountain, Users, Ticket, Car, ExternalLink, etc.)
- **No new dependencies needed**

### File Structure

```
components/map/
├── ski-map.tsx               # No changes needed
├── ski-map-wrapper.tsx       # MODIFY: remove card, add ResortDetailPanel
├── resort-markers.tsx        # No changes needed
└── resort-detail-panel.tsx   # NEW: Sheet-based detail panel
```

### Existing Code Patterns to Follow

- Score color: `getScoreColor(score)` returns `bg-score-excellent|good|fair|poor`
- Distance: `getDistanceInfo(userLocation, lat, lon)` returns `{ formattedDistance, drivingTime, fromLocation }`
- Score calc: `calculateSimpleScore(conditions)` returns 0-100
- Crowd display: `crowd_level.replace('_', ' ')` with capitalize class
- Conditions null check: show "No conditions data available" fallback
- External links: `target="_blank" rel="noopener noreferrer"`

### UX Specifications

- **Panel width**: 400px fixed
- **Panel padding**: 24px (lg spacing)
- **Section spacing**: 24px between sections
- **Typography**: H1 24px/600 for panel title, H2 18px/600 for section headers
- **Score badge**: Large, prominent, colored per score thresholds
- **Factor display**: Each condition factor with icon + value
- **Slide direction**: Always from right
- **Overlay**: Semi-transparent behind panel
- **ARIA**: `role="complementary"`, `aria-label="Resort details"`

### Current Card Content to Migrate

The current card in `ski-map-wrapper.tsx` lines 47-146 displays:
1. Resort name + altitude range
2. Score badge (colored circle with %)
3. Close button (×)
4. Distance from user/Lyon with driving time
5. Conditions grid: snow depth, runs, lifts, crowd, price, fresh snow
6. Links: website + webcam

All of this content moves into the new Sheet panel with better layout and more space.

### What NOT to Implement (Future Stories)

- Score breakdown by factor (Story 4.3)
- Factor indicators green/yellow/red (Story 3.9)
- Powder Alert badge (Story 3.2)
- Weather details (Story 3.5)
- Parking details (Story 3.7)
- The panel should display current data fields but the detailed per-factor sections with indicators are separate stories.

### Project Structure Notes

- Alignment with unified project structure: component in `/components/map/`, test in `/__tests__/`
- Note: architecture doc recommends co-located tests but project uses `__tests__/` folder pattern consistently — follow existing pattern

### References

- [Source: _bmad-output/planning-artifacts/epics-ski-platform.md#Epic 3, Story 3.1]
- [Source: _bmad-output/planning-artifacts/architecture-ski-platform.md#Component Architecture]
- [Source: _bmad-output/planning-artifacts/ux-design-ski-platform.md#ResortPanel spec]
- [Source: components/ui/sheet.tsx — Sheet component API]
- [Source: components/map/ski-map-wrapper.tsx — Current card implementation to replace]

### Previous Story Intelligence (Epic 2)

- Score colors work correctly (both Tailwind classes and hex)
- `getDistanceInfo()` return type was fixed to never return null — safe to use directly
- Map callback pattern uses refs to prevent re-initialization (don't break this)
- Tests are in `__tests__/` folder, not co-located

### Git Intelligence

Recent commits show review fixes pattern. Implementation should follow the existing commit message format: `feat(resort): add resort detail panel (Story 3.1)`.

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None — clean implementation with no failures.

### Completion Notes List

- Created ResortDetailPanel component using shadcn Sheet (Radix Dialog) with slide-in from right
- Panel displays: resort name, altitude, score badge, distance info, conditions grid (12 fields), external links
- Replaced inline card in ski-map-wrapper.tsx with clean component composition
- Animation duration set to 200ms (AC requirement) — applied at Sheet base component level (overlay + content synchronized)
- Width set to 400px via className override (AC requirement)
- Accessibility: aria-label="Resort details", focus trapping via Radix, Escape to close
- Used lucide-react icons for condition items (Snowflake, Mountain, CableCar, Users, etc.)
- Created ConditionItem helper component for consistent condition display
- 12 tests covering: render, closed state, conditions, no-conditions, links, close, accessibility, null altitude
- All 148 tests pass with no regressions

### Senior Developer Review (AI)

**Review Date:** 2026-02-01
**Review Outcome:** Approve (with fixes applied)
**Reviewer Model:** Claude Opus 4.5

**Findings (8 total):** 0 Critical, 5 Medium, 3 Low
**All 5 Medium issues auto-fixed during review.**

**Fixes Applied:**
- [x] Animation overlay timing synced to 200ms (overlay + content + base Sheet)
- [x] Test assertions upgraded from `toBeDefined()` to `toBeInTheDocument()`
- [x] Added test for `isOpen=false` with valid resort
- [x] Added test for null altitude values
- [x] Fixed null handling for `altitude_min`/`altitude_max` with graceful fallback
- [x] Fixed Radix Dialog missing Description warning for null-altitude case

**Remaining LOW issues (not fixed - cosmetic):**
- [ ] project-context.md says co-located tests but project uses `__tests__/` folder
- [ ] Duplicate Snowflake icon used for both "Base snow" and "Runs"
- [ ] SheetFooter used for navigation links (semantic concern)

### Change Log

- 2026-01-30: Story implemented — ResortDetailPanel component created, ski-map-wrapper refactored, 10 tests added
- 2026-02-01: Code review — 5 medium issues fixed: animation sync, test quality, null altitude handling, 2 new tests added

### File List

- `components/map/resort-detail-panel.tsx` (NEW, MODIFIED) — Sheet-based resort detail panel
- `components/map/ski-map-wrapper.tsx` (MODIFIED) — Removed inline card, uses ResortDetailPanel
- `components/ui/sheet.tsx` (MODIFIED) — Animation durations set to 200ms (overlay + content)
- `__tests__/resort-detail-panel.test.tsx` (NEW, MODIFIED) — 12 unit tests for panel component
