-- Migration: Create Ski Platform Database Schema
-- Description: Creates resorts and resort_conditions tables with RLS policies

-- =============================================================================
-- ENUM TYPES
-- =============================================================================

-- Crowd level enum for resort conditions
CREATE TYPE crowd_level AS ENUM ('low', 'moderate', 'high', 'very_high');

-- Parking status enum
CREATE TYPE parking_status AS ENUM ('available', 'limited', 'full');

-- =============================================================================
-- TABLES
-- =============================================================================

-- Resorts table: Core resort information
CREATE TABLE resorts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  altitude_min INTEGER,
  altitude_max INTEGER,
  website_url TEXT,
  webcam_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Resort conditions table: Current ski conditions (refreshed every ~6h)
CREATE TABLE resort_conditions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resort_id UUID NOT NULL REFERENCES resorts(id) ON DELETE CASCADE,
  snow_depth_base INTEGER,
  snow_depth_summit INTEGER,
  fresh_snow_24h INTEGER DEFAULT 0,
  runs_open INTEGER DEFAULT 0,
  runs_total INTEGER DEFAULT 0,
  lifts_open INTEGER DEFAULT 0,
  lifts_total INTEGER DEFAULT 0,
  crowd_level crowd_level DEFAULT 'moderate',
  weather_condition TEXT,
  temperature_min DECIMAL(4, 1),
  temperature_max DECIMAL(4, 1),
  adult_ticket_price DECIMAL(6, 2),
  parking_status parking_status DEFAULT 'available',
  parking_price DECIMAL(6, 2),
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,

  -- Ensure only one conditions record per resort (latest)
  UNIQUE(resort_id)
);

-- =============================================================================
-- INDEXES
-- =============================================================================

-- Index for geographic queries
CREATE INDEX idx_resorts_coordinates ON resorts(latitude, longitude);

-- Index for resort conditions lookups
CREATE INDEX idx_resort_conditions_resort_id ON resort_conditions(resort_id);

-- Index for freshness queries
CREATE INDEX idx_resort_conditions_updated_at ON resort_conditions(updated_at);

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for resorts table
CREATE TRIGGER update_resorts_updated_at
  BEFORE UPDATE ON resorts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger for resort_conditions table
CREATE TRIGGER update_resort_conditions_updated_at
  BEFORE UPDATE ON resort_conditions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Enable RLS on tables
ALTER TABLE resorts ENABLE ROW LEVEL SECURITY;
ALTER TABLE resort_conditions ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read resorts (public data)
CREATE POLICY "Anyone can view resorts"
  ON resorts
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Policy: Anyone can read resort conditions (public data)
CREATE POLICY "Anyone can view resort conditions"
  ON resort_conditions
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Note: INSERT/UPDATE/DELETE are implicitly denied for anon/authenticated
-- since no write policies exist for those roles.
-- Admin operations use service_role key which bypasses RLS entirely.

-- =============================================================================
-- COMMENTS
-- =============================================================================

COMMENT ON TABLE resorts IS 'Ski resorts in the French Alps region';
COMMENT ON TABLE resort_conditions IS 'Current conditions for each resort, updated every ~6 hours';
COMMENT ON COLUMN resorts.slug IS 'URL-friendly identifier for SEO';
COMMENT ON COLUMN resort_conditions.crowd_level IS 'Predicted crowd level: low, moderate, high, very_high';
COMMENT ON COLUMN resort_conditions.fresh_snow_24h IS 'Fresh snow in the last 24 hours (cm)';
