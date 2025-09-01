import { forwardRef } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
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
      <div ref={ref} className="mx-auto bg-white p-8">
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media print {
              @page {
                size: A4;
                margin: 1cm;
              }
              body {
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
              }
              .print\\:hidden {
                display: none !important;
              }
            }
          `,
          }}
        />

        {/* Certificate Content */}
        <div
          className="mx-auto max-w-4xl border-4 border-blue-600 bg-white p-8 shadow-lg print:shadow-none"
          style={{ fontFamily: "'Times New Roman', serif" }}
        >
          {/* Header */}
          <div className="mb-8 border-4 border-blue-200 p-4 text-center">
            <h1 className="mb-2 text-xl font-bold text-blue-700">
              HỆ THỐNG BỆNH VIỆN THÚ Y PET HEALTH CENTRE
            </h1>
            <h2 className="mb-1 text-lg font-bold text-blue-700">
              PET HEALTH CENTRE HOSPITALS
            </h2>
            <div className="my-2 flex justify-center">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400">
                    ⭐
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-blue-700">
              GIẤY CHỨNG NHẬN SỨC KHỎE THÚ CƯNG
            </h3>
            <h4 className="text-lg font-bold text-blue-700">
              CERTIFICATE OF VETERINARY INSPECTION
            </h4>
          </div>

          {/* Main Content - Two Columns */}
          <div className="mb-6 grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left Column - Owner Information */}
            <div>
              <h4 className="mb-4 font-bold text-blue-700">
                Owner or Guardian of the pet animal
              </h4>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Name:</strong> {customer?.fullName || ""}
                </p>
                <p>
                  <strong>Address:</strong> {customer?.address || ""}
                </p>
                <p>
                  <strong>Phone number/ facsimile:</strong>{" "}
                  {customer?.phoneNumber || ""}
                </p>
              </div>
            </div>

            {/* Right Column - Pet Information */}
            <div>
              <h4 className="mb-4 font-bold text-blue-700">
                Pet animal information
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <p>
                    <strong>Species:</strong> {pet?.species || ""}
                  </p>
                  <p>
                    <strong>Sex:</strong> {pet?.gender || ""}
                  </p>
                  <p>
                    <strong>Date of birth:</strong>{" "}
                    {formatDate(pet?.dateOfBirth || "")}
                  </p>
                </div>
                <div className="space-y-2">
                  <p>
                    <strong>Breed:</strong> {pet?.breed || ""}
                  </p>
                  <p>
                    <strong>Color:</strong> {pet?.color || ""}
                  </p>
                  <p>
                    <strong>Microchip ID:</strong>{" "}
                    {microchip?.microchipCode || ""}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certification Statement */}
          <div className="mb-8 text-center">
            <h4 className="mb-4 font-bold text-blue-700">
              By my signature below I certify that:
            </h4>
            <div className="space-y-2 text-left text-sm">
              <p>• The animal is healthy enough to travel.</p>
              <p>• The animal is free of Fleas - Ticks - Parasites</p>
              <p>
                • The animal shows no evidence of diseases communicable to
                humans
              </p>
              {vaccine && (
                <p>
                  • The animal has been vaccinated with{" "}
                  <strong>{vaccine.vaccineResponseDTO?.name}</strong> on{" "}
                  <strong>{formatDate(data.appointmentDate)}</strong>
                </p>
              )}
              {microchip && (
                <p>
                  • The animal has been microchipped with ID:{" "}
                  <strong>{microchip.microchipCode}</strong>
                </p>
              )}
            </div>
          </div>

          {/* Signature Section */}
          <div className="flex justify-between">
            <div className="text-center">
              <h4 className="mb-4 font-bold text-blue-700">
                Licensed Veterinarian Signature
              </h4>
              <p className="mb-2 text-sm">
                <strong>Date:</strong>{" "}
                {formatDate(healthCondition?.checkDate || "")}
              </p>
              <p className="text-sm">
                <strong>Place:</strong> VaxPet Health Centre
              </p>
              <div
                className="mt-8 border-b border-gray-400"
                style={{ width: "200px" }}
              ></div>
              <p className="mt-2 text-sm font-bold">
                {vet?.name || "Dr. Veterinarian"}
              </p>
            </div>
          </div>

          {/* Footer with Watermark */}
          <div className="mt-8 text-center">
            <div className="text-6xl font-bold text-yellow-200 opacity-30">
              PET HEALTH CENTRE
            </div>
            <p className="text-sm text-yellow-600 italic">
              Tận tâm - chất lượng - uy tín
            </p>
          </div>
        </div>
      </div>
    );
  },
);

PetHealthCertificate.displayName = "PetHealthCertificate";
