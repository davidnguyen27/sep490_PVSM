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
import { PawPrint, ArrowLeft, Save, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function PetUpdatePage() {
  const [searchParams] = useSearchParams();
  const petId = searchParams.get("petId");
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data, isPending } = usePetDetail(petId ? Number(petId) : null);
  const { mutate: updatePet, isPending: isUpdating } = usePetUpdate();

  // Get role-based paths
  const paths = getPetRoutePaths(user?.role || 2);

  // Set document title for Pet Update page
  useEffect(() => {
    document.title = "PVMS | Cập nhật hồ sơ thú cưng";

    return () => {
      document.title = "PVMS | Hồ sơ thú cưng";
    };
  }, []);

  const form = useForm<PetSchema>({
    resolver: zodResolver(petSchema),
    defaultValues: {
      customerId: "",
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
        customerId: data.customerId?.toString() || "",
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
      customerId: Number(formData.customerId),
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
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          {/* Navigation Bar */}
          <div className="mb-6 flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(`${paths.base}?petId=${petId}`)}
              className="hover:text-primary font-nunito-500 text-muted-foreground flex items-center space-x-2 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Quay lại danh sách</span>
            </Button>

            <Badge
              variant="outline"
              className="border-primary font-nunito-500 text-primary bg-white"
            >
              <Info className="mr-1 h-3 w-3" />
              Chế độ chỉnh sửa
            </Badge>
          </div>

          {/* Page Title */}
          <div className="mb-6 text-center">
            <div className="mb-4 flex items-center justify-center">
              <div className="bg-primary/10 rounded-full p-3">
                <PawPrint className="text-primary h-8 w-8" />
              </div>
            </div>
            <h1 className="font-nunito-700 text-dark mb-2 text-3xl">
              Cập nhật hồ sơ thú cưng
            </h1>
            <p className="font-nunito-400 text-muted-foreground mx-auto max-w-2xl">
              {data?.name
                ? `Chỉnh sửa thông tin cho ${data.name} (${data.petCode})`
                : "Đang tải thông tin thú cưng..."}
            </p>
          </div>

          {/* Breadcrumb */}
          <div className="flex justify-center">
            <PageBreadcrumb
              items={[
                "Quản lý thú cưng",
                data?.name ? `${data.name}` : "Đang tải...",
                "Chỉnh sửa",
              ]}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="space-y-6">
          {/* Pet Info Header Card */}
          {data && (
            <Card className="rounded-none border-0 bg-white/80 shadow-sm backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  {data.image && (
                    <img
                      src={
                        typeof data.image === "string"
                          ? data.image
                          : URL.createObjectURL(data.image as File)
                      }
                      alt={data.name}
                      className="h-16 w-16 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  )}
                  <div>
                    <h2 className="font-nunito-600 text-dark text-xl">
                      {data.name}
                    </h2>
                    <div className="mt-1 flex items-center space-x-2">
                      <Badge variant="secondary" className="font-nunito-500">
                        {data.petCode}
                      </Badge>
                      <Badge variant="outline" className="font-nunito-400">
                        {data.species === "Dog"
                          ? "Chó"
                          : data.species === "Cat"
                            ? "Mèo"
                            : data.species}
                      </Badge>
                      <Badge variant="outline" className="font-nunito-400">
                        {data.breed}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Main Form Card */}
          <Card className="rounded-none border-0 bg-white shadow-lg">
            <CardHeader className="from-primary/5 to-primary/10 border-b-0 bg-gradient-to-r py-6">
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 rounded-lg p-2">
                    <PawPrint className="text-primary h-5 w-5" />
                  </div>
                  <span className="font-inter-600 text-dark text-xl">
                    Thông tin chi tiết
                  </span>
                </div>
                <Button
                  type="submit"
                  form="pet-update-form"
                  disabled={isUpdating}
                  className="bg-primary hover:bg-primary/90 font-nunito-600 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{isUpdating ? "Đang lưu..." : "Lưu thay đổi"}</span>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mx-auto max-w-4xl">
                <PetFormUpdate form={form} onSubmit={onSubmit} />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLoader>
  );
}
