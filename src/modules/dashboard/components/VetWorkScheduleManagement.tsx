interface VetWorkScheduleManagement {
    totalSchedules: number;
    totalAvailableVetSchedules: number;
    totalScheduledVetSchedules: number;
    totalUnavailableVetSchedules: number;
}

export default function VetWorkScheduleManagement({
    totalSchedules,
    totalAvailableVetSchedules,
    totalScheduledVetSchedules,
    totalUnavailableVetSchedules,
}: VetWorkScheduleManagement) {
    return (
        <div className="border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
            <div className="border-b border-gray-200 p-6">
                <h2 className="font-inter-600 text-lg text-gray-900">
                    Quản lý lịch làm việc của bác sĩ thú y
                </h2>
            </div>
            <div className="p-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 py-2">
                        <span className="font-nunito-400 text-sm text-gray-600">
                            Tổng lịch làm việc
                        </span>
                        <span className="font-nunito-600 text-lg text-gray-900">
                            {totalSchedules}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 py-2">
                        <span className="font-nunito-400 text-sm text-gray-600">
                            Tổng lịch trống
                        </span>
                        <span className="font-nunito-600 text-lg text-gray-900">
                            {totalAvailableVetSchedules}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 py-2">
                        <span className="font-nunito-400 text-sm text-gray-600">
                            Tổng lịch đã đặt
                        </span>
                        <span className="font-nunito-600 text-lg text-gray-900">
                            {totalScheduledVetSchedules}
                        </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-gray-100 py-2">
                        <span className="font-nunito-400 text-sm text-gray-600">
                            Tổng lịch trễ
                        </span>
                        <span className="font-nunito-600 text-lg text-gray-900">
                            {totalUnavailableVetSchedules}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
