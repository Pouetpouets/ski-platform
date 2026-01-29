# Ski Platform

**Perfect Day Score** - A decision-support web application for skiers facing "where should I ski today?" paralysis.

## Overview

Instead of checking 5+ websites and doing mental analysis, users see a Google Maps-style interface with nearby resorts displaying a **Perfect Day Score** - one percentage that captures snow quality, crowd levels, weather, and more, weighted by each user's priorities.

**Key Differentiator:** Decision engine, not data dump. We recommend, we don't just inform.

## Target Users

Skiers within 2 hours of French Alps resorts (Lyon, Grenoble, Annecy, Geneva region) who ski 8-25+ days per season.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **UI Components:** shadcn/ui + Tailwind CSS v4
- **Maps:** Mapbox GL JS
- **Backend:** Supabase (Auth + PostgreSQL + Edge Functions)
- **Email:** Resend
- **Hosting:** Vercel
- **i18n:** next-intl (FR/EN)

## Features

### MVP Scope
- Interactive map centered on user location
- Perfect Day Score (0-100%) for each resort
- Resort detail cards with conditions, weather, pricing
- Priority configuration (drag-and-drop)
- Social login (Google/Apple)
- Weekly email alerts
- French Alps coverage (10-15 resorts)
- Multi-language support (French/English)

### Score Factors
1. Snow quality (depth, freshness)
2. Crowd level (predictions)
3. Weather (sun, temperature)
4. Lift ticket price
5. Distance from user
6. Parking availability

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Pouetpouets/ski-platform.git
cd ski-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and Mapbox credentials

# Run development server
npm run dev
```

## Project Structure

```
ski-platform/
├── app/                    # Next.js App Router pages
├── components/             # React components
│   ├── ui/                 # shadcn/ui components
│   ├── map/                # Map-related components
│   └── resort/             # Resort-related components
├── lib/                    # Utilities and helpers
│   ├── supabase/           # Supabase client
│   ├── scoring/            # Perfect Day Score algorithm
│   └── i18n/               # Internationalization
├── messages/               # Translation files (fr.json, en.json)
└── types/                  # TypeScript type definitions
```

## Development Status

This project is in active development. See the [project board](https://github.com/Pouetpouets/ski-platform/projects) for current status.

## License

MIT
