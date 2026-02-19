import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function ProductColorModal({ show, handleClose, onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [hexCode, setHexCode] = useState('');
  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (show) {
      if (isEditMode) {
        setName(initialData.name || '');
        setHexCode(initialData.hexCode || '');
      } else {
        setName('');
        setHexCode('');
      }
    }
  }, [show, initialData, isEditMode]);

  const handleSave = () => {
    if (!name.trim()) return;

    const data = {
      name: name.trim(),
      hexCode: hexCode.trim()
    };

    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Cập nhật Màu sắc' : 'Thêm Màu sắc'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>
            Tên màu: <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="VD: Đỏ, Xanh lá..." />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>
            Mã màu / Kiểu: <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control value={hexCode} onChange={e => setHexCode(e.target.value)} type="text" placeholder="VD: #FF0000, Cơ bản..." />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!name.trim() || !hexCode.trim()}>
          {isEditMode ? 'Lưu thay đổi' : 'Thêm mới'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductColorModal;
