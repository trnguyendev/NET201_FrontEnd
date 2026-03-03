import { useEffect, useState, useCallback } from 'react';
import ProductTable from './ProductTable';
import ProductModal from './ProductModal';
import productService from '@/services/productService';
import categoryService from '@/services/categoryService';
import brandService from '@/services/brandService';
import ProductVariantModal from './ProductVariantModal';
import Pagination from '@/components/common/Pagination';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

  useEffect(() => {
    const fetchReferenceData = async () => {
      try {
        const [categoriesData, brandsData] = await Promise.all([categoryService.getAllCategories(), brandService.getAllBrands()]);
        // Tùy backend của bạn trả về mảng hay PageResult, nhớ bóc tách cho đúng
        setCategories(categoriesData);
        setBrands(brandsData);
      } catch (err) {
        console.error(err);
        toast.error('Không thể tải dữ liệu danh mục và thương hiệu!');
      }
    };
    fetchReferenceData();
  }, []); // Mảng rỗng = Chỉ chạy 1 lần

  // --- LUỒNG 2: LOAD PRODUCTS (Chạy khi đổi trang hoặc Thêm/Sửa/Xóa) ---
  const fetchProducts = useCallback(async page => {
    try {
      // Nhớ cập nhật productService.getAllProducts(page, limit) nhé
      const data = await productService.getAllProducts(page, limit);
      const items = data.items || [];
      const tPages = data.totalPages || 0;

      setProducts(items);
      setTotalPages(tPages);
    } catch (err) {
      toast.error('Không thể tải danh sách sản phẩm!');
      console.error(err);
    }
  }, []);

  // Gọi fetchProducts mỗi khi currentPage thay đổi
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage, fetchProducts]);

  // Hàm xử lý đổi trang
  const handlePageChange = newPage => {
    setCurrentPage(newPage);
  };

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
        setCurrentPage(1); // Trở về trang 1 để thấy sản phẩm vừa thêm
      }

      fetchProducts(currentPage); // 👉 Load lại danh sách sản phẩm
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
          toast.success('Xóa sản phẩm thành công!');
          fetchProducts(currentPage);
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

      {/* 👉 Nhớ truyền currentPage và limit xuống ProductTable để làm Số thứ tự (STT) */}
      <ProductTable products={products} currentPage={currentPage} limit={limit} onEdit={handleOpenEdit} onDelete={handleDelete} onManageVariants={handleOpenVariants} />

      {/* 👉 Gọi thanh Pagination */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} isAdmin={true} />

      <ProductModal show={showModal} initialData={selectedProduct} categories={categories} brands={brands} onSubmit={handleSubmitForm} handleClose={handleCloseModal} />
      <ProductVariantModal show={showVariantModal} handleClose={() => setShowVariantModal(false)} product={productForVariant} />
    </>
  );
};

export default Product;
