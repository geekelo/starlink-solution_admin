# Modal Component Documentation

## Overview

`Modal` is a flexible and reusable React component that provides a consistent way to display dialogs, forms, and detailed information in your application. The component features a header, scrollable body, and optional footer, with support for different sizes and custom styling.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | - | Controls the visibility of the modal (required) |
| `onClose` | function | - | Function called when the modal is closed (required) |
| `title` | string | - | Title displayed in the modal header |
| `children` | ReactNode | - | Content to display in the modal body |
| `footer` | ReactNode | - | Content to display in the modal footer (optional) |
| `size` | string | 'md' | Size of the modal ('sm', 'md', 'lg', 'xl') |
| `className` | string | '' | Additional CSS classes |
| `...props` | object | - | Additional props to pass to the modal container |

## Installation

1. Copy the `Modal.jsx` file to your components directory
2. Copy the `Modal.css` file to the same location or your styles directory
3. Import and use the component in your project

## Basic Usage

### Simple Modal

```jsx
import React, { useState } from 'react';
import { Modal } from 'path/to/components/Modal';

function SimpleModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Information"
        footer={<button onClick={closeModal}>Close</button>}
      >
        <p>This is a simple modal with some information.</p>
      </Modal>
    </div>
  );
}
```

### Modal with Form

```jsx
import React, { useState } from 'react';
import { Modal } from 'path/to/components/Modal';

function FormModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    closeModal();
  };
  
  return (
    <div>
      <button onClick={openModal}>Add User</button>
      
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Add New User"
        footer={
          <>
            <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </>
        }
      >
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
```

### Modal with Scrollable Content

```jsx
import React, { useState } from 'react';
import { Modal } from 'path/to/components/Modal';

function LongContentModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  
  // Generate long content for demonstration
  const longContent = Array(20).fill(0).map((_, index) => (
    <p key={index}>This is paragraph {index + 1} with some sample text.</p>
  ));
  
  return (
    <div>
      <button onClick={openModal}>View Details</button>
      
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title="Detailed Information"
        footer={<button onClick={closeModal}>Close</button>}
        size="lg"
      >
        <div className="scrollable-content">
          <h4>Section 1</h4>
          {longContent.slice(0, 10)}
          
          <h4>Section 2</h4>
          {longContent.slice(10)}
        </div>
      </Modal>
    </div>
  );
}
```

### Transaction Details Modal

```jsx
import React, { useState } from 'react';
import { Modal } from 'path/to/components/Modal';

function TransactionDetailsModal({ isOpen, onClose, transaction }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      footer={<button onClick={onClose}>Close</button>}
      size="md"
    >
      <div className="transaction-details">
        <p><strong>ID:</strong> {transaction?.id || "N/A"}</p>
        <p><strong>Amount:</strong> ${transaction?.amount?.toFixed(2) || "0.00"}</p>
        <p><strong>Status:</strong> {transaction?.status || "N/A"}</p>
        <p><strong>Date:</strong> {transaction?.date ? new Date(transaction.date).toLocaleDateString() : "N/A"}</p>
        <p><strong>Customer:</strong> {transaction?.customer?.name || "N/A"}</p>
        <p><strong>Payment Method:</strong> {transaction?.paymentMethod || "N/A"}</p>
        <p><strong>Reference:</strong> {transaction?.reference || "N/A"}</p>
        <p><strong>Notes:</strong> {transaction?.notes || "None"}</p>
      </div>
    </Modal>
  );
}

// Example usage in parent component
function TransactionsList() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const viewTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <div>
      {/* Transaction list with view buttons */}
      <table>
        {/* Table header */}
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>${transaction.amount.toFixed(2)}</td>
              <td>{transaction.status}</td>
              <td>
                <button onClick={() => viewTransaction(transaction)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Transaction details modal */}
      <TransactionDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        transaction={selectedTransaction}
      />
    </div>
  );
}
```

### Different Sizes

```jsx
import React, { useState } from 'react';
import { Modal } from 'path/to/components/Modal';

function ModalSizesExample() {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    size: 'md'
  });
  
  const openModal = (size) => {
    setModalConfig({
      isOpen: true,
      size
    });
  };
  
  const closeModal = () => {
    setModalConfig(prev => ({
      ...prev,
      isOpen: false
    }));
  };
  
  return (
    <div className="modal-sizes-demo">
      <button onClick={() => openModal('sm')}>Small Modal</button>
      <button onClick={() => openModal('md')}>Medium Modal</button>
      <button onClick={() => openModal('lg')}>Large Modal</button>
      <button onClick={() => openModal('xl')}>Extra Large Modal</button>
      
      <Modal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        title={`${modalConfig.size.toUpperCase()} Modal Example`}
        footer={<button onClick={closeModal}>Close</button>}
        size={modalConfig.size}
      >
        <p>This is a {modalConfig.size} sized modal.</p>
        <p>Different sizes are useful for different types of content.</p>
      </Modal>
    </div>
  );
}
```

## Component Implementation

### Modal.jsx

```jsx
import React, { useEffect, useRef } from 'react';
import { XCircle } from 'lucide-react';
import './Modal.css';

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);
  
  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
  
  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      // Use setTimeout to prevent closing when first opened
      const timer = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 10);
      
      return () => {
        clearTimeout(timer);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const modalClasses = `modal-content modal-${size} ${className}`.trim();
  
  return (
    <div className="modal-overlay">
      <div className={modalClasses} ref={modalRef} {...props}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <XCircle size={20} />
          </button>
        </div>
        
        <div className="modal-body">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
```

## Key Features

1. **Scrollable Content**: The modal body is scrollable, allowing for long content without taking up the entire screen height.

2. **Multiple Size Options**:
   - `sm`: 400px max-width
   - `md`: 600px max-width (default)
   - `lg`: 800px max-width
   - `xl`: 1000px max-width

3. **Accessibility Features**:
   - Close button has aria-label
   - Escape key closes the modal
   - Focus is properly managed
   - Body scroll is prevented when modal is open

4. **User-Friendly Interactions**:
   - Click outside to close
   - Animated entrance
   - Responsive design for different screen sizes

5. **Flexible Structure**:
   - Header with title and close button
   - Scrollable body for content
   - Optional footer for actions

## Styling Customization

You can customize the modal's appearance by:

1. **Using the `className` prop** to add custom classes
2. **Creating a custom theme** by extending the CSS
3. **Using inline styles** for specific instances

Example of custom styling:

```jsx
<Modal
  isOpen={isOpen}
  onClose={closeModal}
  title="Custom Styled Modal"
  className="dark-theme-modal"
  style={{ backdropFilter: 'blur(5px)' }}
>
  <p>This modal has custom styling.</p>
</Modal>
```

Add the following CSS:

```css
.dark-theme-modal {
  background-color: #222;
  color: #fff;
}

.dark-theme-modal .modal-header {
  border-bottom-color: #444;
}

.dark-theme-modal .modal-footer {
  border-top-color: #444;
}

.dark-theme-modal .modal-close {
  color: #ddd;
}

.dark-theme-modal .modal-close:hover {
  color: #fff;
  background-color: #444;
}
```

## Notes

- The modal prevents scrolling of the underlying page when open
- The component handles its own state for interactions like closing on escape key or outside click
- For forms within modals, remember to prevent default form submission if necessary
- The modal is designed to be responsive and will adjust to different screen sizes
- For very complex modal content, consider componentizing the content separately