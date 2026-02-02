import { describe, it, expect } from 'vitest';
import { wmoCodeToCondition } from '@/lib/weather/wmo-codes';

describe('wmoCodeToCondition', () => {
  it('maps code 0 to sunny', () => {
    expect(wmoCodeToCondition(0)).toBe('sunny');
  });

  it('maps code 1 to partly_cloudy', () => {
    expect(wmoCodeToCondition(1)).toBe('partly_cloudy');
  });

  it('maps code 2 to partly_cloudy', () => {
    expect(wmoCodeToCondition(2)).toBe('partly_cloudy');
  });

  it('maps code 3 to cloudy', () => {
    expect(wmoCodeToCondition(3)).toBe('cloudy');
  });

  it('maps fog codes (45, 48) to foggy', () => {
    expect(wmoCodeToCondition(45)).toBe('foggy');
    expect(wmoCodeToCondition(48)).toBe('foggy');
  });

  it('maps drizzle codes (51-57) to rain', () => {
    for (const code of [51, 53, 55, 56, 57]) {
      expect(wmoCodeToCondition(code)).toBe('rain');
    }
  });

  it('maps rain codes (61-67) to rain', () => {
    for (const code of [61, 63, 65, 66, 67]) {
      expect(wmoCodeToCondition(code)).toBe('rain');
    }
  });

  it('maps rain shower codes (80-82) to rain', () => {
    for (const code of [80, 81, 82]) {
      expect(wmoCodeToCondition(code)).toBe('rain');
    }
  });

  it('maps snow codes (71-77) to snowing', () => {
    for (const code of [71, 73, 75, 77]) {
      expect(wmoCodeToCondition(code)).toBe('snowing');
    }
  });

  it('maps snow shower codes (85-86) to snowing', () => {
    expect(wmoCodeToCondition(85)).toBe('snowing');
    expect(wmoCodeToCondition(86)).toBe('snowing');
  });

  it('maps thunderstorm codes (95-99) to storm', () => {
    for (const code of [95, 96, 99]) {
      expect(wmoCodeToCondition(code)).toBe('storm');
    }
  });

  it('falls back to cloudy for unknown codes', () => {
    expect(wmoCodeToCondition(999)).toBe('cloudy');
    expect(wmoCodeToCondition(-1)).toBe('cloudy');
    expect(wmoCodeToCondition(50)).toBe('cloudy');
  });
});
