import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// components
import { PageBreadcrumb, ButtonSpinner, PageLoader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VaccineReceiptDateSection, VaccineDetailsList } from "../components";

// hooks
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVaccineReceiptEdit, useVaccineReceiptDetail } from "../hooks";
import { useVaccineReceiptDetailByReceipt } from "@/modules/vaccine-receipt-detail/hooks";
import { useVaccineBatches } from "@/modules/vaccine-batch/hooks";

// schemas
import {
  vaccineReceiptUpdateSchema,
  type VaccineReceiptUpdateFormData,
} from "../schemas/vaccine-receipt.schema";

// icons
import { ArrowLeft, FileText, Save } from "lucide-react";

// form
import { Form } from "@/components/ui/form";

export default function VaccineReceiptEditPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get vaccine receipt ID from URL params
  const vaccineReceiptIdParam = searchParams.get("vaccineReceiptId");
  const vaccineReceiptId = vaccineReceiptIdParam
    ? parseInt(vaccineReceiptIdParam)
    : null;

  // Fetch vaccine receipt detail
  const { data: vaccineReceiptData, isPending: isLoadingDetail } =
    useVaccineReceiptDetail(vaccineReceiptId);
  const vaccineReceipt = vaccineReceiptData;

  // Fetch vaccine receipt details
  const { data: vaccineReceiptDetailsData, isPending: isLoadingDetails } =
    useVaccineReceiptDetailByReceipt(vaccineReceiptId);

  const vaccineReceiptDetails = useMemo(
    () => vaccineReceiptDetailsData || [],
    [vaccineReceiptDetailsData],
  );

  // Fetch vaccine batches
  const { data: vaccineBatchData, isPending: isLoadingBatches } =
    useVaccineBatches({
      pageNumber: 1,
      pageSize: 100,
    });
  const vaccineBatches = vaccineBatchData?.data.pageData ?? [];

  const form = useForm<VaccineReceiptUpdateFormData>({
    resolver: zodResolver(vaccineReceiptUpdateSchema),
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

  // Update form when data is loaded
  useEffect(() => {
    if (vaccineReceipt) {
      // Set receipt date
      form.setValue("receiptDate", new Date(vaccineReceipt.receiptDate));

      if (vaccineReceiptDetails.length > 0) {
        // Set details from existing data
        const formDetails = vaccineReceiptDetails.map((detail) => ({
          vaccineBatchId: detail.vaccineBatch?.vaccineBatchId || 0,
          suppiler: detail.suppiler || "",
          quantity: detail.quantity || 0,
          vaccineStatus: detail.vaccineStatus || "",
          notes: detail.notes || "",
          coldChainLog: {
            logTime: "",
            temperature: 0,
            humidity: 0,
            event: "",
            notes: "",
          },
        }));

        form.setValue("details", formDetails);
      }
    }
  }, [vaccineReceipt, vaccineReceiptDetails, form]);

  const { mutate: updateVaccineReceipt } = useVaccineReceiptEdit();

  const onSubmit = async (data: VaccineReceiptUpdateFormData) => {
    if (!vaccineReceiptId) return;

    setIsSubmitting(true);
    try {
      await new Promise((resolve) => {
        updateVaccineReceipt(
          {
            vaccineReceiptId,
            data: {
              receiptDate: data.receiptDate.toISOString(),
            },
          },
          {
            onSuccess: () => {
              resolve(void 0);
              // Remove edit params to go back to list
              const currentParams = new URLSearchParams(searchParams);
              currentParams.delete("action");
              currentParams.delete("vaccineReceiptId");
              setSearchParams(currentParams);
            },
            onError: () => {
              resolve(void 0);
            },
          },
        );
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Remove edit params to go back to list
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete("action");
    currentParams.delete("vaccineReceiptId");
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

  if (isLoadingDetail || isLoadingDetails) {
    return (
      <PageLoader
        loading={true}
        loadingText="Đang tải thông tin phiếu nhập vaccine..."
      >
        <div />
      </PageLoader>
    );
  }

  if (!vaccineReceipt) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <FileText color="#00B8A9" />
          <h1 className="text-primary font-nunito-700 text-2xl">
            Phiếu nhập vaccine không tồn tại
          </h1>
        </div>
        <PageBreadcrumb items={["Danh sách phiếu nhập", "Chỉnh sửa"]} />
        <Card className="rounded-none shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">
              Không tìm thấy phiếu nhập vaccine với ID này.
            </p>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="font-nunito-600 mt-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Quay lại
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-2">
        <FileText color="#00B8A9" />
        <h1 className="text-primary font-nunito-700 text-2xl">
          Chỉnh sửa phiếu nhập vắc-xin
        </h1>
      </div>

      <PageBreadcrumb items={["Danh sách phiếu nhập", "Chỉnh sửa"]} />

      {/* Main Content */}
      <Card className="rounded-none shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-4">
          <CardTitle className="font-nunito-700 text-dark text-lg">
            Thông tin phiếu nhập vắc-xin - Mã: {vaccineReceipt.receiptCode}
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

              {/* Warning Message */}
              <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                <p className="font-nunito-500 text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Hiện tại form này chỉ cập nhật ngày
                  nhập. Các thay đổi ở phần chi tiết vaccine sẽ không được lưu.
                  Để chỉnh sửa chi tiết vaccine, vui lòng liên hệ quản trị viên.
                </p>
              </div>

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
                  {isSubmitting ? "Đang cập nhật..." : "Cập nhật phiếu"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
