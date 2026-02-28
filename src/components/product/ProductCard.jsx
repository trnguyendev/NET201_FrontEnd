import { Link } from 'react-router-dom';
import { API_BASE_URL } from '@/utils/config';

const ProductCard = ({ product }) => {
  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="card h-100 border-0 shadow-sm custom-product-card overflow-hidden">
      {/* Badge Thương Hiệu */}
      {product.brandName && (
        <span className="position-absolute top-0 start-0 badge bg-danger m-2 px-2 py-1 z-1 rounded-1 shadow-sm" style={{ fontSize: '0.7rem' }}>
          {product.brandName}
        </span>
      )}

      {/* Vùng Hình Ảnh (Tỷ lệ 1:1, nền xám nhạt để nổi bật sản phẩm) */}
      <Link to={`/details/${product.id}`} className="overflow-hidden bg-light position-relative d-block img-wrapper" style={{ aspectRatio: '1/1' }}>
        <img
          src={product.thumbnail ? `${API_BASE_URL}/${product.thumbnail}` : '/placeholder-image.png'}
          className="product-img w-100 h-100"
          alt={product.name}
          style={{ objectFit: 'contain', mixBlendMode: 'multiply' }}
          onError={e => {
            e.target.onerror = null;
            e.target.src = '/placeholder-image.png';
          }}
        />
      </Link>

      {/* Vùng Thông Tin */}
      <div className="card-body d-flex flex-column p-3">
        <p className="text-muted mb-1 fw-medium text-uppercase" style={{ fontSize: '0.7rem', letterSpacing: '0.5px' }}>
          {product.categoryName || 'Sản phẩm'}
        </p>

        <Link to={`/details/${product.id}`} className="text-decoration-none text-dark">
          <h6 className="fw-bold product-title" title={product.name}>
            {product.name}
          </h6>
        </Link>

        <div className="mt-auto border-top border-light">
          <span className="text-danger fw-bolder fs-5">Giá: {formatPrice(product.basePrice)}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
