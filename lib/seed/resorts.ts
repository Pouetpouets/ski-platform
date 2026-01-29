/**
 * Seed data for French Alps ski resorts
 * Used for development, testing, and initial database population
 */

import type { ResortInsert, ResortConditionsInsert, CrowdLevel, ParkingStatus } from '@/lib/types/database';

/**
 * Resort data with fixed UUIDs for consistent seeding
 */
export const RESORT_IDS = {
  LES_ARCS: '550e8400-e29b-41d4-a716-446655440001',
  LA_PLAGNE: '550e8400-e29b-41d4-a716-446655440002',
  VAL_DISERE: '550e8400-e29b-41d4-a716-446655440003',
  TIGNES: '550e8400-e29b-41d4-a716-446655440004',
  COURCHEVEL: '550e8400-e29b-41d4-a716-446655440005',
  MERIBEL: '550e8400-e29b-41d4-a716-446655440006',
  CHAMONIX: '550e8400-e29b-41d4-a716-446655440007',
  MEGEVE: '550e8400-e29b-41d4-a716-446655440008',
  LA_CLUSAZ: '550e8400-e29b-41d4-a716-446655440009',
  LE_GRAND_BORNAND: '550e8400-e29b-41d4-a716-446655440010',
  ALPE_DHUEZ: '550e8400-e29b-41d4-a716-446655440011',
  LES_DEUX_ALPES: '550e8400-e29b-41d4-a716-446655440012',
} as const;

export type ResortKey = keyof typeof RESORT_IDS;

/**
 * 12 French Alps ski resorts with accurate coordinates and metadata
 */
export const SEED_RESORTS: (ResortInsert & { id: string })[] = [
  // Savoie Region
  {
    id: RESORT_IDS.LES_ARCS,
    name: 'Les Arcs',
    slug: 'les-arcs',
    latitude: 45.5708,
    longitude: 6.8281,
    altitude_min: 1200,
    altitude_max: 3226,
    website_url: 'https://www.lesarcs.com',
    webcam_url: 'https://www.lesarcs.com/webcams.html',
  },
  {
    id: RESORT_IDS.LA_PLAGNE,
    name: 'La Plagne',
    slug: 'la-plagne',
    latitude: 45.5058,
    longitude: 6.6789,
    altitude_min: 1250,
    altitude_max: 3250,
    website_url: 'https://www.la-plagne.com',
    webcam_url: 'https://www.la-plagne.com/webcams.html',
  },
  {
    id: RESORT_IDS.VAL_DISERE,
    name: "Val d'Isère",
    slug: 'val-disere',
    latitude: 45.4478,
    longitude: 6.9806,
    altitude_min: 1550,
    altitude_max: 3456,
    website_url: 'https://www.valdisere.com',
    webcam_url: 'https://www.valdisere.com/webcams/',
  },
  {
    id: RESORT_IDS.TIGNES,
    name: 'Tignes',
    slug: 'tignes',
    latitude: 45.4692,
    longitude: 6.9067,
    altitude_min: 1550,
    altitude_max: 3456,
    website_url: 'https://www.tignes.net',
    webcam_url: 'https://www.tignes.net/webcams',
  },
  {
    id: RESORT_IDS.COURCHEVEL,
    name: 'Courchevel',
    slug: 'courchevel',
    latitude: 45.4147,
    longitude: 6.6347,
    altitude_min: 1300,
    altitude_max: 2738,
    website_url: 'https://www.courchevel.com',
    webcam_url: 'https://www.courchevel.com/webcams/',
  },
  {
    id: RESORT_IDS.MERIBEL,
    name: 'Méribel',
    slug: 'meribel',
    latitude: 45.3967,
    longitude: 6.5656,
    altitude_min: 1400,
    altitude_max: 2952,
    website_url: 'https://www.meribel.net',
    webcam_url: 'https://www.meribel.net/webcams.html',
  },
  // Haute-Savoie Region
  {
    id: RESORT_IDS.CHAMONIX,
    name: 'Chamonix',
    slug: 'chamonix',
    latitude: 45.9237,
    longitude: 6.8694,
    altitude_min: 1035,
    altitude_max: 3842,
    website_url: 'https://www.chamonix.com',
    webcam_url: 'https://www.chamonix.com/webcams',
  },
  {
    id: RESORT_IDS.MEGEVE,
    name: 'Megève',
    slug: 'megeve',
    latitude: 45.8567,
    longitude: 6.6175,
    altitude_min: 1113,
    altitude_max: 2350,
    website_url: 'https://www.megeve.com',
    webcam_url: 'https://www.megeve.com/webcams/',
  },
  {
    id: RESORT_IDS.LA_CLUSAZ,
    name: 'La Clusaz',
    slug: 'la-clusaz',
    latitude: 45.9047,
    longitude: 6.4236,
    altitude_min: 1100,
    altitude_max: 2600,
    website_url: 'https://www.laclusaz.com',
    webcam_url: 'https://www.laclusaz.com/webcams.html',
  },
  {
    id: RESORT_IDS.LE_GRAND_BORNAND,
    name: 'Le Grand-Bornand',
    slug: 'le-grand-bornand',
    latitude: 45.9419,
    longitude: 6.4297,
    altitude_min: 1000,
    altitude_max: 2100,
    website_url: 'https://www.legrandbornand.com',
    webcam_url: 'https://www.legrandbornand.com/webcams.html',
  },
  // Isère Region
  {
    id: RESORT_IDS.ALPE_DHUEZ,
    name: "Alpe d'Huez",
    slug: 'alpe-dhuez',
    latitude: 45.0922,
    longitude: 6.0686,
    altitude_min: 1250,
    altitude_max: 3330,
    website_url: 'https://www.alpedhuez.com',
    webcam_url: 'https://www.alpedhuez.com/webcams/',
  },
  {
    id: RESORT_IDS.LES_DEUX_ALPES,
    name: 'Les Deux Alpes',
    slug: 'les-deux-alpes',
    latitude: 45.0167,
    longitude: 6.1222,
    altitude_min: 1300,
    altitude_max: 3600,
    website_url: 'https://www.les2alpes.com',
    webcam_url: 'https://www.les2alpes.com/webcams/',
  },
];

/**
 * Sample conditions data for development and testing
 * Covers range of crowd levels, snow conditions, and pricing
 */
export const SEED_CONDITIONS: (Omit<ResortConditionsInsert, 'resort_id'> & { resort_id: string })[] = [
  // Les Arcs - Excellent conditions, quiet
  {
    resort_id: RESORT_IDS.LES_ARCS,
    snow_depth_base: 120,
    snow_depth_summit: 180,
    fresh_snow_24h: 15,
    runs_open: 98,
    runs_total: 106,
    lifts_open: 45,
    lifts_total: 51,
    crowd_level: 'low' as CrowdLevel,
    weather_condition: 'sunny',
    temperature_min: -8,
    temperature_max: -2,
    adult_ticket_price: 59.0,
    parking_status: 'available' as ParkingStatus,
    parking_price: 15.0,
  },
  // La Plagne - Good conditions, moderate crowds
  {
    resort_id: RESORT_IDS.LA_PLAGNE,
    snow_depth_base: 100,
    snow_depth_summit: 165,
    fresh_snow_24h: 5,
    runs_open: 115,
    runs_total: 130,
    lifts_open: 65,
    lifts_total: 74,
    crowd_level: 'moderate' as CrowdLevel,
    weather_condition: 'partly_cloudy',
    temperature_min: -6,
    temperature_max: 0,
    adult_ticket_price: 57.0,
    parking_status: 'available' as ParkingStatus,
    parking_price: 12.0,
  },
  // Val d'Isère - Premium, fresh snow, busy
  {
    resort_id: RESORT_IDS.VAL_DISERE,
    snow_depth_base: 150,
    snow_depth_summit: 200,
    fresh_snow_24h: 20,
    runs_open: 75,
    runs_total: 79,
    lifts_open: 38,
    lifts_total: 42,
    crowd_level: 'high' as CrowdLevel,
    weather_condition: 'snowing',
    temperature_min: -12,
    temperature_max: -5,
    adult_ticket_price: 68.0,
    parking_status: 'limited' as ParkingStatus,
    parking_price: 20.0,
  },
  // Tignes - Great snow, moderate crowds
  {
    resort_id: RESORT_IDS.TIGNES,
    snow_depth_base: 145,
    snow_depth_summit: 195,
    fresh_snow_24h: 18,
    runs_open: 68,
    runs_total: 76,
    lifts_open: 35,
    lifts_total: 39,
    crowd_level: 'moderate' as CrowdLevel,
    weather_condition: 'cloudy',
    temperature_min: -10,
    temperature_max: -4,
    adult_ticket_price: 65.0,
    parking_status: 'available' as ParkingStatus,
    parking_price: 18.0,
  },
  // Courchevel - Luxury, very busy
  {
    resort_id: RESORT_IDS.COURCHEVEL,
    snow_depth_base: 85,
    snow_depth_summit: 140,
    fresh_snow_24h: 8,
    runs_open: 95,
    runs_total: 120,
    lifts_open: 52,
    lifts_total: 58,
    crowd_level: 'very_high' as CrowdLevel,
    weather_condition: 'sunny',
    temperature_min: -5,
    temperature_max: 2,
    adult_ticket_price: 70.0,
    parking_status: 'full' as ParkingStatus,
    parking_price: 25.0,
  },
  // Méribel - 3 Vallées, busy
  {
    resort_id: RESORT_IDS.MERIBEL,
    snow_depth_base: 90,
    snow_depth_summit: 150,
    fresh_snow_24h: 10,
    runs_open: 78,
    runs_total: 85,
    lifts_open: 38,
    lifts_total: 42,
    crowd_level: 'high' as CrowdLevel,
    weather_condition: 'partly_cloudy',
    temperature_min: -4,
    temperature_max: 1,
    adult_ticket_price: 62.0,
    parking_status: 'limited' as ParkingStatus,
    parking_price: 20.0,
  },
  // Chamonix - Legendary, snowing
  {
    resort_id: RESORT_IDS.CHAMONIX,
    snow_depth_base: 60,
    snow_depth_summit: 180,
    fresh_snow_24h: 25,
    runs_open: 65,
    runs_total: 82,
    lifts_open: 40,
    lifts_total: 49,
    crowd_level: 'moderate' as CrowdLevel,
    weather_condition: 'snowing',
    temperature_min: -15,
    temperature_max: -3,
    adult_ticket_price: 58.0,
    parking_status: 'available' as ParkingStatus,
    parking_price: 10.0,
  },
  // Megève - Charming, less snow
  {
    resort_id: RESORT_IDS.MEGEVE,
    snow_depth_base: 55,
    snow_depth_summit: 95,
    fresh_snow_24h: 3,
    runs_open: 180,
    runs_total: 215,
    lifts_open: 55,
    lifts_total: 67,
    crowd_level: 'moderate' as CrowdLevel,
    weather_condition: 'sunny',
    temperature_min: -3,
    temperature_max: 4,
    adult_ticket_price: 52.0,
    parking_status: 'available' as ParkingStatus,
    parking_price: 8.0,
  },
  // La Clusaz - Family friendly, good value, quiet
  {
    resort_id: RESORT_IDS.LA_CLUSAZ,
    snow_depth_base: 70,
    snow_depth_summit: 130,
    fresh_snow_24h: 12,
    runs_open: 80,
    runs_total: 84,
    lifts_open: 42,
    lifts_total: 49,
    crowd_level: 'low' as CrowdLevel,
    weather_condition: 'partly_cloudy',
    temperature_min: -6,
    temperature_max: 1,
    adult_ticket_price: 48.0,
    parking_status: 'available' as ParkingStatus,
    parking_price: 6.0,
  },
  // Le Grand-Bornand - Quiet, authentic
  {
    resort_id: RESORT_IDS.LE_GRAND_BORNAND,
    snow_depth_base: 65,
    snow_depth_summit: 110,
    fresh_snow_24h: 8,
    runs_open: 40,
    runs_total: 44,
    lifts_open: 23,
    lifts_total: 27,
    crowd_level: 'low' as CrowdLevel,
    weather_condition: 'cloudy',
    temperature_min: -4,
    temperature_max: 2,
    adult_ticket_price: 42.0,
    parking_status: 'available' as ParkingStatus,
    parking_price: 5.0,
  },
  // Alpe d'Huez - Sunny, good visibility
  {
    resort_id: RESORT_IDS.ALPE_DHUEZ,
    snow_depth_base: 95,
    snow_depth_summit: 170,
    fresh_snow_24h: 6,
    runs_open: 105,
    runs_total: 115,
    lifts_open: 65,
    lifts_total: 75,
    crowd_level: 'moderate' as CrowdLevel,
    weather_condition: 'sunny',
    temperature_min: -7,
    temperature_max: 1,
    adult_ticket_price: 54.0,
    parking_status: 'limited' as ParkingStatus,
    parking_price: 12.0,
  },
  // Les Deux Alpes - Glacier, reliable snow
  {
    resort_id: RESORT_IDS.LES_DEUX_ALPES,
    snow_depth_base: 110,
    snow_depth_summit: 200,
    fresh_snow_24h: 10,
    runs_open: 70,
    runs_total: 89,
    lifts_open: 42,
    lifts_total: 47,
    crowd_level: 'moderate' as CrowdLevel,
    weather_condition: 'partly_cloudy',
    temperature_min: -9,
    temperature_max: -1,
    adult_ticket_price: 56.0,
    parking_status: 'available' as ParkingStatus,
    parking_price: 10.0,
  },
];

/**
 * Get resort by key
 */
export function getResort(key: ResortKey) {
  const id = RESORT_IDS[key];
  return SEED_RESORTS.find((r) => r.id === id);
}

/**
 * Get conditions for a resort
 */
export function getConditions(key: ResortKey) {
  const id = RESORT_IDS[key];
  return SEED_CONDITIONS.find((c) => c.resort_id === id);
}

/**
 * Validate all coordinates are within French Alps bounds
 */
export function validateCoordinates(): boolean {
  const FRENCH_ALPS_BOUNDS = {
    latMin: 44.5,
    latMax: 46.5,
    lonMin: 5.5,
    lonMax: 7.5,
  };

  return SEED_RESORTS.every(
    (r) =>
      r.latitude >= FRENCH_ALPS_BOUNDS.latMin &&
      r.latitude <= FRENCH_ALPS_BOUNDS.latMax &&
      r.longitude >= FRENCH_ALPS_BOUNDS.lonMin &&
      r.longitude <= FRENCH_ALPS_BOUNDS.lonMax
  );
}
