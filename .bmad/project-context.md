---
project_name: 'Ski Platform'
user_name: 'Pouetpouets'
date: '2026-01-29'
sections_completed: ['technology_stack', 'naming_conventions', 'api_format', 'state_management', 'error_handling', 'testing_rules', 'local_dev', 'anti_patterns']
source_documents:
  - '_bmad-output/planning-artifacts/architecture-ski-platform.md'
  - '_bmad-output/planning-artifacts/prd-ski-platform.md'
  - '_bmad-output/planning-artifacts/ux-design-ski-platform.md'
status: 'complete'
rule_count: 35
optimized_for_llm: true
---

# Project Context for AI Agents - Ski Platform

_This file contains critical rules and patterns that AI agents must follow when implementing code. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

### Frontend
- **Next.js** 15.x (App Router)
- **React** 19.x with TypeScript 5.x (strict mode)
- **Tailwind CSS** v4 with PostCSS
- **shadcn/ui** (Radix UI primitives)
- **Mapbox GL JS** (maps)
- **next-intl** (i18n)

### Backend
- **Supabase** (PostgreSQL + Auth)
- **@supabase/ssr** (SSR auth)
- **Zod** (validation)
- **Resend** (email)

### Hosting
- **Vercel** (deployment + cron jobs)

---

## Critical Implementation Rules

### Naming Conventions

| Layer | Convention | Example |
|-------|------------|---------|
| Database tables | snake_case, plural | `resorts`, `user_preferences` |
| Database columns | snake_case | `snow_depth`, `created_at` |
| JSON/API fields | camelCase | `snowDepth`, `createdAt` |
| React components | PascalCase | `ScoreMarker.tsx` |
| Hooks | camelCase + use | `useResorts.ts` |
| Constants | UPPER_SNAKE_CASE | `DEFAULT_PRIORITIES` |
| URL paths | kebab-case | `/api/resorts` |

### API Response Format

**Server Actions MUST return:**
```typescript
type ActionResult<T> =
  | { data: T; error: null }
  | { data: null; error: { code: string; message: string } };
```

### State Management

- **Server Components** (default) - Fetch data directly, no client state
- **Client Components** - Use `useState` for UI state, `useMemo` for derived values
- **URL State** - Use `searchParams` for shareable/filterable state
- **NEVER** use Redux or global state libraries

### Error Handling

- **Server Actions** - Return structured `{ data, error }` responses
- **Components** - Use `error.tsx` error boundaries
- **User feedback** - Use shadcn/ui toast (`sonner`)
- **NEVER** throw generic `Error` - use typed error codes

### Date/Time

- **Database** - `timestamptz` (stored as UTC)
- **API/JSON** - ISO 8601 strings (`"2026-01-29T10:30:00Z"`)
- **Display** - Localized via `next-intl` formatters

---

## Testing Rules

- **Location** - Co-locate tests with source: `Component.test.tsx`
- **Naming** - `describe` block matches component/function name
- **Utilities** - Shared helpers in `lib/test-utils/`

---

## Local Development Rules

### Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_MAPBOX_TOKEN=
RESEND_API_KEY=
NEXT_PUBLIC_APP_URL=
```

### Supabase Client Creation

**Browser (Client Components):**
```typescript
import { createBrowserClient } from '@supabase/ssr';
```

**Server (Server Components/Actions):**
```typescript
import { createServerClient } from '@supabase/ssr';
```

---

## Anti-Patterns to Avoid

### NEVER Do This

1. **Don't use relative imports beyond one level** - Use `@/` alias
2. **Don't store server data in client state** - Use Server Components
3. **Don't calculate scores server-side** - Keep client-side for <500ms
4. **Don't use Mapbox `[lat, lng]`** - Mapbox uses `[lng, lat]` (reversed!)
5. **Don't hardcode URLs** - Use environment variables
6. **Don't skip TypeScript strict mode** - It's enabled for a reason
7. **Don't create custom CSS classes** - Use Tailwind utilities only
8. **Don't add dependencies without checking** - shadcn/ui covers most UI needs

### Score Calculation (Client-Side Only)

```typescript
const SCORE_WEIGHTS = [0.35, 0.25, 0.20, 0.12, 0.05, 0.03];

function calculateScore(resort: Resort, priorities: string[]): number {
  return priorities.reduce((score, factor, index) =>
    score + (resort.factors[factor] * SCORE_WEIGHTS[index]), 0);
}
```

---

## Quick Reference

| Pattern | Rule |
|---------|------|
| Imports | Use `@/` alias, barrel exports |
| Components | PascalCase files, co-located tests |
| Server vs Client | Server by default, `'use client'` only when needed |
| Auth check | `supabase.auth.getUser()` in Server Components |
| Protected routes | Use `(auth)` route group with layout guard |
| Data fetching | Server Components fetch, pass props down |
| Mutations | Server Actions in `app/actions/` |
| i18n | `useTranslations()` hook from `next-intl` |
