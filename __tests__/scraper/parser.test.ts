import { describe, it, expect } from 'vitest';
import { parseConditionsPage } from '@/lib/scraper/parser';

const makeHtml = (body: string) => `<html><body>${body}</body></html>`;

describe('parseConditionsPage', () => {
  it('returns all-null for empty HTML', () => {
    const result = parseConditionsPage(makeHtml(''));
    expect(result.snowDepthBase).toBeNull();
    expect(result.snowDepthSummit).toBeNull();
    expect(result.freshSnow24h).toBeNull();
    expect(result.slopesOpenKm).toBeNull();
    expect(result.slopesTotalKm).toBeNull();
    expect(result.liftsOpen).toBeNull();
    expect(result.liftsTotal).toBeNull();
    expect(result.temperature).toBeNull();
    expect(result.weatherCondition).toBeNull();
    expect(result.adultTicketPrice).toBeNull();
  });

  it('extracts snow depths from snow-depths section', () => {
    const html = makeHtml(`
      <div class="snow-depths">
        <div><span class="depth-val">80</span> valley base</div>
        <div><span class="depth-val">160</span> mountain summit</div>
      </div>
    `);
    const result = parseConditionsPage(html);
    expect(result.snowDepthBase).toBe(80);
    expect(result.snowDepthSummit).toBe(160);
  });

  it('extracts fresh snow value', () => {
    const html = makeHtml(`
      <div class="fresh-snow"><span class="value">25</span></div>
    `);
    const result = parseConditionsPage(html);
    expect(result.freshSnow24h).toBe(25);
  });

  it('extracts slopes open/total in km', () => {
    const html = makeHtml(`
      <div class="slope-info">120.5 km / 200 km</div>
    `);
    const result = parseConditionsPage(html);
    expect(result.slopesOpenKm).toBe(120.5);
    expect(result.slopesTotalKm).toBe(200);
  });

  it('extracts lifts open/total', () => {
    const html = makeHtml(`
      <div class="lift-info">35 / 42</div>
    `);
    const result = parseConditionsPage(html);
    expect(result.liftsOpen).toBe(35);
    expect(result.liftsTotal).toBe(42);
  });

  it('extracts weather condition from image alt text', () => {
    const html = makeHtml(`
      <div class="weather"><img alt="Sunny" /></div>
    `);
    const result = parseConditionsPage(html);
    expect(result.weatherCondition).toBe('sunny');
  });

  it('extracts temperature', () => {
    const html = makeHtml(`
      <div class="temperature"><span class="value">-5</span></div>
    `);
    const result = parseConditionsPage(html);
    expect(result.temperature).toBe(-5);
  });

  it('extracts ticket price', () => {
    const html = makeHtml(`
      <div class="ticket-price">€59.00</div>
    `);
    const result = parseConditionsPage(html);
    expect(result.adultTicketPrice).toBe(59);
  });

  it('ignores unrealistic ticket prices (< 10 or > 300)', () => {
    const html = makeHtml(`
      <div class="ticket-price">€5.00</div>
    `);
    const result = parseConditionsPage(html);
    expect(result.adultTicketPrice).toBeNull();
  });

  it('handles alternative snow depth format with cm', () => {
    // Use snow-report class with depth-value which hits the primary selector
    const html = makeHtml(`
      <div class="snow-report">
        <div><span class="depth-value">90</span> valley base</div>
        <div><span class="depth-value">180</span> mountain summit</div>
      </div>
    `);
    const result = parseConditionsPage(html);
    expect(result.snowDepthBase).toBe(90);
    expect(result.snowDepthSummit).toBe(180);
  });
});
