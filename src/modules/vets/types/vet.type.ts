export interface Vet {
  vetId: number;
  accountId: number;
  vetCode: string;
  name: string;
  specialization: string;
  dateOfBirth: string;
  phoneNumber: string;
  isDeleted: boolean;
  account: object;
}
