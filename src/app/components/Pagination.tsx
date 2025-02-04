import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 16;
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Prev
      </button>

      {startPage > 1 && (
        <button onClick={() => onPageChange(1)} className="px-4 py-2 mx-1 rounded bg-gray-200">
          1
        </button>
      )}

      {startPage > 2 && <span className="px-4 py-2 mx-1">...</span>}

      {[...Array(endPage - startPage + 1)].map((_, index) => (
        <button
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === startPage + index ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          {startPage + index}
        </button>
      ))}

      {endPage < totalPages - 1 && <span className="px-4 py-2 mx-1">...</span>}

      {endPage < totalPages && (
        <button onClick={() => onPageChange(totalPages)} className="px-4 py-2 mx-1 rounded bg-gray-200">
          {totalPages}
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 rounded bg-gray-200 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
