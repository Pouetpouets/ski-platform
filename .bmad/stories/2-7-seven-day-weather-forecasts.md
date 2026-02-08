# Story 2.7: 7-Day Weather Forecasts via Open-Meteo API

Status: done

## Story

As a **user**,
I want **to see weather forecasts for the next 7 days**,
So that **I can plan my ski trip for the best weather day**.

## Acceptance Criteria

1. **Given** the resort detail panel is open, **When** viewing weather, **Then** I see forecasts for 7 days with temperature, precipitation, and conditions
2. **Given** the map view, **When** selecting a day from the day picker, **Then** all resort scores recalculate using that day's weather forecast
3. **Given** a cron job runs, **When** fetching forecasts, **Then** Open-Meteo API data is stored in weather_forecasts table
4. **Given** forecast data exists, **When** calculating scores, **Then** weather factor uses forecast for selected day instead of current conditions

## Tasks / Subtasks

- [x] Task 1: Create weather_forecasts database table migration
- [x] Task 2: Implement Open-Meteo API fetcher (`lib/weather/fetcher.ts`)
- [x] Task 3: Create WMO weather code mappings (`lib/weather/wmo-codes.ts`)
- [x] Task 4: Add cron route `/api/cron/fetch-forecasts`
- [x] Task 5: Create ForecastDayContext for day selection state
- [x] Task 6: Build DayPicker component with 7-day pills
- [x] Task 7: Update WeatherDisplay to show forecast data
- [x] Task 8: Modify score calculation to use weather override from forecast
- [x] Task 9: Write tests (27 weather-related tests)

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes
- Integrated Open-Meteo free API for 7-day forecasts
- Created ForecastDayContext to manage selected day state across components
- DayPicker shows day names (Mon, Tue, etc.) with today highlighted
- Score calculation accepts optional weather override for forecast days
- Cron job configured in vercel.json for daily forecast updates

### File List

**Created:**
- supabase/migrations/20260202000004_create_weather_forecasts.sql
- lib/weather/fetcher.ts
- lib/weather/index.ts
- lib/weather/types.ts
- lib/weather/wmo-codes.ts
- lib/contexts/forecast-day-context.tsx
- components/map/day-picker.tsx
- app/api/cron/fetch-forecasts/route.ts
- __tests__/weather/fetcher.test.ts
- __tests__/weather/index.test.ts
- __tests__/weather/wmo-codes.test.ts
- __tests__/day-picker.test.tsx
- __tests__/score-weather-override.test.ts
- __tests__/weather-display-forecast.test.tsx

**Modified:**
- lib/utils/score.ts (added weather override parameter)
- lib/types/database.ts (added WeatherForecast type)
- lib/data/resorts.ts (fetch forecasts with resorts)
- components/resort/weather-display.tsx (display forecast data)
- components/map/resort-detail-panel.tsx (pass forecast to weather display)
- components/map/ski-map-wrapper.tsx (wrap with ForecastDayProvider)
- vercel.json (added cron schedule)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-02 | Feature implemented with full test coverage | Dev Agent |
| 2026-02-08 | Story file created retroactively | Code Review |
