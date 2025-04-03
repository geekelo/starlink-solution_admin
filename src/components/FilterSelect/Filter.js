import React, { useState, useRef, useEffect } from 'react';
import { Check, ChevronDown, Filter } from 'lucide-react';
import '../../styles/filter.css';

export const FilterSelect = ({ 
  options = [], 
  defaultValue = '', 
  onChange = () => {}, 
  placeholder = 'Select option...',
  icon = '',
  label = '',
  disabled = false,

}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const dropdownRef = useRef(null);

  const handleSelect = (value) => {
    setSelectedValue(value);
    onChange(value);
    setIsOpen(false);
  };
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="filter-select-container" ref={dropdownRef}>
      {label && <label className="filter-select-label">{label}</label>}
      <div 
        className={`filter-select-trigger ${disabled ? 'filter-select-disabled' : ''}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls="filter-select-options"
      >
        <div className="filter-select-trigger-content">
          {icon && <span className="filter-select-icon">{icon}</span>}
          <span className={selectedValue ? 'filter-select-value' : 'filter-select-placeholder'}>
            {selectedValue ? options.find(opt => opt.value === selectedValue)?.label || placeholder : placeholder}
          </span>
        </div>
        <ChevronDown size={16} className={`filter-select-chevron ${isOpen ? 'open' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="filter-select-dropdown" id="filter-select-options" role="listbox">
          <ul className="filter-select-dropdown-list">
            {options.map((option) => (
              <li 
                key={option.value} 
                className={`filter-select-option ${selectedValue === option.value ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
                role="option"
                aria-selected={selectedValue === option.value}
                tabIndex={0}
              >
                <span className="filter-select-option-text">{option.label || option.name}</span>
                {selectedValue === option.value && <Check size={16} className="filter-select-check" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

