const SizeTable = ({ sizes, onEdit, onDelete }) => {
  return (
    <div className="m-2 bg-white rounded-3 mb-3 shadow-sm">
      <table className="table table-bordered table-hover mb-0">
        <thead>
          <tr className="text-center">
            <th className="bg-primary text-white">ID</th>
            {/* Đã sửa tiêu đề cột */}
            <th className="bg-primary text-white">Kích thước (Size)</th>
            <th className="bg-primary text-white">Kiểu (Loại)</th>
            <th className="bg-primary text-white">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sizes.length > 0 ? (
            sizes.map(size => (
              <tr key={size.id} className="align-middle">
                <td className="text-center">{size.id}</td>
                <td className="text-center fw-bold">{size.name}</td> {/* Thêm in đậm cho dễ nhìn */}
                <td className="text-center">{size.type}</td>
                <td className="text-center">
                  <div className="btn-group">
                    {/* Nút Sửa: Truyền toàn bộ object size lên cha */}
                    <button className="btn btn-sm btn-outline-warning mx-1" title="Sửa" onClick={() => onEdit(size)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    {/* Nút Xóa */}
                    <button className="btn btn-sm btn-outline-danger mx-1" title="Xóa" onClick={() => onDelete(size.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* Đã sửa câu thông báo */}
              <td colSpan="4" className="text-center py-4 text-muted">
                Chưa có dữ liệu Size
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SizeTable;
