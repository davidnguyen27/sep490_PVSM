export const formatData = {
  formatDate: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
  formatDateTime: (date: string) => new Date(date).toLocaleString("vi-VN"),
  formatDateYMD: (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  },

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  },

  formatServiceType(type: number): string {
    switch (type) {
      case 1:
        return "Tiêm chủng";

      case 2:
        return "Microchip";

      case 3:
        return "Chứng nhận sức khỏe";

      default:
        return "Không xác định";
    }
  },

  formatLocation(location: number): string {
    switch (location) {
      case 1:
        return "Tại trung tâm";

      case 2:
        return "Tại nhà";

      default:
        return "Không xác định";
    }
  },
};
