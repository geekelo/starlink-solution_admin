import React from 'react';
import { Search } from 'lucide-react';
import '../../styles/search-css';

/**
 * SearchWithButton - A search input component with an optional action button
 * 
 * @param {Object} props
 * @param {string} props.value - Current input value
 * @param {Function} props.onChange - Function called when input value changes
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {React.ReactNode} props.icon - Custom icon to display (defaults to Search icon)
 * @param {string} props.iconColor - Color for the icon
 * @param {string} props.type - Input type (text, email, etc.)
 * @param {boolean} props.withButton - Whether to show the search button
 * @param {string} props.buttonText - Text to display on the button
 * @param {string} props.loadingText - Text to display when loading
 * @param {boolean} props.loading - Whether the search is in progress
 * @param {Function} props.onSearch - Function called when the search button is clicked
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {boolean} props.disabled - Whether the input is disabled
 */
export const SearchWithButton = ({
  value,
  onChange,
  placeholder = "Search...",
  icon = <Search size={24} />,
  iconColor = "#b6bbc1",
  type = "text",
  withButton = true,
  buttonText = "Search",
  loadingText = "Searching...",
  loading = false,
  onSearch,
  className = "",
  style = {},
  disabled = false,
  ...props
}) => {
  
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onSearch && !loading && !disabled) {
      onSearch();
    }
  };
  
  return (
    <div className="kit-search-wrapper" style={style}>
      <div className="kit-search-input-container">
        <Search size={24} color="#b6bbc1" className="kit-search-icon"/>
        <input
          type={type}
          className="kit-search-input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled || loading}
          onKeyPress={handleKeyPress}
          {...props}
        />
      </div>
      
      {withButton && (
        <button
        type='button'
          className="kit-search-button"
          onClick={onSearch}
          disabled={disabled || loading}
        >
          {loading ? loadingText : buttonText}
        </button>
      )}
    </div>
  );
};

export default SearchWithButton;