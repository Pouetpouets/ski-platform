---
stepsCompleted: ['step-01-init', 'step-02-discovery', 'step-03-success', 'step-04-journeys', 'step-05-domain', 'step-06-innovation', 'step-07-project-type', 'step-08-scoping', 'step-09-functional', 'step-10-nonfunctional', 'step-11-polish', 'step-12-complete']
workflowCompleted: true
completedAt: '2026-01-29'
inputDocuments:
  - '_bmad-output/planning-artifacts/product-brief-ski-platform-2026-01-29.md'
  - '_bmad-output/analysis/brainstorming-session-2026-01-29.md'
workflowType: 'prd'
documentCounts:
  briefs: 1
  research: 0
  brainstorming: 1
  projectDocs: 0
classification:
  projectType: 'Web App (React SPA)'
  domain: 'Recreation/Tourism'
  complexity: 'low-medium'
  projectContext: 'greenfield'
  frontend: 'Next.js + React + Radix UI + CSS Modules'
  hosting: 'Vercel'
  backend: 'Supabase'
  auth: 'Supabase Auth (Google/Apple social login)'
  database: 'Supabase (Postgres)'
  maps: 'Mapbox GL JS'
  timeline: 'MVP ASAP'
---

# Product Requirements Document - Ski Platform

**Author:** Pouetpouets
**Date:** 2026-01-29

## Executive Summary

**Ski Platform** is a decision-support web application for skiers facing "where should I ski today?" paralysis. Instead of checking 5+ websites and doing mental analysis, users see a Google Maps-style interface with nearby resorts displaying a **Perfect Day Score** - one percentage that captures snow quality, crowd levels, weather, and more, weighted by each user's priorities.

**Key Differentiator:** Decision engine, not data dump. We recommend, we don't just inform.

**Target Users:** Skiers within 2 hours of French Alps resorts (Lyon, Grenoble, Annecy, Geneva region) who ski 8-25+ days per season.

**MVP Scope:** Desktop web app, 10-15 French Alps resorts, social login for email collection, weekly alerts.

**Tech Stack:** Next.js + React + Radix UI + CSS Modules + Mapbox GL JS + Supabase + Vercel

**Success Metric:** 1,000 visits in month 1 validates MVP. Ultimate success: user thinks "That was an amazing ski day" after following a recommendation.

---

## Success Criteria

### User Success

| Metric | Target | How We Know |
|--------|--------|-------------|
| **Decision Speed** | < 2 minutes from open to decision | User can see score, compare, check webcam quickly |
| **Return Usage** | Multiple visits per month during season | Users come back - it's their go-to tool |
| **Priority Engagement** | >20% configure priorities | Users trust and personalize the system |
| **Discovery Effect** | Users try new resorts | Qualitative feedback: "I found a new favorite" |

**Ultimate Success:** User thinks "That was an amazing ski day" after following a recommendation.

### Business Success

| Timeframe | Target | Validation |
|-----------|--------|------------|
| **Month 1** | 1,000 visits | Traction proof - people are interested |
| **Month 3** | Growing MAU + retention | Product-market fit signal |
| **Month 6** | Sustainable growth + email list | Ready for monetization experiments |

### Technical Success

| Metric | Target | Rationale |
|--------|--------|-----------|
| **Page Load** | < 2 seconds | Fast = trustworthy, users won't wait |
| **Map Render** | < 1 second | Core UX must be instant |
| **Data Freshness** | Updated daily minimum | Ski conditions change, stale data = bad recommendations |
| **Uptime** | 99% during ski season | Must work when people need it (weekends, mornings) |

### Measurable Outcomes

- 1,000 visits in first month = MVP validated
- Users return multiple times = product is useful
- Low bounce rate on map page = UX works
- Email signups growing = engagement funnel working

## Product Scope

### MVP Summary

Core capabilities for launch: Map with Perfect Day Score, resort detail cards, webcam links, priority configuration, social login, weekly email alerts, French Alps coverage (10-15 resorts), multi-language (FR/EN).

*See [Project Scoping & Phased Development](#project-scoping--phased-development) for detailed feature breakdown and justifications.*

### Roadmap Overview

| Phase | Focus |
|-------|-------|
| **MVP** | Core decision flow - map, scores, cards, priorities, alerts |
| **Growth** | Comparison view, affiliate deals, Pyrénées expansion, implicit learning |
| **Vision** | Mobile app, historical insights, Europe-wide, season pass advisor |

---

## User Journeys

### Journey 1: Lucas Discovers His Perfect Day (First Use)

**Opening Scene:**
Lucas, 32, sits in his Lyon apartment on a Friday evening. He's checking the weather for tomorrow - looks like fresh snow in the Alps. He usually goes to La Clusaz because he knows it, but he wonders if somewhere else might be better. He opens 5 browser tabs: Skiinfo, Météo France, three resort websites. 20 minutes later, he's frustrated and just picks La Clusaz again.

**Rising Action:**
A friend mentions Ski Platform. Lucas opens it on his laptop. GPS permission requested - he accepts. Instantly, a map appears centered on Lyon. Three resorts glow with scores: Les Arcs 94%, La Clusaz 78%, Megève 71%.

He didn't know Les Arcs had fresh powder. He clicks it - a card slides up. Snow: 45cm fresh. Crowds: Low (weekday pattern). Weather: Sunny morning. Price: €47. All green indicators.

He taps "See webcam" - blue skies, fresh tracks visible.

**Climax:**
Lucas books nothing, downloads nothing, creates no account. In 90 seconds, he knows where he's going tomorrow. Les Arcs. He's never been.

**Resolution:**
Saturday evening. Lucas is back home, tired and happy. 15cm of fresh powder, no lift queues, sunshine until 2pm. He opens Ski Platform again and signs in with Google. He wants those weekly alerts now. He configures his priorities: Snow > Weather > Crowds. He found his new tool.

---

### Journey 2: Sophie Plans the Family Weekend

**Opening Scene:**
Sophie, 41, manages a household in Grenoble. It's Thursday night. The kids have been asking to ski this weekend. Her husband asks: "Where should we go?" Sophie sighs. Last time she spent 45 minutes comparing prices across websites, and they still ended up at their usual spot.

**Rising Action:**
She remembers a colleague mentioned Ski Platform. She opens it. Map loads - Grenoble is surrounded by options. She doesn't care about powder - she needs value. She clicks the settings icon, drags "Price" to the top of her priorities. The scores recalculate instantly.

Chamrousse jumps to 91%. Close (30 min), €38 adult pass, kids ski free this weekend (promo). She didn't know about that promo.

**Climax:**
Sophie clicks Chamrousse. Conditions: good. Parking: free before 9am. Weather: partly cloudy but no rain. She checks the webcam - families visible, not too crowded. Decision made in 3 minutes.

**Resolution:**
Sunday evening. The kids are exhausted and happy. Sophie saved €40 compared to their usual resort. She signs up for weekly alerts - "Tell me about family deals every Friday."

---

### Journey 3: Marc's Morning Ritual

**Opening Scene:**
Marc, 45, has a flexible work schedule and skis 25+ days per season. He hates crowds - nothing ruins a ski day like 15-minute lift queues. It's Tuesday morning, 7am. He checks Ski Platform with his coffee.

**Rising Action:**
His priorities are already set: Crowds > Snow > Weather. The map shows his area around Annecy. Grand-Bornand: 88%. La Clusaz: 62% (school holiday crowd predicted). Megève: 71%.

He clicks Grand-Bornand. Crowd prediction: Low (Tuesday + no holiday). Snow: 30cm base, groomed. Weather: overcast but dry. Parking: plenty available.

**Climax:**
Marc checks the webcam at 7:15am. Empty parking lot. He grabs his gear and leaves by 7:30.

**Resolution:**
Marc skis until 1pm. Nearly empty slopes all morning. He's home by 3pm. This is his third "perfect quiet day" this month, all from Ski Platform recommendations. He's stopped checking other sites entirely.

---

### Journey 4: New User Configures Priorities

**Opening Scene:**
A new user lands on Ski Platform. They see the map, they see scores, but the recommendations don't quite match what they care about. They notice a "Configure" button.

**Rising Action:**
They click Configure. A simple interface appears:

```
Drag to reorder your priorities:
≡ 1. Snow quality
≡ 2. Crowd level
≡ 3. Weather/sun
≡ 4. Price
≡ 5. Distance
≡ 6. Parking
```

They're budget-conscious. They drag Price to position 1. Distance to position 2. The preview updates - different resorts now have higher scores.

**Climax:**
They hit Save. The map recalculates. A cheaper, closer resort they'd never considered is now showing 92%.

**Resolution:**
The system remembers their preferences. Every visit, every weekly email, reflects their priorities. No re-configuration needed.

---

### Journey Requirements Summary

| Journey | Capabilities Revealed |
|---------|----------------------|
| Lucas - First Use | GPS detection, map display, Perfect Day Score, resort cards, webcam links, social login, weekly alert signup |
| Sophie - Weekend | Priority configuration, score recalculation, promo/deal visibility, family-relevant info |
| Marc - Morning | Crowd predictions, real-time conditions, quick decision support, habitual use pattern |
| Priority Setup | Drag-and-drop configuration, instant score recalculation, preference persistence |

**Core Capabilities Needed:**
- Map with user location + resort markers
- Perfect Day Score calculation and display
- Resort detail cards with all factors
- Priority configuration (drag-and-drop)
- Webcam integration (links or embeds)
- Social login (Google/Apple)
- Weekly email alert system
- Crowd prediction logic

---

## Web App Specific Requirements

### Project-Type Overview

Ski Platform is a **React Single Page Application (SPA)** built with Next.js, optimized for desktop users making ski decisions. SEO is important for organic discovery.

### Technical Architecture Considerations

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Architecture** | SPA with SSR/SSG | SEO requires server-rendered content |
| **Framework** | Next.js + React | Best of both: SPA UX + SEO capabilities |
| **UI Components** | Radix UI | Accessible primitives, unstyled, composable |
| **Styling** | CSS Modules | Clean, scoped CSS, no code pollution |
| **Maps** | Mapbox GL JS | Better free tier, custom styling, performant |
| **Hosting** | Vercel | Native Next.js support, edge functions |
| **Backend** | Supabase | Auth, database, serverless functions |

### Browser Support

| Browser | Version | Support Level |
|---------|---------|---------------|
| Chrome | Latest 2 versions | Full support |
| Firefox | Latest 2 versions | Full support |
| Safari | Latest 2 versions | Full support |
| Edge | Latest 2 versions | Full support |
| Mobile browsers | - | Not optimized (V2) |

### SEO Strategy

| Requirement | Implementation |
|-------------|----------------|
| **Server-Side Rendering** | Next.js SSR for resort pages |
| **Meta tags** | Dynamic titles: "Best ski conditions near Lyon today" |
| **Structured data** | JSON-LD for resort information |
| **Sitemap** | Auto-generated for all resort pages |
| **URL structure** | Clean URLs: `/resorts/les-arcs`, `/near/lyon` |
| **Core Web Vitals** | LCP < 2.5s, FID < 100ms, CLS < 0.1 |

### Performance & Accessibility

Performance targets (Lighthouse > 90, FCP < 1.5s, TTI < 3s) and accessibility standards (WCAG AA) are detailed in the [Non-Functional Requirements](#non-functional-requirements) section.

### Implementation Considerations

**Tech Stack Summary:**
- Next.js (App Router) for SSR/SSG
- React for UI
- Radix UI for accessible components
- CSS Modules for styling
- Mapbox GL JS for interactive maps
- Supabase for auth + database
- Vercel for hosting

**What this enables:**
- Organic traffic from ski-related searches
- Fast, app-like experience once loaded
- Accessible to users with disabilities
- Clean, maintainable codebase

---

## Project Scoping & Phased Development

### MVP Strategy & Philosophy

**MVP Approach:** Problem-Solving MVP - deliver the core "where should I ski?" decision in the simplest possible way.

**MVP Philosophy:** If Lucas can make a ski decision in under 2 minutes, it ships. Everything else is post-MVP.

**Timeline:** MVP ASAP - validate the concept before the current ski season ends.

### MVP Feature Set (Phase 1)

**Core User Journeys Supported:**
- Lucas discovers and decides (first-time user flow)
- Sophie configures priorities (personalization)
- Marc's morning ritual (habitual use)
- New user priority setup (configuration)

**Must-Have Capabilities:**

| Feature | Justification |
|---------|---------------|
| Map with user geolocation | Core UX - user sees resorts around them |
| Perfect Day Score display | Key differentiator - one number decision |
| Resort detail cards | Decision support - conditions, weather, price |
| Webcam links | Visual verification before committing |
| Priority configuration | Personalization - different users, different needs |
| Social login (Google/Apple) | Email collection for re-engagement |
| Weekly email alerts | Retention mechanism |
| French Alps coverage (10-15 resorts) | Geographic MVP scope |
| Multi-language (FR/EN) | User accessibility |

**Explicitly NOT in MVP:**

| Feature | Reason |
|---------|--------|
| Side-by-side comparison | Nice UX, not essential for V1 decision |
| Affiliate deals | Monetization after traction |
| Implicit learning | Manual config works first |
| More regions | Validate Alps before expanding |
| Mobile app | Desktop validates concept first |
| Historical data | Focus on "today" decisions |

### Post-MVP Features

**Phase 2 (Growth):**
- Side-by-side resort comparison
- Affiliate deal integration (monetization)
- Pyrénées region expansion
- Swiss border resorts
- Implicit preference learning

**Phase 3 (Vision):**
- Mobile app with push notifications
- Historical data insights
- Europe-wide coverage
- Season pass advisor

### Risk Mitigation Strategy

| Risk | Mitigation |
|------|------------|
| Data scraping blocked | Start with 10-15 manually curated resorts; build scraping incrementally |
| Mapbox costs at scale | Free tier covers MVP; evaluate if traction justifies costs |
| Supabase limitations | Adequate for MVP scale; migrate if needed post-validation |
| SEO competition | Focus on long-tail keywords: "best ski conditions near Lyon today" |
| Ski season timing | Launch fast to catch current season; iterate for next year |

---

## Functional Requirements

### Map & Location

- **FR1:** Users can view an interactive map centered on their current location
- **FR2:** Users can grant geolocation permission to the application
- **FR3:** Users can view ski resort markers on the map with score indicators
- **FR4:** Users can see distance from their location to each resort
- **FR5:** Users can zoom and pan the map to explore resorts
- **FR6:** System displays resort markers with color-coded condition indicators

### Perfect Day Score

- **FR7:** System calculates a Perfect Day Score (0-100%) for each resort
- **FR8:** System factors snow quality, crowd level, weather, price, distance, and parking into scores
- **FR9:** System updates scores in real-time when user changes priorities
- **FR10:** Users can see the score prominently displayed on each resort marker
- **FR11:** System weights factors according to user-configured priorities

### Resort Information

- **FR12:** Users can view resort detail cards by selecting a resort
- **FR13:** Users can view current snow conditions (depth, freshness)
- **FR14:** Users can view open run/lift status
- **FR15:** Users can view crowd predictions for the day
- **FR16:** Users can view weather forecast (sun, temperature, precipitation)
- **FR17:** Users can view lift ticket pricing
- **FR18:** Users can view parking information (availability, cost)
- **FR19:** Users can access webcam feeds via external links
- **FR20:** System displays factor indicators (green/yellow/red) for quick assessment

### Personalization

- **FR21:** Users can configure their priority ranking for scoring factors
- **FR22:** Users can reorder priorities via drag-and-drop interface
- **FR23:** System persists user preferences across sessions
- **FR24:** System applies user priorities to score calculations
- **FR25:** Users can reset priorities to default ordering

### User Accounts & Authentication

- **FR26:** Users can browse map and view scores without creating an account
- **FR27:** Users can sign in using Google authentication
- **FR28:** Users can sign in using Apple authentication
- **FR29:** System captures user email address upon social login
- **FR30:** Users can sign out of their account
- **FR31:** System associates preferences with authenticated users

### Email Alerts

- **FR32:** Authenticated users can subscribe to weekly email alerts
- **FR33:** Users can configure alert preferences (day/time)
- **FR34:** System sends personalized weekly recommendations based on user priorities
- **FR35:** Users can unsubscribe from email alerts

### Language & Localization

- **FR36:** Users can switch between French and English interfaces
- **FR37:** System persists language preference
- **FR38:** System displays content in user's selected language

### Data & Content

- **FR39:** System aggregates resort data from external sources
- **FR40:** System updates resort conditions at minimum daily
- **FR41:** System covers French Alps ski resorts (10-15 MVP scope)
- **FR42:** Administrators can add/update resort information

---

## Non-Functional Requirements

### Performance

| Requirement | Target | Rationale |
|-------------|--------|-----------|
| **Page Load** | < 2 seconds | Fast = trustworthy; users making quick decisions |
| **Map Render** | < 1 second after page load | Core UX element must be instant |
| **Score Recalculation** | < 500ms | Priority changes should feel immediate |
| **Search/Filter** | < 300ms | Users expect instant feedback |
| **API Response** | < 500ms | Backend must support frontend speed |

### Security

| Requirement | Specification |
|-------------|---------------|
| **Authentication** | Delegated to Google/Apple OAuth - no local password storage |
| **Data Transmission** | HTTPS/TLS for all traffic |
| **Email Protection** | User emails stored encrypted, not exposed publicly |
| **Session Management** | Secure cookies, automatic expiry after 30 days inactivity |
| **GDPR Compliance** | Cookie consent, data deletion on request, privacy policy |

### Scalability

| Requirement | Target |
|-------------|--------|
| **Initial Capacity** | Support 1,000 concurrent users |
| **Growth Headroom** | Architecture supports 10x scale without redesign |
| **Seasonal Spikes** | Handle weekend/holiday traffic (2-3x normal) |
| **Data Volume** | Support 50+ resorts without performance degradation |

### Accessibility

| Requirement | Standard |
|-------------|----------|
| **WCAG Level** | AA compliance |
| **Keyboard Navigation** | Full support for all interactions |
| **Screen Reader** | Semantic HTML, ARIA labels on map elements |
| **Color Contrast** | 4.5:1 minimum ratio |
| **Focus Indicators** | Visible focus states on all interactive elements |

### Integration

| Integration | Requirement |
|-------------|-------------|
| **Mapbox GL JS** | Map rendering with custom markers and styling |
| **Supabase Auth** | Google and Apple OAuth providers |
| **Supabase Database** | User preferences, resort data storage |
| **External Data** | Daily resort condition updates from sources |
| **Email Service** | Reliable weekly digest delivery (Resend/Postmark) |

### Reliability

| Requirement | Target |
|-------------|--------|
| **Uptime** | 99% during ski season (Dec-Apr) |
| **Peak Availability** | Friday evening, Saturday/Sunday mornings critical |
| **Data Freshness** | Resort data updated minimum daily |
| **Graceful Degradation** | Map displays even if some resort data unavailable |

---
