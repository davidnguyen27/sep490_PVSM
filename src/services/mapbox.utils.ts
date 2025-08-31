/**
 * Utility functions for Mapbox service
 */

import type { AddressFormatOptions } from "./mapbox.types";

/**
 * Generate multiple address format variations for better geocoding success
 */
export function generateAddressFormats(
  address: string,
  options: Partial<AddressFormatOptions> = {},
): string[] {
  const {
    includeCountry = true,
    normalizeVietnamese = true,
    normalizeCityNames = true,
  } = options;

  const formats = [address]; // Start with original address

  if (includeCountry && !address.toLowerCase().includes("vietnam")) {
    formats.push(`${address}, Vietnam`);
  }

  if (normalizeVietnamese) {
    formats.push(address.replace(/Việt Nam/gi, "Vietnam"));
  }

  if (normalizeCityNames) {
    formats.push(address.replace(/Hồ Chí Minh/gi, "Ho Chi Minh City"));
  }

  // Remove duplicates
  return [...new Set(formats)];
}

/**
 * Calculate transport fee based on distance
 */
export function calculateTransportFee(distanceKm: number): number {
  if (distanceKm <= 5) return 50000; // 50k for <= 5km
  if (distanceKm <= 10) return 80000; // 80k for 5-10km
  if (distanceKm <= 20) return 120000; // 120k for 10-20km
  return 200000; // 200k for > 20km
}

/**
 * Format distance for display
 */
export function formatDistance(distance: number): string {
  return `${distance.toFixed(1)} km`;
}

/**
 * Format currency for display
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Validate address format
 */
export function validateAddress(address: string): {
  isValid: boolean;
  error?: string;
} {
  if (!address?.trim()) {
    return {
      isValid: false,
      error: "Địa chỉ không được để trống",
    };
  }

  if (address.length < 10) {
    return {
      isValid: false,
      error: "Địa chỉ quá ngắn, vui lòng nhập địa chỉ chi tiết hơn",
    };
  }

  return { isValid: true };
}

/**
 * Convert coordinates to string for debugging
 */
export function coordinatesToString(coords: {
  lat: number;
  lng: number;
}): string {
  return `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`;
}
