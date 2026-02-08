# Story 1.4: SPA Routing & Navigation

Status: review

## Story

As a **user**,
I want **smooth navigation between pages without full page reloads**,
So that **the application feels fast and responsive**.

## Acceptance Criteria

1. **AC1: React Router Configured**
   - Given React Router is configured
   - When a user clicks a navigation link
   - Then the URL changes without page reload
   - And the correct page component renders

2. **AC2: Dashboard Navigation**
   - Given a user is on any page
   - When they click the logo or "Dashboard" link
   - Then they navigate to the dashboard (FR43)

3. **AC3: Protected Routes**
   - Given routes are configured
   - When an unauthenticated user tries to access a protected route
   - Then they are redirected to the login flow

4. **AC4: Role-Based Routes**
   - Given route configuration
   - When roles are checked
   - Then Operator can access: Dashboard, Documents, Viewer
   - And Manager can access: Dashboard, Documents, Viewer, Team
   - And Admin can access: All pages including Admin Library

## Tasks / Subtasks

- [x] Task 1: Install and Configure React Router (AC: #1)
  - [x] 1.1 Install react-router-dom (already installed in Story 1.1)
  - [x] 1.2 Create `src/router/routes.tsx` with route definitions
  - [x] 1.3 Wrap App with BrowserRouter in main.tsx
  - [x] 1.4 Test: URL changes reflect in browser

- [x] Task 2: Create Route Configuration (AC: #1, #4)
  - [x] 2.1 Define routes with path, component, and required roles
  - [x] 2.2 Create route constants for type-safe navigation
  - [x] 2.3 Configure nested routes for layout
  - [x] 2.4 Test: All routes render correct components

- [x] Task 3: Implement Protected Route Component (AC: #3, #4)
  - [x] 3.1 Create `src/router/ProtectedRoute.tsx`
  - [x] 3.2 Check authentication status from AuthContext
  - [x] 3.3 Check role permissions for route access
  - [x] 3.4 Redirect unauthorized users appropriately
  - [x] 3.5 Test: Unauthorized access redirects correctly

- [x] Task 4: Update Sidebar Navigation (AC: #1, #2)
  - [x] 4.1 Replace onClick handlers with React Router Links
  - [x] 4.2 Use useLocation to determine active route
  - [x] 4.3 Make logo clickable to navigate to dashboard
  - [x] 4.4 Test: Navigation works via sidebar clicks

- [x] Task 5: Refactor App.tsx for Router (AC: #1)
  - [x] 5.1 Remove temporary page state
  - [x] 5.2 Use Outlet for nested routes in Layout
  - [x] 5.3 Move page components to route configuration
  - [x] 5.4 Test: App works with router-based navigation

## Dev Notes

### Route Configuration
| Path | Component | Roles |
|------|-----------|-------|
| / | Dashboard | All |
| /documents | Documents | All |
| /documents/:id | DocumentViewer | All |
| /team | Team | Manager, Admin |
| /admin | AdminLibrary | Admin |

### File Structure
```
frontend/src/
├── router/
│   ├── routes.tsx        # Route definitions + lazy loading
│   ├── ProtectedRoute.tsx # Auth & role guard
│   └── index.ts
├── pages/
│   ├── Dashboard.tsx
│   ├── Documents.tsx
│   ├── Team.tsx
│   ├── AdminLibrary.tsx
│   └── NotFound.tsx
```

### References
- [Source: architecture.md#Frontend Routing]
- [Source: epics.md#Story 1.4]

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Fixed TypeScript type imports for verbatimModuleSyntax
- Implemented lazy loading for all page components (code splitting verified in build output)

### Completion Notes List

- Task 1: BrowserRouter configured in App.tsx, routes defined in routes.tsx with metadata (path, title, roles)
- Task 2: Created ROUTES constants for type-safe navigation. Routes support role-based access control. Nested routes use Layout with Outlet.
- Task 3: ProtectedRoute component checks isAuthenticated and user.role. Unauthorized users redirected to dashboard. canAccessRoute helper function provided.
- Task 4: Sidebar uses React Router Link component and useLocation for active state. Logo is clickable and navigates to dashboard.
- Task 5: App.tsx completely refactored. Removed all temporary page state. Uses Routes/Route with nested layout. Lazy loading with Suspense for all pages.

### Change Log

| Date | Change | Files |
|------|--------|-------|
| 2026-01-25 | Create router configuration | src/router/routes.tsx |
| 2026-01-25 | Create ProtectedRoute component | src/router/ProtectedRoute.tsx |
| 2026-01-25 | Create router exports | src/router/index.ts |
| 2026-01-25 | Create Team page | src/pages/Team.tsx |
| 2026-01-25 | Create AdminLibrary page | src/pages/AdminLibrary.tsx |
| 2026-01-25 | Create NotFound page | src/pages/NotFound.tsx |
| 2026-01-25 | Update Sidebar with React Router | src/components/Layout/Sidebar.tsx |
| 2026-01-25 | Update Layout with Outlet | src/components/Layout/Layout.tsx |
| 2026-01-25 | Refactor App.tsx for router | src/App.tsx |

### File List

**Created:**
- frontend/src/router/routes.tsx
- frontend/src/router/ProtectedRoute.tsx
- frontend/src/router/index.ts
- frontend/src/pages/Team.tsx
- frontend/src/pages/AdminLibrary.tsx
- frontend/src/pages/NotFound.tsx

**Modified:**
- frontend/src/App.tsx (complete refactor with BrowserRouter)
- frontend/src/components/Layout/Layout.tsx (uses Outlet, gets title from route)
- frontend/src/components/Layout/Sidebar.tsx (uses Link, useLocation)
- frontend/src/components/Layout/index.ts (simplified exports)
