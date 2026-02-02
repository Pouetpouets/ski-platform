/**
 * Maps scraped data to database condition updates
 */

import type { ResortConditionsUpdate } from '@/lib/types/database';
import type { ScrapedConditions } from './types';

const WEATHER_MAP: Record<string, string> = {
  'sunny': 'sunny',
  'clear': 'sunny',
  'sun': 'sunny',
  'fair': 'sunny',
  'partly cloudy': 'partly_cloudy',
  'partly sunny': 'partly_cloudy',
  'mixed': 'partly_cloudy',
  'cloudy': 'cloudy',
  'overcast': 'cloudy',
  'clouds': 'cloudy',
  'snow': 'snowing',
  'snowing': 'snowing',
  'snowfall': 'snowing',
  'light snow': 'snowing',
  'heavy snow': 'snowing',
  'rain': 'raining',
  'raining': 'raining',
  'drizzle': 'raining',
  'light rain': 'raining',
  'fog': 'foggy',
  'foggy': 'foggy',
  'mist': 'foggy',
};

/**
 * Normalize a raw weather string to our weather_condition enum
 */
export function normalizeWeather(raw: string | null): string | null {
  if (!raw) return null;
  const lower = raw.toLowerCase().trim();

  // Direct match
  if (WEATHER_MAP[lower]) return WEATHER_MAP[lower];

  // Partial match
  for (const [key, value] of Object.entries(WEATHER_MAP)) {
    if (lower.includes(key)) return value;
  }

  return null;
}

/**
 * Map scraped conditions to a database update object
 * Only includes fields that have non-null values
 */
export function mapToConditionsUpdate(scraped: ScrapedConditions): ResortConditionsUpdate {
  const update: ResortConditionsUpdate = {};

  if (scraped.snowDepthBase !== null) {
    update.snow_depth_base = Math.round(scraped.snowDepthBase);
  }
  if (scraped.snowDepthSummit !== null) {
    update.snow_depth_summit = Math.round(scraped.snowDepthSummit);
  }
  if (scraped.freshSnow24h !== null) {
    update.fresh_snow_24h = Math.round(scraped.freshSnow24h);
  }
  if (scraped.slopesOpenKm !== null) {
    update.slopes_open_km = Math.round(scraped.slopesOpenKm * 10) / 10;
  }
  if (scraped.slopesTotalKm !== null) {
    update.slopes_total_km = Math.round(scraped.slopesTotalKm * 10) / 10;
  }
  if (scraped.liftsOpen !== null) {
    update.lifts_open = scraped.liftsOpen;
  }
  if (scraped.liftsTotal !== null) {
    update.lifts_total = scraped.liftsTotal;
  }

  const weather = normalizeWeather(scraped.weatherCondition);
  if (weather) {
    update.weather_condition = weather;
  }

  if (scraped.temperature !== null) {
    update.temperature_min = scraped.temperature;
    update.temperature_max = scraped.temperature;
  }

  if (scraped.adultTicketPrice !== null) {
    update.adult_ticket_price = scraped.adultTicketPrice;
  }

  return update;
}
