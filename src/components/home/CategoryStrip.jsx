import React from 'react';
import { Link } from 'react-router-dom';

const CategoryStrip = () => {
  const cats = [
    { name: 'Giày', icon: '👟', slug: 'Giày' },
    { name: 'Quần Áo', icon: '👕', slug: 'Quần áo' },
    { name: 'Phụ Kiện', icon: '🎒', slug: 'Phụ kiện' },
    { name: 'Dụng Cụ', icon: '🏋️', slug: 'Dụng cụ' },
    { name: 'Khuyến Mãi', icon: '🔥', slug: 'sale' },
  ];

  return (
    <section className="container mb-5">
      <div className="category-strip d-flex justify-content-around p-3 bg-white shadow-sm rounded">
        {cats.map((cat, i) => (
          <Link key={i} to={`/products?category=${cat.slug}`} className="category-item text-center text-decoration-none text-dark">
            <div className="fs-2">{cat.icon}</div>
            <span className="fw-bold">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryStrip;
