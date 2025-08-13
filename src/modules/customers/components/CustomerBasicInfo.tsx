import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  UserCheck,
  Shield,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InfoItem } from "./InfoItem";
import type { Customer } from "../types/customer.type";

interface CustomerBasicInfoProps {
  customer: Customer;
}

export function CustomerBasicInfo({ customer }: CustomerBasicInfoProps) {
  return (
    <Card className="rounded-none border-0 shadow-lg">
      <CardHeader className="from-primary/5 to-primary/10 border-b-0 bg-gradient-to-r px-6 py-4">
        <CardTitle className="text-primary font-inter flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <User size={20} />
          </div>
          <span className="font-nunito text-xl font-semibold">
            Thông tin cơ bản
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-8 py-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <InfoItem
            icon={<User size={16} className="text-primary" />}
            label="Họ và tên"
            value={customer.fullName}
          />
          <InfoItem
            icon={<UserCheck size={16} className="text-green-600" />}
            label="Tên đăng nhập"
            value={customer.userName}
          />
          <InfoItem
            icon={<Phone size={16} className="text-blue-600" />}
            label="Số điện thoại"
            value={customer.phoneNumber}
          />
          <InfoItem
            icon={<Mail size={16} className="text-purple-600" />}
            label="Email"
            value={customer.accountResponseDTO?.email || "Chưa cập nhật"}
          />
          <InfoItem
            icon={<Calendar size={16} className="text-orange-600" />}
            label="Ngày sinh"
            value={customer.dateOfBirth}
          />
          <InfoItem
            icon={<Shield size={16} className="text-indigo-600" />}
            label="Giới tính"
            value={customer.gender === "Male" ? "Nam" : "Nữ"}
          />
          <InfoItem
            icon={<MapPin size={16} className="text-red-600" />}
            label="Địa chỉ"
            value={customer.address}
            className="md:col-span-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
