import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PetHealthCertificate } from "../components/PetHealthCertificate";
import { Button } from "@/components/ui";
import type { ConditionAppointments } from "../types/condition.type";

export default function PetHealthCertificatePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const certificateRef = useRef<HTMLDivElement>(null);
  // Lấy dữ liệu từ location.state (nên truyền từ trang trước)
  const data = (location.state as { data: ConditionAppointments })?.data;

  if (!data) {
    return (
      <div className="p-8 text-center">
        <p>Không tìm thấy dữ liệu giấy chứng nhận sức khỏe.</p>
        <Button className="mt-4" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
    );
  }

  const handlePrint = () => {
    if (certificateRef.current) {
      const printContents = certificateRef.current.innerHTML;
      const printWindow = window.open("", "", "height=800,width=800");
      if (printWindow) {
        printWindow.document.write(
          "<html><head><title>Giấy chứng nhận sức khỏe thú cưng</title>",
        );
        printWindow.document.write(
          "<style>body{font-family:sans-serif;} .certificate-container{max-width:700px;margin:auto;padding:24px;}</style>",
        );
        printWindow.document.write("</head><body >");
        printWindow.document.write(printContents);
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
        printWindow.close();
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-8">
      <div className="mb-6 flex w-full max-w-2xl justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
        <Button onClick={handlePrint}>In file PDF</Button>
      </div>
      <PetHealthCertificate ref={certificateRef} data={data} />
    </div>
  );
}
