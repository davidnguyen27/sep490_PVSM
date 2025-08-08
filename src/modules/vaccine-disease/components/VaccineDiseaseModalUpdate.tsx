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
import type { VaccineDisease } from "../types/vaccine-disease.type";
import { formatSpecies } from "../utils";
import { VACCINE_DISEASE_MESSAGES } from "../constants";

interface VaccineDiseaseModalUpdateProps {
  open: boolean;
  onClose: () => void;
  submit: (data: VaccineDiseasePayload) => void;
  isSubmitting: boolean;
  defaultValues: VaccineDisease | null;
}

export function VaccineDiseaseModalUpdate({
  open,
  onClose,
  submit,
  isSubmitting,
  defaultValues,
}: VaccineDiseaseModalUpdateProps) {
  const form = useForm<VaccineDiseaseFormData>({
    resolver: zodResolver(vaccineDiseaseSchema),
    defaultValues: {
      vaccineId: 0,
      diseaseId: 0,
    },
  });

  const { data: vaccines, isLoading: isLoadingVaccines } =
    useVaccinesForSelect();
  const { data: diseases, isLoading: isLoadingDiseases } =
    useDiseasesForSelect();

  // Reset form when modal opens/closes or defaultValues change
  useEffect(() => {
    if (open && defaultValues) {
      form.reset({
        vaccineId: defaultValues.vaccineId || 0,
        diseaseId: defaultValues.diseaseId || 0,
      });
    } else if (!open) {
      form.reset({
        vaccineId: 0,
        diseaseId: 0,
      });
    }
  }, [open, defaultValues, form]);

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = (data: VaccineDiseaseFormData) => {
    const payload: VaccineDiseasePayload = {
      vaccineId: data.vaccineId,
      diseaseId: data.diseaseId,
    };
    submit(payload);
  };

  const selectedVaccineId = form.watch("vaccineId");
  const selectedVaccine = vaccines?.find(
    (vaccine) => vaccine.vaccineId === selectedVaccineId,
  );

  const selectedDiseaseId = form.watch("diseaseId");
  const selectedDisease = diseases?.find(
    (disease) => disease.diseaseId === selectedDiseaseId,
  );

  const isLoading = isLoadingVaccines || isLoadingDiseases;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="font-nunito-700 text-xl text-gray-900">
            Cập nhật quan hệ Vaccine - Bệnh
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Vaccine Selection */}
                <FormField
                  control={form.control}
                  name="vaccineId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-nunito-600 text-gray-700">
                        Vaccine <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value.toString()}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger className="font-nunito">
                            <SelectValue placeholder="Chọn vaccine" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {vaccines?.map((vaccine) => (
                            <SelectItem
                              key={vaccine.vaccineId}
                              value={vaccine.vaccineId!.toString()}
                            >
                              <div className="flex flex-col">
                                <span className="font-nunito-600">
                                  {vaccine.name}
                                </span>
                                <span className="font-nunito text-xs text-gray-500">
                                  {vaccine.vaccineCode}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Disease Selection */}
                <FormField
                  control={form.control}
                  name="diseaseId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-nunito-600 text-gray-700">
                        Bệnh <span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => field.onChange(Number(value))}
                        value={field.value.toString()}
                        disabled={isSubmitting}
                      >
                        <FormControl>
                          <SelectTrigger className="font-nunito">
                            <SelectValue placeholder="Chọn bệnh" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {diseases?.map((disease) => (
                            <SelectItem
                              key={disease.diseaseId}
                              value={disease.diseaseId!.toString()}
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-nunito-600">
                                  {disease.name}
                                </span>
                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                  {formatSpecies(disease.species)}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Preview Selected Items */}
              {(selectedVaccine || selectedDisease) && (
                <div className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-nunito-600 mb-3 text-sm text-gray-700">
                    Thông tin đã chọn:
                  </h4>
                  <div className="grid gap-3 md:grid-cols-2">
                    {selectedVaccine && (
                      <div className="rounded-lg border bg-white p-3">
                        <p className="font-nunito-600 text-sm text-gray-900">
                          Vaccine: {selectedVaccine.name}
                        </p>
                        <p className="font-nunito text-xs text-gray-500">
                          Mã: {selectedVaccine.vaccineCode}
                        </p>
                        {selectedVaccine.description && (
                          <p className="font-nunito mt-1 text-xs text-gray-600">
                            {selectedVaccine.description}
                          </p>
                        )}
                      </div>
                    )}
                    {selectedDisease && (
                      <div className="rounded-lg border bg-white p-3">
                        <p className="font-nunito-600 text-sm text-gray-900">
                          Bệnh: {selectedDisease.name}
                        </p>
                        <p className="font-nunito text-xs text-gray-500">
                          Loài: {formatSpecies(selectedDisease.species)}
                        </p>
                        {selectedDisease.symptoms && (
                          <p className="font-nunito mt-1 text-xs text-gray-600">
                            {selectedDisease.symptoms.length > 50
                              ? `${selectedDisease.symptoms.substring(0, 50)}...`
                              : selectedDisease.symptoms}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="font-nunito"
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="font-nunito-600"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="mr-2 h-4 w-4" />
                      {VACCINE_DISEASE_MESSAGES.UPDATING}
                    </>
                  ) : (
                    VACCINE_DISEASE_MESSAGES.UPDATE
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
