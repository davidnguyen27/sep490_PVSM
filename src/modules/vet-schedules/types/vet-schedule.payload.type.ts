interface Schedules {
  scheduleDate: string;
  slotNumbers: number[];
}

export interface VetSchedulePayload {
  vetId: number;
  schedules: Schedules[];
  status: number;
}
