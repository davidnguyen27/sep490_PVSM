export interface Microchip {
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
}
