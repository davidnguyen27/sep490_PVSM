# Logout System Documentation

## Tổng quan

Hệ thống đăng xuất đã được triển khai hoàn chỉnh cho tất cả các role (Admin, Staff, Vet) với các component và hook tái sử dụng.

## Components

### 1. LogoutButton

Component button đăng xuất có thể tùy chỉnh.

```tsx
import { LogoutButton } from "@/components/shared";

// Sử dụng cơ bản
<LogoutButton />

// Tùy chỉnh
<LogoutButton
  variant="destructive"
  size="sm"
  showIcon={true}
  showText={true}
  confirmLogout={true}
  className="custom-class"
/>
```

**Props:**

- `variant`: Kiểu button (default: "ghost")
- `size`: Kích thước button (default: "default")
- `showIcon`: Hiển thị icon (default: true)
- `showText`: Hiển thị text (default: true)
- `confirmLogout`: Hiển thị modal xác nhận (default: true)
- `className`: CSS class tùy chỉnh

### 2. LogoutConfirmModal

Modal xác nhận đăng xuất với thông tin user.

```tsx
import { LogoutConfirmModal } from "@/components/shared";

<LogoutConfirmModal open={showModal} onOpenChange={setShowModal} />;
```

### 3. SidebarLogout

Component đăng xuất cho sidebar, tự động hiển thị ở cuối sidebar.

```tsx
import { SidebarLogout } from "@/components/shared";

<SidebarLogout isCollapsed={isCollapsed} />;
```

## Hooks

### useUserRole

Hook tiện ích để làm việc với role của user.

```tsx
import { useUserRole } from "@/shared/hooks/useUserRole";

const {
  user,
  isAdmin,
  isStaff,
  isVet,
  isLoggedIn,
  role,
  roleText,
  roleSlug,
  hasPermission,
} = useUserRole();

// Kiểm tra quyền
if (hasPermission([1, 2])) {
  // Admin hoặc Staff
}
```

## Implementation trong các Layout

### AdminLayout, StaffLayout, VetLayout

Tất cả các layout đều sử dụng cùng một Header component, do đó chức năng logout sẽ hoạt động nhất quán.

```tsx
// Header dropdown menu đã tích hợp LogoutButton
<LogoutButton
  variant="ghost"
  className="w-full justify-start"
  showIcon={true}
  showText={true}
/>

// Sidebar đã tích hợp SidebarLogout
<SidebarLogout isCollapsed={isCollapsed} />
```

## Luồng hoạt động

1. **User click logout button**
2. **LogoutConfirmModal hiển thị** (nếu confirmLogout=true)
3. **User xác nhận**
4. **AuthContext.logout() được gọi**
5. **localStorage.clear()**
6. **Redirect về trang Landing (/)**
7. **Toast thông báo thành công**

## Tính năng

### ✅ Đã implement

- [x] Logout button trong Header dropdown
- [x] Logout button trong Sidebar
- [x] Modal xác nhận với thông tin user
- [x] Support tất cả role (Admin, Staff, Vet)
- [x] Responsive design
- [x] Toast notifications
- [x] Clear localStorage
- [x] Redirect về Landing page
- [x] Hook tiện ích useUserRole
- [x] Components tái sử dụng

### 🔧 Có thể mở rộng

- [ ] Logout tự động khi token hết hạn
- [ ] Session timeout warning
- [ ] Logout khỏi tất cả devices
- [ ] Analytics tracking logout events

## Cách sử dụng cho các role

### Admin

```tsx
// Đã có sẵn trong AdminLayout
// Header: dropdown menu với LogoutButton
// Sidebar: SidebarLogout ở cuối
```

### Staff

```tsx
// Đã có sẵn trong StaffLayout
// Header: dropdown menu với LogoutButton
// Sidebar: SidebarLogout ở cuối
```

### Vet

```tsx
// Đã có sẵn trong VetLayout
// Header: dropdown menu với LogoutButton
// Sidebar: SidebarLogout ở cuối
```

## Error Handling

- Try-catch wrapper cho logout function
- Toast notification cho thành công/lỗi
- Console.error cho debugging
- Fallback UI khi có lỗi

## Security

- Hoàn toàn clear localStorage
- Redirect về public page
- Không cache thông tin user
- Invalidate React Query cache (qua AuthContext)
