import axiosInstance from "@/lib/axios";
//import type { BaseListResponse } from "@/shared/types/api.type";
import type { Membership } from "../types/membership.type";

export const membershipService = {
    async getMembershipByCustomerId(customerId: number | null): Promise<Membership> {
        return axiosInstance
            .get(`/api/Membership/get-membership-by-customer-id/${customerId}`)
            .then((res) => (res.data.success ? res.data.data : null));
    },
};
