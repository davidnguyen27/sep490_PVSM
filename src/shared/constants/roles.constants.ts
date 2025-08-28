export const UserRole = {
  ADMIN: 1,
  STAFF: 2,
  VET: 3,
  CUSTOMER: 4,
} as const;

export type UserRole = (typeof UserRole)[keyof typeof UserRole];
