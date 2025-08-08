import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { petSchema, type PetSchema } from "../schemas/pet.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PetFormUpdate } from "../components/PetFormUpdate";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePetDetail, usePetUpdate } from "../hooks";
import { useEffect } from "react";
import { PageLoader, PageBreadcrumb } from "@/components/shared";
import { useAuth } from "@/modules/auth";
import { getPetRoutePaths } from "../utils/pet-route.utils";
import { PawPrint, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PetUpdatePage() {
  const [searchParams] = useSearchParams();
  const petId = searchParams.get("petId");
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, isPending } = usePetDetail(petId ? Number(petId) : null);
  const { mutate: updatePet, isPending: isUpdating } = usePetUpdate();

  // Get role-based paths
  const paths = getPetRoutePaths(user?.role || 2); // Default to staff role

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
          navigate(`${paths.base}?petId=${petId}`);
        },
      },
    );
  };

  return (
    <PageLoader loading={isPending || isUpdating}>
      <div className="space-y-6 p-6">
        {/* Header Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <PawPrint className="text-primary h-6 w-6" />
                <h1 className="text-primary font-inter-700 text-2xl">
                  Cập nhật hồ sơ thú cưng
                </h1>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate(`${paths.base}?petId=${petId}`)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại</span>
            </Button>
          </div>

          <PageBreadcrumb
            items={[
              "Thú cưng",
              data?.name ? `${data.name} (${data.petCode})` : "Đang tải...",
            ]}
          />
        </div>

        {/* Form Section */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="from-primary/5 to-primary/10 border-b bg-gradient-to-r">
            <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-gray-800">
              <PawPrint className="text-primary h-5 w-5" />
              <span>Thông tin thú cưng</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <PetFormUpdate form={form} onSubmit={onSubmit} />
          </CardContent>
        </Card>
      </div>
    </PageLoader>
  );
}
