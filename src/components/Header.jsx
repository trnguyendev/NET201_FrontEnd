const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-sport-main text-white py-2" data-bs-theme="dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          TN Sport
        </a>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Trang chủ
              </a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                Sản phẩm
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Quần áo
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Giày
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Phụ kiện
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Dụng cụ
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Đơn hàng của tôi
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Giỏ hàng
              </a>
            </li>
          </ul>

          <form className="d-flex me-0 me-lg-3 mb-3 mb-lg-0" role="search">
            <div className="input-group input-group-sm">
              <input className="form-control bg-white text-dark shadow-none" type="search" placeholder="Nhập nội dung..." />
              <button className="btn btn-success" type="submit">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          <div className="d-flex align-items-center gap-2 me-2">
            <button className="btn btn-outline-light btn-sm px-3 rounded-2" to="login">
              Đăng nhập
            </button>
            <button className="btn btn-warning btn-sm px-3 rounded-2 fw-semibold" to="register">
              Đăng ký
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
