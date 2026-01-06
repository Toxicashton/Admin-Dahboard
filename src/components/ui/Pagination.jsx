// src/components/ui/Pagination.jsx
import React from 'react';
import {
  BsChevronDoubleLeft,
  BsChevronLeft,
  BsChevronRight,
  BsChevronDoubleRight
} from 'react-icons/bs';
import './Pagination.scss';

const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Calculate the item range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Simple logic to show page numbers (e.g., 1, 2, 3)
  // We'll just show all pages for now.
  // A more complex version would add "..."
  const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

  return (
    <div className="pagination-container">
      {/* --- Info Text --- */}
      <div className="pagination-info">
        {startItem} - {endItem} of {totalItems}
      </div>

      {/* --- Page Controls --- */}
      <div className="pagination-controls">
        <button
          className="page-btn"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          <BsChevronDoubleLeft />
        </button>
        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <BsChevronLeft />
        </button>

        {pageNumbers.map(number => (
          <button
            key={number}
            className={`page-btn ${number === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(number)}
          >
            {number}
          </button>
        ))}

        <button
          className="page-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <BsChevronRight />
        </button>
        <button
          className="page-btn"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <BsChevronDoubleRight />
        </button>
      </div>
    </div>
  );
};

export default Pagination;