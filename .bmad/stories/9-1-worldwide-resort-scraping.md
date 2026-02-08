# Story 9.1: Worldwide Resort Scraping via skiresort.info

Status: done

## Story

As a **system**,
I want **to scrape resort conditions from skiresort.info**,
So that **users see accurate, up-to-date data for resorts worldwide (FR39, FR40)**.

## Acceptance Criteria

1. **Given** the scraper cron job runs, **When** fetching data, **Then** conditions are scraped for all registered resorts
2. **Given** skiresort.info returns data, **When** parsing, **Then** snow depth, lifts open, runs open, and weather are extracted
3. **Given** scraped data is validated, **When** storing, **Then** resort_conditions table is updated with fresh data
4. **Given** a resort slug fails, **When** logging, **Then** the error is recorded but other resorts continue processing

## Tasks / Subtasks

- [x] Task 1: Create resort registry mapping resort IDs to skiresort.info slugs
- [x] Task 2: Implement HTML fetcher with retry logic and rate limiting
- [x] Task 3: Build HTML parser for skiresort.info page structure
- [x] Task 4: Create data mapper to transform scraped data to DB schema
- [x] Task 5: Add cron route `/api/cron/scrape-conditions`
- [x] Task 6: Seed database with worldwide resort data and slugs
- [x] Task 7: Fix 91 incorrect slugs that failed initial scraping
- [x] Task 8: Configure Vercel cron for daily execution (Hobby plan limit)
- [x] Task 9: Write tests (29 scraper tests)

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes
- Scraper fetches from skiresort.info with exponential backoff retry
- Parser extracts: snow depth (base/summit), fresh snow, lifts, runs, weather
- Resort registry maps internal IDs to external slugs
- Cron limited to daily due to Vercel Hobby plan (was 3x daily)
- Fixed 91 incorrect slugs via migration after initial deployment

### File List

**Created:**
- lib/scraper/index.ts
- lib/scraper/fetcher.ts
- lib/scraper/parser.ts
- lib/scraper/mapper.ts
- lib/scraper/types.ts
- lib/scraper/resort-registry.ts
- app/api/cron/scrape-conditions/route.ts
- supabase/migrations/20260202000001_worldwide_resorts.sql
- supabase/migrations/20260202000002_seed_worldwide_resorts.sql
- supabase/migrations/20260202000003_fix_skiresort_info_slugs.sql
- __tests__/scraper/fetcher.test.ts
- __tests__/scraper/parser.test.ts
- __tests__/scraper/mapper.test.ts

**Modified:**
- vercel.json (added cron schedule)
- lib/types/database.ts (added skiresort_info_slug column)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-02 | Initial scraper implementation | Dev Agent |
| 2026-02-02 | Fixed 91 broken slugs | Dev Agent |
| 2026-02-02 | Reduced cron to daily (Vercel limit) | Dev Agent |
| 2026-02-08 | Story file created retroactively | Code Review |
