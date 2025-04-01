import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import '../../styles/pagination.css';


/**
 * Pagination - A component for navigating between pages of content
 * 
 * @param {Object} props
 * @param {number} props.currentPage - Current active page
 * @param {Function} props.onPageChange - Function called when page changes
 * @param {number} props.totalItems - Total number of items across all pages
 * @param {number} props.itemsPerPage - Number of items displayed per page
 * @param {boolean} props.showPageNumbers - Whether to show page number buttons
 * @param {string} props.className - Additional CSS classes
 */
export const Pagination = ({
  currentPage,
  onPageChange,
  totalItems,
  itemsPerPage = 10,
  showPageNumbers = false,
  className = "",
  ...props
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages || totalPages === 0;
  
  const handlePrevious = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };
  
  const handleNext = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };
  
  const handlePageClick = (page) => {
    onPageChange(page);
  };
  
  // Generate array of page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Maximum pages to show at once
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there aren't too many
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Complex logic for many pages
      let startPage = Math.max(1, currentPage - 2);
      let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
      
      // Adjust if we're near the end
      if (endPage - startPage < maxPagesToShow - 1) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }
      
      // Add first page and ellipsis if needed
      if (startPage > 1) {
        pageNumbers.unshift('...');
        pageNumbers.unshift(1);
      }
      
      // Add last page and ellipsis if needed
      if (endPage < totalPages) {
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };
  
  const paginationClasses = `pagination ${className}`.trim();
  
  return (
    <div className={paginationClasses} {...props}>
    

     
      <button
        className="pagination-button prev"
        onClick={handlePrevious}
        disabled={isFirstPage}
        aria-label="Previous page"
      >
        <ChevronLeft size={18} />
      </button>
      
      {showPageNumbers && (
        <div className="pagination-numbers">
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="pagination-ellipsis">...</span>
            ) : (
              <button
                key={`page-${page}`}
                className={`pagination-page ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageClick(page)}
                disabled={currentPage === page}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )
          ))}
        </div>
      )}
      
      <button
        className="pagination-button next"
        onClick={handleNext}
        disabled={isLastPage}
        aria-label="Next page"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
};

export default Pagination;