interface SystemOverviewProps {
  totalAccounts: number;
  totalActiveAccounts: number;
  totalMicrochips: number;
  totalDiseases: number;
}

export default function SystemOverview({
  totalAccounts,
  totalActiveAccounts,
  totalMicrochips,
  totalDiseases,
}: SystemOverviewProps) {
  return (
    <div className="border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="border-b border-gray-200 p-6">
        <h2 className="font-inter-600 text-lg text-gray-900">
          Tổng quan hệ thống
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="border border-gray-100 bg-gray-50 p-4 text-center">
            <div className="font-nunito-700 text-2xl text-gray-900">
              {totalAccounts}
            </div>
            <div className="font-nunito-400 text-sm text-gray-600">
              Tài khoản
            </div>
          </div>
          <div className="border border-gray-100 bg-gray-50 p-4 text-center">
            <div className="font-nunito-700 text-2xl text-gray-900">
              {totalActiveAccounts}
            </div>
            <div className="font-nunito-400 text-sm text-gray-600">
              Đang hoạt động
            </div>
          </div>
          <div className="border border-gray-100 bg-gray-50 p-4 text-center">
            <div className="font-nunito-700 text-2xl text-gray-900">
              {totalMicrochips}
            </div>
            <div className="font-nunito-400 text-sm text-gray-600">
              Microchips
            </div>
          </div>
          <div className="border border-gray-100 bg-gray-50 p-4 text-center">
            <div className="font-nunito-700 text-2xl text-gray-900">
              {totalDiseases}
            </div>
            <div className="font-nunito-400 text-sm text-gray-600">Bệnh lý</div>
          </div>
        </div>
      </div>
    </div>
  );
}
