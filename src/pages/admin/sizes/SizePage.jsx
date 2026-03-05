import { useEffect, useState, useCallback } from 'react';
import SizeTable from './SizeTable';
import SizeModal from './SizeModal';
import sizeService from '@/services/sizeService';
import categoryService from '@/services/categoryService'; // 👉 Import thêm service Category
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Size = () => {
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]); // 👉 Thêm state lưu danh mục
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);

  // --- READ SIZES ---
  const fetchSizes = useCallback(async () => {
    try {
      const data = await sizeService.getAllSizes();
      setSizes(data);
    } catch (err) {
      toast.error('Không thể tải danh sách size!');
      console.error(err);
    }
  }, []);

  // --- READ CATEGORIES (Chỉ lấy 1 lần) ---
  const fetchCategories = useCallback(async () => {
    try {
      const data = await categoryService.getAllCategories();
      // Tùy backend trả về mảng trực tiếp hay PageResult, nhớ hứng cho chuẩn
      setCategories(data.items || data || []);
    } catch (err) {
      toast.error('Không thể tải danh sách danh mục!');
    }
  }, []);

  useEffect(() => {
    fetchSizes();
    fetchCategories(); // 👉 Gọi hàm lấy danh mục khi component mount
  }, [fetchSizes, fetchCategories]);

  // --- ĐIỀU KHIỂN MODAL ---
  const handleOpenCreate = () => {
    setSelectedSize(null);
    setShowModal(true);
  };

  const handleOpenEdit = size => {
    setSelectedSize(size);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSize(null);
  };

  // --- CREATE & UPDATE ---
  const handleSubmitForm = async data => {
    try {
      if (selectedSize) {
        await sizeService.updateSize(selectedSize.id, data);
        toast.success('Cập nhật size thành công!');
      } else {
        await sizeService.createSize(data);
        toast.success('Thêm size thành công!');
      }

      fetchSizes();
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
          await sizeService.deleteSize(id);
          setSizes(prev => prev.filter(s => s.id !== id));
          toast.success('Xóa size thành công!');
        } catch (error) {
          const message = error.response?.data?.message || 'Không thể xóa size này!';
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
              <h1 className="h3 mb-0 fw-bold text-primary">Quản lý Size</h1>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <Button onClick={handleOpenCreate} className="btn btn-primary shadow-sm">
                <i className="bi bi-plus-circle me-2"></i>
                Thêm size
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SizeTable sizes={sizes} onEdit={handleOpenEdit} onDelete={handleDelete} />

      {/* 👉 Truyền danh sách categories xuống Modal */}
      <SizeModal show={showModal} initialData={selectedSize} categories={categories} onSubmit={handleSubmitForm} handleClose={handleCloseModal} />
    </>
  );
};

export default Size;
