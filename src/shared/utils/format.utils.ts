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
  formatDateMDY: (date: string) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${month}/${day}/${year}`;
  },

  parseDateDMYtoMDY(date: string): string {
    if (!date) return date;
    if (
      /\d{4}-\d{2}-\d{2}/.test(date) ||
      (/\d{2}\/\d{2}\/\d{4}/.test(date) && date.indexOf("/") === 2)
    )
      return date;
    // Nếu là dd/mm/yyyy thì chuyển thành mm/dd/yyyy
    const [dd, mm, yyyy] = date.split("/");
    if (dd && mm && yyyy) return `${mm}/${dd}/${yyyy}`;
    return date;
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
