export const VACCINE_DISEASE_QUERY_KEYS = {
  all: ["vaccine-diseases"] as const,
  lists: () => [...VACCINE_DISEASE_QUERY_KEYS.all, "list"] as const,
  list: (filters: Record<string, unknown> | unknown) =>
    [...VACCINE_DISEASE_QUERY_KEYS.lists(), filters] as const,
} as const;

export const VACCINE_DISEASE_PAGE_SIZES = {
  DEFAULT: 10,
  SMALL: 5,
  MEDIUM: 10,
  LARGE: 20,
} as const;

export const VACCINE_DISEASE_MESSAGES = {
  LOADING: "Đang tải danh sách mối liên kết vaccine-bệnh...",
  EMPTY: "Không tìm thấy mối liên kết vaccine-bệnh nào",
  SEARCH_PLACEHOLDER: "Nhập tên vaccine hoặc bệnh để tìm kiếm...",
  ERROR: "Có lỗi xảy ra khi tải dữ liệu",
  CREATE_SUCCESS: "Đã thêm mới vắc-xin",
  CREATE_ERROR: "Có lỗi xảy ra khi thêm vắc-xin",
  CREATE_TITLE: "Thêm mới vắc-xin",
  CREATE_BUTTON: "Tạo mối liên kết",
  UPDATE_TITLE: "Cập nhật mối liên kết vaccine-bệnh",
  UPDATE: "Cập nhật",
  UPDATING: "Đang cập nhật...",
  UPDATE_SUCCESS: "Cập nhật mối liên kết vaccine-bệnh thành công!",
  UPDATE_ERROR: "Có lỗi xảy ra khi cập nhật mối liên kết vaccine-bệnh",
  DELETE_SUCCESS: "Xóa mối liên kết vaccine-bệnh thành công!",
  DELETE_ERROR: "Có lỗi xảy ra khi xóa mối liên kết vaccine-bệnh",
  SELECT_VACCINE: "Chọn vaccine...",
  SELECT_DISEASE: "Chọn bệnh tật...",
} as const;
