import { icons } from "@/shared/constants/icons.constants";

// Constants for better maintainability
const FOOTER_STYLES = {
  container: "mt-auto border-t border-gray-600 bg-[#2D3748]",
  wrapper: "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
  brandTitle: "mb-4 text-xl font-nunito-700 text-white",
  brandDescription: "mb-4 max-w-md font-nunito-400 text-gray-300",
  sectionTitle:
    "mb-4 text-sm font-inter-600 tracking-wider text-gray-200 uppercase",
  link: "font-nunito-400 text-gray-300 transition-colors hover:text-primary",
  contactItem: "flex items-center space-x-2",
  contactIcon: "text-primary",
  contactText: "font-nunito-400 text-gray-300",
  supportHours: "text-sm font-nunito-300 text-gray-400",
  copyright: "text-sm font-nunito-400 text-gray-300",
  bottomLink:
    "text-sm font-inter-500 text-gray-400 transition-colors hover:text-primary",
} as const;

export default function Footer() {
  return (
    <footer className={FOOTER_STYLES.container}>
      <div className={FOOTER_STYLES.wrapper}>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className={FOOTER_STYLES.brandTitle}>VaxPet</h3>
            <p className={FOOTER_STYLES.brandDescription}>
              Hệ thống quản lý tiêm chủng thú cưng – giúp bạn theo dõi sức khỏe
              và lịch sử tiêm phòng cho thú cưng dễ dàng.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={FOOTER_STYLES.sectionTitle}>Liên kết nhanh</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className={FOOTER_STYLES.link}>
                  Giới thiệu
                </a>
              </li>
              <li>
                <a href="#" className={FOOTER_STYLES.link}>
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a href="#" className={FOOTER_STYLES.link}>
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a href="#" className={FOOTER_STYLES.link}>
                  Hướng dẫn sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={FOOTER_STYLES.sectionTitle}>Liên hệ hỗ trợ</h4>
            <ul className="space-y-3">
              <li className={FOOTER_STYLES.contactItem}>
                <icons.Phone size={16} className={FOOTER_STYLES.contactIcon} />
                <span className={FOOTER_STYLES.contactText}>1900 9999</span>
              </li>
              <li className={FOOTER_STYLES.contactItem}>
                <icons.Mail size={16} className={FOOTER_STYLES.contactIcon} />
                <span className={FOOTER_STYLES.contactText}>
                  support@vaxpet.vn
                </span>
              </li>
              <li>
                <p className={FOOTER_STYLES.supportHours}>
                  Giờ hỗ trợ: 8h - 20h hằng ngày
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-600 pt-8 sm:flex-row">
          <p className={FOOTER_STYLES.copyright}>
            © {new Date().getFullYear()} VaxPet. Bảo vệ thú cưng – Đồng hành
            cùng bạn.
          </p>
          <div className="mt-4 flex space-x-6 sm:mt-0">
            <a href="#" className={FOOTER_STYLES.bottomLink}>
              Chính sách
            </a>
            <a href="#" className={FOOTER_STYLES.bottomLink}>
              Điều khoản
            </a>
            <a href="#" className={FOOTER_STYLES.bottomLink}>
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
