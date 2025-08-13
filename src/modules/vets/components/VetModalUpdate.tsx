import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useVetUpdate } from "../hooks/useVetUpdate";
import { useVetDetail } from "../hooks/useVetDetail";
import { Spinner } from "@/components/shared";
import { formatData } from "@/shared/utils/format.utils";
import {
  VetUpdateFormHeader,
  VetAvatarSection,
  VetBasicInfoForm,
  VetProfessionalInfoForm,
  VetUpdateFormActions,
} from "./";

// Validation schema
const vetUpdateSchema = z.object({
  name: z.string().min(1, "Tên bác sỹ là bắt buộc"),
  specialization: z.string().min(1, "Chuyên môn là bắt buộc"),
  dateOfBirth: z.string().min(1, "Ngày sinh là bắt buộc"),
  phoneNumber: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  image: z.string(),
});

type VetUpdateForm = z.infer<typeof vetUpdateSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
  vetId?: number;
}

export function VetModalUpdate({ open, onClose, vetId }: Props) {
  const { data: vet, isLoading: isLoadingVet } = useVetDetail(vetId || null);
  const updateVetMutation = useVetUpdate();

  const form = useForm<VetUpdateForm>({
    resolver: zodResolver(vetUpdateSchema),
    defaultValues: {
      name: "",
      specialization: "",
      dateOfBirth: "",
      phoneNumber: "",
      image: "",
    },
  });

  // Reset form when vet data changes
  React.useEffect(() => {
    if (vet) {
      form.reset({
        name: vet.name || "",
        specialization: vet.specialization || "",
        dateOfBirth: formatData.formatDateYMD(vet.dateOfBirth) || "",
        phoneNumber: vet.phoneNumber || "",
        image: "",
      });
    }
  }, [vet, form]);

  const onSubmit = async (data: VetUpdateForm) => {
    if (!vetId) return;

    try {
      await updateVetMutation.mutateAsync({
        payload: {
          vetId,
          ...data,
        },
      });
      onClose();
    } catch {
      // Error handled by mutation
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  if (!vetId) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <VetUpdateFormHeader />

        {isLoadingVet ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 py-6"
            >
              <VetAvatarSection name={form.watch("name")} />

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <VetBasicInfoForm control={form.control} />
                <VetProfessionalInfoForm control={form.control} />
              </div>

              <VetUpdateFormActions
                onClose={handleClose}
                isSubmitting={updateVetMutation.isPending}
              />
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
