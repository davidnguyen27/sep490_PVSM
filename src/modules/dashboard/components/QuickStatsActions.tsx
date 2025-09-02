//import { icons } from "@/shared/constants/icons.constants";
import type { AppointmentStats } from "../hooks/useAppointmentStats";

interface QuickStatsActionsProps {
  appointmentStats: AppointmentStats;
  processingAppointments: number;
  confirmedAppointments: number;
  checkedInAppointments: number;
  processedAppointments: number;
  paidAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

export default function QuickStatsActions({
  appointmentStats,
  processingAppointments,
  confirmedAppointments,
  checkedInAppointments,
  processedAppointments,
  paidAppointments,
  completedAppointments,
  cancelledAppointments,
}: QuickStatsActionsProps) {
  return (
    <div className="border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="border-b border-gray-200 p-6">
        <h2 className="font-inter-600 text-lg text-gray-900">Thống kê nhanh</h2>
      </div>
      <div className="p-6">
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-nunito-400 text-sm text-gray-600">
              Tổng lịch hẹn
            </span>
            <span className="font-nunito-600 text-lg text-gray-900">
              {appointmentStats.total}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-nunito-400 text-sm text-gray-600">
              Chờ xác nhận
            </span>
            <span className="font-nunito-600 text-lg text-orange-500">
              {processingAppointments}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-nunito-400 text-sm text-gray-600">
              Đã xác nhận
            </span>
            <span className="font-nunito-600 text-lg text-blue-500">
              {confirmedAppointments}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-nunito-400 text-sm text-gray-600">
              Đã check in
            </span>
            <span className="font-nunito-600 text-lg text-purple-500">
              {checkedInAppointments}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-nunito-400 text-sm text-gray-600">
              Đã xử lý
            </span>
            <span className="font-nunito-600 text-lg text-cyan-500">
              {processedAppointments}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-nunito-400 text-sm text-gray-600">
              Đã thanh toán
            </span>
            <span className="font-nunito-600 text-lg text-emerald-500">
              {paidAppointments}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-nunito-400 text-sm text-gray-600">
              Đã hoàn thành
            </span>
            <span className="font-nunito-600 text-lg text-green-500">
              {completedAppointments}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-nunito-400 text-sm text-gray-600">
              Đã hủy
            </span>
            <span className="font-nunito-600 text-lg text-red-500">
              {cancelledAppointments}
            </span>
          </div>
        </div>

        {/* <div className="space-y-3 border-t border-gray-200 pt-4">
          <h3 className="font-inter-600 mb-3 text-sm text-gray-900">
            Thao tác nhanh
          </h3>
          <button className="font-nunito-500 flex w-full items-center justify-center space-x-2 border border-gray-200 bg-green-600 px-4 py-3 text-white transition-colors hover:bg-green-700">
            <icons.PawPrint className="h-5 w-5" />
            <span>Đăng ký thú cưng</span>
          </button>
          <button className="font-nunito-500 flex w-full items-center justify-center space-x-2 border border-gray-200 bg-purple-600 px-4 py-3 text-white transition-colors hover:bg-purple-700">
            <icons.Syringe className="h-5 w-5" />
            <span>Nhập vaccine</span>
          </button>
        </div> */}
      </div>
    </div>
  );
}
