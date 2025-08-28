import type { Customer } from "@/modules/customers";
import type { Pet } from "@/modules/pets";

export interface Appointment {
  appointmentId: number | null;
  customerId: number | null;
  petId: number | null;
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
  customerResponseDTO: Customer;
  petResponseDTO: Pet;
}
