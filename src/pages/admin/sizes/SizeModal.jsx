import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function SizeModal({ show, handleClose, onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (show) {
      if (isEditMode) {
        setName(initialData.name || '');
        setType(initialData.type || ''); // Sửa lỗi: Tránh set bằng null
      } else {
        setName('');
        setType(''); // Sửa lỗi: Gán chuỗi rỗng thay vì null
      }
    }
  }, [show, initialData, isEditMode]);

  const handleSave = () => {
    if (!name.trim()) return;

    // Gửi data dưới dạng JSON thuần túy (không có file)
    const data = {
      name: name.trim(),
      type: type.trim() // Nên trim cả khoảng trắng của type
    };

    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Cập nhật Size' : 'Thêm Size'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>
            Size: <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="VD: XL, 42..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Kiểu (Loại): <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control value={type} onChange={e => setType(e.target.value)} type="text" placeholder="VD: Quần áo, Giày..." />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!name.trim() || !type.trim()}>
          {isEditMode ? 'Lưu thay đổi' : 'Thêm mới'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SizeModal;
