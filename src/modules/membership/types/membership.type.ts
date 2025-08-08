export interface Membership {
    membershipId: number;
    membershipCode: string;
    name: string;
    description: string;
    minPoints: number; // in months
    benefits: string;
    rank: string;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    isDeleted: boolean;
    customer: {
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
    }
}
