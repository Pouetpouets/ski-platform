# Story 3.4: Display Crowd Predictions

Status: done

## Story

As a **user**,
I want **to see predicted crowd levels for today with visual indicators**,
so that **I can avoid busy resorts (FR15)**.

## Acceptance Criteria

1. **Given** the resort detail panel is open, **When** viewing the crowd section, **Then** I see crowd level displayed as: Low / Moderate / High / Very High
2. **Given** crowd level value, **When** "low" → green indicator, "moderate" → yellow indicator, "high" or "very_high" → red indicator
3. **Given** the section renders, **Then** a section header "Crowd Level" displays with a Users icon and factor indicator dot
4. **Given** crowd_level data, **When** displaying, **Then** underscores are replaced with spaces and text is capitalized (e.g., "very_high" → "Very High")

## Tasks / Subtasks

- [x] Task 1: Create CrowdLevel sub-component (AC: #1, #4)
- [x] Task 2: Add crowd quality factor indicator (AC: #2, #3)
- [x] Task 3: Integrate into ResortDetailPanel (AC: #1, #3)
- [x] Task 4: Tests

## Dev Notes

- Component: `components/resort/crowd-level-display.tsx`
- Utility: Add `getCrowdQualityLevel()` to `lib/utils/conditions.ts`
- Reuse FactorIndicator from Story 3.2
- Follow same section pattern as SnowConditions and RunsLiftsStatus

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

### Completion Notes List

### Change Log

- Created `components/resort/crowd-level-display.tsx` - CrowdLevelDisplay component with Users icon, section header, factor indicator, and formatted crowd level text
- Added `getCrowdQualityLevel()` and `formatCrowdLevel()` to `lib/utils/conditions.ts`
- Updated `components/map/resort-detail-panel.tsx` - replaced inline Crowd ConditionItem with CrowdLevelDisplay component
- Created `__tests__/crowd-level-display.test.tsx` - 16 tests (4 unit for quality level, 4 unit for formatting, 8 component)
- Updated `__tests__/resort-detail-panel.test.tsx` - adjusted crowd assertion for formatted output

### File List

- `components/resort/crowd-level-display.tsx` (new)
- `lib/utils/conditions.ts` (modified)
- `components/map/resort-detail-panel.tsx` (modified)
- `__tests__/crowd-level-display.test.tsx` (new)
- `__tests__/resort-detail-panel.test.tsx` (modified)
