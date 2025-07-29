import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { images } from "../constants/images.constants";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <img
        src={images.CatSticker}
        alt="Cute pet"
        className="mb-6 size-64 object-contain"
      />
      <h1 className="text-primary font-inter-700 mb-4 text-6xl">404</h1>
      <h2 className="text-dark font-inter-600 mb-2 text-2xl">
        Trang không tồn tại
      </h2>
      <p className="text-muted-foreground font-nunito mb-6 text-base">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
      </p>
      <Button
        onClick={() => navigate(-1)}
        className="font-nunito flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Quay lại trang trước
      </Button>
    </div>
  );
}
