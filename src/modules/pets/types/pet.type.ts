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
  image: File | string | null; // ✅ Support both File objects and URL strings
  weight: string;
  color: string;
  nationality: string;
  isSterilized: boolean; // ✅ Changed from `true` to `boolean`
  isDeleted: boolean; // ✅ Field for soft delete status
  customerResponseDTO: object;
  // Index signature to make it compatible with SortableItem
  [key: string]: unknown;
}
