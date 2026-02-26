import { useState, useEffect, useCallback } from 'react';
import { Modal, Button, Form, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import variantService from '../services/variantService';
import sizeService from '../../sizes/services/sizeService';
import colorService from '../../colors/services/colorService';

function ProductVariantModal({ show, handleClose, product }) {
  const [variants, setVariants] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  // Form states
  const [colorId, setColorId] = useState('');
  const [sizeId, setSizeId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [skuCode, setSkuCode] = useState('');

  // State quản lý xem đang Sửa hay Thêm mới
  const [editingId, setEditingId] = useState(null);

  const fetchInitialData = useCallback(async () => {
    if (!product) return;
    try {
      const [variantsData, sizesData, colorsData] = await Promise.all([variantService.getVariantsByProductId(product.id), sizeService.getAllSizes(), colorService.getAllProductColors()]); // Thêm fallback || [] để tránh lỗi khi data bị null/undefined

      setVariants(variantsData || []);
      setSizes(sizesData || []);
      setColors(colorsData || []);
    } catch (error) {
      toast.error('Lỗi khi tải dữ liệu biến thể');
    }
  }, [product]);

  useEffect(() => {
    if (show) {
      fetchInitialData();
      resetForm();
    }
  }, [show, fetchInitialData]);

  const resetForm = () => {
    setColorId('');
    setSizeId('');
    setQuantity('');
    setSkuCode('');
    setEditingId(null);
  };

  const handleSaveVariant = async () => {
    if (!colorId || !sizeId || quantity === '') {
      toast.warning('Vui lòng nhập đủ Màu, Size và Số lượng!');
      return;
    }

    try {
      if (editingId) {
        // --- CHẾ ĐỘ SỬA ---
        const updateData = {
          quantity: Number(quantity),
          skuCode: skuCode.trim()
        };
        await variantService.updateVariant(editingId, updateData);
        toast.success('Cập nhật biến thể thành công!');
      } else {
        // --- CHẾ ĐỘ THÊM MỚI ---
        // 1. Kiểm tra trùng lặp ngay tại Front-end
        const isDuplicate = variants.some(v => v.colorId === Number(colorId) && v.sizeId === Number(sizeId));
        if (isDuplicate) {
          toast.error('Màu và Size này đã tồn tại! Vui lòng chọn "Sửa" ở danh sách bên dưới.');
          return; // Dừng luôn không gọi API
        }

        // 2. Gọi API thêm
        const createData = {
          productId: product.id,
          colorId: Number(colorId),
          sizeId: Number(sizeId),
          quantity: Number(quantity),
          skuCode: skuCode.trim()
        };
        await variantService.createVariant(createData);
        toast.success('Thêm biến thể thành công!');
      }

      resetForm();
      fetchInitialData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Lỗi khi xử lý biến thể!');
    }
  };

  // Nút Edit trên Table gọi hàm này
  const handleEdit = variant => {
    setColorId(variant.colorId);
    setSizeId(variant.sizeId);
    setQuantity(variant.quantity);
    setSkuCode(variant.skuCode || '');
    setEditingId(variant.id); // Đánh dấu đang sửa
  };

  const handleDelete = async id => {
    if (window.confirm('Xóa biến thể này?')) {
      try {
        await variantService.deleteVariant(id);
        setVariants(prev => prev.filter(v => v.id !== id));
        toast.success('Xóa thành công');
        if (editingId === id) resetForm(); // Nếu đang sửa mà bấm xóa thì reset form
      } catch (error) {
        toast.error('Lỗi khi xóa!');
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" backdrop="static">
      <Modal.Header closeButton className="bg-light">
        <Modal.Title>
          Quản lý Biến thể: <span className="text-primary">{product?.name}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Form thêm mới / Cập nhật */}
        <div className={`card p-3 mb-4 shadow-sm border-0 ${editingId ? 'bg-warning bg-opacity-10' : 'bg-light'}`}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h6 className="fw-bold m-0">
              <i className={`bi ${editingId ? 'bi-pencil-square' : 'bi-plus-circle'} me-2`}></i>
              {editingId ? 'Cập nhật số lượng & SKU' : 'Thêm biến thể mới'}
            </h6>
            {editingId && (
              <Button variant="link" size="sm" className="text-danger p-0" onClick={resetForm}>
                Hủy sửa
              </Button>
            )}
          </div>

          <div className="row g-2">
            <div className="col-md-3">
              <Form.Select value={colorId} onChange={e => setColorId(e.target.value)} disabled={editingId !== null}>
                <option value="">-- Chọn Màu --</option>
                {colors.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-3">
              <Form.Select value={sizeId} onChange={e => setSizeId(e.target.value)} disabled={editingId !== null}>
                <option value="">-- Chọn Size --</option>
                {sizes.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Form.Select>
            </div>
            <div className="col-md-2">
              <Form.Control type="number" placeholder="Số lượng" value={quantity} onChange={e => setQuantity(e.target.value)} min="0" />
            </div>
            <div className="col-md-3">
              <Form.Control type="text" placeholder="Mã SKU (Tùy chọn)" value={skuCode} onChange={e => setSkuCode(e.target.value)} />
            </div>
            <div className="col-md-1">
              <Button variant={editingId ? 'warning' : 'primary'} className="w-100" onClick={handleSaveVariant} title={editingId ? 'Lưu' : 'Thêm'}>
                <i className={`bi ${editingId ? 'bi-save' : 'bi-check-lg'}`}></i>
              </Button>
            </div>
          </div>
        </div>

        {/* Bảng danh sách */}
        <h6 className="fw-bold mb-2">Danh sách hiện có ({variants?.length || 0})</h6>
        <Table bordered hover size="sm" className="text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Màu sắc</th>
              <th>Kích thước</th>
              <th>Số lượng</th>
              <th>SKU Code</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {variants.length > 0 ? (
              variants.map(v => (
                <tr key={v.id} className={editingId === v.id ? 'table-warning' : ''}>
                  <td className="fw-bold text-danger">{v.colorName}</td>
                  <td className="fw-bold">{v.sizeName}</td>
                  <td className="text-primary fw-bold">{v.quantity}</td>
                  <td>{v.skuCode || '-'}</td>
                  <td>
                    <div className="btn-group">
                      <Button variant="outline-warning" size="sm" onClick={() => handleEdit(v)} title="Sửa">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(v.id)} title="Xóa">
                        <i className="bi bi-trash"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-muted py-3">
                  Chưa có biến thể nào
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng lại
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ProductVariantModal;
