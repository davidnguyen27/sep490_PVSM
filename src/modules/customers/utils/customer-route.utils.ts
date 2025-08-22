import { UserRole } from "@/shared/constants/roles.constants";

export const getCustomerRoutePaths = (role: number) => {
  switch (role) {
    case UserRole.ADMIN:
      return {
        base: "/admin/customers",
        edit: "/admin/customers/edit",
      };
    case UserRole.STAFF:
      return {
        base: "/staff/customers",
        edit: "/staff/customers/edit",
      };
    case UserRole.VET:
      return {
        base: "/vet/customers",
        edit: "/vet/customers/edit",
      };
    default:
      return {
        base: "/staff/customers",
        edit: "/staff/customers/edit",
      };
  }
};
