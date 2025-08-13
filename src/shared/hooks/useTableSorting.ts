import { useState, useMemo } from "react";

export type SortOrder = "asc" | "desc" | null;

export interface SortableItem {
  [key: string]: unknown;
  [key: number]: unknown;
}

export interface UseTableSortingOptions<T extends SortableItem> {
  data: T[];
  idField: keyof T;
  currentPage: number;
  pageSize: number;
  customFilter?: (items: T[]) => T[];
}

export interface UseTableSortingReturn<T> {
  sortOrder: SortOrder;
  sortedData: T[];
  handleSortClick: () => void;
  getSortIconName: () => "ArrowUp" | "ArrowDown" | "ArrowDownUp";
}

/**
 * Custom hook for handling table sorting with STT (sequential number) ordering
 * and default newest-first (by ID desc) sorting
 *
 * STT numbering is continuous across pages:
 * - Page 1: 1, 2, 3, ..., 10
 * - Page 2: 11, 12, 13, ..., 20
 * - Page 3: 21, 22, 23, ..., 30
 *
 * @param options - Configuration options
 * @returns Sorting state and utilities
 */
export function useTableSorting<T extends SortableItem>({
  data,
  idField,
  currentPage,
  pageSize,
  customFilter,
}: UseTableSortingOptions<T>): UseTableSortingReturn<T> {
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  // Handle STT sorting click
  const handleSortClick = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  // Get sort icon name based on current sort order
  const getSortIconName = (): "ArrowUp" | "ArrowDown" | "ArrowDownUp" => {
    if (sortOrder === "asc") {
      return "ArrowUp";
    } else if (sortOrder === "desc") {
      return "ArrowDown";
    } else {
      return "ArrowDownUp";
    }
  };

  // Memoized sorted data
  const sortedData = useMemo(() => {
    // Apply custom filter if provided (e.g., for filtering deleted items)
    const filteredData = customFilter ? customFilter(data) : data;

    // Sort by ID desc to show newest items first
    const newestFirstItems = [...filteredData].sort((a, b) => {
      const aId = (a[idField] as number) ?? 0;
      const bId = (b[idField] as number) ?? 0;
      return bId - aId;
    });

    // If no STT sorting is applied, return default sorted data with continuous STT
    if (sortOrder === null) {
      return newestFirstItems.map((item, index) => ({
        ...item,
        sttNumber: (currentPage - 1) * pageSize + index + 1,
      }));
    }

    // Apply STT sorting on already sorted data with continuous numbering
    const indexedItems = newestFirstItems.map((item, index) => ({
      ...item,
      originalIndex: (currentPage - 1) * pageSize + index + 1,
      sttNumber: (currentPage - 1) * pageSize + index + 1,
    }));

    return indexedItems.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.originalIndex - b.originalIndex;
      } else {
        return b.originalIndex - a.originalIndex;
      }
    });
  }, [data, idField, currentPage, pageSize, sortOrder, customFilter]);

  return {
    sortOrder,
    sortedData,
    handleSortClick,
    getSortIconName,
  };
}
