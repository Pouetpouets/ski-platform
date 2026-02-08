# Story 2.8: MapCommandBar with Resort Search

Status: done

## Story

As a **user**,
I want **to search for resorts by name and filter the map**,
So that **I can quickly find specific resorts without panning the map**.

## Acceptance Criteria

1. **Given** the map page, **When** viewing the header, **Then** I see a command bar with search input and day picker
2. **Given** I type in the search box, **When** filtering resorts, **Then** map markers filter to show only matching resorts
3. **Given** the command bar, **When** selecting a day, **Then** all scores update based on that day's forecast
4. **Given** search is active, **When** I clear the search, **Then** all resort markers reappear

## Tasks / Subtasks

- [x] Task 1: Create ResortSearchContext for search state management
- [x] Task 2: Build MapCommandBar component with search input
- [x] Task 3: Integrate DayPicker into command bar
- [x] Task 4: Wire search context to resort markers for filtering
- [x] Task 5: Add keyboard shortcut (Ctrl+K or Cmd+K) for search focus
- [x] Task 6: Write tests (5 tests)

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes
- Command bar positioned at top of map with search and day selection
- Search filters markers in real-time as user types
- Day picker integrated showing 7-day pills
- Responsive design for mobile/desktop

### File List

**Created:**
- lib/contexts/resort-search-context.tsx
- components/map/map-command-bar.tsx
- __tests__/map-command-bar.test.tsx

**Modified:**
- components/map/ski-map-wrapper.tsx (added search provider)
- components/map/resort-markers.tsx (filter by search query)
- app/map/page.tsx (include command bar)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-03 | Feature implemented | Dev Agent |
| 2026-02-08 | Story file created retroactively | Code Review |
