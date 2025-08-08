import { CreditCard, Receipt, Calendar, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoItem } from "./InfoItem";
import { formatData } from "@/shared/utils/format.utils";
import type { Customer } from "../types/customer.type";

interface CustomerAccountInfoProps {
  customer: Customer;
}

export function CustomerAccountInfo({ customer }: CustomerAccountInfoProps) {
  return (
    <Card className="bg-linen rounded-none p-0 shadow-sm">
      <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-blue-100 p-2.5">
        <CardTitle className="font-inter flex items-center gap-2 text-blue-700">
          <CreditCard size={20} />
          Thông tin tài khoản
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoItem
            icon={<Receipt size={16} className="text-primary" />}
            label="Mã khách hàng"
            value={customer.customerCode}
          />
          <InfoItem
            icon={<Calendar size={16} className="text-green-600" />}
            label="Ngày tạo"
            value={formatData.formatDateTime(customer.createdAt)}
          />
          <InfoItem
            icon={<User size={16} className="text-blue-600" />}
            label="Người tạo"
            value={customer.createdBy}
          />
          <InfoItem
            icon={<Calendar size={16} className="text-orange-600" />}
            label="Cập nhật cuối"
            value={
              customer.modifiedAt
                ? formatData.formatDateTime(customer.modifiedAt)
                : "Chưa cập nhật"
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}
