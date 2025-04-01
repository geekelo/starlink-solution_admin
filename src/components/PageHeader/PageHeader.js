import React from 'react';
import '../../styles/page-header.css';

/**
 * PageHeader - A flexible page header component with title and right-aligned action element
 * 
 * @param {Object} props
 * @param {string} props.title - The page title to display
 * @param {React.ReactNode} props.rightElement - Component to display on the right side
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 */
export const PageHeader = ({
  title,
  rightElement,
  className = "",
  style = {},
  ...props
}) => {
  const headerClasses = `page-header ${className}`.trim();
  
  return (
    <div className={headerClasses} style={style} {...props}>
      <h2 className="page-title">{title}</h2>
      {rightElement && (
        <div className="header-action">
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default PageHeader;