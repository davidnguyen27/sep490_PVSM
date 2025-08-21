import axiosInstance from "@/lib/axios";
import type { Membership } from "../types/membership.type";
import type { BaseListResponse, BaseResponse } from "@/shared/types/api.type";
import type { MembershipPayload } from "../types/membership.payload.type";

export const membershipService = {
  async getMembershipByCustomerId(
    customerId: number | null,
  ): Promise<Membership> {
    return axiosInstance
      .get(`/api/Membership/get-membership-by-customer-id/${customerId}`)
      .then((res) => (res.data.success ? res.data.data : null));
  },

  async createMembership(
    payload: MembershipPayload,
  ): Promise<BaseListResponse<Membership>> {
    return await axiosInstance
      .post("/api/Membership/create-membership", payload)
      .then((res) => res.data);
  },

  async getMembershipList(params: {
    pageNumber: number;
    pageSize: number;
    keyword?: string;
    status?: number;
  }): Promise<BaseListResponse<Membership>> {
    return axiosInstance
      .get("/api/Membership/get-all-memberships", { params })
      .then((res) => (res.data.success ? res.data : []));
  },

  async getMemberShipById(membershipId: number | null): Promise<Membership> {
    return await axiosInstance
      .get(`/api/Membership/get-membership-by-id/${membershipId}`)
      .then((res) => res.data.data);
  },

  async updateMembership(
    membershipId: number | null,
    payload: MembershipPayload,
  ): Promise<BaseResponse<Membership>> {
    return await axiosInstance
      .put(`/api/Membership/update-membership/${membershipId}`, payload)
      .then((res) => res.data);
  },

  async deleteMembership(
    membershipId: number | null,
  ): Promise<BaseResponse<Membership>> {
    return await axiosInstance
      .delete(`/api/Membership/delete-membership/${membershipId}`)
      .then((res) => res.data);
  },
};
