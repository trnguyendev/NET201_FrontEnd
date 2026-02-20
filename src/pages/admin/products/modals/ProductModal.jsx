import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';

function ProductModal({ show, handleClose, onSubmit, initialData, categories, brands }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [basePrice, setBasePrice] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [categoryId, setCategoryId] = useState('');
  const [brandId, setBrandId] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (show) {
      if (isEditMode) {
        setName(initialData.name || '');
        setDescription(initialData.description || '');
        setBasePrice(initialData.basePrice || '');
        setIsActive(initialData.isActive ?? true);
        setCategoryId(initialData.categoryId || '');
        setBrandId(initialData.brandId || '');
        setThumbnailFile(null);
      } else {
        setName('');
        setDescription('');
        setBasePrice('');
        setIsActive(true);
        setCategoryId(categories.length > 0 ? categories[0].id : ''); // Gán mặc định thằng đầu tiên
        setBrandId(brands.length > 0 ? brands[0].id : ''); // Gán mặc định thằng đầu tiên
        setThumbnailFile(null);
      }
    }
  }, [show, initialData, isEditMode, categories, brands]);

  const handleSave = () => {
    if (!name.trim() || !basePrice || !categoryId || !brandId) return;

    const data = {
      name: name.trim(),
      description: description.trim(),
      basePrice: Number(basePrice),
      isActive: isActive,
      categoryId: Number(categoryId),
      brandId: Number(brandId),
      thumbnailFile: thumbnailFile // File ảnh
    };

    onSubmit(data);
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEditMode ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm mới'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          {/* Cột trái */}
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>
                Tên sản phẩm: <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control value={name} onChange={e => setName(e.target.value)} type="text" placeholder="Nhập tên sản phẩm" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Giá cơ bản (Base Price): <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control value={basePrice} onChange={e => setBasePrice(e.target.value)} type="number" min="0" placeholder="VD: 500000" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Danh mục: <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                <option value="">-- Chọn danh mục --</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>
                Thương hiệu: <span className="text-danger">*</span>
              </Form.Label>
              <Form.Select value={brandId} onChange={e => setBrandId(e.target.value)}>
                <option value="">-- Chọn thương hiệu --</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>

          {/* Cột phải */}
          <div className="col-md-6">
            <Form.Group className="mb-3">
              <Form.Label>Mô tả ngắn:</Form.Label>
              <Form.Control as="textarea" rows={4} value={description} onChange={e => setDescription(e.target.value)} placeholder="Nhập mô tả sản phẩm..." />
            </Form.Group>

            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Ảnh đại diện (Thumbnail):</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={e => setThumbnailFile(e.target.files[0])} />
              {isEditMode && initialData?.thumbnail && <Form.Text className="text-muted">Đã có ảnh hiện tại. Chọn file mới nếu muốn thay đổi.</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3 mt-4">
              <Form.Check type="switch" id="isActive-switch" label="Hiển thị sản phẩm (Kích hoạt)" checked={isActive} onChange={e => setIsActive(e.target.checked)} />
            </Form.Group>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={!name.trim() || !basePrice || !categoryId || !brandId}>
          {isEditMode ? 'Lưu thay đổi' : 'Thêm mới'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductModal;
