import React from 'react';
import '../../styles/button.css';
import { adjustColor } from './utils/adjustColors';

/**
 * AppButton - A reusable button component with optional icons and custom colors
 * 
 * @param {Object} props
 * @param {string} props.type - Button type (button, submit, reset)
 * @param {string} props.variant - Button variant (primary, secondary, tertiary, danger, success, custom)
 * @param {string} props.size - Button size (sm, md, lg)
 * @param {boolean} props.loading - Loading state
 * @param {boolean} props.disabled - Disabled state
 * @param {boolean} props.fullWidth - Whether button should take full width
 * @param {ReactNode} props.leftIcon - Icon to display on left
 * @param {ReactNode} props.rightIcon - Icon to display on right
 * @param {Function} props.onClick - Click handler
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.backgroundColor - Custom background color (hex, rgb, etc.)
 * @param {string} props.textColor - Custom text color (hex, rgb, etc.)
 * @param {string} props.hoverColor - Custom hover background color
 * @param {string} props.loadingText - Text to display during loading
 */
export const AppButton = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
  onClick,
  className = '',
  backgroundColor = '',
  textColor = '',
  hoverColor = '',
  loadingText = 'Loading...',
  children,
  ...props
}) => {
  const buttonClasses = [
    'app-button',
    `app-button-${variant}`,
    `app-button-${size}`,
    loading ? 'app-button-loading' : '',
    fullWidth ? 'app-button-full-width' : '',
    className
  ].filter(Boolean).join(' ');

  // Custom inline styles for colors
  const customStyle = {};
  
  if ((backgroundColor || textColor || hoverColor) && variant === 'custom') {
    customStyle.backgroundColor = backgroundColor;
    customStyle.color = textColor;
    // Note: hover effects will be handled via CSS custom properties
    customStyle['--hover-background-color'] = hoverColor || (backgroundColor ? adjustColor(backgroundColor, -10) : '');
    customStyle['--active-background-color'] = hoverColor ? adjustColor(hoverColor, -10) : (backgroundColor ? adjustColor(backgroundColor, -15) : '');
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      style={customStyle}
      {...props}
    >
      {loading && <span className="app-button-spinner" />}
      
      <span className="app-button-content">
        {leftIcon && (
          <span className="app-button-icon app-button-icon-left">
            {leftIcon}
          </span>
        )}
        
        <span className="app-button-text">{loading ? loadingText : children}</span>
        
        {rightIcon && (
          <span className="app-button-icon app-button-icon-right">
            {rightIcon}
          </span>
        )}
      </span>
    </button>
  );
};



export default AppButton;