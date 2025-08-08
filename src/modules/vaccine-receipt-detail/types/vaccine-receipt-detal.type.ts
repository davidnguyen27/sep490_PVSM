import type { VaccineBatch } from "@/modules/vaccine-batch";
import type { VaccineReceipt } from "@/modules/vaccine-receipt/types/vaccine-receipt.type";

export interface VaccineReceiptDetail {
  vaccineReceiptDetailId: number | null;
  vaccineReceiptId: number | null;
  vaccineBatchId: number | null;
  suppiler: string;
  quantity: number;
  vaccineStatus: string;
  notes: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string;
  modifiedBy: string;
  isDeleted: boolean;
  vaccineReceipt: VaccineReceipt;
  vaccineBatch: VaccineBatch;
}
