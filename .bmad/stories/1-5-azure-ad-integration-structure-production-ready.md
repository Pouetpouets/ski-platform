# Story 1.5: Azure AD Integration Structure (Production Ready)

Status: review

## Story

As a **user**,
I want **to log in with my company Azure AD account**,
So that **I don't need to remember separate credentials (FR1, FR3)**.

## Acceptance Criteria

1. **AC1: Azure AD Redirect**
   - Given AUTH_MODE=azure in environment
   - When an unauthenticated user accesses the app
   - Then they are redirected to Azure AD login page

2. **AC2: Token Processing**
   - Given a user completes Azure AD login
   - When the callback is received
   - Then the backend validates the token
   - And extracts user info (email, name, groups)
   - And determines role from Azure AD groups (FR2)
   - And creates/updates user in database
   - And returns a JWT session token

3. **AC3: JWT Validation**
   - Given a valid JWT token
   - When the user makes API requests
   - Then the token is validated
   - And user info is available in request context
   - And RBAC guards enforce permissions (FR4)

4. **AC4: Session Timeout**
   - Given a session is active
   - When 8 hours pass without activity
   - Then the session expires (NFR - 8 hour timeout)
   - And the user must re-authenticate

## Tasks / Subtasks

- [x] Task 1: Install and Configure Passport.js with Azure AD (AC: #1, #2)
  - [x] 1.1 Install @nestjs/passport, passport, passport-jwt
  - [x] 1.2 Install @nestjs/jwt and passport-jwt
  - [x] 1.3 Install @azure/msal-node for MSAL authentication
  - [x] 1.4 Test: Environment variables are loaded correctly

- [x] Task 2: Create Azure AD Service (AC: #1, #2)
  - [x] 2.1 Create `src/auth/azure-ad.service.ts`
  - [x] 2.2 Configure MSAL ConfidentialClientApplication
  - [x] 2.3 Implement getAuthorizationUrl for OAuth redirect
  - [x] 2.4 Implement handleCallback for token exchange
  - [x] 2.5 Implement determineRoleFromGroups for role mapping

- [x] Task 3: Create JWT Strategy (AC: #3)
  - [x] 3.1 Create `src/auth/strategies/jwt.strategy.ts`
  - [x] 3.2 Configure JWT validation with secret and expiry
  - [x] 3.3 Extract user info from JWT payload
  - [x] 3.4 Test: JWT tokens are validated correctly

- [x] Task 4: Update Auth Service for Azure AD (AC: #2, #4)
  - [x] 4.1 Add generateJwtToken method (8-hour expiry)
  - [x] 4.2 Add verifyJwtToken method
  - [x] 4.3 Add createOrUpdateUserFromAzureAd method
  - [x] 4.4 Test: User is created/updated correctly

- [x] Task 5: Create Auth Controller Endpoints (AC: #1, #2, #4)
  - [x] 5.1 Create GET /api/v1/auth/azure/login - initiates Azure AD flow
  - [x] 5.2 Create GET /api/v1/auth/azure/callback - handles callback
  - [x] 5.3 Create GET /api/v1/auth/logout - logout endpoint
  - [x] 5.4 Create GET /api/v1/auth/config - auth configuration
  - [x] 5.5 Test: Endpoints work correctly

- [x] Task 6: Create Combined Auth Guard (AC: #3)
  - [x] 6.1 Create `src/auth/guards/combined-auth.guard.ts`
  - [x] 6.2 Use mock auth in local mode, JWT in azure mode
  - [x] 6.3 Create `src/auth/guards/roles.guard.ts` for RBAC
  - [x] 6.4 Test: Guard switches based on AUTH_MODE

- [x] Task 7: Frontend Azure AD Integration (AC: #1)
  - [x] 7.1 Install @azure/msal-browser and @azure/msal-react
  - [x] 7.2 Create `src/auth/msalConfig.ts` with Azure AD settings
  - [x] 7.3 Create `src/auth/AuthProvider.tsx` for MSAL wrapper
  - [x] 7.4 Update AuthContext to support JWT tokens and Azure AD login
  - [x] 7.5 Test: Frontend handles auth flow correctly

- [x] Task 8: Update Environment Configuration (AC: #1, #4)
  - [x] 8.1 Update backend .env.example with Azure AD and JWT variables
  - [x] 8.2 Update frontend .env.example with Azure AD client settings
  - [x] 8.3 Add JWT_SECRET to backend .env for local development
  - [x] 8.4 Test: Both mock and Azure AD modes work

## Dev Notes

### Azure AD Configuration
| Variable | Description |
|----------|-------------|
| AZURE_AD_TENANT_ID | Azure AD tenant ID |
| AZURE_AD_CLIENT_ID | Application (client) ID |
| AZURE_AD_CLIENT_SECRET | Client secret for backend |
| JWT_SECRET | Secret for signing JWT tokens |

### Role Mapping from Azure AD Groups
| Azure AD Group | Application Role |
|----------------|------------------|
| Limedia-Admins | admin |
| Limedia-Managers | manager |
| (default) | operator |

### JWT Token Payload
```typescript
interface JwtPayload {
  sub: string;       // User ID
  email: string;
  name: string;
  role: UserRole;
  iat: number;       // Issued at
  exp: number;       // Expires (8 hours)
}
```

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/v1/auth/me | GET | Get current user (requires auth) |
| /api/v1/auth/azure/login | GET | Initiate Azure AD login |
| /api/v1/auth/azure/callback | GET | Handle Azure AD callback |
| /api/v1/auth/logout | GET | Logout user |
| /api/v1/auth/config | GET | Get auth configuration |

### File Structure
```
backend/src/auth/
├── strategies/
│   └── jwt.strategy.ts
├── guards/
│   ├── combined-auth.guard.ts
│   ├── mock-auth.guard.ts
│   └── roles.guard.ts
├── decorators/
│   └── current-user.decorator.ts
├── auth.module.ts
├── auth.service.ts
├── auth.controller.ts
├── azure-ad.service.ts
└── index.ts

frontend/src/auth/
├── msalConfig.ts
├── AuthProvider.tsx
└── index.ts
```

### References
- [Source: architecture.md#Authentication]
- [Source: epics.md#Story 1.5]

---

## Dev Agent Record

### Agent Model Used

Claude Opus 4.5 (claude-opus-4-5-20251101)

### Debug Log References

- Replaced deprecated passport-azure-ad with @azure/msal-node
- Fixed TypeScript errors in msalConfig.ts (removed deprecated options)

### Completion Notes List

- Task 1: Installed @nestjs/passport, passport, passport-jwt, @nestjs/jwt, @azure/msal-node. Replaced deprecated passport-azure-ad.
- Task 2: Created AzureAdService with MSAL ConfidentialClientApplication. Handles authorization URL generation and callback token exchange.
- Task 3: Created JwtStrategy that validates JWT tokens from Authorization header.
- Task 4: Updated AuthService with generateJwtToken (8h expiry), verifyJwtToken, and createOrUpdateUserFromAzureAd methods.
- Task 5: Created endpoints: /azure/login (redirects to Azure AD), /azure/callback (exchanges code for JWT), /logout, /config (returns auth settings).
- Task 6: Created CombinedAuthGuard (uses mock or JWT based on AUTH_MODE) and RolesGuard for RBAC with @Roles decorator.
- Task 7: Installed MSAL packages. Created msalConfig.ts and AuthProvider.tsx. Updated AuthContext with login/logout functions and JWT token handling.
- Task 8: Updated .env.example files with all required Azure AD and JWT variables.

### Change Log

| Date | Change | Files |
|------|--------|-------|
| 2026-01-25 | Create JWT strategy | backend/src/auth/strategies/jwt.strategy.ts |
| 2026-01-25 | Create Azure AD service | backend/src/auth/azure-ad.service.ts |
| 2026-01-25 | Update auth service with JWT | backend/src/auth/auth.service.ts |
| 2026-01-25 | Create combined auth guard | backend/src/auth/guards/combined-auth.guard.ts |
| 2026-01-25 | Create roles guard | backend/src/auth/guards/roles.guard.ts |
| 2026-01-25 | Update auth controller | backend/src/auth/auth.controller.ts |
| 2026-01-25 | Update auth module | backend/src/auth/auth.module.ts |
| 2026-01-25 | Update auth exports | backend/src/auth/index.ts |
| 2026-01-25 | Update backend .env.example | backend/.env.example |
| 2026-01-25 | Add JWT_SECRET to .env | backend/.env |
| 2026-01-25 | Create MSAL config | frontend/src/auth/msalConfig.ts |
| 2026-01-25 | Create Azure auth provider | frontend/src/auth/AuthProvider.tsx |
| 2026-01-25 | Create auth exports | frontend/src/auth/index.ts |
| 2026-01-25 | Update AuthContext | frontend/src/contexts/AuthContext.tsx |
| 2026-01-25 | Update frontend .env.example | frontend/.env.example |

### File List

**Created:**
- backend/src/auth/strategies/jwt.strategy.ts
- backend/src/auth/azure-ad.service.ts
- backend/src/auth/guards/combined-auth.guard.ts
- backend/src/auth/guards/roles.guard.ts
- frontend/src/auth/msalConfig.ts
- frontend/src/auth/AuthProvider.tsx
- frontend/src/auth/index.ts

**Modified:**
- backend/src/auth/auth.service.ts (added JWT methods)
- backend/src/auth/auth.controller.ts (added Azure AD endpoints)
- backend/src/auth/auth.module.ts (added new providers)
- backend/src/auth/index.ts (added new exports)
- backend/.env.example (added Azure AD and JWT variables)
- backend/.env (added JWT_SECRET)
- frontend/src/contexts/AuthContext.tsx (added login/logout/token support)
- frontend/.env.example (added Azure AD variables)
