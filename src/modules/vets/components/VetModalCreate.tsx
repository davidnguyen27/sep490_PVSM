import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useVetCreate } from "../hooks/useVetCreate";
import {
  VetCreateFormHeader,
  VetAvatarSection,
  VetBasicInfoForm,
  VetProfessionalInfoForm,
  VetCreateFormActions,
} from "./";

// Validation schema
const vetCreateSchema = z.object({
  name: z.string().min(1, "Tên bác sỹ là bắt buộc"),
  specialization: z.string().min(1, "Chuyên môn là bắt buộc"),
  dateOfBirth: z.string().min(1, "Ngày sinh là bắt buộc"),
  phoneNumber: z
    .string()
    .min(1, "Số điện thoại là bắt buộc")
    .regex(/^[0-9]{10,11}$/, "Số điện thoại không hợp lệ"),
  image: z.string(),
});

type VetCreateForm = z.infer<typeof vetCreateSchema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export function VetModalCreate({ open, onClose }: Props) {
  const createVetMutation = useVetCreate();

  const form = useForm<VetCreateForm>({
    resolver: zodResolver(vetCreateSchema),
    defaultValues: {
      name: "",
      specialization: "",
      dateOfBirth: "",
      phoneNumber: "",
      image: "",
    },
  });

  const onSubmit = async (data: VetCreateForm) => {
    try {
      await createVetMutation.mutateAsync({
        payload: {
          vetId: null, // For create, vetId is null
          ...data,
        },
      });
      onClose();
      form.reset(); // Reset form after successful creation
    } catch {
      // Error handled by mutation
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <VetCreateFormHeader />

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

            <VetCreateFormActions
              onClose={handleClose}
              isSubmitting={createVetMutation.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
