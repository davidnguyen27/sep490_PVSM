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

  // New function to handle date input field format without timezone issues
  formatDateForInput: (date: string) => {
    if (!date) return "";

    // If the date is already in yyyy-mm-dd format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return date;
    }

    // Parse the date string directly without timezone conversion
    const dateStr = date.includes("T") ? date.split("T")[0] : date;

    // Validate the date format
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }

    // If it's in another format, try to parse and format
    try {
      const d = new Date(date);
      // Use local timezone date components to avoid timezone shift
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
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
