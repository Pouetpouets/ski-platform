-- Seed Data for French Alps Resorts
-- This script populates the database with 12 major French Alps ski resorts
-- Run with: supabase db reset (which runs migrations + seed)

-- =============================================================================
-- RESORTS
-- =============================================================================

INSERT INTO resorts (id, name, slug, latitude, longitude, altitude_min, altitude_max, website_url, webcam_url) VALUES
  -- Savoie Region
  ('550e8400-e29b-41d4-a716-446655440001', 'Les Arcs', 'les-arcs', 45.5708, 6.8281, 1200, 3226, 'https://www.lesarcs.com', 'https://www.lesarcs.com/webcams.html'),
  ('550e8400-e29b-41d4-a716-446655440002', 'La Plagne', 'la-plagne', 45.5058, 6.6789, 1250, 3250, 'https://www.la-plagne.com', 'https://www.la-plagne.com/webcams.html'),
  ('550e8400-e29b-41d4-a716-446655440003', 'Val d''Isère', 'val-disere', 45.4478, 6.9806, 1550, 3456, 'https://www.valdisere.com', 'https://www.valdisere.com/webcams/'),
  ('550e8400-e29b-41d4-a716-446655440004', 'Tignes', 'tignes', 45.4692, 6.9067, 1550, 3456, 'https://www.tignes.net', 'https://www.tignes.net/webcams'),
  ('550e8400-e29b-41d4-a716-446655440005', 'Courchevel', 'courchevel', 45.4147, 6.6347, 1300, 2738, 'https://www.courchevel.com', 'https://www.courchevel.com/webcams/'),
  ('550e8400-e29b-41d4-a716-446655440006', 'Méribel', 'meribel', 45.3967, 6.5656, 1400, 2952, 'https://www.meribel.net', 'https://www.meribel.net/webcams.html'),

  -- Haute-Savoie Region
  ('550e8400-e29b-41d4-a716-446655440007', 'Chamonix', 'chamonix', 45.9237, 6.8694, 1035, 3842, 'https://www.chamonix.com', 'https://www.chamonix.com/webcams'),
  ('550e8400-e29b-41d4-a716-446655440008', 'Megève', 'megeve', 45.8567, 6.6175, 1113, 2350, 'https://www.megeve.com', 'https://www.megeve.com/webcams/'),
  ('550e8400-e29b-41d4-a716-446655440009', 'La Clusaz', 'la-clusaz', 45.9047, 6.4236, 1100, 2600, 'https://www.laclusaz.com', 'https://www.laclusaz.com/webcams.html'),
  ('550e8400-e29b-41d4-a716-446655440010', 'Le Grand-Bornand', 'le-grand-bornand', 45.9419, 6.4297, 1000, 2100, 'https://www.legrandbornand.com', 'https://www.legrandbornand.com/webcams.html'),

  -- Isère Region
  ('550e8400-e29b-41d4-a716-446655440011', 'Alpe d''Huez', 'alpe-dhuez', 45.0922, 6.0686, 1250, 3330, 'https://www.alpedhuez.com', 'https://www.alpedhuez.com/webcams/'),
  ('550e8400-e29b-41d4-a716-446655440012', 'Les Deux Alpes', 'les-deux-alpes', 45.0167, 6.1222, 1300, 3600, 'https://www.les2alpes.com', 'https://www.les2alpes.com/webcams/')
ON CONFLICT (slug) DO NOTHING;

-- =============================================================================
-- RESORT CONDITIONS (Sample data for development)
-- =============================================================================

INSERT INTO resort_conditions (resort_id, snow_depth_base, snow_depth_summit, fresh_snow_24h, runs_open, runs_total, lifts_open, lifts_total, crowd_level, weather_condition, temperature_min, temperature_max, adult_ticket_price, parking_status, parking_price) VALUES
  -- Les Arcs - Excellent conditions
  ('550e8400-e29b-41d4-a716-446655440001', 120, 180, 15, 98, 106, 45, 51, 'low', 'sunny', -8, -2, 59.00, 'available', 15.00),

  -- La Plagne - Good conditions
  ('550e8400-e29b-41d4-a716-446655440002', 100, 165, 5, 115, 130, 65, 74, 'moderate', 'partly_cloudy', -6, 0, 57.00, 'available', 12.00),

  -- Val d'Isère - Premium resort, busy
  ('550e8400-e29b-41d4-a716-446655440003', 150, 200, 20, 75, 79, 38, 42, 'high', 'snowing', -12, -5, 68.00, 'limited', 20.00),

  -- Tignes - Great snow, moderate crowds
  ('550e8400-e29b-41d4-a716-446655440004', 145, 195, 18, 68, 76, 35, 39, 'moderate', 'cloudy', -10, -4, 65.00, 'available', 18.00),

  -- Courchevel - Luxury resort, very busy
  ('550e8400-e29b-41d4-a716-446655440005', 85, 140, 8, 95, 120, 52, 58, 'very_high', 'sunny', -5, 2, 70.00, 'full', 25.00),

  -- Méribel - Part of 3 Vallées, good conditions
  ('550e8400-e29b-41d4-a716-446655440006', 90, 150, 10, 78, 85, 38, 42, 'high', 'partly_cloudy', -4, 1, 62.00, 'limited', 20.00),

  -- Chamonix - Legendary, varied conditions
  ('550e8400-e29b-41d4-a716-446655440007', 60, 180, 25, 65, 82, 40, 49, 'moderate', 'snowing', -15, -3, 58.00, 'available', 10.00),

  -- Megève - Charming village, less snow
  ('550e8400-e29b-41d4-a716-446655440008', 55, 95, 3, 180, 215, 55, 67, 'moderate', 'sunny', -3, 4, 52.00, 'available', 8.00),

  -- La Clusaz - Family friendly, good value
  ('550e8400-e29b-41d4-a716-446655440009', 70, 130, 12, 80, 84, 42, 49, 'low', 'partly_cloudy', -6, 1, 48.00, 'available', 6.00),

  -- Le Grand-Bornand - Quiet, authentic
  ('550e8400-e29b-41d4-a716-446655440010', 65, 110, 8, 40, 44, 23, 27, 'low', 'cloudy', -4, 2, 42.00, 'available', 5.00),

  -- Alpe d'Huez - Sunny, great views
  ('550e8400-e29b-41d4-a716-446655440011', 95, 170, 6, 105, 115, 65, 75, 'moderate', 'sunny', -7, 1, 54.00, 'limited', 12.00),

  -- Les Deux Alpes - Glacier skiing, reliable snow
  ('550e8400-e29b-41d4-a716-446655440012', 110, 200, 10, 70, 89, 42, 47, 'moderate', 'partly_cloudy', -9, -1, 56.00, 'available', 10.00)
ON CONFLICT (resort_id) DO UPDATE SET
  snow_depth_base = EXCLUDED.snow_depth_base,
  snow_depth_summit = EXCLUDED.snow_depth_summit,
  fresh_snow_24h = EXCLUDED.fresh_snow_24h,
  runs_open = EXCLUDED.runs_open,
  runs_total = EXCLUDED.runs_total,
  lifts_open = EXCLUDED.lifts_open,
  lifts_total = EXCLUDED.lifts_total,
  crowd_level = EXCLUDED.crowd_level,
  weather_condition = EXCLUDED.weather_condition,
  temperature_min = EXCLUDED.temperature_min,
  temperature_max = EXCLUDED.temperature_max,
  adult_ticket_price = EXCLUDED.adult_ticket_price,
  parking_status = EXCLUDED.parking_status,
  parking_price = EXCLUDED.parking_price,
  updated_at = NOW();
