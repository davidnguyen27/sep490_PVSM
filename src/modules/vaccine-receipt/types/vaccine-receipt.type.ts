export interface VaccineReceipt {
  vaccineReceiptId: number | null;
  receiptCode: string;
  receiptDate: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  isDeleted: boolean;
}

export interface VaccineReceiptUpdateRequest {
  receiptDate: string;
}
