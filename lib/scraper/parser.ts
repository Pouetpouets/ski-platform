/**
 * HTML parser for skiresort.info resort pages
 * Extracts snow conditions, slopes, lifts, weather, and pricing data
 */

import * as cheerio from 'cheerio';
import type { ScrapedConditions } from './types';

function parseNumber(text: string | undefined | null): number | null {
  if (!text) return null;
  const cleaned = text.replace(/[^0-9.,\-]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function extractText($: cheerio.CheerioAPI, selector: string): string | null {
  const el = $(selector).first();
  return el.length > 0 ? el.text().trim() : null;
}

/**
 * Parse a skiresort.info resort page HTML and extract conditions data
 */
export function parseConditionsPage(html: string): ScrapedConditions {
  const $ = cheerio.load(html);

  // Snow depths - look for the snow report section
  let snowDepthBase: number | null = null;
  let snowDepthSummit: number | null = null;
  let freshSnow24h: number | null = null;

  // Snow depth valley/summit
  $('.snow-depths .depth-val, .snow-report .depth-value, [class*="snow"] .value').each((_, el) => {
    const text = $(el).text().trim();
    const label = $(el).parent().text().toLowerCase();
    const val = parseNumber(text);
    if (val === null) return;
    if (label.includes('valley') || label.includes('base') || label.includes('tal')) {
      snowDepthBase = val;
    } else if (label.includes('mountain') || label.includes('summit') || label.includes('berg')) {
      snowDepthSummit = val;
    }
  });

  // Alternative snow depth extraction
  if (snowDepthBase === null) {
    $('[class*="snow-depth"]').each((_, el) => {
      const text = $(el).text();
      const match = text.match(/(\d+)\s*cm/);
      if (match) {
        const parent = $(el).parent().text().toLowerCase();
        if (parent.includes('valley') || parent.includes('base')) {
          snowDepthBase = parseInt(match[1], 10);
        } else if (parent.includes('mountain') || parent.includes('summit')) {
          snowDepthSummit = parseInt(match[1], 10);
        }
      }
    });
  }

  // Fresh snow
  const freshSnowText = extractText($, '.fresh-snow .value, [class*="fresh-snow"] .value, [class*="new-snow"] .value');
  freshSnow24h = parseNumber(freshSnowText);

  // Slopes (km)
  let slopesOpenKm: number | null = null;
  let slopesTotalKm: number | null = null;

  // Look for slopes data in various formats
  $('[class*="slope"], [class*="piste"], .run-info').each((_, el) => {
    const text = $(el).text();
    // Match patterns like "120 km / 200 km" or "120/200 km"
    const kmMatch = text.match(/([\d.,]+)\s*(?:km)?\s*\/\s*([\d.,]+)\s*km/);
    if (kmMatch) {
      slopesOpenKm = parseNumber(kmMatch[1]);
      slopesTotalKm = parseNumber(kmMatch[2]);
    }
  });

  // Alternative: look for open/total in separate elements
  if (slopesOpenKm === null) {
    const slopeOpen = extractText($, '.slopes-open .value, [class*="slopes-open"]');
    const slopeTotal = extractText($, '.slopes-total .value, [class*="slopes-total"]');
    slopesOpenKm = parseNumber(slopeOpen);
    slopesTotalKm = parseNumber(slopeTotal);
  }

  // Lifts
  let liftsOpen: number | null = null;
  let liftsTotal: number | null = null;

  $('[class*="lift"], .lift-info').each((_, el) => {
    const text = $(el).text();
    const liftMatch = text.match(/(\d+)\s*\/\s*(\d+)/);
    if (liftMatch && !text.toLowerCase().includes('km')) {
      liftsOpen = parseInt(liftMatch[1], 10);
      liftsTotal = parseInt(liftMatch[2], 10);
    }
  });

  // Temperature
  let temperature: number | null = null;
  const tempText = extractText($, '.temperature .value, [class*="temp"] .value, [class*="temperature"]');
  temperature = parseNumber(tempText);

  // Weather condition
  let weatherCondition: string | null = null;
  const weatherEl = $('[class*="weather"] img, .weather-icon');
  if (weatherEl.length > 0) {
    const alt = weatherEl.attr('alt') || weatherEl.attr('title') || '';
    weatherCondition = alt.toLowerCase().trim() || null;
  }

  // Ticket price
  let adultTicketPrice: number | null = null;
  $('[class*="price"], [class*="ticket"], .lift-pass').each((_, el) => {
    const text = $(el).text();
    // Match patterns like "€59.00" or "59.00 EUR" or "CHF 75"
    const priceMatch = text.match(/[€$]?\s*([\d.,]+)\s*(?:EUR|€|CHF|USD)?/);
    if (priceMatch) {
      const val = parseNumber(priceMatch[1]);
      if (val !== null && val > 10 && val < 300) {
        adultTicketPrice = val;
      }
    }
  });

  return {
    snowDepthBase,
    snowDepthSummit,
    freshSnow24h,
    slopesOpenKm,
    slopesTotalKm,
    liftsOpen,
    liftsTotal,
    temperature,
    weatherCondition,
    adultTicketPrice,
  };
}
