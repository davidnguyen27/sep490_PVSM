/**
 * Type definitions for Mapbox service
 */

// Core types
export interface Coordinates {
  readonly lat: number;
  readonly lng: number;
}

export interface DistanceCalculationResult {
  readonly distance: number;
  readonly centerLocation: string;
}

// API Response types
export interface MapboxGeocodingResponse {
  features: Array<{
    geometry: {
      coordinates: [number, number]; // [lng, lat]
    };
  }>;
}

export interface MapboxDirectionsResponse {
  routes: Array<{
    distance: number;
  }>;
}

// Configuration types
export interface MapboxConfig {
  readonly accessToken: string;
  readonly timeout: number;
  readonly earthRadiusKm: number;
  readonly roadDistanceFactor: number;
  readonly defaultCenterAddress: string;
}

// Error types
export class MapboxError extends Error {
  public readonly code?: string;
  public readonly statusCode?: number;

  constructor(message: string, code?: string, statusCode?: number) {
    super(message);
    this.name = "MapboxError";
    this.code = code;
    this.statusCode = statusCode;
  }
}

export class GeocodingError extends MapboxError {
  constructor(message: string, statusCode?: number) {
    super(message, "GEOCODING_ERROR", statusCode);
    this.name = "GeocodingError";
  }
}

export class DirectionsError extends MapboxError {
  constructor(message: string, statusCode?: number) {
    super(message, "DIRECTIONS_ERROR", statusCode);
    this.name = "DirectionsError";
  }
}

// Service interfaces
export interface IMapboxService {
  calculateDistanceFromCenter(
    customerAddress: string,
  ): Promise<DistanceCalculationResult>;
  calculateDistanceFromCenterById(
    customerAddress: string,
    centerAddressId: number,
  ): Promise<DistanceCalculationResult>;
}

// Utils types
export interface AddressFormatOptions {
  readonly includeCountry: boolean;
  readonly normalizeVietnamese: boolean;
  readonly normalizeCityNames: boolean;
}
