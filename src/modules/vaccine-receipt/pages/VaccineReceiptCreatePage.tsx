import { useState } from "react";
import { useSearchParams } from "react-router-dom";

// components
import { PageBreadcrumb, ButtonSpinner } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VaccineReceiptDateSection, VaccineDetailsList } from "../components";

// hooks
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVaccineReceiptAdd } from "../hooks";
import { useVaccineBatches } from "@/modules/vaccine-batch/hooks";

// schemas
import {
  vaccineReceiptCreateSchema,
  type VaccineReceiptCreateFormData,
} from "../schemas/vaccine-receipt.schema";

// icons
import { ArrowLeft, FileText, Save } from "lucide-react";

// form
import { Form } from "@/components/ui/form";

export default function VaccineReceiptCreatePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<VaccineReceiptCreateFormData>({
    resolver: zodResolver(vaccineReceiptCreateSchema),
    defaultValues: {
      receiptDate: new Date(),
      details: [
        {
          vaccineBatchId: 0,
          suppiler: "",
          quantity: 0,
          vaccineStatus: "",
          notes: "",
          coldChainLog: {
            logTime: "",
            temperature: 0,
            humidity: 0,
            event: "",
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

  const { data: vaccineBatchData, isPending: isLoadingBatches } =
    useVaccineBatches({
      pageNumber: 1,
      pageSize: 100,
    });

  const vaccineBatches = vaccineBatchData?.data.pageData ?? [];

  const { mutate: createVaccineReceipt } = useVaccineReceiptAdd();

  const onSubmit = async (data: VaccineReceiptCreateFormData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => {
        createVaccineReceipt(data, {
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
      suppiler: "",
      quantity: 0,
      vaccineStatus: "",
      notes: "",
      coldChainLog: {
        logTime: "",
        temperature: 0,
        humidity: 0,
        event: "",
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
        <FileText color="#00B8A9" />
        <h1 className="text-primary font-nunito-700 text-2xl">
          Tạo phiếu nhập vắc-xin mới
        </h1>
      </div>

      <PageBreadcrumb items={["Danh sách phiếu nhập", "Tạo mới"]} />

      {/* Main Content */}
      <Card className="rounded-none shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-4">
          <CardTitle className="font-nunito-700 text-dark text-lg">
            Thông tin phiếu nhập vắc-xin
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Date Section */}
              <VaccineReceiptDateSection control={form.control} />

              {/* Vaccine Details */}
              <VaccineDetailsList
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
                  {isSubmitting ? "Đang lưu..." : "Lưu phiếu nhập"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
