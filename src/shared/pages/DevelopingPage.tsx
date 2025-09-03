import { Construction, ArrowLeft, Clock, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DevelopingPage() {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-0 bg-white/80 shadow-xl backdrop-blur-sm">
          <CardContent className="p-12 text-center">
            {/* Icon Animation */}
            <div className="relative mb-8">
              <div className="mb-4 inline-flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600">
                <Construction className="h-12 w-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2">
                <div className="flex h-8 w-8 animate-bounce items-center justify-center rounded-full bg-yellow-400">
                  <Wrench className="h-4 w-4 text-yellow-800" />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              <div>
                <h1 className="font-nunito-700 mb-2 text-3xl font-bold text-gray-800">
                  Tính năng đang phát triển
                </h1>
                <p className="font-nunito-400 text-lg text-gray-600">
                  Chúng tôi đang làm việc chăm chỉ để mang đến cho bạn trải
                  nghiệm tốt nhất
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
                <div className="flex items-center justify-center space-x-2 text-blue-700">
                  <Clock className="h-5 w-5" />
                  <span className="font-nunito-600">
                    Dự kiến hoàn thành sớm
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4 text-sm text-gray-700 md:grid-cols-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    <span>Giao diện thân thiện</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <span>Hiệu suất cao</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    <span>Bảo mật tối ưu</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                    <span>Dễ sử dụng</span>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="pt-4">
                <Button
                  onClick={handleGoBack}
                  className="font-nunito-600 transform rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Quay lại trang trước
                </Button>
              </div>

              {/* Footer Note */}
              <p className="mt-8 text-xs text-gray-500">
                Cảm ơn bạn đã kiên nhẫn chờ đợi. Chúng tôi sẽ thông báo ngay khi
                tính năng sẵn sàng!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
