import type { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateVaccineExportFormData } from "../schemas/vaccine-export.schema";

interface VaccineExportColdChainSectionProps {
  control: Control<CreateVaccineExportFormData>;
  index: number;
}

export function VaccineExportColdChainSection({
  control,
  index,
}: VaccineExportColdChainSectionProps) {
  return (
    <div className="border-t pt-6">
      <div className="border-primary mb-4 border-l-4 pl-4">
        <h5 className="font-nunito-600 text-base text-gray-900">
          Thông tin chuỗi lạnh
        </h5>
        <p className="font-nunito-400 text-sm text-gray-500">
          Ghi nhận điều kiện bảo quản trong quá trình xuất kho
        </p>
      </div>

      <div className="space-y-4 rounded-none border border-orange-100 bg-orange-50 p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name={`details.${index}.coldChainLog.temperature`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-gray-700">
                  Nhiệt độ (°C) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ví dụ: 2.5"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`details.${index}.coldChainLog.humidity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-gray-700">
                  Độ ẩm (%) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="Ví dụ: 60"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name={`details.${index}.coldChainLog.event`}
            render={() => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-gray-700">
                  Sự kiện
                </FormLabel>
                <FormControl>
                  <Input
                    value="xuất kho"
                    disabled
                    className="bg-gray-100 text-gray-600"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`details.${index}.coldChainLog.logTime`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-gray-700">
                  Thời gian ghi nhận <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input type="datetime-local" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name={`details.${index}.coldChainLog.notes`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-nunito-600 text-gray-700">
                Ghi chú chuỗi lạnh
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Ghi chú về điều kiện bảo quản, môi trường..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
