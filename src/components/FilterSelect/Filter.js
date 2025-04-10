import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import '../../styles/filter.css';

/**
 * FilterSelect - An enhanced select component with improved dropdown positioning
 * 
 * @param {Object} props
 * @param {string} props.id - Input id
 * @param {Array} props.options - Array of options [{value, label}]
 * @param {string|number} props.value - Current selected value
 * @param {Function} props.onChange - Function to call when value changes
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.disabled - Whether the select is disabled
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.errorMessage - Error message to display
 */
const FilterSelect = ({
  id,
  options = [],
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className = "",
  errorMessage = "",
  label,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [position, setPosition] = useState("bottom");
  const [selectedVal, setSelectedVal] = useState(value);
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // Set initial value when component mounts or value changes
  useEffect(() => {
    setSelectedVal(value);
  }, [value]);

  // Selected option object
  const selectedOption = options.find(option => option.value === selectedVal);

  // Filter options based on search term
  const filteredOptions = filter
    ? options.filter(option => 
        option.label.toLowerCase().includes(filter.toLowerCase()))
    : options;

  // Handle dropdown position calculation
  useEffect(() => {
    if (isOpen && selectRef.current && dropdownRef.current) {
      const calculatePosition = () => {
        const selectRect = selectRef.current.getBoundingClientRect();
        const dropdownHeight = dropdownRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        
        // Space below the select element
        const spaceBelow = windowHeight - selectRect.bottom;
        
        // Space above the select element
        const spaceAbove = selectRect.top;
        
        // If there's not enough space below but enough space above
        if (spaceBelow < dropdownHeight && spaceAbove >= dropdownHeight) {
          setPosition("top");
        } else {
          setPosition("bottom");
        }
      };
      
      calculatePosition();
      
      // Recalculate on window resize
      window.addEventListener('resize', calculatePosition);
      
      return () => {
        window.removeEventListener('resize', calculatePosition);
      };
    }
  }, [isOpen]);

  // Toggle dropdown
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setFilter("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle option selection
  const handleSelect = (optionValue) => {
    setSelectedVal(optionValue);
    if (onChange) {
      onChange(optionValue);
    }
    setIsOpen(false);
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    // Prevent event bubbling to keep dropdown open
    e.stopPropagation();
  };

  // Handle keyboard events (for accessibility)
  const handleKeyDown = (e) => {
    // Open dropdown on arrow down
    if (e.key === 'ArrowDown' && !isOpen) {
      setIsOpen(true);
      e.preventDefault();
    }
    
    // Close dropdown on escape
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
      e.preventDefault();
    }
    
    // Select option with enter if dropdown is open
    if (e.key === 'Enter' && isOpen && filteredOptions.length > 0) {
      handleSelect(filteredOptions[0].value);
      e.preventDefault();
    }
  };

  // Ensure dropdown content clicks don't propagate to parent
  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`filter-select-container ${className} ${errorMessage ? 'has-error' : ''}`} 
      ref={selectRef}
    >
      {label && <div className="filter-select-label">{label}</div>}
      
      <div
        className={`filter-select ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-labelledby={id}
        role="combobox"
      >
        <div className="filter-select-value">
          {selectedOption ? (
            <span className="filter-select-selected">{selectedOption.label}</span>
          ) : (
            <span className="filter-select-placeholder">{placeholder}</span>
          )}
        </div>
        <div className="filter-select-icon">
          <ChevronDown size={16} />
        </div>
      </div>

      {isOpen && (
        <div 
          className={`filter-select-dropdown ${position === 'top' ? 'position-top' : 'position-bottom'}`}
          ref={dropdownRef}
          onClick={handleDropdownClick}
        >
          <div className="filter-select-search">
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Search options..."
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
            {filter && (
              <button 
                className="filter-select-clear" 
                onClick={(e) => {
                  e.stopPropagation();
                  setFilter("");
                }}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <ul 
            className="filter-select-options" 
            role="listbox"
            aria-labelledby={id}
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.value}
                  className={`filter-select-option ${option.value === selectedVal ? 'is-selected' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(option.value);
                  }}
                  role="option"
                  aria-selected={option.value === selectedVal}
                >
                  {option.label || option.name}
                </li>
              ))
            ) : (
              <li className="filter-select-no-results">No options found</li>
            )}
          </ul>
        </div>
      )}
      
      {errorMessage && (
        <div className="filter-select-error">{errorMessage}</div>
      )}
    </div>
  );
};

export { FilterSelect };