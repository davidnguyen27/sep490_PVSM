export interface MicrochipItem {
  microchipItemId: number | null;
  petId: number | null;
  name: string;
  description: string;
  installationDate: string;
  status: string;
  createdAt: string;
  createdBy: string;
  microchipResponse: {
    microchipId: number | null;
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
