export interface MicrochipPayload {
  microchipCode: string;
  name: string;
  description: string;
  price: number;
  notes: string;
  createMicrochipItemRequest: {
    petId: number | null;
    name?: string;
    description?: string;
    location: string;
    installationDate: string;
  };
}
