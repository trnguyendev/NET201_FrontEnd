import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext'; // Cập nhật đường dẫn đúng
import orderService from '@/services/orderService'; // Cập nhật đường dẫn đúng
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Cart = () => {
  const { cartItems, removeFromCart, addToCart, clearCart, cartTotalAmount } = useCart();
  const navigate = useNavigate();
  const backendUrl = 'https://localhost:7012/'; // Sửa port nếu cần

  // State cho Form đặt hàng
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    shippingAddress: '',
    paymentMethod: 'COD'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Xử lý thay đổi số lượng (+/-)
  const handleQuantityChange = (item, amount) => {
    if (amount === 1 && item.quantity >= item.maxStock) {
      toast.warning('Đã đạt số lượng tồn kho tối đa!');
      return;
    }
    if (amount === -1 && item.quantity <= 1) return; // Không cho giảm xuống 0 (muốn xóa thì bấm nút Xóa)

    // Tái sử dụng hàm addToCart để update số lượng (vì logic trong context đã cover)
    addToCart({ id: item.productId }, { colorId: item.colorId, sizeId: item.sizeId }, amount);
  };

  const handleInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckout = async e => {
    e.preventDefault();
    if (cartItems.length === 0) return toast.warning('Giỏ hàng trống!');

    // Chuyển đổi data giỏ hàng khớp với Backend DTO
    const orderItems = cartItems.map(item => ({
      productId: item.productId,
      colorId: item.colorId,
      sizeId: item.sizeId,
      quantity: item.quantity
    }));

    const checkoutData = {
      ...formData,
      items: orderItems
    };

    try {
      setIsSubmitting(true);
      await orderService.checkout(checkoutData);

      clearCart(); // Đặt hàng xong thì xóa giỏ

      Swal.fire({
        icon: 'success',
        title: 'Đặt hàng thành công!',
        text: 'Cảm ơn bạn đã mua sắm. Chúng tôi sẽ sớm liên hệ xác nhận đơn hàng.',
        confirmButtonText: 'Tiếp tục mua sắm'
      }).then(() => {
        navigate('/'); // Quay về trang chủ
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = price => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center py-5">
        <i className="bi bi-cart-x text-muted" style={{ fontSize: '5rem' }}></i>
        <h3 className="mt-3">Giỏ hàng của bạn đang trống</h3>
        <p className="text-muted">Có vẻ như bạn chưa thêm sản phẩm nào vào giỏ hàng.</p>
        <Link to="/" className="btn btn-primary mt-3 px-4 py-2">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5 mb-5">
      <h2 className="fw-bold mb-4">Giỏ hàng của bạn</h2>
      <div className="row g-4">
        {/* BÊN TRÁI: DANH SÁCH SẢN PHẨM */}
        <div className="col-lg-8">
          <div className="card shadow-sm border-0">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="ps-4">
                        Sản phẩm
                      </th>
                      <th scope="col">Phân loại</th>
                      <th scope="col" className="text-center">
                        Đơn giá
                      </th>
                      <th scope="col" className="text-center">
                        Số lượng
                      </th>
                      <th scope="col" className="text-end pe-4">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index}>
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <img src={item.thumbnail ? `${backendUrl}${item.thumbnail}` : '/placeholder-image.png'} alt={item.name} className="rounded me-3 object-fit-cover" style={{ width: '60px', height: '60px' }} />
                            <div>
                              <Link to={`/details/${item.productId}`} className="text-dark text-decoration-none fw-bold d-block mb-1">
                                {item.name}
                              </Link>
                              <button onClick={() => removeFromCart(item.productId, item.colorId, item.sizeId)} className="btn btn-link text-danger p-0 text-decoration-none small">
                                <i className="bi bi-trash"></i> Xóa
                              </button>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-secondary me-1">{item.colorName}</span>
                          <span className="badge bg-secondary">{item.sizeName}</span>
                        </td>
                        <td className="text-center text-muted fw-medium">{formatPrice(item.price)}</td>
                        <td className="text-center">
                          <div className="input-group input-group-sm mx-auto" style={{ width: '100px' }}>
                            <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(item, -1)}>
                              -
                            </button>
                            <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                            <button className="btn btn-outline-secondary" onClick={() => handleQuantityChange(item, 1)}>
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-end pe-4 fw-bold text-danger">{formatPrice(item.price * item.quantity)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* BÊN PHẢI: FORM THANH TOÁN */}
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 sticky-top" style={{ top: '20px' }}>
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3 border-bottom pb-2">Thông tin đặt hàng</h5>

              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Tổng số sản phẩm:</span>
                <span className="fw-bold">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
              </div>
              <div className="d-flex justify-content-between mb-4">
                <span className="text-muted fs-5">Tạm tính:</span>
                <span className="fw-bold text-danger fs-4">{formatPrice(cartTotalAmount)}</span>
              </div>

              <form onSubmit={handleCheckout}>
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">
                    Họ và tên <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" name="customerName" value={formData.customerName} onChange={handleInputChange} required placeholder="Nhập họ và tên" />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">
                    Số điện thoại <span className="text-danger">*</span>
                  </label>
                  <input type="tel" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required placeholder="Nhập số điện thoại" />
                </div>
                <div className="mb-3">
                  <label className="form-label small text-muted mb-1">
                    Địa chỉ giao hàng <span className="text-danger">*</span>
                  </label>
                  <textarea className="form-control" name="shippingAddress" rows="2" value={formData.shippingAddress} onChange={handleInputChange} required placeholder="Số nhà, đường, phường/xã..."></textarea>
                </div>
                <div className="mb-4">
                  <label className="form-label small text-muted mb-1">Phương thức thanh toán</label>
                  <select className="form-select" name="paymentMethod" value={formData.paymentMethod} onChange={handleInputChange}>
                    <option value="COD">Thanh toán khi nhận hàng (COD)</option>
                    <option value="Banking">Chuyển khoản ngân hàng</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-danger w-100 py-3 fw-bold fs-5" disabled={isSubmitting}>
                  {isSubmitting ? <span className="spinner-border spinner-border-sm me-2"></span> : <i className="bi bi-cart-check me-2"></i>}
                  ĐẶT HÀNG NGAY
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
