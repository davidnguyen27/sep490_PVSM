import { mappingUtils } from "./mapping.utils";

export const Utils = {
  calculateYearOld(dob: string | Date): string {
    const birthDate = new Date(dob);
    const today = new Date();

    // Nếu năm sinh là năm hiện tại
    if (birthDate.getFullYear() === today.getFullYear()) {
      const diffMs = today.getTime() - birthDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays < 7) {
        return `${diffDays} ngày`;
      }
      const diffWeeks = Math.floor(diffDays / 7);
      if (diffWeeks < 8) {
        return `${diffWeeks} tuần`;
      }
    }

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return `${age} tuổi`;
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
