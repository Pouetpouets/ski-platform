import { describe, it, expect } from 'vitest';
import type {
  Resort,
  ResortConditions,
  CrowdLevel,
  ParkingStatus,
  Database,
} from '@/lib/types/database';

describe('Database Types', () => {
  describe('Resort type', () => {
    it('has correct structure', () => {
      const resort: Resort = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Les Arcs',
        slug: 'les-arcs',
        latitude: 45.5708,
        longitude: 6.8283,
        altitude_min: 1600,
        altitude_max: 3226,
        website_url: 'https://www.lesarcs.com',
        webcam_url: 'https://www.lesarcs.com/webcam',
        created_at: '2026-01-29T10:00:00Z',
        updated_at: '2026-01-29T10:00:00Z',
      };

      expect(resort.name).toBe('Les Arcs');
      expect(resort.slug).toBe('les-arcs');
      expect(resort.latitude).toBeGreaterThan(0);
    });
  });

  describe('ResortConditions type', () => {
    it('has correct structure', () => {
      const conditions: ResortConditions = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        resort_id: '123e4567-e89b-12d3-a456-426614174000',
        snow_depth_base: 85,
        snow_depth_summit: 180,
        fresh_snow_24h: 15,
        runs_open: 45,
        runs_total: 52,
        lifts_open: 18,
        lifts_total: 22,
        crowd_level: 'moderate',
        weather_condition: 'sunny',
        temperature_min: -5,
        temperature_max: 2,
        adult_ticket_price: 54.00,
        parking_status: 'available',
        parking_price: 8.00,
        updated_at: '2026-01-29T08:00:00Z',
      };

      expect(conditions.snow_depth_base).toBe(85);
      expect(conditions.crowd_level).toBe('moderate');
      expect(conditions.parking_status).toBe('available');
    });
  });

  describe('CrowdLevel enum', () => {
    it('only allows valid values', () => {
      const validLevels: CrowdLevel[] = ['low', 'moderate', 'high', 'very_high'];
      validLevels.forEach((level) => {
        expect(['low', 'moderate', 'high', 'very_high']).toContain(level);
      });
    });
  });

  describe('ParkingStatus enum', () => {
    it('only allows valid values', () => {
      const validStatuses: ParkingStatus[] = ['available', 'limited', 'full'];
      validStatuses.forEach((status) => {
        expect(['available', 'limited', 'full']).toContain(status);
      });
    });
  });

  describe('Database type', () => {
    it('exports correctly structured type', () => {
      // Type-level test - just verify the types compile
      type ResortsTable = Database['public']['Tables']['resorts'];
      type ConditionsTable = Database['public']['Tables']['resort_conditions'];

      // These assertions verify the type structure exists
      const _rowType: keyof ResortsTable = 'Row';
      const _insertType: keyof ResortsTable = 'Insert';
      const _updateType: keyof ResortsTable = 'Update';

      expect(_rowType).toBe('Row');
      expect(_insertType).toBe('Insert');
      expect(_updateType).toBe('Update');
    });
  });
});
