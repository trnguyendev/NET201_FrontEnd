import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import brandService from '@/services/brandService';
import { getImageUrl } from '@/utils/config';

const BrandSection = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const data = await brandService.getAllBrand();
        console.log(data);
        setBrands(data);
      } catch (error) {
        console.error('Lỗi khi tải thương hiệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // 2. Hàm xử lý trượt trái / phải
  const scroll = scrollOffset => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  return (
    <section className="container mb-5 mt-n4 position-relative" style={{ zIndex: 10 }}>
      <div className="bg-white shadow rounded-3 p-4">
        <h5 className="fw-bold mb-2 text-dark">Thương Hiệu Chính Hãng</h5>
        <div className="position-relative d-flex align-items-center">
          {/* Nút mũi tên TRÁI */}
          <button className="btn btn-danger rounded-circle position-absolute start-0 z-2 shadow d-flex justify-content-center align-items-center p-0 brand-scroll-btn" style={{ width: '32px', height: '32px', transform: 'translateX(-50%)' }} onClick={() => scroll(-250)}>
            <i className="bi bi-chevron-left text-white fw-bold"></i>
          </button>

          {/* Vùng chứa danh sách thương hiệu (Cuộn ngang) */}
          <div className="d-flex w-100 overflow-auto hide-scrollbar gap-4 px-3" ref={scrollRef}>
            {loading ? (
              <div className="text-center w-100 py-3">
                <span className="spinner-border spinner-border-sm text-danger"></span>
              </div>
            ) : (
              brands.map(brand => (
                <Link key={brand.id} to={`/products?brand=${brand.id}`} className="brand-item text-center text-decoration-none text-dark flex-shrink-0" style={{ width: '100px' }}>
                  <div className="brand-img-wrapper d-flex align-items-center justify-content-center mb-2" style={{ height: '60px' }}>
                    <img src={getImageUrl(brand.logoUrl)} alt={brand.name} className="img-fluid" style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>
                  <span className="fw-semibold small text-uppercase" style={{ fontSize: '0.8rem' }}>
                    {brand.name}
                  </span>
                </Link>
              ))
            )}
          </div>

          {/* Nút mũi tên PHẢI */}
          <button className="btn btn-danger rounded-circle position-absolute end-0 z-2 shadow d-flex justify-content-center align-items-center p-0 brand-scroll-btn" style={{ width: '32px', height: '32px', transform: 'translateX(50%)' }} onClick={() => scroll(250)}>
            <i className="bi bi-chevron-right text-white fw-bold"></i>
          </button>
        </div>
      </div>

      {/* CSS Nhúng trực tiếp cho component này */}
      <style>{`
        /* Ẩn thanh cuộn mặc định của trình duyệt để nhìn giống Slider */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Hiệu ứng hover cho nút mũi tên */
        .brand-scroll-btn {
          opacity: 0.8;
          transition: all 0.3s ease;
        }
        .brand-scroll-btn:hover {
          opacity: 1;
          transform: scale(1.1) translateX(calc(var(--transform-x, 0) * 1.1));
        }

        /* Hiệu ứng hover cho từng thương hiệu */
        .brand-item {
          transition: transform 0.2s ease;
        }
        .brand-item:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
};

export default BrandSection;
