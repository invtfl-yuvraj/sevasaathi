/**
 * Calculate the distance between two coordinates using the Haversine formula
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns Distance in kilometers
 */


export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

/**
 * Convert degrees to radians
 */
export function deg2rad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Calculate estimated arrival time based on distance and average speed
 * @param distanceInKm - Distance in kilometers
 * @param avgSpeedKmH - Average speed in km/h (default: 30)
 * @returns Estimated arrival time in minutes
 */
export function calculateETA(distanceInKm: number, avgSpeedKmH = 30): number {
  const etaMinutes = (distanceInKm / avgSpeedKmH) * 60;
  return Math.round(etaMinutes);
}
