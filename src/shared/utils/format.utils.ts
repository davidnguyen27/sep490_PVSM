export const formatData = {
  formatDate: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
  formatDateTime: (date: string) => new Date(date).toLocaleString("vi-VN"),
};
