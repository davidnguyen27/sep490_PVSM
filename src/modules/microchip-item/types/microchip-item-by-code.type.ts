// API Response wrapper
export interface MicrochipByCodeResponse {
  code: number;
  success: boolean;
  message: string;
  data: MicrochipItemByCode;
}

interface appointmentDetail {
  appointmentDetailId: number | null;
  appointmentId: number | null;
  appointmentDetailCode: string;
  serviceType: number;
  appointmentStatus: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  appointmentDate: string;
}

export interface MicrochipItemByCode {
  microchipId: number | null;
  name: string;
  description: string;
  installationDate: string;
  status: string;
  pet: {
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
    appointmentDetails: appointmentDetail[];
    customer: {
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
      redeemablePoints: number;
      totalSpent: number;
      createdAt: string;
      createdBy: string;
      modifiedAt: string;
      modifiedBy: string;
      isDeleted: boolean;
      accountResponseDTO: {
        accountId: number | null;
        email: string;
        role: number;
        vetId: number | null;
      };
      membershipResponseDTO: null;
    };
  };
}
