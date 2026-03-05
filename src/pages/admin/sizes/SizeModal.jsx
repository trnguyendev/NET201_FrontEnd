import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

// 👉 Nhận thêm prop `categories`
function SizeModal({ show, handleClose, onSubmit, initialData, categories = [] }) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(''); // 👉 Thay type bằng categoryId
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (show) {
      if (isEditMode) {
        setName(initialData.name || '');
        // Chú ý: Backend DTO của bạn có thể trả về 'categoryId' (chữ c thường)
        // hoặc 'CategoryId' (chữ C hoa). Bạn check lại Network tab xem nó trả về gì nhé!
        setCategoryId(initialData.categoryId || initialData.CategoryId || '');
      } else {
        setName('');
        setCategoryId('');
      }
    }
  }, [show, initialData, isEditMode]);

  const handleSave = () => {
    if (!name.trim() || !categoryId) return;

    // Gửi data dưới dạng JSON thuần túy (Khớp với Create/Update Request DTO bên C#)
    const data = {
      name: name.trim(),
      categoryId: parseInt(categoryId, 10) // Đảm bảo gửi lên backend là số nguyên (int)
    };

    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Cập nhật Size' : 'Thêm Size'}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Input Tên Size */}
        <Form.Group className="mb-3">
          <Form.Label>
            Size: <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="VD: S, XL, 42..." />
        </Form.Group>

        {/* Dropdown Chọn Danh mục (Loại sản phẩm) */}
        <Form.Group className="mb-3">
          <Form.Label>
            Loại sản phẩm: <span className="text-danger">*</span>
          </Form.Label>
          <Form.Select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
            <option value="" disabled>
              -- Chọn loại sản phẩm --
            </option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        {/* Nút lưu bị vô hiệu hóa nếu chưa nhập tên size hoặc chưa chọn danh mục */}
        <Button variant="primary" onClick={handleSave} disabled={!name.trim() || !categoryId}>
          {isEditMode ? 'Lưu thay đổi' : 'Thêm mới'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SizeModal;
