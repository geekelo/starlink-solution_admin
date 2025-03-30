# EmptyState Component Documentation

## Overview

`EmptyState` is a reusable React component that provides a standardized way to handle "no results" or empty list states in your application. It can display a message, an optional icon, and an optional action.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | string | "No items found." | Message to display |
| `icon` | ReactNode | null | Optional icon to display above the message |
| `className` | string | "" | Additional CSS classes |
| `action` | ReactNode | null | Optional action component (like a button) |
| `...props` | object | - | Additional props to pass to the container |

## Installation

1. Copy the `EmptyState.jsx` file to your components directory
2. Copy the `EmptyState.css` file to the same location or your styles directory
3. Import and use the component in your project

## Basic Usage

### Simple Empty State

```jsx
import React from 'react';
import { EmptyState } from 'path/to/components/EmptyState';

function TransactionsList({ transactions }) {
  return (
    <div className="transactions-container">
      {transactions.length > 0 ? (
        // Render transactions list
        transactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            {/* Transaction details */}
          </div>
        ))
      ) : (
        <EmptyState message="No transactions found." />
      )}
    </div>
  );
}
```

### With Icon

```jsx
import React from 'react';
import { EmptyState } from 'path/to/components/EmptyState';
import { FileText } from 'lucide-react'; // or your preferred icon library

function DocumentsList({ documents }) {
  return (
    <div className="documents-container">
      {documents.length > 0 ? (
        // Render documents list
        documents.map(document => (
          <div key={document.id} className="document-item">
            {/* Document details */}
          </div>
        ))
      ) : (
        <EmptyState 
          message="No documents available" 
          icon={<FileText size={40} />} 
        />
      )}
    </div>
  );
}
```

### With Action Button

```jsx
import React from 'react';
import { EmptyState } from 'path/to/components/EmptyState';
import { PlusCircle } from 'lucide-react';

function ProductsList({ products, onAddProduct }) {
  return (
    <div className="products-container">
      {products.length > 0 ? (
        // Render products list
        products.map(product => (
          <div key={product.id} className="product-item">
            {/* Product details */}
          </div>
        ))
      ) : (
        <EmptyState 
          message="No products found" 
          icon={<PlusCircle size={40} />}
          action={
            <button 
              className="btn btn-primary" 
              onClick={onAddProduct}
            >
              Add Product
            </button>
          }
        />
      )}
    </div>
  );
}
```

### With Custom Styling

```jsx
import React from 'react';
import { EmptyState } from 'path/to/components/EmptyState';
import { AlertCircle } from 'lucide-react';

function SearchResults({ results, query }) {
  return (
    <div className="search-results">
      {results.length > 0 ? (
        // Render search results
        results.map(result => (
          <div key={result.id} className="search-result-item">
            {/* Result details */}
          </div>
        ))
      ) : (
        <EmptyState 
          message={`No results found for "${query}"`}
          icon={<AlertCircle size={32} color="#dc3545" />}
          className="bordered compact"
        />
      )}
    </div>
  );
}
```

### With Conditional Display

```jsx
import React, { useState, useEffect } from 'react';
import { EmptyState } from 'path/to/components/EmptyState';
import { Inbox, Search, Loader } from 'lucide-react';

function FilteredList({ items, filter }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    // Simulate API call or filtering process
    setTimeout(() => {
      const results = items.filter(item => 
        item.name.toLowerCase().includes(filter.toLowerCase())
      );
      setFilteredItems(results);
      setLoading(false);
    }, 500);
  }, [items, filter]);
  
  if (loading) {
    return <div className="loading-container"><Loader size={24} /></div>;
  }
  
  return (
    <div className="filtered-list">
      {filteredItems.length > 0 ? (
        // Render filtered list
        filteredItems.map(item => (
          <div key={item.id} className="list-item">
            {/* Item details */}
          </div>
        ))
      ) : (
        <EmptyState 
          message={filter ? `No matches found for "${filter}"` : "No items available"}
          icon={filter ? <Search size={40} /> : <Inbox size={40} />}
        />
      )}
    </div>
  );
}
```

## Component Implementation

### EmptyState.jsx

```jsx
import React from 'react';
import './EmptyState.css';

export const EmptyState = ({
  message = "No items found.",
  icon = null,
  className = "",
  action = null,
  ...props
}) => {
  const emptyStateClasses = `empty-state ${className}`.trim();
  
  return (
    <div className={emptyStateClasses} {...props}>
      {icon && <div className="empty-state-icon">{icon}</div>}
      <p className="empty-state-message">{message}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};

export default EmptyState;
```

### EmptyState.css

```css
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  text-align: center;
  min-height: 200px;
}

.empty-state-icon {
  margin-bottom: 16px;
  color: #6c757d;
}

.empty-state-message {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #6c757d;
  font-weight: 500;
}

.empty-state-action {
  margin-top: 8px;
}

/* Variations */
.empty-state.compact {
  min-height: 120px;
  padding: 24px 16px;
}

.empty-state.bordered {
  border: 1px dashed #dee2e6;
  background-color: transparent;
}

/* Responsive */
@media (max-width: 576px) {
  .empty-state {
    padding: 30px 16px;
    min-height: 160px;
  }
}
```

## Styling Variations

The component comes with a few built-in variations:

- **Default**: Standard styling with light gray background
- **Compact**: Smaller version with reduced padding and height
- **Bordered**: Version with dashed border and transparent background

You can combine these or create your own custom variations by passing additional class names.

## Accessibility Notes

- The component uses semantic HTML elements
- Text color has sufficient contrast ratio with the background
- The message is clear and descriptive
- Any interactive elements (like buttons) should have appropriate ARIA attributes

## Notes

- For loading states, consider using a separate loading component rather than the empty state
- The message should be clear about why no items are displayed (e.g., no results for a search, no items added yet)
- Icons should be relevant to the context (e.g., inbox icon for empty messages, search icon for no search results)