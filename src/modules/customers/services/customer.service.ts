import axiosInstance from "@/lib/axios";
import type { BaseListResponse } from "@/shared/types/api.type";
import type { Customer } from "../types/customer.type";

export interface CustomerUpdatePayload {
  fullName: string;
  userName: string;
  phoneNumber: string;
  email?: string;
  dateOfBirth: string;
  gender: "Male" | "Female";
  address: string;
}

export const customerService = {
  async getAllCustomers(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<Customer>> {
    return axiosInstance
      .get("/api/Customer/get-all-customers", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getCustomerById(customerId: number | null): Promise<Customer> {
    return axiosInstance
      .get(`/api/Customer/get-customer-by-id/${customerId}`)
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async updateCustomer(
    customerId: number,
    payload: CustomerUpdatePayload,
  ): Promise<{ success: boolean; message: string }> {
    return axiosInstance
      .put(`/api/Customer/update-customer/${customerId}`, payload)
      .then((res) => res.data);
  },
};
