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

    // 👉 ĐÂY LÀ ĐOẠN ĐƯỢC SỬA: Đưa role về chuẩn Mảng (Array)
    // Nếu nó đã là mảng thì giữ nguyên, nếu là chuỗi (1 quyền) thì nhét nó vào mảng
    const rolesArray = Array.isArray(userRole) ? userRole : [userRole];

    // 3. Kiểm tra xem có chứa quyền Admin không
    if (rolesArray.includes('Admin')) {
      return children; // Trong mảng có chữ Admin -> Mở cửa cho vào!
    } else {
      // Có đăng nhập nhưng không có chữ Admin -> Đuổi ra
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
