export interface MicrochipAppointment {
  microchip: {
    appointmentDetailId: number | null;
    appointmentId: number | null;
    appointmentDetailCode: string;
    serviceType: number | null;
    microchipItemId: number | null;
    appointmentDate: string;
    appointmentStatus: number;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    vet: null;
    microchipItem: null;
    appointment: {
      appointmentId: number | null;
      customerId: number | null;
      petId: number | null;
      appointmentCode: string;
      appointmentDate: string;
      serviceType: number | null;
      location: number;
      address: string;
      appointmentStatus: number;
      createdAt: string;
      createdBy: string;
      modifiedAt: string;
      modifiedBy: string;
      isDeleted: boolean;
      customerResponseDTO: {
        customerId: number | null;
        accountId: number | null;
        membershipId: number | null;
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
          accountId: number | null;
          email: string;
          role: number;
        };
      };
      petResponseDTO: {
        petId: number | null;
        customerId: number | null;
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
    payment: null;
  };
}
