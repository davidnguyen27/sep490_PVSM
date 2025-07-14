export function mapTimeToSlot(time: string): number | null {
  if (time >= "08:00" && time < "09:00") return 8;
  if (time >= "09:00" && time < "10:00") return 9;
  if (time >= "10:00" && time < "11:00") return 10;
  if (time >= "13:00" && time < "14:00") return 11;
  if (time >= "14:00" && time < "15:00") return 13;
  if (time >= "15:00" && time < "16:00") return 14;
  if (time >= "15:00" && time < "16:00") return 15;
  if (time >= "16:00" && time < "17:00") return 16;
  return null;
}

export function mapStatus(status: number) {
  switch (status) {
    case 1:
      return "Trống";
    case 2:
      return "Đã đặt";
    default:
      return "Không rõ";
  }
}

export function extractSlotFromAppointmentDate(
  appointmentDate: string,
): number | null {
  if (!appointmentDate) return null;

  try {
    const time = appointmentDate.split("T")[1]?.slice(0, 5);
    if (!time) return null;

    return mapTimeToSlot(time);
  } catch {
    return null;
  }
}
