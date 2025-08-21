import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Address } from "../types/address.type";
import axiosInstance from "@/lib/axios";

interface params {
  pageNumber: number;
  pageSize: number;
  keyword?: string;
}

export const addressService = {
  async getAllAddresses(params: params): Promise<BaseListResponse<Address>> {
    return await axiosInstance
      .get("/api/Address/get-all-address", { params })
      .then((res) => res.data);
  },

  async getAddressById(addressId: number | null): Promise<Address> {
    return await axiosInstance
      .get(`/api/Address/get-address-by-id/${addressId}`)
      .then((res) => res.data.data);
  },

  async createAddress(payload: {
    location: string;
  }): Promise<BaseResponse<Address>> {
    const formData = new FormData();

    formData.append("location", payload.location);

    return await axiosInstance
      .post("/api/Address/create-address", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  },

  async updateAddress(payload: {
    addressId: number | null;
    location: string;
  }): Promise<BaseResponse<Address>> {
    return await axiosInstance
      .put("/api/Address/update-address", payload)
      .then((res) => res.data);
  },

  async deleteAddress(
    addressId: number | null,
  ): Promise<BaseResponse<Address>> {
    return await axiosInstance
      .delete(`/api/Address/delete-address/${addressId}`)
      .then((res) => res.data);
  },
};
