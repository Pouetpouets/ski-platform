-- Create resort_weather_forecasts table for Open-Meteo 7-day forecasts
CREATE TABLE resort_weather_forecasts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resort_id UUID NOT NULL REFERENCES resorts(id) ON DELETE CASCADE,
  forecast_date DATE NOT NULL,
  weather_code INTEGER NOT NULL,
  weather_condition TEXT NOT NULL,
  temperature_min DECIMAL(4,1),
  temperature_max DECIMAL(4,1),
  precipitation_sum DECIMAL(6,1),
  snowfall_sum DECIMAL(6,1),
  wind_speed_max DECIMAL(5,1),
  wind_gusts_max DECIMAL(5,1),
  uv_index_max DECIMAL(3,1),
  fetched_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resort_id, forecast_date)
);

-- Index for querying forecasts by date range
CREATE INDEX idx_weather_forecasts_date ON resort_weather_forecasts(forecast_date);
CREATE INDEX idx_weather_forecasts_resort ON resort_weather_forecasts(resort_id);

-- Enable RLS
ALTER TABLE resort_weather_forecasts ENABLE ROW LEVEL SECURITY;

-- Public read access (same pattern as resorts and resort_conditions)
CREATE POLICY "Public read access for weather forecasts"
  ON resort_weather_forecasts
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- No insert/update/delete policies for anon - service role bypasses RLS
