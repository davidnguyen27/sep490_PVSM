import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { petSchema, type PetSchema } from "../schemas/pet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PetFormUpdate } from "../components/PetFormUpdate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePetDetail, usePetUpdate } from "../hooks";
import { useEffect } from "react";
import { PageLoader } from "@/components/shared";

export default function PetUpdatePage() {
  const [searchParams] = useSearchParams();
  const petId = searchParams.get("petId");
  const navigate = useNavigate();

  const { data, isPending } = usePetDetail(petId ? Number(petId) : null);
  const { mutate: updatePet, isPending: isUpdating } = usePetUpdate();

  const form = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      name: "",
      species: "",
      breed: "",
      gender: "",
      dateOfBirth: "",
      placeOfBirth: "",
      placeToLive: "",
      weight: "",
      color: "",
      nationality: "",
      isSterilized: false,
      image: undefined,
    },
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        species: data.species,
        breed: data.breed,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        placeOfBirth: data.placeOfBirth,
        placeToLive: data.placeToLive,
        weight: data.weight,
        color: data.color,
        nationality: data.nationality,
        isSterilized: data.isSterilized,
        image: data.image ?? undefined,
      });
    }
  }, [data, form]);

  const onSubmit = (formData: PetSchema) => {
    if (!petId) return;

    const payload = {
      name: formData.name,
      species: formData.species,
      breed: formData.breed,
      gender: formData.gender,
      dateOfBirth: formData.dateOfBirth,
      placeOfBirth: formData.placeOfBirth,
      placeToLive: formData.placeToLive,
      weight: formData.weight,
      color: formData.color,
      nationality: formData.nationality,
      isSterilized: formData.isSterilized,
      image: formData.image,
      petId: Number(petId),
    };

    updatePet(
      { payload, petId: Number(petId) },
      {
        onSuccess: () => {
          navigate("/staff/pets");
        },
      },
    );
  };

  return (
    <PageLoader loading={isPending || isUpdating}>
      <div className="space-y-6 p-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Cập nhật hồ sơ thú cưng</CardTitle>
          </CardHeader>
          <CardContent>
            <PetFormUpdate form={form} onSubmit={onSubmit} />
          </CardContent>
        </Card>
      </div>
    </PageLoader>
  );
}
