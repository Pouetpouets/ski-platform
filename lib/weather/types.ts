/**
 * Types for Open-Meteo weather forecast integration
 */

export interface OpenMeteoDailyResponse {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  snowfall_sum: number[];
  wind_speed_10m_max: number[];
  wind_gusts_10m_max: number[];
  uv_index_max: number[];
}

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  timezone: string;
  daily: OpenMeteoDailyResponse;
}

export interface ForecastDay {
  date: string; // YYYY-MM-DD
  weatherCode: number;
  weatherCondition: string;
  temperatureMin: number;
  temperatureMax: number;
  precipitationSum: number;
  snowfallSum: number;
  windSpeedMax: number;
  windGustsMax: number;
  uvIndexMax: number;
}

export interface ForecastFetchResult {
  success: { resortId: string; resortName: string }[];
  failed: { resortId: string; resortName: string; error: string }[];
}
