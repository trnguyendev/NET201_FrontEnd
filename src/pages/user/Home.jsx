import React, { useEffect, useState } from 'react';
import HeroCarousel from '@/components/home/HeroCarousel';
import SidebarFilter from '@/components/product/SidebarFilter';
import ProductCard from '@/components/product/ProductCard';
import productService from '@/services/productService';
import BrandSection from '@/components/home/BrandSection';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getHomeProducts();
        setProducts(data);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau!');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <main className="bg-light pb-5">
      <HeroCarousel />
      <BrandSection />
      <div className="container-fluid px-4 mt-4">
        <div className="row">
          <aside className="col-lg-3 d-none d-lg-block">
            <SidebarFilter />
          </aside>

          <section className="col-lg-9">
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <h4 className="fw-bold mb-0 text-uppercase">Sản phẩm nổi bật</h4>
              <span className="text-muted">{products.length} sản phẩm</span>
            </div>

            {/* Trạng thái Loading */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
              </div>
            )}

            {/* Trạng thái Lỗi */}
            {error && (
              <div className="alert alert-danger text-center shadow-sm" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
              </div>
            )}

            {/* Render Sản phẩm */}
            {!loading && !error && (
              <div className="row">
                {products.length > 0 ? (
                  products.map(p => <ProductCard key={p.id} product={p} />)
                ) : (
                  <div className="col-12 text-center text-muted py-5">
                    <h5>Hiện chưa có sản phẩm nào.</h5>
                  </div>
                )}
              </div>
            )}
          </section>
        </div>
      </div>
      {/* Promo Banner */}
      <section className="container my-5 py-5 text-center text-white shadow rounded-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0d6efd 0%, #00d4ff 100%)' }}>
        <div className="position-relative z-1">
          <h2 className="fw-bold display-5 mb-3">🎉 GIẢM GIÁ ĐẶC BIỆT - CHỈ HÔM NAY!</h2>
          <p className="fs-5 mb-4">
            Nhập mã <strong className="bg-warning text-dark px-2 py-1 rounded">SPORT2026</strong> để được giảm thêm 10%
          </p>
          <button className="btn btn-light btn-lg px-5 fw-bold rounded-pill shadow-sm hover-scale">Mua Sắm Ngay</button>
        </div>
      </section>
      {/* STYLE BỔ SUNG CHO TOÀN BỘ TRANG */}
      <style>{`
        /* Hiệu ứng nhấc Card lên khi trỏ chuột */
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
        }

        /* Hiệu ứng zoom ảnh mượt mà */
        .img-wrapper .product-img {
          transition: transform 0.5s ease;
        }
        .img-wrapper:hover .product-img {
          transform: scale(1.08);
        }

        /* Hover đổi màu tên sản phẩm */
        .product-title {
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Cắt text quá 2 dòng */
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s;
        }
        .product-card:hover .product-title {
          color: #0d6efd;
        }

        /* Nút hover banner */
        .hover-scale {
          transition: transform 0.2s;
        }
        .hover-scale:hover {
          transform: scale(1.05);
        }
      `}</style>
    </main>
  );
};

export default Home;
