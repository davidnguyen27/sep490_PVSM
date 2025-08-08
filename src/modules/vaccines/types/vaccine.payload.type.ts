export interface VaccinePayload {
  name: string;
  description: string;
  price: number;
  image: File | string | null;
  notes: string;
}
