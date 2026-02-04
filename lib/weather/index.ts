/**
 * Weather forecast orchestrator.
 * Loads resorts, fetches forecasts from Open-Meteo in parallel batches,
 * upserts to Supabase, and cleans stale rows.
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database, Resort } from '@/lib/types/database';
import type { ForecastFetchResult } from './types';
import { fetchForecast } from './fetcher';

const CONCURRENCY = 5;

/**
 * Fetch forecasts for all resorts and upsert to the database.
 */
export async function fetchAllForecasts(
  supabase: SupabaseClient<Database>
): Promise<ForecastFetchResult> {
  // Load all resorts
  const { data: resortsData, error: resortsError } = await supabase
    .from('resorts')
    .select('*');

  if (resortsError || !resortsData) {
    throw new Error(`Failed to load resorts: ${resortsError?.message ?? 'no data'}`);
  }

  const resorts = resortsData as unknown as Resort[];

  const result: ForecastFetchResult = { success: [], failed: [] };

  // Process in batches of CONCURRENCY
  for (let i = 0; i < resorts.length; i += CONCURRENCY) {
    const batch = resorts.slice(i, i + CONCURRENCY);

    const promises = batch.map(async (resort) => {
      try {
        const days = await fetchForecast(resort.latitude, resort.longitude);

        // Upsert each day
        const rows = days.map((day) => ({
          resort_id: resort.id,
          forecast_date: day.date,
          weather_code: day.weatherCode,
          weather_condition: day.weatherCondition,
          temperature_min: day.temperatureMin,
          temperature_max: day.temperatureMax,
          precipitation_sum: day.precipitationSum,
          snowfall_sum: day.snowfallSum,
          wind_speed_max: day.windSpeedMax,
          wind_gusts_max: day.windGustsMax,
          uv_index_max: day.uvIndexMax,
          fetched_at: new Date().toISOString(),
        }));

        const { error: upsertError } = await supabase
          .from('resort_weather_forecasts')
          .upsert(rows as any, { onConflict: 'resort_id,forecast_date' });

        if (upsertError) {
          throw new Error(upsertError.message);
        }

        result.success.push({ resortId: resort.id, resortName: resort.name });
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        result.failed.push({ resortId: resort.id, resortName: resort.name, error: message });
      }
    });

    await Promise.all(promises);
  }

  // Clean stale rows (older than today)
  const today = new Date().toISOString().split('T')[0];
  await supabase
    .from('resort_weather_forecasts')
    .delete()
    .lt('forecast_date', today);

  return result;
}
