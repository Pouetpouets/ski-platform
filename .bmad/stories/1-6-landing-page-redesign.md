# Story 1.6: Landing Page with Real-Time Resort Data

Status: done

## Story

As a **user**,
I want **an engaging landing page that shows real resort data**,
So that **I understand the value of the platform before exploring the map**.

## Acceptance Criteria

1. **Given** I visit the home page, **When** the page loads, **Then** I see a hero section with compelling copy and CTA to map
2. **Given** the landing page, **When** viewing featured resorts, **Then** I see real-time scores and conditions for top resorts
3. **Given** the page design, **When** viewing on mobile, **Then** the layout is responsive and usable
4. **Given** the page, **When** viewing icons, **Then** Lucide icons are used consistently

## Tasks / Subtasks

- [x] Task 1: Design hero section with experience-driven storytelling
- [x] Task 2: Add featured resorts section with live data from Supabase
- [x] Task 3: Implement responsive layout for mobile/tablet/desktop
- [x] Task 4: Replace generic icons with Lucide icon library
- [x] Task 5: Add footer with MountainSnow branding
- [x] Task 6: Connect to Supabase to fetch real resort scores

## Dev Agent Record

### Agent Model Used
Claude Opus 4.5 (claude-opus-4-5-20251101)

### Completion Notes
- Landing page at `/` with map moved to `/map` route
- Hero section emphasizes "Find your perfect ski day"
- Featured resorts show top 3-6 resorts by current score
- Lucide icons throughout (Mountain, Snowflake, MapPin, etc.)
- Footer uses MountainSnow icon for branding

### File List

**Modified:**
- app/page.tsx (complete redesign with real data)
- app/layout.tsx (updated metadata)

**Created:**
- app/map/page.tsx (map moved from root)

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2026-02-01 | Initial landing page with storytelling | Dev Agent |
| 2026-02-04 | Enhanced with real-time resort data | Dev Agent |
| 2026-02-08 | Story file created retroactively | Code Review |
