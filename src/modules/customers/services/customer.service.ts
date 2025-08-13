import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Customer } from "../types/customer.type";
import type { CustomerPayload } from "../types/customer.payload.type";

export const customerService = {
  async getAllCustomers(params: {
    pageNumber: number;
    pageSize: number;
    keyWord?: string;
  }): Promise<BaseListResponse<Customer>> {
    return await axiosInstance
      .get("/api/Customer/get-all-customers", { params })
      .then((res) => (res.data.success ? res.data : null));
  },

  async getCustomerById(customerId: number | null): Promise<Customer> {
    return await axiosInstance
      .get(`/api/Customer/get-customer-by-id/${customerId}`)
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async createCustomer(
    payload: CustomerPayload,
  ): Promise<BaseResponse<Customer>> {
    const formData = new FormData();

    formData.append("fullName", payload.fullName);
    formData.append("userName", payload.userName);
    formData.append("phoneNumber", payload.phoneNumber);
    formData.append("dateOfBirth", payload.dateOfBirth);
    formData.append("gender", payload.gender);
    formData.append("address", payload.address);

    if (payload.image) formData.append("image", payload.image);

    return await axiosInstance
      .put("/api/Customer/create-customer/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },

  async updateCustomer(
    customerId: number | null,
    payload: CustomerPayload,
  ): Promise<BaseResponse<Customer>> {
    const formData = new FormData();

    formData.append("fullName", payload.fullName);
    formData.append("userName", payload.userName);
    formData.append("phoneNumber", payload.phoneNumber);
    formData.append("dateOfBirth", payload.dateOfBirth);
    formData.append("gender", payload.gender);
    formData.append("address", payload.address);

    if (payload.image) formData.append("image", payload.image);

    return await axiosInstance
      .put(`/api/Customer/update-customer/${customerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },

  async deleteCustomer(
    customerId: number | null,
  ): Promise<BaseResponse<Customer>> {
    return await axiosInstance
      .delete(`/api/Customer/delete-customer/${customerId}`)
      .then((res) => res.data);
  },
};
