import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { InvoicePreview } from "../components/InvoicePreview";
import { ArrowLeft, Printer, Check, Download } from "lucide-react";

export default function InvoicePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.invoiceData;
  const printRef = useRef<HTMLDivElement>(null);
  const [isPrinting, setIsPrinting] = useState(false);
  const [isPrintSuccess, setIsPrintSuccess] = useState(false);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `HoaDon_${data?.payment?.paymentCode}`,
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

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDownloadPDF = () => {
    // In this version we're using print functionality
    // In a production app, this could be replaced with actual PDF generation
    handlePrint();
  };

  if (!data)
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center">
        <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-red-500">
          <h2 className="text-xl font-semibold">
            Không tìm thấy dữ liệu hóa đơn
          </h2>
          <p className="mt-2">
            Vui lòng kiểm tra lại hoặc liên hệ với quản trị viên
          </p>
        </div>
        <Button
          onClick={handleGoBack}
          className="mt-4 bg-gray-200 text-gray-800 hover:bg-gray-300"
        >
          <ArrowLeft size={16} className="mr-2" /> Quay lại
        </Button>
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Button
          variant="ghost"
          onClick={handleGoBack}
          className="text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={16} className="mr-2" /> Quay lại
        </Button>
        <h1 className="text-primary text-xl font-semibold">
          Hóa đơn #{data?.payment?.paymentCode}
        </h1>
      </div>

      {/* Invoice Preview Container - A4 optimized */}
      <div
        className="overflow-hidden rounded-lg bg-white shadow-lg print:bg-transparent print:p-0 print:shadow-none"
        ref={printRef}
      >
        <style
          dangerouslySetInnerHTML={{
            __html: `
            @media print {
              @page {
                size: A4;
                margin: 0;
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
        <InvoicePreview data={data} />
      </div>

      {/* Actions Bar */}
      <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4 print:hidden">
        <div className="flex flex-wrap items-center justify-between">
          <div>
            <h2 className="font-medium">Thao tác với hóa đơn</h2>
            <p className="text-sm text-gray-500">
              Chọn hành động bạn muốn thực hiện với hóa đơn này
            </p>
          </div>

          <div className="mt-3 flex gap-3 sm:mt-0">
            <Button
              variant="outline"
              className="flex items-center gap-2 border-gray-300"
              onClick={handleGoBack}
            >
              <ArrowLeft size={16} /> Quay lại
            </Button>

            <Button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700"
            >
              <Download size={16} /> Tải PDF
            </Button>

            <Button
              onClick={handlePrint}
              className={`flex items-center gap-2 ${
                isPrintSuccess
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-primary hover:bg-primary/90"
              } text-white`}
              disabled={isPrinting}
            >
              {isPrinting ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-t-2 border-white"></span>
                  Đang xử lý...
                </span>
              ) : isPrintSuccess ? (
                <>
                  <Check size={16} /> Đã in thành công
                </>
              ) : (
                <>
                  <Printer size={16} /> In hóa đơn
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
