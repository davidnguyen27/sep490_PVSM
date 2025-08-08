import type { CustomerVoucher } from './../types/customer-voucher.type';
import axiosInstance from "@/lib/axios";
//import type { BaseListResponse } from "@/shared/types/api.type";

export const customerVoucherService = {
    async getCustomerVoucherByCustomerId(customerId: number | null): Promise<CustomerVoucher[]> {
        return axiosInstance
            .get(`/api/CustomerVoucher/get-customer-vouchers-by-customer-id/${customerId}`)
            .then((res) => (res.data.success ? res.data.data || [] : []));
    },
};
