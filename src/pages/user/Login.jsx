import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '@/api/axiosClient';
import { AuthContext } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Gọi hàm login từ AuthContext chúng ta vừa tạo
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setError('');

    try {
      const response = await axiosClient.post('/auth/login', {
        email: email,
        password: password
      });

      // 2. Lấy Token từ phản hồi của API
      const token = response.token;

      // 3. Nạp Token vào Trái tim hệ thống (AuthContext)
      login(token);

      alert('Đăng nhập thành công!');

      // 4. Chuyển hướng người dùng (Ví dụ: về Trang chủ)
      navigate('/');
    } catch (err) {
      // Bắt lỗi nếu API trả về 401 Unauthorized
      setError('Email hoặc mật khẩu không chính xác!');
      console.error('Lỗi đăng nhập:', err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Đăng Nhập</h2>

              {/* Hiển thị thông báo lỗi nếu có */}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} required placeholder="Nhập email của bạn" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mật khẩu</label>
                  <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Nhập mật khẩu" />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Đăng Nhập
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
