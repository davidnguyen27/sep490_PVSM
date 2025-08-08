export interface Disease {
  diseaseId: number | null;
  name: string;
  description: string;
  species: string;
  symptoms: string;
  treatment: string;
  status: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  isDeleted: string;
}
