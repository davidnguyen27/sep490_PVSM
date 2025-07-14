import type { VaccinationDetail } from "@/modules/vaccination-appointment/types/detail.type";
import type { MicrochipDetail } from "@/modules/microchip-appointment/types/detail.type";

export type InvoiceData = VaccinationDetail | MicrochipDetail;

export function isMicrochipInvoice(data: InvoiceData): data is MicrochipDetail {
  return "microchip" in data;
}
