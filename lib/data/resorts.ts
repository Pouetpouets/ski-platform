import { createClient } from '@/lib/supabase/server';
import type { Resort, ResortConditions, ResortWithConditions, ResortWeatherForecast } from '@/lib/types/database';

/**
 * Fetch all resorts with their current conditions
 * Server-side function for use in Server Components
 */
export async function getResortsWithConditions(): Promise<ResortWithConditions[]> {
  const supabase = await createClient();

  // Fetch resorts
  const { data: resortsData, error: resortsError } = await supabase
    .from('resorts')
    .select('*')
    .order('name');

  if (resortsError || !resortsData) {
    console.error('Error fetching resorts:', resortsError);
    return [];
  }

  // Type assertion for resorts
  const resorts = resortsData as Resort[];

  // Fetch all conditions
  const { data: conditionsData, error: conditionsError } = await supabase
    .from('resort_conditions')
    .select('*');

  if (conditionsError) {
    console.error('Error fetching conditions:', conditionsError);
  }

  // Type assertion for conditions
  const conditions = (conditionsData ?? []) as ResortConditions[];

  // Create a map of resort_id -> conditions
  const conditionsMap = new Map<string, ResortConditions>();
  conditions.forEach((cond) => {
    conditionsMap.set(cond.resort_id, cond);
  });

  // Fetch weather forecasts (today and future)
  const today = new Date().toISOString().split('T')[0];
  const { data: forecastsData, error: forecastsError } = await supabase
    .from('resort_weather_forecasts')
    .select('*')
    .gte('forecast_date', today)
    .order('forecast_date');

  if (forecastsError) {
    console.error('Error fetching forecasts:', forecastsError);
  }

  const forecasts = (forecastsData ?? []) as ResortWeatherForecast[];

  // Create a map of resort_id -> forecasts[]
  const forecastsMap = new Map<string, ResortWeatherForecast[]>();
  forecasts.forEach((fc) => {
    const existing = forecastsMap.get(fc.resort_id) ?? [];
    existing.push(fc);
    forecastsMap.set(fc.resort_id, existing);
  });

  // Combine resorts with their conditions and forecasts
  return resorts.map((resort): ResortWithConditions => ({
    ...resort,
    conditions: conditionsMap.get(resort.id) ?? null,
    forecasts: forecastsMap.get(resort.id) ?? [],
  }));
}

/**
 * Fetch a single resort by slug with conditions
 */
export async function getResortBySlug(slug: string): Promise<ResortWithConditions | null> {
  const supabase = await createClient();

  // Fetch resort
  const { data: resortData, error: resortError } = await supabase
    .from('resorts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (resortError || !resortData) {
    console.error('Error fetching resort:', resortError);
    return null;
  }

  const resort = resortData as Resort;

  // Fetch conditions for this resort
  const { data: conditionsData, error: conditionsError } = await supabase
    .from('resort_conditions')
    .select('*')
    .eq('resort_id', resort.id)
    .single();

  if (conditionsError && conditionsError.code !== 'PGRST116') {
    console.error('Error fetching conditions:', conditionsError);
  }

  const conditions = conditionsData as ResortConditions | null;

  return {
    ...resort,
    conditions: conditions ?? null,
  };
}
