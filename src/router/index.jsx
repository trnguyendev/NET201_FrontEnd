import { Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Login from '@/pages/Login';
import Register from '@/pages/Register';

const AppRouter = () => {
  return (
    <Routes>
      {/* Route bao ngoài là MainLayout (chứa Header/Footer) */}
      <Route path="/" element={<MainLayout />}>
        {/* Trang chủ */}
        <Route index element={<Home />} />

        {/* Trang danh sách sản phẩm */}
        <Route path="products" element={<Products />} />

        {/* Trang đăng nhập */}
        <Route path="login" element={<Login />} />

        {/* Trang đăng kí */}
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
