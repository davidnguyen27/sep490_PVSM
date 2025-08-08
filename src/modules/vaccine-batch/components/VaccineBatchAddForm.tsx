import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { cn } from "@/lib/utils";

// UI Components
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

// Hooks and Types
import { useVaccineBatchAdd } from "../hooks/useVaccineBatchAdd";
import { useVaccinesForSelect } from "../hooks/useVaccinesForSelect";
import {
  vaccineBatchSchema,
  type VaccineBatchFormData,
} from "../schemas/vaccine-batch.schema";

interface Props {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function VaccineBatchAddForm({ onSuccess, onCancel }: Props) {
  const { mutate: createVaccineBatch, isPending } = useVaccineBatchAdd();
  const { vaccines, isPending: vaccinesLoading } = useVaccinesForSelect();

  const form = useForm<VaccineBatchFormData>({
    resolver: zodResolver(vaccineBatchSchema),
    defaultValues: {
      vaccineId: undefined,
      manufactureDate: "",
      expiryDate: "",
      manufacturer: "",
      source: "",
      storageCondition: "",
    },
  });

  const onSubmit = (data: VaccineBatchFormData) => {
    createVaccineBatch(data, {
      onSuccess: () => {
        form.reset();
        onSuccess?.();
      },
    });
  };

  const formatDateForInput = (date: Date) => {
    return format(date, "yyyy-MM-dd");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Vaccine Selection */}
        <FormField
          control={form.control}
          name="vaccineId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Vaccine <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString()}
                disabled={vaccinesLoading}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        vaccinesLoading
                          ? "Đang tải danh sách vaccine..."
                          : vaccines.length === 0
                            ? "Không có vaccine nào"
                            : "Chọn vaccine..."
                      }
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {vaccines.length === 0 ? (
                    <SelectItem value="empty" disabled>
                      Không có vaccine nào
                    </SelectItem>
                  ) : (
                    vaccines.map((vaccine) => (
                      <SelectItem
                        key={vaccine.vaccineId}
                        value={vaccine.vaccineId?.toString() || ""}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{vaccine.name}</span>
                          <span className="text-xs text-gray-500">
                            {vaccine.vaccineCode}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Manufacture Date */}
        <FormField
          control={form.control}
          name="manufactureDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-medium text-gray-700">
                Ngày sản xuất <span className="text-red-500">*</span>
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
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: vi })
                      ) : (
                        <span>Chọn ngày sản xuất</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value ? new Date(field.value) : undefined}
                    onSelect={(date: Date | undefined) => {
                      if (date) {
                        field.onChange(formatDateForInput(date));
                      }
                    }}
                    disabled={(date: Date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Expiry Date */}
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-sm font-medium text-gray-700">
                Ngày hết hạn <span className="text-red-500">*</span>
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
                    >
                      {field.value ? (
                        format(new Date(field.value), "PPP", { locale: vi })
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
                    onSelect={(date: Date | undefined) => {
                      if (date) {
                        field.onChange(formatDateForInput(date));
                      }
                    }}
                    disabled={(date: Date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Manufacturer */}
        <FormField
          control={form.control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Nhà sản xuất <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tên nhà sản xuất..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Source */}
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Nguồn gốc <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập nguồn gốc..."
                  {...field}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Storage Condition */}
        <FormField
          control={form.control}
          name="storageCondition"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Điều kiện bảo quản <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập điều kiện bảo quản..."
                  className="min-h-[100px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isPending}
          >
            Hủy
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Đang xử lý..." : "Thêm lô vaccine"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
