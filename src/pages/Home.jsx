import React, { useEffect, useState } from 'react';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryStrip from '@/components/home/CategoryStrip';
import SidebarFilter from '@/components/product/SidebarFilter';
import ProductCard from '@/components/product/ProductCard';
import productService from '@/services/productService';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Bắt đầu tải -> hiện loading
        const data = await productService.getAllProducts();
        setProducts(data); // Lưu dữ liệu vào state
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm!'); // Xử lý lỗi
        console.error(err);
      } finally {
        setLoading(false); // Tắt loading dù thành công hay thất bại
      }
    };

    fetchProducts(); // Gọi hàm
  }, []);
  return (
    <main>
      <HeroCarousel />
      <CategoryStrip />
      <div className="container-fluid px-4">
        <div className="row">
          <aside className="col-lg-3 d-none d-lg-block">
            <SidebarFilter />
          </aside>
          <section className="col-lg-9">
            <div className="row g-4">
              {products.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Promo Banner */}
      <section className="container my-5 py-5 bg-sport-main text-center rounded text-white shadow">
        <h2 className="fw-bold">🎉 GIẢM GIÁ ĐẶC BIỆT - CHỈ HÔM NAY!</h2>
        <p>Nhập mã SPORT2026 để được giảm thêm 10%</p>
        <button className="btn btn-light btn-lg mt-3">Mua Sắm Ngay</button>
      </section>
    </main>
  );
};

export default Home;
