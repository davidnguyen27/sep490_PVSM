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
import type { VaccineReceiptCreateFormData } from "../schemas/vaccine-receipt.schema";

interface VaccineReceiptDateSectionProps {
  control: Control<VaccineReceiptCreateFormData>;
}

export function VaccineReceiptDateSection({
  control,
}: VaccineReceiptDateSectionProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="border-primary border-l-4 pl-4">
        <h4 className="font-nunito-700 text-lg text-gray-900">
          Thông tin phiếu nhập
        </h4>
        <p className="font-nunito-400 text-sm text-gray-500">
          Chọn ngày nhập vắc-xin vào kho
        </p>
      </div>

      <div className="rounded-none border border-blue-100 bg-blue-50 p-6">
        <FormField
          control={control}
          name="receiptDate"
          render={({ field }) => (
            <FormItem className="flex flex-col space-y-3">
              <FormLabel className="font-nunito-600 text-sm text-gray-700">
                Ngày nhập <span className="text-red-500">*</span>
              </FormLabel>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "font-nunito-500 w-full justify-start pl-4 text-left",
                        !field.value && "text-gray-400",
                        "focus:ring-primary/20 hover:bg-white focus:ring-2",
                      )}
                    >
                      {field.value ? (
                        <span className="text-gray-900">
                          {format(field.value, "dd/MM/yyyy", { locale: vi })}
                        </span>
                      ) : (
                        <span>Chọn ngày nhập</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 text-gray-400" />
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                    locale={vi}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="font-nunito-400" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
