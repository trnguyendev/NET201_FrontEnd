import React, { useEffect, useState } from 'react';
import orderService from '@/services/orderService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const statusConfig = {
    0: { label: 'Chờ xác nhận', class: 'bg-warning text-dark' },
    1: { label: 'Đang giao hàng', class: 'bg-primary' },
    2: { label: 'Hoàn thành', class: 'bg-success' },
    3: { label: 'Đã hủy', class: 'bg-secondary' } // User nhìn thấy màu xám nhẹ nhàng hơn
  };

  useEffect(() => {
    fetchMyOrders();
  }, []);

  const fetchMyOrders = async () => {
    try {
      setLoading(true);
      const res = await orderService.getMyOrders();
      const data = res.data ? res.data : res;
      setOrders(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Không thể tải lịch sử mua hàng.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async orderId => {
    const confirm = await Swal.fire({
      title: 'Hủy đơn hàng?',
      text: 'Bạn có chắc chắn muốn hủy đơn hàng này không? Thao tác này không thể hoàn tác.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Có, Hủy đơn!',
      cancelButtonText: 'Không'
    });

    if (confirm.isConfirmed) {
      try {
        await orderService.cancelMyOrder(orderId);
        Swal.fire('Thành công!', 'Đơn hàng của bạn đã được hủy.', 'success');
        fetchMyOrders(); // Tải lại danh sách
      } catch (error) {
        // Lấy câu thông báo lỗi từ backend trả về
        const errorMsg = error.response?.data?.message || 'Có lỗi xảy ra khi hủy đơn!';
        toast.error(errorMsg);
      }
    }
  };

  const formatPrice = price => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  if (loading)
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container mt-4 mb-5">
      <h3 className="mb-4 fw-bold">Đơn hàng của tôi</h3>

      {orders.length === 0 ? (
        <div className="text-center py-5 bg-light rounded">
          <i className="bi bi-box-seam text-muted" style={{ fontSize: '3rem' }}></i>
          <p className="mt-3 text-muted">Bạn chưa có đơn hàng nào.</p>
          <Link to="/" className="btn btn-outline-primary mt-2">
            Tiếp tục mua sắm
          </Link>
        </div>
      ) : (
        <div className="row g-4">
          {orders.map(order => (
            <div className="col-12" key={order.id}>
              <div className="card shadow-sm border-0">
                <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center pt-3 pb-0">
                  <span className="fw-bold text-secondary">Đơn hàng #{order.id}</span>
                  <span className={`badge ${statusConfig[order.status]?.class || 'bg-secondary'} px-3 py-2`}>{statusConfig[order.status]?.label}</span>
                </div>

                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <p className="mb-1">
                        <strong>Ngày đặt:</strong> {new Date(order.orderDate).toLocaleString('vi-VN')}
                      </p>
                      <p className="mb-1">
                        <strong>Nhận tại:</strong> {order.shippingAddress}
                      </p>
                      <p className="mb-0">
                        <strong>Thanh toán:</strong> {order.paymentMethod}
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end mt-3 mt-md-0">
                      <p className="text-muted mb-1">Tổng tiền</p>
                      <h4 className="text-danger fw-bold mb-3">{formatPrice(order.totalAmount)}</h4>

                      {/* CHỈ HIỂN THỊ NÚT HỦY KHI STATUS === 0 (Chờ xác nhận) */}
                      {order.status === 0 && (
                        <button onClick={() => handleCancelOrder(order.id)} className="btn btn-outline-danger btn-sm px-4">
                          Hủy đơn hàng
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
