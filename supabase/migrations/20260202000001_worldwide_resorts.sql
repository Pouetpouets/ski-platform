-- Migration: Add worldwide resort support
-- Adds country, region, skiresort_info_slug to resorts table
-- Renames runs_open/runs_total to slopes_open_km/slopes_total_km (decimal)

-- Add new columns to resorts
ALTER TABLE resorts ADD COLUMN country TEXT;
ALTER TABLE resorts ADD COLUMN region TEXT;
ALTER TABLE resorts ADD COLUMN skiresort_info_slug TEXT;
CREATE INDEX idx_resorts_country ON resorts(country);

-- Rename run counts to slopes in km (skiresort.info uses km)
ALTER TABLE resort_conditions RENAME COLUMN runs_open TO slopes_open_km;
ALTER TABLE resort_conditions RENAME COLUMN runs_total TO slopes_total_km;
ALTER TABLE resort_conditions ALTER COLUMN slopes_open_km TYPE DECIMAL(6,1);
ALTER TABLE resort_conditions ALTER COLUMN slopes_total_km TYPE DECIMAL(6,1);
