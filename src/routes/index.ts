import { useRoutes } from "react-router-dom";

// Core modules
import { authRoutes } from "@/modules/auth";
import { dashboardRoutes } from "@/modules/dashboard";

// Entity management modules
import { customerRoutes } from "@/modules/customers/routes/customer.route";
import { diseaseRoutes } from "@/modules/diseases/routes/disease.route";
import { petRoutes } from "@/modules/pets";
import { vetRoutes } from "@/modules/vets/routes/vet.route";
import { microchipRoutes } from "@/modules/microchips/routes/microchip.route";
import { microchipItemRoutes } from "@/modules/microchip-item";
import { vetScheduleRoutes } from "@/modules/vet-schedules/routes/vet-schedule.route";
import { vaccineRoutes } from "@/modules/vaccines/routes/vaccine.route";
import { vaccineBatchRoutes } from "@/modules/vaccine-batch/routes/vaccine-batch.route";
import { vaccineDiseaseRoutes } from "@/modules/vaccine-disease/routes/vaccine-disease.route";
import { vaccineReceiptRoutes } from "@/modules/vaccine-receipt/routes/vaccine-receipt.route";
import { vaccineExportRoutes } from "@/modules/vaccine-export/routes/vaccine-export.route";

// Appointment workflow modules
import { vaccinationAppRoutes } from "@/modules/vaccination-appointment/routes/vaccination.route";
import { microchipAppRoutes } from "@/modules/microchip-appointment/routes/microchip-appointment.route";
import { conditionAppRoutes } from "@/modules/condition-appointment/routes/condition-appointment.route";

// Business process modules
import { paymentRoutes } from "@/modules/payments/routes/payment.route";
import { membershipRoutes } from "@/modules/membership/routes/membership.route";
import { vaccineScheduleRoutes } from "@/modules/vaccine-schedules/routes/vaccine-schedule.route";
import { addressRoutes } from "@/modules/address/routes/address.route";
import { faqRoutes } from "@/modules/faq/routes/faq.route";
import { handbookRoutes } from "@/modules/handbook/routes/handbook.route";
import { supportCategoryRoutes } from "@/modules/support-category";
import { voucherRoutes } from "@/modules/voucher/routes/voucher.route";

export function AppRoutes() {
  const routes = [
    // Core application routes
    ...authRoutes,
    ...dashboardRoutes,

    // Entity management routes
    ...addressRoutes,
    ...customerRoutes,
    ...diseaseRoutes,
    ...faqRoutes,
    ...petRoutes,
    ...vetRoutes,
    ...voucherRoutes,
    ...microchipRoutes,
    ...microchipItemRoutes,
    ...handbookRoutes,
    ...supportCategoryRoutes,
    ...vetScheduleRoutes,
    ...vaccineRoutes,
    ...vaccineBatchRoutes,
    ...vaccineDiseaseRoutes,
    ...vaccineReceiptRoutes,
    ...vaccineExportRoutes,
    ...vaccineScheduleRoutes,

    // Appointment workflow routes
    ...vaccinationAppRoutes,
    ...microchipAppRoutes,
    ...conditionAppRoutes,

    // Business process routes
    ...paymentRoutes,
    ...membershipRoutes,
  ];

  return useRoutes(routes);
}
