import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Nếu dữ liệu trả về chỉ có 1 trang hoặc không có trang nào thì ẩn luôn thanh phân trang cho gọn
  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Page navigation" className="mt-5 d-flex justify-content-center">
      <ul className="pagination">
        {/* Nút Trước (Previous) */}
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link shadow-none"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1} // Khóa nút nếu đang ở trang 1
          >
            Trước
          </button>
        </li>

        {/* Danh sách các nút số (1, 2, 3...) */}
        {[...Array(totalPages)].map((_, index) => {
          const pageNum = index + 1;
          return (
            <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
              <button className="page-link shadow-none" onClick={() => onPageChange(pageNum)}>
                {pageNum}
              </button>
            </li>
          );
        })}

        {/* Nút Sau (Next) */}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button
            className="page-link shadow-none"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages} // Khóa nút nếu đang ở trang cuối
          >
            Sau
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
