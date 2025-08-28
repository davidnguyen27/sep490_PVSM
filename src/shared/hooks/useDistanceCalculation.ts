import { useState, useEffect } from 'react';
import { MapboxService } from '@/services/mapbox.service';

interface UseDistanceCalculationProps {
    address?: string;
    isHomeService: boolean;
    centerAddressId?: number; // Optional: specific center address ID
}

export function useDistanceCalculation({
    address,
    isHomeService,
    centerAddressId
}: UseDistanceCalculationProps) {
    const [distance, setDistance] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [transportFee, setTransportFee] = useState<number>(0);
    const [centerLocation, setCenterLocation] = useState<string>('');

    // Transport fee calculation logic (based on your backend logic)
    const calculateTransportFee = (distanceKm: number): number => {
        if (distanceKm <= 5) return 50000; // 50k for <= 5km
        if (distanceKm <= 10) return 80000; // 80k for 5-10km
        if (distanceKm <= 20) return 120000; // 120k for 10-20km
        return 200000; // 200k for > 20km
    };

    useEffect(() => {
        if (!isHomeService || !address) {
            setDistance(null);
            setTransportFee(0);
            setError(null);
            setCenterLocation('');
            return;
        }

        const calculateDistance = async () => {
            setLoading(true);
            setError(null);

            try {
                let result;

                if (centerAddressId) {
                    // Use specific center address ID
                    result = await MapboxService.calculateDistanceFromCenterById(address, centerAddressId);
                } else {
                    // Use default center address from service
                    result = await MapboxService.calculateDistanceFromCenter(address);
                }

                setDistance(result.distance);
                setCenterLocation(result.centerLocation);
                setTransportFee(calculateTransportFee(result.distance));
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Không thể tính khoảng cách');
                setDistance(null);
                setTransportFee(0);
                setCenterLocation('');
            } finally {
                setLoading(false);
            }
        };

        calculateDistance();
    }, [address, isHomeService, centerAddressId]);

    return {
        distance,
        transportFee,
        centerLocation,
        loading,
        error
    };
}
