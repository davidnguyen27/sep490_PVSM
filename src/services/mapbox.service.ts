import { addressService } from "@/modules/address/services/address.service";
import type {
  Coordinates,
  DistanceCalculationResult,
  MapboxGeocodingResponse,
  MapboxDirectionsResponse,
  MapboxConfig,
} from "./mapbox.types";
import { MapboxError, GeocodingError, DirectionsError } from "./mapbox.types";

// Re-export types for easier imports
export type { Coordinates, DistanceCalculationResult } from "./mapbox.types";
export { MapboxError, GeocodingError, DirectionsError } from "./mapbox.types";

// Configuration
const CONFIG: MapboxConfig = {
  accessToken:
    import.meta.env.VITE_MAPBOX_ACCESS_TOKEN ||
    "pk.eyJ1IjoiZmNodW5ndmluaGpyIiwiYSI6ImNtZDYzYnc5cDA0cm0yd3IwNmYzbmVlbnQifQ.a3cqycLj-Vs2LdMLonDzTg",
  timeout: 10000, // 10 seconds
  earthRadiusKm: 6371,
  roadDistanceFactor: 1.3,
  defaultCenterAddress: "VaxPet Veterinary Center, Ho Chi Minh City, Vietnam",
};

export class MapboxService {
  /**
   * Generate address format variations for better geocoding success rate
   */
  private static generateAddressFormats(address: string): string[] {
    const formats = [
      address, // Original address
      `${address}, Vietnam`, // Add Vietnam if not present
      address.replace(/Việt Nam/gi, "Vietnam"), // Replace Vietnamese with English
      address.replace(/Hồ Chí Minh/gi, "Ho Chi Minh City"), // Replace city name
    ];

    // Remove duplicates
    return [...new Set(formats)];
  }

  /**
   * Create Mapbox API request with timeout and proper headers
   */
  private static async makeMapboxRequest(
    url: string,
    timeout: number = CONFIG.timeout,
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
        },
      });

      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new MapboxError(
          "Request timeout - please check your internet connection",
          "TIMEOUT_ERROR",
        );
      }

      throw error;
    }
  }

  /**
   * Get coordinates from address using Mapbox Geocoding API
   */
  private static async getLatLngFromAddress(
    address: string,
  ): Promise<Coordinates> {
    const addressFormats = this.generateAddressFormats(address);

    for (const addressFormat of addressFormats) {
      try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          addressFormat,
        )}.json?access_token=${CONFIG.accessToken}&country=VN&types=address,poi,place&limit=1&language=en`;

        const response = await this.makeMapboxRequest(url);

        if (response.ok) {
          const data: MapboxGeocodingResponse = await response.json();

          if (data.features && data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates;
            return {
              lat: coordinates[1],
              lng: coordinates[0],
            };
          }
        } else {
          throw new GeocodingError(
            `Geocoding failed: ${response.status} ${response.statusText}`,
            response.status,
          );
        }
      } catch (formatError) {
        console.log(
          `Failed with address format: ${addressFormat}`,
          formatError,
        );
        continue; // Try next format
      }
    }

    throw new GeocodingError("Address not found with any format");
  }

  /**
   * Calculate straight-line distance using Haversine formula
   */
  private static calculateHaversineDistance(
    origin: Coordinates,
    destination: Coordinates,
  ): number {
    const dLat = ((destination.lat - origin.lat) * Math.PI) / 180;
    const dLng = ((destination.lng - origin.lng) * Math.PI) / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((origin.lat * Math.PI) / 180) *
        Math.cos((destination.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return CONFIG.earthRadiusKm * c;
  }

  /**
   * Get driving distance using Mapbox Directions API with Haversine fallback
   */
  private static async getDistanceKm(
    origin: Coordinates,
    destination: Coordinates,
  ): Promise<number> {
    try {
      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${CONFIG.accessToken}&geometries=geojson`;

      const response = await this.makeMapboxRequest(url);

      if (!response.ok) {
        throw new DirectionsError(
          `Distance calculation failed: ${response.status} ${response.statusText}`,
          response.status,
        );
      }

      const data: MapboxDirectionsResponse = await response.json();

      if (!data.routes || data.routes.length === 0) {
        throw new DirectionsError("No route found");
      }

      const distanceMeters = data.routes[0].distance;
      return distanceMeters / 1000.0;
    } catch (error) {
      // Fallback to Haversine distance calculation
      console.log(
        "Mapbox Directions API failed, using Haversine fallback:",
        error,
      );

      const straightLineDistance = this.calculateHaversineDistance(
        origin,
        destination,
      );

      // Add a factor for road distance (typically 1.2-1.5x straight line distance)
      return straightLineDistance * CONFIG.roadDistanceFactor;
    }
  }

  /**
   * Get center address from address service with fallback
   */
  private static async getCenterAddress(): Promise<string> {
    try {
      // Get the first address from the address service
      const addresses = await addressService.getAllAddresses({
        pageNumber: 1,
        pageSize: 1,
      });

      if (addresses.data?.pageData && addresses.data.pageData.length > 0) {
        return addresses.data.pageData[0].location;
      }

      // Fallback to default address if no address found
      return CONFIG.defaultCenterAddress;
    } catch (error) {
      console.error("Error fetching center address:", error);
      // Fallback to default address
      return CONFIG.defaultCenterAddress;
    }
  }

  /**
   * Calculate distance from default center to customer address
   */
  public static async calculateDistanceFromCenter(
    customerAddress: string,
  ): Promise<DistanceCalculationResult> {
    try {
      console.log("Starting distance calculation for:", customerAddress);

      // Get center address from address service
      const centerAddress = await this.getCenterAddress();
      console.log("Center address:", centerAddress);

      const [customerCoords, centerCoords] = await Promise.all([
        this.getLatLngFromAddress(customerAddress),
        this.getLatLngFromAddress(centerAddress),
      ]);

      console.log("Customer coordinates:", customerCoords);
      console.log("Center coordinates:", centerCoords);

      const distance = await this.getDistanceKm(centerCoords, customerCoords);
      console.log("Calculated distance:", distance, "km");

      return {
        distance,
        centerLocation: centerAddress,
      };
    } catch (error) {
      console.error("Error calculating distance:", error);

      // Re-throw with proper error type
      if (error instanceof MapboxError) {
        throw error;
      }

      throw new MapboxError(
        error instanceof Error ? error.message : "Unknown error occurred",
        "CALCULATION_ERROR",
      );
    }
  }

  /**
   * Calculate distance from specific center address ID to customer address
   */
  public static async calculateDistanceFromCenterById(
    customerAddress: string,
    centerAddressId: number,
  ): Promise<DistanceCalculationResult> {
    try {
      // Get specific center address by ID
      const centerAddressData =
        await addressService.getAddressById(centerAddressId);
      const centerAddress = centerAddressData.location;

      const [customerCoords, centerCoords] = await Promise.all([
        this.getLatLngFromAddress(customerAddress),
        this.getLatLngFromAddress(centerAddress),
      ]);

      const distance = await this.getDistanceKm(centerCoords, customerCoords);

      return {
        distance,
        centerLocation: centerAddress,
      };
    } catch (error) {
      console.error("Error calculating distance:", error);

      // Re-throw with proper error type
      if (error instanceof MapboxError) {
        throw error;
      }

      throw new MapboxError(
        error instanceof Error ? error.message : "Unknown error occurred",
        "CALCULATION_ERROR",
      );
    }
  }
}
