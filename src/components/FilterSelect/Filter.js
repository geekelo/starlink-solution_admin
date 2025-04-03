import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';
import '../../styles/filter.css'

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
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [position, setPosition] = useState("bottom");
  const selectRef = useRef(null);
  const dropdownRef = useRef(null);

  // Selected option object
  const selectedOption = options.find(option => option.value === value);

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
    onChange(optionValue);
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

  // Prevent dropdown from closing when scrolling inside
  const handleDropdownScroll = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className={`filter-select-container ${className} ${errorMessage ? 'has-error' : ''}`} 
      ref={selectRef}
    >
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
          onScroll={handleDropdownScroll}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="filter-select-search">
            <input
              type="text"
              value={filter}
              onChange={handleFilterChange}
              placeholder="Search options..."
              autoFocus
              onKeyDown={(e) => e.stopPropagation()}
            />
            {filter && (
              <button 
                className="filter-select-clear" 
                onClick={() => setFilter("")}
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
                  className={`filter-select-option ${option.value === value ? 'is-selected' : ''}`}
                  onClick={() => handleSelect(option.value)}
                  role="option"
                  aria-selected={option.value === value}
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

export {FilterSelect};


// import React, { useState, useRef, useEffect } from 'react';
// import { Check, ChevronDown, Filter } from 'lucide-react';
// import '../../styles/filter.css';

// export const FilterSelect = ({ 
//   options = [], 
//   defaultValue = '', 
//   onChange = () => {}, 
//   placeholder = 'Select option...',
//   icon = '',
//   label = '',
//   disabled = false,

// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedValue, setSelectedValue] = useState(defaultValue);
//   const dropdownRef = useRef(null);

//   const handleSelect = (value) => {
//     setSelectedValue(value);
//     onChange(value);
//     setIsOpen(false);
//   };
  
//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
    
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="filter-select-container" ref={dropdownRef}>
//       {label && <label className="filter-select-label">{label}</label>}
//       <div 
//         className={`filter-select-trigger ${disabled ? 'filter-select-disabled' : ''}`}
//         onClick={() => !disabled && setIsOpen(!isOpen)}
//         tabIndex={disabled ? -1 : 0}
//         role="combobox"
//         aria-expanded={isOpen}
//         aria-haspopup="listbox"
//         aria-controls="filter-select-options"
//       >
//         <div className="filter-select-trigger-content">
//           {icon && <span className="filter-select-icon">{icon}</span>}
//           <span className={selectedValue ? 'filter-select-value' : 'filter-select-placeholder'}>
//             {selectedValue ? options.find(opt => opt.value === selectedValue)?.label || placeholder : placeholder}
//           </span>
//         </div>
//         <ChevronDown size={16} className={`filter-select-chevron ${isOpen ? 'open' : ''}`} />
//       </div>
      
//       {isOpen && (
//         <div className="filter-select-dropdown" id="filter-select-options" role="listbox">
//           <ul className="filter-select-dropdown-list">
//             {options.map((option) => (
//               <li 
//                 key={option.value} 
//                 className={`filter-select-option ${selectedValue === option.value ? 'selected' : ''}`}
//                 onClick={() => handleSelect(option.value)}
//                 role="option"
//                 aria-selected={selectedValue === option.value}
//                 tabIndex={0}
//               >
//                 <span className="filter-select-option-text">{option.label || option.name}</span>
//                 {selectedValue === option.value && <Check size={16} className="filter-select-check" />}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

