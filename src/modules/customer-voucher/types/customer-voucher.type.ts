export interface CustomerVoucher {
    customerVoucherId: number | null;
    customerId: number | null;
    voucherId: number | null;
    redeemedAt: string;
    redeemedBy: string;
    expirationDate: string;
    status: number;
    createdAt: string;
    createdBy: string;
    modifiedAt: string;
    modifiedBy: string;
    isDeleted: boolean;
    customer: {
        customerId: number | null;
        accountId: string | null;
        membershipId: string | null;
        customerCode: string;
        fullName: string | null;
        userName: string | null;
        image: string | null;
        phoneNumber: string | null;
        dateOfBirth: string | null;
        gender: string | null;
        address: string | null;
        currentPoints: number | null;
        redeemablePoints: number | null;
        totalSpent: number | null;
        createdAt: string | null;
        createdBy: string | null;
        modifiedAt: string | null;
        modifiedBy: string | null;
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
    };
    voucher: {
        voucherId: number | null;
        voucherCode: string;
        transactionId: number | null;
        voucherName: string;
        pointsRequired: number;
        description: string;
        discountAmount: number;
        expirationDate: string;
        createdAt: string;
        createdBy: string;
        modifiedAt: string | null;
        modifiedBy: string | null;
        isDeleted: boolean;
    }

}