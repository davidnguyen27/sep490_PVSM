export const AppStatusMapped: Record<number, string> = {
  1: "Chờ xử lý",
  2: "Đã xác nhận",
  3: "Đã check-in",
  4: "Đã xử lý",
  5: "Đã thanh toán",
  9: "Hoàn tất",
  10: "Đã hủy",
  11: "Hệ thống từ chối",
};

export const getBadgeColor = (status: number): string => {
  switch (status) {
    case 1: // Chờ xử lý
      return "text-yellow-500 border-yellow-500";
    case 2: // Đã xác nhận
      return "text-emerald-500 border-emerald-500";
    case 3: // Đã check-in
      return "text-sky-500 border-sky-500";
    case 4: // Đã tiêm
      return "text-primary border-primary";
    case 5: // Đã thanh toán
      return "text-primary border-primary";
    case 6: // Đã áp dụng
      return "text-sky-500 border-sky-500";
    case 7: // Đã cấp
      return "text-primary border-primary";
    case 8: // Bị từ chối
      return "text-red-500 border-red-500";
    case 9: // Hoàn tất
      return "text-primary border-primary";
    case 10: // Đã hủy
      return "text-red-500 border-red-500";
    case 11: // Hệ thống từ chối
      return "text-red-500 border-red-500";
    default:
      return "bg-slate-100 text-slate-700";
  }
};
