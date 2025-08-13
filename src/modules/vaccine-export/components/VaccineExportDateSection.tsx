import type { Control } from "react-hook-form";

// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// types
import type { CreateVaccineExportFormData } from "../schemas/vaccine-export.schema";

interface VaccineExportDateSectionProps {
  control: Control<CreateVaccineExportFormData>;
}

export function VaccineExportDateSection({
  control,
}: VaccineExportDateSectionProps) {
  return (
    <div className="space-y-4">
      <div className="border-primary border-l-4 pl-4">
        <h4 className="font-nunito-700 text-lg text-gray-900">
          Thông tin phiếu xuất
        </h4>
        <p className="font-nunito-400 text-sm text-gray-500">
          Chọn ngày xuất vắc-xin khỏi kho
        </p>
      </div>

      <div className="rounded-none border border-blue-100 bg-blue-50 p-6">
        <FormField
          control={control}
          name="exportDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-nunito-600 text-gray-700">
                Ngày xuất kho <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="date" {...field} className="w-full max-w-md" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
