import { useEffect, useState, useCallback } from 'react';
import ProductTable from '../components/ProductTable';
import ProductModal from '../modals/ProductModal';
import productService from '../services/productService';
// Import thêm service của Category và Brand để lấy dữ liệu cho Dropdown
import categoryService from '../../categories/services/categoryService';
import brandService from '../../brands/services/brandService';
import ProductVariantModal from '../modals/ProductVariantModal';

import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showVariantModal, setShowVariantModal] = useState(false);
  const [productForVariant, setProductForVariant] = useState(null);

  // --- READ ---
  const fetchData = useCallback(async () => {
    try {
      // Gọi cả 3 API cùng lúc cho nhanh
      const [productsData, categoriesData, brandsData] = await Promise.all([productService.getAllProducts(), categoryService.getAllCategories(), brandService.getAllBrands()]);
      setProducts(productsData);
      setCategories(categoriesData);
      setBrands(brandsData);
    } catch (err) {
      toast.error('Không thể tải dữ liệu!');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- ĐIỀU KHIỂN MODAL ---
  const handleOpenCreate = () => {
    setSelectedProduct(null);
    setShowModal(true);
  };

  const handleOpenEdit = product => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleOpenVariants = product => {
    setProductForVariant(product);
    setShowVariantModal(true);
  };
  // --- CREATE & UPDATE ---
  const handleSubmitForm = async data => {
    try {
      const formData = new FormData();
      formData.append('Name', data.name);
      formData.append('Description', data.description);
      formData.append('BasePrice', data.basePrice);
      formData.append('IsActive', data.isActive);
      formData.append('CategoryId', data.categoryId);
      formData.append('BrandId', data.brandId);

      if (data.thumbnailFile) {
        formData.append('ThumbnailFile', data.thumbnailFile);
      }

      if (selectedProduct) {
        await productService.updateProduct(selectedProduct.id, formData);
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        await productService.createProduct(formData);
        toast.success('Thêm sản phẩm thành công!');
      }

      fetchData(); // Load lại bảng
      handleCloseModal();
    } catch (error) {
      let message = 'Có lỗi xảy ra!';
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const firstErrorKey = Object.keys(errors)[0];
        message = errors[firstErrorKey][0];
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      toast.error(message);
    }
  };

  // --- DELETE ---
  const handleDelete = id => {
    Swal.fire({
      title: 'Bạn chắc chắn muốn xóa?',
      text: 'Xóa sản phẩm sẽ xóa luôn các biến thể và ảnh chi tiết của nó!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Vâng, xóa nó!',
      cancelButtonText: 'Hủy'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await productService.deleteProduct(id);
          setProducts(prev => prev.filter(p => p.id !== id));
          toast.success('Xóa sản phẩm thành công!');
        } catch (error) {
          toast.error('Không thể xóa sản phẩm này!');
        }
      }
    });
  };

  return (
    <>
      <div className="card shadow-sm mx-2 mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="h3 mb-0 fw-bold text-primary">Quản lý Sản phẩm</h1>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <Button onClick={handleOpenCreate} className="btn btn-primary shadow-sm">
                <i className="bi bi-plus-circle me-2"></i>
                Thêm sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>

      <ProductTable products={products} onEdit={handleOpenEdit} onDelete={handleDelete} onManageVariants={handleOpenVariants} />
      <ProductModal show={showModal} initialData={selectedProduct} categories={categories} brands={brands} onSubmit={handleSubmitForm} handleClose={handleCloseModal} />
      <ProductVariantModal show={showVariantModal} handleClose={() => setShowVariantModal(false)} product={productForVariant} />
    </>
  );
};

export default Product;
