/**
 * Database types for PeakPick
 * These types match the Supabase schema defined in migrations
 */

// =============================================================================
// ENUM TYPES
// =============================================================================

export type CrowdLevel = 'low' | 'moderate' | 'high' | 'very_high';

export type ParkingStatus = 'available' | 'limited' | 'full';

// =============================================================================
// TABLE TYPES
// =============================================================================

/**
 * Resort - Core resort information
 */
export interface Resort {
  id: string;
  name: string;
  slug: string;
  latitude: number;
  longitude: number;
  altitude_min: number | null;
  altitude_max: number | null;
  country: string | null;
  region: string | null;
  skiresort_info_slug: string | null;
  website_url: string | null;
  webcam_url: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * ResortConditions - Current ski conditions (refreshed every ~6h)
 */
export interface ResortConditions {
  id: string;
  resort_id: string;
  snow_depth_base: number | null;
  snow_depth_summit: number | null;
  fresh_snow_24h: number;
  slopes_open_km: number;
  slopes_total_km: number;
  lifts_open: number;
  lifts_total: number;
  crowd_level: CrowdLevel;
  weather_condition: string | null;
  temperature_min: number | null;
  temperature_max: number | null;
  adult_ticket_price: number | null;
  parking_status: ParkingStatus;
  parking_price: number | null;
  updated_at: string;
}

// =============================================================================
// INSERT/UPDATE TYPES
// =============================================================================

export type ResortInsert = Omit<Resort, 'id' | 'created_at' | 'updated_at'>;
export type ResortUpdate = Partial<ResortInsert>;

export type ResortConditionsInsert = Omit<ResortConditions, 'id' | 'updated_at'>;
export type ResortConditionsUpdate = Partial<Omit<ResortConditionsInsert, 'resort_id'>>;

/**
 * ResortWeatherForecast - 7-day weather forecast from Open-Meteo
 */
export interface ResortWeatherForecast {
  id: string;
  resort_id: string;
  forecast_date: string;
  weather_code: number;
  weather_condition: string;
  temperature_min: number | null;
  temperature_max: number | null;
  precipitation_sum: number | null;
  snowfall_sum: number | null;
  wind_speed_max: number | null;
  wind_gusts_max: number | null;
  uv_index_max: number | null;
  fetched_at: string;
}

export type ResortWeatherForecastInsert = Omit<ResortWeatherForecast, 'id' | 'fetched_at'>;
export type ResortWeatherForecastUpdate = Partial<Omit<ResortWeatherForecastInsert, 'resort_id' | 'forecast_date'>>;

/**
 * UserPreferences - Stored priority configuration for authenticated users
 */
export interface UserPreferences {
  id: string;
  user_id: string;
  priorities: string[]; // FactorName[] stored as JSON
  language: string;
  created_at: string;
  updated_at: string;
}

export type UserPreferencesInsert = Omit<UserPreferences, 'id' | 'created_at' | 'updated_at'>;
export type UserPreferencesUpdate = Partial<Omit<UserPreferencesInsert, 'user_id'>>;

// =============================================================================
// JOINED TYPES
// =============================================================================

/**
 * Resort with its current conditions
 */
export interface ResortWithConditions extends Resort {
  conditions: ResortConditions | null;
  forecasts?: ResortWeatherForecast[];
}

// =============================================================================
// SUPABASE DATABASE TYPE
// =============================================================================

export interface Database {
  public: {
    Tables: {
      resorts: {
        Row: Resort;
        Insert: ResortInsert & { id?: string; created_at?: string; updated_at?: string };
        Update: ResortUpdate & { updated_at?: string };
        Relationships: [];
      };
      resort_conditions: {
        Row: ResortConditions;
        Insert: ResortConditionsInsert & { id?: string; updated_at?: string };
        Update: ResortConditionsUpdate & { updated_at?: string };
        Relationships: [
          {
            foreignKeyName: 'resort_conditions_resort_id_fkey';
            columns: ['resort_id'];
            referencedRelation: 'resorts';
            referencedColumns: ['id'];
          }
        ];
      };
      resort_weather_forecasts: {
        Row: ResortWeatherForecast;
        Insert: ResortWeatherForecastInsert & { id?: string; fetched_at?: string };
        Update: ResortWeatherForecastUpdate & { fetched_at?: string };
        Relationships: [
          {
            foreignKeyName: 'resort_weather_forecasts_resort_id_fkey';
            columns: ['resort_id'];
            referencedRelation: 'resorts';
            referencedColumns: ['id'];
          }
        ];
      };
      user_preferences: {
        Row: UserPreferences;
        Insert: UserPreferencesInsert & { id?: string; created_at?: string; updated_at?: string };
        Update: UserPreferencesUpdate & { updated_at?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      crowd_level: CrowdLevel;
      parking_status: ParkingStatus;
    };
    CompositeTypes: Record<string, never>;
  };
}
