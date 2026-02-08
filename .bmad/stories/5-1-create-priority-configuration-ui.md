# Story 5.1: Create Priority Configuration UI

Status: done

## Story

As a **user**,
I want **a settings interface to configure my priorities**,
so that **I can tell the system what matters most to me (FR21)**.

## Acceptance Criteria

1. **Given** I click the settings/configure button, **When** the settings panel opens, **Then** I see a list of all 6 scoring factors with their current priority order (1-6)
2. **Given** the priority configuration UI, **When** viewing the interface, **Then** each factor shows an emoji, label, and current weight percentage
3. **Given** the panel, **When** viewing, **Then** up/down arrow buttons are available for reordering
4. **Given** I reorder factors, **When** the order changes, **Then** map scores recalculate immediately via PrioritiesContext

## Tasks / Subtasks

- [ ] Task 1: Create PrioritySettingsPanel component with Sheet (left side)
- [ ] Task 2: Add settings trigger button in map header
- [ ] Task 3: Implement up/down reorder buttons for each factor
- [ ] Task 4: Wire to PrioritiesContext for live score updates
- [ ] Task 5: Tests

## Dev Notes

- Use left-side Sheet (opposite of resort detail panel which is right)
- Reuse FACTOR_LABELS and FACTOR_EMOJI from score-breakdown.tsx (extract to shared)
- Add settings button (Settings icon from lucide) in map page header
- Up/down buttons are simpler and more accessible than drag-and-drop initially
