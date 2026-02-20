import React from 'react';
import { Link } from 'react-router-dom';

const CategoryStrip = () => {
  const cats = [
    { name: 'Giày', icon: '👟', slug: 'Giày' },
    { name: 'Quần Áo', icon: '👕', slug: 'Quần áo' },
    { name: 'Phụ Kiện', icon: '🎒', slug: 'Phụ kiện' },
    { name: 'Dụng Cụ', icon: '🏋️', slug: 'Dụng cụ' },
    { name: 'Khuyến Mãi', icon: '🔥', slug: 'sale' }
  ];

  return (
    <section className="container mb-5 mt-n4 position-relative" style={{ zIndex: 10 }}>
      <div className="d-flex justify-content-around p-4 bg-white shadow rounded-4 flex-wrap gap-3">
        {cats.map((cat, i) => (
          <Link key={i} to={`/products?category=${cat.slug}`} className="category-item text-center text-decoration-none text-dark">
            <div className="icon-circle bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-2 shadow-sm" style={{ width: '70px', height: '70px', transition: 'all 0.3s ease' }}>
              <span className="fs-1">{cat.icon}</span>
            </div>
            <span className="fw-semibold">{cat.name}</span>
          </Link>
        ))}
      </div>

      <style>{`
        .category-item:hover .icon-circle {
          background-color: #0d6efd !important;
          color: white;
          transform: translateY(-5px);
          box-shadow: 0 .5rem 1rem rgba(13, 110, 253, 0.3)!important;
        }
      `}</style>
    </section>
  );
};

export default CategoryStrip;
