# Story 1.2: MUI Theme & Base Layout

Status: review

## Story

As a **user**,
I want **a clean, calm interface with consistent styling**,
So that **the application feels professional and easy to use**.

## Acceptance Criteria

1. **AC1: MUI Theme Applied**
   - Given the application loads
   - When any page renders
   - Then the MUI theme is applied with the defined color palette (#5C6BC0 primary, #FAFAFA background)
   - And typography follows the specification (Inter/Roboto font family)

2. **AC2: Base Layout Structure**
   - Given a logged-in user
   - When they view any page
   - Then they see a Sidebar on the left (240px width)
   - And the Main content area fills the remaining space
   - And a TopBar shows the current page title

3. **AC3: Sidebar Navigation**
   - Given the Sidebar is displayed
   - When the user views it
   - Then they see navigation items based on their role
   - And the current page is highlighted

## Tasks / Subtasks

- [x] Task 1: Create MUI Theme Configuration (AC: #1)
  - [x] 1.1 Install Google Fonts (Inter) or configure Roboto
  - [x] 1.2 Create `src/theme/theme.ts` with color palette (#5C6BC0 primary, #FAFAFA background)
  - [x] 1.3 Configure typography (Inter/Roboto, font sizes, weights)
  - [x] 1.4 Wrap App with ThemeProvider in main.tsx
  - [x] 1.5 Test: Theme colors and fonts apply correctly

- [x] Task 2: Create Base Layout Component (AC: #2)
  - [x] 2.1 Create `src/components/Layout/Layout.tsx` with Sidebar + Main structure
  - [x] 2.2 Create `src/components/Layout/Sidebar.tsx` (240px fixed width)
  - [x] 2.3 Create `src/components/Layout/TopBar.tsx` with page title prop
  - [x] 2.4 Style layout with MUI Box/Drawer components
  - [x] 2.5 Test: Layout renders with correct dimensions

- [x] Task 3: Implement Sidebar Navigation (AC: #3)
  - [x] 3.1 Create navigation items configuration (Dashboard, Documents, Team, Admin)
  - [x] 3.2 Add role-based filtering for navigation items
  - [x] 3.3 Highlight active navigation item based on current route
  - [x] 3.4 Add app logo/title to Sidebar header
  - [x] 3.5 Test: Navigation items show based on role, active state works

- [x] Task 4: Create Basic Pages (AC: #2, #3)
  - [x] 4.1 Create placeholder Dashboard page
  - [x] 4.2 Create placeholder Documents page
  - [x] 4.3 Wrap pages with Layout component
  - [x] 4.4 Test: Pages render within layout correctly

## Dev Notes

### Architecture Requirements
- Use MUI v5+ component library (already installed)
- Follow Notion-like calm aesthetic (muted colors, clean lines)
- Sidebar should be fixed, not collapsible for MVP

### Color Palette (from UX Design)
| Color | Hex | Usage |
|-------|-----|-------|
| Primary | #5C6BC0 | Buttons, active states, links |
| Background | #FAFAFA | Page background |
| Surface | #FFFFFF | Cards, panels |
| Text Primary | #212121 | Main text |
| Text Secondary | #757575 | Secondary text |
| Divider | #E0E0E0 | Borders, separators |

### Typography
- Font Family: Inter (preferred) or Roboto (fallback)
- Headings: 600 weight
- Body: 400 weight
- Font sizes: Follow MUI defaults with minor adjustments

### Navigation Items by Role
| Item | Operator | Manager | Admin |
|------|----------|---------|-------|
| Dashboard | ✓ | ✓ | ✓ |
| Documents | ✓ | ✓ | ✓ |
| Team | ✗ | ✓ | ✓ |
| Admin Library | ✗ | ✗ | ✓ |

### Component Structure
```
src/
├── components/
│   └── Layout/
│       ├── Layout.tsx      # Main layout wrapper
│       ├── Sidebar.tsx     # Left sidebar with navigation
│       ├── TopBar.tsx      # Top bar with page title
│       └── index.ts        # Exports
├── theme/
│   └── theme.ts            # MUI theme configuration
└── pages/
    ├── Dashboard.tsx       # Placeholder
    └── Documents.tsx       # Placeholder
```

### References
- [Source: ux-design-specification.md#Visual Design]
- [Source: ux-design-specification.md#Layout Pattern]
- [Source: project-context.md#Frontend Stack]

### Anti-Patterns to AVOID
1. **DON'T** make sidebar collapsible - keep it simple for MVP
2. **DON'T** add responsive mobile layout yet - desktop first
3. **DON'T** implement actual routing yet - that's Story 1.4
4. **DON'T** add authentication checks - that's Story 1.3

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Fixed TypeScript verbatimModuleSyntax errors for type imports

### Completion Notes List

- Task 1: Created MUI theme with Notion-like calm aesthetic (#5C6BC0 primary, #FAFAFA background). Installed @fontsource/inter for typography. Wrapped App with ThemeProvider and CssBaseline.
- Task 2: Created Layout component with fixed 240px Sidebar and flexible main content area. TopBar displays page title. All styled with MUI components.
- Task 3: Implemented navigation items with role-based filtering (Operator sees Dashboard/Documents, Manager adds Team, Admin sees all including Admin Library). Active item highlighted with primary color.
- Task 4: Created placeholder Dashboard and Documents pages. Added temporary role selector in TopBar for testing role-based navigation (will be replaced in Story 1.3).
- Bonus: Added temporary navigation handler to allow page switching before React Router is implemented in Story 1.4.

### Change Log

| Date | Change | Files |
|------|--------|-------|
| 2026-01-25 | Create MUI theme configuration | src/theme/theme.ts |
| 2026-01-25 | Create Layout components | src/components/Layout/* |
| 2026-01-25 | Create placeholder pages | src/pages/Dashboard.tsx, Documents.tsx |
| 2026-01-25 | Update main.tsx with ThemeProvider | src/main.tsx |
| 2026-01-25 | Update App.tsx with Layout | src/App.tsx |
| 2026-01-25 | Remove old CSS files | src/App.css, src/index.css |

### File List

**Created:**
- frontend/src/theme/theme.ts
- frontend/src/components/Layout/Layout.tsx
- frontend/src/components/Layout/Sidebar.tsx
- frontend/src/components/Layout/TopBar.tsx
- frontend/src/components/Layout/index.ts
- frontend/src/pages/Dashboard.tsx
- frontend/src/pages/Documents.tsx

**Modified:**
- frontend/src/main.tsx (added ThemeProvider, CssBaseline, Inter fonts)
- frontend/src/App.tsx (replaced with Layout + pages + role selector)
- frontend/package.json (added @fontsource/inter)

**Deleted:**
- frontend/src/App.css
- frontend/src/index.css
