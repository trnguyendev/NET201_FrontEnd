import React from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // 1. Nếu không có vé (token) -> Đuổi ra trang đăng nhập
  if (!token) {
    toast.warning('Vui lòng đăng nhập để tiếp tục!');
    return <Navigate to="/login" replace />;
  }

  try {
    // 2. Giải mã Token để xem chức vụ (Role)
    // Cấu trúc JWT gồm 3 phần cách nhau bởi dấu '.', phần thứ 2 chứa data (payload)
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    const decodedToken = JSON.parse(jsonPayload);

    // Lưu ý: C# .NET thường lưu Role dưới key dài ngoẵng này, hoặc key 'role'
    const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
    const userRole = decodedToken[roleClaim] || decodedToken.role;

    // 3. Kiểm tra xem có đúng là Admin không
    if (userRole === 'Admin') {
      return children; // Đúng là Admin -> Cho phép hiển thị trang (children)
    } else {
      // Có đăng nhập nhưng là User thường -> Đuổi về trang chủ
      toast.error('Bạn không có quyền truy cập vào trang quản trị!');
      return <Navigate to="/access-denied" replace />;
    }
  } catch (error) {
    console.error('Lỗi đọc token:', error);
    // Token bị hỏng hoặc cố tình chỉnh sửa bậy bạ
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }
};

export default AdminProtectedRoute;
