import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { PetHealthCertificate } from "../components/PetHealthCertificate";
import { Button } from "@/components/ui";
import { ArrowLeft, Printer, Check } from "lucide-react";
import type { ConditionAppointments } from "../types/condition.type";

export default function PetHealthCertificatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isPrintSuccess, setIsPrintSuccess] = useState(false);

  // Lấy dữ liệu từ location.state (nên truyền từ trang trước)
  const data = (location.state as { data: ConditionAppointments })?.data;

  const handlePrint = useReactToPrint({
    contentRef: certificateRef,
    documentTitle: `GiayChungNhan_${data?.healthCondition?.conditionCode}`,
    onPrintError: () => {
      setIsPrinting(false);
    },
    onBeforePrint: () => {
      setIsPrinting(true);
      return Promise.resolve();
    },
    onAfterPrint: () => {
      setIsPrinting(false);
      setIsPrintSuccess(true);
      setTimeout(() => setIsPrintSuccess(false), 3000);
    },
  });

  if (!data) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-red-500">
          <h2 className="text-xl font-semibold">
            Không tìm thấy dữ liệu giấy chứng nhận sức khỏe
          </h2>
          <p className="mt-2">
            Vui lòng kiểm tra lại hoặc liên hệ với quản trị viên
          </p>
        </div>
        <Button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft size={16} className="mr-2" /> Quay lại
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header và nút in */}
      <div className="mb-6 bg-white px-6 py-4 shadow-sm print:hidden">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} className="mr-1" /> Quay lại
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              Giấy Chứng Nhận Sức Khỏe Thú Cưng
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {isPrintSuccess && (
              <div className="text-primary flex items-center gap-2">
                <Check size={16} />
                <span className="text-sm">In thành công!</span>
              </div>
            )}
            <Button
              onClick={handlePrint}
              disabled={isPrinting}
              className="bg-primary hover:bg-secondary flex items-center gap-2 text-white disabled:opacity-50"
            >
              <Printer size={16} />
              {isPrinting ? "Đang in..." : "In giấy chứng nhận"}
            </Button>
          </div>
        </div>
      </div>

      {/* Giấy chứng nhận */}
      <div className="mx-auto max-w-4xl px-6 pb-8">
        <div className="rounded-lg bg-white shadow-lg print:rounded-none print:shadow-none">
          <PetHealthCertificate ref={certificateRef} data={data} />
        </div>
      </div>

      {/* Hướng dẫn in - ẩn khi in */}
      <div className="mx-auto max-w-4xl px-6 pb-8 print:hidden">
        <div className="rounded-lg bg-blue-50 p-4">
          <h3 className="mb-2 font-medium text-blue-900">💡 Hướng dẫn in ấn</h3>
          <ul className="space-y-1 text-sm text-blue-700">
            <li>• Chọn kích thước giấy A4 khi in</li>
            <li>• Đảm bảo máy in đã được kết nối và có giấy</li>
            <li>• Nên in thử 1 trang trước khi in nhiều bản</li>
            <li>• Giấy chứng nhận sẽ được in với định dạng chuyên nghiệp</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
