import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
      <div className="text-center">
        {/* Icon cảnh báo */}
        <i className="bi bi-shield-lock text-danger" style={{ fontSize: '5rem' }}></i>

        <h1 className="display-4 fw-bold mt-3">403</h1>
        <h3 className="text-uppercase mb-3">Truy cập bị từ chối</h3>

        <p className="text-muted mb-4">
          Xin lỗi, bạn không có quyền (hạn Admin) để xem trang này.
          <br />
          Vui lòng quay lại hoặc đăng nhập bằng tài khoản quản trị viên.
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <Link to="/" className="btn btn-primary px-4 py-2">
            <i className="bi bi-house-door me-2"></i> Về Trang chủ
          </Link>
          <Link to="/login" className="btn btn-outline-secondary px-4 py-2">
            Đăng nhập tài khoản khác
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AccessDenied;
