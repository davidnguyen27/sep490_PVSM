export interface VaccinationPayload {
  appointment: {
    customerId: number | null;
    petId: number | null;
    appointmentDate: string;
    serviceType: number;
    location: number;
    address: string;
  };
  updateDiseaseForAppointmentDTO: {
    diseaseId: number | null;
  };
}
