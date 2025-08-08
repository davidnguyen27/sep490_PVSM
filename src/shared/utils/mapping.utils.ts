export const mappingUtils = {
  mapTimeToSlot(time: string): number | null {
    if (time >= "08:00" && time < "09:00") return 8;
    if (time >= "09:00" && time < "10:00") return 9;
    if (time >= "10:00" && time < "11:00") return 10;
    if (time >= "13:00" && time < "14:00") return 11;
    if (time >= "14:00" && time < "15:00") return 13;
    if (time >= "15:00" && time < "16:00") return 14;
    if (time >= "15:00" && time < "16:00") return 15;
    if (time >= "16:00" && time < "17:00") return 16;
    return null;
  },

  mapSlotToTime(slot: number): string | null {
    switch (slot) {
      case 8:
        return "08:00 - 09:00";
      case 9:
        return "09:00 - 10:00";
      case 10:
        return "10:00 - 11:00";
      case 11:
        return "11:00 - 12:00";
      case 13:
        return "13:00 - 14:00";
      case 14:
        return "14:00 - 15:00";
      case 15:
        return "15:00 - 16:00";
      case 16:
        return "16:00 - 17:00";
      default:
        return null;
    }
  },

  mapStatus(status: number) {
    switch (status) {
      case 1:
        return "Trống";
      case 2:
        return "Trễ hẹn";
      case 3:
        return "Đã đặt";
      default:
        return "Không có lịch";
    }
  },
};
