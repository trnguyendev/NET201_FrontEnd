import { useEffect, useState, useCallback } from 'react';
import ProductColorTable from '../components/ProductColorTable';
import ProductColorModal from '../modals/ProductColorModal';
import colorService from '../services/colorService'; // IMPORT ĐÚNG SERVICE
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ProductColor = () => {
  const [productColors, setProductColors] = useState([]); // Chuyển thành số nhiều cho dễ hiểu
  const [showModal, setShowModal] = useState(false);
  const [selectedProductColor, setSelectedProductColor] = useState(null);

  // --- READ ---
  const fetchProductColors = useCallback(async () => {
    try {
      const data = await colorService.getAllProductColors(); // SỬA: Gọi đúng hàm của colorService
      setProductColors(data);
    } catch (err) {
      toast.error('Không thể tải danh sách màu sắc!');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchProductColors();
  }, [fetchProductColors]);

  // --- ĐIỀU KHIỂN MODAL ---
  const handleOpenCreate = () => {
    setSelectedProductColor(null);
    setShowModal(true);
  };

  const handleOpenEdit = color => {
    setSelectedProductColor(color);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductColor(null);
  };

  // --- CREATE & UPDATE ---
  const handleSubmitForm = async data => {
    try {
      if (selectedProductColor) {
        // SỬA: selectedProductColor.id chứ KHÔNG PHẢI setProductColor.id
        await colorService.updateProductColor(selectedProductColor.id, data);
        toast.success('Cập nhật màu sắc thành công!');
      } else {
        await colorService.createProductColor(data);
        toast.success('Thêm màu sắc thành công!');
      }

      fetchProductColors();
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
      text: 'Hành động này không thể hoàn tác!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Vâng, xóa nó!',
      cancelButtonText: 'Hủy'
    }).then(async result => {
      if (result.isConfirmed) {
        try {
          await colorService.deleteProductColor(id); // SỬA: Gọi hàm delete của colorService

          setProductColors(prev => prev.filter(c => c.id !== id));
          toast.success('Xóa màu sắc thành công!');
        } catch (error) {
          const message = error.response?.data?.message || 'Không thể xóa màu này!';
          toast.error(message);
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
              <h1 className="h3 mb-0 fw-bold text-primary">Quản lý Màu sắc</h1>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <Button onClick={handleOpenCreate} className="btn btn-primary shadow-sm">
                <i className="bi bi-plus-circle me-2"></i>
                Thêm màu
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* SỬA: Truyền đúng biến `colors={productColors}` vào props của Table */}
      <ProductColorTable colors={productColors} onEdit={handleOpenEdit} onDelete={handleDelete} />
      <ProductColorModal show={showModal} initialData={selectedProductColor} onSubmit={handleSubmitForm} handleClose={handleCloseModal} />
    </>
  );
};

export default ProductColor;
