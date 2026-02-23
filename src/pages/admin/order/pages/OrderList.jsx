import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Định nghĩa nhãn trạng thái
  const statusConfig = {
    0: { label: 'Chờ xác nhận', class: 'bg-warning text-dark' },
    1: { label: 'Đang giao hàng', class: 'bg-primary' },
    2: { label: 'Hoàn thành', class: 'bg-success' },
    3: { label: 'Đã hủy', class: 'bg-danger' }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await orderService.getAllOrders();

      const data = response.data ? response.data : response;

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error('Dữ liệu không phải là mảng:', data);
        setOrders([]);
      }
    } catch (error) {
      console.error('Lỗi fetch đơn hàng:', error);
      toast.error('Không thể tải danh sách đơn hàng!');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const confirm = await Swal.fire({
      title: 'Xác nhận?',
      text: `Bạn muốn chuyển trạng thái đơn hàng sang ${statusConfig[newStatus].label}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    });

    if (confirm.isConfirmed) {
      try {
        await orderService.updateStatus(orderId, newStatus);
        toast.success('Cập nhật trạng thái thành công');
        loadOrders(); // Tải lại danh sách
      } catch (error) {
        toast.error('Lỗi khi cập nhật trạng thái');
      }
    }
  };

  const formatPrice = price => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );

  return (
    <div className="container-fluid px-4">
      <h1 className="mt-4">Quản lý đơn hàng</h1>
      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-dark text-white">
          <i className="bi bi-table me-1"></i> Danh sách đơn hàng mới nhất
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th>Mã ĐH</th>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Tổng tiền</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th className="text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(orders) && orders.length > 0 ? (
                  orders.map(order => (
                    <tr key={order.id}>
                      <td>
                        <strong>#{order.id}</strong>
                      </td>
                      <td>{order.customerName}</td>
                      <td>{order.phoneNumber}</td>
                      <td className="fw-bold text-danger">{formatPrice(order.totalAmount)}</td>
                      <td>{new Date(order.orderDate).toLocaleString('vi-VN')}</td>

                      {/* Cột Trạng thái */}
                      <td>
                        <span className={`badge ${statusConfig[order.status]?.class || 'bg-secondary'}`}>{statusConfig[order.status]?.label || 'Không xác định'}</span>
                      </td>

                      {/* Cột Thao tác (Dropdown) */}
                      <td className="text-center">
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="dropdown">
                            Chuyển trạng thái
                          </button>
                          <ul className="dropdown-menu">
                            {Object.keys(statusConfig).map(key => (
                              <li key={key}>
                                <button className="dropdown-item" onClick={() => handleStatusChange(order.id, parseInt(key))} disabled={order.status === parseInt(key)}>
                                  {statusConfig[key].label}
                                </button>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      Không có dữ liệu đơn hàng
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
