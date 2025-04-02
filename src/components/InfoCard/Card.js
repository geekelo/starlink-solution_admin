import React, { useState, useRef, useEffect } from 'react';
import '../../styles/info-card.css';
import { MoreVertical, Copy, CheckCheck, Check } from 'lucide-react';
import { FilterSelect } from '../FilterSelect/Filter';
import AppButton from '../AppButton/Button';


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
 * @param {boolean} props.showAppButton - Whether to show an app button at the bottom
 * @param {function} props.onAppButtonClick - Function to handle app button click
 * @param {string} props.appButtonLabel - Label for the app button
 * @param {Array} props.statusOptions - Options for the status filter
 * @param {string} props.status - Current status value
 * @param {function} props.setStatus - Function to update status
 * @param {Array} props.planOptions - Options for the plan filter
 * @param {string} props.selectedPlan - Current plan value
 * @param {function} props.setSelectedPlan - Function to update plan
 */
export const InfoCard = ({
    title,
    items = [],
    menuItems = [],
    icon,
    className = "",
    active = false,
    style = {},
    showAppButton = false,
    onAppButtonClick,
    appButtonLabel = "Apply",
    // Status filter props
    statusOptions = [],
    status,
    setStatus,
    placeholder = "Select status",
    label = "Status", 
    planOptions = [],
    selectedPlan,
    setSelectedPlan,
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
  
    const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = items
      .map(item => `${item.label}: ${item.value}`)
      .join('\n');
    
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
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
                  {icon || <MoreVertical />}
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
            {/* Copy button if icon is Copy */}
            {icon && icon.type === Copy && (
            <div 
              className="copy-button" 
              onClick={handleCopy}
              style={{ 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '5px'
              }}
            >
              {copied ? (
                <>
                  <Check size={16} color="green" />
                  <span style={{ fontSize: '12px', color: 'green' }}>Copied!</span>
                </>
              ) : (
                <Copy size={16} />
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
                  <span>{item.value}</span>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
  
        {/* Filter and Button Footer - Always render this section */}
        {showAppButton &&    <div className="info-card-footer" style={{display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px'}}>
        
          
          <div className="form-group">
          {planOptions && planOptions.length > 0 ? (
            <FilterSelect
              label="Plan"
              options={planOptions}
              defaultValue={selectedPlan}
              onChange={setSelectedPlan}
              placeholder="Select plan"
            />
          ) : (
            <p>No plan options available</p>
          )}
         
          </div>
          <div className="form-group">
            <FilterSelect
              label={label}
              options={statusOptions}
              defaultValue={status}
              onChange={setStatus}
              placeholder={placeholder}
            />
          </div>
          
          {showAppButton && (
            <AppButton 
           
              onClick={onAppButtonClick}
             leftIcon={    <CheckCheck />}
            >
              {appButtonLabel}
            </AppButton>
          )}
        </div>}
     
      </div>
    );
  };
 

export default InfoCard;
