# Pagination Component Documentation

## Overview

`Pagination` is a flexible React component that provides navigation controls for paginated content. It supports both simple previous/next buttons and more advanced page number navigation.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `currentPage` | number | - | Current active page (required) |
| `onPageChange` | function | - | Function called when page changes, receives page number (required) |
| `totalItems` | number | - | Total number of items across all pages (required) |
| `itemsPerPage` | number | 10 | Number of items displayed per page |
| `showPageNumbers` | boolean | false | Whether to display numbered page buttons |
| `className` | string | "" | Additional CSS classes |
| `...props` | object | - | Additional props to pass to the container |

## Installation

1. Copy the `Pagination.jsx` file to your components directory
2. Copy the `Pagination.css` file to the same location or your styles directory
3. Import and use the component in your project

## Basic Usage

### Simple Previous/Next Pagination

```jsx
import React, { useState } from 'react';
import { Pagination } from 'path/to/components/Pagination';

function ItemsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const items = [...]; // Your data array
  
  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className="items-container">
      {/* Render current items */}
      <div className="items-list">
        {currentItems.map(item => (
          <div key={item.id} className="item">
            {/* Item details */}
          </div>
        ))}
      </div>
      
      {/* Pagination controls */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={items.length}
        itemsPerPage={itemsPerPage}
      />
    </div>
  );
}
```

### With Page Numbers

```jsx
import React, { useState } from 'react';
import { Pagination } from 'path/to/components/Pagination';

function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const products = [...]; // Your products data
  const itemsPerPage = 12;
  
  // Calculate current products to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  
  return (
    <div className="products-page">
      <h1>Products</h1>
      
      {/* Products grid */}
      <div className="products-grid">
        {currentProducts.map(product => (
          <div key={product.id} className="product-card">
            {/* Product details */}
          </div>
        ))}
      </div>
      
      {/* Pagination with page numbers */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={products.length}
        itemsPerPage={itemsPerPage}
        showPageNumbers={true}
      />
    </div>
  );
}
```

### With API Data and Loading State

```jsx
import React, { useState, useEffect } from 'react';
import { Pagination } from 'path/to/components/Pagination';

function UsersTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 20;
  
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        // Replace with your API endpoint
        const response = await fetch(`/api/users?page=${currentPage}&limit=${itemsPerPage}`);
        const data = await response.json();
        
        setUsers(data.users);
        setTotalItems(data.total);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [currentPage, itemsPerPage]);
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Optionally scroll to top of the list
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="users-container">
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : (
        <>
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    {/* Action buttons */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <Pagination
            currentPage={currentPage}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            showPageNumbers={true}
            className="users-pagination"
          />
        </>
      )}
    </div>
  );
}
```

### With Custom Styling

```jsx
import React, { useState } from 'react';
import { Pagination } from 'path/to/components/Pagination';
import './custom-pagination.css'; // Your custom styles

function GalleryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const images = [...]; // Your images data
  const imagesPerPage = 9;
  
  // Calculate current images to display
  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage);
  
  return (
    <div className="gallery-container">
      {/* Images grid */}
      <div className="gallery-grid">
        {currentImages.map(image => (
          <div key={image.id} className="gallery-item">
            <img src={image.url} alt={image.title} />
          </div>
        ))}
      </div>
      
      {/* Custom styled pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={images.length}
        itemsPerPage={imagesPerPage}
        showPageNumbers={true}
        className="gallery-pagination"
      />
    </div>
  );
}
```

Add the following custom CSS:

```css
/* custom-pagination.css */
.gallery-pagination {
  margin-top: 30px;
}

.gallery-pagination .pagination-button,
.gallery-pagination .pagination-page {
  background-color: transparent;
  border-color: #333;
  color: #333;
}

.gallery-pagination .pagination-page.active {
  background-color: #333;
  color: #fff;
}
```

## Integration with Your Current Code

To integrate this component with your existing code:

```jsx
import React, { useState, useEffect } from 'react';
import { Pagination } from './components/Pagination';

function TransactionHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const itemsPerPage = 10; // Adjust based on your needs
  
  // Calculate indices for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  // Get current items to display
  const currentItems = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);
  
  // Fetch or filter data
  useEffect(() => {
    // Your data fetching logic
    // ...
    
    setLoading(false);
  }, [/* dependencies */]);
  
  return (
    <div className="transaction-history">
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {/* Display transaction items */}
          <div className="transactions-list">
            {currentItems.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                {/* Transaction details */}
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalItems={filteredHistory.length}
            itemsPerPage={itemsPerPage}
          />
        </>
      )}
    </div>
  );
}
```

## Component Implementation

### Pagination.jsx

```jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './Pagination.css';

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
```

## Accessibility

The component includes several accessibility features:
- Clear labeling of buttons with aria-label
- Disabled states for inactive buttons
- aria-current attribute for the current page
- Keyboard navigability for all controls

## Notes

- The pagination logic handles edge cases like having no items or being on the first/last page
- For large datasets, consider server-side pagination instead of client-side
- The component can be customized through CSS classes
- Page number display intelligently handles large numbers of pages with ellipsis