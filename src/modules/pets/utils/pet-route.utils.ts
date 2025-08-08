import { UserRole } from "@/shared/constants/roles.constants";

export const getPetRoutePaths = (role: number) => {
  switch (role) {
    case UserRole.ADMIN:
      return {
        base: "/admin/pet-profiles",
        edit: "/admin/pet-profiles/edit",
      };
    case UserRole.STAFF:
      return {
        base: "/staff/pet-profiles",
        edit: "/staff/pet-profiles/edit",
      };
    case UserRole.VET:
      return {
        base: "/vet/pet-profiles",
        edit: "/vet/pet-profiles/edit",
      };
    default:
      return {
        base: "/staff/pet-profiles",
        edit: "/staff/pet-profiles/edit",
      };
  }
};
