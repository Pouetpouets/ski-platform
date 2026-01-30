import { describe, expect, it } from 'vitest';
import {
  ResortSchema,
  ResortInsertSchema,
  ResortConditionsSchema,
  ResortConditionsInsertSchema,
  CrowdLevelSchema,
  ParkingStatusSchema,
  WeatherConditionSchema,
  validateResort,
  safeValidateResort,
  validateConditions,
  safeValidateConditions,
  isInFrenchAlps,
  FRENCH_ALPS_BOUNDS,
  type Resort,
  type ResortConditions,
} from '@/lib/schemas/resort';

describe('Zod Schemas', () => {
  describe('CrowdLevelSchema', () => {
    it('should accept valid crowd levels', () => {
      expect(CrowdLevelSchema.parse('low')).toBe('low');
      expect(CrowdLevelSchema.parse('moderate')).toBe('moderate');
      expect(CrowdLevelSchema.parse('high')).toBe('high');
      expect(CrowdLevelSchema.parse('very_high')).toBe('very_high');
    });

    it('should reject invalid crowd levels', () => {
      expect(() => CrowdLevelSchema.parse('medium')).toThrow();
      expect(() => CrowdLevelSchema.parse('')).toThrow();
    });
  });

  describe('ParkingStatusSchema', () => {
    it('should accept valid parking statuses', () => {
      expect(ParkingStatusSchema.parse('available')).toBe('available');
      expect(ParkingStatusSchema.parse('limited')).toBe('limited');
      expect(ParkingStatusSchema.parse('full')).toBe('full');
    });

    it('should reject invalid parking statuses', () => {
      expect(() => ParkingStatusSchema.parse('empty')).toThrow();
    });
  });

  describe('WeatherConditionSchema', () => {
    it('should accept valid weather conditions', () => {
      expect(WeatherConditionSchema.parse('sunny')).toBe('sunny');
      expect(WeatherConditionSchema.parse('snowing')).toBe('snowing');
      expect(WeatherConditionSchema.parse('partly_cloudy')).toBe('partly_cloudy');
    });
  });

  describe('ResortSchema', () => {
    const validResort: Resort = {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Les Arcs',
      slug: 'les-arcs',
      latitude: 45.5708,
      longitude: 6.8281,
      altitude_min: 1200,
      altitude_max: 3226,
      website_url: 'https://www.lesarcs.com',
      webcam_url: 'https://www.lesarcs.com/webcams.html',
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
    };

    it('should validate a complete resort', () => {
      expect(ResortSchema.parse(validResort)).toEqual(validResort);
    });

    it('should require valid UUID for id', () => {
      expect(() =>
        ResortSchema.parse({ ...validResort, id: 'not-a-uuid' })
      ).toThrow();
    });

    it('should validate latitude range (-90 to 90)', () => {
      expect(() =>
        ResortSchema.parse({ ...validResort, latitude: 91 })
      ).toThrow();
      expect(() =>
        ResortSchema.parse({ ...validResort, latitude: -91 })
      ).toThrow();
    });

    it('should validate longitude range (-180 to 180)', () => {
      expect(() =>
        ResortSchema.parse({ ...validResort, longitude: 181 })
      ).toThrow();
      expect(() =>
        ResortSchema.parse({ ...validResort, longitude: -181 })
      ).toThrow();
    });

    it('should validate slug format (lowercase alphanumeric with hyphens)', () => {
      expect(() =>
        ResortSchema.parse({ ...validResort, slug: 'Les Arcs' })
      ).toThrow();
      expect(() =>
        ResortSchema.parse({ ...validResort, slug: 'les_arcs' })
      ).toThrow();
    });

    it('should allow nullable altitude values', () => {
      const result = ResortSchema.parse({
        ...validResort,
        altitude_min: null,
        altitude_max: null,
      });
      expect(result.altitude_min).toBeNull();
      expect(result.altitude_max).toBeNull();
    });

    it('should validate URLs', () => {
      expect(() =>
        ResortSchema.parse({ ...validResort, website_url: 'not-a-url' })
      ).toThrow();
    });
  });

  describe('ResortInsertSchema', () => {
    it('should not require id, created_at, updated_at', () => {
      const insertData = {
        name: 'Les Arcs',
        slug: 'les-arcs',
        latitude: 45.5708,
        longitude: 6.8281,
        altitude_min: 1200,
        altitude_max: 3226,
        website_url: 'https://www.lesarcs.com',
        webcam_url: null,
      };
      const result = ResortInsertSchema.parse(insertData);
      expect(result.name).toBe('Les Arcs');
      expect((result as Record<string, unknown>)['id']).toBeUndefined();
    });
  });

  describe('ResortConditionsSchema', () => {
    const validConditions: ResortConditions = {
      id: '550e8400-e29b-41d4-a716-446655440099',
      resort_id: '550e8400-e29b-41d4-a716-446655440001',
      snow_depth_base: 120,
      snow_depth_summit: 180,
      fresh_snow_24h: 15,
      runs_open: 98,
      runs_total: 106,
      lifts_open: 45,
      lifts_total: 51,
      crowd_level: 'low',
      weather_condition: 'sunny',
      temperature_min: -8,
      temperature_max: -2,
      adult_ticket_price: 59.0,
      parking_status: 'available',
      parking_price: 15.0,
      updated_at: '2024-01-01T00:00:00.000Z',
    };

    it('should validate complete conditions', () => {
      expect(ResortConditionsSchema.parse(validConditions)).toEqual(validConditions);
    });

    it('should require non-negative snow depths', () => {
      expect(() =>
        ResortConditionsSchema.parse({ ...validConditions, snow_depth_base: -10 })
      ).toThrow();
    });

    it('should validate temperature range (-50 to 50)', () => {
      expect(() =>
        ResortConditionsSchema.parse({ ...validConditions, temperature_min: -60 })
      ).toThrow();
      expect(() =>
        ResortConditionsSchema.parse({ ...validConditions, temperature_max: 60 })
      ).toThrow();
    });

    it('should require positive runs_total', () => {
      expect(() =>
        ResortConditionsSchema.parse({ ...validConditions, runs_total: 0 })
      ).toThrow();
    });

    it('should allow non-negative runs_open (can be 0 if resort closed)', () => {
      const result = ResortConditionsSchema.parse({ ...validConditions, runs_open: 0 });
      expect(result.runs_open).toBe(0);
    });

    it('should require positive ticket price when set', () => {
      expect(() =>
        ResortConditionsSchema.parse({ ...validConditions, adult_ticket_price: 0 })
      ).toThrow();
      expect(() =>
        ResortConditionsSchema.parse({ ...validConditions, adult_ticket_price: -10 })
      ).toThrow();
    });

    it('should allow nullable ticket price', () => {
      const result = ResortConditionsSchema.parse({
        ...validConditions,
        adult_ticket_price: null,
      });
      expect(result.adult_ticket_price).toBeNull();
    });
  });

  describe('ResortConditions cross-field validation', () => {
    const baseConditions = {
      id: '550e8400-e29b-41d4-a716-446655440099',
      resort_id: '550e8400-e29b-41d4-a716-446655440001',
      snow_depth_base: 120,
      snow_depth_summit: 180,
      fresh_snow_24h: 15,
      runs_open: 98,
      runs_total: 106,
      lifts_open: 45,
      lifts_total: 51,
      crowd_level: 'low',
      weather_condition: 'sunny',
      temperature_min: -8,
      temperature_max: -2,
      adult_ticket_price: 59.0,
      parking_status: 'available',
      parking_price: 15.0,
      updated_at: '2024-01-01T00:00:00.000Z',
    };

    it('should reject runs_open > runs_total', () => {
      expect(() =>
        ResortConditionsSchema.parse({ ...baseConditions, runs_open: 200, runs_total: 100 })
      ).toThrow(/runs_open/);
    });

    it('should reject lifts_open > lifts_total', () => {
      expect(() =>
        ResortConditionsSchema.parse({ ...baseConditions, lifts_open: 60, lifts_total: 50 })
      ).toThrow(/lifts_open/);
    });

    it('should reject temperature_min > temperature_max', () => {
      expect(() =>
        ResortConditionsSchema.parse({ ...baseConditions, temperature_min: 10, temperature_max: -5 })
      ).toThrow(/temperature_min/);
    });

    it('should allow equal runs_open and runs_total', () => {
      const result = ResortConditionsSchema.parse({ ...baseConditions, runs_open: 50, runs_total: 50 });
      expect(result.runs_open).toBe(50);
    });
  });

  describe('ResortConditionsInsertSchema', () => {
    it('should not require id and updated_at', () => {
      const insertData = {
        resort_id: '550e8400-e29b-41d4-a716-446655440001',
        snow_depth_base: 120,
        snow_depth_summit: 180,
        fresh_snow_24h: 15,
        runs_open: 98,
        runs_total: 106,
        lifts_open: 45,
        lifts_total: 51,
        crowd_level: 'low' as const,
        weather_condition: 'sunny' as const,
        temperature_min: -8,
        temperature_max: -2,
        adult_ticket_price: 59.0,
        parking_status: 'available' as const,
        parking_price: 15.0,
      };
      const result = ResortConditionsInsertSchema.parse(insertData);
      expect(result.resort_id).toBe(insertData.resort_id);
    });
  });

  describe('Validation Helper Functions', () => {
    const validResort = {
      id: '550e8400-e29b-41d4-a716-446655440001',
      name: 'Les Arcs',
      slug: 'les-arcs',
      latitude: 45.5708,
      longitude: 6.8281,
      altitude_min: 1200,
      altitude_max: 3226,
      website_url: 'https://www.lesarcs.com',
      webcam_url: null,
      created_at: '2024-01-01T00:00:00.000Z',
      updated_at: '2024-01-01T00:00:00.000Z',
    };

    describe('validateResort', () => {
      it('should return typed resort on valid data', () => {
        const result = validateResort(validResort);
        expect(result.name).toBe('Les Arcs');
      });

      it('should throw on invalid data', () => {
        expect(() => validateResort({ name: 'test' })).toThrow();
      });
    });

    describe('safeValidateResort', () => {
      it('should return resort on valid data', () => {
        const result = safeValidateResort(validResort);
        expect(result?.name).toBe('Les Arcs');
      });

      it('should return null on invalid data', () => {
        const result = safeValidateResort({ name: 'test' });
        expect(result).toBeNull();
      });
    });

    describe('validateConditions', () => {
      const validConditions = {
        id: '550e8400-e29b-41d4-a716-446655440099',
        resort_id: '550e8400-e29b-41d4-a716-446655440001',
        snow_depth_base: 120,
        snow_depth_summit: 180,
        fresh_snow_24h: 15,
        runs_open: 98,
        runs_total: 106,
        lifts_open: 45,
        lifts_total: 51,
        crowd_level: 'low',
        weather_condition: 'sunny',
        temperature_min: -8,
        temperature_max: -2,
        adult_ticket_price: 59.0,
        parking_status: 'available',
        parking_price: 15.0,
        updated_at: '2024-01-01T00:00:00.000Z',
      };

      it('should return typed conditions on valid data', () => {
        const result = validateConditions(validConditions);
        expect(result.crowd_level).toBe('low');
      });
    });

    describe('safeValidateConditions', () => {
      it('should return null on invalid data', () => {
        const result = safeValidateConditions({ resort_id: 'test' });
        expect(result).toBeNull();
      });
    });
  });

  describe('French Alps Coordinate Validation', () => {
    it('should have correct bounds defined', () => {
      expect(FRENCH_ALPS_BOUNDS.latMin).toBe(44.5);
      expect(FRENCH_ALPS_BOUNDS.latMax).toBe(46.5);
      expect(FRENCH_ALPS_BOUNDS.lonMin).toBe(5.5);
      expect(FRENCH_ALPS_BOUNDS.lonMax).toBe(7.5);
    });

    describe('isInFrenchAlps', () => {
      it('should return true for coordinates within bounds', () => {
        expect(isInFrenchAlps(45.5, 6.5)).toBe(true);
        expect(isInFrenchAlps(45.9237, 6.8694)).toBe(true); // Chamonix
      });

      it('should return false for coordinates outside bounds', () => {
        expect(isInFrenchAlps(48.8566, 2.3522)).toBe(false); // Paris
        expect(isInFrenchAlps(40.4168, -3.7038)).toBe(false); // Madrid
      });

      it('should return true for edge coordinates', () => {
        expect(isInFrenchAlps(44.5, 5.5)).toBe(true);
        expect(isInFrenchAlps(46.5, 7.5)).toBe(true);
      });
    });
  });

  describe('Type Inference', () => {
    it('should infer Resort type from schema', () => {
      const resort: Resort = {
        id: '550e8400-e29b-41d4-a716-446655440001',
        name: 'Les Arcs',
        slug: 'les-arcs',
        latitude: 45.5708,
        longitude: 6.8281,
        altitude_min: 1200,
        altitude_max: 3226,
        website_url: 'https://www.lesarcs.com',
        webcam_url: null,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z',
      };
      // TypeScript will error if types don't match
      expect(resort.name).toBe('Les Arcs');
    });

    it('should infer ResortConditions type from schema', () => {
      const conditions: ResortConditions = {
        id: '550e8400-e29b-41d4-a716-446655440099',
        resort_id: '550e8400-e29b-41d4-a716-446655440001',
        snow_depth_base: 120,
        snow_depth_summit: 180,
        fresh_snow_24h: 15,
        runs_open: 98,
        runs_total: 106,
        lifts_open: 45,
        lifts_total: 51,
        crowd_level: 'low',
        weather_condition: 'sunny',
        temperature_min: -8,
        temperature_max: -2,
        adult_ticket_price: 59.0,
        parking_status: 'available',
        parking_price: 15.0,
        updated_at: '2024-01-01T00:00:00.000Z',
      };
      expect(conditions.crowd_level).toBe('low');
    });
  });
});
