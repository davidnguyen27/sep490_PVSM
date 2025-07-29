import { useRoutes } from "react-router-dom";
import { authRoutes } from "@/modules/auth";
import { dashboardRoutes } from "@/modules/dashboard";
import { petRoutes } from "@/modules/pets/routes/pet.route";
import { microchipRoutes } from "@/modules/microchips/routes/microchip.route";
import { vetRoutes } from "@/modules/vets/routes/vet.route";
import { customerRoutes } from "@/modules/customers/routes/customer.route";
import { vaccinationAppRoutes } from "@/modules/vaccination-appointment/routes/vaccination.route";
import { microchipAppRoutes } from "@/modules/microchip-appointment/routes/microchip-appointment.route";
import { paymentRoutes } from "@/modules/payments/routes/payment.route";
import { conditionAppRoutes } from "@/modules/condition-appointment/routes/condition-appointment.route";
import { vetScheduleRoutes } from "@/modules/vet-schedules/routes/vet-schedule.route";

export function AppRoutes() {
  const routes = [
    ...authRoutes,
    ...dashboardRoutes,
    ...vaccinationAppRoutes,
    ...microchipAppRoutes,
    ...conditionAppRoutes,
    ...petRoutes,
    ...customerRoutes,
    ...vetScheduleRoutes,
    ...vetRoutes,
    ...microchipRoutes,
    ...paymentRoutes,
  ];

  return useRoutes(routes);
}
