export interface CustomerPayload {
  fullName: string;
  userName: string;
  image?: File | string | undefined;
  phoneNumber: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  address: string;
}
