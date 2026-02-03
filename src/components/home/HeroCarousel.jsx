import React from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES } from '@/data/bannerData';

const HeroCarousel = () => {
  return (
    <section className="hero-section mb-5 shadow-lg">
      <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {HERO_SLIDES.map((_, index) => (
            <button key={index} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={index} className={index === 0 ? 'active' : ''}></button>
          ))}
        </div>

        <div className="carousel-inner">
          {HERO_SLIDES.map((slide, index) => (
            <div key={slide.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
              <img src={slide.img} className="d-block w-100" alt={slide.title} />
              <div className="carousel-caption d-none d-md-block text-start">
                <h1 className="display-4 fw-bold text-white">{slide.title}</h1>
                <p className="lead text-white mb-4">{slide.desc}</p>
                <Link to={slide.link} className={`btn ${slide.btnClass} btn-lg px-5`}>
                  {slide.btnText}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Các nút điều khiển Prev/Next có thể giữ nguyên */}
      </div>
    </section>
  );
};

export default HeroCarousel;
