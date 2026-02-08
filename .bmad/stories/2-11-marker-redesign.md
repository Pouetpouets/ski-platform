# Story 2.11: Resort Marker Redesign

Status: done

## Story

As a **user**,
I want **visually appealing and informative resort markers**,
So that **I can quickly scan the map and identify the best resorts**.

## Acceptance Criteria

1. **Given** the map view, **When** viewing markers, **Then** markers show score prominently with color-coded background
2. **Given** marker hover, **When** mousing over a marker, **Then** the marker elevates and shows resort name tooltip
3. **Given** marker z-index, **When** markers overlap, **Then** higher-scored markers appear on top
4. **Given** zoom levels, **When** zoomed out, **Then** markers remain readable and don't clutter

## Tasks / Subtasks

- [x] Task 1: Redesign marker visual style to match landing page aesthetic
- [x] Task 2: Fix marker hover displacement bug
- [x] Task 3: Implement proper z-index stacking (higher scores on top)
- [x] Task 4: Add smooth hover transitions
- [x] Task 5: Ensure markers work at various zoom levels

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes
- Markers use rounded pill design with score and color
- Hover effect lifts marker and shows name
- Z-index based on score ensures best resorts visible
- Fixed displacement bug on hover (was shifting position)
- Added CSS transitions for smooth interactions

### File List

**Modified:**
- components/map/resort-markers.tsx (complete visual redesign)
- app/globals.css (marker animation styles)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-05 | Marker redesign implemented | Dev Agent |
| 2026-02-06 | Fixed hover displacement bug | Dev Agent |
| 2026-02-07 | Fixed z-index and transitions | Dev Agent |
| 2026-02-08 | Story file created retroactively | Code Review |
