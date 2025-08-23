import { UserRole } from "@/shared/constants/roles.constants";

export const getPetRoutePaths = (role: number) => {
  switch (role) {
    case UserRole.ADMIN:
      return {
        base: "/admin/pets",
        edit: "/admin/pets/edit",
      };
    case UserRole.STAFF:
      return {
        base: "/staff/pets",
        edit: "/staff/pets/edit",
      };
    case UserRole.VET:
      return {
        base: "/vet/pets",
        edit: "/vet/pets/edit",
      };
    default:
      return {
        base: "/staff/pets",
        edit: "/staff/pets/edit",
      };
  }
};
