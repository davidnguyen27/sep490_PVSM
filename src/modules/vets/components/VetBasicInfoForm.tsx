import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { User, Phone, Calendar, IdCard } from "lucide-react";
import type { Control } from "react-hook-form";

interface VetBasicInfoFormProps {
  control: Control<{
    name: string;
    specialization: string;
    dateOfBirth: string;
    phoneNumber: string;
    image: string;
  }>;
}

export function VetBasicInfoForm({ control }: VetBasicInfoFormProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="from-primary/5 to-primary/10 border-b-0 bg-gradient-to-r px-6 py-4">
        <CardTitle className="font-inter text-primary flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <IdCard size={20} />
          </div>
          <span className="font-nunito text-lg font-semibold">
            Thông tin cơ bản
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-4">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter flex items-center gap-2 text-sm font-medium text-gray-700">
                <User size={16} className="text-green-600" />
                Họ và tên
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nhập họ và tên bác sỹ"
                  className="font-nunito"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar size={16} className="text-orange-600" />
                Ngày sinh
              </FormLabel>
              <FormControl>
                <Input {...field} type="date" className="font-nunito" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter flex items-center gap-2 text-sm font-medium text-gray-700">
                <Phone size={16} className="text-blue-600" />
                Số điện thoại
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nhập số điện thoại"
                  className="font-nunito"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
