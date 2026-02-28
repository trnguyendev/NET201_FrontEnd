import { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Trích xuất username/email từ Token
  const userName = user ? user['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || 'User' : '';

  // Mẹo nhỏ: Cắt chuỗi email để lấy phần tên hiển thị cho gọn (vd: nguyennttd01427)
  const displayName = userName.includes('@') ? userName.split('@')[0] : userName;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-sport-main py-2" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-white" to="/">
          TN Sport
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link active text-white" to="/">
                Trang chủ
              </Link>
            </li>
            <li className="nav-item dropdown">
              <NavLink className="nav-link dropdown-toggle text-white" to="#" role="button" data-bs-toggle="dropdown">
                Sản phẩm
              </NavLink>
              <ul className="dropdown-menu shadow-sm">
                <li>
                  <Link className="dropdown-item" to="/products">
                    Quần áo
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/shoes">
                    Giày
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/accessories">
                    Phụ kiện
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/cart">
                Giỏ hàng
              </Link>
            </li>
          </ul>

          <form className="d-flex me-0 me-lg-4 mb-3 mb-lg-0" role="search">
            <div className="input-group input-group-sm">
              <input className="form-control bg-white text-dark shadow-none border-0" type="search" placeholder="Tìm kiếm sản phẩm..." />
              <button className="btn btn-success px-2" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* Account */}
          <ul className="navbar-nav mb-2 mb-lg-0">
            {user ? (
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle d-flex align-items-center gap-2 text-white p-0" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <i className="bi bi-person-circle fs-3"></i>
                  <span className="fw-semibold">{displayName}</span>
                </a>

                <ul className="dropdown-menu dropdown-menu-end shadow mt-2">
                  <li className="px-3 py-2 border-bottom">
                    <small className="text-muted d-block">Tài khoản của bạn</small>
                    <strong className="text-truncate d-inline-block" style={{ maxWidth: '200px' }}>
                      {userName}
                    </strong>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 mt-1" to="/profile">
                      <i className="bi bi-person-vcard me-2"></i> Hồ sơ cá nhân
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 mt-1" to="/orders">
                      <i className="bi bi-receipt me-2"></i>Đơn hàng của tôi
                    </Link>
                  </li>

                  {user.roles && user.roles.includes('Admin') && (
                    <li>
                      <Link className="dropdown-item py-2 text-primary fw-semibold" to="/admin">
                        <i className="bi bi-gear-fill me-2"></i> Trang quản trị
                      </Link>
                    </li>
                  )}

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <button className="dropdown-item py-2 text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item d-flex align-items-center gap-2">
                <Link className="btn btn-outline-light btn-sm px-3 rounded-2" to="/login">
                  Đăng nhập
                </Link>
                <Link className="btn btn-warning btn-sm px-3 rounded-2 fw-semibold" to="/register">
                  Đăng ký
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
