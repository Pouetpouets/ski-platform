---
stepsCompleted: ['step-01-validate-prerequisites', 'step-02-design-epics', 'step-03-create-stories', 'step-04-final-validation']
workflowCompleted: true
completedAt: '2026-01-29'
lastUpdated: '2026-02-08'
inputDocuments:
  - '_bmad-output/planning-artifacts/prd-ski-platform.md'
  - '_bmad-output/planning-artifacts/architecture-ski-platform.md'
  - '_bmad-output/planning-artifacts/ux-design-ski-platform.md'
epicCount: 7
storyCount: 46
frCoverage: 33
project_name: 'Ski Platform'
date: '2026-01-29'
notes: 'Epic 7 (Email Alerts) and Epic 8 (i18n) removed from scope. New stories added for implemented features.'
---

# Ski Platform - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for Ski Platform, decomposing the requirements from the PRD, UX Design, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

**Map & Location (FR1-FR6):**
- FR1: Users can view an interactive map centered on their current location
- FR2: Users can grant geolocation permission to the application
- FR3: Users can view ski resort markers on the map with score indicators
- FR4: Users can see distance from their location to each resort
- FR5: Users can zoom and pan the map to explore resorts
- FR6: System displays resort markers with color-coded condition indicators

**Perfect Day Score (FR7-FR11):**
- FR7: System calculates a Perfect Day Score (0-100%) for each resort
- FR8: System factors snow quality, crowd level, weather, price, distance, and parking into scores
- FR9: System updates scores in real-time when user changes priorities
- FR10: Users can see the score prominently displayed on each resort marker
- FR11: System weights factors according to user-configured priorities

**Resort Information (FR12-FR20):**
- FR12: Users can view resort detail cards by selecting a resort
- FR13: Users can view current snow conditions (depth, freshness)
- FR14: Users can view open run/lift status
- FR15: Users can view crowd predictions for the day
- FR16: Users can view weather forecast (sun, temperature, precipitation)
- FR17: Users can view lift ticket pricing
- FR18: Users can view parking information (availability, cost)
- FR19: Users can access webcam feeds via external links
- FR20: System displays factor indicators (green/yellow/red) for quick assessment

**Personalization (FR21-FR25):**
- FR21: Users can configure their priority ranking for scoring factors
- FR22: Users can reorder priorities via drag-and-drop interface
- FR23: System persists user preferences across sessions
- FR24: System applies user priorities to score calculations
- FR25: Users can reset priorities to default ordering

**User Accounts & Authentication (FR26-FR31):**
- FR26: Users can browse map and view scores without creating an account
- FR27: Users can sign in using Google authentication
- FR28: Users can sign in using Apple authentication
- FR29: System captures user email address upon social login
- FR30: Users can sign out of their account
- FR31: System associates preferences with authenticated users

**Data & Content (FR39-FR42):**
- FR39: System aggregates resort data from external sources
- FR40: System updates resort conditions at minimum daily
- FR41: System covers French Alps ski resorts (10-15 MVP scope)
- FR42: Administrators can add/update resort information

### Non-Functional Requirements

**Performance:**
- NFR1: Page load < 2 seconds
- NFR2: Map render < 1 second after page load
- NFR3: Score recalculation < 500ms
- NFR4: Search/filter response < 300ms
- NFR5: API response < 500ms

**Security:**
- NFR6: Authentication delegated to Google/Apple OAuth (no local passwords)
- NFR7: HTTPS/TLS for all traffic
- NFR8: User emails stored encrypted, not exposed publicly
- NFR9: Secure cookies with 30-day expiry
- NFR10: GDPR compliance (cookie consent, data deletion, privacy policy)

**Scalability:**
- NFR11: Support 1,000 concurrent users initially
- NFR12: Architecture supports 10x scale without redesign
- NFR13: Handle weekend/holiday traffic spikes (2-3x normal)
- NFR14: Support 50+ resorts without performance degradation

**Accessibility:**
- NFR15: WCAG AA compliance
- NFR16: Full keyboard navigation support
- NFR17: Screen reader support with semantic HTML and ARIA labels
- NFR18: Color contrast minimum 4.5:1 ratio
- NFR19: Visible focus indicators on all interactive elements

**Reliability:**
- NFR20: 99% uptime during ski season (Dec-Apr)
- NFR21: Peak availability on Friday evenings, weekend mornings
- NFR22: Resort data updated minimum daily
- NFR23: Graceful degradation when data unavailable

### Additional Requirements

**From Architecture - Starter Template:**
- Initialize project using Vercel Supabase Starter: `npx create-next-app -e with-supabase`
- Configure shadcn/ui with Tailwind CSS v4
- Set up Supabase schema and RLS policies

**From Architecture - Technical Setup:**
- Integrate Mapbox GL JS for map component
- Configure next-intl for i18n (FR/EN)
- Set up Zod schemas for validation
- Configure Vercel cron jobs for data scraping and email alerts
- Set up Resend for email delivery

**From UX Design - Interaction Requirements:**
- Map takes ~70% viewport, slide-in panel 400px
- Score markers with color coding (green/amber/orange/red)
- Hover preview popover on markers
- Ctrl+K search modal (Command component)
- 200ms slide animation for panels

**From UX Design - Visual Requirements:**
- Muted color palette (Slate 50 background, Slate 600 primary)
- System font stack for performance
- Score display at 24px/700 weight
- WCAG AA color contrast compliance

### FR Coverage Map

| FR | Epic | Description |
|----|------|-------------|
| FR1 | Epic 2 | Interactive map centered on location |
| FR2 | Epic 2 | Geolocation permission |
| FR3 | Epic 2 | Resort markers with score indicators |
| FR4 | Epic 2 | Distance display |
| FR5 | Epic 2 | Map zoom and pan |
| FR6 | Epic 2 | Color-coded condition indicators |
| FR7 | Epic 4 | Perfect Day Score calculation |
| FR8 | Epic 4 | Score factors (snow, crowd, weather, price, distance, parking) |
| FR9 | Epic 4 | Real-time score updates |
| FR10 | Epic 4 | Score display on markers |
| FR11 | Epic 4 | User priority weighting |
| FR12 | Epic 3 | Resort detail cards |
| FR13 | Epic 3 | Snow conditions display |
| FR14 | Epic 3 | Open run/lift status |
| FR15 | Epic 3 | Crowd predictions |
| FR16 | Epic 3 | Weather forecast |
| FR17 | Epic 3 | Lift ticket pricing |
| FR18 | Epic 3 | Parking information |
| FR19 | Epic 3 | Webcam links |
| FR20 | Epic 3 | Factor indicators (green/yellow/red) |
| FR21 | Epic 5 | Priority configuration |
| FR22 | Epic 5 | Drag-and-drop reordering |
| FR23 | Epic 5/6 | Preference persistence (localStorage/DB) |
| FR24 | Epic 5 | Priority application to scores |
| FR25 | Epic 5 | Reset to default priorities |
| FR26 | Epic 6 | Anonymous browsing |
| FR27 | Epic 6 | Google authentication |
| FR28 | Epic 6 | Apple authentication |
| FR29 | Epic 6 | Email capture on login |
| FR30 | Epic 6 | Sign out functionality |
| FR31 | Epic 6 | Preference association with account |
| FR39 | Epic 7 | Data aggregation from external sources |
| FR40 | Epic 7 | Daily data updates |
| FR41 | Epic 1 | French Alps coverage (10-15 resorts) |
| FR42 | Epic 7 | Admin resort management |

## Epic List

### Epic 1: Foundation & Data Setup
Platform foundation with initial resort data, enabling all subsequent features.
**FRs covered:** FR41
**Additional:** Project initialization, database schema, seed data

### Epic 2: Interactive Map Experience
Users can discover ski resorts on an interactive map centered on their location.
**FRs covered:** FR1, FR2, FR3, FR4, FR5, FR6

### Epic 3: Resort Information Display
Users can view detailed resort information to support their ski day decision.
**FRs covered:** FR12, FR13, FR14, FR15, FR16, FR17, FR18, FR19, FR20

### Epic 4: Perfect Day Score System
Users see at-a-glance scores showing which resort is best for them today.
**FRs covered:** FR7, FR8, FR9, FR10, FR11

### Epic 5: User Personalization
Users can customize their priority rankings to get personalized recommendations.
**FRs covered:** FR21, FR22, FR23 (localStorage), FR24, FR25

### Epic 6: Authentication & Accounts
Users can sign in to save preferences across devices and sessions.
**FRs covered:** FR26, FR27, FR28, FR29, FR30, FR31, FR23 (DB)

### Epic 7: Data Operations & Freshness
Users see accurate, up-to-date resort conditions.
**FRs covered:** FR39, FR40, FR42

---

## Epic 1: Foundation & Data Setup

Platform foundation with initial resort data, enabling all subsequent features.

### Story 1.1: Project Initialization with Vercel Supabase Starter

As a **developer**,
I want **the project initialized with the Vercel Supabase starter template**,
So that **I have a working Next.js + Supabase foundation to build on**.

**Acceptance Criteria:**

**Given** a new developer clones the repository
**When** they run `npm install && npm run dev`
**Then** Next.js dev server starts on localhost:3000
**And** the application renders without errors

**Given** the project is initialized with `npx create-next-app -e with-supabase`
**When** viewing the project structure
**Then** Next.js App Router structure exists (`app/` directory)
**And** Supabase client utilities are configured in `utils/supabase/`
**And** Environment variables template exists (`.env.example`)

**Given** Supabase environment variables are configured
**When** the application loads
**Then** Supabase client connects successfully
**And** Server components can query Supabase

---

### Story 1.2: Supabase Database Schema for Resorts

As a **developer**,
I want **the database schema for resorts and conditions**,
So that **all resort data features have a proper data foundation**.

**Acceptance Criteria:**

**Given** Supabase migrations are configured
**When** migrations are run
**Then** `resorts` table exists with columns: id, name, slug, latitude, longitude, altitude_min, altitude_max, website_url, webcam_url, created_at, updated_at
**And** `resort_conditions` table exists with columns: id, resort_id, snow_depth_base, snow_depth_summit, fresh_snow_24h, runs_open, runs_total, lifts_open, lifts_total, crowd_level (enum), weather_condition, temperature_min, temperature_max, adult_ticket_price, parking_status, parking_price, updated_at
**And** Foreign key exists from resort_conditions.resort_id to resorts.id

**Given** the crowd_level enum
**When** defining valid values
**Then** options are: `low`, `moderate`, `high`, `very_high`

**Given** Row Level Security (RLS)
**When** policies are applied
**Then** All users can SELECT from resorts and resort_conditions
**And** Only authenticated admins can INSERT/UPDATE/DELETE

---

### Story 1.3: shadcn/ui Configuration with Tailwind CSS v4

As a **developer**,
I want **shadcn/ui components configured with the design system**,
So that **I can build consistent UI components quickly**.

**Acceptance Criteria:**

**Given** shadcn/ui is initialized
**When** running `npx shadcn@latest init`
**Then** Tailwind CSS v4 is configured
**And** CSS variables are set for the design system colors
**And** `components/ui/` directory is created

**Given** the design system from UX specification
**When** configuring theme variables
**Then** Background color is Slate 50 (#FAFAFA)
**And** Primary text is Slate 600
**And** Score colors are defined: green (#22C55E), amber (#F59E0B), orange (#F97316), red (#EF4444)

**Given** core shadcn components are installed
**When** checking available components
**Then** Button, Card, Dialog, Dropdown, Sheet, and Tooltip are available
**And** Components render with consistent styling

---

### Story 1.4: Seed Data for French Alps Resorts

As a **user**,
I want **10-15 French Alps resorts available in the system**,
So that **I can see real resort data when using the platform (FR41)**.

**Acceptance Criteria:**

**Given** the seed data script runs
**When** seeding completes
**Then** At least 10 resorts exist in the database
**And** Resorts include: Les Arcs, La Clusaz, Megève, Chamonix, Val d'Isère, Tignes, Les Deux Alpes, Alpe d'Huez, La Plagne, Courchevel
**And** Each resort has valid latitude/longitude for French Alps

**Given** each seeded resort
**When** viewing its data
**Then** All required fields are populated (name, slug, coordinates, altitude range)
**And** website_url and webcam_url are valid URLs
**And** Initial resort_conditions record exists with sample data

**Given** sample conditions data
**When** seeded for each resort
**Then** Snow depth values are realistic (50-200cm base)
**And** Ticket prices are realistic (€40-70 range)
**And** Different crowd levels are distributed across resorts

---

### Story 1.5: Zod Schemas for Data Validation

As a **developer**,
I want **Zod schemas for all data types**,
So that **I have type-safe validation throughout the application**.

**Acceptance Criteria:**

**Given** Zod is installed
**When** defining the Resort schema
**Then** Schema validates: id (UUID), name (string), slug (string), latitude (number -90 to 90), longitude (number -180 to 180), altitudes (positive integers)

**Given** Zod is configured
**When** defining the ResortConditions schema
**Then** Schema validates all condition fields with appropriate constraints
**And** snow_depth values are non-negative integers
**And** crowd_level is enum of valid values
**And** temperatures are numbers within reasonable range (-30 to 30)

**Given** TypeScript integration
**When** using Zod schemas
**Then** TypeScript types are inferred from schemas (`z.infer<typeof ResortSchema>`)
**And** Types are exported for use in components and API routes

---

### Story 1.6: Landing Page with Real-Time Resort Data ✅

As a **user**,
I want **an engaging landing page that shows real resort data**,
So that **I understand the value of the platform before exploring the map**.

**Status:** Done

**Acceptance Criteria:**

**Given** I visit the home page
**When** the page loads
**Then** I see a hero section with compelling copy and CTA to map
**And** I see featured resorts with real-time scores and conditions
**And** The layout is responsive for mobile/tablet/desktop

---

## Epic 2: Interactive Map Experience

Users can discover ski resorts on an interactive map centered on their location.

### Story 2.1: Mapbox GL JS Integration

As a **user**,
I want **to see an interactive map of the French Alps region**,
So that **I can visually explore ski resort locations (FR1, FR5)**.

**Acceptance Criteria:**

**Given** the map component loads
**When** the page renders
**Then** Mapbox GL JS map displays within 1 second (NFR2)
**And** Map is centered on French Alps region by default (approximately 45.9°N, 6.9°E)
**And** Zoom level shows the French Alps overview

**Given** the map is displayed
**When** I interact with the map
**Then** I can zoom in/out using scroll wheel or +/- buttons (FR5)
**And** I can pan by clicking and dragging (FR5)
**And** Map responds smoothly without lag

**Given** Mapbox environment variables
**When** configuring the map
**Then** NEXT_PUBLIC_MAPBOX_TOKEN is used for authentication
**And** Map style is configured (streets-v12 or custom alpine style)

---

### Story 2.2: Geolocation Permission & User Location

As a **user**,
I want **the map to center on my current location**,
So that **I can see resorts relative to where I am (FR1, FR2)**.

**Acceptance Criteria:**

**Given** I open the application for the first time
**When** the map loads
**Then** Browser prompts for geolocation permission (FR2)
**And** If I deny, map shows default French Alps view
**And** If I grant, map centers on my location

**Given** I grant geolocation permission
**When** my location is detected
**Then** Map smoothly animates to center on my location
**And** A marker or pulsing dot shows my current position
**And** Zoom adjusts to show nearby resorts

**Given** geolocation is unavailable or times out
**When** the map loads
**Then** Default French Alps view is shown
**And** No error message disrupts the user experience
**And** User can still interact with all features

---

### Story 2.3: Resort Markers on Map

As a **user**,
I want **to see ski resort markers on the map**,
So that **I can identify available resorts at a glance (FR3)**.

**Acceptance Criteria:**

**Given** resorts exist in the database
**When** the map loads
**Then** Custom markers display at each resort's coordinates
**And** Markers are visually distinct from the map background
**And** Markers show the Perfect Day Score prominently (FR10)

**Given** multiple resorts are visible
**When** viewing the map
**Then** Markers do not overlap excessively
**And** At lower zoom levels, nearby markers may cluster
**And** Clicking a cluster zooms to show individual markers

**Given** I hover over a resort marker
**When** the mouse enters the marker area
**Then** A preview popover appears with resort name and score
**And** Popover disappears when mouse leaves

---

### Story 2.4: Distance Calculation from User Location

As a **user**,
I want **to see how far each resort is from my location**,
So that **I can factor travel time into my decision (FR4)**.

**Acceptance Criteria:**

**Given** I have granted geolocation permission
**When** viewing resort markers or detail panel
**Then** Distance from my location is displayed (e.g., "78 km")
**And** Distance is calculated using Haversine formula

**Given** distance is calculated
**When** displaying to user
**Then** Distances under 100km show one decimal (e.g., "45.2 km")
**And** Distances over 100km show whole numbers (e.g., "156 km")
**And** Driving time estimate is shown (e.g., "~1h 15min")

**Given** I have not granted geolocation
**When** viewing resort information
**Then** Distance field shows "Grant location to see distance"
**And** Or displays distance from a default city (Lyon)

---

### Story 2.5: Map Zoom and Pan Controls

As a **user**,
I want **intuitive map controls**,
So that **I can easily explore different areas (FR5)**.

**Acceptance Criteria:**

**Given** the map is displayed
**When** I scroll on the map
**Then** Map zooms in/out smoothly
**And** Zoom centers on cursor position

**Given** the map is displayed
**When** I use pinch gesture (touch devices) or +/- buttons
**Then** Map zooms in/out
**And** Zoom buttons are visible in corner of map

**Given** the map is displayed
**When** I click and drag
**Then** Map pans smoothly in the direction of drag
**And** Momentum scrolling continues briefly after release

**Given** full-screen consideration
**When** map takes ~70% of viewport per UX spec
**Then** Navigation controls (zoom buttons) are positioned appropriately
**And** Controls don't overlap with resort detail panel

---

### Story 2.6: Color-Coded Condition Markers

As a **user**,
I want **markers color-coded by overall conditions**,
So that **I can quickly identify the best options (FR6)**.

**Acceptance Criteria:**

**Given** a resort's Perfect Day Score is calculated
**When** displaying the marker
**Then** Score 80-100% shows green marker (#22C55E)
**And** Score 60-79% shows amber marker (#F59E0B)
**And** Score 40-59% shows orange marker (#F97316)
**And** Score 0-39% shows red marker (#EF4444)

**Given** color-coded markers
**When** viewing the map
**Then** Colors meet WCAG AA contrast requirements (4.5:1)
**And** Score number is readable on all color backgrounds
**And** Marker design uses bold 24px weight per UX spec

**Given** multiple score ranges
**When** viewing the map
**Then** Users can quickly scan for green markers
**And** Color legend is accessible (help icon or initial tooltip)

---

### Story 2.7: 7-Day Weather Forecasts via Open-Meteo API ✅

As a **user**,
I want **to see weather forecasts for the next 7 days**,
So that **I can plan my ski trip for the best weather day**.

**Status:** Done

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing weather
**Then** I see forecasts for 7 days with temperature, precipitation, and conditions
**And** Day picker allows selecting future days for score calculation

---

### Story 2.8: MapCommandBar with Resort Search ✅

As a **user**,
I want **to search for resorts by name and filter the map**,
So that **I can quickly find specific resorts without panning the map**.

**Status:** Done

**Acceptance Criteria:**

**Given** the map page
**When** viewing the header
**Then** I see a command bar with search input and day picker
**And** Searching filters markers to show only matching resorts

---

### Story 2.9: Snow Conditions Heatmap Layer ✅

As a **user**,
I want **to see a visual heatmap of snow conditions across the map**,
So that **I can quickly identify regions with the best snow**.

**Status:** Done

**Acceptance Criteria:**

**Given** the map view
**When** toggling the snow layer
**Then** A heatmap overlay shows snow depth intensity
**And** Layer can be toggled on/off

---

### Story 2.10: Manual Location Selection ✅

As a **user**,
I want **to manually select my location on the map**,
So that **I can see distances even if I deny browser geolocation**.

**Status:** Done

**Acceptance Criteria:**

**Given** geolocation is denied or unavailable
**When** viewing the map
**Then** I can open a modal to manually set my location
**And** Distances calculate from my chosen location

---

### Story 2.11: Resort Marker Redesign ✅

As a **user**,
I want **visually appealing and informative resort markers**,
So that **I can quickly scan the map and identify the best resorts**.

**Status:** Done

**Acceptance Criteria:**

**Given** the map view
**When** viewing markers
**Then** Markers show score prominently with color-coded background
**And** Hover effect elevates marker and shows resort name

---

## Epic 3: Resort Information Display

Users can view detailed resort information to support their ski day decision.

### Story 3.1: Resort Detail Panel Component

As a **user**,
I want **to view detailed resort information when I select a resort**,
So that **I can make an informed decision (FR12)**.

**Acceptance Criteria:**

**Given** I click on a resort marker
**When** the selection is made
**Then** A slide-in panel appears from the right side
**And** Panel width is 400px per UX specification
**And** Panel slides in with 200ms animation

**Given** the detail panel is open
**When** viewing its content
**Then** Resort name displays prominently at top
**And** Perfect Day Score shows with large number and breakdown
**And** All condition factors are listed below

**Given** the detail panel is open
**When** I click the X button or click outside the panel
**Then** Panel slides out with 200ms animation
**And** Map returns to full interaction mode

**Given** keyboard accessibility
**When** the panel is open
**Then** Focus is trapped within panel
**And** Escape key closes the panel
**And** Tab navigates through interactive elements

---

### Story 3.2: Display Snow Conditions

As a **user**,
I want **to see current snow conditions**,
So that **I know the quality of skiing I can expect (FR13)**.

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing snow conditions section
**Then** I see snow depth at base (e.g., "Base: 85cm")
**And** I see snow depth at summit (e.g., "Summit: 180cm")
**And** I see fresh snow in last 24h (e.g., "Fresh: 15cm")

**Given** fresh snow data
**When** fresh snow > 20cm
**Then** A "Powder Alert" badge displays
**And** Fresh snow number is highlighted

**Given** snow conditions
**When** evaluating display
**Then** Factor indicator shows green/yellow/red based on quality
**And** Icon (snowflake) accompanies the section

---

### Story 3.3: Display Open Runs/Lifts Status

As a **user**,
I want **to see how many runs and lifts are open**,
So that **I know the available terrain (FR14)**.

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing runs/lifts section
**Then** I see runs open vs total (e.g., "Runs: 45/52 open")
**And** I see lifts open vs total (e.g., "Lifts: 18/22 open")
**And** Percentage is shown or visualized

**Given** runs open percentage
**When** > 80% open
**Then** Factor indicator shows green
**When** 50-80% open
**Then** Factor indicator shows yellow
**When** < 50% open
**Then** Factor indicator shows red

**Given** lift status
**When** a key lift (main gondola) is closed
**Then** Consider showing warning note
**And** This affects overall score

---

### Story 3.4: Display Crowd Predictions

As a **user**,
I want **to see predicted crowd levels for today**,
So that **I can avoid busy resorts (FR15)**.

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing crowd section
**Then** I see crowd level: Low / Moderate / High / Very High
**And** Brief explanation shown (e.g., "Weekend + school holiday")

**Given** crowd level value
**When** crowd is "Low"
**Then** Factor indicator shows green
**When** crowd is "Moderate"
**Then** Factor indicator shows yellow
**When** crowd is "High" or "Very High"
**Then** Factor indicator shows red

**Given** crowd predictions
**When** displayed
**Then** Icon (people/crowd icon) accompanies the section
**And** Tooltip explains how crowd level is determined

---

### Story 3.5: Display Weather Forecast

As a **user**,
I want **to see weather forecast for the resort**,
So that **I can plan for conditions (FR16)**.

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing weather section
**Then** I see weather condition icon (sunny, cloudy, snowing, etc.)
**And** I see temperature range (e.g., "-5°C to 2°C")
**And** I see wind conditions if significant

**Given** weather conditions
**When** sunny or partly cloudy
**Then** Factor indicator shows green
**When** overcast but dry
**Then** Factor indicator shows yellow
**When** heavy snow, rain, or high winds
**Then** Factor indicator shows red

**Given** precipitation forecast
**When** snow is expected
**Then** Expected accumulation is shown
**And** This could be positive (fresh powder!)

---

### Story 3.6: Display Lift Ticket Pricing

As a **user**,
I want **to see lift ticket prices**,
So that **I can factor cost into my decision (FR17)**.

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing pricing section
**Then** I see adult day pass price (e.g., "€54 adult day pass")
**And** Link to resort's official ticket page if available

**Given** price comparison
**When** price < €45
**Then** Factor indicator shows green (budget-friendly)
**When** price €45-€55
**Then** Factor indicator shows yellow (average)
**When** price > €55
**Then** Factor indicator shows red (premium)

**Given** special pricing
**When** resort has current promotion
**Then** Promo badge or strikethrough price shown
**And** Original vs promo price displayed

---

### Story 3.7: Display Parking Information

As a **user**,
I want **to see parking availability and cost**,
So that **I can plan my arrival (FR18)**.

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing parking section
**Then** I see parking status: Available / Limited / Full
**And** I see parking cost (e.g., "€8/day" or "Free")

**Given** parking status
**When** status is "Available" and free
**Then** Factor indicator shows green
**When** status is "Limited" or paid
**Then** Factor indicator shows yellow
**When** status is "Full"
**Then** Factor indicator shows red

**Given** parking advice
**When** status is "Limited" or "Full"
**Then** Suggested arrival time shown (e.g., "Arrive before 8:30am")

---

### Story 3.8: Add Webcam Links

As a **user**,
I want **to access webcam feeds for the resort**,
So that **I can visually verify conditions before going (FR19)**.

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing the webcam section
**Then** I see a "View Webcam" button
**And** Button is visually prominent

**Given** I click "View Webcam"
**When** the webcam URL exists
**Then** Webcam page opens in new tab
**And** Browser's new tab indicator is shown

**Given** no webcam URL is available
**When** viewing the resort detail
**Then** Webcam button is hidden or shows "Webcam unavailable"

---

### Story 3.9: Factor Indicators (Green/Yellow/Red)

As a **user**,
I want **quick visual indicators for each factor**,
So that **I can assess conditions at a glance (FR20)**.

**Acceptance Criteria:**

**Given** each factor in the detail panel
**When** displaying the factor
**Then** A colored indicator dot appears next to each factor
**And** Green = excellent, Yellow = moderate, Red = poor

**Given** the indicator system
**When** viewing multiple factors
**Then** Colors are consistent across all factors
**And** Tooltips explain what each color means for that factor

**Given** accessibility requirements
**When** displaying indicators
**Then** Colors alone don't convey information (icons or text supplement)
**And** Color contrast meets WCAG AA requirements

**Given** the detail panel header
**When** viewing overall status
**Then** Count of green/yellow/red factors is visible
**And** Example: "5 ✓ 2 ○ 1 ⚠" quick summary

---

## Epic 4: Perfect Day Score System

Users see at-a-glance scores showing which resort is best for them today.

### Story 4.1: Implement Score Calculation Algorithm

As a **system**,
I want **to calculate a Perfect Day Score for each resort**,
So that **users can compare resorts with a single metric (FR7, FR8)**.

**Acceptance Criteria:**

**Given** resort conditions data exists
**When** calculating the Perfect Day Score
**Then** Score is a percentage from 0-100%
**And** Score factors include: snow quality, crowd level, weather, price, distance, parking (FR8)

**Given** the scoring algorithm
**When** calculating each factor score
**Then** Snow quality: based on depth, freshness, coverage (0-100 points)
**And** Crowd level: low=100, moderate=70, high=40, very_high=20
**And** Weather: sunny=100, cloudy=80, snow=70, rain=30, storm=10
**And** Price: normalized against regional average
**And** Distance: closer = higher score (decay function)
**And** Parking: available+free=100, limited=60, full=20

**Given** factor scores are calculated
**When** combining into final score
**Then** Default weights are applied equally (1/6 each)
**And** Weighted average produces final score
**And** Score is rounded to nearest integer

---

### Story 4.2: Display Scores on Map Markers

As a **user**,
I want **to see the Perfect Day Score on each resort marker**,
So that **I can compare resorts visually (FR10)**.

**Acceptance Criteria:**

**Given** a resort marker on the map
**When** the marker renders
**Then** Score displays as bold number (e.g., "87%")
**And** Number is 24px font weight 700 per UX spec
**And** Number is centered in the marker

**Given** score display
**When** viewing at different zoom levels
**Then** Score remains readable
**And** At far zoom, markers may show just color (no number)
**And** At medium/close zoom, numbers are visible

**Given** score updates
**When** user changes priorities (Epic 5)
**Then** Marker scores update in real-time
**And** Marker colors update to reflect new scores

---

### Story 4.3: Show Score Breakdown in Detail Panel

As a **user**,
I want **to see how the Perfect Day Score is calculated**,
So that **I understand why a resort scored the way it did (FR7)**.

**Acceptance Criteria:**

**Given** the resort detail panel is open
**When** viewing the score section
**Then** Overall score displays prominently (large number)
**And** Breakdown shows each factor's contribution

**Given** score breakdown display
**When** viewing individual factors
**Then** Each factor shows: name, individual score, weight, contribution
**And** Visual bar or percentage for each factor
**And** Factors sorted by their contribution to total score

**Given** user has custom priorities (Epic 5)
**When** viewing breakdown
**Then** Weights reflect user's priority order
**And** Higher priority factors show larger weight

---

### Story 4.4: Real-time Score Update on Priority Change

As a **user**,
I want **scores to update instantly when I change priorities**,
So that **I see personalized results immediately (FR9)**.

**Acceptance Criteria:**

**Given** I am viewing the map with scores
**When** I change my priority order (Epic 5)
**Then** All resort scores recalculate within 500ms (NFR3)
**And** Marker scores update in place
**And** Marker colors update to reflect new score ranges

**Given** score recalculation
**When** priorities change
**Then** No page reload required
**And** Map does not reset view (maintains zoom/pan)
**And** Currently open detail panel updates with new score

**Given** performance
**When** recalculating 15 resort scores
**Then** Total computation completes under 100ms
**And** UI remains responsive during calculation

---

### Story 4.5: Apply User Priority Weights

As a **system**,
I want **to weight scoring factors according to user priorities**,
So that **scores reflect what matters most to each user (FR11)**.

**Acceptance Criteria:**

**Given** default priority order (snow, crowd, weather, price, distance, parking)
**When** calculating weights
**Then** Priority 1 gets weight 0.30
**And** Priority 2 gets weight 0.25
**And** Priority 3 gets weight 0.20
**And** Priority 4 gets weight 0.12
**And** Priority 5 gets weight 0.08
**And** Priority 6 gets weight 0.05

**Given** user has reordered priorities
**When** calculating their scores
**Then** New weights are applied based on their order
**And** Same weight distribution (0.30, 0.25, 0.20, 0.12, 0.08, 0.05)
**And** Applied to their chosen priority order

**Given** a user prioritizes Price > Distance > Snow
**When** viewing a cheap, close, low-snow resort
**Then** That resort may score higher than one with better snow but higher price/distance
**And** Score accurately reflects user's stated preferences

---

## Epic 5: User Personalization

Users can customize their priority rankings to get personalized recommendations.

### Story 5.1: Create Priority Configuration UI

As a **user**,
I want **a settings interface to configure my priorities**,
So that **I can tell the system what matters most to me (FR21)**.

**Acceptance Criteria:**

**Given** I click the settings/configure button
**When** the settings panel opens
**Then** I see a list of all scoring factors
**And** Factors displayed: Snow, Crowds, Weather, Price, Distance, Parking
**And** Current priority order is shown with numbers (1-6)

**Given** the priority configuration UI
**When** viewing the interface
**Then** Each factor shows a drag handle icon
**And** Brief description explains what each factor measures
**And** "Save" and "Reset to Default" buttons are visible

**Given** mobile/touch consideration
**When** on smaller screens
**Then** Drag handles are touch-friendly size
**And** Alternative up/down buttons are available

---

### Story 5.2: Implement Drag-and-Drop Reordering

As a **user**,
I want **to drag factors to reorder my priorities**,
So that **I can easily customize my preferences (FR22)**.

**Acceptance Criteria:**

**Given** the priority list is displayed
**When** I click and drag a factor
**Then** The item visually lifts and follows my cursor
**And** Other items shift to show where it will be placed
**And** Visual feedback indicates drag is active

**Given** I drop the factor in a new position
**When** the drop completes
**Then** The factor is placed in the new position
**And** All other factors renumber accordingly
**And** Priority numbers update (1-6)

**Given** drag-and-drop library
**When** implementing
**Then** Use @dnd-kit/core or similar accessible library
**And** Keyboard drag support (space to pick up, arrows to move, space to drop)

**Given** I save my changes
**When** clicking "Save"
**Then** New priority order is stored
**And** Map scores recalculate immediately (Story 4.4)
**And** Confirmation feedback shown

---

### Story 5.3: Persist Preferences to LocalStorage

As a **user**,
I want **my preferences saved locally**,
So that **I don't have to reconfigure every visit (FR23)**.

**Acceptance Criteria:**

**Given** I save my priority configuration
**When** preferences are stored
**Then** Priority order is saved to localStorage
**And** Key is "ski-platform-priorities"
**And** Value is JSON array of factor IDs in order

**Given** I return to the site (no account)
**When** the application loads
**Then** localStorage priorities are loaded
**And** My previous priority order is applied
**And** Scores calculate using my saved preferences

**Given** localStorage is unavailable or corrupted
**When** loading preferences
**Then** Default priority order is used
**And** No error is shown to user
**And** System continues to function normally

---

### Story 5.4: Reset to Default Priorities

As a **user**,
I want **to reset my priorities to default**,
So that **I can start fresh if needed (FR25)**.

**Acceptance Criteria:**

**Given** I am viewing the priority configuration
**When** I click "Reset to Default"
**Then** Priorities revert to default order: Snow, Crowds, Weather, Price, Distance, Parking
**And** UI updates to show default order
**And** Confirmation message shows "Priorities reset to default"

**Given** I reset to default
**When** the reset completes
**Then** localStorage is updated with default order
**And** Map scores recalculate with default weights
**And** No unsaved changes remain

---

### Story 5.5: Apply Priorities to Score Calculation

As a **system**,
I want **to use stored priorities when calculating scores**,
So that **all score displays reflect user preferences (FR24)**.

**Acceptance Criteria:**

**Given** user has saved priorities in localStorage
**When** calculating Perfect Day Scores
**Then** Priority order from storage is used
**And** Weights are applied based on stored order

**Given** user is authenticated with DB preferences (Epic 6)
**When** both localStorage and DB preferences exist
**Then** DB preferences take precedence
**And** localStorage is synced to match DB

**Given** score calculation function
**When** called
**Then** Accepts optional priority array parameter
**And** Falls back to localStorage, then default order
**And** Returns consistent scores for same inputs

---

## Epic 6: Authentication & Accounts

Users can sign in to save preferences across devices and sessions.

### Story 6.1: Anonymous Browsing Support

As a **user**,
I want **to use the platform without creating an account**,
So that **I can evaluate it before committing (FR26)**.

**Acceptance Criteria:**

**Given** I visit the platform for the first time
**When** the application loads
**Then** I can view the map and all resort markers
**And** I can click resorts to see details
**And** I can configure priorities (stored in localStorage)
**And** No login prompt interrupts my flow

**Given** I am browsing anonymously
**When** viewing resort details
**Then** All information is visible
**And** Perfect Day Score is calculated
**And** Only email alerts are gated behind authentication

**Given** the application header
**When** I am not logged in
**Then** "Sign In" button is visible but not prominent
**And** No aggressive signup prompts

---

### Story 6.2: Configure Supabase Auth Providers

As a **developer**,
I want **Supabase Auth configured with Google and Apple providers**,
So that **users can sign in with social accounts (FR27, FR28)**.

**Acceptance Criteria:**

**Given** Supabase project settings
**When** configuring auth providers
**Then** Google OAuth is enabled with client ID/secret
**And** Apple OAuth is enabled with service ID/team ID
**And** Redirect URLs are configured for production and localhost

**Given** auth provider configuration
**When** environment variables are set
**Then** NEXT_PUBLIC_SUPABASE_URL is configured
**And** NEXT_PUBLIC_SUPABASE_ANON_KEY is configured
**And** Provider-specific secrets are in server environment only

**Given** Supabase auth helper utilities
**When** reviewing the code
**Then** Client-side auth helper exists for browser
**And** Server-side auth helper exists for API routes
**And** Middleware handles auth state refresh

---

### Story 6.3: Implement Google Sign-In

As a **user**,
I want **to sign in with my Google account**,
So that **I don't need to create a separate password (FR27)**.

**Acceptance Criteria:**

**Given** I click "Sign In with Google"
**When** the auth flow initiates
**Then** I am redirected to Google's OAuth consent screen
**And** I can select my Google account
**And** I see what permissions are requested (email, profile)

**Given** I complete Google sign-in
**When** redirected back to the application
**Then** I am logged in
**And** My email address is captured (FR29)
**And** User record is created/updated in Supabase

**Given** Google sign-in errors
**When** auth fails (cancelled, error)
**Then** Appropriate error message is shown
**And** User can retry sign-in
**And** No sensitive error details exposed

---

### Story 6.4: Implement Apple Sign-In

As a **user**,
I want **to sign in with my Apple account**,
So that **I can use Apple's privacy features (FR28)**.

**Acceptance Criteria:**

**Given** I click "Sign In with Apple"
**When** the auth flow initiates
**Then** I am redirected to Apple's sign-in page
**And** I can use Face ID/Touch ID if on Apple device
**And** I can choose to hide my email (relay address)

**Given** I complete Apple sign-in
**When** redirected back to the application
**Then** I am logged in
**And** Email is captured (real or relay address) (FR29)
**And** User record is created/updated in Supabase

**Given** Apple's "Hide My Email" feature
**When** user chooses to hide email
**Then** System accepts the relay email address
**And** Email alerts can still be sent to relay address

---

### Story 6.5: Create User Menu Component

As a **user**,
I want **to see my account status and sign out**,
So that **I can manage my session (FR30)**.

**Acceptance Criteria:**

**Given** I am logged in
**When** viewing the header
**Then** My avatar or initial displays instead of "Sign In"
**And** Clicking shows a dropdown menu

**Given** the user dropdown menu
**When** I open it
**Then** I see my email address
**And** I see "Settings" link
**And** I see "Sign Out" button

**Given** I click "Sign Out"
**When** the action processes
**Then** Supabase session is terminated (FR30)
**And** I am returned to anonymous state
**And** Page refreshes or redirects to home

**Given** session persistence
**When** I close and reopen the browser
**Then** My session remains active (within 30-day expiry per NFR9)
**And** I don't need to re-authenticate

---

### Story 6.6: Sync Preferences to Database

As a **user**,
I want **my preferences synced to my account**,
So that **they persist across devices (FR31, FR23)**.

**Acceptance Criteria:**

**Given** the user_preferences table schema
**When** migrations run
**Then** Table exists with: user_id, priorities (JSON array), language, created_at, updated_at
**And** RLS policy allows users to read/write only their own preferences

**Given** I am logged in and change priorities
**When** saving preferences
**Then** Priorities are saved to user_preferences table
**And** localStorage is also updated as backup

**Given** I log in on a new device
**When** the application loads
**Then** Preferences are fetched from database
**And** localStorage is synced with DB preferences
**And** My priorities appear as expected

**Given** localStorage has preferences and I log in
**When** DB has different preferences
**Then** DB preferences take precedence
**And** localStorage is updated to match
**And** User sees their account preferences

---

## Epic 7: Data Operations & Freshness

Users see accurate, up-to-date resort conditions.

### Story 7.1: Worldwide Resort Scraping via skiresort.info ✅

As a **system**,
I want **automated data collection from skiresort.info**,
So that **conditions are always current for resorts worldwide (FR39, FR40)**.

**Status:** Done

**Acceptance Criteria:**

**Given** Vercel cron job is configured
**When** it runs on schedule (daily)
**Then** It fetches current conditions from skiresort.info
**And** Updates resort_conditions table with new data
**And** Logs success/failure for each resort

**Given** scraper implementation
**When** fetching data
**Then** HTML parser extracts snow depth, lifts, runs, weather
**And** Data mapper transforms to DB schema
**And** Retry logic handles transient failures

---

### Story 7.2: Implement Data Validation

As a **system**,
I want **validation on incoming resort data**,
So that **bad data doesn't corrupt scores**.

**Acceptance Criteria:**

**Given** new resort conditions data
**When** processing an update
**Then** Zod schema validates all fields
**And** Invalid data is rejected with error logging
**And** Previous valid data is retained if new data fails

**Given** data sanity checks
**When** validating
**Then** Snow depth is within reasonable range (0-500cm)
**And** Temperatures are within reasonable range (-40°C to 30°C)
**And** Percentages are 0-100
**And** Prices are positive numbers

**Given** suspicious data changes
**When** new data differs dramatically from previous
**Then** Flag for manual review
**And** Example: snow depth drops from 200cm to 20cm in one day
**And** Possibly hold update pending verification

---

### Story 7.3: Create Admin Resort Management UI

As an **administrator**,
I want **to manage resort information**,
So that **I can add/update resorts and correct data (FR42)**.

**Acceptance Criteria:**

**Given** I am an authenticated admin user
**When** accessing /admin/resorts
**Then** I see a list of all resorts with key info
**And** I can add a new resort
**And** I can edit existing resort details
**And** I can delete a resort

**Given** the add/edit resort form
**When** filling in details
**Then** I can set: name, slug, coordinates, altitude range, URLs
**And** I can manually update current conditions
**And** Form validates all inputs before saving

**Given** admin access control
**When** a non-admin accesses /admin/*
**Then** They receive 403 Forbidden
**And** Redirect to home page
**And** Admin role is checked server-side

**Given** condition overrides
**When** admin manually updates conditions
**Then** Manual flag is set on the record
**And** Next automated scrape won't overwrite
**And** Until admin clears the manual flag

---

### Story 7.4: Add Data Freshness Indicators

As a **user**,
I want **to know how fresh the data is**,
So that **I can trust the recommendations**.

**Acceptance Criteria:**

**Given** resort detail panel
**When** viewing conditions
**Then** "Last updated" timestamp is shown
**And** Format: "Updated 2 hours ago" or "Updated today at 8:15 AM"

**Given** data freshness
**When** data is more than 24 hours old
**Then** Warning indicator shows "Data may be outdated"
**And** Yellow warning color draws attention
**And** User advised to verify with resort directly

**Given** data freshness
**When** data is more than 48 hours old
**Then** Strong warning: "Data is stale - verify conditions"
**And** Red warning indicator
**And** Score may be de-emphasized or grayed

**Given** real-time freshness
**When** viewing resort list
**Then** Icon or indicator shows freshness status at a glance
**And** Green: < 6 hours, Yellow: 6-24 hours, Red: > 24 hours

---

## Summary

| Epic | Stories | Key FRs | Status |
|------|---------|---------|--------|
| Epic 1: Foundation & Data Setup | 6 stories | FR41 | ✅ Done |
| Epic 2: Interactive Map Experience | 11 stories | FR1-6 | ✅ Done |
| Epic 3: Resort Information Display | 9 stories | FR12-20 | ✅ Done |
| Epic 4: Perfect Day Score System | 5 stories | FR7-11 | ✅ Done |
| Epic 5: User Personalization | 5 stories | FR21-25 | ✅ Done |
| Epic 6: Authentication & Accounts | 6 stories | FR26-31 | 🟡 Partial |
| Epic 7: Data Operations & Freshness | 4 stories | FR39-42 | ✅ Done |
| **Total** | **46 stories** | **33 FRs covered** | **~90%** |

**Removed from scope:**
- ~~Epic 7: Email Alerts (FR32-35)~~ - Not implementing
- ~~Epic 8: Multi-Language Support (FR36-38)~~ - Not implementing

---

## FR Coverage Verification

33 of 42 Functional Requirements are covered (removed 9 out-of-scope FRs):

- **FR1-FR6:** Epic 2 (Interactive Map Experience) ✅
- **FR7-FR11:** Epic 4 (Perfect Day Score System) ✅
- **FR12-FR20:** Epic 3 (Resort Information Display) ✅
- **FR21-FR25:** Epic 5 (User Personalization) ✅
- **FR26-FR31:** Epic 6 (Authentication & Accounts) 🟡
- **FR39-FR42:** Epic 7 (Data Operations & Freshness) ✅

**Out of Scope:**
- ~~FR32-FR35: Email Alerts~~
- ~~FR36-FR38: Multi-Language Support~~
