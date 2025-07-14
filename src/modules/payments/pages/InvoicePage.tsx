import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { InvoicePreview } from "../components/InvoicePreview";

export default function InvoicePage() {
  const location = useLocation();
  const data = location.state?.invoiceData;
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `HoaDon_${data?.payment?.paymentCode}`,
  });

  if (!data)
    return (
      <p className="text-center text-red-500">
        Không tìm thấy dữ liệu hóa đơn.
      </p>
    );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div ref={printRef}>
        <InvoicePreview data={data} />
      </div>

      <div className="mt-6 flex justify-end gap-2 print:hidden">
        <Button onClick={handlePrint} className="bg-primary text-white">
          In hóa đơn
        </Button>
      </div>
    </div>
  );
}
