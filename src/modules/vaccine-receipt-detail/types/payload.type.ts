export interface VaccineReceiptDetailData {
  vaccineReceiptId: number | null;
  vaccineBatchId: number | null;
  suppiler: string;
  quantity: number;
  vaccineStatus: string;
  notes: string;
  coldChainLog: {
    vaccineBatchId: number | null;
    logTime: string;
    temperature: number;
    humidity: number;
    event: string;
    notes: string;
  };
}
