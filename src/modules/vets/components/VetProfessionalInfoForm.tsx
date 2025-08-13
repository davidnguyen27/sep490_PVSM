import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Stethoscope, UserCheck } from "lucide-react";
import type { Control } from "react-hook-form";

interface VetProfessionalInfoFormProps {
  control: Control<{
    name: string;
    specialization: string;
    dateOfBirth: string;
    phoneNumber: string;
    image: string;
  }>;
}

export function VetProfessionalInfoForm({
  control,
}: VetProfessionalInfoFormProps) {
  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="border-b-0 bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4">
        <CardTitle className="font-inter flex items-center gap-3 text-blue-700">
          <div className="rounded-lg bg-blue-100 p-2">
            <Stethoscope size={20} />
          </div>
          <span className="font-nunito text-lg font-semibold">
            Thông tin chuyên môn
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-6 py-4">
        <FormField
          control={control}
          name="specialization"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-inter flex items-center gap-2 text-sm font-medium text-gray-700">
                <Stethoscope size={16} className="text-purple-600" />
                Chuyên môn
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Nhập chuyên môn của bác sỹ"
                  className="font-nunito"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <UserCheck size={16} className="text-blue-600" />
            <span className="font-inter text-sm font-medium text-blue-700">
              Lưu ý
            </span>
          </div>
          <p className="font-nunito text-sm text-blue-600">
            Vui lòng kiểm tra kỹ thông tin trước khi lưu
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
