interface StaffSystemOverviewProps {
    totalCustomers: number;
    totalPets: number;
    totalVouchers: number;
    totalPayments: number;
}

export default function StaffSystemOverview({
    totalCustomers,
    totalPets,
    totalVouchers,
    totalPayments,
}: StaffSystemOverviewProps) {
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
                            {totalCustomers}
                        </div>
                        <div className="font-nunito-400 text-sm text-gray-600">
                            Khách hàng
                        </div>
                    </div>
                    <div className="border border-gray-100 bg-gray-50 p-4 text-center">
                        <div className="font-nunito-700 text-2xl text-gray-900">
                            {totalPets}
                        </div>
                        <div className="font-nunito-400 text-sm text-gray-600">
                            Thú cưng
                        </div>
                    </div>
                    <div className="border border-gray-100 bg-gray-50 p-4 text-center">
                        <div className="font-nunito-700 text-2xl text-gray-900">
                            {totalVouchers}
                        </div>
                        <div className="font-nunito-400 text-sm text-gray-600">
                            Mã giảm giá
                        </div>
                    </div>
                    <div className="border border-gray-100 bg-gray-50 p-4 text-center">
                        <div className="font-nunito-700 text-2xl text-gray-900">
                            {totalPayments}
                        </div>
                        <div className="font-nunito-400 text-sm text-gray-600">Hóa đơn</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
