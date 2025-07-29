import { formatData } from "@/shared/utils/format.utils";

export const useDateFormatting = () => {
  const formatDateToYMD = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateToDMY = (date: Date) => {
    return formatData.formatDate(date.toISOString());
  };

  const getMonthName = (date: Date) => {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  return {
    formatDateToYMD,
    formatDateToDMY,
    getMonthName,
  };
};
