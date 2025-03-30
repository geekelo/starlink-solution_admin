import React, { useState, useRef, useEffect } from 'react';
import '../../styles/info-card.css';
import {  MoreVertical } from 'lucide-react';

/**
 * InfoCard - A flexible card component to display information with icons, labels, and optional dropdown menu
 * 
 * @param {Object} props
 * @param {string} props.title - The card title
 * @param {Array} props.items - Array of objects with icon, label, value, and optional className
 * @param {Array} props.menuItems - Array of objects with icon, label, and onClick function for dropdown menu
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.active - Whether the card is in active state
 * @param {Object} props.style - Additional inline styles
 */
export const InfoCard = ({
  title,
  items = [],
  menuItems = [],
  className = "",
  active = false,
  style = {},
  ...props
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const cardClasses = `info-card ${active ? 'active' : ''} ${className}`.trim();
  
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };
  
  return (
    <div className={cardClasses} style={style} {...props}>
      {/* Card Header with Title and Optional Menu */}
      {title && (
        <h3 className="info-card-title">
          {title}
          {menuItems.length > 0 && (
            <div className="info-card-menu">
              <div className="menu-dots" onClick={toggleDropdown}>
             <MoreVertical/>
              </div>
              
              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="dropdown-menu" ref={dropdownRef}>
                  {menuItems.map((item, index) => (
                    <div 
                      key={index} 
                      className="dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowDropdown(false);
                        if (item.onClick) item.onClick();
                      }}
                    >
                      {item.icon}
                      {item.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </h3>
      )}
      
      {/* Card Content */}
      <div className="info-grid">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="info-icon">
              {item.icon}
            </div>
            <div className="info-text">
              <strong>{item.label}:</strong>{' '}
              {item.className ? (
                <span className={item.className}>
                  {item.value}
                </span>
              ) : (
                item.value
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;