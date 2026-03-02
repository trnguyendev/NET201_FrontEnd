import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function BrandModal({ show, handleClose, onSubmit, initialData }) {
  const [name, setName] = useState('');
  const [logoFile, setLogoFile] = useState(null); // Quản lý file người dùng chọn

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (show) {
      if (isEditMode) {
        setName(initialData.name);
        setLogoFile(null); // Reset file khi mở modal
      } else {
        setName('');
        setLogoFile(null);
      }
    }
  }, [show, initialData, isEditMode]);

  const handleSave = () => {
    if (!name.trim()) return;

    // Gửi data dưới dạng object chứa cả file
    const data = {
      name: name.trim(),
      logoFile: logoFile
    };

    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Cập nhật thương hiệu' : 'Thêm thương hiệu'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>
            Tên thương hiệu: <span className="text-danger">*</span>
          </Form.Label>
          <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" />
        </Form.Group>

        {/* Thay thế các trường file cũ bằng một trường duy nhất */}
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Logo thương hiệu:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={e => setLogoFile(e.target.files[0])} // Lấy file đầu tiên
          />
          {/* Gợi ý cho người dùng khi ở chế độ Edit */}
          {isEditMode && initialData?.logoUrl && <Form.Text className="text-muted">Đã có logo hiện tại. Chọn file mới nếu muốn thay đổi.</Form.Text>}
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

export default BrandModal;
