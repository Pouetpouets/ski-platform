import { describe, expect, it } from 'vitest';
import {
  SEED_RESORTS,
  SEED_CONDITIONS,
  RESORT_IDS,
  getResort,
  getConditions,
  validateCoordinates,
} from '@/lib/seed/resorts';

describe('Seed Data: French Alps Resorts', () => {
  describe('Resort Count', () => {
    it('should have at least 10 resorts (FR41)', () => {
      expect(SEED_RESORTS.length).toBeGreaterThanOrEqual(10);
    });

    it('should have exactly 12 resorts', () => {
      expect(SEED_RESORTS.length).toBe(12);
    });

    it('should have conditions for each resort', () => {
      expect(SEED_CONDITIONS.length).toBe(SEED_RESORTS.length);
    });
  });

  describe('Required Resorts', () => {
    const requiredResorts = [
      'Les Arcs',
      'La Clusaz',
      'Megève',
      'Chamonix',
      "Val d'Isère",
      'Tignes',
      'Les Deux Alpes',
      "Alpe d'Huez",
      'La Plagne',
      'Courchevel',
    ];

    it.each(requiredResorts)('should include %s', (resortName) => {
      const found = SEED_RESORTS.some((r) => r.name === resortName);
      expect(found).toBe(true);
    });
  });

  describe('Resort Data Completeness', () => {
    it('should have all required fields populated for each resort', () => {
      SEED_RESORTS.forEach((resort) => {
        expect(resort.id).toBeTruthy();
        expect(resort.name).toBeTruthy();
        expect(resort.slug).toBeTruthy();
        expect(typeof resort.latitude).toBe('number');
        expect(typeof resort.longitude).toBe('number');
        expect(resort.altitude_min).toBeGreaterThan(0);
        expect(resort.altitude_max).toBeGreaterThan(resort.altitude_min!);
        expect(resort.website_url).toMatch(/^https?:\/\//);
        expect(resort.webcam_url).toMatch(/^https?:\/\//);
      });
    });

    it('should have unique slugs', () => {
      const slugs = SEED_RESORTS.map((r) => r.slug);
      const uniqueSlugs = new Set(slugs);
      expect(uniqueSlugs.size).toBe(slugs.length);
    });

    it('should have unique IDs', () => {
      const ids = SEED_RESORTS.map((r) => r.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });
  });

  describe('Coordinate Validation', () => {
    it('should have all coordinates within French Alps bounds', () => {
      expect(validateCoordinates()).toBe(true);
    });

    it('should have valid latitude range (44.5°N - 46.5°N)', () => {
      SEED_RESORTS.forEach((resort) => {
        expect(resort.latitude).toBeGreaterThanOrEqual(44.5);
        expect(resort.latitude).toBeLessThanOrEqual(46.5);
      });
    });

    it('should have valid longitude range (5.5°E - 7.5°E)', () => {
      SEED_RESORTS.forEach((resort) => {
        expect(resort.longitude).toBeGreaterThanOrEqual(5.5);
        expect(resort.longitude).toBeLessThanOrEqual(7.5);
      });
    });
  });

  describe('Conditions Data Realism', () => {
    it('should have snow depth in realistic range (50-200cm base)', () => {
      SEED_CONDITIONS.forEach((cond) => {
        expect(cond.snow_depth_base).toBeGreaterThanOrEqual(50);
        expect(cond.snow_depth_base).toBeLessThanOrEqual(200);
      });
    });

    it('should have summit depth greater than base depth', () => {
      SEED_CONDITIONS.forEach((cond) => {
        expect(cond.snow_depth_summit).toBeGreaterThan(cond.snow_depth_base!);
      });
    });

    it('should have ticket prices in realistic range (€40-70)', () => {
      SEED_CONDITIONS.forEach((cond) => {
        expect(cond.adult_ticket_price).toBeGreaterThanOrEqual(40);
        expect(cond.adult_ticket_price).toBeLessThanOrEqual(70);
      });
    });

    it('should have variety in crowd levels', () => {
      const crowdLevels = new Set(SEED_CONDITIONS.map((c) => c.crowd_level));
      expect(crowdLevels.size).toBeGreaterThanOrEqual(3);
    });

    it('should have all crowd levels represented', () => {
      const crowdLevels = SEED_CONDITIONS.map((c) => c.crowd_level);
      expect(crowdLevels).toContain('low');
      expect(crowdLevels).toContain('moderate');
      expect(crowdLevels).toContain('high');
      expect(crowdLevels).toContain('very_high');
    });

    it('should have variety in parking status', () => {
      const parkingStatuses = new Set(SEED_CONDITIONS.map((c) => c.parking_status));
      expect(parkingStatuses.size).toBeGreaterThanOrEqual(2);
    });
  });

  describe('Helper Functions', () => {
    it('getResort should return correct resort by key', () => {
      const resort = getResort('CHAMONIX');
      expect(resort?.name).toBe('Chamonix');
      expect(resort?.id).toBe(RESORT_IDS.CHAMONIX);
    });

    it('getConditions should return conditions for resort key', () => {
      const conditions = getConditions('VAL_DISERE');
      expect(conditions?.resort_id).toBe(RESORT_IDS.VAL_DISERE);
      expect(conditions?.crowd_level).toBe('high');
    });

    it('should match conditions to correct resort', () => {
      const resortIds = SEED_RESORTS.map((r) => r.id);
      SEED_CONDITIONS.forEach((cond) => {
        expect(resortIds).toContain(cond.resort_id);
      });
    });
  });

  describe('Lift/Run Data', () => {
    it('should have runs_open <= runs_total', () => {
      SEED_CONDITIONS.forEach((cond) => {
        expect(cond.runs_open).toBeLessThanOrEqual(cond.runs_total);
      });
    });

    it('should have lifts_open <= lifts_total', () => {
      SEED_CONDITIONS.forEach((cond) => {
        expect(cond.lifts_open).toBeLessThanOrEqual(cond.lifts_total);
      });
    });

    it('should have positive runs and lifts counts', () => {
      SEED_CONDITIONS.forEach((cond) => {
        expect(cond.runs_open).toBeGreaterThan(0);
        expect(cond.runs_total).toBeGreaterThan(0);
        expect(cond.lifts_open).toBeGreaterThan(0);
        expect(cond.lifts_total).toBeGreaterThan(0);
      });
    });
  });
});
