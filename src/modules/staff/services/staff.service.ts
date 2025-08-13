import axiosInstance from "@/lib/axios";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
  status?: boolean;
}

export const staffService = {
  async getAllStaff(params: Params) {
    return axiosInstance
      .get("/api/Account/get-all-staff", { params })
      .then((res) => res.data);
  },
};
