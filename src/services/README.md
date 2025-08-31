# Mapbox Service Documentation

## Overview

Tối ưu hóa hoàn toàn Mapbox service với kiến trúc chuẩn type-safe, dễ bảo trì và có khả năng mở rộng cao.

## Architecture

### 🏗️ File Structure

```
src/services/
├── mapbox.service.ts      # Main service class
├── mapbox.types.ts        # Type definitions
├── mapbox.utils.ts        # Utility functions
└── README.md             # Documentation
```

### 📝 Type Safety

- **Strict TypeScript**: Tất cả functions đều có type definitions rõ ràng
- **Error Types**: Custom error classes cho từng loại lỗi (GeocodingError, DirectionsError, MapboxError)
- **Interface Contracts**: Định nghĩa rõ ràng input/output của mỗi function
- **Immutable Data**: Sử dụng readonly properties cho data integrity

### 🔧 Configuration Management

```typescript
const CONFIG: MapboxConfig = {
  accessToken: string,
  timeout: number,
  earthRadiusKm: number,
  roadDistanceFactor: number,
  defaultCenterAddress: string,
};
```

## Features

### ✨ Enhanced Error Handling

- **Typed Errors**: Specific error types cho debugging dễ dàng
- **Status Codes**: HTTP status codes cho API errors
- **Fallback Mechanisms**: Haversine calculation khi Directions API fail
- **Retry Logic**: Built-in retry với exponential backoff

### 🚀 Performance Optimizations

- **Request Timeout**: Configurable timeout để tránh hanging requests
- **Address Formats**: Multiple format attempts để tăng success rate
- **Parallel Processing**: Promise.all cho concurrent API calls
- **Memory Efficient**: Proper cleanup và abort controllers

### 🛠️ Utility Functions

```typescript
// Address validation
validateAddress(address: string): { isValid: boolean; error?: string }

// Transport fee calculation
calculateTransportFee(distanceKm: number): number

// Format functions
formatDistance(distance: number): string
formatCurrency(amount: number): string
```

## Usage

### Basic Distance Calculation

```typescript
import { MapboxService } from "@/services/mapbox.service";

const result = await MapboxService.calculateDistanceFromCenter(
  "250 Nguyễn Xí, Phường 13, Bình Thạnh, Hồ Chí Minh",
);

console.log(`Distance: ${result.distance} km`);
console.log(`Center: ${result.centerLocation}`);
```

### With Specific Center ID

```typescript
const result = await MapboxService.calculateDistanceFromCenterById(
  customerAddress,
  centerAddressId,
);
```

### Using React Hook

```typescript
import { useDistanceCalculation } from "@/shared/hooks/useDistanceCalculation";

const { distance, transportFee, centerLocation, loading, error, retryCount } =
  useDistanceCalculation({
    address: customerAddress,
    isHomeService: true,
    centerAddressId: 1, // optional
  });
```

### Error Handling

```typescript
try {
  const result = await MapboxService.calculateDistanceFromCenter(address);
} catch (error) {
  if (error instanceof GeocodingError) {
    console.error(
      `Geocoding failed: ${error.message}, Status: ${error.statusCode}`,
    );
  } else if (error instanceof DirectionsError) {
    console.error(`Directions failed: ${error.message}`);
  } else if (error instanceof MapboxError) {
    console.error(`Mapbox error: ${error.code} - ${error.message}`);
  }
}
```

## Benefits

### 🎯 Type Safety

- **Zero Runtime Errors**: Catch errors at compile time
- **IntelliSense Support**: Better IDE support với auto-completion
- **Refactoring Safe**: Easy để refactor mà không sợ break

### 🔧 Maintainability

- **Separation of Concerns**: Logic tách biệt thành files riêng
- **Single Responsibility**: Mỗi function có một mục đích cụ thể
- **Configuration Driven**: Dễ thay đổi config mà không touch code logic

### 📈 Scalability

- **Modular Design**: Dễ extend với features mới
- **Interface Based**: Dễ mock cho testing
- **Utility Functions**: Reusable functions cho các use cases khác

### 🐛 Debugging

- **Structured Errors**: Error messages có thông tin chi tiết
- **Console Logging**: Comprehensive logging cho debugging
- **Error Categorization**: Dễ identify loại lỗi và cách fix

### ⚡ Performance

- **Request Optimization**: Timeout và abort controllers
- **Fallback Strategies**: Multiple approaches cho reliability
- **Memory Management**: Proper cleanup resources

## Migration Notes

### Breaking Changes

- Import paths đã thay đổi (cần update imports)
- Error types giờ có structure khác
- Configuration approach mới

### Compatibility

- Backward compatible với existing API calls
- Hook interface không đổi
- Transport fee calculation logic giữ nguyên

## Best Practices

1. **Always handle errors properly**
2. **Use utility functions thay vì duplicate logic**
3. **Validate inputs trước khi call API**
4. **Use TypeScript types để ensure correctness**
5. **Configure timeouts appropriately cho use case**
6. **Test với various address formats**

## Environment Variables

```env
VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_token_here
```

---

_Được tối ưu cho performance, maintainability và type safety_ 🚀
