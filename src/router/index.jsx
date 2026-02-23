import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/user/Home';
import Products from '@/pages/user/Products';
import Login from '@/pages/user/Login';
import Register from '@/pages/user/Register';
import DefaultLayout from '@/layouts/AdminLayout';
import ProductDetail from '@/pages/user/ProductDetail';
import Cart from '@/pages/user/Cart';
import MyOrders from '@/pages/user/MyOrders';

// 1. Import "Ông bảo vệ" vào đây (Đảm bảo đường dẫn import khớp với nơi bạn lưu file)
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AccessDenied from '@/pages/user/AccessDenied';

const AppRouter = () => {
  return (
    <Routes>
      {/* Route bao ngoài là MainLayout (chứa Header/Footer) */}
      <Route path="/" element={<MainLayout />}>
        {/* Trang chủ */}
        <Route index element={<Home />} />
        {/* Trang danh sách sản phẩm */}
        <Route path="products" element={<Products />} />
        {/* Chi tiết sản phẩm */}
        <Route path="/details/:id" element={<ProductDetail />} />
        {/* Trang đăng nhập */}
        <Route path="login" element={<Login />} />
        {/* Trang đăng kí */}
        <Route path="register" element={<Register />} />
        {/* Giỏ hàng */}
        <Route path="/cart" element={<Cart />} />
        {/* Đơn hàng của tôi */}
        <Route path="/orders" element={<MyOrders />} />

        {/* 2. Thêm route báo lỗi (Ai cũng có thể thấy trang này) */}
        <Route path="access-denied" element={<AccessDenied />} />
      </Route>

      {/* ADMIN ROUTES - ĐÃ ĐƯỢC BẢO VỆ TẬN RĂNG */}
      <Route
        path="/admin/*"
        element={
          // 2. Bọc thẻ AdminProtectedRoute ra ngoài Layout của Admin
          <AdminProtectedRoute>
            <DefaultLayout />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
