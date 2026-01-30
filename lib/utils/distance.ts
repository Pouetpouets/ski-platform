/**
 * Distance calculation utilities using Haversine formula
 */

// Earth's radius in kilometers
const EARTH_RADIUS_KM = 6371;

// Average driving speed for mountain roads (km/h)
const AVERAGE_DRIVING_SPEED_KMH = 60;

// Default reference city if user location unavailable (Lyon)
export const DEFAULT_REFERENCE_LOCATION = {
  latitude: 45.764,
  longitude: 4.8357,
  name: 'Lyon',
} as const;

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

/**
 * Format distance for display
 * - Under 100km: show one decimal (e.g., "45.2 km")
 * - Over 100km: show whole numbers (e.g., "156 km")
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 100) {
    return `${distanceKm.toFixed(1)} km`;
  }
  return `${Math.round(distanceKm)} km`;
}

/**
 * Estimate driving time based on distance
 * Returns formatted string (e.g., "~1h 15min")
 */
export function estimateDrivingTime(distanceKm: number): string {
  // Add 20% for mountain road conditions
  const adjustedDistance = distanceKm * 1.2;
  const totalMinutes = Math.round((adjustedDistance / AVERAGE_DRIVING_SPEED_KMH) * 60);

  if (totalMinutes < 60) {
    return `~${totalMinutes}min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (minutes === 0) {
    return `~${hours}h`;
  }

  return `~${hours}h ${minutes}min`;
}

/**
 * Get distance info from user location to a point
 */
export interface DistanceInfo {
  distance: number;
  formattedDistance: string;
  drivingTime: string;
  fromLocation: string;
}

export function getDistanceInfo(
  userLocation: { latitude: number; longitude: number } | null,
  targetLat: number,
  targetLon: number
): DistanceInfo {
  const location = userLocation ?? DEFAULT_REFERENCE_LOCATION;
  const isUserLocation = userLocation !== null;

  const distance = calculateDistance(
    location.latitude,
    location.longitude,
    targetLat,
    targetLon
  );

  return {
    distance,
    formattedDistance: formatDistance(distance),
    drivingTime: estimateDrivingTime(distance),
    fromLocation: isUserLocation ? 'your location' : DEFAULT_REFERENCE_LOCATION.name,
  };
}
