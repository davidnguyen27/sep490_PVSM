import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { MicrochipPayload } from "../types/payload.type";
import type { MicrochipSchema } from "../schemas/microchip.schema";
import { microchipService } from "../services/microchip.service";
import { toast } from "sonner";
import { extractErrorMessage } from "@/shared/utils/error.utils";
import type { AxiosError } from "axios";

export function useMicrochipCreation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: MicrochipSchema) => {
      // Transform form data to payload format
      const payload: MicrochipPayload = {
        microchipCode: formData.microchipCode,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        notes: formData.notes,
        createMicrochipItemRequest: {
          petId: formData.petId || 0,
          name: formData.itemName,
          description: formData.itemDescription,
          location: formData.location,
          installationDate: formData.installationDate,
        },
      };

      return microchipService.createMicrochip(payload);
    },
    onSuccess: ({ message }) => {
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["microchips"] });
    },
    onError: (error) => toast.error(extractErrorMessage(error as AxiosError)),
  });
}
