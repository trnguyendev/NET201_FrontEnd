import logoTN from '@/assets/images/logoTN.png';

const Footer = () => {
  return (
    <footer className="border-top card-footer text-white bg-sport-main mt-0 d-flex flex-column">
      <div className="container pt-4">
        <div className="row">
          {/* Logo + mô tả */}
          <div className="col-md-4 mb-3">
            <h5 className="mb-3 d-flex align-items-center">
              <img src={logoTN} alt="TN Sport Logo" style={{ width: '35px' }} className="me-2" />
              TN SPORT
            </h5>

            <p className="small" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
              Chuyên cung cấp các sản phẩm thể thao chất lượng cao, phục vụ đam mê luyện tập và phong cách sống khỏe mạnh của bạn.
            </p>

            <div className="mt-3">
              <a href="https://www.facebook.com/trnguyen2070?locale=vi_VN" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-facebook fs-5"></i>
              </a>

              <a href="https://www.instagram.com/ntnguyen545/" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-instagram fs-5"></i>
              </a>

              <a href="https://www.youtube.com/@NguyenNT38" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                <i className="bi bi-youtube fs-5"></i>
              </a>

              <a href="https://www.tiktok.com/@tr_nguyen151007?lang=vi-VN" target="_blank" rel="noopener noreferrer" className="text-white">
                <i className="bi bi-tiktok fs-5"></i>
              </a>
            </div>
          </div>

          {/* Liên kết */}
          <div className="col-md-2 col-6 mb-3">
            <h6 className="mb-3">Liên kết</h6>
            <ul className="list-unstyled small">
              <li className="mb-3">
                <a href="/" className="text-white text-decoration-none">
                  Trang chủ
                </a>
              </li>
              <li className="mb-3">
                <a href="/products" className="text-white text-decoration-none">
                  Sản phẩm
                </a>
              </li>
              <li className="mb-3">
                <a href="/about" className="text-white text-decoration-none">
                  Giới thiệu
                </a>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ */}
          <div className="col-md-3 col-6 mb-3">
            <h6 className="mb-3">Hỗ trợ khách hàng</h6>
            <ul className="list-unstyled small">
              <li className="mb-3">
                <a href="#" className="text-white text-decoration-none">
                  Chính sách đổi trả
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white text-decoration-none">
                  Hướng dẫn mua hàng
                </a>
              </li>
              <li className="mb-3">
                <a href="#" className="text-white text-decoration-none">
                  Chính sách bảo mật
                </a>
              </li>
            </ul>
          </div>

          {/* Liên hệ */}
          <div className="col-md-3 mb-3">
            <h6 className="mb-3">Liên hệ</h6>
            <ul className="list-unstyled small">
              <li className="mb-3">
                <i className="bi bi-geo-alt-fill me-2"></i>
                Đà Nẵng, Việt Nam
              </li>

              <li className="mb-3">
                <i className="bi bi-telephone-fill me-2"></i>
                <a href="tel:0709565352" className="text-white text-decoration-none">
                  070 956 5352
                </a>
              </li>

              <li className="mb-3">
                <i className="bi bi-envelope-fill me-2"></i>
                <a href="mailto:nguyennttd01427@gmail.com" className="text-white text-decoration-none">
                  nguyennttd01427@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-3 border-light opacity-25" />

        {/* Copyright */}
        <div className="row mb-4">
          <div className="col-md-6 text-center text-md-start small">
            <p className="mb-0">© 2025 TN SPORT. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end small">
            <p className="mb-0">
              Developed by Nguyễn Trung Nguyên <i className="bi bi-fingerprint"></i>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
