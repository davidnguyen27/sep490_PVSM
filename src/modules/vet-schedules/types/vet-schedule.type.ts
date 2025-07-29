export interface Schedule {
  vetScheduleId: number | null;
  vetId: number | null;
  scheduleDate: string;
  slotNumber: number;
  status: number;
}

export interface VetSchedule {
  vetScheduleId: number | null;
  vetId: number | null;
  scheduleDate: string;
  slotNumber: number;
  status: number;
  createdAt: string;
  createdBy: string;
  vetResponse: {
    vetId: number | null;
    accountId: number | null;
    vetCode: string;
    name: string;
    image: string;
    specialization: string;
    dateOfBirth: string;
    phoneNumber: string;
    account: object;
    scheduleResponse: Schedule[];
  };
}
