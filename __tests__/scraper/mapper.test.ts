import { describe, it, expect } from 'vitest';
import { normalizeWeather, mapToConditionsUpdate } from '@/lib/scraper/mapper';
import type { ScrapedConditions } from '@/lib/scraper/types';

describe('normalizeWeather', () => {
  it('returns null for null input', () => {
    expect(normalizeWeather(null)).toBeNull();
  });

  it('returns null for empty string', () => {
    expect(normalizeWeather('')).toBeNull();
  });

  it('maps direct matches', () => {
    expect(normalizeWeather('sunny')).toBe('sunny');
    expect(normalizeWeather('cloudy')).toBe('cloudy');
    expect(normalizeWeather('snowing')).toBe('snowing');
    expect(normalizeWeather('rain')).toBe('raining');
  });

  it('maps case-insensitive matches', () => {
    expect(normalizeWeather('Sunny')).toBe('sunny');
    expect(normalizeWeather('CLOUDY')).toBe('cloudy');
  });

  it('maps synonyms', () => {
    expect(normalizeWeather('clear')).toBe('sunny');
    expect(normalizeWeather('fair')).toBe('sunny');
    expect(normalizeWeather('overcast')).toBe('cloudy');
    expect(normalizeWeather('snowfall')).toBe('snowing');
    expect(normalizeWeather('drizzle')).toBe('raining');
    expect(normalizeWeather('fog')).toBe('foggy');
    expect(normalizeWeather('mist')).toBe('foggy');
  });

  it('handles partial matches', () => {
    expect(normalizeWeather('light snow with wind')).toBe('snowing');
    expect(normalizeWeather('partly cloudy skies')).toBe('partly_cloudy');
  });

  it('returns null for unrecognized weather', () => {
    expect(normalizeWeather('hail')).toBeNull();
    expect(normalizeWeather('tornado')).toBeNull();
  });
});

describe('mapToConditionsUpdate', () => {
  const fullScraped: ScrapedConditions = {
    snowDepthBase: 120.4,
    snowDepthSummit: 180.7,
    freshSnow24h: 15.3,
    slopesOpenKm: 98.56,
    slopesTotalKm: 106.2,
    liftsOpen: 45,
    liftsTotal: 51,
    temperature: -5,
    weatherCondition: 'sunny',
    adultTicketPrice: 59.0,
  };

  it('maps all non-null fields', () => {
    const update = mapToConditionsUpdate(fullScraped);
    expect(update.snow_depth_base).toBe(120);
    expect(update.snow_depth_summit).toBe(181);
    expect(update.fresh_snow_24h).toBe(15);
    expect(update.slopes_open_km).toBe(98.6);
    expect(update.slopes_total_km).toBe(106.2);
    expect(update.lifts_open).toBe(45);
    expect(update.lifts_total).toBe(51);
    expect(update.weather_condition).toBe('sunny');
    expect(update.temperature_min).toBe(-5);
    expect(update.temperature_max).toBe(-5);
    expect(update.adult_ticket_price).toBe(59);
  });

  it('omits null fields from update', () => {
    const emptyScraped: ScrapedConditions = {
      snowDepthBase: null,
      snowDepthSummit: null,
      freshSnow24h: null,
      slopesOpenKm: null,
      slopesTotalKm: null,
      liftsOpen: null,
      liftsTotal: null,
      temperature: null,
      weatherCondition: null,
      adultTicketPrice: null,
    };
    const update = mapToConditionsUpdate(emptyScraped);
    expect(Object.keys(update)).toHaveLength(0);
  });

  it('normalizes weather condition strings', () => {
    const scraped: ScrapedConditions = {
      ...fullScraped,
      weatherCondition: 'heavy snow',
    };
    const update = mapToConditionsUpdate(scraped);
    expect(update.weather_condition).toBe('snowing');
  });

  it('omits weather when normalization returns null', () => {
    const scraped: ScrapedConditions = {
      ...fullScraped,
      weatherCondition: 'unknown-weather',
    };
    const update = mapToConditionsUpdate(scraped);
    expect(update.weather_condition).toBeUndefined();
  });

  it('rounds snow depths to integers', () => {
    const scraped: ScrapedConditions = {
      ...fullScraped,
      snowDepthBase: 85.7,
      snowDepthSummit: 165.3,
      freshSnow24h: 12.8,
    };
    const update = mapToConditionsUpdate(scraped);
    expect(update.snow_depth_base).toBe(86);
    expect(update.snow_depth_summit).toBe(165);
    expect(update.fresh_snow_24h).toBe(13);
  });

  it('rounds slopes to 1 decimal place', () => {
    const scraped: ScrapedConditions = {
      ...fullScraped,
      slopesOpenKm: 98.567,
      slopesTotalKm: 106.234,
    };
    const update = mapToConditionsUpdate(scraped);
    expect(update.slopes_open_km).toBe(98.6);
    expect(update.slopes_total_km).toBe(106.2);
  });
});
