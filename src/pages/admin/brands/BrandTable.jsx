const BrandTable = ({ brands, onEdit, onDelete }) => {
  const backendUrl = 'https://localhost:7012';
  return (
    <div className="m-2 bg-white rounded-3 mb-3 shadow-sm">
      <table className="table table-bordered table-hover mb-0">
        <thead>
          <tr className="text-center">
            <th className="bg-primary text-white">ID</th>
            <th className="bg-primary text-white">Tên thương hiệu</th>
            <th className="bg-primary text-white">Logo thương hiệu</th>
            <th className="bg-primary text-white">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {brands.length > 0 ? (
            brands.map(brand => (
              <tr key={brand.id} className="align-middle">
                <td className="text-center">{brand.id}</td>
                <td className="text-center">{brand.name}</td>
                {/* HIỂN THỊ HÌNH ẢNH THAY VÌ TEXT */}
                <td className="text-center">
                  {brand.logoUrl ? (
                    <img
                      src={`${backendUrl}/${brand.logoUrl}`}
                      alt={`Logo ${brand.name}`}
                      style={{ height: '50px', objectFit: 'contain' }} // CSS nội tuyến để ảnh không bị vỡ
                      onError={e => {
                        e.target.onerror = null; // Tránh lặp vô hạn nếu ảnh thay thế cũng lỗi
                        e.target.src = '/placeholder-image.png'; // Ảnh mặc định nếu URL lỗi (cần có file này trong thư mục public của React)
                      }}
                    />
                  ) : (
                    <span className="text-muted fst-italic">Chưa có logo</span>
                  )}
                </td>
                <td className="text-center">
                  <div className="btn-group">
                    {/* Nút Sửa: Truyền toàn bộ object category lên cha */}
                    <button className="btn btn-sm btn-outline-warning mx-1" title="Sửa" onClick={() => onEdit(brand)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    {/* Nút Xóa */}
                    <button className="btn btn-sm btn-outline-danger mx-1" title="Xóa" onClick={() => onDelete(brand.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-muted">
                Chưa có dữ liệu thương hiệu
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BrandTable;
