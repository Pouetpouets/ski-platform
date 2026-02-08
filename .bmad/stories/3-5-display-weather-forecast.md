# Story 3.5: Display Weather Forecast

Status: done

## Story

As a **user**,
I want **to see weather forecast for the resort with visual indicators**,
so that **I can plan for conditions (FR16)**.

## Acceptance Criteria

1. **Given** the resort detail panel is open, **When** viewing the weather section, **Then** I see weather condition displayed with an appropriate icon (sunny, cloudy, snowing, etc.) and temperature range (e.g., "-5°C to 2°C")
2. **Given** weather condition, **When** "sunny" or "partly_cloudy" → green indicator, "cloudy" or "overcast" → yellow indicator, "snowing", "rain", "storm", or "high_winds" → red indicator
3. **Given** the section renders, **Then** a section header "Weather" displays with a Cloud icon and factor indicator dot
4. **Given** weather_condition data, **When** displaying, **Then** underscores are replaced with spaces and text is capitalized

## Tasks / Subtasks

- [x] Task 1: Add getWeatherQualityLevel() and formatWeatherCondition() to conditions.ts
- [x] Task 2: Create WeatherDisplay component (AC: #1, #3, #4)
- [x] Task 3: Integrate into ResortDetailPanel, replacing inline weather/temp ConditionItems (AC: #1, #3)
- [x] Task 4: Tests

## Dev Notes

- Component: `components/resort/weather-display.tsx`
- Utility: Add `getWeatherQualityLevel()` to `lib/utils/conditions.ts`
- Reuse FactorIndicator from Story 3.2
- Follow same section pattern as SnowConditions, RunsLiftsStatus, CrowdLevelDisplay
- Weather conditions in seed: sunny, partly_cloudy, snowing, cloudy
- Also support: rain, storm, overcast, high_winds per epic ACs
- weather_condition is `string | null` in DB (not an enum)

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

### Completion Notes List

### Change Log

- Added `getWeatherQualityLevel()` and `formatWeatherCondition()` to `lib/utils/conditions.ts`
- Created `components/resort/weather-display.tsx` - WeatherDisplay component with weather icons per condition, temperature range, Thermometer header icon, and factor indicator
- Updated `components/map/resort-detail-panel.tsx` - replaced inline weather/temp ConditionItems with WeatherDisplay, removed unused Thermometer import
- Created `__tests__/weather-display.test.tsx` - 24 tests (10 unit for quality level, 3 unit for formatting, 11 component)

### File List

- `components/resort/weather-display.tsx` (new)
- `lib/utils/conditions.ts` (modified)
- `components/map/resort-detail-panel.tsx` (modified)
- `__tests__/weather-display.test.tsx` (new)
