const ProductColorTable = ({ colors, onEdit, onDelete }) => {
  return (
    <div className="m-2 bg-white rounded-3 mb-3 shadow-sm">
      <table className="table table-bordered table-hover mb-0">
        <thead>
          <tr className="text-center">
            <th className="bg-primary text-white">ID</th>
            <th className="bg-primary text-white">Tên màu</th>
            <th className="bg-primary text-white">Mã màu (Hex) / Kiểu</th>
            <th className="bg-primary text-white">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {colors && colors.length > 0 ? (
            colors.map(color => (
              <tr key={color.id} className="align-middle">
                <td className="text-center">{color.id}</td>
                <td className="text-center fw-bold">{color.name}</td>
                <td className="text-center">{color.hexCode}</td>
                <td className="text-center">
                  <div className="btn-group">
                    <button className="btn btn-sm btn-outline-warning mx-1" title="Sửa" onClick={() => onEdit(color)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger mx-1" title="Xóa" onClick={() => onDelete(color.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                Chưa có dữ liệu màu sắc
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductColorTable;
