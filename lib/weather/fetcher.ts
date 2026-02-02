/**
 * Fetches 7-day weather forecast from Open-Meteo API for a given location.
 */

import type { OpenMeteoResponse, ForecastDay } from './types';
import { wmoCodeToCondition } from './wmo-codes';

const OPEN_METEO_BASE = 'https://api.open-meteo.com/v1/forecast';

const DAILY_PARAMS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'precipitation_sum',
  'snowfall_sum',
  'wind_speed_10m_max',
  'wind_gusts_10m_max',
  'uv_index_max',
].join(',');

/**
 * Fetch a 7-day forecast for the given coordinates.
 * Returns an array of ForecastDay objects.
 */
export async function fetchForecast(lat: number, lng: number): Promise<ForecastDay[]> {
  const url = `${OPEN_METEO_BASE}?latitude=${lat}&longitude=${lng}&daily=${DAILY_PARAMS}&forecast_days=7&timezone=auto`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Open-Meteo API error: ${response.status} ${response.statusText}`);
  }

  const data: OpenMeteoResponse = await response.json();
  const { daily } = data;

  const days: ForecastDay[] = [];
  for (let i = 0; i < daily.time.length; i++) {
    days.push({
      date: daily.time[i],
      weatherCode: daily.weather_code[i],
      weatherCondition: wmoCodeToCondition(daily.weather_code[i]),
      temperatureMin: daily.temperature_2m_min[i],
      temperatureMax: daily.temperature_2m_max[i],
      precipitationSum: daily.precipitation_sum[i],
      snowfallSum: daily.snowfall_sum[i],
      windSpeedMax: daily.wind_speed_10m_max[i],
      windGustsMax: daily.wind_gusts_10m_max[i],
      uvIndexMax: daily.uv_index_max[i],
    });
  }

  return days;
}
