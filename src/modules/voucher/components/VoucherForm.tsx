import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { voucherSchema, type VoucherFormData } from "../schemas/voucher.schema";
import type { Voucher } from "../types/voucher.type";

interface VoucherFormProps {
  initialData?: Voucher | null;
  onSubmit: (data: VoucherFormData) => void;
  isLoading?: boolean;
  onCancel: () => void;
}

export function VoucherForm({
  initialData,
  onSubmit,
  isLoading = false,
  onCancel,
}: VoucherFormProps) {
  const form = useForm<VoucherFormData>({
    resolver: zodResolver(voucherSchema),
    defaultValues: {
      voucherName: initialData?.voucherName || "",
      pointsRequired: initialData?.pointsRequired || 0,
      description: initialData?.description || "",
      discountAmount: initialData?.discountAmount || 0,
      expirationDate: initialData?.expirationDate
        ? format(new Date(initialData.expirationDate), "yyyy-MM-dd")
        : "",
    },
  });

  const handleSubmit = (data: VoucherFormData) => {
    onSubmit(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Tên voucher */}
          <FormField
            control={form.control}
            name="voucherName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên voucher *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập tên voucher"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Điểm yêu cầu */}
          <FormField
            control={form.control}
            name="pointsRequired"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Điểm yêu cầu *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập điểm yêu cầu"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* % giảm giá */}
          <FormField
            control={form.control}
            name="discountAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giảm giá (%) *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Nhập % giảm giá (0 - 100)"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Ngày hết hạn */}
          <FormField
            control={form.control}
            name="expirationDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Ngày hết hạn *</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                        disabled={isLoading}
                      >
                        {field.value ? (
                          format(new Date(field.value), "dd/MM/yyyy")
                        ) : (
                          <span>Chọn ngày hết hạn</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value ? new Date(field.value) : undefined}
                      onSelect={(date) =>
                        field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                      }
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Mô tả */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả voucher"
                  rows={4}
                  {...field}
                  disabled={isLoading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading
              ? initialData
                ? "Đang cập nhật..."
                : "Đang tạo..."
              : initialData
                ? "Cập nhật"
                : "Tạo voucher"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
