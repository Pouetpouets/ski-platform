# Story 4.1: Implement Score Calculation Algorithm

Status: in-progress

## Story

As a **system**,
I want **to calculate a Perfect Day Score for each resort**,
so that **users can compare resorts with a single metric (FR7, FR8)**.

## Acceptance Criteria

1. **Given** resort conditions data, **When** calculating the Perfect Day Score, **Then** score is a percentage from 0-100%
2. **Given** the scoring algorithm, **When** calculating each factor score, **Then** Snow quality: based on depth, freshness, coverage (0-100), Crowd level: low=100, moderate=70, high=40, very_high=20, Weather: sunny=100, cloudy=80, snow=70, rain=30, storm=10, Price: normalized against regional average, Distance: closer=higher (decay function), Parking: available+free=100, limited=60, full=20
3. **Given** factor scores are calculated, **When** combining into final score, **Then** default weights are equal (1/6 each), weighted average produces final score, score rounded to nearest integer

## Tasks / Subtasks

- [ ] Task 1: Implement individual factor scoring functions (snow, crowd, weather, price, distance, parking)
- [ ] Task 2: Implement calculatePerfectDayScore() with equal-weight aggregation
- [ ] Task 3: Replace calculateSimpleScore usages with calculatePerfectDayScore
- [ ] Task 4: Update tests

## Dev Notes

- Replace placeholder `calculateSimpleScore` in `lib/utils/score.ts`
- Factor functions return 0-100 each
- Distance factor needs distance in km as input (from Haversine)
- Keep `getScoreColor`, `getScoreColorHex`, `SCORE_THRESHOLDS` unchanged
- Score function must accept optional distance parameter

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Change Log

### File List
