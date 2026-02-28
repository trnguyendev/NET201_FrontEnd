import ProductCard from '@/components/product/ProductCard';
import SidebarFilter from '@/components/product/SidebarFilter';
import productService from '@/services/productService';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductsByCategory = () => {
  const { categoryId } = useParams();
  const [productsByCategory, setProductByCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State quản lý phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Reset về trang 1 mỗi khi click chọn một Danh mục (Category) khác
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        // 1. Truyền thêm currentPage vào API
        const data = await productService.getProductsByCategory(categoryId, currentPage);

        // 2. Bóc tách dữ liệu chuẩn xác (C# có thể trả về chữ hoa hoặc thường)
        const items = data.items || data.Items || [];
        const tPages = data.totalPages || data.TotalPages || 0;

        setProductByCategory(items);
        setTotalPages(tPages);
      } catch (error) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng thử lại sau!');
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProductsByCategory();
    }
  }, [categoryId, currentPage]); // 3. Bắt buộc có currentPage ở đây để gọi lại API khi đổi trang

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Nên cuộn lên top 0 cho mượt
    }
  };

  return (
    <div className="bg-light pb-5">
      <div className="container-fluid px-4 mt-4">
        <div className="row">
          <aside className="col-lg-3 d-none d-lg-block">
            <SidebarFilter />
          </aside>

          <section className="col-lg-9">
            {/* Hiển thị Loading */}
            {loading && (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status"></div>
                <p className="mt-3 text-muted">Đang tải sản phẩm...</p>
              </div>
            )}

            {/* Hiển thị Lỗi */}
            {error && <div className="alert alert-danger text-center">{error}</div>}

            {/* Hiển thị Dữ liệu */}
            {!loading && !error && (
              <>
                <div className="row g-3 g-md-4">
                  {Array.isArray(productsByCategory) && productsByCategory.length > 0 ? (
                    productsByCategory.map(p => (
                      <div key={p.id} className="col-6 col-md-6 col-lg-4 d-flex align-items-stretch">
                        <ProductCard product={p} />
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center text-muted py-5 bg-white rounded shadow-sm">
                      <i className="bi bi-box-seam display-1 text-light mb-3"></i>
                      <h5>Hiện chưa có sản phẩm nào thuộc danh mục này.</h5>
                    </div>
                  )}
                </div>

                {/* Khối Pagination tự code bằng HTML/CSS Bootstrap */}
                {totalPages > 1 && (
                  <nav className="mt-5 d-flex justify-content-center">
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                          Trước
                        </button>
                      </li>

                      {/* Lặp để in ra các số trang */}
                      {[...Array(totalPages)].map((_, index) => {
                        const pageNum = index + 1;
                        return (
                          <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(pageNum)}>
                              {pageNum}
                            </button>
                          </li>
                        );
                      })}

                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                          Sau
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductsByCategory;
