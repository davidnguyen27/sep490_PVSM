import { addressService } from "@/modules/address/services/address.service";

const MAPBOX_ACCESS_TOKEN = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZmNodW5ndmluaGpyIiwiYSI6ImNtZDYzYnc5cDA0cm0yd3IwNmYzbmVlbnQifQ.a3cqycLj-Vs2LdMLonDzTg';

export interface Coordinates {
    lat: number;
    lng: number;
}

export interface DistanceCalculationResult {
    distance: number;
    centerLocation: string;
}

export class MapboxService {
    private static async getLatLngFromAddress(address: string): Promise<Coordinates> {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_ACCESS_TOKEN}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Geocoding failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.features || data.features.length === 0) {
            throw new Error('Address not found');
        }

        const coordinates = data.features[0].geometry.coordinates;
        return {
            lat: coordinates[1],
            lng: coordinates[0]
        };
    }

    private static async getDistanceKm(origin: Coordinates, destination: Coordinates): Promise<number> {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${MAPBOX_ACCESS_TOKEN}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Distance calculation failed: ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.routes || data.routes.length === 0) {
            throw new Error('No route found');
        }

        const distanceMeters = data.routes[0].distance;
        return distanceMeters / 1000.0;
    }

    private static async getCenterAddress(): Promise<string> {
        try {
            // Get the first address from the address service
            const addresses = await addressService.getAllAddresses({
                pageNumber: 1,
                pageSize: 1
            });

            if (addresses.data?.pageData && addresses.data.pageData.length > 0) {
                return addresses.data.pageData[0].location;
            }

            // Fallback to default address if no address found
            return "VaxPet Veterinary Center, Ho Chi Minh City, Vietnam";
        } catch (error) {
            console.error('Error fetching center address:', error);
            // Fallback to default address
            return "VaxPet Veterinary Center, Ho Chi Minh City, Vietnam";
        }
    }

    public static async calculateDistanceFromCenter(customerAddress: string): Promise<DistanceCalculationResult> {
        try {
            // Get center address from address service
            const centerAddress = await this.getCenterAddress();

            const [customerCoords, centerCoords] = await Promise.all([
                this.getLatLngFromAddress(customerAddress),
                this.getLatLngFromAddress(centerAddress)
            ]);

            const distance = await this.getDistanceKm(centerCoords, customerCoords);

            return {
                distance,
                centerLocation: centerAddress
            };
        } catch (error) {
            console.error('Error calculating distance:', error);
            throw error;
        }
    }

    // Alternative method to get distance with specific center address ID
    public static async calculateDistanceFromCenterById(
        customerAddress: string,
        centerAddressId: number
    ): Promise<DistanceCalculationResult> {
        try {
            // Get specific center address by ID
            const centerAddressData = await addressService.getAddressById(centerAddressId);
            const centerAddress = centerAddressData.location;

            const [customerCoords, centerCoords] = await Promise.all([
                this.getLatLngFromAddress(customerAddress),
                this.getLatLngFromAddress(centerAddress)
            ]);

            const distance = await this.getDistanceKm(centerCoords, customerCoords);

            return {
                distance,
                centerLocation: centerAddress
            };
        } catch (error) {
            console.error('Error calculating distance:', error);
            throw error;
        }
    }
}
