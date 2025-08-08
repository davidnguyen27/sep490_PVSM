export interface VaccineExportDetailPayload {
  vaccineExportId: number | null;
  vaccineBatchId: number | null;
  quantity: number;
  purpose: string;
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
