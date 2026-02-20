import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '@/api/axiosClient';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async e => {
    e.preventDefault();
    setError(''); // Xóa lỗi cũ

    // 1. Kiểm tra xác nhận mật khẩu
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp!');
      return;
    }

    setLoading(true);
    try {
      // 2. Gọi API đăng ký của .NET
      await axiosClient.post('/auth/register', {
        fullName: fullName,
        email: email,
        password: password
      });

      // 3. Xử lý khi thành công
      alert('🎉 Đăng ký thành công! Vui lòng đăng nhập.');
      navigate('/login'); // Đá người dùng sang trang Đăng nhập
    } catch (err) {
      // 4. Xử lý lỗi (ví dụ: Email đã tồn tại từ backend trả về)
      if (err.response && err.response.data) {
        // Backend của chúng ta đang trả về chuỗi text trực tiếp, ví dụ: "Email đã tồn tại!"
        setError(typeof err.response.data === 'string' ? err.response.data : 'Đăng ký thất bại, vui lòng kiểm tra lại thông tin.');
      } else {
        setError('Lỗi kết nối đến máy chủ.');
      }
      console.error('Lỗi đăng ký:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow border-0 rounded-3">
            <div className="card-body p-4">
              <h2 className="text-center mb-4 fw-bold text-success">Đăng Ký Tài Khoản</h2>

              {/* Hiển thị lỗi nếu có */}
              {error && <div className="alert alert-danger py-2">{error}</div>}

              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Họ và Tên</label>
                  <input type="text" className="form-control" value={fullName} onChange={e => setFullName(e.target.value)} required placeholder="Nhập họ tên của bạn" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Mật khẩu</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Tạo mật khẩu (ít nhất 6 ký tự)" minLength="6" />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Xác nhận mật khẩu</label>
                  <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required placeholder="Nhập lại mật khẩu" />
                </div>
                <button type="submit" className="btn btn-success w-100 fw-bold fs-5" disabled={loading}>
                  {loading ? 'Đang xử lý...' : 'Đăng Ký Ngay'}
                </button>
              </form>

              <div className="text-center mt-3">
                <span className="text-muted">Đã có tài khoản? </span>
                <Link to="/login" className="text-decoration-none fw-semibold">
                  Đăng nhập tại đây
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
