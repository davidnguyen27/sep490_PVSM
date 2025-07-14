export interface VaccinationApp {
  appointment: {
    appointmentId: number;
    customerId: number;
    petId: number;
    appointmentCode: string;
    appointmentDate: string;
    serviceType: number;
    location: number;
    address: string;
    appointmentStatus: number;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    isDeleted: boolean;
    customerResponseDTO: {
      customerId: number;
      accountId: number;
      membershipId: number;
      customerCode: string;
      fullName: string;
      userName: string;
      image: string;
      phoneNumber: string;
      dateOfBirth: string;
      gender: string;
      address: string;
      currentPoints: number;
      createdAt: string;
      createdBy: string;
      modifiedAt: string;
      modifiedBy: string;
      isDeleted: boolean;
      accountResponseDTO: {
        accountId: number;
        email: string;
        role: number;
      };
    };
    petResponseDTO: {
      petId: number;
      customerId: number;
      petCode: string;
      name: string;
      species: string;
      breed: string;
      gender: string;
      dateOfBirth: string;
      placeToLive: string;
      placeOfBirth: string;
      image: string;
      weight: string;
      color: string;
      nationality: string;
      isSterilized: boolean;
      isDeleted: boolean;
    };
  };
  appointmentHasDiseaseResponseDTO: {
    diseaseId: number;
    disease: {
      diseaseId: number;
      name: string;
      description: string;
      species: string;
      symptoms: string;
      treatment: string;
      status: string;
      createdAt: string;
      createdBy: string;
      modifiedAt: string;
      modifiedBy: string;
      isDeleted: string;
    };
  };
}
