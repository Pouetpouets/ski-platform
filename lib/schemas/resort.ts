/**
 * Zod schemas for Resort data validation
 * These schemas provide runtime validation and TypeScript type inference
 */

import { z } from 'zod';

// =============================================================================
// ENUM SCHEMAS
// =============================================================================

export const CrowdLevelSchema = z.enum(['low', 'moderate', 'high', 'very_high']);
export type CrowdLevel = z.infer<typeof CrowdLevelSchema>;

export const ParkingStatusSchema = z.enum(['available', 'limited', 'full']);
export type ParkingStatus = z.infer<typeof ParkingStatusSchema>;

export const WeatherConditionSchema = z.enum([
  'sunny',
  'partly_cloudy',
  'cloudy',
  'snowing',
  'raining',
  'foggy',
]);
export type WeatherCondition = z.infer<typeof WeatherConditionSchema>;

// =============================================================================
// RESORT SCHEMA
// =============================================================================

export const ResortSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(100),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  altitude_min: z.number().int().positive().nullable(),
  altitude_max: z.number().int().positive().nullable(),
  country: z.string().nullable(),
  region: z.string().nullable(),
  skiresort_info_slug: z.string().nullable(),
  website_url: z.string().url().nullable(),
  webcam_url: z.string().url().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export type Resort = z.infer<typeof ResortSchema>;

// Insert schema - omit auto-generated fields
export const ResortInsertSchema = ResortSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export type ResortInsert = z.infer<typeof ResortInsertSchema>;

// Update schema - all fields optional
export const ResortUpdateSchema = ResortInsertSchema.partial();

export type ResortUpdate = z.infer<typeof ResortUpdateSchema>;

// =============================================================================
// RESORT CONDITIONS SCHEMA
// =============================================================================

// Base object schema (without refinements, used for deriving Insert/Update)
const ResortConditionsBaseSchema = z.object({
  id: z.string().uuid(),
  resort_id: z.string().uuid(),

  // Snow data
  snow_depth_base: z.number().int().nonnegative().nullable(),
  snow_depth_summit: z.number().int().nonnegative().nullable(),
  fresh_snow_24h: z.number().int().nonnegative().default(0),

  // Slopes (km) and lifts
  slopes_open_km: z.number().nonnegative(),
  slopes_total_km: z.number().positive(),
  lifts_open: z.number().int().nonnegative(),
  lifts_total: z.number().int().positive(),

  // Crowd level
  crowd_level: CrowdLevelSchema,

  // Weather
  weather_condition: WeatherConditionSchema.nullable(),
  temperature_min: z.number().min(-50).max(50).nullable(),
  temperature_max: z.number().min(-50).max(50).nullable(),

  // Pricing
  adult_ticket_price: z.number().positive().nullable(),

  // Parking
  parking_status: ParkingStatusSchema,
  parking_price: z.number().nonnegative().nullable(),

  // Timestamp
  updated_at: z.string().datetime(),
});

// Cross-field refinements for validation
type ConditionsBase = z.infer<typeof ResortConditionsBaseSchema>;

function addConditionsRefinements<T extends z.ZodType<ConditionsBase>>(schema: T) {
  return schema.refine(
    (data) => data.slopes_open_km <= data.slopes_total_km,
    { message: 'slopes_open_km cannot exceed slopes_total_km', path: ['slopes_open_km'] }
  ).refine(
    (data) => data.lifts_open <= data.lifts_total,
    { message: 'lifts_open cannot exceed lifts_total', path: ['lifts_open'] }
  ).refine(
    (data) => {
      if (data.temperature_min !== null && data.temperature_max !== null) {
        return data.temperature_min <= data.temperature_max;
      }
      return true;
    },
    { message: 'temperature_min cannot exceed temperature_max', path: ['temperature_min'] }
  );
}

// Full schema with cross-field validation
export const ResortConditionsSchema = addConditionsRefinements(ResortConditionsBaseSchema);

export type ResortConditions = z.infer<typeof ResortConditionsBaseSchema>;

// Insert schema (derived from base, no refinements needed for partial inserts)
export const ResortConditionsInsertSchema = ResortConditionsBaseSchema.omit({
  id: true,
  updated_at: true,
});

export type ResortConditionsInsert = z.infer<typeof ResortConditionsInsertSchema>;

// Update schema - omit resort_id (cannot change)
export const ResortConditionsUpdateSchema = ResortConditionsInsertSchema.omit({
  resort_id: true,
}).partial();

export type ResortConditionsUpdate = z.infer<typeof ResortConditionsUpdateSchema>;

// =============================================================================
// JOINED SCHEMAS
// =============================================================================

export const ResortWithConditionsSchema = ResortSchema.extend({
  conditions: ResortConditionsSchema.nullable(),
});

export type ResortWithConditions = z.infer<typeof ResortWithConditionsSchema>;

// =============================================================================
// VALIDATION HELPERS
// =============================================================================

/**
 * Validate resort data and return typed result
 */
export function validateResort(data: unknown): Resort {
  return ResortSchema.parse(data);
}

/**
 * Safely validate resort data, returning null on error
 */
export function safeValidateResort(data: unknown): Resort | null {
  const result = ResortSchema.safeParse(data);
  return result.success ? result.data : null;
}

/**
 * Validate conditions data and return typed result
 */
export function validateConditions(data: unknown): ResortConditions {
  return ResortConditionsSchema.parse(data);
}

/**
 * Safely validate conditions data, returning null on error
 */
export function safeValidateConditions(data: unknown): ResortConditions | null {
  const result = ResortConditionsSchema.safeParse(data);
  return result.success ? result.data : null;
}

/**
 * Validate resort with conditions
 */
export function validateResortWithConditions(data: unknown): ResortWithConditions {
  return ResortWithConditionsSchema.parse(data);
}

