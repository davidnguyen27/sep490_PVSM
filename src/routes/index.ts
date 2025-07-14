import { useRoutes } from "react-router-dom";
import { authRoutes } from "@/modules/auth";
import { dashboardRoutes } from "@/modules/dashboard";
import { petRoutes } from "@/modules/pets/routes/pet.route";
import { microchipRoutes } from "@/modules/microchips/routes/microchip.route";
import { vetRoutes } from "@/modules/vets/routes/vet.route";
import { customerRoutes } from "@/modules/customers/routes/customer.route";
import { vaccinationAppRoutes } from "@/modules/vaccination-appointment/routes/vaccination.route";
import { appointmentChipRoutes } from "@/modules/microchip-appointment/routes/microchip.route";
import { paymentRoutes } from "@/modules/payments/routes/payment.route";

export function AppRoutes() {
  const routes = [
    ...authRoutes,
    ...dashboardRoutes,
    ...vaccinationAppRoutes,
    ...appointmentChipRoutes,
    ...petRoutes,
    ...customerRoutes,
    ...vetRoutes,
    ...microchipRoutes,
    ...paymentRoutes,
  ];

  return useRoutes(routes);
}
