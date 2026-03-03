import React, { useState, useEffect } from 'react';
import userService from '@/services/userService';
import { toast } from 'react-toastify';

const EditUserModal = ({ show, handleClose, userId, onSuccess }) => {
  // State lưu trữ dữ liệu form
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    role: ''
  });

  const [loading, setLoading] = useState(false); // Trạng thái nút Lưu
  const [fetching, setFetching] = useState(false); // Trạng thái đang tải dữ liệu ban đầu

  // Mỗi khi Modal mở lên và có userId, gọi API lấy chi tiết (để lấy được Role hiện tại)
  useEffect(() => {
    if (show && userId) {
      const fetchUserDetail = async () => {
        try {
          setFetching(true);
          const data = await userService.getUserById(userId);
          setFormData({
            email: data.email || '',
            fullName: data.fullName || '',
            phoneNumber: data.phoneNumber || '',
            role: data.role || 'User' // Mặc định là User nếu chưa có quyền
          });
        } catch (error) {
          toast.error('Không thể tải chi tiết người dùng!');
          handleClose(); // Đóng modal nếu lỗi
        } finally {
          setFetching(false);
        }
      };
      fetchUserDetail();
    }
  }, [show, userId, handleClose]);

  // Hàm xử lý khi gõ vào các ô input
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Hàm xử lý khi bấm Lưu
  const handleSubmit = async e => {
    e.preventDefault(); // Chặn hành vi load lại trang của Form
    try {
      setLoading(true);
      // Gọi API Update (Chỉ gửi FullName, PhoneNumber, Role theo đúng DTO Backend)
      await userService.updateUser(userId, {
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        role: formData.role
      });

      toast.success('Cập nhật người dùng thành công!');
      onSuccess(); // Báo cho Component cha (UserPage) biết để tải lại danh sách
      handleClose(); // Đóng modal
    } catch (error) {
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật!');
    } finally {
      setLoading(false);
    }
  };

  // Nếu prop show = false thì ẩn component này đi
  if (!show) return null;

  return (
    <>
      {/* Lớp phủ đen mờ */}
      <div className="modal-backdrop fade show"></div>

      {/* Khung Modal */}
      <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow">
            {/* Header */}
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">Cập nhật thông tin</h5>
              <button type="button" className="btn-close btn-close-white" onClick={handleClose}></button>
            </div>

            {/* Body */}
            <div className="modal-body">
              {fetching ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status"></div>
                  <p className="mt-2 text-muted">Đang tải thông tin...</p>
                </div>
              ) : (
                <form id="editUserForm" onSubmit={handleSubmit}>
                  {/* Email (Khóa - Không cho sửa) */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Email tài khoản</label>
                    <input
                      type="email"
                      className="form-control text-muted"
                      value={formData.email}
                      disabled // 👉 Bắt buộc khóa
                    />
                    <small className="text-danger fst-italic">* Email dùng để đăng nhập nên không thể thay đổi</small>
                  </div>

                  {/* Họ và tên */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Họ và tên</label>
                    <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Nhập họ và tên..." />
                  </div>

                  {/* Số điện thoại */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Số điện thoại</label>
                    <input type="text" className="form-control" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="Nhập số điện thoại..." />
                  </div>

                  {/* Quyền (Role) */}
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Phân quyền</label>
                    <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
                      <option value="User">Khách hàng (User)</option>
                      <option value="Admin">Quản trị viên (Admin)</option>
                    </select>
                  </div>
                </form>
              )}
            </div>

            {/* Footer */}
            <div className="modal-footer bg-light">
              <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={loading}>
                Hủy bỏ
              </button>
              <button type="submit" form="editUserForm" className="btn btn-primary px-4" disabled={loading || fetching}>
                {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : null}
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditUserModal;
