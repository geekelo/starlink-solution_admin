

import React, { useEffect, useRef } from 'react';
import { XCircle } from 'lucide-react';
import "../../styles/modal.css";


/**
 * Modal - A reusable modal component with header, body, and footer sections
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onClose - Function to call when modal is closed
 * @param {string} props.title - Title displayed in the modal header
 * @param {React.ReactNode} props.children - Content to display in the modal body
 * @param {React.ReactNode} props.footer - Content to display in the modal footer
 * @param {string} props.size - Size of the modal ('sm', 'md', 'lg', 'xl')
 * @param {string} props.className - Additional CSS classes
 */
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