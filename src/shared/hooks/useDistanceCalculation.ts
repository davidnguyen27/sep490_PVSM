import { useState, useEffect } from "react";
import {
  MapboxService,
  MapboxError,
  GeocodingError,
  DirectionsError,
} from "@/services/mapbox.service";
import {
  calculateTransportFee,
  validateAddress,
} from "@/services/mapbox.utils";

interface UseDistanceCalculationProps {
  address?: string;
  isHomeService: boolean;
  centerAddressId?: number; // Optional: specific center address ID
}

export function useDistanceCalculation({
  address,
  isHomeService,
  centerAddressId,
}: UseDistanceCalculationProps) {
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transportFee, setTransportFee] = useState<number>(0);
  const [centerLocation, setCenterLocation] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);

  // Transport fee calculation logic (using utility function)
  // const calculateTransportFee = (distanceKm: number): number => {
  //   if (distanceKm <= 5) return 50000; // 50k for <= 5km
  //   if (distanceKm <= 10) return 80000; // 80k for 5-10km
  //   if (distanceKm <= 20) return 120000; // 120k for 10-20km
  //   return 200000; // 200k for > 20km
  // };

  useEffect(() => {
    if (!isHomeService || !address?.trim()) {
      setDistance(null);
      setTransportFee(0);
      setError(null);
      setCenterLocation("");
      setRetryCount(0);
      return;
    }

    const calculateDistance = async (attempt = 0) => {
      const maxRetries = 3;
      setLoading(true);
      setError(null);

      try {
        let result;

        // Validate address before making API call
        const validation = validateAddress(address);
        if (!validation.isValid) {
          throw new Error(validation.error);
        }

        // Log the address for debugging
        console.log("Calculating distance for address:", address);

        if (centerAddressId) {
          // Use specific center address ID
          result = await MapboxService.calculateDistanceFromCenterById(
            address,
            centerAddressId,
          );
        } else {
          // Use default center address from service
          result = await MapboxService.calculateDistanceFromCenter(address);
        }

        setDistance(result.distance);
        setCenterLocation(result.centerLocation);
        setTransportFee(calculateTransportFee(result.distance));
        setRetryCount(0);
        setError(null);
      } catch (err) {
        console.error(
          `Distance calculation attempt ${attempt + 1} failed:`,
          err,
        );

        // Determine error message based on error type
        let errorMessage = "Không thể tính khoảng cách";

        if (err instanceof GeocodingError) {
          if (err.statusCode === 401) {
            errorMessage = "Lỗi xác thực API, vui lòng liên hệ quản trị viên";
          } else if (err.statusCode === 403) {
            errorMessage =
              "Không có quyền truy cập API, vui lòng liên hệ quản trị viên";
          } else if (err.statusCode === 429) {
            errorMessage = "Quá nhiều yêu cầu, vui lòng thử lại sau";
          } else if (err.message.includes("Address not found")) {
            errorMessage = `Không tìm thấy địa chỉ "${address.substring(0, 50)}..."`;
          } else {
            errorMessage = `Lỗi tìm kiếm địa chỉ (${err.statusCode || "Unknown"})`;
          }
        } else if (err instanceof DirectionsError) {
          if (err.message.includes("No route found")) {
            errorMessage = "Không tìm thấy đường đi, vui lòng thử lại";
          } else {
            errorMessage = "Lỗi tính khoảng cách, vui lòng thử lại";
          }
        } else if (err instanceof MapboxError) {
          if (err.code === "TIMEOUT_ERROR") {
            errorMessage = "Lỗi kết nối mạng, vui lòng kiểm tra internet";
          } else {
            errorMessage = `Lỗi: ${err.message}`;
          }
        } else if (err instanceof Error) {
          if (err.message.includes("quá ngắn")) {
            errorMessage = err.message;
          } else {
            errorMessage = `Lỗi: ${err.message}`;
          }
        }

        // Retry logic
        if (
          attempt < maxRetries &&
          !(err instanceof Error && err.message.includes("quá ngắn"))
        ) {
          setRetryCount(attempt + 1);
          console.log(
            `Retrying distance calculation in ${(attempt + 1) * 1000}ms...`,
          );

          setTimeout(
            () => {
              calculateDistance(attempt + 1);
            },
            (attempt + 1) * 1000,
          ); // Exponential backoff: 1s, 2s, 3s

          return; // Don't set error state yet, we're retrying
        }

        // Set error state only after all retries failed
        setError(errorMessage);
        setDistance(null);
        setTransportFee(0);
        setCenterLocation("");
        setRetryCount(0);
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
    error,
    retryCount,
  };
}
