import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  //   const discount = Math.round(((product.listPrice - product.price) / product.listPrice) * 100);
  console.log({ product });
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="card h-100 shadow-sm border-0 product-card">
        <img src="https://action.keepfly.vn/wp-content/uploads/2026/01/ao-bong-da-action-KFA-0062-800x533.jpg" className="card-img-top" alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
        <span className="badge bg-danger position-absolute m-2">20%</span>
        {/* {discount > 0 && <span className="badge bg-danger position-absolute m-2">-{discount}%</span>} */}
        <div className="card-body d-flex flex-column">
          <h6 className="text-uppercase fw-bold">{product.name}</h6>
          <p className="text-muted small mb-1 text-decoration-line-through">{product.price.toLocaleString()}₫</p>
          <p className="text-danger fw-bold fs-5">{product.price.toLocaleString()}₫</p>

          <div className="d-flex gap-2 mt-auto">
            <Link to={`/details/${product.id}`} className="btn btn-primary flex-grow-1">
              Chi tiết
            </Link>
            <button className="btn btn-success">
              <i className="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
