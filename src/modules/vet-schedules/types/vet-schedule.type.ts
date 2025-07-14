export interface VetSchedule {
  vetScheduleId: number;
  vetId: number;
  scheduleDate: string;
  slotNumber: number;
  status: number;
  createdAt: string;
  createdBy: string;
  vetResponse: {
    vetId: number;
    accountId: number;
    vetCode: string;
    name: string;
    image: string;
    specialization: string;
    dateOfBirth: string;
    phoneNumber: string;
    account: object;
  };
}
