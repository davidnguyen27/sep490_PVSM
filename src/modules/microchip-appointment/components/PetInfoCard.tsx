import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { icons } from "@/shared/constants/icons.constants";
import { Utils } from "@/shared/utils/utils.utils";
import type { MicrochipDetail } from "../types/detail.type";

interface Props {
  data: MicrochipDetail;
}

export function PetInfoCard({ data }: Props) {
  const [open, setOpen] = useState(true);
  const pet = data.microchip.appointment.petResponseDTO;

  return (
    <Card className="bg-linen rounded-none">
      <CardContent className="space-y-4 p-6">
        {/* Header */}
        <div
          className="flex cursor-pointer items-center justify-between border-b pb-3"
          onClick={() => setOpen(!open)}
        >
          <h2 className="font-nunito-700 text-primary flex items-center gap-2 text-lg underline">
            <icons.Tag size={16} /> Thông tin thú cưng
          </h2>
          {open ? (
            <icons.ChevronUp
              size={20}
              className="text-primary transition-transform"
            />
          ) : (
            <icons.ChevronDown
              size={20}
              className="text-primary transition-transform"
            />
          )}
        </div>

        {/* Content */}
        {open && (
          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={<icons.CircleUserRound size={16} />}
              label="Tên"
              value={pet?.name}
            />
            <InfoItem
              icon={
                pet?.species === "Dog" ? (
                  <icons.Dog size={16} />
                ) : (
                  <icons.Cat size={16} />
                )
              }
              label="Loài"
              value={pet?.species === "Dog" ? "Chó" : "Mèo"}
            />
            <InfoItem
              icon={<icons.PawPrint size={16} />}
              label="Giống"
              value={pet?.breed}
            />
            <InfoItem
              icon={<icons.Badge size={16} />}
              label="Màu lông"
              value={pet?.color}
            />
            <InfoItem
              icon={
                pet?.gender === "Male" ? (
                  <icons.Mars size={16} />
                ) : (
                  <icons.Venus size={16} />
                )
              }
              label="Giới tính"
              value={pet?.gender === "Male" ? "Đực" : "Cái"}
            />
            <InfoItem
              icon={<icons.Scissors size={16} />}
              label="Tình trạng triệt sản"
              value={pet?.isSterilized ? "Đã triệt sản" : "Chưa triệt sản"}
            />
            <InfoItem
              icon={<icons.Calendar size={16} />}
              label="Ngày sinh"
              value={pet?.dateOfBirth}
            />
            <InfoItem
              icon={<icons.Ruler size={16} />}
              label="Tuổi"
              value={Utils.calculateYearOld(pet?.dateOfBirth)}
            />
            <InfoItem
              icon={<icons.Weight size={16} />}
              label="Cân nặng"
              value={`${pet?.weight} kg`}
            />
            <InfoItem
              icon={<icons.Badge size={16} />}
              label="ID thú cưng"
              value={pet?.petCode}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface InfoItemProps {
  label: string;
  value: string | number | undefined;
  icon: React.ReactNode;
}

function InfoItem({ label, value, icon }: InfoItemProps) {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-[#E3E3E3] bg-[#FFFDFB] p-3">
      <div className="text-primary mt-1">{icon}</div>
      <div className="flex flex-col">
        <span className="text-dark font-nunito-600 text-xs">{label}</span>
        <span className="text-primary text-sm break-words">
          {value || "---"}
        </span>
      </div>
    </div>
  );
}
