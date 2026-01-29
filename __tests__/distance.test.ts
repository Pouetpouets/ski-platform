import { describe, expect, it } from 'vitest';
import {
  calculateDistance,
  formatDistance,
  estimateDrivingTime,
  getDistanceInfo,
  DEFAULT_REFERENCE_LOCATION,
} from '@/lib/utils/distance';

describe('Distance Utilities', () => {
  describe('DEFAULT_REFERENCE_LOCATION', () => {
    it('should be Lyon', () => {
      expect(DEFAULT_REFERENCE_LOCATION.name).toBe('Lyon');
      expect(DEFAULT_REFERENCE_LOCATION.latitude).toBeCloseTo(45.764, 2);
      expect(DEFAULT_REFERENCE_LOCATION.longitude).toBeCloseTo(4.836, 2);
    });
  });

  describe('calculateDistance', () => {
    it('should return 0 for same coordinates', () => {
      const distance = calculateDistance(45.0, 6.0, 45.0, 6.0);
      expect(distance).toBe(0);
    });

    it('should calculate distance between Lyon and Chamonix correctly', () => {
      // Lyon: 45.764°N, 4.836°E
      // Chamonix: 45.924°N, 6.869°E
      const distance = calculateDistance(45.764, 4.836, 45.924, 6.869);
      // Actual distance is approximately 165 km
      expect(distance).toBeGreaterThan(150);
      expect(distance).toBeLessThan(180);
    });

    it('should calculate distance between Paris and Lyon correctly', () => {
      // Paris: 48.857°N, 2.352°E
      // Lyon: 45.764°N, 4.836°E
      const distance = calculateDistance(48.857, 2.352, 45.764, 4.836);
      // Actual distance is approximately 390 km
      expect(distance).toBeGreaterThan(370);
      expect(distance).toBeLessThan(420);
    });

    it('should be symmetric (A to B equals B to A)', () => {
      const distAtoB = calculateDistance(45.0, 6.0, 46.0, 7.0);
      const distBtoA = calculateDistance(46.0, 7.0, 45.0, 6.0);
      expect(distAtoB).toBeCloseTo(distBtoA, 10);
    });
  });

  describe('formatDistance', () => {
    it('should show one decimal for distances under 100km', () => {
      expect(formatDistance(45.23)).toBe('45.2 km');
      expect(formatDistance(78.567)).toBe('78.6 km');
      expect(formatDistance(99.99)).toBe('100.0 km');
    });

    it('should show whole numbers for distances 100km and over', () => {
      expect(formatDistance(100)).toBe('100 km');
      expect(formatDistance(156.7)).toBe('157 km');
      expect(formatDistance(250.4)).toBe('250 km');
    });

    it('should handle small distances', () => {
      expect(formatDistance(1.5)).toBe('1.5 km');
      expect(formatDistance(0.5)).toBe('0.5 km');
    });
  });

  describe('estimateDrivingTime', () => {
    it('should return minutes only for short trips', () => {
      expect(estimateDrivingTime(20)).toBe('~24min');
      expect(estimateDrivingTime(40)).toBe('~48min');
    });

    it('should return hours only for round hour trips', () => {
      expect(estimateDrivingTime(50)).toBe('~1h');
    });

    it('should return hours and minutes for longer trips', () => {
      expect(estimateDrivingTime(75)).toBe('~1h 30min');
      expect(estimateDrivingTime(150)).toBe('~3h');
    });

    it('should include 20% adjustment for mountain roads', () => {
      // 100km at 60km/h = 1h 40min
      // With 20% adjustment: 120km at 60km/h = 2h
      const time = estimateDrivingTime(100);
      expect(time).toBe('~2h');
    });
  });

  describe('getDistanceInfo', () => {
    const chamonixCoords = { lat: 45.924, lon: 6.869 };

    it('should use user location when provided', () => {
      const userLocation = { latitude: 45.764, longitude: 4.836 }; // Lyon
      const info = getDistanceInfo(userLocation, chamonixCoords.lat, chamonixCoords.lon);

      expect(info).not.toBeNull();
      expect(info?.fromLocation).toBe('your location');
      expect(info?.distance).toBeGreaterThan(150);
    });

    it('should use Lyon as default when user location is null', () => {
      const info = getDistanceInfo(null, chamonixCoords.lat, chamonixCoords.lon);

      expect(info).not.toBeNull();
      expect(info?.fromLocation).toBe('Lyon');
      expect(info?.distance).toBeGreaterThan(150);
    });

    it('should include all required fields', () => {
      const info = getDistanceInfo(null, chamonixCoords.lat, chamonixCoords.lon);

      expect(info).toHaveProperty('distance');
      expect(info).toHaveProperty('formattedDistance');
      expect(info).toHaveProperty('drivingTime');
      expect(info).toHaveProperty('fromLocation');

      expect(typeof info?.distance).toBe('number');
      expect(info?.formattedDistance).toMatch(/km$/);
      expect(info?.drivingTime).toMatch(/^~/);
    });
  });
});
