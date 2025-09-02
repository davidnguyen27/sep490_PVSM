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
import {
  useVaccineReceiptDetailByReceipt,
  useUpdateVaccineReceiptDetail,
  useCreateVaccineReceiptDetail,
  useDeleteVaccineReceiptDetail,
} from "@/modules/vaccine-receipt-detail/hooks";
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

  // Track original detail IDs to know which ones to delete
  const [originalDetailIds, setOriginalDetailIds] = useState<number[]>([]);

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
          vaccineBatchId: 1, // Changed from 0 to 1 to pass validation
          suppiler: "Nhà cung cấp",
          quantity: 1, // Changed from 0 to 1 to pass validation
          vaccineStatus: "active",
          notes: "",
          coldChainLog: {
            logTime: new Date().toISOString(),
            temperature: 2,
            humidity: 50,
            event: "Nhập kho",
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
        // Store original detail IDs
        const detailIds = vaccineReceiptDetails
          .map((detail) => detail.vaccineReceiptDetailId)
          .filter((id): id is number => id !== null);
        setOriginalDetailIds(detailIds);

        // Set details from existing data
        const formDetails = vaccineReceiptDetails.map((detail) => ({
          vaccineReceiptDetailId: detail.vaccineReceiptDetailId || undefined, // Convert null to undefined
          vaccineBatchId: detail.vaccineBatch?.vaccineBatchId || 1, // Changed from 0 to 1
          suppiler: detail.suppiler || "Nhà cung cấp",
          quantity: detail.quantity || 1, // Changed from 0 to 1
          vaccineStatus: detail.vaccineStatus || "active",
          notes: detail.notes || "",
          coldChainLog: {
            logTime: new Date().toISOString(),
            temperature: 2,
            humidity: 50,
            event: "Nhập kho",
            notes: "",
          },
        }));

        form.setValue("details", formDetails);
      }
    }
  }, [vaccineReceipt, vaccineReceiptDetails, form]);

  const { mutateAsync: updateVaccineReceipt } = useVaccineReceiptEdit();
  const { mutateAsync: updateVaccineReceiptDetail } =
    useUpdateVaccineReceiptDetail();
  const { mutateAsync: createVaccineReceiptDetail } =
    useCreateVaccineReceiptDetail();
  const { mutateAsync: deleteVaccineReceiptDetail } =
    useDeleteVaccineReceiptDetail();

  const navigateToList = () => {
    const currentParams = new URLSearchParams(searchParams);
    currentParams.delete("action");
    currentParams.delete("vaccineReceiptId");
    setSearchParams(currentParams);
  };

  const onSubmit = async (data: VaccineReceiptUpdateFormData) => {
    console.log("Edit form submission started with data:", data);

    if (!vaccineReceiptId) {
      console.error("No vaccineReceiptId found");
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare receipt update data
      const receiptUpdateData = {
        receiptDate: data.receiptDate.toISOString(),
      };

      // Separate details into create, update, and delete operations
      const detailsToCreate = data.details.filter(
        (detail) => !detail.vaccineReceiptDetailId,
      );
      const detailsToUpdate = data.details.filter(
        (detail) => detail.vaccineReceiptDetailId,
      );
      const currentDetailIds = detailsToUpdate
        .map((detail) => detail.vaccineReceiptDetailId)
        .filter((id): id is number => id !== undefined);
      const detailsToDelete = originalDetailIds.filter(
        (id) => !currentDetailIds.includes(id),
      );

      console.log("Operations summary:", {
        create: detailsToCreate.length,
        update: detailsToUpdate.length,
        delete: detailsToDelete.length,
      });

      // Build promises array for all operations
      const promises: Promise<unknown>[] = [];

      // 1. Update vaccine receipt
      console.log("Adding receipt update promise");
      promises.push(
        updateVaccineReceipt({ vaccineReceiptId, data: receiptUpdateData })
          .then((response) => {
            console.log("Receipt update success:", response);
            return response;
          })
          .catch((error) => {
            console.error("Receipt update error:", error);
            throw new Error("Receipt update failed");
          }),
      );

      // 2. Create new details
      detailsToCreate.forEach((detail, index) => {
        console.log(`Adding create detail ${index} promise`);
        promises.push(
          createVaccineReceiptDetail({
            vaccineReceiptId,
            vaccineBatchId: detail.vaccineBatchId,
            suppiler: detail.suppiler,
            quantity: detail.quantity,
            vaccineStatus: detail.vaccineStatus,
            notes: detail.notes || "",
            coldChainLog: {
              ...detail.coldChainLog,
              vaccineBatchId: detail.vaccineBatchId,
              notes: detail.coldChainLog.notes || "",
            },
          })
            .then((response) => {
              console.log(`Create detail ${index} success:`, response);
              return response;
            })
            .catch((error) => {
              console.error(`Create detail ${index} error:`, error);
              throw new Error(`Create detail ${index} failed`);
            }),
        );
      });

      // 3. Update existing details
      detailsToUpdate.forEach((detail, index) => {
        if (detail.vaccineReceiptDetailId !== undefined) {
          console.log(`Adding update detail ${index} promise`);
          promises.push(
            updateVaccineReceiptDetail({
              vaccineReceiptDetailId: detail.vaccineReceiptDetailId!,
              payload: {
                vaccineReceiptId,
                vaccineBatchId: detail.vaccineBatchId,
                suppiler: detail.suppiler,
                quantity: detail.quantity,
                vaccineStatus: detail.vaccineStatus,
                notes: detail.notes || "",
                coldChainLog: {
                  ...detail.coldChainLog,
                  vaccineBatchId: detail.vaccineBatchId,
                  notes: detail.coldChainLog.notes || "",
                },
              },
            })
              .then((response) => {
                console.log(`Update detail ${index} success:`, response);
                return response;
              })
              .catch((error) => {
                console.error(`Update detail ${index} error:`, error);
                throw new Error(`Update detail ${index} failed`);
              }),
          );
        } else {
          console.warn(`Skipping detail ${index} - no vaccineReceiptDetailId`);
        }
      });

      // 4. Delete removed details
      detailsToDelete.forEach((detailId) => {
        console.log(`Adding delete detail ${detailId} promise`);
        promises.push(
          deleteVaccineReceiptDetail(detailId)
            .then((response) => {
              console.log(`Delete detail ${detailId} success:`, response);
              return response;
            })
            .catch((error) => {
              console.error(`Delete detail ${detailId} error:`, error);
              throw new Error(`Delete detail ${detailId} failed`);
            }),
        );
      });

      console.log(`Total promises to execute: ${promises.length}`);

      // Wait for all operations to complete
      const settledResults = await Promise.allSettled(promises);
      console.log("All operations settled:", settledResults);

      // Check if any operations failed
      const failedOperations = settledResults.filter(
        (result) => result.status === "rejected",
      );
      if (failedOperations.length > 0) {
        console.error("Some operations failed:", failedOperations);
        throw new Error(`${failedOperations.length} operations failed`);
      }

      console.log("All operations completed successfully, navigating to list");

      // Navigate back to list on success
      navigateToList();
    } catch (error) {
      console.error("Update error:", error);
      // Error handling is already done by individual mutations via toast
    } finally {
      console.log("Setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    // Remove edit params to go back to list
    navigateToList();
  };

  const handleAddDetail = () => {
    append({
      // No vaccineReceiptDetailId for new details
      vaccineBatchId: 1, // Changed from 0
      suppiler: "Nhà cung cấp",
      quantity: 1, // Changed from 0
      vaccineStatus: "active",
      notes: "",
      coldChainLog: {
        logTime: new Date().toISOString(),
        temperature: 2,
        humidity: 50,
        event: "Nhập kho",
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
        <PageBreadcrumb
          items={[
            { label: "Danh sách phiếu nhập", path: "/admin/vaccine-receipts" },
            "Chỉnh sửa",
          ]}
        />
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

      <PageBreadcrumb
        items={[
          { label: "Danh sách phiếu nhập", path: "/admin/vaccine-receipts" },
          "Chỉnh sửa",
        ]}
      />

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
              {/* Debug form errors */}
              {Object.keys(form.formState.errors).length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <h4 className="mb-2 font-semibold text-red-800">
                    Form Validation Errors:
                  </h4>
                  <pre className="text-xs whitespace-pre-wrap text-red-600">
                    {JSON.stringify(form.formState.errors, null, 2)}
                  </pre>
                </div>
              )}

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
                <div className="flex items-center gap-4">
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
                </div>

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
