import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/user/Home';
import Products from '@/pages/user/Products';
import Login from '@/pages/user/Login';
import Register from '@/pages/user/Register';
import DefaultLayout from '@/layouts/AdminLayout';
import ProductDetail from '@/pages/user/ProductDetail';
import Cart from '@/pages/user/Cart';

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

        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route path="/admin/*" element={<DefaultLayout />} />
    </Routes>
  );
};

export default AppRouter;
