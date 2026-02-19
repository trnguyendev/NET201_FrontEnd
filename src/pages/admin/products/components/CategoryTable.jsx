const CategoryTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className="m-2 bg-white rounded-3 mb-3 shadow-sm">
      <table className="table table-bordered table-hover mb-0">
        <thead>
          <tr className="text-center">
            <th className="bg-primary text-white">ID</th>
            <th className="bg-primary text-white">Tên loại sản phẩm</th>
            <th className="bg-primary text-white">Thứ tự hiển thị</th>
            <th className="bg-primary text-white">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map(category => (
              <tr key={category.id} className="align-middle">
                <td className="text-center">{category.id}</td>
                <td>{category.name}</td>
                <td className="text-center">{category.displayOrder}</td>
                <td className="text-center">
                  <div className="btn-group">
                    {/* Nút Sửa: Truyền toàn bộ object category lên cha */}
                    <button className="btn btn-sm btn-outline-warning mx-1" title="Sửa" onClick={() => onEdit(category)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    {/* Nút Xóa */}
                    <button className="btn btn-sm btn-outline-danger mx-1" title="Xóa" onClick={() => onDelete(category.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                Chưa có dữ liệu loại sản phẩm
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
