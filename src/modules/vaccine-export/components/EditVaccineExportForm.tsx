import { useEffect } from "react";
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

import { useVaccineExportEdit } from "../hooks";
import {
  updateVaccineExportSchema,
  type UpdateVaccineExportFormData,
} from "../schemas/vaccine-export.schema";
import type { VaccineExport } from "../types/vaccine-export.type";

interface EditVaccineExportFormProps {
  vaccineExport: VaccineExport;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function EditVaccineExportForm({
  vaccineExport,
  onSuccess,
  onCancel,
}: EditVaccineExportFormProps) {
  const form = useForm<UpdateVaccineExportFormData>({
    resolver: zodResolver(updateVaccineExportSchema),
    defaultValues: {
      exportDate: "",
    },
  });

  // Set form values when vaccineExport data is available
  useEffect(() => {
    if (vaccineExport) {
      form.reset({
        exportDate: new Date(vaccineExport.exportDate)
          .toISOString()
          .split("T")[0],
      });
    }
  }, [vaccineExport, form]);

  const { mutate: updateVaccineExport, isPending } = useVaccineExportEdit({
    onSuccess: () => {
      onSuccess?.();
    },
  });

  const onSubmit = (data: UpdateVaccineExportFormData) => {
    if (!vaccineExport.vaccineExportId) return;

    // Convert date to ISO format for API
    const exportData = {
      ...data,
      exportDate: new Date(data.exportDate).toISOString(),
    };

    updateVaccineExport({
      exportId: vaccineExport.vaccineExportId,
      data: exportData,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package size={20} />
          Cập nhật thông tin phiếu xuất kho
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Mã xuất kho
                </label>
                <Input
                  value={vaccineExport.exportCode}
                  disabled
                  className="bg-gray-50"
                />
              </div>

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

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Người tạo
                </label>
                <Input
                  value={vaccineExport.createdBy}
                  disabled
                  className="bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Ngày tạo
                </label>
                <Input
                  value={new Date(vaccineExport.createdAt).toLocaleString(
                    "vi-VN",
                  )}
                  disabled
                  className="bg-gray-50"
                />
              </div>
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
                {isPending ? "Đang cập nhật..." : "Cập nhật phiếu xuất kho"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
