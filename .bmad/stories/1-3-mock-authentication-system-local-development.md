# Story 1.3: Mock Authentication System (Local Development)

Status: review

## Story

As a **developer**,
I want **a mock authentication system for local development**,
So that **I can test all three roles without needing Azure AD access**.

## Acceptance Criteria

1. **AC1: Role Selector in Header**
   - Given AUTH_MODE=local in environment
   - When the application loads
   - Then a role selector dropdown appears in the header
   - And options include Operator, Manager, Administrator

2. **AC2: Auth Context Updates**
   - Given a user selects "Operator" from the role selector
   - When the selection is made
   - Then the AuthContext updates with role="operator"
   - And the UI shows Operator-appropriate navigation
   - And API requests include the mock user token

3. **AC3: Backend Mock Auth**
   - Given AUTH_MODE=local
   - When any API request is made
   - Then the backend reads DEV_USER_ROLE from environment
   - And returns a mock user with that role
   - And RBAC guards enforce permissions based on that role

## Tasks / Subtasks

- [x] Task 1: Create Auth Context (AC: #2)
  - [x] 1.1 Create `src/contexts/AuthContext.tsx` with user state and role
  - [x] 1.2 Define User interface (id, email, name, role)
  - [x] 1.3 Create AuthProvider component wrapping the app
  - [x] 1.4 Create useAuth hook for accessing context
  - [x] 1.5 Test: Context provides user data to components

- [x] Task 2: Implement Role Selector Component (AC: #1)
  - [x] 2.1 Move role selector from App.tsx to dedicated component
  - [x] 2.2 Connect role selector to AuthContext
  - [x] 2.3 Only show selector when AUTH_MODE=local (via env variable)
  - [x] 2.4 Style selector to fit in TopBar
  - [x] 2.5 Test: Role changes update AuthContext

- [x] Task 3: Update Layout to Use AuthContext (AC: #2)
  - [x] 3.1 Update Sidebar to get userRole from AuthContext
  - [x] 3.2 Update App.tsx to use AuthContext instead of local state
  - [x] 3.3 Remove temporary role state from App.tsx
  - [x] 3.4 Test: Navigation updates when role changes

- [x] Task 4: Backend Mock Auth Guard (AC: #3)
  - [x] 4.1 Create `src/auth/auth.module.ts` in backend
  - [x] 4.2 Create mock auth guard that reads DEV_USER_ROLE from env
  - [x] 4.3 Create mock user decorator to inject user into request
  - [x] 4.4 Create `/api/v1/auth/me` endpoint returning mock user
  - [x] 4.5 Test: API returns correct mock user based on DEV_USER_ROLE

- [x] Task 5: Connect Frontend to Backend Auth (AC: #2, #3)
  - [x] 5.1 Create auth API service in frontend
  - [x] 5.2 Fetch user from `/api/v1/auth/me` on app load
  - [x] 5.3 Update AuthContext to sync with backend
  - [x] 5.4 Handle loading state while fetching user
  - [x] 5.5 Test: Frontend displays user from backend

## Dev Notes

### Architecture Requirements
- Use React Context for auth state management
- Backend should read AUTH_MODE and DEV_USER_ROLE from environment
- When AUTH_MODE=local, skip real authentication entirely
- Prepare structure for Azure AD integration (Story 1.5)

### Mock User Data
```typescript
// When DEV_USER_ROLE=operator
{
  id: "mock-operator-id",
  email: "operator@limedia.local",
  name: "Marie Opérateur",
  role: "operator"
}

// When DEV_USER_ROLE=manager
{
  id: "mock-manager-id",
  email: "manager@limedia.local",
  name: "Thomas Manager",
  role: "manager"
}

// When DEV_USER_ROLE=admin
{
  id: "mock-admin-id",
  email: "admin@limedia.local",
  name: "Sophie Admin",
  role: "admin"
}
```

### Environment Variables
```env
# Frontend (.env)
VITE_AUTH_MODE=local

# Backend (.env)
AUTH_MODE=local
DEV_USER_ROLE=operator  # Can be: operator, manager, admin
```

### File Structure
```
frontend/src/
├── contexts/
│   └── AuthContext.tsx
├── components/
│   └── RoleSelector.tsx
└── services/
    └── auth.ts

backend/src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── guards/
│   │   └── mock-auth.guard.ts
│   └── decorators/
│       └── current-user.decorator.ts
```

### References
- [Source: architecture.md#Authentication Strategy]
- [Source: project-context.md#Local Development Rules]

### Anti-Patterns to AVOID
1. **DON'T** implement real Azure AD yet - that's Story 1.5
2. **DON'T** persist auth state to localStorage - keep it in memory for mock
3. **DON'T** create login/logout UI - mock auth is automatic
4. **DON'T** add JWT tokens yet - mock auth uses simple headers

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Fixed TypeScript type imports for verbatimModuleSyntax compatibility
- API tested: GET /api/v1/auth/me returns mock user with correct role

### Completion Notes List

- Task 1: Created AuthContext with useAuth hook, AuthProvider component. Supports mock users for all three roles.
- Task 2: Created RoleSelector component with DEV badge, connected to AuthContext. Only shows when VITE_AUTH_MODE=local.
- Task 3: Updated App.tsx to use AuthContext. Added loading and error states. Sidebar navigation now uses user.role from context.
- Task 4: Created complete auth module for backend: AuthService, AuthController (/api/v1/auth/me), MockAuthGuard, CurrentUser decorator. All exported via index.ts.
- Task 5: Created auth service in frontend (services/auth.ts). AuthContext initialized with mock user. API endpoint tested and working with role override query param.

### Change Log

| Date | Change | Files |
|------|--------|-------|
| 2026-01-25 | Create AuthContext | frontend/src/contexts/AuthContext.tsx |
| 2026-01-25 | Create RoleSelector component | frontend/src/components/RoleSelector.tsx |
| 2026-01-25 | Create auth API service | frontend/src/services/auth.ts |
| 2026-01-25 | Update main.tsx with AuthProvider | frontend/src/main.tsx |
| 2026-01-25 | Update App.tsx to use AuthContext | frontend/src/App.tsx |
| 2026-01-25 | Create backend auth module | backend/src/auth/* |
| 2026-01-25 | Update app.module with AuthModule | backend/src/app.module.ts |
| 2026-01-25 | Create frontend .env | frontend/.env |

### File List

**Created (Frontend):**
- frontend/src/contexts/AuthContext.tsx
- frontend/src/components/RoleSelector.tsx
- frontend/src/services/auth.ts
- frontend/.env

**Created (Backend):**
- backend/src/auth/auth.module.ts
- backend/src/auth/auth.service.ts
- backend/src/auth/auth.controller.ts
- backend/src/auth/guards/mock-auth.guard.ts
- backend/src/auth/decorators/current-user.decorator.ts
- backend/src/auth/index.ts

**Modified:**
- frontend/src/main.tsx (added AuthProvider)
- frontend/src/App.tsx (use AuthContext instead of local state)
- frontend/.env.example (already had correct values)
- backend/src/app.module.ts (added AuthModule import)
