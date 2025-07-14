export interface MicrochipItem {
  microchipItemId: number;
  petId: number;
  name: string;
  description: string;
  installationDate: string;
  status: string;
  createdAt: string;
  createdBy: string;
  microchipResponse: {
    microchipId: number;
    microchipCode: string;
    name: string;
    description: string;
    price: number;
    status: string;
    notes: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    isDeleted: boolean;
  };
}
