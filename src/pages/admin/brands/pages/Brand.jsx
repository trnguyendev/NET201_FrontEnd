import { useEffect, useState, useCallback } from 'react';
import BrandTable from '../components/BrandTable';
import brandService from '../services/brandService';
import BrandModal from '../modals/BrandModal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Category = () => {
  const [brands, setBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState(null);

  // --- READ ---
  const fetchBrands = useCallback(async () => {
    try {
      const data = await brandService.getAllBrands();
      setBrands(data);
    } catch (err) {
      toast.error('Không thể tải danh sách sản phẩm!');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  // --- ĐIỀU KHIỂN MODAL ---
  const handleOpenCreate = () => {
    setSelectedBrands(null); // Gắn null để Modal biết là chức năng Thêm mới
    setShowModal(true);
  };

  const handleOpenEdit = category => {
    setSelectedBrands(category); // Gắn data để Modal biết là chức năng Sửa
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBrands(null);
  };

  // --- CREATE & UPDATE ---
  const handleSubmitForm = async data => {
    try {
      // 1. Tạo FormData thay vì dùng JSON thông thường
      const formData = new FormData();
      formData.append('Name', data.name);

      // Nếu người dùng có chọn file, đính kèm vào FormData
      if (data.logoFile) {
        formData.append('LogoFile', data.logoFile);
      }

      if (selectedBrands) {
        // CALL API UPDATE với FormData
        await brandService.updateBrand(selectedBrands.id, formData);
        toast.success('Cập nhật thương hiệu thành công!');
      } else {
        // CALL API CREATE với FormData
        await brandService.createBrand(formData);
        toast.success('Thêm thương hiệu thành công!');
      }

      // 2. Vì có upload file, cách tốt nhất là fetch lại danh sách từ server
      // để lấy URL ảnh mới nhất (thay vì làm Optimistic Update thủ công dễ bị lỗi link ảnh).
      fetchBrands();
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
          // Gọi API Xóa
          await brandService.deleteBrand(id);

          // Optimistic Update: Xóa thẳng trên trình duyệt, không cần tải lại API
          setBrands(prev => prev.filter(cat => cat.id !== id));
          toast.success('Xoá thương hiệu thành công!');
        } catch (error) {
          const message = error.response?.data?.message || 'Không thể xóa danh mục này!';
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
              <h1 className="h3 mb-0 fw-bold text-primary">Quản lý thương hiệu</h1>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <Button onClick={handleOpenCreate} className="btn btn-primary shadow-sm">
                <i className="bi bi-plus-circle me-2"></i>
                Thêm thương hiệu
              </Button>
            </div>
          </div>
        </div>
      </div>

      <BrandTable brands={brands} onEdit={handleOpenEdit} onDelete={handleDelete} />
      <BrandModal show={showModal} initialData={selectedBrands} onSubmit={handleSubmitForm} handleClose={handleCloseModal} />
    </>
  );
};

export default Category;
