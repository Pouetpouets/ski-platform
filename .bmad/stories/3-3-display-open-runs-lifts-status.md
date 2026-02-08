# Story 3.3: Display Open Runs/Lifts Status

Status: done

## Story

As a **user**,
I want **to see how many runs and lifts are open with visual indicators**,
so that **I know the available terrain before heading to a resort (FR14)**.

## Acceptance Criteria

1. **Given** the resort detail panel is open, **When** viewing the runs/lifts section, **Then** I see runs open vs total (e.g., "45/52") and lifts open vs total (e.g., "18/22") with percentage visualized
2. **Given** runs open percentage > 80%, **Then** factor indicator shows green; 50-80% shows yellow; < 50% shows red
3. **Given** the section renders, **Then** a section header "Runs & Lifts" displays with a factor indicator dot based on the combined open percentage
4. **Given** runs_total or lifts_total is 0, **When** the panel renders, **Then** division by zero is handled gracefully without crashing

## Tasks / Subtasks

- [x] Task 1: Create RunsLiftsStatus sub-component (AC: #1, #4)
  - [x] 1.1 Created `components/resort/runs-lifts-status.tsx`
  - [x] 1.2 Display runs/lifts open/total with Route and CableCar icons
  - [x] 1.3 Show open percentage as text (e.g., "87%") next to each count
  - [x] 1.4 Division by zero handled: returns 0% when total is 0
- [x] Task 2: Add runs/lifts quality factor indicator (AC: #2, #3)
  - [x] 2.1 Created `getRunsLiftsQualityLevel()` in `lib/utils/conditions.ts`
  - [x] 2.2 Thresholds: good > 80%, moderate 50-80%, poor < 50%
  - [x] 2.3 FactorIndicator placed next to "Runs & Lifts" section header
- [x] Task 3: Integrate into ResortDetailPanel (AC: #1, #3)
  - [x] 3.1 Replaced inline Runs/Lifts ConditionItem entries with RunsLiftsStatus
  - [x] 3.2 Props: runsOpen, runsTotal, liftsOpen, liftsTotal
  - [x] 3.3 Other conditions (crowd, weather, etc.) unchanged
  - [x] 3.4 Removed unused Route/CableCar imports from resort-detail-panel
- [x] Task 4: Tests (AC: #1, #2, #3, #4)
  - [x] 4.1 Created `__tests__/runs-lifts-status.test.tsx` — 15 tests
  - [x] 4.2-4.8 All test scenarios covered
  - [x] 4.9 Full test suite: 185 tests pass, 0 regressions

## Dev Notes

### Architecture Compliance

- **Component location**: `components/resort/runs-lifts-status.tsx` — second component in `/resort/` folder
- **Utility extension**: Add `getRunsLiftsQualityLevel()` to existing `lib/utils/conditions.ts`
- **Reuse**: Use existing `FactorIndicator` component from Story 3.2
- **State pattern**: Pure presentational component, props only

### Technical Requirements

- **Open percentage calculation**: `(runsOpen + liftsOpen) / (runsTotal + liftsTotal) * 100`
- **Thresholds** (from AC #2):
  - Green (good): combined open % > 80
  - Yellow (moderate): combined open % 50-80
  - Red (poor): combined open % < 50
- **Division by zero**: If `runsTotal + liftsTotal === 0`, treat as 0% (poor)
- **Progress visualization**: Simple text percentage or thin progress bar — keep it minimal

### Existing Code Patterns

- Follow same section layout as `SnowConditions`: section header with icon + title + FactorIndicator, then data grid
- Use `Route` icon for runs (already changed from duplicate Snowflake in Story 3.2)
- Use `CableCar` icon for lifts (already used in panel)
- Null handling not needed: `runs_open`, `runs_total`, `lifts_open`, `lifts_total` are `number` (not nullable)

### Previous Story Intelligence (Story 3.2)

- SnowConditions pattern: section header → data grid → optional badge
- FactorIndicator at `components/resort/factor-indicator.tsx` — reuse directly
- `getSnowQualityLevel()` in `lib/utils/conditions.ts` — add new function alongside it
- Tests in `__tests__/` folder, use `toBeInTheDocument()`, mock data matching DB types

### File Structure

```
components/resort/
├── snow-conditions.tsx       # Existing (Story 3.2)
├── factor-indicator.tsx      # Existing (Story 3.2) — reused
└── runs-lifts-status.tsx     # NEW
lib/utils/
└── conditions.ts             # MODIFY: add getRunsLiftsQualityLevel()
components/map/
└── resort-detail-panel.tsx   # MODIFY: replace Runs/Lifts ConditionItems
__tests__/
└── runs-lifts-status.test.tsx # NEW
```

### References

- [Source: epics-ski-platform.md#Story 3.3]
- [Source: lib/types/database.ts#ResortConditions — runs_open, runs_total, lifts_open, lifts_total]
- [Source: components/resort/factor-indicator.tsx — reusable indicator]

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

None — clean implementation.

### Completion Notes List

- Created RunsLiftsStatus component following SnowConditions pattern (section header + data grid)
- Added `getRunsLiftsQualityLevel()` to conditions.ts with combined percentage calculation
- Open percentage shown as text next to each count (compact, no progress bar needed)
- Division by zero handled at both utility and component level
- Removed unused Route/CableCar imports from resort-detail-panel (now in RunsLiftsStatus)
- 15 new tests: 7 unit (quality level) + 8 component (rendering, indicators, edge cases)
- All 185 tests pass, 0 regressions

### Change Log

- 2026-02-01: Story implemented — RunsLiftsStatus component, quality utility, panel refactored

### File List

- `components/resort/runs-lifts-status.tsx` (NEW) — Runs & Lifts status with percentages
- `lib/utils/conditions.ts` (MODIFIED) — Added getRunsLiftsQualityLevel() + thresholds
- `components/map/resort-detail-panel.tsx` (MODIFIED) — Replaced inline Runs/Lifts with component
- `__tests__/runs-lifts-status.test.tsx` (NEW) — 15 tests
