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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// types
import type { VaccineReceiptCreateFormData } from "../schemas/vaccine-receipt.schema";

interface ColdChainLogSectionProps {
  control: Control<VaccineReceiptCreateFormData>;
  index: number;
}

export function ColdChainLogSection({
  control,
  index,
}: ColdChainLogSectionProps) {
  return (
    <div className="mt-8 border-t border-gray-100 pt-6">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full bg-blue-500"></div>
        <h6 className="font-nunito-700 text-sm text-gray-700">
          Thông tin chuỗi lạnh
        </h6>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name={`details.${index}.coldChainLog.temperature`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-sm text-gray-700">
                  Nhiệt độ (°C) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                    className="font-nunito-500 focus:ring-primary/20 focus:ring-2"
                    placeholder="Ví dụ: 2.5"
                  />
                </FormControl>
                <FormMessage className="font-nunito-400" />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`details.${index}.coldChainLog.humidity`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-nunito-600 text-sm text-gray-700">
                  Độ ẩm (%) <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    {...field}
                    onChange={(e) =>
                      field.onChange(parseFloat(e.target.value) || 0)
                    }
                    className="font-nunito-500 focus:ring-primary/20 focus:ring-2"
                    placeholder="Ví dụ: 60"
                  />
                </FormControl>
                <FormMessage className="font-nunito-400" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name={`details.${index}.coldChainLog.event`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-nunito-600 text-sm text-gray-700">
                Sự kiện <span className="text-red-500">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="font-nunito-500 focus:ring-primary/20 focus:ring-2">
                    <SelectValue placeholder="Chọn sự kiện" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="storage" className="font-nunito-500">
                    Lưu trữ
                  </SelectItem>
                  <SelectItem value="transport" className="font-nunito-500">
                    Vận chuyển
                  </SelectItem>
                  <SelectItem value="delivery" className="font-nunito-500">
                    Giao hàng
                  </SelectItem>
                  <SelectItem value="inspection" className="font-nunito-500">
                    Kiểm tra
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="font-nunito-400" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`details.${index}.coldChainLog.notes`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-nunito-600 text-sm text-gray-700">
                Ghi chú chuỗi lạnh
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập ghi chú về chuỗi lạnh (tùy chọn)"
                  {...field}
                  className="font-nunito-500 focus:ring-primary/20 min-h-16 resize-none focus:ring-2"
                />
              </FormControl>
              <FormMessage className="font-nunito-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
