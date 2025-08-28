export interface DashboardAdminData {
  totalAccounts: number;
  totalActiveAccounts: number;
  totalCustomers: number;
  totalDiseases: number;
  totalMemberships: number;
  totalMicrochips: number;
  totalMicrochipItems: number;
  totalHealthConditions: number;
  totalPets: number;
  totalPayments: number;
  totalVaccines: number;
  totalVaccineBatches: number;
  totalVaccineExports: number;
  totalVaccineExportDetails: number;
  totalVaccineReceipts: number;
  totalVaccineReceiptDetails: number;
  totalVets: number;
  totalVetSchedules: number;
  totalVouchers: number;
  totalAppointmentVaccinations: number;
  totalProcessingAppointmentVaccinations: number;
  totalConfirmedAppointmentVaccinations: number;
  totalCheckedInAppointmentVaccinations: number;
  totalProcessedAppointmentVaccinations: number;
  totalPaidAppointmentVaccinations: number;
  totalCompletedAppointmentVaccinations: number;
  totalCancelledAppointmentVaccinations: number;
  totalRejectedAppointmentVaccinations: number;
  totalAppointmentMicrochips: number;
  totalProcessingAppointmentMicrochips: number;
  totalConfirmedAppointmentMicrochips: number;
  totalCheckedInAppointmentMicrochips: number;
  totalProcessedAppointmentMicrochips: number;
  totalPaidAppointmentMicrochips: number;
  totalCompletedAppointmentMicrochips: number;
  totalCancelledAppointmentMicrochips: number;
  totalRejectedAppointmentMicrochips: number;
  totalAppointmentHealthConditions: number;
  totalProcessingAppointmentHealthConditions: number;
  totalConfirmedAppointmentHealthConditions: number;
  totalCheckedInAppointmentHealthConditions: number;
  totalProcessedAppointmentHealthConditions: number;
  totalPaidAppointmentHealthConditions: number;
  totalCompletedAppointmentHealthConditions: number;
  totalCancelledAppointmentHealthConditions: number;
  totalRejectedAppointmentHealthConditions: number;
  lastUpdated: string;
}

// Shared interfaces
export interface ActivityData {
  id: number;
  title: string;
  description: string;
  time: string;
  iconName: import("@/shared/constants/icons.constants").IconName;
  color: string;
}

export interface DashboardVetData {
  totalVaccines: number;
  totalVaccineBatches: number;
  totalCheckedInAppointmentVaccinations: number;
  totalCheckedInAppointmentMicrochips: number;
  totalCheckedInAppointmentHealthConditions: number;
  totalProcessedAppointmentVaccinations: number;
  totalProcessedAppointmentMicrochips: number;
  totalProcessedAppointmentHealthConditions: number;
  lastUpdated: string;
}

export interface DashboardStaffData {
  totalCustomers: number;
  totalDiseases: number;
  totalPets: number;
  totalVaccines: number;
  totalVaccineBatches: number;
  totalVets: number;
  totalAppointmentVaccinations: number;
  totalProcessingAppointmentVaccinations: number;
  totalConfirmedAppointmentVaccinations: number;
  totalCheckedInAppointmentVaccinations: number;
  totalProcessedAppointmentVaccinations: number;
  totalPaidAppointmentVaccinations: number;
  totalCompletedAppointmentVaccinations: number;
  totalCancelledAppointmentVaccinations: number;
  totalRejectedAppointmentVaccinations: number;
  totalAppointmentMicrochips: number;
  totalProcessingAppointmentMicrochips: number;
  totalConfirmedAppointmentMicrochips: number;
  totalCheckedInAppointmentMicrochips: number;
  totalProcessedAppointmentMicrochips: number;
  totalPaidAppointmentMicrochips: number;
  totalCompletedAppointmentMicrochips: number;
  totalCancelledAppointmentMicrochips: number;
  totalRejectedAppointmentMicrochips: number;
  totalAppointmentHealthConditions: number;
  totalProcessingAppointmentHealthConditions: number;
  totalConfirmedAppointmentHealthConditions: number;
  totalCheckedInAppointmentHealthConditions: number;
  totalProcessedAppointmentHealthConditions: number;
  totalPaidAppointmentHealthConditions: number;
  totalCompletedAppointmentHealthConditions: number;
  totalCancelledAppointmentHealthConditions: number;
  totalRejectedAppointmentHealthConditions: number;
  totalAppointmentsToday: number;
  totalAppointmentsThisWeek: number;
  totalAppointmentsThisMonth: number;
  totalAppointmentsThisYear: number;
  lastUpdated: string;
}
