import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Package } from "lucide-react";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useVaccineExportAdd } from "../hooks";
import {
  createVaccineExportSchema,
  type CreateVaccineExportFormData,
} from "../schemas/vaccine-export.schema";

interface CreateVaccineExportFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function CreateVaccineExportForm({
  onSuccess,
  onCancel,
}: CreateVaccineExportFormProps) {
  const form = useForm<CreateVaccineExportFormData>({
    resolver: zodResolver(createVaccineExportSchema),
    defaultValues: {
      exportDate: new Date().toISOString().split("T")[0], // Today's date
    },
  });

  const { mutate: createVaccineExport, isPending } = useVaccineExportAdd({
    onSuccess: () => {
      form.reset();
      onSuccess?.();
    },
  });

  const onSubmit = (data: CreateVaccineExportFormData) => {
    // Convert date to ISO format for API
    const exportData = {
      ...data,
      exportDate: new Date(data.exportDate).toISOString(),
    };

    createVaccineExport(exportData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package size={20} />
          Thông tin phiếu xuất kho
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="exportDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Calendar size={16} />
                      Ngày xuất kho
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        disabled={isPending}
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={isPending}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="flex items-center gap-2"
              >
                {isPending ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <Package size={16} />
                )}
                {isPending ? "Đang tạo..." : "Tạo phiếu xuất kho"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
