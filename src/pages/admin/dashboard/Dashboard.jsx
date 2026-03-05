import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilMoney, cilCart, cilTags, cilPeople } from '@coreui/icons';
import dashboardService from '@/services/dashboardService';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await dashboardService.getSummary();
        setData(response);
      } catch (error) {
        toast.error('Lỗi khi tải dữ liệu thống kê!');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Hàm format tiền tệ VNĐ
  const formatCurrency = amount => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Hàm render màu sắc cho trạng thái đơn hàng
  const getBadgeColor = status => {
    switch (status?.toLowerCase()) {
      case 'chờ xác nhận':
        return 'bg-warning text-dark';
      case 'đang giao':
        return 'bg-info text-white';
      case 'hoàn thành':
        return 'bg-success text-white';
      case 'đã hủy':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4 fw-bold text-primary">Tổng quan Cửa hàng</h2>

      {/* 4 Ô THỐNG KÊ CƠ BẢN */}
      <CRow className="mb-4">
        <CCol sm={6} lg={3}>
          <CCard className="bg-primary text-white shadow-sm mb-3">
            <CCardBody className="d-flex align-items-center">
              <CIcon icon={cilMoney} size="3xl" className="me-3 opacity-75" />
              <div>
                <div className="fs-4 fw-bold">{formatCurrency(data.totalRevenue)}</div>
                <div className="text-uppercase small fw-semibold">Tổng doanh thu</div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="bg-info text-white shadow-sm mb-3">
            <CCardBody className="d-flex align-items-center">
              <CIcon icon={cilCart} size="3xl" className="me-3 opacity-75" />
              <div>
                <div className="fs-4 fw-bold">{data.totalOrders}</div>
                <div className="text-uppercase small fw-semibold">Tổng đơn hàng</div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="bg-success text-white shadow-sm mb-3">
            <CCardBody className="d-flex align-items-center">
              <CIcon icon={cilTags} size="3xl" className="me-3 opacity-75" />
              <div>
                <div className="fs-4 fw-bold">{data.totalProducts}</div>
                <div className="text-uppercase small fw-semibold">Sản phẩm hiện có</div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol sm={6} lg={3}>
          <CCard className="bg-warning text-white shadow-sm mb-3">
            <CCardBody className="d-flex align-items-center">
              <CIcon icon={cilPeople} size="3xl" className="me-3 opacity-75" />
              <div>
                <div className="fs-4 fw-bold">{data.totalCustomers}</div>
                <div className="text-uppercase small fw-semibold">Khách hàng</div>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* BẢNG 5 ĐƠN HÀNG MỚI NHẤT */}
      <CRow>
        <CCol xs={12}>
          <CCard className="shadow-sm">
            <CCardHeader className="bg-white py-3">
              <h5 className="mb-0 fw-bold">Đơn hàng mới nhất</h5>
            </CCardHeader>
            <CCardBody>
              <CTable hover responsive align="middle">
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>Mã Đơn</CTableHeaderCell>
                    <CTableHeaderCell>Khách hàng</CTableHeaderCell>
                    <CTableHeaderCell>Ngày đặt</CTableHeaderCell>
                    <CTableHeaderCell>Tổng tiền</CTableHeaderCell>
                    <CTableHeaderCell>Trạng thái</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.recentOrders && data.recentOrders.length > 0 ? (
                    data.recentOrders.map((order, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell className="fw-semibold">#ORD-{order.id}</CTableDataCell>
                        <CTableDataCell>{order.customerName}</CTableDataCell>
                        <CTableDataCell>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</CTableDataCell>
                        <CTableDataCell className="fw-bold text-danger">{formatCurrency(order.totalAmount)}</CTableDataCell>
                        <CTableDataCell>
                          <span className={`badge ${getBadgeColor(order.status)} px-2 py-1`}>{order.status || 'Chờ xử lý'}</span>
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan="5" className="text-center text-muted py-4">
                        Chưa có đơn hàng nào trong hệ thống.
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
