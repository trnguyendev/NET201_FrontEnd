const Pagination = ({ currentPage = 1, totalPages = 10, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const delta = 1; // số trang hiển thị xung quanh trang hiện tại
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const pages = getPageNumbers();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .pg-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 6px;
          padding: 12px 0;
          font-family: 'DM Sans', sans-serif;
        }

        .pg-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 38px;
          height: 38px;
          padding: 0 10px;
          border: 1.5px solid #e2e8f0;
          border-radius: 10px;
          background: #ffffff;
          color: #475569;
          font-size: 13.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          user-select: none;
          letter-spacing: -0.01em;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }

        .pg-btn:hover:not(:disabled):not(.pg-dots) {
          border-color: #6366f1;
          color: #6366f1;
          background: #f5f3ff;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(99,102,241,0.15);
        }

        .pg-btn:active:not(:disabled):not(.pg-dots) {
          transform: translateY(0px);
          box-shadow: 0 1px 2px rgba(0,0,0,0.06);
        }

        .pg-btn.pg-active {
          background: linear-gradient(135deg, #6366f1 0%, #818cf8 100%);
          border-color: transparent;
          color: #ffffff;
          font-weight: 600;
          box-shadow: 0 4px 14px rgba(99,102,241,0.35);
          transform: translateY(-1px);
        }

        .pg-btn.pg-active:hover {
          background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%);
          border-color: transparent;
          color: #ffffff;
          box-shadow: 0 6px 18px rgba(99,102,241,0.4);
        }

        .pg-btn:disabled {
          opacity: 0.38;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .pg-btn:disabled:hover {
          border-color: #e2e8f0;
          background: #ffffff;
          color: #475569;
        }

        .pg-btn.pg-dots {
          border-color: transparent;
          background: transparent;
          cursor: default;
          box-shadow: none;
          color: #94a3b8;
          letter-spacing: 0.05em;
        }

        .pg-btn.pg-dots:hover {
          transform: none;
          box-shadow: none;
          border-color: transparent;
          background: transparent;
          color: #94a3b8;
        }

        .pg-nav-btn {
          gap: 4px;
          padding: 0 13px;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
        }

        .pg-nav-btn svg {
          width: 14px;
          height: 14px;
          stroke-width: 2.5;
          flex-shrink: 0;
          transition: transform 0.18s ease;
        }

        .pg-nav-btn:not(:disabled):hover svg.pg-arrow-left {
          transform: translateX(-2px);
        }

        .pg-nav-btn:not(:disabled):hover svg.pg-arrow-right {
          transform: translateX(2px);
        }

        /* Ripple effect on active */
        .pg-btn.pg-active::after {
          content: '';
          position: absolute;
          inset: -3px;
          border-radius: 13px;
          border: 2px solid rgba(99,102,241,0.25);
          pointer-events: none;
          animation: pg-ring 1.8s ease infinite;
        }

        @keyframes pg-ring {
          0%   { opacity: 0.6; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.35); }
        }

        /* Info text */
        .pg-info {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          color: #94a3b8;
          font-weight: 500;
          text-align: center;
          margin-top: 6px;
          letter-spacing: 0.01em;
        }

        .pg-info span {
          color: #6366f1;
          font-weight: 600;
        }
      `}</style>

      <nav aria-label="Phân trang">
        <div className="pg-wrapper">
          {/* Nút Trước */}
          <button className="pg-btn pg-nav-btn" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} aria-label="Trang trước">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="pg-arrow-left">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Các số trang */}
          {pages.map((page, idx) =>
            page === '...' ? (
              <button key={`dots-${idx}`} className="pg-btn pg-dots" tabIndex={-1}>
                ···
              </button>
            ) : (
              <button key={page} className={`pg-btn ${currentPage === page ? 'pg-active' : ''}`} onClick={() => onPageChange(page)} aria-label={`Trang ${page}`} aria-current={currentPage === page ? 'page' : undefined}>
                {page}
              </button>
            )
          )}

          {/* Nút Sau */}
          <button className="pg-btn pg-nav-btn" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} aria-label="Trang sau">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="pg-arrow-right">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Pagination;
