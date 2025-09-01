import { forwardRef } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import {
  Star,
  MapPin,
  Phone,
  Calendar,
  Shield,
  CheckCircle2,
  Heart,
  Stethoscope,
  Award,
  User,
  PawPrint,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ConditionAppointments } from "../types/condition.type";

interface Props {
  data: ConditionAppointments;
}

export const PetHealthCertificate = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const pet = data.appointment?.petResponseDTO;
    const customer = data.appointment?.customerResponseDTO;
    const healthCondition = data.healthCondition;
    const vaccine = data.vaccineBatch;
    const microchip = data.microchip;
    const vet = data.vet;

    const formatDate = (dateString: string) => {
      try {
        return format(new Date(dateString), "dd/MM/yyyy", { locale: vi });
      } catch {
        return dateString;
      }
    };

    return (
      <div ref={ref} className="mx-auto bg-white p-8 print:m-0 print:p-4">
        {/* Certificate Content */}
        <div className="font-nunito-400 print:font-nunito-400 relative mx-auto max-w-4xl border bg-white p-6 print:max-w-4xl print:border print:p-4 print:shadow-none">
          {/* Watermark Background - Hidden in print */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5 print:pointer-events-none print:absolute print:inset-0 print:flex print:items-center print:justify-center print:opacity-5">
            <div className="font-nunito-700 text-primary print:font-nunito-700 print:text-primary rotate-12 transform text-8xl print:rotate-12 print:transform print:text-8xl">
              VaxPet
            </div>
          </div>

          {/* Header */}
          <Card className="border-primary/20 print:border-primary/20 mb-6 print:mb-6">
            <CardHeader className="from-primary/5 to-secondary/5 space-y-4 bg-gradient-to-r py-6 text-center print:space-y-4 print:py-6 print:text-center">
              <div className="flex items-center justify-center gap-3 print:gap-3">
                <div className="bg-primary/10 rounded-full p-3 print:rounded-full print:p-3">
                  <Heart className="text-primary h-8 w-8 print:h-8 print:w-8" />
                </div>
                <div>
                  <h1 className="font-inter-700 text-primary print:font-inter-700 text-2xl print:text-lg">
                    TRUNG TÂM TIÊM CHỦNG THÚ CƯNG VAXPET
                  </h1>
                  <h2 className="font-inter-600 text-secondary text-lg print:text-sm">
                    VAXPET PET HEALTH CENTRE
                  </h2>
                </div>
              </div>

              <div className="flex justify-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-warning h-5 w-5 fill-current print:h-4 print:w-4"
                  />
                ))}
              </div>

              <Separator className="mx-auto w-1/2" />

              <div className="space-y-2 print:space-y-1">
                <h3 className="font-nunito-700 text-primary text-3xl print:text-xl">
                  GIẤY CHỨNG NHẬN SỨC KHỎE THÚ CƯNG
                </h3>
                <h4 className="font-inter-600 text-secondary text-xl print:text-base">
                  CERTIFICATE OF VETERINARY INSPECTION
                </h4>
                <Badge variant="secondary" className="text-sm print:text-xs">
                  <Award className="mr-1 h-5 w-5 print:h-3 print:w-3" />
                  Chứng nhận chính thức
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content - Two Columns */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2 print:mb-3 print:grid-cols-2 print:gap-4">
            {/* Left Column - Owner Information */}
            <Card className="border-primary/20 py-4 print:border-gray-300 print:py-3">
              <CardHeader className="print:py-2">
                <h4 className="font-nunito-600 text-primary flex items-center gap-2 text-lg print:text-base">
                  <User className="h-5 w-5 print:h-4 print:w-4" />
                  Owner or Guardian of the pet animal
                </h4>
              </CardHeader>
              <CardContent className="space-y-3 print:space-y-2">
                <div className="flex items-center gap-2 text-sm print:text-xs">
                  <User className="text-primary h-4 w-4 print:h-3 print:w-3" />
                  <span className="font-nunito-600">Name:</span>
                  <span className="font-nunito-500">
                    {customer?.fullName || ""}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-sm print:text-xs">
                  <MapPin className="text-primary mt-0.5 h-4 w-4 print:h-3 print:w-3" />
                  <span className="font-nunito-600">Address:</span>
                  <span className="font-nunito-500">
                    {customer?.address || ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm print:text-xs">
                  <Phone className="text-primary h-4 w-4 print:h-3 print:w-3" />
                  <span className="font-nunito-600">Phone number:</span>
                  <span className="font-nunito-500">
                    {customer?.phoneNumber || ""}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Right Column - Pet Information */}
            <Card className="border-primary/20 py-4 print:border-gray-300 print:py-3">
              <CardHeader className="print:py-2">
                <h4 className="font-nunito-600 text-primary flex items-center gap-2 text-lg print:text-base">
                  <PawPrint className="h-5 w-5 print:h-4 print:w-4" />
                  Pet animal information
                </h4>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-sm print:gap-3 print:text-xs">
                  <div className="space-y-3 print:space-y-2">
                    <div>
                      <span className="font-nunito-600 text-primary">
                        Species:
                      </span>
                      <p className="font-nunito-500">{pet?.species || ""}</p>
                    </div>
                    <div>
                      <span className="font-nunito-600 text-primary">Sex:</span>
                      <p className="font-nunito-500">{pet?.gender || ""}</p>
                    </div>
                    <div>
                      <span className="font-nunito-600 text-primary">
                        Date of birth:
                      </span>
                      <p className="font-nunito-500">
                        {formatDate(pet?.dateOfBirth || "")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3 print:space-y-2">
                    <div>
                      <span className="font-nunito-600 text-primary">
                        Breed:
                      </span>
                      <p className="font-nunito-500">{pet?.breed || ""}</p>
                    </div>
                    <div>
                      <span className="font-nunito-600 text-primary">
                        Color:
                      </span>
                      <p className="font-nunito-500">{pet?.color || ""}</p>
                    </div>
                    <div>
                      <span className="font-nunito-600 text-primary">
                        Microchip ID:
                      </span>
                      <p className="bg-primary/10 print:bg-primary/5 rounded px-2 py-1 font-mono text-sm print:px-1 print:py-0.5 print:text-xs">
                        {microchip?.microchipCode || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Certification Statement */}
          <Card className="border-primary/20 mb-6 py-4 print:mb-3 print:border-gray-300 print:py-3">
            <CardHeader className="print:py-2">
              <h4 className="font-nunito-600 text-primary flex items-center justify-center gap-2 text-center text-lg print:text-base">
                <Shield className="h-5 w-5 print:h-4 print:w-4" />
                By my signature below I certify that:
              </h4>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm print:space-y-2 print:text-xs">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />
                  <span className="font-nunito-500">
                    The animal is healthy enough to travel.
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />
                  <span className="font-nunito-500">
                    The animal is free of Fleas - Ticks - Parasites
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />
                  <span className="font-nunito-500">
                    The animal shows no evidence of diseases communicable to
                    humans
                  </span>
                </div>
                {vaccine && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />
                    <span className="font-nunito-500">
                      The animal has been vaccinated with{" "}
                      <Badge variant="outline" className="mx-1 print:text-xs">
                        {vaccine.vaccineResponseDTO?.name}
                      </Badge>{" "}
                      on{" "}
                      <span className="font-nunito-600">
                        {formatDate(data.appointmentDate)}
                      </span>
                    </span>
                  </div>
                )}
                {microchip && (
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="text-primary mt-0.5 h-4 w-4 flex-shrink-0 print:h-3 print:w-3" />
                    <span className="font-nunito-500">
                      The animal has been microchipped with ID:{" "}
                      <Badge
                        variant="outline"
                        className="mx-1 font-mono print:text-xs"
                      >
                        {microchip.microchipCode}
                      </Badge>
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Signature Section */}
          <Card className="border-primary/20 mb-6 print:mb-3 print:border-gray-300">
            <CardContent className="py-4 print:py-3">
              <div className="flex items-start justify-between print:gap-4">
                <div className="space-y-4 text-center print:space-y-2">
                  <h4 className="font-nunito-600 text-primary flex items-center gap-2 text-lg print:text-base">
                    <Stethoscope className="h-5 w-5 print:h-4 print:w-4" />
                    Licensed Veterinarian Signature
                  </h4>
                  <div className="space-y-2 text-sm print:space-y-1 print:text-xs">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-primary h-4 w-4 print:h-3 print:w-3" />
                      <span className="font-nunito-600">Date:</span>
                      <span className="font-nunito-500">
                        {formatDate(healthCondition?.checkDate || "")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-primary h-4 w-4 print:h-3 print:w-3" />
                      <span className="font-nunito-600">Place:</span>
                      <span className="font-nunito-500">
                        VaxPet Health Centre
                      </span>
                    </div>
                  </div>
                  <div className="flex h-16 w-48 items-end border-b-2 border-gray-400 print:h-12 print:w-32">
                    <span className="mb-1 text-xs text-gray-500">
                      Signature
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="font-nunito-600 print:text-xs"
                  >
                    {vet?.name || "Dr. Veterinarian"}
                  </Badge>
                </div>

                <div className="text-center">
                  <div className="border-primary/30 bg-primary/5 print:border-primary/30 print:bg-primary/5 flex h-24 w-24 items-center justify-center rounded-lg border-2 print:flex print:h-24 print:w-24 print:items-center print:justify-center print:rounded-lg print:border-2">
                    <div className="text-center">
                      <Award className="text-primary mx-auto mb-1 h-8 w-8 print:h-5 print:w-5" />
                      <span className="font-nunito-600 text-primary text-xs print:text-xs">
                        Official Seal
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="space-y-4 text-center print:space-y-2">
            <Separator />
            <div className="text-primary flex items-center justify-center gap-2">
              <Heart className="h-5 w-5 print:h-4 print:w-4" />
              <span className="font-nunito-700 text-lg print:text-base">
                VaxPet Health Centre
              </span>
              <Heart className="h-5 w-5 print:h-4 print:w-4" />
            </div>
            <p className="font-nunito-500 text-secondary text-sm italic print:text-xs">
              Tận tâm - Chất lượng - Uy tín
            </p>
            <div className="font-nunito-400 text-xs text-gray-500 print:text-xs">
              Certificate ID: {healthCondition?.conditionCode || "N/A"} |
              Issued: {formatDate(healthCondition?.checkDate || "")}
            </div>
          </div>
        </div>
      </div>
    );
  },
);

PetHealthCertificate.displayName = "PetHealthCertificate";
