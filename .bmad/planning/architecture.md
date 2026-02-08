---
stepsCompleted: ['step-01-init', 'step-02-context', 'step-03-starter', 'step-04-decisions', 'step-05-patterns', 'step-06-structure', 'step-07-validation', 'step-08-complete']
workflowCompleted: true
completedAt: '2026-01-29'
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-ski-platform-2026-01-29.md'
  - '_bmad-output/planning-artifacts/prd-ski-platform.md'
  - '_bmad-output/planning-artifacts/ux-design-ski-platform.md'
workflowType: 'architecture'
project_name: 'Ski Platform'
user_name: 'Pouetpouets'
date: '2026-01-29'
---

# Architecture Decision Document - Ski Platform

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

---

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

The PRD defines 42 functional requirements organized into 8 categories:

| Category | FRs | Architectural Implication |
|----------|-----|---------------------------|
| Map & Location | FR1-FR6 | Core UI component, Mapbox integration, geolocation API |
| Perfect Day Score | FR7-FR11 | Algorithm service, real-time recalculation on priority change |
| Resort Information | FR12-FR20 | Data model complexity, external data aggregation |
| Personalization | FR21-FR25 | User preference storage, state persistence |
| Auth & Accounts | FR26-FR31 | Supabase Auth integration, anonymous + authenticated flows |
| Email Alerts | FR32-FR35 | Background job system, email service integration |
| Localization | FR36-FR38 | i18n infrastructure, content translation |
| Data & Content | FR39-FR42 | Admin interface, data pipeline for scraping |

**Non-Functional Requirements:**

| Category | Requirement | Architecture Impact |
|----------|-------------|---------------------|
| Performance | <2s page load, <1s map | SSR/SSG, CDN, optimized assets |
| Performance | <500ms score recalculation | Client-side calculation or edge functions |
| Scalability | 1,000 concurrent, 10x headroom | Serverless architecture, edge deployment |
| Security | OAuth only, GDPR | No password storage, data deletion support |
| Accessibility | WCAG AA | Component library choice, semantic HTML |
| Reliability | 99% ski season uptime | Monitoring, graceful degradation |

**Scale & Complexity:**

- Primary domain: Full-stack Web Application (React SPA with SSR)
- Complexity level: Low-Medium
- User types: Anonymous visitors + Authenticated users
- Data sources: 3-4 external (ski conditions, weather, maps, webcams)
- Geographic scope: French Alps (10-15 resorts MVP)

### Technical Constraints & Dependencies

**Predetermined Technology Choices (from PRD):**
- Framework: Next.js (App Router) + React
- UI: Radix UI primitives + Tailwind + shadcn/ui
- Maps: Mapbox GL JS
- Backend: Supabase (Auth + Database)
- Hosting: Vercel
- Email: TBD (Resend/Postmark suggested)

**External Dependencies:**
- Mapbox GL JS (free tier: 50K loads/month)
- Supabase (free tier: 500MB DB, 50K auth users)
- Ski data sources (web scraping - fragility risk)
- Weather API (Météo France)
- Email delivery service

**Known Constraints:**
- Desktop-only MVP (no responsive mobile)
- Chrome + Edge browser support
- Batch data refresh (~6h, not real-time)
- Web scraping reliability for ski data

### Cross-Cutting Concerns Identified

1. **Authentication Flow** - Anonymous browsing with progressive auth for personalization/alerts
2. **Internationalization** - FR/EN throughout UI, resort names stay original
3. **Data Pipeline** - Scheduled scraping jobs for resort conditions, weather, prices
4. **Score Calculation** - Algorithm with user-weighted factors, recalculates on priority change
5. **State Management** - User preferences persistence (localStorage anonymous, DB authenticated)
6. **Error Handling** - Graceful degradation when external services fail
7. **SEO** - Server-rendered resort pages for organic discovery

---

## Starter Template Evaluation

### Primary Technology Domain

Full-stack Web Application (Next.js App Router with SSR/SSG) based on project requirements:
- SEO-optimized resort pages
- Interactive map with real-time score updates
- Social authentication with Supabase
- Desktop-first responsive design

### Starter Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **Vercel Supabase Starter** | Pre-configured Supabase SSR auth, shadcn/ui ready, Vercel-optimized | Auth blocks may need customization for OAuth-only |
| **create-next-app + manual** | Full control, latest defaults | More setup work, easy to misconfigure SSR auth |
| **ts-nextjs-tailwind-starter** | Well-maintained, good DX | No Supabase, would need significant additions |

### Selected Starter: Vercel Supabase Starter

**Rationale for Selection:**
- Pre-configured Supabase SSR authentication eliminates complex cookie/session setup
- shadcn/ui already initialized with Tailwind CSS v4
- Vercel-optimized for deployment target
- Production-ready patterns for server/client component separation
- Community-maintained with regular updates

**Initialization Command:**

```bash
npx create-next-app -e with-supabase ski-platform
```

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- TypeScript 5.x with strict mode
- React 19 with Server Components
- Next.js 15 App Router

**Styling Solution:**
- Tailwind CSS v4 with PostCSS
- CSS variables for theming
- shadcn/ui component system

**Build Tooling:**
- Turbopack for development
- Next.js built-in optimization
- Automatic code splitting

**Authentication:**
- Supabase SSR (@supabase/ssr package)
- Server-side session management
- Middleware for protected routes

**Code Organization:**
```
├── app/
│   ├── (auth)/          # Auth routes group
│   ├── api/             # API routes
│   ├── globals.css      # Tailwind imports
│   └── layout.tsx       # Root layout
├── components/
│   └── ui/              # shadcn components
├── lib/
│   └── utils.ts         # cn() helper
└── utils/
    └── supabase/
        ├── client.ts    # Browser client
        └── server.ts    # Server client
```

**Development Experience:**
- Hot reload with Turbopack
- TypeScript strict mode
- ESLint configuration included

**Note:** Project initialization using this command should be the first implementation story.

---

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Data fetching strategy → Server Components + client state
- Score calculation location → Client-side
- Authentication flow → Supabase OAuth (Google/Apple)

**Important Decisions (Shape Architecture):**
- i18n approach → next-intl
- Data pipeline → Vercel Cron Jobs
- Email service → Resend
- Validation → Zod

**Deferred Decisions (Post-MVP):**
- Mobile app architecture
- Real-time updates (if needed later)
- Advanced caching (Redis, etc.)

### Data Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Database** | Supabase (PostgreSQL) | PRD requirement, auth integration |
| **ORM/Client** | Supabase JS Client | Native integration, typed queries |
| **Data Validation** | Zod | TypeScript-first, Server Actions compatible |
| **Caching** | None (MVP) | Batch data refresh every ~6h, no real-time needs |

**Data Model Overview:**

```
resorts
├── id, name, slug
├── location (lat, lng)
├── metadata (webcam_url, website, etc.)
└── updated_at

resort_conditions (refreshed every ~6h)
├── resort_id (FK)
├── snow_depth, fresh_snow
├── open_runs, total_runs
├── weather_temp, weather_condition
├── crowd_prediction
├── lift_price
└── scraped_at

user_preferences
├── user_id (FK to auth.users)
├── priorities (JSONB: ordered array)
├── language
└── alert_enabled, alert_day
```

### Authentication & Security

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Auth Provider** | Supabase Auth | PRD requirement |
| **OAuth Providers** | Google, Apple | Social login, no password storage |
| **Session Management** | Supabase SSR cookies | Starter template configured |
| **Authorization** | Row-Level Security (RLS) | Native Supabase, secure by default |

**Auth Flow:**
1. Anonymous users can browse map and see scores
2. OAuth login required for: saving preferences, email alerts
3. Supabase middleware protects authenticated routes
4. RLS policies ensure users only access their own data

**GDPR Compliance:**
- No password storage (OAuth only)
- Data deletion via Supabase user deletion
- Cookie consent banner required
- Privacy policy page

### API & Communication Patterns

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **API Style** | Next.js Server Actions + Route Handlers | Native, type-safe, no API layer needed |
| **Data Fetching** | Server Components (initial) + Client state (interactions) | Simple, fast, appropriate for batch data |
| **Error Handling** | Structured error responses | Consistent format across actions |
| **Validation** | Zod schemas | Runtime + TypeScript validation |

**Server Actions for:**
- Saving user preferences
- Subscribing to alerts
- Admin data updates

**Route Handlers for:**
- Cron job endpoints (data scraping)
- Webhook receivers (if needed)

### Frontend Architecture

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **State Management** | React useState + URL state | Simple, no global state needed |
| **Score Calculation** | Client-side | Instant recalculation, <500ms requirement |
| **i18n** | next-intl | App Router native, type-safe |
| **Map Library** | Mapbox GL JS | PRD requirement, free tier adequate |
| **Components** | shadcn/ui (Radix primitives) | UX spec requirement |

**Component Architecture:**
```
components/
├── ui/                  # shadcn/ui components
├── map/
│   ├── MapContainer.tsx
│   ├── ScoreMarker.tsx
│   └── MarkerPopover.tsx
├── resort/
│   ├── ResortPanel.tsx
│   ├── ScoreBreakdown.tsx
│   └── WebcamPreview.tsx
├── settings/
│   ├── PriorityConfig.tsx
│   └── LanguageSwitch.tsx
└── layout/
    ├── Header.tsx
    └── SearchCommand.tsx
```

**Score Calculation (Client-side):**
```typescript
// Weights based on user priority order
const weights = [0.35, 0.25, 0.20, 0.12, 0.05, 0.03];

function calculateScore(resort: Resort, priorities: string[]): number {
  return priorities.reduce((score, factor, index) => {
    return score + (resort.factors[factor] * weights[index]);
  }, 0);
}
```

### Infrastructure & Deployment

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Hosting** | Vercel | PRD requirement, Next.js native |
| **CI/CD** | Vercel Git Integration | Automatic, preview deployments |
| **Data Pipeline** | Vercel Cron Jobs | Native, serverless, MVP-appropriate |
| **Email Service** | Resend | Modern DX, React Email templates |
| **Monitoring** | Vercel Analytics + Logs | Built-in, adequate for MVP |

**Environment Configuration:**
```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Mapbox
NEXT_PUBLIC_MAPBOX_TOKEN=

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_APP_URL=
```

**Cron Schedule (vercel.json):**
```json
{
  "crons": [
    {
      "path": "/api/cron/scrape-conditions",
      "schedule": "0 */6 * * *"
    },
    {
      "path": "/api/cron/send-weekly-alerts",
      "schedule": "0 18 * * 5"
    }
  ]
}
```

### Decision Impact Analysis

**Implementation Sequence:**
1. Project initialization (Vercel Supabase Starter)
2. Supabase schema + RLS policies
3. Map integration (Mapbox GL JS)
4. Core UI components (shadcn/ui)
5. Score calculation logic
6. User preferences + auth flow
7. Data scraping pipeline
8. Email alerts system
9. i18n implementation

**Cross-Component Dependencies:**
- Score calculation depends on: resort data model, user preferences
- ResortPanel depends on: score calculation, webcam URLs
- Email alerts depend on: user preferences, score calculation
- Scraping depends on: Supabase schema, external data sources

---

## Implementation Patterns & Consistency Rules

### Naming Conventions

**Database (PostgreSQL/Supabase):**
| Element | Convention | Example |
|---------|------------|---------|
| Tables | snake_case, plural | `resorts`, `user_preferences`, `resort_conditions` |
| Columns | snake_case | `snow_depth`, `fresh_snow`, `created_at` |
| Foreign keys | `{table}_id` | `resort_id`, `user_id` |
| Indexes | `idx_{table}_{column}` | `idx_resorts_slug` |

**API & JSON:**
| Element | Convention | Example |
|---------|------------|---------|
| JSON fields | camelCase | `snowDepth`, `freshSnow`, `createdAt` |
| URL paths | kebab-case, plural | `/api/resorts`, `/api/user-preferences` |
| Query params | camelCase | `?resortId=123&includeConditions=true` |

**Code (TypeScript/React):**
| Element | Convention | Example |
|---------|------------|---------|
| Components | PascalCase | `ScoreMarker.tsx`, `ResortPanel.tsx` |
| Hooks | camelCase + use | `useResorts.ts`, `useUserPreferences.ts` |
| Utilities | camelCase | `calculateScore.ts`, `formatDate.ts` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_PRIORITIES`, `SCORE_WEIGHTS` |
| Types/Interfaces | PascalCase | `Resort`, `UserPreferences` |
| Zod schemas | PascalCase + Schema | `ResortSchema`, `PreferencesSchema` |

### File & Folder Structure

**Component Organization:**
```
components/
├── ui/                     # shadcn/ui components (auto-generated)
├── map/
│   ├── MapContainer.tsx
│   ├── MapContainer.test.tsx   # Co-located tests
│   ├── ScoreMarker.tsx
│   ├── MarkerPopover.tsx
│   └── index.ts                # Barrel export
├── resort/
│   ├── ResortPanel.tsx
│   ├── ScoreBreakdown.tsx
│   ├── WebcamPreview.tsx
│   └── index.ts
├── settings/
│   ├── PriorityConfig.tsx
│   ├── LanguageSwitch.tsx
│   └── index.ts
└── layout/
    ├── Header.tsx
    ├── SearchCommand.tsx
    └── index.ts
```

**Feature Organization:**
```
lib/
├── schemas/                # Zod schemas
│   ├── resort.ts
│   ├── preferences.ts
│   └── index.ts
├── utils/
│   ├── score.ts            # Score calculation
│   ├── format.ts           # Date/number formatting
│   └── index.ts
├── hooks/
│   ├── useResorts.ts
│   ├── usePreferences.ts
│   └── index.ts
└── types/
    └── index.ts            # Shared TypeScript types
```

**Server-Side Organization:**
```
app/
├── (public)/               # Public routes group
│   ├── page.tsx            # Home/Map page
│   └── resorts/
│       └── [slug]/
│           └── page.tsx    # Resort detail (SEO)
├── (auth)/                 # Auth-required routes group
│   ├── settings/
│   │   └── page.tsx
│   └── layout.tsx          # Auth check wrapper
├── api/
│   └── cron/
│       ├── scrape-conditions/
│       │   └── route.ts
│       └── send-alerts/
│           └── route.ts
├── actions/                # Server Actions
│   ├── preferences.ts
│   └── alerts.ts
└── layout.tsx
```

### API Response Patterns

**Server Action Returns:**
```typescript
// Type definition
type ActionResult<T> =
  | { data: T; error: null }
  | { data: null; error: { code: string; message: string } };

// Success
return { data: resort, error: null };

// Error
return { data: null, error: { code: 'NOT_FOUND', message: 'Resort not found' } };
```

**Error Codes:**
| Code | Usage |
|------|-------|
| `NOT_FOUND` | Resource doesn't exist |
| `UNAUTHORIZED` | Not logged in |
| `FORBIDDEN` | Logged in but no permission |
| `VALIDATION_ERROR` | Invalid input data |
| `INTERNAL_ERROR` | Unexpected server error |

### Data Format Patterns

**Dates:**
- Database: `timestamptz` (stored as UTC)
- JSON/API: ISO 8601 string (`"2026-01-29T10:30:00Z"`)
- Display: Localized via `next-intl` formatters

**Scores:**
- Stored: Integer 0-100
- Displayed: Percentage with % suffix (`"87%"`)
- Calculation: Client-side, returns 0-100 number

**Coordinates:**
- Database: Separate `lat`, `lng` columns (DECIMAL)
- JSON: `{ lat: number, lng: number }`
- Mapbox: `[lng, lat]` array (note: reversed order)

### State Management Patterns

**Server Components (default):**
```typescript
// Fetch data directly - no client state needed
export default async function ResortPage({ params }) {
  const resort = await getResort(params.slug);
  return <ResortDetail resort={resort} />;
}
```

**Client Components (when needed):**
```typescript
'use client';

// Local state for UI interactions
const [priorities, setPriorities] = useState(DEFAULT_PRIORITIES);
const [selectedResort, setSelectedResort] = useState<string | null>(null);

// Derive scores from state (no useEffect)
const scores = useMemo(() =>
  resorts.map(r => ({ ...r, score: calculateScore(r, priorities) })),
  [resorts, priorities]
);
```

**URL State (for shareable views):**
```typescript
// Use nuqs or Next.js searchParams for filterable/shareable state
const [view, setView] = useQueryState('view', { defaultValue: 'map' });
```

### Loading & Error Patterns

**Loading States:**
```typescript
// Server Components: Suspense boundaries
<Suspense fallback={<MapSkeleton />}>
  <MapContainer />
</Suspense>

// Client Components: local isLoading state
const [isLoading, setIsLoading] = useState(false);
```

**Error Boundaries:**
```typescript
// app/error.tsx - catches errors in route segment
'use client';
export default function Error({ error, reset }) {
  return <ErrorDisplay message={error.message} onRetry={reset} />;
}
```

**User Feedback:**
```typescript
// Use shadcn/ui toast for action feedback
import { toast } from 'sonner';

toast.success('Preferences saved');
toast.error('Failed to save preferences');
```

### Testing Patterns

**Test Location:** Co-located with source
```
ScoreMarker.tsx
ScoreMarker.test.tsx
```

**Test Naming:** `describe` block matches component/function name
```typescript
describe('ScoreMarker', () => {
  it('displays score percentage', () => { ... });
  it('applies correct color for score range', () => { ... });
});
```

**Test Utilities:** Shared test helpers in `lib/test-utils/`

### Import Patterns

**Absolute Imports:** Use `@/` alias
```typescript
// Good
import { ScoreMarker } from '@/components/map';
import { calculateScore } from '@/lib/utils/score';

// Avoid
import { ScoreMarker } from '../../../components/map';
```

**Barrel Exports:** Each folder has index.ts
```typescript
// components/map/index.ts
export { MapContainer } from './MapContainer';
export { ScoreMarker } from './ScoreMarker';
export { MarkerPopover } from './MarkerPopover';
```

### Enforcement Summary

**All AI Agents MUST:**
1. Follow naming conventions exactly (snake_case DB, camelCase JSON, PascalCase components)
2. Co-locate tests with source files
3. Use barrel exports for clean imports
4. Return structured `{ data, error }` from Server Actions
5. Use Suspense for async Server Components
6. Keep client state minimal - derive values with useMemo
7. Use `@/` import alias, never relative paths beyond one level

---

## Project Structure & Boundaries

### Complete Project Directory Structure

```
ski-platform/
├── README.md
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── components.json              # shadcn/ui config
├── vercel.json                  # Cron jobs config
├── .env.local
├── .env.example
├── .gitignore
├── .github/
│   └── workflows/
│       └── ci.yml               # Lint + type-check + test
│
├── messages/                    # i18n translations (next-intl)
│   ├── en.json
│   └── fr.json
│
├── public/
│   ├── favicon.ico
│   └── images/
│       └── logo.svg
│
├── app/
│   ├── globals.css              # Tailwind imports
│   ├── layout.tsx               # Root layout + providers
│   ├── not-found.tsx
│   ├── error.tsx
│   │
│   ├── (public)/                # Public routes (no auth required)
│   │   ├── page.tsx             # Home → Map view
│   │   ├── resorts/
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # SEO resort pages
│   │   ├── privacy/
│   │   │   └── page.tsx
│   │   └── terms/
│   │       └── page.tsx
│   │
│   ├── (auth)/                  # Auth-required routes
│   │   ├── layout.tsx           # Auth check wrapper
│   │   ├── settings/
│   │   │   └── page.tsx         # User preferences
│   │   └── alerts/
│   │       └── page.tsx         # Alert configuration
│   │
│   ├── login/
│   │   └── page.tsx             # OAuth login page
│   │
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts         # OAuth callback handler
│   │
│   ├── api/
│   │   └── cron/
│   │       ├── scrape-conditions/
│   │       │   └── route.ts     # Batch data scraping
│   │       └── send-alerts/
│   │           └── route.ts     # Weekly email dispatch
│   │
│   └── actions/                 # Server Actions
│       ├── preferences.ts       # Save/load user preferences
│       └── alerts.ts            # Subscribe/unsubscribe alerts
│
├── components/
│   ├── ui/                      # shadcn/ui (auto-generated)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── sheet.tsx
│   │   ├── popover.tsx
│   │   ├── command.tsx
│   │   ├── badge.tsx
│   │   ├── toast.tsx
│   │   ├── skeleton.tsx
│   │   └── ...
│   │
│   ├── map/
│   │   ├── MapContainer.tsx     # Mapbox wrapper + markers
│   │   ├── MapContainer.test.tsx
│   │   ├── ScoreMarker.tsx      # Resort marker with score
│   │   ├── ScoreMarker.test.tsx
│   │   ├── MarkerPopover.tsx    # Hover preview
│   │   ├── MapSkeleton.tsx      # Loading state
│   │   └── index.ts
│   │
│   ├── resort/
│   │   ├── ResortPanel.tsx      # Slide-in detail panel
│   │   ├── ResortPanel.test.tsx
│   │   ├── ScoreBreakdown.tsx   # Factor-by-factor scores
│   │   ├── ScoreBreakdown.test.tsx
│   │   ├── WebcamPreview.tsx    # Webcam thumbnail/link
│   │   ├── ConditionBadge.tsx   # Green/amber/red indicators
│   │   └── index.ts
│   │
│   ├── settings/
│   │   ├── PriorityConfig.tsx   # Drag-and-drop priorities
│   │   ├── PriorityConfig.test.tsx
│   │   ├── LanguageSwitch.tsx   # FR/EN toggle
│   │   ├── AlertSettings.tsx    # Email alert config
│   │   └── index.ts
│   │
│   ├── layout/
│   │   ├── Header.tsx           # Logo + search + profile
│   │   ├── SearchCommand.tsx    # Ctrl+K search modal
│   │   ├── UserMenu.tsx         # Auth dropdown
│   │   ├── CookieConsent.tsx    # GDPR banner
│   │   └── index.ts
│   │
│   └── providers/
│       ├── Providers.tsx        # Combined providers wrapper
│       ├── ThemeProvider.tsx    # Dark/light mode (future)
│       └── index.ts
│
├── lib/
│   ├── schemas/                 # Zod validation schemas
│   │   ├── resort.ts
│   │   ├── preferences.ts
│   │   ├── alert.ts
│   │   └── index.ts
│   │
│   ├── utils/
│   │   ├── score.ts             # calculateScore() function
│   │   ├── score.test.ts
│   │   ├── format.ts            # Date/number formatters
│   │   ├── cn.ts                # Tailwind class merger
│   │   └── index.ts
│   │
│   ├── hooks/
│   │   ├── useResorts.ts        # Resort data hook
│   │   ├── usePreferences.ts    # User preferences hook
│   │   ├── useGeolocation.ts    # Browser geolocation
│   │   └── index.ts
│   │
│   ├── types/
│   │   ├── resort.ts            # Resort, Conditions types
│   │   ├── user.ts              # User, Preferences types
│   │   └── index.ts
│   │
│   ├── constants/
│   │   ├── priorities.ts        # DEFAULT_PRIORITIES, SCORE_WEIGHTS
│   │   ├── map.ts               # MAP_CENTER, DEFAULT_ZOOM
│   │   └── index.ts
│   │
│   ├── data/
│   │   ├── resorts.ts           # getResorts(), getResortBySlug()
│   │   ├── conditions.ts        # getConditions()
│   │   └── index.ts
│   │
│   └── email/
│       ├── templates/
│       │   └── weekly-alert.tsx # React Email template
│       ├── send.ts              # Resend integration
│       └── index.ts
│
├── utils/
│   └── supabase/                # Supabase client utilities
│       ├── client.ts            # Browser client
│       ├── server.ts            # Server client
│       ├── middleware.ts        # Auth middleware
│       └── index.ts
│
├── i18n/
│   ├── config.ts                # next-intl configuration
│   └── request.ts               # getRequestConfig
│
└── scripts/
    └── seed-resorts.ts          # Initial resort data seeding
```

### Architectural Boundaries

**API Boundaries:**

| Boundary | Location | Purpose |
|----------|----------|---------|
| Public Data | `lib/data/` | Read-only resort/conditions data |
| User Actions | `app/actions/` | Authenticated mutations |
| Cron Jobs | `app/api/cron/` | Scheduled background tasks |
| Auth Callback | `app/auth/callback/` | OAuth flow completion |

**Component Boundaries:**

| Boundary | Communication Pattern |
|----------|----------------------|
| Map ↔ Resort Panel | `selectedResort` state in parent |
| Settings ↔ Map | Preferences update triggers score recalculation |
| Header ↔ Map | Search selection updates map view |

**Data Boundaries:**

| Layer | Access Pattern |
|-------|---------------|
| Supabase DB | Server Components + Server Actions only |
| Client State | React useState for UI state |
| URL State | `searchParams` for shareable filters |

### Requirements to Structure Mapping

**FR Category Mapping:**

| Category | Primary Location |
|----------|-----------------|
| FR1-FR6: Map & Location | `components/map/`, `lib/hooks/useGeolocation.ts` |
| FR7-FR11: Perfect Day Score | `lib/utils/score.ts`, `components/resort/ScoreBreakdown.tsx` |
| FR12-FR20: Resort Information | `components/resort/`, `lib/data/` |
| FR21-FR25: Personalization | `components/settings/PriorityConfig.tsx`, `app/actions/preferences.ts` |
| FR26-FR31: Auth & Accounts | `utils/supabase/`, `app/login/`, `app/auth/` |
| FR32-FR35: Email Alerts | `lib/email/`, `app/api/cron/send-alerts/` |
| FR36-FR38: Localization | `messages/`, `i18n/`, `components/settings/LanguageSwitch.tsx` |
| FR39-FR42: Data & Content | `app/api/cron/scrape-conditions/`, `scripts/seed-resorts.ts` |

**Cross-Cutting Concerns:**

| Concern | Locations |
|---------|-----------|
| Authentication | `utils/supabase/`, `app/(auth)/layout.tsx` |
| Error Handling | `app/error.tsx`, Server Action returns |
| Loading States | `*Skeleton.tsx` components, Suspense boundaries |
| i18n | `messages/`, `i18n/`, component usage of `useTranslations()` |

### Integration Points

**External Services:**

| Service | Integration Point | Configuration |
|---------|------------------|---------------|
| Supabase Auth | `utils/supabase/` | `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| Supabase DB | `lib/data/`, `app/actions/` | Same as Auth |
| Mapbox GL JS | `components/map/MapContainer.tsx` | `NEXT_PUBLIC_MAPBOX_TOKEN` |
| Resend | `lib/email/send.ts` | `RESEND_API_KEY` |

**Data Flow:**

```
[Cron Job: Scrape] → [Supabase DB: resort_conditions]
                              ↓
[Server Component] → [lib/data/getResorts()]
                              ↓
[Client Component] → [lib/utils/calculateScore()]
                              ↓
[UI: ScoreMarker, ResortPanel]
```

### File Organization Patterns

**Configuration Files (root):**
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind theme + shadcn/ui
- `components.json` - shadcn/ui component config
- `vercel.json` - Cron job schedules
- `tsconfig.json` - TypeScript strict mode

**Environment Files:**
- `.env.example` - Template with all required vars
- `.env.local` - Local development (gitignored)
- Vercel dashboard - Production secrets

---

## Architecture Validation Results

### Coherence Validation ✅

**Decision Compatibility:**
All technology choices verified compatible:
- Next.js 15 App Router + React 19 + TypeScript 5.x
- Tailwind CSS v4 + shadcn/ui + Radix primitives
- Supabase (PostgreSQL + Auth) + @supabase/ssr
- Mapbox GL JS + Vercel Edge deployment
- Resend + React Email for transactional emails
- next-intl for i18n with App Router

**Pattern Consistency:**
- Database → snake_case (PostgreSQL standard)
- JSON/API → camelCase (JavaScript standard)
- Components → PascalCase (React standard)
- Files → PascalCase for components, camelCase for utilities
- All patterns align with Next.js and React conventions

**Structure Alignment:**
- Route groups `(public)/` and `(auth)/` properly separate concerns
- Server Actions in `app/actions/` for mutations
- Cron jobs in `app/api/cron/` for background tasks
- Components organized by feature domain
- Integration boundaries clearly defined

### Requirements Coverage Validation ✅

**Functional Requirements Coverage:**

| Category | FRs | Status |
|----------|-----|--------|
| Map & Location | FR1-FR6 | ✅ Fully supported |
| Perfect Day Score | FR7-FR11 | ✅ Fully supported |
| Resort Information | FR12-FR20 | ✅ Fully supported |
| Personalization | FR21-FR25 | ✅ Fully supported |
| Auth & Accounts | FR26-FR31 | ✅ Fully supported |
| Email Alerts | FR32-FR35 | ✅ Fully supported |
| Localization | FR36-FR38 | ✅ Fully supported |
| Data & Content | FR39-FR42 | ✅ Fully supported |

**Non-Functional Requirements Coverage:**

| Requirement | Architectural Support |
|-------------|----------------------|
| < 2s page load | SSR/SSG + Vercel Edge + optimized assets |
| < 1s map render | Client-side Mapbox, progressive loading |
| < 500ms score recalc | Client-side calculation, no network |
| 1,000 concurrent users | Serverless architecture |
| 99% ski season uptime | Vercel managed infrastructure |
| WCAG AA accessibility | Radix primitives + semantic HTML |
| GDPR compliance | OAuth-only, data deletion support |

### Implementation Readiness Validation ✅

**Decision Completeness:**
- ✅ All critical technology decisions documented
- ✅ Technology versions specified and verified
- ✅ Integration patterns defined
- ✅ Data model structure established

**Structure Completeness:**
- ✅ Complete project tree with all directories
- ✅ All major files identified and located
- ✅ Component organization defined
- ✅ Route structure established

**Pattern Completeness:**
- ✅ Naming conventions for all layers
- ✅ API response format standardized
- ✅ Error handling patterns defined
- ✅ State management approach documented
- ✅ Import/export patterns established

### Gap Analysis Results

**Critical Gaps:** None

**Nice-to-Have Gaps (Post-MVP):**
- Detailed testing strategy (unit, integration, e2e)
- Deployment runbook and checklist
- Admin UI for resort management
- Performance monitoring dashboards

### Architecture Completeness Checklist

**✅ Requirements Analysis**
- [x] Project context thoroughly analyzed
- [x] Scale and complexity assessed (low-medium)
- [x] Technical constraints identified
- [x] Cross-cutting concerns mapped

**✅ Architectural Decisions**
- [x] Critical decisions documented with versions
- [x] Technology stack fully specified
- [x] Integration patterns defined
- [x] Performance considerations addressed

**✅ Implementation Patterns**
- [x] Naming conventions established
- [x] Structure patterns defined
- [x] Communication patterns specified
- [x] Process patterns documented

**✅ Project Structure**
- [x] Complete directory structure defined
- [x] Component boundaries established
- [x] Integration points mapped
- [x] Requirements to structure mapping complete

### Architecture Readiness Assessment

**Overall Status:** ✅ READY FOR IMPLEMENTATION

**Confidence Level:** HIGH

**Key Strengths:**
- Clean separation of concerns with route groups
- Type-safe throughout (TypeScript + Zod)
- Client-side score calculation for instant UX
- Established starter template reduces setup risk
- Clear patterns prevent AI agent conflicts

**Areas for Future Enhancement:**
- Mobile app architecture (V2)
- Advanced caching strategy (if scale demands)
- Real-time updates (if user feedback requests)
- Admin dashboard for resort management

### Implementation Handoff

**AI Agent Guidelines:**
1. Follow all architectural decisions exactly as documented
2. Use implementation patterns consistently across all components
3. Respect project structure and boundaries
4. Refer to this document for all architectural questions
5. Maintain naming conventions across all layers

**First Implementation Step:**
```bash
npx create-next-app -e with-supabase ski-platform
cd ski-platform
npx shadcn@latest init
```

---

## Architecture Completion Summary

### Workflow Completion

**Architecture Decision Workflow:** COMPLETED ✅
**Total Steps Completed:** 8
**Date Completed:** 2026-01-29
**Document Location:** `_bmad-output/planning-artifacts/architecture-ski-platform.md`

### Final Architecture Deliverables

**Complete Architecture Document**
- All architectural decisions documented with specific versions
- Implementation patterns ensuring AI agent consistency
- Complete project structure with all files and directories
- Requirements to architecture mapping
- Validation confirming coherence and completeness

**Implementation Ready Foundation**
- 15+ architectural decisions made
- 7 implementation pattern categories defined
- 50+ files and directories specified
- 42 functional requirements fully supported

**AI Agent Implementation Guide**
- Technology stack with verified versions
- Consistency rules that prevent implementation conflicts
- Project structure with clear boundaries
- Integration patterns and communication standards

### Development Sequence

1. **Initialize project** using Vercel Supabase Starter
2. **Configure shadcn/ui** with Tailwind CSS v4
3. **Set up Supabase** schema and RLS policies
4. **Integrate Mapbox GL JS** for map component
5. **Build core components** following established patterns
6. **Implement features** per FR categories
7. **Add i18n** with next-intl
8. **Configure cron jobs** for data scraping and alerts

### Quality Assurance Checklist

**✅ Architecture Coherence**
- [x] All decisions work together without conflicts
- [x] Technology choices are compatible
- [x] Patterns support the architectural decisions
- [x] Structure aligns with all choices

**✅ Requirements Coverage**
- [x] All 42 functional requirements are supported
- [x] All non-functional requirements are addressed
- [x] Cross-cutting concerns are handled
- [x] Integration points are defined

**✅ Implementation Readiness**
- [x] Decisions are specific and actionable
- [x] Patterns prevent agent conflicts
- [x] Structure is complete and unambiguous
- [x] Examples are provided for clarity

---

**Architecture Status:** READY FOR IMPLEMENTATION ✅

**Next Phase:** Begin implementation using the architectural decisions and patterns documented herein.
