export const FormGroup = ({ 
    className = "", 
    children, 
    size = "md", 
    errorMessage, 
    successMessage, 
    helperText 
  }) => {
    const groupClasses = [
      'form-group',
      size === 'sm' ? 'form-group-sm' : '',
      size === 'lg' ? 'form-group-lg' : '',
      className
    ].filter(Boolean).join(' ');
    
    return (
      <div className={groupClasses}>
        {children}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        {helperText && <div className="form-helper">{helperText}</div>}
      </div>
    );
  };