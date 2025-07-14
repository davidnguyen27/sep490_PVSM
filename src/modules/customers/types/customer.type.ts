export interface Customer {
  customerId: number;
  accountId: number;
  membershipId: number;
  customerCode: string;
  fullName: string;
  userName: string;
  image: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  currentPoints: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  isDeleted: string;
  accountResponseDTO: object;
}
