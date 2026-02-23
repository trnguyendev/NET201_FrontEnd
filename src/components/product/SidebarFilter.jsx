import React from 'react';

const SidebarFilter = () => {
  return (
    <div className="filter-sidebar p-4 border-0 rounded-4 bg-white shadow-sm sticky-top" style={{ top: '20px' }}>
      <h5 className="fw-bold mb-4 border-bottom pb-2 text-uppercase">
        <i className="bi bi-funnel me-2"></i>Bộ Lọc
      </h5>

      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-secondary">Khoảng Giá</h6>
        {['Dưới 500.000₫', '500.000₫ - 1.000.000₫', 'Trên 1.000.000₫'].map((price, i) => (
          <div key={i} className="form-check custom-checkbox mb-2">
            <input className="form-check-input shadow-sm" type="checkbox" id={`price-${i}`} />
            <label className="form-check-label ms-1 text-muted fw-medium" style={{ cursor: 'pointer' }} htmlFor={`price-${i}`}>
              {price}
            </label>
          </div>
        ))}
      </div>

      {/* Tương lai bạn có thể map Brands vào đây */}
      <div className="mb-4">
        <h6 className="fw-bold mb-3 text-secondary">Loại sản phẩm</h6>
        <div className="form-check custom-checkbox mb-2">
          <input className="form-check-input shadow-sm" type="checkbox" id="stock-1" />
          <label className="form-check-label ms-1 text-muted fw-medium" style={{ cursor: 'pointer' }} htmlFor="stock-1">
            Quần áo
          </label>
        </div>

        <div className="form-check custom-checkbox mb-2">
          <input className="form-check-input shadow-sm" type="checkbox" id="stock-1" />
          <label className="form-check-label ms-1 text-muted fw-medium" style={{ cursor: 'pointer' }} htmlFor="stock-1">
            Giày
          </label>
        </div>

        <div className="form-check custom-checkbox mb-2">
          <input className="form-check-input shadow-sm" type="checkbox" id="stock-1" />
          <label className="form-check-label ms-1 text-muted fw-medium" style={{ cursor: 'pointer' }} htmlFor="stock-1">
            Dụng cụ
          </label>
        </div>

        <div className="form-check custom-checkbox mb-2">
          <input className="form-check-input shadow-sm" type="checkbox" id="stock-1" />
          <label className="form-check-label ms-1 text-muted fw-medium" style={{ cursor: 'pointer' }} htmlFor="stock-1">
            Phụ kiện
          </label>
        </div>
      </div>

      <button className="btn btn-primary w-100 fw-bold rounded-pill py-2 shadow-sm hover-scale">Áp dụng bộ lọc</button>
    </div>
  );
};

export default SidebarFilter;
