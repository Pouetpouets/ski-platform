# Story 2.9: Snow Conditions Heatmap Layer

Status: done

## Story

As a **user**,
I want **to see a visual heatmap of snow conditions across the map**,
So that **I can quickly identify regions with the best snow**.

## Acceptance Criteria

1. **Given** the map view, **When** toggling the snow layer, **Then** a heatmap overlay shows snow depth intensity
2. **Given** snow layer is active, **When** viewing resorts, **Then** areas with more snow appear more intensely colored
3. **Given** the toggle control, **When** turning off the layer, **Then** the heatmap disappears and normal map is visible

## Tasks / Subtasks

- [x] Task 1: Add Mapbox heatmap layer configuration
- [x] Task 2: Create snow layer toggle button in map controls
- [x] Task 3: Wire resort snow data to heatmap layer
- [x] Task 4: Style heatmap with appropriate color gradient (blue/white)
- [x] Task 5: Set snow layer off by default

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes
- Heatmap layer uses Mapbox GL's built-in heatmap layer type
- Snow depth from resort conditions drives intensity
- Toggle button in map controls (snowflake icon)
- Layer disabled by default to avoid visual clutter

### File List

**Modified:**
- components/map/ski-map.tsx (added heatmap layer and toggle)
- components/map/map-command-bar.tsx (added snow layer toggle button)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-04 | Feature implemented | Dev Agent |
| 2026-02-08 | Story file created retroactively | Code Review |
