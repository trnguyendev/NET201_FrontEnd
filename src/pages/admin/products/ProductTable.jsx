const ProductTable = ({ products, onEdit, onDelete, onManageVariants }) => {
  const backendUrl = 'https://localhost:7012';

  // Hàm format tiền tệ VNĐ
  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="m-2 bg-white rounded-3 mb-3 shadow-sm table-responsive">
      <table className="table table-bordered table-hover mb-0 align-middle">
        <thead>
          <tr className="text-center">
            <th className="bg-primary text-white">ID</th>
            <th className="bg-primary text-white">Ảnh</th>
            <th className="bg-primary text-white">Tên sản phẩm</th>
            <th className="bg-primary text-white">Giá cơ bản</th>
            <th className="bg-primary text-white">Trạng thái</th>
            <th className="bg-primary text-white">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td className="text-center">{product.id}</td>
                <td className="text-center">
                  {product.thumbnail ? (
                    <img
                      src={`${backendUrl}/${product.thumbnail}`}
                      alt={product.name}
                      style={{ height: '50px', width: '50px', objectFit: 'cover', borderRadius: '4px' }}
                      onError={e => {
                        e.target.onerror = null;
                        e.target.src = '/placeholder-image.png';
                      }}
                    />
                  ) : (
                    <span className="text-muted small">Chưa có ảnh</span>
                  )}
                </td>
                <td className="fw-bold">{product.name}</td>
                <td className="text-center text-danger fw-bold">{formatPrice(product.basePrice)}</td>
                <td className="text-center">{product.isActive ? <span className="badge bg-success">Đang bán</span> : <span className="badge bg-secondary">Đã ẩn</span>}</td>
                <td className="text-center">
                  <div className="btn-group">
                    {/* Nút này sau sẽ dẫn sang trang quản lý Biến thể (Variants) */}
                    <button className="btn btn-sm btn-outline-info mx-1" title="Quản lý biến thể" onClick={() => onManageVariants(product)}>
                      <i className="bi bi-gear"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-warning mx-1" title="Sửa thông tin" onClick={() => onEdit(product)}>
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-danger mx-1" title="Xóa" onClick={() => onDelete(product.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-muted">
                Chưa có dữ liệu sản phẩm
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
