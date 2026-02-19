import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function CategoryModal({ show, handleClose, onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [displayOrder, setDisplayOrder] = useState('');

  // Xác định chế độ: Nếu có initialData (có ID) -> là Edit, ngược lại là Create
  const isEditMode = Boolean(initialData);

  // Lắng nghe sự thay đổi của modal và initialData để reset/đổ dữ liệu
  useEffect(() => {
    if (show) {
      if (isEditMode) {
        setName(initialData.name);
        setDisplayOrder(initialData.displayOrder);
      } else {
        setName('');
        setDisplayOrder('');
      }
    }
  }, [show, initialData, isEditMode]);

  const handleSave = () => {
    // Validate cơ bản
    if (!name.trim()) return;

    const data = {
      name: name.trim(),
      displayOrder: Number(displayOrder) || 0
    };

    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Cập nhật loại sản phẩm' : 'Thêm loại sản phẩm'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>
            Tên loại sản phẩm: <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Ví dụ: Quần áo, giày..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Thứ tự hiển thị:</Form.Label>
          <Form.Control value={displayOrder} onChange={e => setDisplayOrder(e.target.value)} type="number" placeholder="1 - 100" />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!name.trim()}>
          {isEditMode ? 'Lưu thay đổi' : 'Thêm mới'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CategoryModal;
