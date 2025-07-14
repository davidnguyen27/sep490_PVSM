import { icons } from "@/shared/constants/icons";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-[#FAF9F6] text-sm text-gray-600">
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 py-6 md:grid-cols-3">
        <div>
          <h3 className="text-primary font-inter-600 text-lg">VaxPet</h3>
          <p className="font-nunito mt-2 text-gray-500">
            Hệ thống quản lý tiêm chủng thú cưng – giúp bạn <br /> theo dõi sức
            khỏe và lịch sử tiêm phòng cho thú cưng dễ dàng.
          </p>
        </div>

        <div>
          <h4 className="font-inter-600 mb-2 text-gray-700">Liên kết</h4>
          <ul className="space-y-1">
            <li>
              <a
                href="#"
                className="font-nunito hover:text-primary transition-colors"
              >
                Giới thiệu
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-nunito hover:text-primary transition-colors"
              >
                Chính sách bảo mật
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-nunito hover:text-primary transition-colors"
              >
                Điều khoản sử dụng
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-nunito hover:text-primary transition-colors"
              >
                Hướng dẫn sử dụng
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-inter-600 mb-2 text-gray-700">Hỗ trợ</h4>
          <div className="flex items-center gap-2">
            <icons.Phone size={16} className="text-primary font-nunito" />
            <span>1900 9999</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <icons.Mail size={16} className="text-primary" />
            <span className="font-nunito">support@vaxpet.vn</span>
          </div>
          <p className="font-nunito mt-2 text-xs text-gray-400">
            Giờ hỗ trợ: 8h - 20h hằng ngày
          </p>
        </div>
      </div>

      {/* Bottom note */}
      <div className="font-nunito border-t border-gray-200 py-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} VaxPet. Bảo vệ thú cưng – Đồng hành cùng
        bạn.
      </div>
    </footer>
  );
}
