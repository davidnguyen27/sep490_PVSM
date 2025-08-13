import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { VaccineReceiptDateSection } from "./VaccineReceiptDateSection";
import { VaccineDetailsList } from "./VaccineDetailsList";
import ButtonSpinner from "@/components/shared/ButtonSpinner";

// hooks
import { useVaccineReceiptAdd } from "../hooks/useVaccineReceiptAdd";
import { useAllVaccineBatches } from "@/modules/vaccine-batch/hooks";

// schemas
import { vaccineReceiptCreateSchema } from "../schemas/vaccine-receipt.schema";

// types
import type { VaccineReceiptCreateFormData } from "../schemas/vaccine-receipt.schema";

interface VaccineReceiptModalCreateProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VaccineReceiptModalCreate({
  open,
  onOpenChange,
}: VaccineReceiptModalCreateProps) {
  const form = useForm<VaccineReceiptCreateFormData>({
    resolver: zodResolver(vaccineReceiptCreateSchema),
    defaultValues: {
      receiptDate: new Date(),
      details: [
        {
          vaccineBatchId: 0,
          suppiler: "",
          quantity: 1,
          vaccineStatus: "active",
          notes: "",
          coldChainLog: {
            logTime: new Date().toISOString(),
            temperature: 2,
            humidity: 60,
            event: "storage",
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

  const { mutate: createVaccineReceipt, isPending } = useVaccineReceiptAdd();
  const { data: vaccineBatchesResponse, isLoading: isLoadingBatches } =
    useAllVaccineBatches();
  const vaccineBatches = vaccineBatchesResponse?.data?.pageData || [];

  const handleSubmit = (data: VaccineReceiptCreateFormData) => {
    console.log("Form data:", data);

    // Validate that all details have valid vaccine batch
    const hasInvalidBatch = data.details.some(
      (detail) => !detail.vaccineBatchId || detail.vaccineBatchId === 0,
    );

    if (hasInvalidBatch) {
      form.setError("details", {
        type: "manual",
        message: "Vui lòng chọn lô vaccine cho tất cả các mục",
      });
      return;
    }

    createVaccineReceipt(data, {
      onSuccess: () => {
        form.reset();
        onOpenChange(false);
      },
    });
  };

  const handleCancel = () => {
    form.reset();
    onOpenChange(false);
  };

  const addDetail = () => {
    append({
      vaccineBatchId: 0,
      suppiler: "",
      quantity: 1,
      vaccineStatus: "active",
      notes: "",
      coldChainLog: {
        logTime: new Date().toISOString(),
        temperature: 2,
        humidity: 60,
        event: "storage",
        notes: "",
      },
    });
  };

  const removeDetail = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-full max-w-4xl overflow-y-auto">
        <DialogHeader className="space-y-3 border-b border-gray-100 pb-4">
          <DialogTitle className="text-primary font-nunito-700 text-2xl">
            Tạo phiếu nhập vaccine mới
          </DialogTitle>
          <DialogDescription className="font-nunito-400 text-base text-gray-600">
            Nhập thông tin để tạo phiếu nhập vaccine mới cùng với chi tiết
            vaccine vào hệ thống. Bạn có thể thêm nhiều lô vaccine khác nhau
            trong cùng một phiếu nhập.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8 py-4"
          >
            {/* Receipt Date Section */}
            <VaccineReceiptDateSection control={form.control} />

            {/* Vaccine Details Section */}
            <VaccineDetailsList
              control={form.control}
              fields={fields}
              onAddDetail={addDetail}
              onRemoveDetail={removeDetail}
              vaccineBatches={vaccineBatches}
              isLoadingBatches={isLoadingBatches}
            />

            <DialogFooter className="border-t border-gray-100 pt-6">
              <div className="flex w-full justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  disabled={isPending}
                  className="font-nunito-600 min-w-24 border-gray-300 hover:bg-gray-50"
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  className="font-nunito-600 bg-primary hover:bg-secondary min-w-32 text-white"
                >
                  {isPending && <ButtonSpinner variant="white" size="sm" />}
                  {isPending ? "Đang tạo..." : "Tạo phiếu nhập"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
