export const VACCINE_RECEIPT_QUERY_KEYS = {
  all: ["vaccine-receipts"] as const,
  lists: () => [...VACCINE_RECEIPT_QUERY_KEYS.all, "list"] as const,
  list: (filters: unknown) =>
    [...VACCINE_RECEIPT_QUERY_KEYS.lists(), filters] as const,
} as const;

export const VACCINE_RECEIPT_PAGE_SIZES = {
  DEFAULT: 10,
  SMALL: 5,
  MEDIUM: 10,
  LARGE: 20,
} as const;

export const VACCINE_RECEIPT_MESSAGES = {
  LOADING: "Đang tải danh sách phiếu nhập vaccine...",
  EMPTY: "Không tìm thấy phiếu nhập vaccine nào",
  SEARCH_PLACEHOLDER: "Nhập mã phiếu để tìm kiếm...",
  ERROR: "Có lỗi xảy ra khi tải dữ liệu",
} as const;
