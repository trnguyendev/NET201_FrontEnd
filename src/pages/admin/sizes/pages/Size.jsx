import { useEffect, useState, useCallback } from 'react';
import SizeTable from '../components/SizeTable'; // Đổi tên import
import SizeModal from '../modals/SizeModal'; // Đổi tên import
import sizeService from '../services/sizeService';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Size = () => {
  const [sizes, setSizes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null); // Đổi tên biến cho chuẩn (số ít)

  // --- READ ---
  const fetchSizes = useCallback(async () => {
    try {
      const data = await sizeService.getAllSizes();
      setSizes(data);
    } catch (err) {
      toast.error('Không thể tải danh sách size!');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchSizes();
  }, [fetchSizes]);

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
      // VÌ SIZE KHÔNG CÓ ẢNH -> GỬI THẲNG BIẾN `data` LÀ XONG (Không dùng FormData)
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
      <SizeModal show={showModal} initialData={selectedSize} onSubmit={handleSubmitForm} handleClose={handleCloseModal} />
    </>
  );
};

export default Size;
