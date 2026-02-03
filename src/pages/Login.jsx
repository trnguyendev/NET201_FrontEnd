import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className="row justify-content-center my-3">
        <h1 className="fs-3 text-center fw-bold mb-4">Đăng nhập tài khoản</h1>
        <div className="bg-white p-4 rounded-3 col-10 col-lg-5 shadow">
          <form>
            <div className="mb-4">
              <label htmlFor="" className="form-label fw-bold">
                Email:
              </label>
              <input type="email" className="form-control" />
            </div>

            <div className="mb-4">
              <label htmlFor="" className="form-label fw-bold">
                Mật khẩu:
              </label>
              <input type="password" className="form-control" />
            </div>
            <div className="mb-4">
              <button className="btn btn-primary w-100">Đăng nhập</button>
            </div>
            <div className="text-center mt-4">
              <span className="text-muted">Chưa có tài khoản?</span>{' '}
              <Link to="/register" className="fw-semibold text-primary text-decoration-none">
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
