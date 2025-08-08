import type { Voucher } from './../types/voucher.type';
import axiosInstance from "@/lib/axios";
//import type { BaseListResponse } from "@/shared/types/api.type";

export const customerService = {
    async getCustomerVoucherByCustomerId(voucherId: number | null): Promise<Voucher> {
        return axiosInstance
            .get(`/api/Voucher/get-voucher-by-id/${voucherId}`)
            .then((res) => (res.data.success ? res.data.data : null));
    },
};
