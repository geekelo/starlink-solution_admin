import React from 'react';
import '../../styles/empty-state.css';

/**
 * EmptyState - A component to display when there are no items to show
 * 
 * @param {Object} props
 * @param {string} props.message - Message to display
 * @param {React.ReactNode} props.icon - Optional icon to display
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.action - Optional action button or component
 */
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