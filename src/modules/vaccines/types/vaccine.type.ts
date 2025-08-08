export interface Vaccine {
  vaccineId: number | null;
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
}
