---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments:
  - '_bmad-output/analysis/brainstorming-session-2026-01-29.md'
date: 2026-01-29
author: Pouetpouets
project_name: Ski Platform
---

# Product Brief: Ski Platform

## Executive Summary

**Ski Platform** is a decision-support platform for skiers facing "where should I ski today?" paralysis. In a landscape where information is fragmented across dozens of resort websites with inconsistent layouts, skiers waste time hunting for data and default to familiar resorts - missing perfect days elsewhere.

Our solution: a Google Maps-style interface showing nearby resorts with a **Perfect Day Score** - one number that captures snow quality, crowd levels, weather, and more based on each user's priorities. In a few clicks, skiers get a clear recommendation and go have an incredible day.

**The success metric that matters:** After their ski day, users think "Damn, that was really an amazing day."

---

## Core Vision

### Problem Statement

Skiers near multiple resorts face decision paralysis every ski day. Information is scattered across 20+ websites, each with different layouts and data presentation. Finding snow conditions, weather, prices, and crowd levels requires navigating multiple pages and doing manual mental analysis.

### Problem Impact

- **Time wasted:** Hours spent researching instead of skiing
- **Frustration:** Inconsistent UX across every platform
- **Missed opportunities:** Skiers default to familiar resorts, missing perfect days at undiscovered stations
- **Suboptimal decisions:** Without easy comparison, people make safe choices, not optimal ones

### Why Existing Solutions Fall Short

**Skiinfo** and similar platforms aggregate data but fail to solve the core problem:
- Information overload instead of clear recommendations
- No direct guidance - users must analyze everything themselves
- Multiple pages to navigate for a single decision
- No personalization based on individual priorities
- "Here's all the data" instead of "Here's your best option"

### Proposed Solution

A radically simple platform with:
- **Google Maps-style radar** - User position at center, resorts around with condition indicators
- **Perfect Day Score** - One percentage that tells the whole story, weighted by user priorities
- **Progressive disclosure** - Score first, details on demand
- **Minimal onboarding** - GPS permission → instant map browsing. Social login (Google/Apple) for personalization + email alerts
- **Direct recommendation** - "This is your best option today"

### Key Differentiators

| Differentiator | Why It Matters |
|----------------|----------------|
| **Decision engine, not data dump** | Recommends, doesn't just inform |
| **Perfect Day Score** | One number = instant clarity |
| **Personalized priorities** | Your criteria, your ranking |
| **Discovery mode** | Surfaces stations you'd never find |
| **Low friction** | Social login, instant value |

---

## Target Users

### Primary Users

**Geographic Profile:** Skiers within 2 hours of Alpine resorts (Lyon, Grenoble, Annecy, Geneva region)

**Behavior:** Regular skiers (8-25+ days/season) who make decisions the evening before or morning of

**User Segments:**

| Segment | Priority Profile | Key Need |
|---------|-----------------|----------|
| Budget Skier | Price first | Best value for money |
| Powder Hunter | Snow quality first | Fresh powder, best conditions |
| Crowd Avoider | Low crowds first | Peaceful, uncrowded experience |
| Family Planner | Balance of factors | Good conditions + manageable logistics |

#### Persona 1: Lucas - The Powder Hunter

| Attribute | Detail |
|-----------|--------|
| **Profile** | 32, Lyon, 15-20 days/season |
| **Priority** | Snow quality > Weather > Crowds |
| **Pain** | Checks 5+ sites, misses perfect powder at unknown resorts |
| **Success** | "Fresh powder all morning at a resort I'd never tried" |

#### Persona 2: Sophie - The Budget Family Skier

| Attribute | Detail |
|-----------|--------|
| **Profile** | 41, Grenoble, 8-10 days/season with kids |
| **Priority** | Price > Distance > Crowds |
| **Pain** | 30+ minutes comparing prices, defaults to same resort |
| **Success** | "Great deal at a family-friendly resort I didn't know" |

#### Persona 3: Marc - The Crowd Avoider

| Attribute | Detail |
|-----------|--------|
| **Profile** | 45, Annecy, 25+ days/season, flexible schedule |
| **Priority** | Low crowds > Snow quality > Weather |
| **Pain** | Arrives to packed parking and long queues unexpectedly |
| **Success** | "Empty slopes when I expected crowds" |

### Secondary Users

N/A for MVP - focus on direct skier users only.

### User Journey

| Stage | Experience |
|-------|------------|
| **Discovery** | Word of mouth, friend recommendation, search |
| **Onboarding** | GPS permission → instant map. Social login for full features. |
| **First Use** | See score, tap resort, check webcam, decide in 2 min |
| **Aha! Moment** | "It told me where to go, and it was perfect" |
| **Routine** | Starting point for every ski day decision |

---

## Success Metrics

### User Success Metrics

| Metric | What It Measures | Why It Matters |
|--------|------------------|----------------|
| **Return Visits** | Users coming back during ski season | Platform is useful, not a one-time curiosity |
| **Priority Configuration** | Users customizing their ranking | Engaged users who trust the system |
| **Time to Decision** | Minutes from opening app to decision | We're saving time vs. current alternatives |
| **Resort Discovery** | Users selecting resorts they've never visited | Platform unlocks new experiences |

**Success Signal:** Users return multiple times per month during ski season and configure their priorities.

### Business Objectives

| Timeframe | Objective |
|-----------|-----------|
| **Launch** | Validate that users find value - qualitative feedback |
| **3 months** | Growing MAU with positive retention trend |
| **12 months** | Sustainable MAU growth + monetization validation |

### Key Performance Indicators

| KPI | Description | Target |
|-----|-------------|--------|
| **Monthly Active Users (MAU)** | Core growth metric | Track and grow |
| **Return Rate** | % of users who come back within 30 days | Directional: >40% |
| **Priority Config Rate** | % of users who customize priorities | Directional: >20% |
| **Email Subscribers** | Users opting into weekly digest | Track for V1 monetization |
| **Affiliate Click-Through** | Clicks on partner resort deals | Track for revenue potential |

**MVP Approach:** Launch, measure, learn. Refine targets based on real user behavior.

---

## MVP Scope

### Core Features (V1)

| Feature | Description |
|---------|-------------|
| **Desktop Web App** | Primary platform for V1 |
| **French Alps Coverage** | Geographic focus for MVP |
| **Perfect Day Score** | Weighted algorithm (Snow 35%, Crowd 30%, Weather 20%, Secondary 15%) |
| **Google Maps Radar UI** | User-centered map with resort markers and scores |
| **Webcam Integration** | Visual condition verification |
| **Priority Configuration** | Drag-and-drop factor ranking |
| **Multi-Language Support** | French + English minimum |
| **Social Auth (Google/Apple)** | Email collection for weekly alerts |
| **Weekly Email Alerts** | Personalized weekend recommendations |

### Data Architecture

| Data Type | Source | Method |
|-----------|--------|--------|
| Snow conditions | Skiinfo | Web scraping |
| Open runs | Skiinfo | Web scraping |
| Weather/sun | Météo France | API |
| Distance/traffic | Google Maps | API |
| Prices | Skiinfo | Web scraping |
| Webcams | Skiinfo/Resorts | Scrape/embed |
| Crowd predictions | Holiday calendar | Internal logic |

### Out of Scope for MVP

| Feature | Deferred To | Rationale |
|---------|-------------|-----------|
| Mobile app | V2 | Validate concept on desktop first |
| Implicit learning | V2 | Start with manual personalization |
| Historical data | V2 | Focus on live conditions |
| Complex filters | V2 | Keep UX simple |
| Affiliate deals | V2 | Focus on user value before monetization |

### MVP Success Criteria

| Criteria | Validation |
|----------|------------|
| Users can make ski decisions in <2 minutes | Time tracking |
| Users return multiple times per season | Retention metrics |
| Users configure their priorities | Config rate >20% |
| Users subscribe to weekly alerts | Email signup rate |
| Positive qualitative feedback | User interviews |

### Future Vision (V2+)

| Phase | Features |
|-------|----------|
| **V2** | Mobile app, implicit learning, affiliate monetization |
| **V3** | Historical insights, expand to Pyrénées, Swiss Alps |
| **Long-term** | Europe-wide coverage, ski trip planning, season pass advisor |

---
