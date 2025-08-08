import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/shared";
import { vaccineDiseaseSchema, type VaccineDiseaseFormData } from "../schemas";
import { useVaccinesForSelect, useDiseasesForSelect } from "../hooks";
import type { VaccineDiseasePayload } from "../types/vaccine-disease.payload.type";
import { formatSpecies } from "../utils";
import { VACCINE_DISEASE_MESSAGES } from "../constants";

interface VaccineDiseaseModalCreateProps {
  open: boolean;
  onClose: () => void;
  submit: (data: VaccineDiseasePayload) => void;
  isSubmitting: boolean;
  defaultDiseaseId?: number | null;
  hideDiseaseSelection?: boolean;
}

export function VaccineDiseaseModalCreate({
  open,
  onClose,
  submit,
  isSubmitting,
  defaultDiseaseId,
  hideDiseaseSelection = false,
}: VaccineDiseaseModalCreateProps) {
  const form = useForm<VaccineDiseaseFormData>({
    resolver: zodResolver(vaccineDiseaseSchema),
    defaultValues: {
      vaccineId: 0,
      diseaseId: defaultDiseaseId || 0,
    },
  });

  const { data: vaccines, isPending: isLoadingVaccines } =
    useVaccinesForSelect();
  const { data: diseases, isPending: isLoadingDiseases } =
    useDiseasesForSelect();

  // Update form when defaultDiseaseId changes
  useEffect(() => {
    if (defaultDiseaseId) {
      form.setValue("diseaseId", defaultDiseaseId);
    }
  }, [defaultDiseaseId, form]);

  const handleSubmit = (data: VaccineDiseaseFormData) => {
    const payload: VaccineDiseasePayload = {
      vaccineId: data.vaccineId,
      diseaseId: data.diseaseId,
    };
    submit(payload);
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-nunito-700 text-xl text-gray-900">
            {VACCINE_DISEASE_MESSAGES.CREATE_TITLE}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            {/* Vaccine Selection */}
            <FormField
              control={form.control}
              name="vaccineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-nunito-600 text-gray-700">
                    Vaccine *
                  </FormLabel>
                  <Select
                    value={field.value?.toString() || ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                    disabled={isLoadingVaccines}
                  >
                    <FormControl>
                      <SelectTrigger className="font-nunito-400">
                        <SelectValue
                          placeholder={VACCINE_DISEASE_MESSAGES.SELECT_VACCINE}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isLoadingVaccines ? (
                        <div className="flex items-center justify-center py-4">
                          <Spinner />
                        </div>
                      ) : (
                        vaccines?.map((vaccine) => (
                          <SelectItem
                            key={vaccine.vaccineId}
                            value={vaccine.vaccineId?.toString() || ""}
                            className="font-nunito-400"
                          >
                            <div className="flex flex-col">
                              <span>{vaccine.name}</span>
                              <span className="text-xs text-gray-500">
                                Mã: {vaccine.vaccineCode}
                              </span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Disease Selection - Hide when hideDiseaseSelection is true */}
            {!hideDiseaseSelection && (
              <FormField
                control={form.control}
                name="diseaseId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-nunito-600 text-gray-700">
                      Bệnh tật *
                    </FormLabel>
                    <Select
                      value={field.value?.toString() || ""}
                      onValueChange={(value) => field.onChange(Number(value))}
                      disabled={isLoadingDiseases}
                    >
                      <FormControl>
                        <SelectTrigger className="font-nunito-400">
                          <SelectValue
                            placeholder={
                              VACCINE_DISEASE_MESSAGES.SELECT_DISEASE
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {isLoadingDiseases ? (
                          <div className="flex items-center justify-center py-4">
                            <Spinner />
                          </div>
                        ) : (
                          diseases?.map((disease) => (
                            <SelectItem
                              key={disease.diseaseId}
                              value={disease.diseaseId?.toString() || ""}
                              className="font-nunito-400"
                            >
                              <div className="flex flex-col">
                                <span>{disease.name}</span>
                                <span className="text-xs text-gray-500">
                                  {formatSpecies(disease.species)} - ID:{" "}
                                  {disease.diseaseId}
                                </span>
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="font-nunito-600"
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="font-nunito-600 bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Spinner />
                    Đang tạo...
                  </>
                ) : (
                  "Tạo mới"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
