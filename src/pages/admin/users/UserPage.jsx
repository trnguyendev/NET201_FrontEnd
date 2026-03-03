import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import userService from '@/services/userService';
import Pagination from '@/components/common/Pagination';
import EditUserModal from './EditUserModal';
import { toast } from 'react-toastify';

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10;

  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async page => {
    try {
      setLoading(true);
      const data = await userService.getAllUsers(page, limit);
      setUsers(data.items);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Lỗi khi tải danh sách User:', error);
      toast.error('Không thể tải danh sách người dùng!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

  const handleToggleStatus = async id => {
    if (!window.confirm('Bạn có chắc chắn muốn thay đổi trạng thái tài khoản này?')) return;

    try {
      await userService.toggleUserStatus(id);
      toast.success('Cập nhật trạng thái thành công!');

      // Cập nhật lại state ảo trên giao diện để User đổi màu ngay lập tức (không cần gọi lại API get list)
      setUsers(users.map(user => (user.id === id ? { ...user, isActive: !user.isActive } : user)));
    } catch (error) {
      console.log(error);
      toast.error('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  const handleEdit = user => {
    setSelectedUserId(user.id);
    setShowModal(true);
  };

  const handleModalSuccess = () => {
    fetchUsers(currentPage);
  };
  return (
    <div className="container-fluid px-2">
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3 text-muted">Đang tải dữ liệu...</p>
        </div>
      ) : (
        <>
          <UserTable currentPage={currentPage} limit={limit} users={users} onEdit={handleEdit} onToggleStatus={handleToggleStatus} />
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} isAdmin={true} />
        </>
      )}

      <EditUserModal show={showModal} handleClose={() => setShowModal(false)} userId={selectedUserId} onSuccess={handleModalSuccess} />
    </div>
  );
};

export default UserPage;
