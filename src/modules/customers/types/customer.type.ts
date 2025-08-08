export interface Customer {
  customerId: number | null;
  accountId: number | null;
  membershipId: number | null;
  customerCode: string;
  fullName: string;
  userName: string;
  image: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  currentPoints: number;
  redeemablePoints: number;
  totalSpent: number;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  isDeleted: boolean;
  accountResponseDTO: {
    accountId: number | null;
    email: string;
    role: number;
    vetId: number | null;
  };
  membershipResponseDTO: {
    membershipId: number | null;
    membershipCode: string;
    name: string;
    description: string;
    minPoints: number;
    benefits: string;
    rank: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    isDeleted: boolean;
  };
}
