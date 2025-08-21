import { forwardRef } from "react";
import type { ConditionAppointments } from "../types/condition.type";
import { formatData } from "@/shared/utils/format.utils";

interface Props {
  data: ConditionAppointments;
}

export const PetHealthCertificate = forwardRef<HTMLDivElement, Props>(
  ({ data }, ref) => {
    const pet = data.appointment.petResponseDTO;
    const customer = data.appointment.customerResponseDTO;
    const vet = data.vet;
    const health = data.healthCondition;

    return (
      <div
        ref={ref}
        className="certificate-container mx-auto max-w-2xl rounded border bg-white p-8 text-black shadow-lg"
      >
        <h2 className="mb-4 text-center text-2xl font-bold">
          GIẤY CHỨNG NHẬN SỨC KHỎE THÚ CƯNG
        </h2>
        <div className="mb-4">
          <strong>Thông tin thú cưng:</strong>
          <ul className="ml-4">
            <li>
              <b>Tên:</b> {pet.name}
            </li>
            <li>
              <b>Loài:</b> {pet.species}
            </li>
            <li>
              <b>Giống:</b> {pet.breed}
            </li>
            <li>
              <b>Giới tính:</b> {pet.gender}
            </li>
            <li>
              <b>Ngày sinh:</b> {pet.dateOfBirth}
            </li>
            <li>
              <b>Màu sắc:</b> {pet.color}
            </li>
            <li>
              <b>Cân nặng:</b> {pet.weight} kg
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Chủ nuôi:</strong> {customer.fullName} <br />
          <b>Địa chỉ:</b> {customer.address}
        </div>
        <div className="mb-4">
          <strong>Thông tin khám sức khỏe:</strong>
          <ul className="ml-4">
            <li>
              <b>Ngày khám:</b> {formatData.formatDateTime(health.checkDate)}
            </li>
            <li>
              <b>Bác sĩ:</b> {vet?.name}
            </li>
            <li>
              <b>Mã điều kiện:</b> {health.conditionCode}
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Chỉ số sinh tồn:</strong>
          <ul className="ml-4">
            <li>
              <b>Nhịp tim:</b> {health.heartRate} bpm
            </li>
            <li>
              <b>Nhịp thở:</b> {health.breathingRate} lần/phút
            </li>
            <li>
              <b>Nhiệt độ:</b> {health.temperature} °C
            </li>
            <li>
              <b>Cân nặng:</b> {health.weight} kg
            </li>
          </ul>
        </div>
        <div className="mb-4">
          <strong>Kết luận:</strong>
          <div className="ml-4 whitespace-pre-line">{health.conclusion}</div>
        </div>
        <div className="mt-8 flex justify-between">
          <div>
            <b>Ngày lập:</b> {formatData.formatDate(health.checkDate)}
          </div>
          <div className="text-right">
            <b>Bác sĩ thú y</b>
            <div className="mt-8 font-semibold">{vet?.name}</div>
          </div>
        </div>
      </div>
    );
  },
);

PetHealthCertificate.displayName = "PetHealthCertificate";
