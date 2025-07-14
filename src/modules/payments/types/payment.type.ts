export interface Payment {
  paymentId: number;
  appointmentDetailId: number;
  customerId: number;
  vaccineBatchId: number | null;
  microchipId: number | null;
  vaccinationCertificateId: number | null;
  healthConditionId: number | null;
  paymentCode: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: number;
  checkoutUrl: string;
  qrCode: string;
  createdAt: string;
  createdBy: string;
  modifiedAt: string | null;
  modifiedBy: string | null;
  isDeleted: boolean;
  url: string | null;
}
