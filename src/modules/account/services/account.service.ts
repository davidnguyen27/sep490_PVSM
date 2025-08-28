import axiosInstance from "@/lib/axios";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { Account } from "../types/account.type";

interface Params {
  pageNumber: number;
  pageSize: number;
  keyWord?: string;
  status?: boolean;
}

interface AccountUpdate {
  accountId: number | null;
  email?: string;
  role?: number;
  isVerify: boolean;
}

export const accountService = {
  async getAllAccounts(params: Params): Promise<BaseListResponse<Account>> {
    return await axiosInstance
      .get("/api/Account/get-all-accounts", { params })
      .then((res) => res.data);
  },

  async createStaffAccount(accountData: {
    email: string;
    password: string;
    role: number;
  }): Promise<BaseResponse<Account>> {
    return await axiosInstance
      .post("/api/Account/create-staff-account", accountData)
      .then((res) => res.data);
  },

  async updateAccount(
    accountId: number | null,
    payload: AccountUpdate,
  ): Promise<BaseResponse<Account>> {
    return await axiosInstance
      .put(`/api/Account/update-account/${accountId}`, payload)
      .then((res) => res.data);
  },

  async deleteAccount(
    accountId: number | null,
  ): Promise<BaseResponse<Account>> {
    return await axiosInstance
      .delete(`/api/Account/delete-account/${accountId}`)
      .then((res) => res.data);
  },
};
