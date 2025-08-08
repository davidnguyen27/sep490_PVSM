export interface Voucher {
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