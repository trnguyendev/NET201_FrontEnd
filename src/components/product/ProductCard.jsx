import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const backendUrl = 'https://localhost:7012'; // Sửa lại đúng port của bạn

  // Hàm format tiền tệ
  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    // Dùng d-flex align-items-stretch để các card cao bằng nhau dù tên dài ngắn khác nhau
    <div className="col-lg-4 col-md-6 col-sm-6 mb-4 d-flex align-items-stretch">
      <div className="card h-100 shadow-sm border-0 product-card w-100 overflow-hidden">
        {/* Badge Thương Hiệu (Nổi trên ảnh) */}
        {product.brandName && <span className="badge bg-danger position-absolute m-2 z-1 shadow-sm">{product.brandName}</span>}

        {/* Khung chứa ảnh có hiệu ứng zoom */}
        <Link to={`/details/${product.id}`} className="img-wrapper overflow-hidden bg-light">
          <img
            src={product.thumbnail ? `${backendUrl}/${product.thumbnail}` : '/placeholder-image.png'}
            className="card-img-top product-img"
            alt={product.name}
            style={{ height: '220px', objectFit: 'contain', padding: '10px' }} // contain để ảnh không bị cắt mất phần giày/áo
            onError={e => {
              e.target.onerror = null;
              e.target.src = '/placeholder-image.png';
            }}
          />
        </Link>

        {/* Thông tin sản phẩm */}
        <div className="card-body d-flex flex-column p-3">
          <p className="text-muted small mb-1 fw-semibold">{product.categoryName || 'Sản phẩm'}</p>

          <Link to={`/details/${product.id}`} className="text-decoration-none text-dark">
            <h6 className="text-uppercase fw-bold product-title" title={product.name}>
              {product.name}
            </h6>
          </Link>

          {/* Cụm Giá & Nút bấm ép xuống đáy card */}
          <div className="mt-auto pt-2">
            <p className="text-danger fw-bold fs-5 mb-3">{formatPrice(product.basePrice)}</p>

            <div className="d-flex gap-2">
              <Link to={`/details/${product.id}`} className="btn btn-outline-primary flex-grow-1 fw-semibold">
                Chi tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
