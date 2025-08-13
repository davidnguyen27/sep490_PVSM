export interface PetPayload {
  petId: number;
  customerId: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  placeToLive: string;
  placeOfBirth: string;
  image: File | string | undefined;
  weight: string;
  color: string;
  nationality: string;
  isSterilized: boolean;
}

export interface PetCreatePayload {
  customerId: number;
  name: string;
  species: string;
  breed: string;
  gender: string;
  dateOfBirth: string;
  placeToLive: string;
  placeOfBirth: string;
  image: File | undefined;
  weight: string;
  color: string;
  nationality: string;
  isSterilized: boolean;
}
