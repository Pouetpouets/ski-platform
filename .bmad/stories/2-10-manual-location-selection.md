# Story 2.10: Manual Location Selection Modal

Status: done

## Story

As a **user**,
I want **to manually select my location on the map**,
So that **I can see distances even if I deny browser geolocation or am planning from a different location**.

## Acceptance Criteria

1. **Given** geolocation is denied or unavailable, **When** viewing the map, **Then** I see an option to manually set my location
2. **Given** the location modal opens, **When** I click on the map, **Then** that point is set as my location
3. **Given** manual location is set, **When** viewing resort distances, **Then** distances calculate from my chosen location
4. **Given** I have a manual location, **When** I want to change it, **Then** I can open the modal again and select a new point

## Tasks / Subtasks

- [x] Task 1: Create LocationModal component with mini map
- [x] Task 2: Add "Set Location" button in command bar when no location
- [x] Task 3: Update LocationContext to support manual location override
- [x] Task 4: Store manual location in localStorage for persistence
- [x] Task 5: Update distance calculations to use manual location when set

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes
- Modal shows a Mapbox map where user can click to set location
- Location pin marker appears at selected point
- Coordinates stored in LocationContext and localStorage
- Button in command bar shows "Set Location" when no location available

### File List

**Created:**
- components/map/location-modal.tsx

**Modified:**
- lib/contexts/location-context.tsx (added manual location support)
- components/map/map-command-bar.tsx (added location button)
- components/map/ski-map-wrapper.tsx (integrated modal)
- lib/utils/distance.ts (use context location)
- __tests__/map-command-bar.test.tsx (updated tests)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-08 | Feature implemented | Dev Agent |
| 2026-02-08 | Story file created | Code Review |
