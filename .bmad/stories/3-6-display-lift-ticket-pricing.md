# Story 3.6: Display Lift Ticket Pricing

Status: done

## Story

As a **user**,
I want **to see lift ticket prices with visual indicators**,
so that **I can factor cost into my decision (FR17)**.

## Acceptance Criteria

1. **Given** the resort detail panel is open, **When** viewing the pricing section, **Then** I see adult day pass price (e.g., "€54")
2. **Given** price comparison, **When** price < €45 → green indicator (budget-friendly), €45-€55 → yellow indicator (average), > €55 → red indicator (premium)
3. **Given** the section renders, **Then** a section header "Lift Ticket" displays with a Ticket icon and factor indicator dot
4. **Given** no price data, **When** adult_ticket_price is null, **Then** component returns null

## Tasks / Subtasks

- [x] Task 1: Add getPriceQualityLevel() to conditions.ts
- [x] Task 2: Create TicketPriceDisplay component
- [x] Task 3: Integrate into ResortDetailPanel, replacing inline price ConditionItem
- [x] Task 4: Tests

## Dev Notes

- Component: `components/resort/ticket-price-display.tsx`
- Utility: Add `getPriceQualityLevel()` to `lib/utils/conditions.ts`
- Reuse FactorIndicator from Story 3.2
- Price thresholds from epic: <45 good, 45-55 moderate, >55 poor

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Change Log

- Added `getPriceQualityLevel()` and `PRICE_THRESHOLDS` to `lib/utils/conditions.ts`
- Created `components/resort/ticket-price-display.tsx` - TicketPriceDisplay with Ticket icon, factor indicator, formatted price
- Updated `components/map/resort-detail-panel.tsx` - replaced inline price ConditionItem with TicketPriceDisplay, removed Ticket import
- Created `__tests__/ticket-price-display.test.tsx` - 13 tests (6 unit, 7 component)

### File List

- `components/resort/ticket-price-display.tsx` (new)
- `lib/utils/conditions.ts` (modified)
- `components/map/resort-detail-panel.tsx` (modified)
- `__tests__/ticket-price-display.test.tsx` (new)
