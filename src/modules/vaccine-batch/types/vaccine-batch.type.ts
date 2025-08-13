export interface VaccineBatch {
  vaccineBatchId: number;
  vaccineId: number;
  vaccineCode: string;
  batchNumber: string;
  manufactureDate: string;
  expiryDate: string;
  quantity: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  vaccineResponseDTO: {
    vaccineId: number;
    vaccineCode: string;
    name: string;
    description: string;
    price: number;
    status: string;
    image: string;
    notes: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    isDeleted: boolean;
  };
  // Index signature to make it compatible with SortableItem
  [key: string]: unknown;
}
