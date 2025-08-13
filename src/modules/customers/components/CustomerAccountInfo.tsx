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
    <Card className="rounded-none border-0 shadow-lg">
      <CardHeader className="border-b-0 bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4">
        <CardTitle className="font-inter flex items-center gap-3 text-blue-700">
          <div className="rounded-lg bg-blue-100 p-2">
            <CreditCard size={20} />
          </div>
          <span className="font-nunito text-xl font-semibold">
            Thông tin tài khoản
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 py-6">
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
