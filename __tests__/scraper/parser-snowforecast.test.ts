import { describe, it, expect } from 'vitest';
import { parseSnowForecastPage } from '@/lib/scraper/parser-snowforecast';

const makeHtml = (body: string) => `<html><body>${body}</body></html>`;

describe('parseSnowForecastPage', () => {
  it('returns all-null for empty HTML', () => {
    const result = parseSnowForecastPage(makeHtml(''));
    expect(result.snowDepthBase).toBeNull();
    expect(result.snowDepthSummit).toBeNull();
    expect(result.freshSnow24h).toBeNull();
    expect(result.temperature).toBeNull();
    expect(result.weatherCondition).toBeNull();
    // These should always be null for snow-forecast.com
    expect(result.slopesOpenKm).toBeNull();
    expect(result.slopesTotalKm).toBeNull();
    expect(result.liftsOpen).toBeNull();
    expect(result.liftsTotal).toBeNull();
    expect(result.adultTicketPrice).toBeNull();
  });

  it('extracts snow depths from labeled sections', () => {
    const html = makeHtml(`
      <div class="snow-conditions">
        Top: 180 cm
        Bottom: 80 cm
      </div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.snowDepthSummit).toBe(180);
    expect(result.snowDepthBase).toBe(80);
  });

  it('extracts snow depths with summit/base labels', () => {
    const html = makeHtml(`
      <div class="snow-depth">
        Summit: 200cm
        Base: 100cm
      </div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.snowDepthSummit).toBe(200);
    expect(result.snowDepthBase).toBe(100);
  });

  it('converts meter values to centimeters', () => {
    const html = makeHtml(`
      <div class="snow-depth">
        Top: 2m
        Bottom: 1m
      </div>
    `);
    const result = parseSnowForecastPage(html);
    // Values < 20 are treated as meters and converted to cm
    expect(result.snowDepthSummit).toBe(200);
    expect(result.snowDepthBase).toBe(100);
  });

  it('extracts fresh snow from banner', () => {
    const html = makeHtml(`
      <div class="fresh-snow">15cm new snow</div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.freshSnow24h).toBe(15);
  });

  it('extracts fresh snow from snowfall class', () => {
    const html = makeHtml(`
      <div class="snowfall">25 cm</div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.freshSnow24h).toBe(25);
  });

  it('extracts weather condition from icon class - sunny', () => {
    const html = makeHtml(`
      <div class="weather-icon icon--clear-day"></div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.weatherCondition).toBe('sunny');
  });

  it('extracts weather condition from icon class - cloudy', () => {
    const html = makeHtml(`
      <div class="weather-icon icon--cloud"></div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.weatherCondition).toBe('cloudy');
  });

  it('extracts weather condition from icon class - snowing', () => {
    const html = makeHtml(`
      <div class="weather-icon icon--snow"></div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.weatherCondition).toBe('snowing');
  });

  it('extracts weather condition from icon class - partly cloudy', () => {
    const html = makeHtml(`
      <div class="weather-icon icon--part-cloud"></div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.weatherCondition).toBe('partly_cloudy');
  });

  it('extracts weather from image alt text', () => {
    const html = makeHtml(`
      <div class="weather"><img alt="Snow showers" /></div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.weatherCondition).toBe('snowing');
  });

  it('extracts temperature from temperature class', () => {
    const html = makeHtml(`
      <div class="temperature"><span class="value">-8</span></div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.temperature).toBe(-8);
  });

  it('extracts temperature from current-temp class', () => {
    const html = makeHtml(`
      <div class="current-temp">-12°C</div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.temperature).toBe(-12);
  });

  it('handles partial data gracefully', () => {
    const html = makeHtml(`
      <div class="snow-conditions">
        Summit: 150cm
      </div>
      <div class="current-temp">-5</div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.snowDepthSummit).toBe(150);
    expect(result.snowDepthBase).toBeNull();
    expect(result.temperature).toBe(-5);
    expect(result.freshSnow24h).toBeNull();
  });

  it('handles German labels (valley=tal, mountain=berg)', () => {
    const html = makeHtml(`
      <div class="snow-conditions">
        Berg: 120 cm
        Tal: 60 cm
      </div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.snowDepthSummit).toBe(120);
    expect(result.snowDepthBase).toBe(60);
  });

  it('extracts from depth-value class with upper/lower labels', () => {
    const html = makeHtml(`
      <div class="snow-conditions">
        Upper: 180 cm
        Lower: 90 cm
      </div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.snowDepthSummit).toBe(180);
    expect(result.snowDepthBase).toBe(90);
  });

  it('returns null for weather when no icon found', () => {
    const html = makeHtml(`
      <div class="some-other-content">No weather here</div>
    `);
    const result = parseSnowForecastPage(html);
    expect(result.weatherCondition).toBeNull();
  });

  it('always returns null for slopes, lifts, and prices', () => {
    const html = makeHtml(`
      <div class="snow-conditions">Top: 200cm, Bottom: 100cm</div>
      <div class="fresh-snow">30cm</div>
      <div class="temperature"><span class="value">-10</span></div>
    `);
    const result = parseSnowForecastPage(html);
    // These should always be null for snow-forecast.com (not available)
    expect(result.slopesOpenKm).toBeNull();
    expect(result.slopesTotalKm).toBeNull();
    expect(result.liftsOpen).toBeNull();
    expect(result.liftsTotal).toBeNull();
    expect(result.adultTicketPrice).toBeNull();
  });
});
