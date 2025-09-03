import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// components
import { PageBreadcrumb, ButtonSpinner, PageLoader } from "@/components/shared";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  VaccineExportDateSection,
  VaccineExportDetailsList,
} from "../components";

// hooks
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useVaccineExportEdit, useVaccineExportById } from "../hooks";
import {
  useExportDetailByExport,
  useUpdateExportDetail,
  useAddVaccineExportDetail,
  useDeleteExportDetail,
} from "@/modules/vaccine-export-detail/hooks";
import { useAllVaccineBatches } from "@/modules/vaccine-batch/hooks";

// schemas
import {
  createVaccineExportSchema,
  type CreateVaccineExportFormData,
} from "../schemas/vaccine-export.schema";

// types
import type { VaccineExportDetail } from "@/modules/vaccine-export-detail/types/vaccine-export-detail.type";

// utils
import { formatData } from "@/shared/utils/format.utils";

// icons
import { ArrowLeft, Package, Save } from "lucide-react";

// form
import { Form } from "@/components/ui/form";

export default function EditVaccineExportPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();
  // Store original detail IDs for comparison
  const [originalDetailIds, setOriginalDetailIds] = useState<number[]>([]);

  // Get vaccine export ID from URL params
  const exportIdParam = searchParams.get("exportId");
  const exportId = exportIdParam ? parseInt(exportIdParam) : null;

  // Fetch vaccine export detail
  const { data: vaccineExportData, isPending: isLoadingDetail } =
    useVaccineExportById(exportId!);
  const vaccineExport = vaccineExportData;

  // Fetch vaccine export details
  const { data: vaccineExportDetailsData, isPending: isLoadingDetails } =
    useExportDetailByExport(exportId!);

  const vaccineExportDetails = useMemo(
    () => vaccineExportDetailsData || [],
    [vaccineExportDetailsData],
  );

  // Fetch vaccine batches
  const { data: vaccineBatchesResponse, isLoading: isLoadingBatches } =
    useAllVaccineBatches();
  const vaccineBatches = vaccineBatchesResponse?.data?.pageData || [];

  const form = useForm<CreateVaccineExportFormData>({
    resolver: zodResolver(createVaccineExportSchema),
    defaultValues: {
      exportDate: new Date().toISOString().split("T")[0],
      details: [
        {
          vaccineBatchId: 0,
          quantity: 1,
          purpose: "hủy lô" as const,
          notes: "",
          coldChainLog: {
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

  // Update form when data is loaded
  useEffect(() => {
    if (vaccineExport) {
      // Set export date as string format for date input
      // Use formatDateForInput to handle timezone correctly
      const dateString = formatData.formatDateForInput(
        vaccineExport.exportDate,
      );
      form.setValue("exportDate", dateString);

      // Set details from existing data
      if (vaccineExportDetails.length > 0) {
        // Store original detail IDs
        const detailIds = vaccineExportDetails
          .map((detail: VaccineExportDetail) => detail.vaccineExportDetailId)
          .filter((id): id is number => id !== null);
        setOriginalDetailIds(detailIds);

        const formDetails = vaccineExportDetails.map(
          (detail: VaccineExportDetail) => ({
            vaccineExportDetailId: detail.vaccineExportDetailId || undefined, // Convert null to undefined
            vaccineBatchId: detail.vaccineBatch?.vaccineBatchId || 0,
            quantity: detail.quantity || 1,
            purpose: (detail.purpose || "hủy lô") as
              | "hủy lô"
              | "trả hàng"
              | "tiêm phòng",
            notes: detail.notes || "",
            coldChainLog: {
              temperature: 2,
              humidity: 60,
              event: "xuất kho",
              notes: "",
            },
          }),
        );
        form.setValue("details", formDetails);
      }
    }
  }, [vaccineExport, vaccineExportDetails, form, setOriginalDetailIds]);

  const { mutate: updateVaccineExport } = useVaccineExportEdit();
  const { mutate: updateExportDetail } = useUpdateExportDetail();
  const { mutate: addExportDetail } = useAddVaccineExportDetail();
  const { mutate: deleteExportDetail } = useDeleteExportDetail();

  const onSubmit = async (data: CreateVaccineExportFormData) => {
    if (!exportId) return;

    setIsSubmitting(true);
    try {
      // 1. Update vaccine export first
      await new Promise<void>((resolve, reject) => {
        updateVaccineExport(
          {
            exportId,
            data: {
              exportDate: data.exportDate,
            },
          },
          {
            onSuccess: () => resolve(),
            onError: (error) => reject(error),
          },
        );
      });

      // 2. Process export details
      const currentDetails = data.details;
      const operations: Promise<void>[] = [];

      // Get current detail IDs from form
      const currentDetailIds = currentDetails
        .map((detail) => detail.vaccineExportDetailId)
        .filter((id): id is number => id !== undefined && id !== null);

      // Delete removed details
      const detailsToDelete = originalDetailIds.filter(
        (id) => !currentDetailIds.includes(id),
      );

      for (const detailId of detailsToDelete) {
        operations.push(
          new Promise<void>((resolve, reject) => {
            deleteExportDetail(detailId, {
              onSuccess: () => resolve(),
              onError: (error) => reject(error),
            });
          }),
        );
      }

      // Update existing details and create new ones
      for (const detail of currentDetails) {
        if (detail.vaccineExportDetailId) {
          // Update existing detail
          operations.push(
            new Promise<void>((resolve, reject) => {
              updateExportDetail(
                {
                  exportDetailId: detail.vaccineExportDetailId!,
                  payload: {
                    vaccineExportId: exportId,
                    vaccineBatchId: detail.vaccineBatchId,
                    quantity: detail.quantity,
                    purpose: detail.purpose,
                    notes: detail.notes || "",
                    coldChainLog: {
                      vaccineBatchId: detail.vaccineBatchId,
                      logTime: new Date().toISOString(),
                      temperature: detail.coldChainLog?.temperature || 2,
                      humidity: detail.coldChainLog?.humidity || 60,
                      event: detail.coldChainLog?.event || "xuất kho",
                      notes: detail.coldChainLog?.notes || "",
                    },
                  },
                },
                {
                  onSuccess: () => resolve(),
                  onError: (error) => reject(error),
                },
              );
            }),
          );
        } else {
          // Create new detail
          operations.push(
            new Promise<void>((resolve, reject) => {
              addExportDetail(
                {
                  vaccineExportId: exportId,
                  vaccineBatchId: detail.vaccineBatchId,
                  quantity: detail.quantity,
                  purpose: detail.purpose,
                  notes: detail.notes || "",
                  coldChainLog: {
                    vaccineBatchId: detail.vaccineBatchId,
                    logTime: new Date().toISOString(),
                    temperature: detail.coldChainLog?.temperature || 2,
                    humidity: detail.coldChainLog?.humidity || 60,
                    event: detail.coldChainLog?.event || "xuất kho",
                    notes: detail.coldChainLog?.notes || "",
                  },
                },
                {
                  onSuccess: () => resolve(),
                  onError: (error) => reject(error),
                },
              );
            }),
          );
        }
      }

      // Wait for all detail operations to complete
      const results = await Promise.allSettled(operations);

      // Check if all operations succeeded
      const failedOperations = results.filter(
        (result) => result.status === "rejected",
      );

      if (failedOperations.length > 0) {
        console.error("Some detail operations failed:", failedOperations);
        // Still continue as main export was updated
      }

      // Invalidate relevant queries to refresh data
      await queryClient.invalidateQueries({
        queryKey: ["vaccine-export", exportId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["export-details", exportId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["vaccine-export-details", exportId],
      });
      await queryClient.invalidateQueries({
        queryKey: ["vaccine-batches"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["vaccine-exports"],
      });

      // Navigate back to list
      const currentParams = new URLSearchParams(searchParams);
      currentParams.delete("action");
      currentParams.delete("exportId");
      setSearchParams(currentParams);
    } catch (error) {
      console.error("Error updating vaccine export:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Remove edit params to go back to list
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete("action");
    currentParams.delete("exportId");
    setSearchParams(currentParams);
  };

  const handleAddDetail = () => {
    append({
      // Don't include vaccineExportDetailId for new details
      vaccineBatchId: 0,
      quantity: 1,
      purpose: "hủy lô" as const,
      notes: "",
      coldChainLog: {
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

  if (isLoadingDetail || isLoadingDetails) {
    return (
      <PageLoader
        loading={true}
        loadingText="Đang tải thông tin phiếu xuất vaccine..."
      >
        <div />
      </PageLoader>
    );
  }

  if (!vaccineExport) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Package color="#00B8A9" />
          <h1 className="text-primary font-nunito-700 text-2xl">
            Phiếu xuất vaccine không tồn tại
          </h1>
        </div>
        <PageBreadcrumb items={["Danh sách phiếu xuất", "Chỉnh sửa"]} />
        <Card className="rounded-none shadow-sm">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">
              Không tìm thấy phiếu xuất vaccine với ID này.
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
        <Package color="#00B8A9" />
        <h1 className="text-primary font-nunito-700 text-2xl">
          Cập nhật phiếu xuất kho vắc-xin
        </h1>
      </div>

      <PageBreadcrumb
        items={[
          { label: "Danh sách phiếu xuất", path: "/admin/vaccine-exports" },
          "Chỉnh sửa",
        ]}
      />

      {/* Main Content */}
      <Card className="rounded-none shadow-sm">
        <CardHeader className="border-b border-gray-100 bg-gray-50/50 py-4">
          <CardTitle className="font-nunito-700 text-dark my-0 text-lg">
            Cập nhật phiếu xuất kho vắc-xin - Mã: {vaccineExport.exportCode}
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Date Section */}
              <VaccineExportDateSection
                control={form.control}
                isEditMode={true}
              />

              {/* Vaccine Details */}
              <VaccineExportDetailsList
                control={form.control}
                fields={fields}
                onAddDetail={handleAddDetail}
                onRemoveDetail={handleRemoveDetail}
                vaccineBatches={vaccineBatches}
                isLoadingBatches={isLoadingBatches}
                isEditMode={true}
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
                  {isSubmitting ? "Đang cập nhật..." : "Cập nhật phiếu xuất"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
