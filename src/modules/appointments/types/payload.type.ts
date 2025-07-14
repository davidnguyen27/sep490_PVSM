export interface AppointmentPayload {
  appointment: {
    customerId: number;
    petId: number;
    appointmentDate: string;
    serviceType: number;
    location: number;
    address: string;
  };
  appointmentDetailVaccination: {
    diseaseId: number;
  };
}
