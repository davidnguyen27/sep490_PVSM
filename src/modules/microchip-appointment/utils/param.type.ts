export interface UpdateStatusParams {
  appointmentId: number | null;
  appointmentStatus: number;
  vetId?: number | null;
  microchipItemId?: number | null;
  description?: string;
  note?: string;
}
