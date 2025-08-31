import { mappingUtils } from "./mapping.utils";

export const Utils = {
  calculateYearOld(dob: string | Date): string {
    const birthDate = new Date(dob);
    const today = new Date();

    // Tính tổng số tuần từ ngày sinh đến hiện tại
    const diffMs = today.getTime() - birthDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(diffDays / 7);

    // Tính tuổi theo năm
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    // Nếu dưới 1 tuổi, chỉ hiển thị số tuần
    if (age === 0) {
      return `0 tuổi (${totalWeeks} tuần)`;
    }

    // Nếu từ 1 tuổi trở lên, hiển thị cả tuổi và số tuần
    return `${age} tuổi (${totalWeeks} tuần)`;
  },

  extractSlotFromAppointmentDate(appointmentDate: string): number | null {
    if (!appointmentDate) return null;

    try {
      const time = appointmentDate.split("T")[1]?.slice(0, 5);
      if (!time) return null;

      return mappingUtils.mapTimeToSlot(time);
    } catch {
      return null;
    }
  },
};
