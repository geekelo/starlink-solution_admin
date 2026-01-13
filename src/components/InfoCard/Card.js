import React, { useState, useRef, useEffect } from 'react';
import '../../styles/info-card.css';
import { MoreVertical, Copy, CheckCheck, Check, Eye, Edit2, FileText, CheckCircle, RefreshCw, CalendarDays } from 'lucide-react';
import { FilterSelect } from '../FilterSelect/Filter';
import AppButton from '../AppButton/Button';
import { FormInput } from '../FormInput/Input';
import { FormLabel } from '../FormLabel/Label';

/**
 * InfoCard - A flexible card component to display information with icons, labels, and optional dropdown menu
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
    setAmount,
    inputLabel,
    inputValue,
    placeholder = "Select status",
    label = "Status", 
    planOptions = [],
    selectedPlan,
    setSelectedPlan,
    appButtonDisabled = false,
    ...props
  }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);
    const [currentPlan, setCurrentPlan] = useState(selectedPlan);
    const [copied, setCopied] = useState(false);
    const [kitNumberCopied, setKitNumberCopied] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);
    const dropdownRef = useRef(null);
    const cardRef = useRef(null);
    
    // Combine all class names
    const cardClasses = `info-card ${active ? 'active' : ''} ${className}`.trim();
    
    // Update local state when props change
    useEffect(() => {
      setCurrentStatus(status);
    }, [status]);
    
    useEffect(() => {
      setCurrentPlan(selectedPlan);
    }, [selectedPlan]);
    
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
    
    // Handle status change
    const handleStatusChange = (value) => {
      setCurrentStatus(value);
      if (setStatus) {
        setStatus(value);
      }
    };
    
    // Handle plan change
    const handlePlanChange = (value) => {
      setCurrentPlan(value);
      if (setSelectedPlan) {
        setSelectedPlan(value);
      }
    };
    
    const handleInput = (e) => {
      setAmount(e.target.value)
    }
    
    // Handle app button click
    const handleAppButtonClick = () => {
      if (onAppButtonClick) {
        onAppButtonClick(currentStatus, currentPlan);
      }
    };

    // Handle copy functionality for all items
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

    // Handle copy functionality specifically for Kit Number
    const handleCopyKitNumber = (value) => {
      navigator.clipboard.writeText(value)
        .then(() => {
          setKitNumberCopied(true);
          setTimeout(() => setKitNumberCopied(false), 2000); // Reset after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy kit number: ', err);
        });
    };
    
    // Handle copy functionality specifically for Email
    const handleCopyEmail = (value) => {
      navigator.clipboard.writeText(value)
        .then(() => {
          setEmailCopied(true);
          setTimeout(() => setEmailCopied(false), 2000); // Reset after 2 seconds
        })
        .catch(err => {
          console.error('Failed to copy email: ', err);
        });
    };
    
    // Extract kit number from title if it starts with "Kit No: "
    const getKitNumberFromTitle = () => {
      if (title && title.startsWith("Kit No: ")) {
        return title.replace("Kit No: ", "");
      }
      return null;
    };
    
    return (
      <div className={cardClasses} style={style} {...props} ref={cardRef}>
        {/* Card Header with Title and Optional Menu */}
        {title && (
          <h3 className="info-card-title" >
            <div style={{ display: 'flex', alignItems: 'center', justifySelf: 'flex-start' }}>
            <span>{title}</span>
            
            {/* Add copy button for Kit No title */}
            {title && title.startsWith("Kit No: ") && (
              <div
                className="copy-button"
                onClick={() => handleCopyKitNumber(getKitNumberFromTitle())}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '5px'
                }}
              >
                {kitNumberCopied ? (
                  <Check size={16} color="green" />
                ) : (
                  <Copy size={16} />
                )}
              </div>
            )}
            </div>
         
            
            {menuItems.length > 0 && (
              <div className="info-card-menu">
                <div className="menu-dots" onClick={toggleDropdown}>
                  {icon || <MoreVertical size={20} />}
                </div>
                
                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="dropdown-menu" ref={dropdownRef}>
                    {menuItems.map((item, index) => (
                      <div
                        key={index}
                        className={`dropdown-item ${item.className || ''}`}
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
              <div className="info-text" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div>
                  <strong>{item.label}:</strong>{' '}
                  {item.className ? (
                    <span className={item.className}>
                      {item.value}
                    </span>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </div>
                
                {/* Add copy button specifically for Kit Number */}
                {item.label === "Kit Number" && (
                  <div 
                    className="copy-button" 
                    onClick={() => handleCopyKitNumber(item.value)}
                    style={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginLeft: '10px'
                    }}
                  >
                    {kitNumberCopied ? (
                      <Check size={16} color="green" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </div>
                )}
                
                {/* Add copy button for Email */}
                {(item.label === "Email" || item.label === "Owner's Email") && (
                  <div 
                    className="copy-button" 
                    onClick={() => handleCopyEmail(item.value)}
                    style={{ 
                      cursor: 'pointer', 
                      display: 'flex', 
                      alignItems: 'center', 
                      marginLeft: '10px'
                    }}
                  >
                    {emailCopied ? (
                      <Check size={16} color="green" />
                    ) : (
                      <Copy size={16} />
                    )}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
  
        {/* Filter and Button Footer - Only show if showAppButton is true */}
        {showAppButton && (
          <div className="info-card-footer">
            {planOptions && planOptions.length > 0 && (
              <div className="form-group">
                <FilterSelect
                  id="plan-select"
                  label="Plan"
                  options={planOptions}
                  value={currentPlan}
                  onChange={handlePlanChange}
                  placeholder="Select plan"
                />
              </div>
            )}
            
            {statusOptions && statusOptions.length > 0 && (
              <div className="form-group">
                <FilterSelect
                  id="status-select"
                  label={label}
                  options={statusOptions}
                  value={currentStatus}
                  onChange={handleStatusChange}
                  placeholder={placeholder}
                />
                {inputValue && <div className='form-group'>
                  <FormLabel>{inputLabel}</FormLabel>
                  <FormInput
                    type="text"
                    id="amount"
                    name="amount"
                    placeholder="Enter Amount"
                    value={inputValue}
                    onChange={(e) => handleInput(e)}
                    required
                  />
                </div>}
              </div>
            )}
            <AppButton 
              onClick={handleAppButtonClick}
              leftIcon={<CheckCheck size={16} />}
              disabled={appButtonDisabled} 
            >
              {appButtonLabel}
            </AppButton>
          </div>
        )}
      </div>
    );
  };