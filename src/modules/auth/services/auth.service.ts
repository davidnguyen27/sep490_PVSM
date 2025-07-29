import axiosInstance from "@/lib/axios";

export const authService = {
  sendOTP: (payload: { email: string; password: string }) =>
    axiosInstance.post("/api/Auth/login", payload).then((res) => res.data),

  login: (payload: { email: string; otp: string }) =>
    axiosInstance.post("/api/Auth/verify-otp", payload).then((res) => res.data),

  currentUser: () =>
    axiosInstance
      .get("/api/Account/current-account")
      .then((res) => res.data.data),
};
