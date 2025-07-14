export interface Pet {
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
  image: File | null;
  weight: string;
  color: string;
  nationality: string;
  isSterilized: true;
  customerResponseDTO: object;
}
