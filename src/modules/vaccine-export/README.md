# Chức năng xem danh sách Vaccine Export

## Tổng quan

Chức năng này cho phép Admin xem danh sách các phiếu xuất kho vaccine với các tính năng cơ bản.

**Lưu ý:** Chỉ có Admin mới có quyền truy cập chức năng này, Staff không có quyền.

## Các files đã tạo/sửa đổi

### Hooks

- `src/modules/vaccine-export/hooks/useVaccineExports.ts` - Hook để fetch danh sách vaccine exports
- `src/modules/vaccine-export/hooks/useVaccineExportById.ts` - Hook để fetch chi tiết một vaccine export
- `src/modules/vaccine-export/hooks/useVaccineExportAdd.ts` - Hook để tạo mới vaccine export
- `src/modules/vaccine-export/hooks/useVaccineExportEdit.ts` - Hook để cập nhật vaccine export
- `src/modules/vaccine-export/hooks/index.ts` - Export tất cả hooks

### Components

- `src/modules/vaccine-export/components/VaccineExportTable.tsx` - Table component hiển thị danh sách
- `src/modules/vaccine-export/components/CreateVaccineExportForm.tsx` - Form component tạo phiếu xuất kho mới
- `src/modules/vaccine-export/components/EditVaccineExportForm.tsx` - Form component cập nhật phiếu xuất kho
- `src/modules/vaccine-export/components/index.ts` - Export components

### Pages

- `src/modules/vaccine-export/pages/VaccineExportsPage.tsx` - Trang danh sách vaccine exports
- `src/modules/vaccine-export/pages/VaccineExportDetailPage.tsx` - Trang chi tiết vaccine export
- `src/modules/vaccine-export/pages/CreateVaccineExportPage.tsx` - Trang tạo phiếu xuất kho mới
- `src/modules/vaccine-export/pages/EditVaccineExportPage.tsx` - Trang cập nhật phiếu xuất kho

### Services

- `src/modules/vaccine-export/services/vaccine-export.service.ts` - Thêm methods `getVaccineExportById`, `createVaccineExport` và `updateVaccineExport`

### Types & Schemas

- `src/modules/vaccine-export/types/payload.type.ts` - Type definitions cho payload API calls
- `src/modules/vaccine-export/schemas/vaccine-export.schema.ts` - Zod schema validation cho form tạo mới và cập nhật

### Routes

- `src/modules/vaccine-export/routes/vaccine-export.route.tsx` - Định nghĩa routes cho Admin
- `src/routes/index.ts` - Thêm vaccine export routes vào app routes

### Layout

- `src/shared/layouts/AdminLayout.tsx` - Thêm menu "Xuất kho" vào sidebar Admin
- `src/shared/layouts/StaffLayout.tsx` - Xóa menu xuất kho khỏi Staff sidebar

### Module Index

- `src/modules/vaccine-export/index.ts` - Export tất cả exports của module

## Tính năng hiện có

### Trang danh sách (`/admin/vaccine-exports`)

- Hiển thị danh sách phiếu xuất kho vaccine trong bảng
- Tìm kiếm theo mã xuất kho
- Phân trang
- Nút "Tạo phiếu xuất kho" (chuyển đến trang tạo)
- Nút "Chi tiết" cho mỗi item (chuyển đến trang chi tiết)

### Bảng hiển thị bao gồm các cột:

- STT
- Mã xuất kho
- Ngày xuất kho
- Người tạo
- Ngày tạo
- Trạng thái (Hoạt động/Đã xóa)
- Thao tác (Nút chi tiết, nút sửa và nút xóa - nút sửa và xóa bị disable nếu đã xóa)

### Trang chi tiết (`/admin/vaccine-exports?vaccineExportId=123`)

- Hiển thị thông tin chi tiết phiếu xuất kho
- Nút quay lại danh sách
- Nút "Chỉnh sửa" và "Xóa" (ẩn nếu phiếu đã bị xóa)
- Layout card với thông tin được chia thành 2 cột
- Confirm dialog khi xóa phiếu xuất kho
- URL sử dụng query parameter `vaccineExportId` thay vì route riêng biệt

#### Bảng chi tiết xuất kho vaccine

- Hiển thị danh sách chi tiết vaccine export trong bảng
- Các cột: STT, Batch vaccine, Tên vaccine, Số lượng, Mục đích, Ngày tạo, Trạng thái, Thao tác
- Nút thao tác: Chi tiết, Sửa, Xóa cho từng export detail
- Tự động load dữ liệu khi vào trang chi tiết export

### Trang tạo (`/admin/vaccine-exports/create`)

- Form tạo phiếu xuất kho mới với validation
- Trường nhập ngày xuất kho (mặc định là ngày hiện tại)
- Nút "Tạo phiếu xuất kho" và "Hủy"
- Thông báo toast khi tạo thành công/thất bại
- Tự động chuyển về trang danh sách sau khi tạo thành công

### Trang cập nhật (`/admin/vaccine-exports/edit?exportId=123`)

- Form cập nhật phiếu xuất kho với validation
- Pre-fill dữ liệu hiện tại của phiếu
- Hiển thị thông tin read-only: mã xuất kho, người tạo, ngày tạo
- Cho phép chỉnh sửa: ngày xuất kho
- Nút "Cập nhật phiếu xuất kho" và "Hủy"
- Thông báo toast khi cập nhật thành công/thất bại
- Tự động chuyển về trang danh sách sau khi cập nhật thành công

### Chức năng xóa

- Nút "Xóa" có trong bảng danh sách và trang chi tiết
- Hiển thị confirm dialog trước khi xóa
- Thông báo toast khi xóa thành công/thất bại
- Tự động refresh danh sách sau khi xóa thành công
- Không thể xóa phiếu đã bị xóa (nút disabled)

## Cách sử dụng

1. Mở ứng dụng và đăng nhập với quyền Admin (không phải Staff)
2. Vào menu "Vắc xin" > "Xuất kho"
3. Xem danh sách các phiếu xuất kho
4. Sử dụng tìm kiếm để lọc theo mã xuất kho
5. Click "Chi tiết" để xem thông tin chi tiết của một phiếu
6. Click "Sửa" để chỉnh sửa phiếu xuất kho (nếu chưa bị xóa)
7. Click "Xóa" để xóa phiếu xuất kho (có confirm dialog)
8. Click "Tạo phiếu xuất kho" để tạo phiếu mới
9. Điền ngày xuất kho và click "Tạo phiếu xuất kho"
10. Từ trang chi tiết, click "Chỉnh sửa" để cập nhật phiếu hoặc "Xóa" để xóa phiếu

## Phân quyền

- **Admin**: Có đầy đủ quyền truy cập tất cả chức năng xuất kho vaccine (xem, tạo, sửa, xóa)
- **Staff**: Không có quyền truy cập, menu không hiển thị
- **Vet**: Không có quyền truy cập

## Lưu ý kỹ thuật

- Sử dụng React Query để cache dữ liệu (stale time: 5 phút)
- Có loading states và error handling
- Responsive design
- Debounce search (500ms)
- Pagination với thông tin từ API
- Form validation với Zod schema
- Toast notifications cho success/error
- Auto-refresh danh sách sau khi tạo/xóa thành công
- Confirm dialog trước khi thực hiện hành động xóa
