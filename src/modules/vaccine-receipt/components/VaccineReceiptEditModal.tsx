import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";
import {
  vaccineReceiptUpdateSchema,
  type VaccineReceiptUpdateFormData,
} from "../schemas/vaccine-receipt.schema";
import { useVaccineReceiptEdit } from "../hooks/useVaccineReceiptEdit";
import { transformVaccineReceiptUpdateData } from "../utils";
import type { VaccineReceipt } from "../types/vaccine-receipt.type";

interface VaccineReceiptEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaccineReceipt: VaccineReceipt | null;
  onSuccess?: () => void;
}

export function VaccineReceiptEditModal({
  open,
  onOpenChange,
  vaccineReceipt,
  onSuccess,
}: VaccineReceiptEditModalProps) {
  const form = useForm<VaccineReceiptUpdateFormData>({
    resolver: zodResolver(vaccineReceiptUpdateSchema),
    defaultValues: {
      receiptDate: new Date(),
    },
  });

  const { mutate: updateVaccineReceipt, isPending } = useVaccineReceiptEdit({
    onSuccess: () => {
      onOpenChange(false);
      form.reset();
      onSuccess?.();
    },
  });

  // Set form values when vaccineReceipt changes
  useEffect(() => {
    if (vaccineReceipt && open) {
      form.setValue("receiptDate", new Date(vaccineReceipt.receiptDate));
    }
  }, [vaccineReceipt, open, form]);

  const handleSubmit = (data: VaccineReceiptUpdateFormData) => {
    if (!vaccineReceipt?.vaccineReceiptId) return;

    const payload = transformVaccineReceiptUpdateData(data);
    updateVaccineReceipt({
      vaccineReceiptId: vaccineReceipt.vaccineReceiptId,
      data: payload,
    });
  };

  const handleClose = () => {
    if (!isPending) {
      onOpenChange(false);
      form.reset({
        receiptDate: new Date(),
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-primary font-nunito-700">
            Cập nhật phiếu nhập vaccine
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Cập nhật thông tin phiếu nhập vaccine{" "}
            {vaccineReceipt?.receiptCode && (
              <span className="text-primary font-medium">
                {vaccineReceipt.receiptCode}
              </span>
            )}
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
                  <FormLabel className="font-nunito-600 text-gray-700">
                    Ngày nhập <span className="text-red-500">*</span>
                  </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                          disabled={isPending}
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
                        onSelect={field.onChange}
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
                onClick={handleClose}
                disabled={isPending}
                className="font-nunito-600"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary font-nunito-600 text-white"
              >
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Cập nhật
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
