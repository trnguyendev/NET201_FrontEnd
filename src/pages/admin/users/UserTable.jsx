const UserTable = ({ currentPage, limit, users, onEdit, onToggleStatus }) => {
  return (
    <div className="m-2 bg-white rounded-3 mb-3 shadow-sm overflow-hidden">
      <table className="table table-bordered table-hover mb-0">
        <thead className="table-light">
          <tr className="text-center align-middle">
            <th className="bg-primary text-white" style={{ width: '60px' }}>
              STT
            </th>
            <th className="bg-primary text-white">Email</th>
            <th className="bg-primary text-white">Họ và tên</th>
            <th className="bg-primary text-white">Số điện thoại</th>
            <th className="bg-primary text-white">Trạng thái</th>
            <th className="bg-primary text-white">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user, index) => {
              const stt = (currentPage - 1) * limit + index + 1;
              return (
                <tr key={user.id} className="align-middle">
                  <td className="text-center fw-bold text-secondary">{stt}</td>
                  <td className="fw-semibold">{user.email}</td>
                  <td>{user.fullName ? user.fullName : <span className="text-muted fst-italic">Chưa cập nhật</span>}</td>
                  <td className="text-center">{user.phoneNumber ? user.phoneNumber : <span className="text-muted fst-italic">---</span>}</td>
                  <td className="text-center">{user.isActive ? <span className="badge bg-success px-3 py-2">Hoạt động</span> : <span className="badge bg-danger px-3 py-2">Bị khóa</span>}</td>
                  <td className="text-center">
                    <div className="btn-group">
                      <button className="btn btn-sm btn-outline-primary mx-1" title="Chỉnh sửa thông tin" onClick={() => onEdit(user)}>
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button className={`btn btn-sm mx-1 ${user.isActive ? 'btn-outline-danger' : 'btn-outline-success'}`} title={user.isActive ? 'Khóa tài khoản' : 'Mở khóa tài khoản'} onClick={() => onToggleStatus(user.id)}>
                        <i className={`bi ${user.isActive ? 'bi-lock-fill' : 'bi-unlock-fill'}`}></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-5 text-muted">
                <i className="bi bi-people display-4 d-block mb-3 text-secondary"></i>
                Chưa có dữ liệu người dùng
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
