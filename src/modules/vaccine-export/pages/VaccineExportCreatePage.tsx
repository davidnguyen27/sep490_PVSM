import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// components
import { PageBreadcrumb, ButtonSpinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  VaccineExportDateSection,
  VaccineExportDetailsList,
} from "../components";

// hooks
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVaccineExportAdd } from "../hooks";
import { useAllVaccineBatches } from "@/modules/vaccine-batch/hooks";

// schemas
import {
  createVaccineExportSchema,
  type CreateVaccineExportFormData,
} from "../schemas/vaccine-export.schema";

// icons
import { ArrowLeft, Package, Save } from "lucide-react";

// form
import { Form } from "@/components/ui/form";

export default function VaccineExportCreatePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateVaccineExportFormData>({
    resolver: zodResolver(createVaccineExportSchema),
    defaultValues: {
      exportDate: new Date().toISOString().split("T")[0],
      details: [
        {
          vaccineBatchId: 0,
          quantity: 1,
          purpose: "hủy" as const,
          notes: "",
          coldChainLog: {
            logTime: new Date().toISOString(),
            temperature: 2,
            humidity: 60,
            event: "xuất kho",
            notes: "",
          },
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "details",
  });

  const { data: vaccineBatchesResponse, isLoading: isLoadingBatches } =
    useAllVaccineBatches();
  const vaccineBatches = vaccineBatchesResponse?.data?.pageData || [];

  const { mutate: createVaccineExport } = useVaccineExportAdd();

  const onSubmit = async (data: CreateVaccineExportFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => {
        createVaccineExport(data, {
          onSuccess: () => {
            resolve(void 0);
            // Remove action query parameter to go back to list
            const currentParams = new URLSearchParams(searchParams);
            currentParams.delete("action");
            setSearchParams(currentParams);
          },
          onError: () => {
            resolve(void 0);
          },
        });
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Remove action query parameter to go back to list
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete("action");
    setSearchParams(currentParams);
  };

  const handleAddDetail = () => {
    append({
      vaccineBatchId: 0,
      quantity: 1,
      purpose: "hủy" as const,
      notes: "",
      coldChainLog: {
        logTime: new Date().toISOString(),
        temperature: 2,
        humidity: 60,
        event: "xuất kho",
        notes: "",
      },
    });
  };

  const handleRemoveDetail = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <Package color="#00B8A9" />
        <h1 className="text-primary font-nunito-700 text-2xl">
          Tạo phiếu xuất kho vắc-xin mới
        </h1>
      </div>

      <PageBreadcrumb items={["Danh sách xuất kho", "Tạo mới"]} />

      {/* Main Content */}
      <Card className="rounded-none shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-4">
          <CardTitle className="font-nunito-700 text-dark text-lg">
            Thông tin phiếu xuất kho vắc-xin
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Date Section */}
              <VaccineExportDateSection control={form.control} />

              {/* Vaccine Details */}
              <VaccineExportDetailsList
                control={form.control}
                fields={fields}
                onAddDetail={handleAddDetail}
                onRemoveDetail={handleRemoveDetail}
                vaccineBatches={vaccineBatches}
                isLoadingBatches={isLoadingBatches}
              />

              {/* Action Buttons */}
              <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isSubmitting}
                  className="font-nunito-600 min-w-28"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-nunito-600 bg-primary hover:bg-secondary min-w-32 text-white"
                >
                  {isSubmitting && <ButtonSpinner variant="white" size="sm" />}
                  <Save className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Đang lưu..." : "Lưu phiếu xuất"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
