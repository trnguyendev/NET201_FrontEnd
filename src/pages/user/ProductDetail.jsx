import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productService from '@/services/productService';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'react-toastify';

const ProductDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const backendUrl = 'https://localhost:7012/';

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  // Logic chọn Biến thể
  const [selectedColorId, setSelectedColorId] = useState(null);
  const [selectedSizeId, setSelectedSizeId] = useState(null);
  const [buyQuantity, setBuyQuantity] = useState(1);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await productService.getProductDetail(id);
        setProduct(data);

        // Tự động chọn Màu và Size đầu tiên nếu có biến thể
        if (data.variants && data.variants.length > 0) {
          const firstColor = data.variants[0].colorId;
          setSelectedColorId(firstColor);

          const sizesForFirstColor = data.variants.filter(v => v.colorId === firstColor);
          if (sizesForFirstColor.length > 0) {
            setSelectedSizeId(sizesForFirstColor[0].sizeId);
          }
        }
      } catch (error) {
        console.error('Lỗi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  if (!product)
    return (
      <div className="text-center mt-5">
        <h3>Sản phẩm không tồn tại!</h3>
        <button onClick={() => navigate('/')} className="btn btn-primary mt-3">
          Về trang chủ
        </button>
      </div>
    );

  // --- LOGIC LỌC BIẾN THỂ ---
  // 1. Lấy danh sách các Màu (Loại bỏ trùng lặp)
  const availableColors = [];
  const colorMap = new Map();
  product.variants.forEach(v => {
    if (!colorMap.has(v.colorId)) {
      colorMap.set(v.colorId, true);
      availableColors.push({ id: v.colorId, name: v.colorName });
    }
  });

  // 2. Lấy danh sách các Size của Màu đang được chọn
  const availableSizes = product.variants.filter(v => v.colorId === selectedColorId);

  // 3. Tìm Biến thể (Variant) chính xác đang được chọn để lấy Số lượng kho
  const currentVariant = product.variants.find(v => v.colorId === selectedColorId && v.sizeId === selectedSizeId);
  const stockQuantity = currentVariant ? currentVariant.quantity : 0;

  // Xử lý đổi màu
  const handleColorChange = colorId => {
    setSelectedColorId(colorId);
    // Khi đổi màu, tự động chọn lại size đầu tiên của màu đó
    const sizesForColor = product.variants.filter(v => v.colorId === colorId);
    if (sizesForColor.length > 0) {
      setSelectedSizeId(sizesForColor[0].sizeId);
    } else {
      setSelectedSizeId(null);
    }
    setBuyQuantity(1); // Reset số lượng mua
  };

  // 3. Viết lại hàm Xử lý "Thêm vào giỏ"
  const handleAddToCart = () => {
    if (!currentVariant) return toast.warning('Vui lòng chọn Màu và Kích thước');
    if (buyQuantity > stockQuantity) return toast.error('Số lượng vượt quá kho hiện có!');

    // Gọi hàm từ CartContext
    addToCart(product, currentVariant, buyQuantity);
    toast.success('Đã thêm vào giỏ hàng thành công!');
  };

  // 4. Viết hàm Xử lý "Mua ngay"
  const handleBuyNow = () => {
    if (!currentVariant) return toast.warning('Vui lòng chọn Màu và Kích thước');
    if (buyQuantity > stockQuantity) return toast.error('Số lượng vượt quá kho hiện có!');

    // Vẫn thêm vào giỏ hàng
    addToCart(product, currentVariant, buyQuantity);

    // NHƯNG CHUYỂN HƯỚNG NGAY SANG TRANG GIỎ HÀNG (Hoặc trang Checkout)
    navigate('/cart');
  };

  return (
    <div className="container mt-5 mb-5 pb-5">
      <div className="bg-white p-4 rounded-4 shadow-sm">
        <div className="row">
          {/* CỘT TRÁI: HÌNH ẢNH */}
          <div className="col-md-5">
            <div className="border rounded-4 p-2 text-center bg-light">
              <img src={product.thumbnail ? `${backendUrl}${product.thumbnail}` : '/placeholder-image.png'} alt={product.name} className="img-fluid rounded-3" style={{ maxHeight: '450px', objectFit: 'contain' }} />
            </div>
            {/* Tương lai: Thêm List ảnh phụ (ProductImages) ở dưới này */}
          </div>

          {/* CỘT PHẢI: THÔNG TIN SẢN PHẨM */}
          <div className="col-md-7 ps-md-5 mt-4 mt-md-0">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb small">
                <li className="breadcrumb-item">
                  <a href="/" className="text-decoration-none text-muted">
                    Trang chủ
                  </a>
                </li>
                <li className="breadcrumb-item">
                  <a href="#" className="text-decoration-none text-muted">
                    {product.categoryName}
                  </a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>

            <h2 className="fw-bold mb-2">{product.name}</h2>
            <p className="text-muted mb-3">
              Thương hiệu: <span className="text-primary fw-semibold">{product.brandName}</span>
            </p>

            <div className="bg-light p-3 rounded-3 mb-4">
              <h3 className="text-danger fw-bold mb-0">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.basePrice)}</h3>
            </div>

            {/* PHẦN CHỌN MÀU SẮC */}
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Màu sắc:</h6>
              <div className="d-flex gap-2 flex-wrap">
                {availableColors.map(color => (
                  <button key={color.id} className={`btn ${selectedColorId === color.id ? 'btn-danger' : 'btn-outline-secondary'}`} onClick={() => handleColorChange(color.id)}>
                    {color.name}
                  </button>
                ))}
              </div>
            </div>

            {/* PHẦN CHỌN SIZE */}
            <div className="mb-4">
              <h6 className="fw-bold mb-2">Kích thước:</h6>
              <div className="d-flex gap-2 flex-wrap">
                {availableSizes.map(variant => (
                  <button
                    key={variant.sizeId}
                    className={`btn ${selectedSizeId === variant.sizeId ? 'btn-danger' : 'btn-outline-secondary'}`}
                    disabled={variant.quantity <= 0} // Hết hàng thì mờ đi
                    onClick={() => setSelectedSizeId(variant.sizeId)}>
                    {variant.sizeName}
                  </button>
                ))}
              </div>
            </div>

            {/* SỐ LƯỢNG & KHO */}
            <div className="mb-4 d-flex align-items-center">
              <h6 className="fw-bold mb-0 me-3">Số lượng:</h6>
              <div className="input-group" style={{ width: '130px' }}>
                <button className="btn btn-outline-secondary" onClick={() => setBuyQuantity(q => Math.max(1, q - 1))}>
                  -
                </button>
                <input type="number" className="form-control text-center" value={buyQuantity} readOnly />
                <button className="btn btn-outline-secondary" onClick={() => setBuyQuantity(q => Math.min(stockQuantity, q + 1))}>
                  +
                </button>
              </div>
              <span className="ms-3 text-muted small">{stockQuantity > 0 ? `Còn ${stockQuantity} sản phẩm` : <span className="text-danger fw-bold">Hết hàng</span>}</span>
            </div>

            {/* NÚT MUA HÀNG */}
            <div className="d-flex gap-3 mt-4">
              <div className="d-flex gap-3 mt-4">
                <button className="btn btn-outline-danger btn-lg px-4" onClick={handleAddToCart} disabled={stockQuantity <= 0}>
                  <i className="bi bi-cart-plus me-2"></i> Thêm vào giỏ
                </button>

                <button
                  className="btn btn-danger btn-lg px-5 fw-bold"
                  onClick={handleBuyNow} // GẮN HÀM VÀO ĐÂY
                  disabled={stockQuantity <= 0}>
                  Mua ngay
                </button>
              </div>
            </div>

            <hr className="my-4" />

            {/* MÔ TẢ */}
            <div>
              <h6 className="fw-bold">Mô tả sản phẩm:</h6>
              <p className="text-muted" style={{ whiteSpace: 'pre-line' }}>
                {product.description || 'Chưa có mô tả chi tiết cho sản phẩm này.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
