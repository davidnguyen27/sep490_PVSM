import { useQuery } from "@tanstack/react-query";
import { customerService } from "@/modules/customers/services/customer.service";
import type { Customer } from "@/modules/customers/types/customer.type";
import { useMemo, useState, useEffect } from "react";

export interface CustomerOption {
  value: string;
  label: string;
  customerCode: string;
  fullData: Customer; // Thêm full data để flexible hơn
}

interface UseCustomersOptions {
  enabled?: boolean;
  pageSize?: number;
  searchKeyword?: string;
}

const CUSTOMERS_QUERY_KEY = ["customers"] as const;

export function useCustomers(options: UseCustomersOptions = {}) {
  const {
    enabled = true,
    pageSize = 100, // Giảm xuống reasonable number
    searchKeyword = "",
  } = options;

  // Sử dụng TanStack Query cho caching và state management
  const {
    data: response,
    isLoading,
    error,
    refetch,
    isError,
  } = useQuery({
    queryKey: [...CUSTOMERS_QUERY_KEY, { pageSize, searchKeyword }],
    queryFn: () =>
      customerService.getAllCustomers({
        pageNumber: 1,
        pageSize,
        keyWord: searchKeyword,
      }),
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });

  // Memoize computed data để tránh re-render không cần thiết
  const customers = useMemo(() => {
    if (!response?.data?.pageData) return [];

    return response.data.pageData
      .filter((customer: Customer) => customer.customerId) // Filter invalid data
      .map(
        (customer: Customer): CustomerOption => ({
          value: customer.customerId!.toString(),
          label: `${customer.fullName} (${customer.customerCode})`,
          customerCode: customer.customerCode,
          fullData: customer,
        }),
      );
  }, [response?.data?.pageData]);

  // Error message handling với fallback
  const errorMessage = useMemo(() => {
    if (!isError || !error) return null;

    // Type-safe error handling
    if (error instanceof Error) {
      return error.message;
    }

    return "Không thể tải danh sách khách hàng";
  }, [isError, error]);

  return {
    customers,
    loading: isLoading,
    error: errorMessage,
    refetch,
    isError,
    totalCount: response?.data?.pageInfo?.totalItem ?? 0,
  } as const; // as const để better type inference
}

// Hook helper cho search với debounce
export function useCustomerSearch(searchTerm: string, delay = 300) {
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, delay);

    return () => clearTimeout(timer);
  }, [searchTerm, delay]);

  return useCustomers({
    searchKeyword: debouncedSearch,
    pageSize: 50, // Smaller page size for search
  });
}
