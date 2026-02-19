import { useEffect, useState, useCallback } from 'react';
import CategoryTable from '../components/CategoryTable';
import categoryService from '../services/categoryService';
import CategoryModal from '../modals/CategoryModal';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- READ ---
  const fetchCategories = useCallback(async () => {
    try {
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (err) {
      toast.error('Không thể tải danh sách sản phẩm!');
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // --- ĐIỀU KHIỂN MODAL ---
  const handleOpenCreate = () => {
    setSelectedCategory(null); // Gắn null để Modal biết là chức năng Thêm mới
    setShowModal(true);
  };

  const handleOpenEdit = category => {
    setSelectedCategory(category); // Gắn data để Modal biết là chức năng Sửa
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  // --- CREATE & UPDATE ---
  const handleSubmitForm = async data => {
    try {
      if (selectedCategory) {
        // CALL API UPDATE
        await categoryService.updateCategory(selectedCategory.id, data);

        // Optimistic Update: Cập nhật state nội bộ cho mượt
        setCategories(prev => prev.map(cat => (cat.id === selectedCategory.id ? { ...cat, ...data } : cat)));
        toast.success('Cập nhật loại sản phẩm thành công!');
      } else {
        // CALL API CREATE
        const newCategory = await categoryService.createCategory(data);

        // Thêm trực tiếp vào state, hoặc gọi lại fetchCategories()
        // Cách tối ưu (không cần gọi API lại):
        setCategories(prev => [...prev, newCategory]);
        toast.success('Thêm loại sản phẩm thành công!');
      }
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
          await categoryService.deleteCategory(id);

          // Optimistic Update: Xóa thẳng trên trình duyệt, không cần tải lại API
          setCategories(prev => prev.filter(cat => cat.id !== id));
          toast.success('Xoá loại sản phẩm thành công!');
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
              <h1 className="h3 mb-0 fw-bold text-primary">Quản lý loại sản phẩm</h1>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <Button onClick={handleOpenCreate} className="btn btn-primary shadow-sm">
                <i className="bi bi-plus-circle me-2"></i>
                Thêm loại sản phẩm
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CategoryTable categories={categories} onEdit={handleOpenEdit} onDelete={handleDelete} />
      <CategoryModal show={showModal} initialData={selectedCategory} onSubmit={handleSubmitForm} handleClose={handleCloseModal} />
    </>
  );
};

export default Category;
