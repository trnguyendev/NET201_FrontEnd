import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <>
      <div className="row justify-content-center my-2">
        <h1 className="fs-3 text-center fw-bold mb-4">Đăng ký tài khoản</h1>
        <div className="bg-white p-4 rounded-3 col-10 col-lg-5 shadow">
          <form>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-bold">
                Email:
              </label>
              <input type="email" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-bold">
                Mật khẩu:
              </label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-bold">
                Xác nhận mật khẩu:
              </label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-bold">
                Họ và tên:
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-bold">
                Số điện thoại:
              </label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label htmlFor="" className="form-label fw-bold">
                Địa chỉ:
              </label>
              <input type="text" className="form-control" />
            </div>

            <div className="mb-3">
              <button className="btn btn-primary w-100">Đăng ký</button>
            </div>
            <div className="text-center mt-3    ">
              <span className="text-muted">Đã có tài khoản?</span>{' '}
              <Link to="/login" className="fw-semibold text-primary text-decoration-none">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Register;
