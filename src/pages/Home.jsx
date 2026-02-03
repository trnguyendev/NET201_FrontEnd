import React from 'react';
import HeroCarousel from '@/components/home/HeroCarousel';
import CategoryStrip from '@/components/home/CategoryStrip';
import SidebarFilter from '@/components/product/SidebarFilter';
import ProductCard from '@/components/product/ProductCard';

const Home = () => {
  const products = [{ id: 1, title: 'Giày Nike Air Max', price: 1200000, listPrice: 2000000, imageUrl: 'https://placehold.co/500x600' }];

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
              {products.map((p) => (
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
