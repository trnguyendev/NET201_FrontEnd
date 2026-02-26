import React from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '@/data/bannerData';

const HeroCarousel = () => {
  return (
    <section className="container hero-section mb-5 mt-4">
      <div id="heroCarousel" className="carousel slide shadow-lg rounded-2 overflow-hidden" data-bs-ride="carousel">
        {/* Indicators (Các dấu chấm) */}
        <div className="carousel-indicators">
          {HERO_SLIDES.map((_, index) => (
            <button key={index} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-current={index === 0 ? 'true' : 'false'}></button>
          ))}
        </div>

        {/* Carousel Items (Danh sách Slide) */}
        <div className="carousel-inner">
          {HERO_SLIDES.map((slide, index) => (
            <div key={slide.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={slide.img} className="d-block w-100 hero-img" alt={slide.title} />

              {/* Caption: Đã bỏ d-none, dùng flex để căn giữa dọc */}
              <div className="carousel-caption d-flex flex-column justify-content-center align-items-start h-100 start-0 px-4 px-md-5">
                <div className="banner-content text-start">
                  <h1 className="fw-bold text-white hero-title mb-2">{slide.title}</h1>
                  <p className="text-white hero-desc mb-3 mb-md-4">{slide.desc}</p>
                  <Link to={slide.link} className={`btn ${slide.btnClass} rounded-pill fw-semibold hero-btn`}>
                    {slide.btnText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút điều khiển Prev (Trái) */}
        <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        {/* Nút điều khiển Next (Phải) */}
        <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <style>{`
        /* Responsive cho ảnh */
        .hero-img {
          height: 220px; /* Chiều cao cố định trên mobile để ảnh không bị dẹt */
          object-fit: cover;
          object-position: center right; /* Đẩy trọng tâm ảnh sang phải một chút vì chữ nằm bên trái */
        }

        /* Xử lý phần hiển thị chữ */
        .hero-section .carousel-caption {
          top: 0;
          bottom: 0;
          /* Đổ bóng đen mờ từ trái sang để làm nổi bật chữ màu trắng */
          background: linear-gradient(90deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
        }

        /* Giới hạn độ rộng của khung chữ để không tràn hết ảnh */
        .banner-content {
          max-width: 70%;
        }

        /* Kích thước chữ cho Mobile */
        .hero-title {
          font-size: 1.25rem;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
        }
        .hero-desc {
          font-size: 0.85rem;
          display: -webkit-box;
          -webkit-line-clamp: 2; /* Chỉ hiện tối đa 2 dòng trên mobile */
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hero-btn {
          font-size: 0.85rem;
          padding: 0.4rem 1.2rem;
        }

        /* Kích thước cho Tablet & Desktop */
        @media (min-width: 768px) {
          .hero-img {
            height: 400px;
          }
          .banner-content {
            max-width: 50%;
          }
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-desc {
            font-size: 1.1rem;
            -webkit-line-clamp: 3;
          }
          .hero-btn {
            font-size: 1.1rem;
            padding: 0.6rem 2rem;
          }
        }
        
        /* Chỉnh lại icon Prev/Next cho to ra một chút */
        .carousel-control-prev-icon,
        .carousel-control-next-icon {
          width: 2.5rem;
          height: 2.5rem;
          filter: drop-shadow(0px 0px 4px rgba(0,0,0,0.5)); /* Thêm viền mờ cho nút */
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
