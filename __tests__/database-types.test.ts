import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import type {
  Resort,
  ResortConditions,
  ResortWithConditions,
  CrowdLevel,
  ParkingStatus,
  Database,
} from '@/lib/types/database';

describe('Database Types', () => {
  describe('Resort type', () => {
    it('has correct required fields', () => {
      const resort: Resort = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Les Arcs',
        slug: 'les-arcs',
        latitude: 45.5708,
        longitude: 6.8283,
        altitude_min: 1600,
        altitude_max: 3226,
        country: 'France',
        region: 'Savoie',
        skiresort_info_slug: 'les-arcs-bourg-saint-maurice',
        website_url: 'https://www.lesarcs.com',
        webcam_url: 'https://www.lesarcs.com/webcam',
        created_at: '2026-01-29T10:00:00Z',
        updated_at: '2026-01-29T10:00:00Z',
      };

      expect(resort.name).toBe('Les Arcs');
      expect(resort.slug).toBe('les-arcs');
      expect(resort.latitude).toBeGreaterThan(0);
    });

    it('allows nullable optional fields', () => {
      const resort: Resort = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Test',
        slug: 'test',
        latitude: 45.0,
        longitude: 6.0,
        altitude_min: null,
        altitude_max: null,
        country: null,
        region: null,
        skiresort_info_slug: null,
        website_url: null,
        webcam_url: null,
        created_at: '2026-01-29T10:00:00Z',
        updated_at: '2026-01-29T10:00:00Z',
      };

      expect(resort.altitude_min).toBeNull();
      expect(resort.website_url).toBeNull();
    });
  });

  describe('ResortConditions type', () => {
    it('has correct structure with all fields', () => {
      const conditions: ResortConditions = {
        id: '123e4567-e89b-12d3-a456-426614174001',
        resort_id: '123e4567-e89b-12d3-a456-426614174000',
        snow_depth_base: 85,
        snow_depth_summit: 180,
        fresh_snow_24h: 15,
        slopes_open_km: 45,
        slopes_total_km: 52,
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

      expect(conditions.resort_id).toBe('123e4567-e89b-12d3-a456-426614174000');
      expect(conditions.snow_depth_base).toBe(85);
    });
  });

  describe('CrowdLevel enum', () => {
    it('matches the SQL enum values exactly', () => {
      const sqlMigration = fs.readFileSync(
        path.resolve(__dirname, '../supabase/migrations/20260129000001_create_resorts_schema.sql'),
        'utf-8'
      );

      // Extract enum values from SQL
      const match = sqlMigration.match(/CREATE TYPE crowd_level AS ENUM \(([^)]+)\)/);
      expect(match).not.toBeNull();

      const sqlValues = match![1]
        .split(',')
        .map((v) => v.trim().replace(/'/g, ''));

      // Verify TypeScript type matches SQL
      const tsValues: CrowdLevel[] = ['low', 'moderate', 'high', 'very_high'];
      expect(tsValues).toEqual(sqlValues);
    });
  });

  describe('ParkingStatus enum', () => {
    it('matches the SQL enum values exactly', () => {
      const sqlMigration = fs.readFileSync(
        path.resolve(__dirname, '../supabase/migrations/20260129000001_create_resorts_schema.sql'),
        'utf-8'
      );

      const match = sqlMigration.match(/CREATE TYPE parking_status AS ENUM \(([^)]+)\)/);
      expect(match).not.toBeNull();

      const sqlValues = match![1]
        .split(',')
        .map((v) => v.trim().replace(/'/g, ''));

      const tsValues: ParkingStatus[] = ['available', 'limited', 'full'];
      expect(tsValues).toEqual(sqlValues);
    });
  });

  describe('Database type', () => {
    it('exports correctly structured type', () => {
      type ResortsTable = Database['public']['Tables']['resorts'];
      type ConditionsTable = Database['public']['Tables']['resort_conditions'];

      const _rowType: keyof ResortsTable = 'Row';
      const _insertType: keyof ResortsTable = 'Insert';
      const _updateType: keyof ResortsTable = 'Update';

      expect(_rowType).toBe('Row');
      expect(_insertType).toBe('Insert');
      expect(_updateType).toBe('Update');
    });
  });

  describe('SQL Migration', () => {
    it('migration file exists and contains required tables', () => {
      const migrationPath = path.resolve(
        __dirname,
        '../supabase/migrations/20260129000001_create_resorts_schema.sql'
      );
      expect(fs.existsSync(migrationPath)).toBe(true);

      const sql = fs.readFileSync(migrationPath, 'utf-8');
      expect(sql).toContain('CREATE TABLE resorts');
      expect(sql).toContain('CREATE TABLE resort_conditions');
      expect(sql).toContain('REFERENCES resorts(id) ON DELETE CASCADE');
      expect(sql).toContain('ENABLE ROW LEVEL SECURITY');
    });

    it('RLS policies allow public read access', () => {
      const sql = fs.readFileSync(
        path.resolve(__dirname, '../supabase/migrations/20260129000001_create_resorts_schema.sql'),
        'utf-8'
      );
      expect(sql).toContain('Anyone can view resorts');
      expect(sql).toContain('Anyone can view resort conditions');
      expect(sql).toContain('TO anon, authenticated');
    });
  });
});
