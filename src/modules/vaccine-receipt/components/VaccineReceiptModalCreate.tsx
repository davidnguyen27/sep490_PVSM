import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
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
import { CalendarIcon } from "lucide-react";

// utils
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

// hooks
import { useVaccineReceiptAdd } from "../hooks/useVaccineReceiptAdd";

// schemas
import { vaccineReceiptCreateSchema } from "../schemas/vaccine-receipt.schema";

// utils
import { transformVaccineReceiptFormData } from "../utils/vaccine-receipt.utils";

// types
import type { VaccineReceiptCreateFormData } from "../schemas/vaccine-receipt.schema";

interface VaccineReceiptModalCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VaccineReceiptModalCreate({
  open,
  onOpenChange,
}: VaccineReceiptModalCreateProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const form = useForm<VaccineReceiptCreateFormData>({
    resolver: zodResolver(vaccineReceiptCreateSchema),
    defaultValues: {
      receiptDate: new Date(),
    },
  });

  const { mutate: createVaccineReceipt, isPending } = useVaccineReceiptAdd();

  const handleSubmit = (data: VaccineReceiptCreateFormData) => {
    const payload = transformVaccineReceiptFormData(data);

    createVaccineReceipt(payload, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-primary">
            Tạo phiếu nhập vaccine mới
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin để tạo phiếu nhập vaccine mới vào hệ thống.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="receiptDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium">
                    Ngày nhập <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
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
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={vi}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Đang tạo..." : "Tạo phiếu nhập"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
