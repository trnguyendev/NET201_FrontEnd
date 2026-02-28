import React, { useEffect, useState } from 'react';
import HeroCarousel from '@/components/home/HeroCarousel';
import ProductCard from '@/components/product/ProductCard';
import productService from '@/services/productService';
import BrandSection from '@/components/home/BrandSection';
import Pagination from '@/components/common/Pagination';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getHomeProducts(currentPage, pageSize);
        setProducts(data.items);
        setTotalPages(data.totalPages);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau!');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 500, behavior: 'smooth' });
    }
  };

  return (
    <main className="bg-light pb-5">
      <HeroCarousel />
      <BrandSection />

      <div className="container mt-4">
        <div className="row">
          <section className="col-12">
            {/* Header của phần Sản phẩm */}
            <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
              <h4 className="fw-bold mb-0 text-uppercase position-relative pb-2" style={{ borderBottom: '3px solid #0d6efd', marginBottom: '-2px' }}>
                Sản phẩm nổi bật
              </h4>
              <span className="badge bg-white text-dark border shadow-sm rounded-pill px-3 py-2 fw-medium">{totalCount} sản phẩm</span>
            </div>

            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status"></div>
                <p className="mt-3 text-muted fw-medium">Đang tải sản phẩm...</p>
              </div>
            )}

            {error && (
              <div className="alert alert-danger text-center shadow-sm rounded-3" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i> {error}
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="row g-3 g-md-4">
                  {products.length > 0 ? (
                    products.map(p => (
                      <div key={p.id} className="col-6 col-md-4 col-lg-3 d-flex align-items-stretch">
                        <ProductCard product={p} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center text-muted py-5">
                      <i className="bi bi-box-seam display-1 text-light mb-3"></i>
                      <h5>Hiện chưa có sản phẩm nào.</h5>
                    </div>
                  )}
                </div>

                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
              </>
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
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="btn btn-light btn-lg px-5 fw-bold rounded-pill shadow-sm hover-scale text-primary">
            Mua Sắm Ngay
          </button>
        </div>
      </section>

      <style>{`
        /* Hiệu ứng nhấc Card lên và đổ bóng */
        .custom-product-card { 
          transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); 
          border-radius: 12px;
        }
        .custom-product-card:hover { 
          transform: translateY(-6px); 
          box-shadow: 0 10px 25px rgba(0,0,0,0.08)!important; 
        }
        
        /* Hiệu ứng Zoom ảnh mượt mà */
        .img-wrapper .product-img { 
          transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); 
        }
        .custom-product-card:hover .product-img { 
          transform: scale(1.08); 
        }
        
        /* Cắt chữ tên sản phẩm (tối đa 2 dòng) */
        .product-title {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.2s; 
        }
        .custom-product-card:hover .product-title { 
          color: #0d6efd; 
        }

        /* Nút Hover chung */
        .hover-scale { transition: transform 0.2s; }
        .hover-scale:hover { transform: scale(1.05); }

        /* Tinh chỉnh Font chữ cho màn hình Mobile nhỏ */
        @media (max-width: 576px) {
          .product-title { font-size: 0.85rem; height: 2.6em; }
          .fs-5 { font-size: 1.05rem !important; }
          .card-body { padding: 0.75rem !important; }
        }
      `}</style>
    </main>
  );
};

export default Home;
