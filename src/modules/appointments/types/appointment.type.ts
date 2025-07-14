import type { BaseListResponse } from "@/shared/types/api.type";

export interface Appointment {
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
  customerResponseDTO: {
    customerId: number;
    accountId: number;
    membershipId: number;
    customerCode: string;
    fullName: string;
    userName: string;
    image: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    currentPoints: null;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
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
    customerResponseDTO: {
      customerId: number;
      accountId: number;
      membershipId: number;
      customerCode: string;
      fullName: string;
      userName: string;
      image: string;
      email: string;
      phoneNumber: string;
      dateOfBirth: string;
      gender: string;
      address: string;
      currentPoints: number;
      createdAt: string;
      createdBy: string;
      modifiedAt: string;
      modifiedBy: string;
      accountResponseDTO: {
        accountId: number;
        email: string;
        role: number;
      };
    };
  };
}

export type AppointmentListResponse = BaseListResponse<Appointment>;
