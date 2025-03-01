import '../styles/Pagination.css';

const Pagination = ({ total, limit, currentPage, onPageChange }) => {
  const pages = Math.ceil(total / limit);
  const maxButtons = 5; // Limit visible page buttons
  const startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
  const endPage = Math.min(pages, startPage + maxButtons - 1);

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
        <button
          key={page}
          className={currentPage === page ? 'active' : ''}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === pages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;