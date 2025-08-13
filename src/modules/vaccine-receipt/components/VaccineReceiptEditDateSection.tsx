import { useState } from "react";
import type { Control } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// utils
import { cn } from "@/lib/utils";

// types
import type { VaccineReceiptUpdateFormData } from "../schemas/vaccine-receipt.schema";

interface VaccineReceiptEditDateSectionProps {
  control: Control<VaccineReceiptUpdateFormData>;
}

export function VaccineReceiptEditDateSection({
  control,
}: VaccineReceiptEditDateSectionProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="border-primary border-l-4 pl-4">
        <h4 className="font-nunito-700 text-lg text-gray-900">
          Thông tin phiếu nhập
        </h4>
        <p className="font-nunito-400 text-sm text-gray-500">
          Chỉnh sửa ngày nhập vắc-xin vào kho
        </p>
      </div>

      <div className="rounded-none border border-blue-100 bg-blue-50 p-6">
        <FormField
          control={control}
          name="receiptDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="font-nunito-600 text-gray-700">
                Ngày nhập <span className="text-red-500">*</span>
              </FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full max-w-md justify-start pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "dd/MM/yyyy", { locale: vi })
                      ) : (
                        <span>Chọn ngày nhập</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      field.onChange(date);
                      setCalendarOpen(false);
                    }}
                    disabled={(date) => {
                      const today = new Date();
                      today.setHours(23, 59, 59, 999);
                      return date > today;
                    }}
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
