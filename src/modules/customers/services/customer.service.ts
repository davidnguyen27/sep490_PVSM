import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { Customer } from "../types/customer.type";

export const customerService = {
  getAllCustomers: async (params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<Customer>> =>
    axiosInstance
      .get("/api/Customer/get-all-customers", { params })
      .then((res) => (res.data.success ? res.data : null)),
};
