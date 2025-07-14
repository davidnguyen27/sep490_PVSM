import { mapTimeToSlot } from "./map-slot.utils";

export const vaccinationUtils = {
  calculateYearOld(dob: string | Date): number {
    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  },

  extractSlotFromAppointmentDate(appointmentDate: string): number | null {
    if (!appointmentDate) return null;

    try {
      const time = appointmentDate.split("T")[1]?.slice(0, 5);
      if (!time) return null;

      return mapTimeToSlot(time);
    } catch {
      return null;
    }
  },
};
