import React from 'react';

const SidebarFilter = () => {
  return (
    <div className="filter-sidebar p-3 border rounded bg-light">
      <h5 className="fw-bold mb-3">Bộ Lọc</h5>
      <div className="mb-4">
        <h6 className="fw-semibold">Khoảng Giá</h6>
        {['Dưới 500.000₫', '500.000₫ - 1.000.000₫', 'Trên 1.000.000₫'].map((price, i) => (
          <div key={i} className="form-check">
            <input className="form-check-input" type="checkbox" id={`price-${i}`} />
            <label className="form-check-label" htmlFor={`price-${i}`}>
              {price}
            </label>
          </div>
        ))}
      </div>
      <button className="btn btn-primary w-100">Áp dụng</button>
    </div>
  );
};

export default SidebarFilter;
